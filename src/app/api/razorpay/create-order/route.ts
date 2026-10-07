import { NextRequest, NextResponse } from 'next/server';
import Razorpay from 'razorpay';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { amount, customerName, customerEmail, customerPhone, receiptId } = body;

    if (!amount || amount <= 0) {
      return NextResponse.json(
        { error: 'Valid payment amount is required' },
        { status: 400 }
      );
    }

    const keyId = process.env.RAZORPAY_KEY_ID || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    // Check if real credentials are provided and not default placeholders
    const hasValidCredentials =
      keyId &&
      keySecret &&
      !keyId.includes('YOUR_KEY') &&
      !keySecret.includes('YOUR_KEY') &&
      (keyId.startsWith('rzp_test_') || keyId.startsWith('rzp_live_'));

    if (hasValidCredentials) {
      const razorpay = new Razorpay({
        key_id: keyId,
        key_secret: keySecret,
      });

      const options = {
        amount: Math.round(amount * 100), // amount in lowest currency unit (paise)
        currency: 'INR',
        receipt: (receiptId || `rcpt_${Date.now()}`).substring(0, 40),
        notes: {
          customerName: customerName || 'Valued Customer',
          customerEmail: customerEmail || '',
          customerPhone: customerPhone || '',
          brand: 'Kathlouria Farms',
        },
      };

      const order = await razorpay.orders.create(options);

      return NextResponse.json({
        id: order.id,
        amount: order.amount,
        currency: order.currency,
        keyId: keyId,
        isLive: keyId.startsWith('rzp_live_'),
        isSimulated: false,
      });
    }

    // Fallback: Simulated order for instant testing before user adds live credentials
    const simulatedOrderId = `order_sim_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
    return NextResponse.json({
      id: simulatedOrderId,
      amount: Math.round(amount * 100),
      currency: 'INR',
      keyId: keyId || 'rzp_test_demo',
      isSimulated: true,
      message: 'Razorpay API keys not yet configured. Simulated payment mode enabled.',
    });
  } catch (error: any) {
    console.error('Razorpay create-order error:', error);
    return NextResponse.json(
      {
        error: error.message || 'Failed to create Razorpay order',
        details: error,
      },
      { status: 500 }
    );
  }
}
