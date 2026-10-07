/**
 * Razorpay Standard Checkout SDK loader and payment initiator
 */

export interface RazorpayCustomerDetails {
  fullName: string;
  phone: string;
  email: string;
}

export interface RazorpayPaymentResult {
  razorpayPaymentId: string;
  razorpayOrderId: string;
  isSimulated?: boolean;
}

/**
 * Dynamically loads the official Razorpay Checkout script
 */
export function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (typeof window === 'undefined') {
      resolve(false);
      return;
    }

    if ((window as any).Razorpay) {
      resolve(true);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => {
      console.warn('Failed to load official Razorpay script from CDN');
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

/**
 * Starts the Razorpay Checkout Flow
 */
export async function startRazorpayCheckout({
  amount,
  receiptId,
  customer,
  brandName = 'Kathlouria Farms',
  onSuccess,
  onError,
  onDismiss,
}: {
  amount: number;
  receiptId: string;
  customer: RazorpayCustomerDetails;
  brandName?: string;
  onSuccess: (result: RazorpayPaymentResult) => void;
  onError: (errorMsg: string) => void;
  onDismiss?: () => void;
}) {
  try {
    // 1. Create order on server
    const orderRes = await fetch('/api/razorpay/create-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        amount,
        receiptId,
        customerName: customer.fullName,
        customerEmail: customer.email,
        customerPhone: customer.phone,
      }),
    });

    const orderData = await orderRes.json();

    if (!orderRes.ok || !orderData.id) {
      onError(orderData.error || 'Failed to initiate payment gateway');
      return;
    }

    // 2. If running in simulated mode (no API keys provided yet)
    if (orderData.isSimulated || orderData.keyId === 'rzp_test_demo') {
      console.info('Razorpay keys not yet provided. Simulating successful test transaction.');
      const simulatedPaymentId = `pay_sim_${Date.now()}`;
      
      // Verify simulated payment
      await fetch('/api/razorpay/verify-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          razorpay_order_id: orderData.id,
          razorpay_payment_id: simulatedPaymentId,
        }),
      });

      onSuccess({
        razorpayPaymentId: simulatedPaymentId,
        razorpayOrderId: orderData.id,
        isSimulated: true,
      });
      return;
    }

    // 3. Load official Razorpay checkout script
    const scriptLoaded = await loadRazorpayScript();
    if (!scriptLoaded || !(window as any).Razorpay) {
      onError('Unable to load Razorpay payment portal. Please check internet connection.');
      return;
    }

    // 4. Initialize Razorpay options
    const options = {
      key: orderData.keyId,
      amount: orderData.amount,
      currency: orderData.currency || 'INR',
      name: brandName,
      description: `Payment for spice harvest order ${receiptId}`,
      order_id: orderData.id,
      prefill: {
        name: customer.fullName,
        email: customer.email,
        contact: customer.phone,
      },
      theme: {
        color: '#142C1E', // Kathlouria Farms forest green
      },
      modal: {
        ondismiss: () => {
          if (onDismiss) onDismiss();
        },
      },
      handler: async function (response: {
        razorpay_payment_id: string;
        razorpay_order_id: string;
        razorpay_signature: string;
      }) {
        try {
          // Verify signature on server
          const verifyRes = await fetch('/api/razorpay/verify-payment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(response),
          });

          const verifyData = await verifyRes.json();

          if (verifyRes.ok && verifyData.verified) {
            onSuccess({
              razorpayPaymentId: response.razorpay_payment_id,
              razorpayOrderId: response.razorpay_order_id,
              isSimulated: false,
            });
          } else {
            onError(verifyData.error || 'Payment signature verification failed');
          }
        } catch (e: any) {
          onError('Verification request failed. Please check your order status.');
        }
      },
    };

    const rzp = new (window as any).Razorpay(options);
    rzp.on('payment.failed', function (response: any) {
      console.error('Payment failed event:', response.error);
      onError(response.error?.description || 'Payment was declined or failed.');
    });
    rzp.open();
  } catch (err: any) {
    console.error('Checkout error:', err);
    onError(err.message || 'Payment initiation failed');
  }
}
