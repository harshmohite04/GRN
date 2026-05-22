import { NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import Razorpay from 'razorpay';
import { db } from '../../../../lib/db';

export async function POST(request: NextRequest) {
  try {
    // 1. Session check
    const cookieStore = await cookies();
    const token = cookieStore.get('session_token')?.value;
    if (!token) {
      return Response.json({ success: false, error: 'Unauthorized: Please log in first' }, { status: 401 });
    }
    const session = await db.getSession(token);
    if (!session) {
      return Response.json({ success: false, error: 'Session expired' }, { status: 401 });
    }

    // 2. Validate input
    let body: { docCount: number };
    try {
      body = await request.json();
    } catch {
      return Response.json({ success: false, error: 'Invalid JSON body' }, { status: 400 });
    }

    const { docCount } = body;
    if (!docCount || docCount <= 0 || !Number.isInteger(docCount)) {
      return Response.json({ success: false, error: 'Please specify a valid number of documents' }, { status: 400 });
    }

    const pricePerDoc = 12; // ₹12 per document
    const amountINR = docCount * pricePerDoc;
    const amountPaise = amountINR * 100;

    // 3. Razorpay keys check
    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keyId || !keySecret || keyId === 'your_razorpay_key_id_here') {
      console.log(`[DEMO PAYMENT MODE]: Creating mock order for ${docCount} documents (₹${amountINR})`);
      return Response.json({
        success: true,
        mock: true,
        amount: amountPaise,
        currency: 'INR',
        orderId: `order_mock_${Math.random().toString(36).substring(2, 15)}`,
        keyId: 'mock_key_id',
        email: session.email
      });
    }

    // 4. Create actual Razorpay order
    const razorpay = new Razorpay({
      key_id: keyId,
      key_secret: keySecret
    });

    const order = await razorpay.orders.create({
      amount: amountPaise,
      currency: 'INR',
      receipt: `receipt_scans_${Date.now()}`
    });

    return Response.json({
      success: true,
      mock: false,
      amount: order.amount,
      currency: order.currency,
      orderId: order.id,
      keyId: keyId,
      email: session.email
    });

  } catch (error) {
    console.error('Create payment order error:', error);
    const msg = error instanceof Error ? error.message : String(error);
    return Response.json({ success: false, error: `Failed to create payment order: ${msg}` }, { status: 500 });
  }
}
