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

    // Note: login is intentionally NOT gated by scan usage. Authentication and the
    // purchase flow must always be reachable — otherwise an exhausted user could never
    // log in to buy more scans. The scan cap is enforced only at scan time (/api/ocr).

    // Create OTP
    const otp = await db.createOtp(normalizedEmail);

    // Trigger OTP sending
    const emailResult = await sendOtpEmail(normalizedEmail, otp);

    // Return success (with mock code if running in demo fallback mode)
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
