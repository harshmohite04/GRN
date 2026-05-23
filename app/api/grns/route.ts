import type { NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import { db } from '../../../lib/db';

// POST /api/grns - Save a new GRN record with optional photo
export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('session_token')?.value;

    if (!token) {
      return Response.json(
        { success: false, error: 'Unauthorized: Please log in first' },
        { status: 401 }
      );
    }

    const session = await db.getSession(token);
    if (!session) {
      cookieStore.delete('session_token');
      return Response.json(
        { success: false, error: 'Session expired. Please log in again' },
        { status: 401 }
      );
    }

    let body: any;
    try {
      body = await request.json();
    } catch {
      return Response.json({ success: false, error: 'Invalid JSON body' }, { status: 400 });
    }

    const { grnData, photoData } = body;
    if (!grnData) {
      return Response.json({ success: false, error: 'grnData is required' }, { status: 400 });
    }

    console.log(`Saving GRN for user: ${session.email}`);
    const newGrn = await db.saveGrn(session.email, grnData, photoData);

    return Response.json({
      success: true,
      grn: newGrn
    });

  } catch (error) {
    console.error('Save GRN error:', error);
    const msg = error instanceof Error ? error.message : String(error);
    return Response.json(
      { success: false, error: `Failed to save GRN: ${msg}` },
      { status: 500 }
    );
  }
}

// GET /api/grns - Retrieve all saved GRN records for the current user
export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('session_token')?.value;

    if (!token) {
      return Response.json(
        { success: false, error: 'Unauthorized: Please log in first' },
        { status: 401 }
      );
    }

    const session = await db.getSession(token);
    if (!session) {
      cookieStore.delete('session_token');
      return Response.json(
        { success: false, error: 'Session expired. Please log in again' },
        { status: 401 }
      );
    }

    console.log(`Fetching saved GRNs for user: ${session.email}`);
    const grns = await db.getGrns(session.email);

    return Response.json({
      success: true,
      grns
    });

  } catch (error) {
    console.error('Fetch GRNs error:', error);
    const msg = error instanceof Error ? error.message : String(error);
    return Response.json(
      { success: false, error: `Failed to fetch GRNs: ${msg}` },
      { status: 500 }
    );
  }
}
