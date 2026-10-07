'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useCart } from '../context/CartContext';
import { useRegulatory } from '../context/RegulatoryContext';
import { PlacedOrder } from '../types';
import { syncOrderToSupabase } from '../lib/supabase';
import { startRazorpayCheckout } from '../lib/razorpay';
import {
  ShieldCheck,
  CreditCard,
  Truck,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Lock,
  QrCode,
  Banknote,
  Database,
} from 'lucide-react';

interface CheckoutPageProps {
  onNavigate: (path: string) => void;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({ onNavigate }) => {
  const { items, subtotal, discount, shippingFee, totalAmount, clearCart } = useCart();
  const { config } = useRegulatory();

  const [form, setForm] = useState({
    fullName: '',
    phone: '',
    email: '',
    addressLine: '',
    landmark: '',
    city: '',
    state: 'Punjab',
    pincode: '',
    paymentMethod: 'razorpay' as 'razorpay' | 'upi' | 'card' | 'netbanking' | 'cod',
    acceptedFoodTerms: true,
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const indianStates = [
    'Punjab',
    'Haryana',
    'Delhi NCR',
    'Rajasthan',
    'Uttar Pradesh',
    'Maharashtra',
    'Karnataka',
    'Tamil Nadu',
    'Telangana',
    'Gujarat',
    'West Bengal',
    'Kerala',
    'Meghalaya',
    'Assam',
    'Himachal Pradesh',
    'Jammu & Kashmir',
    'Uttarakhand',
    'Goa',
    'Madhya Pradesh',
    'Bihar',
    'Odisha',
  ];

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.fullName || !form.phone || !form.addressLine || !form.city || !form.pincode) {
      setErrorMsg('Please complete all mandatory delivery address fields.');
      return;
    }

    if (!/^\d{6}$/.test(form.pincode.trim())) {
      setErrorMsg('Please enter a valid 6-digit Indian PIN code.');
      return;
    }

    if (!form.acceptedFoodTerms) {
      setErrorMsg('Please acknowledge the statutory food safety disclosure.');
      return;
    }

    setIsProcessing(true);

    const orderId = `KF-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
    const newOrder: PlacedOrder = {
      orderId,
      date: new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }),
      items: [...items],
      subtotal,
      discount,
      shipping: shippingFee,
      total: totalAmount,
      customerInfo: {
        fullName: form.fullName,
        phone: form.phone,
        email: form.email,
        addressLine: form.addressLine,
        landmark: form.landmark,
        city: form.city,
        state: form.state,
        pincode: form.pincode,
        paymentMethod: form.paymentMethod,
      },
      status: 'Confirmed',
      estimatedDelivery: '3 to 5 Business Days via Express Courier',
    };

    // Online payment flow via Razorpay
    if (form.paymentMethod !== 'cod') {
      startRazorpayCheckout({
        amount: totalAmount,
        receiptId: orderId,
        customer: {
          fullName: form.fullName,
          email: form.email,
          phone: form.phone,
        },
        brandName: 'Kathlouria Farms',
        onSuccess: (result) => {
          const paidOrder: PlacedOrder = {
            ...newOrder,
            status: 'Confirmed',
            razorpayPaymentId: result.razorpayPaymentId,
            razorpayOrderId: result.razorpayOrderId,
          };

          if (typeof window !== 'undefined') {
            localStorage.setItem('kathlouria_last_order', JSON.stringify(paidOrder));
            try {
              const existingList = JSON.parse(localStorage.getItem('kathlouria_all_orders') || '[]');
              localStorage.setItem('kathlouria_all_orders', JSON.stringify([paidOrder, ...existingList]));
            } catch {}
          }

          // Sync to Supabase
          syncOrderToSupabase(paidOrder).catch((err) => {
            console.warn('Supabase sync warning:', err);
          });

          clearCart();
          setIsProcessing(false);
          onNavigate('/order-success');
        },
        onError: (errMsg) => {
          setIsProcessing(false);
          setErrorMsg(errMsg || 'Payment was cancelled or unsuccessful. Please try again.');
        },
        onDismiss: () => {
          setIsProcessing(false);
        },
      });
      return;
    }

    // Cash on Delivery flow
    if (typeof window !== 'undefined') {
      localStorage.setItem('kathlouria_last_order', JSON.stringify(newOrder));
      try {
        const existingList = JSON.parse(localStorage.getItem('kathlouria_all_orders') || '[]');
        localStorage.setItem('kathlouria_all_orders', JSON.stringify([newOrder, ...existingList]));
      } catch {}
    }

    // Direct sync to Supabase (saves both Client and Order record)
    syncOrderToSupabase(newOrder)
      .then((res) => {
        if (!res.success && typeof window !== 'undefined') {
          try {
            const pending = JSON.parse(localStorage.getItem('kathlouria_pending_orders') || '[]');
            localStorage.setItem('kathlouria_pending_orders', JSON.stringify([newOrder, ...pending]));
          } catch {}
        }
      })
      .catch((err) => {
        console.warn('Supabase sync warning:', err);
      });

    setTimeout(() => {
      clearCart();
      setIsProcessing(false);
      onNavigate('/order-success');
    }, 1200);
  };

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="font-serif text-3xl font-bold text-[#142C1E]">
          No Spices in Cart to Checkout
        </h2>
        <p className="text-xs text-[#525955]">
          Your bag is empty. Please select spices before proceeding.
        </p>
        <button
          onClick={() => onNavigate('/shop')}
          className="px-6 py-2.5 bg-[#142C1E] text-[#FAF7F0] font-bold text-xs uppercase tracking-wider rounded-lg"
        >
          Return to Shop
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-[#525955]">
        <button onClick={() => onNavigate('/cart')} className="hover:underline flex items-center gap-1">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Bag
        </button>
        <span>/</span>
        <span className="text-[#142C1E] font-semibold">Secure Checkout</span>
      </div>

      <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#142C1E]">
        Dispatch & Payment Details
      </h1>

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Delivery & Payment Details */}
        <div className="lg:col-span-8 space-y-6">
          {/* 1. Delivery Address Card */}
          <div className="bg-white rounded-2xl border border-[#142C1E]/15 p-6 space-y-4 shadow-xs">
            <div className="flex items-center gap-2 border-b border-[#142C1E]/10 pb-3">
              <Truck className="w-5 h-5 text-[#C5A467]" />
              <h2 className="font-serif text-xl font-bold text-[#142C1E]">
                1. Pan-India Delivery Address
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-[#142C1E] mb-1">
                  Recipient Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={form.fullName}
                  onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                  placeholder="e.g. Manpreet Singh"
                  className="w-full px-3.5 py-2.5 bg-[#FAF7F0] border border-[#142C1E]/20 rounded-xl text-xs focus:ring-2 focus:ring-[#C5A467] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-[#142C1E] mb-1">
                  10-Digit Mobile Number *
                </label>
                <input
                  type="tel"
                  required
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="e.g. 9876543210"
                  className="w-full px-3.5 py-2.5 bg-[#FAF7F0] border border-[#142C1E]/20 rounded-xl text-xs focus:ring-2 focus:ring-[#C5A467] focus:outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold uppercase text-[#142C1E] mb-1">
                  Email Address (For Dispatch Receipt)
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="e.g. name@example.com"
                  className="w-full px-3.5 py-2.5 bg-[#FAF7F0] border border-[#142C1E]/20 rounded-xl text-xs focus:ring-2 focus:ring-[#C5A467] focus:outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold uppercase text-[#142C1E] mb-1">
                  Flat, House No., Building, Street *
                </label>
                <input
                  type="text"
                  required
                  value={form.addressLine}
                  onChange={(e) => setForm({ ...form, addressLine: e.target.value })}
                  placeholder="e.g. Farmstead Villa 12, G.T. Road"
                  className="w-full px-3.5 py-2.5 bg-[#FAF7F0] border border-[#142C1E]/20 rounded-xl text-xs focus:ring-2 focus:ring-[#C5A467] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-[#142C1E] mb-1">
                  Landmark (Optional)
                </label>
                <input
                  type="text"
                  value={form.landmark}
                  onChange={(e) => setForm({ ...form, landmark: e.target.value })}
                  placeholder="e.g. Near Heritage Well"
                  className="w-full px-3.5 py-2.5 bg-[#FAF7F0] border border-[#142C1E]/20 rounded-xl text-xs focus:ring-2 focus:ring-[#C5A467] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-[#142C1E] mb-1">
                  City / Town *
                </label>
                <input
                  type="text"
                  required
                  value={form.city}
                  onChange={(e) => setForm({ ...form, city: e.target.value })}
                  placeholder="e.g. Amritsar"
                  className="w-full px-3.5 py-2.5 bg-[#FAF7F0] border border-[#142C1E]/20 rounded-xl text-xs focus:ring-2 focus:ring-[#C5A467] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-[#142C1E] mb-1">
                  State / Union Territory *
                </label>
                <select
                  value={form.state}
                  onChange={(e) => setForm({ ...form, state: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#FAF7F0] border border-[#142C1E]/20 rounded-xl text-xs focus:ring-2 focus:ring-[#C5A467] focus:outline-none cursor-pointer"
                >
                  {indianStates.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-[#142C1E] mb-1">
                  6-Digit Postal PIN Code *
                </label>
                <input
                  type="text"
                  required
                  maxLength={6}
                  value={form.pincode}
                  onChange={(e) => setForm({ ...form, pincode: e.target.value })}
                  placeholder="e.g. 143001"
                  className="w-full px-3.5 py-2.5 bg-[#FAF7F0] border border-[#142C1E]/20 rounded-xl text-xs focus:ring-2 focus:ring-[#C5A467] focus:outline-none tabular-nums"
                />
              </div>
            </div>
          </div>

          {/* 2. Payment Method Card */}
          <div className="bg-white rounded-2xl border border-[#142C1E]/15 p-6 space-y-4 shadow-xs">
            <div className="flex items-center justify-between border-b border-[#142C1E]/10 pb-3">
              <div className="flex items-center gap-2">
                <Lock className="w-5 h-5 text-[#C5A467]" />
                <h2 className="font-serif text-xl font-bold text-[#142C1E]">
                  2. Select Payment Mode
                </h2>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#142C1E] bg-[#FAF7F0] px-2.5 py-1 rounded-lg border border-[#142C1E]/10">
                <ShieldCheck className="w-3.5 h-3.5 text-[#2E5C32]" />
                <span>Secured by Razorpay</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                {
                  id: 'razorpay',
                  title: 'Razorpay Secure Payment',
                  subtitle: 'UPI (GPay, PhonePe, Paytm), All Cards, NetBanking',
                  tag: 'Recommended',
                  icon: ShieldCheck,
                },
                {
                  id: 'upi',
                  title: 'Instant UPI / QR Code',
                  subtitle: 'Google Pay, PhonePe, Paytm, BHIM via Razorpay',
                  tag: 'Zero Fee',
                  icon: QrCode,
                },
                {
                  id: 'card',
                  title: 'Credit / Debit Card',
                  subtitle: 'Visa, Mastercard, RuPay via Razorpay',
                  tag: 'Domestic & Intl',
                  icon: CreditCard,
                },
                {
                  id: 'cod',
                  title: 'Cash on Delivery',
                  subtitle: 'Pay at your doorstep upon parcel arrival',
                  tag: 'Doorstep',
                  icon: Banknote,
                },
              ].map((pm) => {
                const isSelected = form.paymentMethod === pm.id;
                const Icon = pm.icon;
                return (
                  <button
                    key={pm.id}
                    type="button"
                    onClick={() => setForm({ ...form, paymentMethod: pm.id as any })}
                    className={`p-4 rounded-xl border text-left flex items-start justify-between gap-3 transition-all cursor-pointer ${
                      isSelected
                        ? 'border-[#142C1E] bg-[#FAF7F0] ring-2 ring-[#C5A467] shadow-xs'
                        : 'border-[#142C1E]/15 bg-white hover:border-[#142C1E]/40'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <Icon className="w-5 h-5 text-[#C5A467] shrink-0 mt-0.5" />
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-xs text-[#142C1E]">{pm.title}</h4>
                        </div>
                        <p className="text-[11px] text-[#525955] mt-0.5">{pm.subtitle}</p>
                      </div>
                    </div>
                    {pm.tag && (
                      <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full shrink-0 ${
                        isSelected
                          ? 'bg-[#142C1E] text-[#FAF7F0]'
                          : 'bg-[#FAF7F0] text-[#525955] border border-[#142C1E]/10'
                      }`}>
                        {pm.tag}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="pt-2 flex items-center justify-center gap-1.5 text-[11px] text-[#525955]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#2E5C32]" />
              <span>100% Secure 256-Bit SSL Encrypted Checkout</span>
            </div>
          </div>

          {/* Statutory Disclosure Checkbox */}
          <div className="p-4 bg-[#FAF7F0] rounded-xl border border-[#142C1E]/15 flex items-start gap-3 text-xs text-[#525955]">
            <input
              type="checkbox"
              id="foodTerms"
              checked={form.acceptedFoodTerms}
              onChange={(e) => setForm({ ...form, acceptedFoodTerms: e.target.checked })}
              className="mt-0.5 rounded text-[#142C1E] focus:ring-[#C5A467] cursor-pointer"
            />
            <label htmlFor="foodTerms" className="cursor-pointer leading-relaxed">
              I acknowledge that Kathlouria Farms spices are 100% natural agricultural produce, stone-ground without chemical stabilizers or anti-caking agents under FSSAI Central License <span className="font-bold text-[#142C1E]">{config.fssaiLicenceNo}</span>.
            </label>
          </div>

          {errorMsg && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg">
              {errorMsg}
            </div>
          )}
        </div>

        {/* Right Column: Order Confirmation Summary */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-[#142C1E]/15 p-6 space-y-6 shadow-sm sticky top-28">
          <h2 className="font-serif text-2xl font-bold text-[#142C1E] border-b border-[#142C1E]/10 pb-3">
            Review Order ({items.length})
          </h2>

          <div className="space-y-3 max-h-60 overflow-y-auto pr-1 text-xs">
            {items.map((it) => (
              <div
                key={`${it.productId}-${it.selectedSize}`}
                className="flex justify-between items-center py-1.5 border-b border-[#142C1E]/10"
              >
                <div className="truncate pr-2">
                  <p className="font-bold text-[#142C1E] truncate">{it.name}</p>
                  <p className="text-[#525955]">
                    {it.selectedSize} × {it.quantity}
                  </p>
                </div>
                <span className="font-serif font-bold text-sm text-[#142C1E] tabular-nums">
                  ₹{it.price * it.quantity}
                </span>
              </div>
            ))}
          </div>

          {/* Breakdown */}
          <div className="space-y-2 text-xs text-[#525955] pt-2 border-t border-[#142C1E]/10">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="tabular-nums font-semibold text-[#142C1E]">₹{subtotal}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-[#2E5C32] font-semibold">
                <span>Promotional Discount</span>
                <span className="tabular-nums">- ₹{discount}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Pan-India Delivery</span>
              <span className="tabular-nums font-semibold text-[#142C1E]">
                {shippingFee === 0 ? <span className="text-[#2E5C32]">FREE</span> : `₹${shippingFee}`}
              </span>
            </div>
            <div className="flex justify-between text-base font-bold text-[#142C1E] pt-2 border-t border-[#142C1E]/15">
              <span>Final Total</span>
              <span className="font-serif text-2xl tabular-nums">₹{totalAmount}</span>
            </div>
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isProcessing}
            className="w-full py-4 bg-[#142C1E] hover:bg-[#1A3826] text-[#FAF7F0] font-bold text-xs tracking-widest uppercase rounded-xl flex items-center justify-center gap-2 shadow-lg cursor-pointer transition-all disabled:opacity-70"
          >
            {isProcessing ? (
              <span>Connecting Razorpay Gateway...</span>
            ) : form.paymentMethod !== 'cod' ? (
              <>
                <ShieldCheck className="w-4 h-4 text-[#C5A467]" />
                <span>Pay via Razorpay · ₹{totalAmount}</span>
                <ArrowRight className="w-4 h-4 text-[#C5A467]" />
              </>
            ) : (
              <>
                <span>Place Cash on Delivery Order · ₹{totalAmount}</span>
                <ArrowRight className="w-4 h-4 text-[#C5A467]" />
              </>
            )}
          </motion.button>

          <div className="flex items-center justify-center gap-2 text-[11px] text-[#525955]">
            <ShieldCheck className="w-4 h-4 text-[#2E5C32]" />
            <span>FSSAI Certified Farm Direct Packaging</span>
          </div>
        </div>
      </form>
    </div>
  );
};
