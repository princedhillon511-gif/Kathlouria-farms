'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useCart } from '../context/CartContext';
import { useRegulatory } from '../context/RegulatoryContext';
import { ProductArtwork } from '../components/ProductArtwork';
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShieldCheck,
  Tag,
  ArrowLeft,
  Truck,
} from 'lucide-react';

interface CartPageProps {
  onNavigate: (path: string) => void;
}

export const CartPage: React.FC<CartPageProps> = ({ onNavigate }) => {
  const {
    items,
    updateQuantity,
    removeFromCart,
    subtotal,
    discount,
    couponCode,
    applyCoupon,
    removeCoupon,
    shippingFee,
    totalAmount,
    totalItems,
  } = useCart();

  const { config } = useRegulatory();
  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState<string | null>(null);

  const freeThreshold = config.freeShippingThreshold;
  const progressPercent = Math.min(100, Math.round((subtotal / freeThreshold) * 100));
  const remaining = Math.max(0, freeThreshold - subtotal);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const ok = applyCoupon(couponInput.trim());
    if (!ok) {
      setCouponError('Invalid coupon code. Try FARMFRESH10 for 10% off.');
    } else {
      setCouponError(null);
      setCouponInput('');
    }
  };

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-20 h-20 rounded-full bg-[#EFE9DD] flex items-center justify-center text-[#142C1E] mx-auto shadow-inner"
        >
          <ShoppingBag className="w-9 h-9" />
        </motion.div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#142C1E]">
          Your Spice Bag is Empty
        </h1>
        <p className="text-sm text-[#525955] max-w-md mx-auto">
          Explore single-origin Lakadong turmeric, stone-ground masalas, and whole seeds directly from our farmstead.
        </p>
        <button
          onClick={() => onNavigate('/shop')}
          className="px-8 py-3.5 bg-[#142C1E] text-[#FAF7F0] font-bold text-xs tracking-widest uppercase rounded-xl hover:bg-[#1A3826] transition-colors cursor-pointer"
        >
          Explore Spice Shop
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#142C1E]/10 pb-4">
        <div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#142C1E]">
            Your Spice Bag
          </h1>
          <p className="text-xs text-[#525955] mt-1">
            {totalItems} item{totalItems > 1 ? 's' : ''} carefully packaged for pan-India dispatch
          </p>
        </div>
        <button
          onClick={() => onNavigate('/shop')}
          className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#142C1E] hover:text-[#C5A467] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Continue Shopping</span>
        </button>
      </div>

      {/* Free Delivery Bar */}
      <div className="p-4 bg-[#F2ECE1] rounded-2xl border border-[#142C1E]/10 space-y-2">
        <div className="flex items-center justify-between text-xs">
          {remaining > 0 ? (
            <p className="text-[#142C1E] font-medium">
              Add <span className="font-bold tabular-nums">₹{remaining}</span> more to unlock <span className="text-[#C5A467] font-bold">Complimentary Farm Dispatch</span>
            </p>
          ) : (
            <p className="text-[#2E5C32] font-bold flex items-center gap-1.5">
              <Truck className="w-4 h-4" />
              You qualify for Complimentary Delivery across India!
            </p>
          )}
          <span className="font-semibold text-[#142C1E] tabular-nums">{progressPercent}%</span>
        </div>
        <div className="w-full bg-[#DFD6C6] h-2 rounded-full overflow-hidden">
          <motion.div
            className="bg-[#142C1E] h-full"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
        </div>
      </div>

      {/* Cart Grid Layout (2-Column on Desktop) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Itemized List */}
        <div className="lg:col-span-8 space-y-4">
          <AnimatePresence mode="popLayout">
            {items.map((item) => (
              <motion.div
                key={`${item.productId}-${item.selectedSize}`}
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="p-4 sm:p-5 bg-white rounded-2xl border border-[#142C1E]/15 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 shadow-xs"
              >
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 rounded-xl bg-[#FAF7F0] overflow-hidden shrink-0 border border-[#142C1E]/10">
                    <ProductArtwork slug={item.slug} size="sm" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-bold text-[#142C1E]">{item.name}</h3>
                    <p className="text-xs text-[#525955] mt-0.5">
                      Pack Size: <span className="font-semibold text-[#142C1E]">{item.selectedSize}</span> ({item.weightGrams}g)
                    </p>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="font-serif text-base font-bold text-[#142C1E] tabular-nums">
                        ₹{item.price}
                      </span>
                      {item.mrp > item.price && (
                        <span className="text-xs text-[#525955] line-through tabular-nums">
                          ₹{item.mrp}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right controls: stepper & subtotal & delete */}
                <div className="flex items-center justify-between sm:justify-end gap-6 pt-3 sm:pt-0 border-t sm:border-t-0 border-[#142C1E]/10">
                  {/* Stepper */}
                  <div className="flex items-center border border-[#142C1E]/20 rounded-xl bg-[#FAF7F0]">
                    <button
                      onClick={() => updateQuantity(item.productId, item.selectedSize, item.quantity - 1)}
                      className="w-8 h-8 flex items-center justify-center text-[#142C1E] hover:bg-[#142C1E]/10 rounded-l-xl transition-colors cursor-pointer"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-9 text-center text-xs font-bold tabular-nums text-[#142C1E]">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.productId, item.selectedSize, item.quantity + 1)}
                      className="w-8 h-8 flex items-center justify-center text-[#142C1E] hover:bg-[#142C1E]/10 rounded-r-xl transition-colors cursor-pointer"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Subtotal */}
                  <div className="text-right">
                    <span className="font-serif text-lg font-bold text-[#142C1E] tabular-nums block">
                      ₹{item.price * item.quantity}
                    </span>
                    <button
                      onClick={() => removeFromCart(item.productId, item.selectedSize)}
                      className="text-[#992D1D] hover:underline text-[11px] font-medium transition-colors cursor-pointer inline-flex items-center gap-1"
                    >
                      <Trash2 className="w-3 h-3" />
                      <span>Remove</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Right Column: Order Summary Card */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-[#142C1E]/15 p-6 space-y-6 shadow-sm">
          <h2 className="font-serif text-2xl font-bold text-[#142C1E] border-b border-[#142C1E]/10 pb-3">
            Order Summary
          </h2>

          {/* Coupon Code Section */}
          <div className="space-y-2">
            <span className="text-xs font-semibold text-[#142C1E] uppercase tracking-wider block">
              Promotional Offer Code
            </span>
            {couponCode ? (
              <div className="flex items-center justify-between p-3 bg-[#EFE9DD] rounded-xl border border-[#C5A467]/40 text-xs">
                <div className="flex items-center gap-2 text-[#142C1E] font-semibold">
                  <Tag className="w-4 h-4 text-[#C5A467]" />
                  <span>{couponCode} (10% Saved)</span>
                </div>
                <button
                  onClick={removeCoupon}
                  className="text-[#992D1D] hover:underline font-bold"
                >
                  Remove
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <input
                  type="text"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                  placeholder="e.g. FARMFRESH10"
                  className="flex-1 px-3 py-2 bg-[#FAF7F0] border border-[#142C1E]/20 rounded-xl text-xs uppercase font-medium focus:outline-none focus:ring-2 focus:ring-[#C5A467]"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#142C1E] text-[#FAF7F0] font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-[#1A3826] transition-colors"
                >
                  Apply
                </button>
              </form>
            )}
            {couponError && <p className="text-xs text-red-600">{couponError}</p>}
          </div>

          {/* Price Breakdown */}
          <div className="space-y-3 pt-3 border-t border-[#142C1E]/10 text-xs text-[#525955]">
            <div className="flex justify-between">
              <span>Bag Subtotal</span>
              <span className="tabular-nums font-semibold text-[#142C1E]">₹{subtotal}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-[#2E5C32] font-semibold">
                <span>Promotional Discount</span>
                <span className="tabular-nums">- ₹{discount}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Standard Pan-India Shipping</span>
              <span className="tabular-nums font-semibold text-[#142C1E]">
                {shippingFee === 0 ? (
                  <span className="text-[#2E5C32] font-bold">FREE</span>
                ) : (
                  `₹${shippingFee}`
                )}
              </span>
            </div>
            <div className="flex justify-between text-base font-bold text-[#142C1E] pt-3 border-t border-[#142C1E]/15">
              <span>Total Payable</span>
              <span className="font-serif text-2xl tabular-nums">₹{totalAmount}</span>
            </div>
            <p className="text-[10px] text-[#525955] text-right">
              Includes all applicable Indian GST & FSSAI testing fees
            </p>
          </div>

          {/* Checkout CTA */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onNavigate('/checkout')}
            className="w-full py-4 bg-[#142C1E] hover:bg-[#1A3826] text-[#FAF7F0] font-bold text-xs tracking-widest uppercase rounded-xl flex items-center justify-center gap-2 shadow-lg cursor-pointer transition-colors"
          >
            <span>Proceed to Secure Checkout</span>
            <ArrowRight className="w-4 h-4 text-[#C5A467]" />
          </motion.button>
        </div>
      </div>
    </div>
  );
};
