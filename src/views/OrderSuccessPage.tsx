'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { PlacedOrder } from '../types';
import { useRegulatory } from '../context/RegulatoryContext';
import {
  CheckCircle2,
  Package,
  Truck,
  ArrowRight,
  ShieldCheck,
  Calendar,
  Printer,
  Sparkles,
} from 'lucide-react';

interface OrderSuccessPageProps {
  onNavigate: (path: string) => void;
}

export const OrderSuccessPage: React.FC<OrderSuccessPageProps> = ({ onNavigate }) => {
  const { config } = useRegulatory();
  const [order, setOrder] = useState<PlacedOrder | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('kathlouria_last_order');
      if (stored) {
        try {
          setOrder(JSON.parse(stored));
        } catch (e) {
          console.error(e);
        }
      }
    }
  }, []);

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-8">
      {/* Animated Success Badge */}
      <div className="text-center space-y-4">
        <motion.div
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          className="w-20 h-20 bg-[#2E5C32] text-white rounded-full flex items-center justify-center mx-auto shadow-xl"
        >
          <CheckCircle2 className="w-10 h-10 text-[#C5A467]" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-2"
        >
          <span className="text-xs font-semibold tracking-widest uppercase text-[#C5A467]">
            Farm Order Confirmed · Preparing Fresh Batch
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#142C1E]">
            Thank You for Supporting Authentic Farming
          </h1>
          <p className="text-sm text-[#525955] max-w-lg mx-auto">
            Your single-origin spices will be freshly sealed and dispatched from our Punjab facility.
          </p>
        </motion.div>
      </div>

      {/* Order Details Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-2xl border border-[#142C1E]/15 p-6 sm:p-8 space-y-6 shadow-sm"
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#142C1E]/10 pb-4">
          <div>
            <span className="text-xs text-[#525955] uppercase tracking-wider">Order Reference</span>
            <p className="font-serif text-xl sm:text-2xl font-bold text-[#142C1E] tabular-nums">
              {order?.orderId || 'KF-2026-HERITAGE'}
            </p>
          </div>
          <div className="text-left sm:text-right">
            <span className="text-xs text-[#525955] uppercase tracking-wider">Estimated Dispatch</span>
            <p className="font-bold text-sm text-[#2E5C32] flex items-center gap-1.5">
              <Truck className="w-4 h-4" />
              <span>3 to 5 Business Days via Express Courier</span>
            </p>
          </div>
        </div>

        {/* Order items summary */}
        {order && order.items && (
          <div className="space-y-3">
            <h3 className="font-serif text-lg font-bold text-[#142C1E]">Spices Reserved in Batch</h3>
            <div className="divide-y divide-[#142C1E]/10">
              {order.items.map((it, idx) => (
                <div key={idx} className="py-2.5 flex justify-between items-center text-xs">
                  <div>
                    <span className="font-bold text-[#142C1E]">{it.name}</span>
                    <span className="text-[#525955] ml-2">({it.selectedSize} × {it.quantity})</span>
                  </div>
                  <span className="font-serif font-bold text-sm text-[#142C1E] tabular-nums">
                    ₹{it.price * it.quantity}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-[#142C1E]/10 flex justify-between font-serif text-lg font-bold text-[#142C1E]">
              <span>Total Paid:</span>
              <span className="tabular-nums">₹{order.total}</span>
            </div>
          </div>
        )}

        {/* Delivery Address Snapshot */}
        {order?.customerInfo && (
          <div className="p-4 bg-[#FAF7F0] rounded-xl border border-[#142C1E]/10 space-y-1 text-xs text-[#525955]">
            <span className="font-bold text-[#142C1E] uppercase tracking-wider block">
              Shipping Destination:
            </span>
            <p className="font-bold text-[#142C1E]">{order.customerInfo.fullName} ({order.customerInfo.phone})</p>
            <p>{order.customerInfo.addressLine}, {order.customerInfo.landmark || ''}</p>
            <p>{order.customerInfo.city}, {order.customerInfo.state} - {order.customerInfo.pincode}</p>
            <p className="pt-1 text-[11px] uppercase tracking-wider font-semibold text-[#142C1E]">
              Payment: {order.customerInfo.paymentMethod.toUpperCase()}
            </p>
          </div>
        )}

        {/* Actions */}
        <div className="pt-4 border-t border-[#142C1E]/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            onClick={handlePrint}
            className="w-full sm:w-auto px-5 py-2.5 bg-white border border-[#142C1E]/20 hover:border-[#142C1E] text-[#142C1E] font-bold text-xs uppercase tracking-wider rounded-lg flex items-center justify-center gap-2 cursor-pointer transition-colors"
          >
            <Printer className="w-4 h-4" />
            <span>Print Tax Invoice</span>
          </button>

          <button
            onClick={() => onNavigate('/')}
            className="w-full sm:w-auto px-8 py-3 bg-[#142C1E] hover:bg-[#1A3826] text-[#FAF7F0] font-bold text-xs uppercase tracking-widest rounded-lg flex items-center justify-center gap-2 cursor-pointer transition-colors"
          >
            <span>Return to Farmstead</span>
            <ArrowRight className="w-4 h-4 text-[#C5A467]" />
          </button>
        </div>
      </motion.div>
    </div>
  );
};
