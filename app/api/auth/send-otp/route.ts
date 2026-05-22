import { NextRequest } from 'next/server';
import { db } from '../../../../lib/db';
import { sendOtpEmail } from '../../../../lib/email';

// POST /api/auth/send-otp
export async function POST(request: NextRequest) {
  try {
    let body: { email: string };
    try {
      body = await request.json();
    } catch {
      return Response.json({ success: false, error: 'Invalid JSON body' }, { status: 400 });
    }

    const { email } = body;
    if (!email || !email.includes('@')) {
      return Response.json({ success: false, error: 'Please enter a valid email address' }, { status: 400 });
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Step 1: Check trial scan limit (Max 10)
    const user = await db.getUser(normalizedEmail);
    if (user.trialCount >= 10) {
      return Response.json(
        { 
          success: false, 
          error: 'This email has already exhausted all 10 free trial scans. Please contact sales to unlock full access.' 
        }, 
        { status: 400 }
      );
    }

    // Step 2: Create OTP
    const otp = await db.createOtp(normalizedEmail);

    // Step 3: Trigger OTP sending
    const emailResult = await sendOtpEmail(normalizedEmail, otp);

    // Step 4: Return success (with mock code if running in demo fallback mode)
    return Response.json({
      success: true,
      message: emailResult.mock 
        ? 'Verification code generated in Demo Mode.' 
        : 'Verification code sent successfully to your inbox.',
      isMock: emailResult.mock,
      mockOtp: emailResult.mock ? otp : null // Expose code only in developer demo mode for convenience
    });

  } catch (error) {
    console.error('Send OTP API error:', error);
    const msg = error instanceof Error ? error.message : String(error);
    return Response.json({ success: false, error: `Auth service error: ${msg}` }, { status: 500 });
  }
}
