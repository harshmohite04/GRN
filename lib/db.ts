import fs from 'fs';
import path from 'path';
import os from 'os';
import { MongoClient, Db } from 'mongodb';

// Determine if we are running in Vercel or a serverless environment
const isVercel = !!process.env.VERCEL;

// Database Connection Settings
const MONGODB_URI = process.env.MONGODB_URI;
const KV_REST_API_URL = process.env.KV_REST_API_URL;
const KV_REST_API_TOKEN = process.env.KV_REST_API_TOKEN;

// Local DB Path Settings
const DB_DIR = isVercel ? os.tmpdir() : path.join(process.cwd(), 'data');
const DB_FILE = path.join(DB_DIR, 'db.json');
const BUNDLED_DB_FILE = path.join(process.cwd(), 'data', 'db.json');

// MongoDB Connection Caching
let cachedMongoClient: MongoClient | null = null;
let cachedMongoDb: Db | null = null;

async function getMongoDb(): Promise<Db> {
  if (cachedMongoDb) return cachedMongoDb;
  if (!MONGODB_URI) {
    throw new Error('MONGODB_URI environment variable is missing');
  }
  const client = new MongoClient(MONGODB_URI, {
    autoSelectFamily: false,
    connectTimeoutMS: 10000,
    socketTimeoutMS: 45000,
  });
  await client.connect();
  cachedMongoClient = client;
  
  // Extract database name from connection string or default to 'grn_automation'
  let dbName = 'grn_automation';
  try {
    const url = new URL(MONGODB_URI);
    dbName = url.pathname.substring(1) || 'grn_automation';
  } catch (e) {}

  const db = client.db(dbName);
  cachedMongoDb = db;
  return db;
}

// Interface definition for DB schema
interface UserRecord {
  email: string;
  trialCount: number;
  allowedScans: number;
  createdAt: string;
}

interface OtpRecord {
  otp: string;
  expiresAt: number; // millisecond timestamp
}

interface SessionRecord {
  email: string;
  expiresAt: number; // millisecond timestamp
}

interface GrnRecord {
  id: string;
  email: string;
  grnData: any;
  photoUrl?: string; // base64 representation of the document
  createdAt: string;
}

interface DbSchema {
  users: Record<string, UserRecord>;
  otps: Record<string, OtpRecord>;
  sessions: Record<string, SessionRecord>;
  grns?: Record<string, GrnRecord>;
}

// Helper to interact with Vercel KV via REST API
async function kvExecute(command: string[]): Promise<any> {
  if (!KV_REST_API_URL || !KV_REST_API_TOKEN) return null;
  try {
    const response = await fetch(KV_REST_API_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${KV_REST_API_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(command)
    });
    if (!response.ok) {
      console.error(`KV REST Command [${command[0]}] failed:`, response.statusText);
      return null;
    }
    const data = await response.json();
    return data.result;
  } catch (err) {
    console.error(`KV REST Connection Error [${command[0]}]:`, err);
    return null;
  }
}

// Local filesystem fallback database helpers
async function initLocalDb(): Promise<DbSchema> {
  if (!fs.existsSync(DB_DIR)) {
    fs.mkdirSync(DB_DIR, { recursive: true });
  }
  
  if (!fs.existsSync(DB_FILE)) {
    if (isVercel && fs.existsSync(BUNDLED_DB_FILE)) {
      try {
        const seedData = fs.readFileSync(BUNDLED_DB_FILE, 'utf-8');
        const parsed = JSON.parse(seedData) as DbSchema;
        if (!parsed.grns) parsed.grns = {};
        fs.writeFileSync(DB_FILE, JSON.stringify(parsed, null, 2), 'utf-8');
        return parsed;
      } catch (err) {
        console.error('Error seeding db.json on Vercel:', err);
      }
    }
    
    const defaultData: DbSchema = { users: {}, otps: {}, sessions: {}, grns: {} };
    fs.writeFileSync(DB_FILE, JSON.stringify(defaultData, null, 2), 'utf-8');
    return defaultData;
  }
  
  try {
    const raw = fs.readFileSync(DB_FILE, 'utf-8');
    const parsed = JSON.parse(raw) as DbSchema;
    if (!parsed.grns) {
      parsed.grns = {};
      fs.writeFileSync(DB_FILE, JSON.stringify(parsed, null, 2), 'utf-8');
    }
    return parsed;
  } catch (err) {
    console.error('Error parsing db.json, resetting...', err);
    if (isVercel && fs.existsSync(BUNDLED_DB_FILE)) {
      try {
        const seedData = fs.readFileSync(BUNDLED_DB_FILE, 'utf-8');
        const parsed = JSON.parse(seedData) as DbSchema;
        if (!parsed.grns) parsed.grns = {};
        fs.writeFileSync(DB_FILE, JSON.stringify(parsed, null, 2), 'utf-8');
        return parsed;
      } catch (e) {}
    }
    const defaultData: DbSchema = { users: {}, otps: {}, sessions: {}, grns: {} };
    fs.writeFileSync(DB_FILE, JSON.stringify(defaultData, null, 2), 'utf-8');
    return defaultData;
  }
}

async function saveLocalDb(data: DbSchema) {
  try {
    if (!fs.existsSync(DB_DIR)) {
      fs.mkdirSync(DB_DIR, { recursive: true });
    }
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error saving db.json:', err);
  }
}

// Core Database Operations (Adapts dynamically to MongoDB, Vercel KV, or Local JSON)
export const db = {
  // USER METHODS
  async getUser(email: string): Promise<UserRecord> {
    const normalizedEmail = email.toLowerCase().trim();

    // 1. MONGODB ADAPTER
    if (MONGODB_URI) {
      const mongo = await getMongoDb();
      const user = await mongo.collection('users').findOne({ email: normalizedEmail });
      
      if (!user) {
        const newUser: UserRecord = {
          email: normalizedEmail,
          trialCount: 0,
          allowedScans: 10,
          createdAt: new Date().toISOString()
        };
        await mongo.collection('users').insertOne(newUser);
        return newUser;
      }

      if (user.allowedScans === undefined) {
        await mongo.collection('users').updateOne(
          { email: normalizedEmail },
          { $set: { allowedScans: 10 } }
        );
        user.allowedScans = 10;
      }

      return {
        email: user.email,
        trialCount: user.trialCount,
        allowedScans: user.allowedScans,
        createdAt: user.createdAt
      };
    }

    // 2. VERCEL KV ADAPTER
    if (KV_REST_API_URL && KV_REST_API_TOKEN) {
      const result = await kvExecute(['GET', 'grn_db']);
      let data: DbSchema = { users: {}, otps: {}, sessions: {} };
      if (result) {
        try { data = JSON.parse(result); } catch (e) {}
      }
      
      if (!data.users[normalizedEmail]) {
        data.users[normalizedEmail] = {
          email: normalizedEmail,
          trialCount: 0,
          allowedScans: 10,
          createdAt: new Date().toISOString()
        };
        await kvExecute(['SET', 'grn_db', JSON.stringify(data)]);
      } else if (data.users[normalizedEmail].allowedScans === undefined) {
        data.users[normalizedEmail].allowedScans = 10;
        await kvExecute(['SET', 'grn_db', JSON.stringify(data)]);
      }
      return data.users[normalizedEmail];
    }

    // 3. LOCAL FILESYSTEM ADAPTER
    const data = await initLocalDb();
    if (!data.users[normalizedEmail]) {
      data.users[normalizedEmail] = {
        email: normalizedEmail,
        trialCount: 0,
        allowedScans: 10,
        createdAt: new Date().toISOString()
      };
      await saveLocalDb(data);
    } else if (data.users[normalizedEmail].allowedScans === undefined) {
      data.users[normalizedEmail].allowedScans = 10;
      await saveLocalDb(data);
    }
    return data.users[normalizedEmail];
  },

  async incrementTrial(email: string): Promise<UserRecord> {
    const normalizedEmail = email.toLowerCase().trim();

    // 1. MONGODB ADAPTER
    if (MONGODB_URI) {
      const mongo = await getMongoDb();
      await mongo.collection('users').updateOne(
        { email: normalizedEmail },
        {
          $inc: { trialCount: 1 },
          $setOnInsert: { allowedScans: 10, createdAt: new Date().toISOString() }
        },
        { upsert: true }
      );
      const user = await mongo.collection('users').findOne({ email: normalizedEmail });
      return {
        email: normalizedEmail,
        trialCount: user?.trialCount ?? 1,
        allowedScans: user?.allowedScans ?? 10,
        createdAt: user?.createdAt ?? new Date().toISOString()
      };
    }

    // 2. VERCEL KV ADAPTER
    if (KV_REST_API_URL && KV_REST_API_TOKEN) {
      const result = await kvExecute(['GET', 'grn_db']);
      let data: DbSchema = { users: {}, otps: {}, sessions: {} };
      if (result) {
        try { data = JSON.parse(result); } catch (e) {}
      }
      
      if (!data.users[normalizedEmail]) {
        data.users[normalizedEmail] = {
          email: normalizedEmail,
          trialCount: 0,
          allowedScans: 10,
          createdAt: new Date().toISOString()
        };
      }
      data.users[normalizedEmail].trialCount += 1;
      if (data.users[normalizedEmail].allowedScans === undefined) {
        data.users[normalizedEmail].allowedScans = 10;
      }
      await kvExecute(['SET', 'grn_db', JSON.stringify(data)]);
      return data.users[normalizedEmail];
    }

    // 3. LOCAL FILESYSTEM ADAPTER
    const data = await initLocalDb();
    if (!data.users[normalizedEmail]) {
      data.users[normalizedEmail] = {
        email: normalizedEmail,
        trialCount: 0,
        allowedScans: 10,
        createdAt: new Date().toISOString()
      };
    }
    data.users[normalizedEmail].trialCount += 1;
    if (data.users[normalizedEmail].allowedScans === undefined) {
      data.users[normalizedEmail].allowedScans = 10;
    }
    await saveLocalDb(data);
    return data.users[normalizedEmail];
  },

  async addScans(email: string, count: number): Promise<UserRecord> {
    const normalizedEmail = email.toLowerCase().trim();

    // 1. MONGODB ADAPTER
    if (MONGODB_URI) {
      const mongo = await getMongoDb();
      await mongo.collection('users').updateOne(
        { email: normalizedEmail },
        {
          $inc: { allowedScans: count },
          $setOnInsert: { trialCount: 0, createdAt: new Date().toISOString() }
        },
        { upsert: true }
      );
      const user = await mongo.collection('users').findOne({ email: normalizedEmail });
      return {
        email: normalizedEmail,
        trialCount: user?.trialCount ?? 0,
        allowedScans: user?.allowedScans ?? 10,
        createdAt: user?.createdAt ?? new Date().toISOString()
      };
    }

    // 2. VERCEL KV ADAPTER
    if (KV_REST_API_URL && KV_REST_API_TOKEN) {
      const result = await kvExecute(['GET', 'grn_db']);
      let data: DbSchema = { users: {}, otps: {}, sessions: {} };
      if (result) {
        try { data = JSON.parse(result); } catch (e) {}
      }
      
      if (!data.users[normalizedEmail]) {
        data.users[normalizedEmail] = {
          email: normalizedEmail,
          trialCount: 0,
          allowedScans: 10,
          createdAt: new Date().toISOString()
        };
      }
      if (data.users[normalizedEmail].allowedScans === undefined) {
        data.users[normalizedEmail].allowedScans = 10;
      }
      data.users[normalizedEmail].allowedScans += count;
      await kvExecute(['SET', 'grn_db', JSON.stringify(data)]);
      return data.users[normalizedEmail];
    }

    // 3. LOCAL FILESYSTEM ADAPTER
    const data = await initLocalDb();
    if (!data.users[normalizedEmail]) {
      data.users[normalizedEmail] = {
        email: normalizedEmail,
        trialCount: 0,
        allowedScans: 10,
        createdAt: new Date().toISOString()
      };
    }
    if (data.users[normalizedEmail].allowedScans === undefined) {
      data.users[normalizedEmail].allowedScans = 10;
    }
    data.users[normalizedEmail].allowedScans += count;
    await saveLocalDb(data);
    return data.users[normalizedEmail];
  },

  // OTP METHODS
  async createOtp(email: string): Promise<string> {
    const normalizedEmail = email.toLowerCase().trim();
    const otp = String(Math.floor(100000 + Math.random() * 900000));
    const expiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes

    // 1. MONGODB ADAPTER
    if (MONGODB_URI) {
      const mongo = await getMongoDb();
      await mongo.collection('otps').updateOne(
        { email: normalizedEmail },
        { $set: { otp, expiresAt } },
        { upsert: true }
      );
      return otp;
    }

    // 2. VERCEL KV ADAPTER
    if (KV_REST_API_URL && KV_REST_API_TOKEN) {
      const result = await kvExecute(['GET', 'grn_db']);
      let data: DbSchema = { users: {}, otps: {}, sessions: {} };
      if (result) {
        try { data = JSON.parse(result); } catch (e) {}
      }
      data.otps[normalizedEmail] = { otp, expiresAt };
      await kvExecute(['SET', 'grn_db', JSON.stringify(data)]);
      return otp;
    }

    // 3. LOCAL FILESYSTEM ADAPTER
    const data = await initLocalDb();
    data.otps[normalizedEmail] = { otp, expiresAt };
    await saveLocalDb(data);
    return otp;
  },

  async verifyOtp(email: string, code: string): Promise<boolean> {
    const normalizedEmail = email.toLowerCase().trim();

    // 1. MONGODB ADAPTER
    if (MONGODB_URI) {
      const mongo = await getMongoDb();
      const record = await mongo.collection('otps').findOne({ email: normalizedEmail });
      
      if (!record) return false;
      if (record.otp !== code.trim()) return false;
      
      await mongo.collection('otps').deleteOne({ email: normalizedEmail });
      if (Date.now() > record.expiresAt) return false;
      
      return true;
    }

    // 2. VERCEL KV ADAPTER
    if (KV_REST_API_URL && KV_REST_API_TOKEN) {
      const result = await kvExecute(['GET', 'grn_db']);
      let data: DbSchema = { users: {}, otps: {}, sessions: {} };
      if (result) {
        try { data = JSON.parse(result); } catch (e) {}
      }
      
      const record = data.otps[normalizedEmail];
      if (!record) return false;
      if (record.otp !== code.trim()) return false;
      
      delete data.otps[normalizedEmail];
      await kvExecute(['SET', 'grn_db', JSON.stringify(data)]);
      
      if (Date.now() > record.expiresAt) return false;
      return true;
    }

    // 3. LOCAL FILESYSTEM ADAPTER
    const data = await initLocalDb();
    const record = data.otps[normalizedEmail];
    if (!record) return false;
    if (record.otp !== code.trim()) return false;
    
    delete data.otps[normalizedEmail];
    await saveLocalDb(data);
    
    if (Date.now() > record.expiresAt) return false;
    return true;
  },

  // SESSION METHODS
  async createSession(email: string): Promise<string> {
    const normalizedEmail = email.toLowerCase().trim();
    const token = Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2);
    const expiresAt = Date.now() + 24 * 60 * 60 * 1000; // 24 hours

    // 1. MONGODB ADAPTER
    if (MONGODB_URI) {
      const mongo = await getMongoDb();
      await mongo.collection('sessions').insertOne({
        token,
        email: normalizedEmail,
        expiresAt
      });
      return token;
    }

    // 2. VERCEL KV ADAPTER
    if (KV_REST_API_URL && KV_REST_API_TOKEN) {
      const result = await kvExecute(['GET', 'grn_db']);
      let data: DbSchema = { users: {}, otps: {}, sessions: {} };
      if (result) {
        try { data = JSON.parse(result); } catch (e) {}
      }
      data.sessions[token] = { email: normalizedEmail, expiresAt };
      await kvExecute(['SET', 'grn_db', JSON.stringify(data)]);
      return token;
    }

    // 3. LOCAL FILESYSTEM ADAPTER
    const data = await initLocalDb();
    data.sessions[token] = { email: normalizedEmail, expiresAt };
    await saveLocalDb(data);
    return token;
  },

  async getSession(token: string): Promise<SessionRecord | null> {
    // 1. MONGODB ADAPTER
    if (MONGODB_URI) {
      const mongo = await getMongoDb();
      const record = await mongo.collection('sessions').findOne({ token });
      
      if (!record) return null;
      if (Date.now() > record.expiresAt) {
        await mongo.collection('sessions').deleteOne({ token });
        return null;
      }
      
      return {
        email: record.email,
        expiresAt: record.expiresAt
      };
    }

    // 2. VERCEL KV ADAPTER
    if (KV_REST_API_URL && KV_REST_API_TOKEN) {
      const result = await kvExecute(['GET', 'grn_db']);
      let data: DbSchema = { users: {}, otps: {}, sessions: {} };
      if (result) {
        try { data = JSON.parse(result); } catch (e) {}
      }
      
      const record = data.sessions[token];
      if (!record) return null;
      
      if (Date.now() > record.expiresAt) {
        delete data.sessions[token];
        await kvExecute(['SET', 'grn_db', JSON.stringify(data)]);
        return null;
      }
      return record;
    }

    // 3. LOCAL FILESYSTEM ADAPTER
    const data = await initLocalDb();
    const record = data.sessions[token];
    if (!record) return null;
    
    if (Date.now() > record.expiresAt) {
      delete data.sessions[token];
      await saveLocalDb(data);
      return null;
    }
    return record;
  },

  async deleteSession(token: string): Promise<void> {
    // 1. MONGODB ADAPTER
    if (MONGODB_URI) {
      const mongo = await getMongoDb();
      await mongo.collection('sessions').deleteOne({ token });
      return;
    }

    // 2. VERCEL KV ADAPTER
    if (KV_REST_API_URL && KV_REST_API_TOKEN) {
      const result = await kvExecute(['GET', 'grn_db']);
      let data: DbSchema = { users: {}, otps: {}, sessions: {} };
      if (result) {
        try { data = JSON.parse(result); } catch (e) {}
      }
      if (data.sessions[token]) {
        delete data.sessions[token];
        await kvExecute(['SET', 'grn_db', JSON.stringify(data)]);
      }
      return;
    }

    // 3. LOCAL FILESYSTEM ADAPTER
    const data = await initLocalDb();
    if (data.sessions[token]) {
      delete data.sessions[token];
      await saveLocalDb(data);
    }
  },

  // GRN METHODS
  async saveGrn(email: string, grnData: any, photoBase64?: string): Promise<GrnRecord> {
    const normalizedEmail = email.toLowerCase().trim();
    const id = 'grn_' + Math.random().toString(36).substring(2) + Date.now().toString(36);
    const newGrn: GrnRecord = {
      id,
      email: normalizedEmail,
      grnData,
      photoUrl: photoBase64,
      createdAt: new Date().toISOString()
    };

    // 1. MONGODB ADAPTER
    if (MONGODB_URI) {
      const mongo = await getMongoDb();
      await mongo.collection('grns').insertOne(newGrn);
      return newGrn;
    }

    // 2. VERCEL KV ADAPTER
    if (KV_REST_API_URL && KV_REST_API_TOKEN) {
      const result = await kvExecute(['GET', 'grn_db']);
      let data: DbSchema = { users: {}, otps: {}, sessions: {}, grns: {} };
      if (result) {
        try { data = JSON.parse(result); } catch (e) {}
      }
      if (!data.grns) data.grns = {};
      data.grns[id] = newGrn;
      await kvExecute(['SET', 'grn_db', JSON.stringify(data)]);
      return newGrn;
    }

    // 3. LOCAL FILESYSTEM ADAPTER
    const data = await initLocalDb();
    if (!data.grns) data.grns = {};
    data.grns[id] = newGrn;
    await saveLocalDb(data);
    return newGrn;
  },

  async getGrns(email: string): Promise<GrnRecord[]> {
    const normalizedEmail = email.toLowerCase().trim();

    // 1. MONGODB ADAPTER
    if (MONGODB_URI) {
      const mongo = await getMongoDb();
      const records = await mongo.collection('grns')
        .find({ email: normalizedEmail })
        .sort({ createdAt: -1 })
        .toArray();
      return records as unknown as GrnRecord[];
    }

    // 2. VERCEL KV ADAPTER
    if (KV_REST_API_URL && KV_REST_API_TOKEN) {
      const result = await kvExecute(['GET', 'grn_db']);
      let data: DbSchema = { users: {}, otps: {}, sessions: {}, grns: {} };
      if (result) {
        try { data = JSON.parse(result); } catch (e) {}
      }
      if (!data.grns) return [];
      return Object.values(data.grns)
        .filter((g: GrnRecord) => g.email === normalizedEmail)
        .sort((a: GrnRecord, b: GrnRecord) => b.createdAt.localeCompare(a.createdAt));
    }

    // 3. LOCAL FILESYSTEM ADAPTER
    const data = await initLocalDb();
    if (!data.grns) return [];
    return Object.values(data.grns)
      .filter((g: GrnRecord) => g.email === normalizedEmail)
      .sort((a: GrnRecord, b: GrnRecord) => b.createdAt.localeCompare(a.createdAt));
  }
};
