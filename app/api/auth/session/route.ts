import { NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import { db } from '../../../../lib/db';

// GET /api/auth/session
// Validates session cookie and returns user authentication state and trial counts
export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('session_token')?.value;

    if (!token) {
      return Response.json({ authenticated: false });
    }

    const session = await db.getSession(token);
    if (!session) {
      // Invalid/expired token, clear cookie
      cookieStore.delete('session_token');
      return Response.json({ authenticated: false });
    }

    const user = await db.getUser(session.email);
    return Response.json({
      authenticated: true,
      email: session.email,
      trialCount: user.trialCount,
      allowedScans: user.allowedScans ?? 10,
      trialsLeft: Math.max(0, (user.allowedScans ?? 10) - user.trialCount)
    });

  } catch (error) {
    console.error('Session GET API error:', error);
    return Response.json({ authenticated: false, error: 'Session check failed' }, { status: 500 });
  }
}

// POST /api/auth/session
// Standard Logout route - deletes the session from database and clears cookie
export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('session_token')?.value;

    if (token) {
      await db.deleteSession(token);
      cookieStore.delete('session_token');
    }

    return Response.json({ success: true, message: 'Logged out successfully' });

  } catch (error) {
    console.error('Session POST API error:', error);
    return Response.json({ success: false, error: 'Logout failed' }, { status: 500 });
  }
}
