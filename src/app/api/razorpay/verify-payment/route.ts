import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;

    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    // If simulated order or no secret key configured yet
    if (
      !keySecret ||
      keySecret.includes('YOUR_KEY') ||
      (razorpay_order_id && razorpay_order_id.startsWith('order_sim_'))
    ) {
      return NextResponse.json({
        verified: true,
        isSimulated: true,
        paymentId: razorpay_payment_id || `pay_sim_${Date.now()}`,
        orderId: razorpay_order_id,
        message: 'Payment confirmed in test mode.',
      });
    }

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json(
        { error: 'Missing required Razorpay verification parameters' },
        { status: 400 }
      );
    }

    // Standard Razorpay HMAC SHA256 Signature Verification
    const expectedSignature = crypto
      .createHmac('sha256', keySecret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    const isValid = expectedSignature === razorpay_signature;

    if (isValid) {
      return NextResponse.json({
        verified: true,
        isSimulated: false,
        paymentId: razorpay_payment_id,
        orderId: razorpay_order_id,
      });
    } else {
      return NextResponse.json(
        {
          verified: false,
          error: 'Invalid payment signature. Verification failed.',
        },
        { status: 400 }
      );
    }
  } catch (error: any) {
    console.error('Razorpay verification error:', error);
    return NextResponse.json(
      { error: error.message || 'Payment verification encountered an internal error' },
      { status: 500 }
    );
  }
}
