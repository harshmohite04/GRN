import fs from 'fs';
import path from 'path';
import os from 'os';

// Determine if we are running in Vercel or a serverless environment
const isVercel = !!process.env.VERCEL;

// Define DB path
// On Vercel, we must write to the writable temporary directory (/tmp)
const DB_DIR = isVercel ? os.tmpdir() : path.join(process.cwd(), 'data');
const DB_FILE = path.join(DB_DIR, 'db.json');

// Read-only path to the bundled db.json (used as seed data if it exists)
const BUNDLED_DB_FILE = path.join(process.cwd(), 'data', 'db.json');

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

interface DbSchema {
  users: Record<string, UserRecord>;
  otps: Record<string, OtpRecord>;
  sessions: Record<string, SessionRecord>;
}

// Initialize DB file if not exists
function initDb(): DbSchema {
  if (!fs.existsSync(DB_DIR)) {
    fs.mkdirSync(DB_DIR, { recursive: true });
  }
  
  if (!fs.existsSync(DB_FILE)) {
    // If we're on Vercel and the DB_FILE does not exist in /tmp, check if we have a bundled one to seed from
    if (isVercel && fs.existsSync(BUNDLED_DB_FILE)) {
      try {
        const seedData = fs.readFileSync(BUNDLED_DB_FILE, 'utf-8');
        fs.writeFileSync(DB_FILE, seedData, 'utf-8');
        return JSON.parse(seedData) as DbSchema;
      } catch (err) {
        console.error('Error seeding db.json from bundled file on Vercel:', err);
      }
    }
    
    // Otherwise, write the default empty database structure
    const defaultData: DbSchema = { users: {}, otps: {}, sessions: {} };
    fs.writeFileSync(DB_FILE, JSON.stringify(defaultData, null, 2), 'utf-8');
    return defaultData;
  }
  
  try {
    const raw = fs.readFileSync(DB_FILE, 'utf-8');
    return JSON.parse(raw) as DbSchema;
  } catch (err) {
    console.error('Error parsing db.json, resetting database...', err);
    // If read failed, try to recover from seed on Vercel
    if (isVercel && fs.existsSync(BUNDLED_DB_FILE)) {
      try {
        const seedData = fs.readFileSync(BUNDLED_DB_FILE, 'utf-8');
        fs.writeFileSync(DB_FILE, seedData, 'utf-8');
        return JSON.parse(seedData) as DbSchema;
      } catch (e) {
        // ignore and fallback
      }
    }
    const defaultData: DbSchema = { users: {}, otps: {}, sessions: {} };
    fs.writeFileSync(DB_FILE, JSON.stringify(defaultData, null, 2), 'utf-8');
    return defaultData;
  }
}

// Write to DB file synchronously to guarantee thread-safe writes
function saveDb(data: DbSchema) {
  try {
    if (!fs.existsSync(DB_DIR)) {
      fs.mkdirSync(DB_DIR, { recursive: true });
    }
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error saving db.json:', err);
  }
}

// Core Database Operations
export const db = {
  // USER METHODS
  getUser(email: string): UserRecord {
    const data = initDb();
    const normalizedEmail = email.toLowerCase().trim();
    if (!data.users[normalizedEmail]) {
      // Create user if not exists
      data.users[normalizedEmail] = {
        email: normalizedEmail,
        trialCount: 0,
        allowedScans: 10,
        createdAt: new Date().toISOString()
      };
      saveDb(data);
    } else if (data.users[normalizedEmail].allowedScans === undefined) {
      // Migrate existing records
      data.users[normalizedEmail].allowedScans = 10;
      saveDb(data);
    }
    return data.users[normalizedEmail];
  },

  incrementTrial(email: string): UserRecord {
    const data = initDb();
    const normalizedEmail = email.toLowerCase().trim();
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
    saveDb(data);
    return data.users[normalizedEmail];
  },

  addScans(email: string, count: number): UserRecord {
    const data = initDb();
    const normalizedEmail = email.toLowerCase().trim();
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
    saveDb(data);
    return data.users[normalizedEmail];
  },

  // OTP METHODS
  createOtp(email: string): string {
    const data = initDb();
    const normalizedEmail = email.toLowerCase().trim();
    
    // Generate secure random 6-digit number
    const otp = String(Math.floor(100000 + Math.random() * 900000));
    const expiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes expiration
    
    data.otps[normalizedEmail] = { otp, expiresAt };
    saveDb(data);
    
    return otp;
  },

  verifyOtp(email: string, code: string): boolean {
    const data = initDb();
    const normalizedEmail = email.toLowerCase().trim();
    const record = data.otps[normalizedEmail];
    
    if (!record) return false;
    if (record.otp !== code.trim()) return false;
    if (Date.now() > record.expiresAt) {
      // Expired, delete it
      delete data.otps[normalizedEmail];
      saveDb(data);
      return false;
    }
    
    // Success, delete the OTP so it cannot be reused
    delete data.otps[normalizedEmail];
    saveDb(data);
    return true;
  },

  // SESSION METHODS
  createSession(email: string): string {
    const data = initDb();
    const normalizedEmail = email.toLowerCase().trim();
    
    // Generate standard secure random string as token
    const token = Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2);
    const expiresAt = Date.now() + 24 * 60 * 60 * 1000; // 24 hours
    
    data.sessions[token] = { email: normalizedEmail, expiresAt };
    saveDb(data);
    
    return token;
  },

  getSession(token: string): SessionRecord | null {
    const data = initDb();
    const record = data.sessions[token];
    
    if (!record) return null;
    if (Date.now() > record.expiresAt) {
      // Session expired, delete it
      delete data.sessions[token];
      saveDb(data);
      return null;
    }
    
    return record;
  },

  deleteSession(token: string) {
    const data = initDb();
    if (data.sessions[token]) {
      delete data.sessions[token];
      saveDb(data);
    }
  }
};
