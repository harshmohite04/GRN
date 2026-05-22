import { NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import crypto from 'crypto';
import { db } from '../../../../lib/db';

export async function POST(request: NextRequest) {
  try {
    // 1. Session check
    const cookieStore = await cookies();
    const token = cookieStore.get('session_token')?.value;
    if (!token) {
      return Response.json({ success: false, error: 'Unauthorized: Please log in first' }, { status: 401 });
    }
    const session = db.getSession(token);
    if (!session) {
      return Response.json({ success: false, error: 'Session expired' }, { status: 401 });
    }

    // 2. Validate input
    let body: {
      razorpay_payment_id: string;
      razorpay_order_id: string;
      razorpay_signature: string;
      docCount: number;
    };
    try {
      body = await request.json();
    } catch {
      return Response.json({ success: false, error: 'Invalid JSON body' }, { status: 400 });
    }

    const { razorpay_payment_id, razorpay_order_id, razorpay_signature, docCount } = body;

    if (!docCount || docCount <= 0 || !Number.isInteger(docCount)) {
      return Response.json({ success: false, error: 'Invalid document count' }, { status: 400 });
    }

    if (!razorpay_order_id || !razorpay_payment_id) {
      return Response.json({ success: false, error: 'Missing payment details' }, { status: 400 });
    }

    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    const isMockOrder = razorpay_order_id.startsWith('order_mock_');

    if (isMockOrder) {
      // Mock order verification
      console.log(`[DEMO PAYMENT MODE]: Verifying mock payment for ${docCount} documents.`);
      
      // Update allowed scans
      const updatedUser = db.addScans(session.email, docCount);
      const updatedAllowed = updatedUser.allowedScans ?? 10;

      return Response.json({
        success: true,
        mock: true,
        allowedScans: updatedAllowed,
        trialsLeft: Math.max(0, updatedAllowed - updatedUser.trialCount)
      });
    }

    // Real signature check
    if (!keySecret) {
      return Response.json({ success: false, error: 'Payment gateway credentials are not configured on server' }, { status: 500 });
    }

    if (!razorpay_signature) {
      return Response.json({ success: false, error: 'Missing signature verification token' }, { status: 400 });
    }

    const hmac = crypto.createHmac('sha256', keySecret);
    hmac.update(razorpay_order_id + '|' + razorpay_payment_id);
    const generatedSignature = hmac.digest('hex');

    if (generatedSignature !== razorpay_signature) {
      return Response.json({ success: false, error: 'Payment signature mismatch' }, { status: 400 });
    }

    // Update allowed scans in DB
    const updatedUser = db.addScans(session.email, docCount);
    const updatedAllowed = updatedUser.allowedScans ?? 10;

    console.log(`[PAYMENT VERIFIED]: Added ${docCount} scans for ${session.email}. Total allowed: ${updatedAllowed}`);

    return Response.json({
      success: true,
      mock: false,
      allowedScans: updatedAllowed,
      trialsLeft: Math.max(0, updatedAllowed - updatedUser.trialCount)
    });

  } catch (error) {
    console.error('Verify payment error:', error);
    const msg = error instanceof Error ? error.message : String(error);
    return Response.json({ success: false, error: `Failed to verify payment: ${msg}` }, { status: 500 });
  }
}
