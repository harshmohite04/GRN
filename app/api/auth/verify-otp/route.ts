import { NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import { db, isUnlimitedUser } from '../../../../lib/db';

// POST /api/auth/verify-otp
export async function POST(request: NextRequest) {
  try {
    let body: { email: string; otp: string };
    try {
      body = await request.json();
    } catch {
      return Response.json({ success: false, error: 'Invalid JSON body' }, { status: 400 });
    }

    const { email, otp } = body;
    if (!email || !otp) {
      return Response.json({ success: false, error: 'Email and verification code are required' }, { status: 400 });
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Step 1: Verify OTP
    const isValid = await db.verifyOtp(normalizedEmail, otp);
    if (!isValid) {
      return Response.json({ success: false, error: 'Invalid or expired verification code' }, { status: 400 });
    }

    // Step 2: Retrieve User State
    const user = await db.getUser(normalizedEmail);

    // Step 3: Create Session Token
    const sessionToken = await db.createSession(normalizedEmail);

    // Step 4: Save session in HttpOnly Cookie
    const cookieStore = await cookies();
    cookieStore.set('session_token', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60, // 24 hours
      path: '/'
    });

    return Response.json({
      success: true,
      email: normalizedEmail,
      trialCount: user.trialCount,
      allowedScans: user.allowedScans ?? 10,
      trialsLeft: Math.max(0, (user.allowedScans ?? 10) - user.trialCount),
      unlimited: isUnlimitedUser(normalizedEmail)
    });

  } catch (error) {
    console.error('Verify OTP API error:', error);
    const msg = error instanceof Error ? error.message : String(error);
    return Response.json({ success: false, error: `Verification failed: ${msg}` }, { status: 500 });
  }
}
