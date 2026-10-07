import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useCart } from '../context/CartContext';
import { useRegulatory } from '../context/RegulatoryContext';
import { ProductArtwork } from './ProductArtwork';
import { X, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Tag } from 'lucide-react';

interface CartDrawerProps {
  onNavigate: (path: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ onNavigate }) => {
  const {
    items,
    isCartDrawerOpen,
    setIsCartDrawerOpen,
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
  const [couponMessage, setCouponMessage] = useState<{ text: string; isError: boolean } | null>(null);

  const freeShippingThreshold = config.freeShippingThreshold;
  const progressPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));
  const amountRemaining = Math.max(0, freeShippingThreshold - subtotal);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput) return;
    const success = applyCoupon(couponInput);
    if (success) {
      setCouponMessage({ text: 'Offer code applied successfully!', isError: false });
      setCouponInput('');
    } else {
      setCouponMessage({ text: 'Invalid code. Try FARMFRESH10 for 10% off.', isError: true });
    }
  };

  return (
    <AnimatePresence>
      {isCartDrawerOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop with Fade */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0 bg-[#122619]/60 backdrop-blur-xs"
            onClick={() => setIsCartDrawerOpen(false)}
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="w-screen max-w-md bg-[#FAF7F0] border-l border-[#C5A467]/30 flex flex-col shadow-2xl"
            >
          {/* Drawer Header */}
          <div className="bg-[#142C1E] text-[#FAF7F0] px-6 py-5 flex items-center justify-between border-b border-[#C5A467]/25">
            <div className="flex items-center gap-2.5">
              <span className="font-serif text-xl font-bold tracking-wide uppercase">Your Cart</span>
              <span className="text-xs text-[#C5A467] font-semibold">({totalItems} items)</span>
            </div>
            <button
              onClick={() => setIsCartDrawerOpen(false)}
              className="text-[#FAF7F0] hover:text-[#C5A467] p-1 rounded transition-colors cursor-pointer"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="bg-[#F2ECE1] px-6 py-3 border-b border-[#1A3826]/10 text-xs">
            {amountRemaining > 0 ? (
              <p className="text-[#1A3826] font-medium">
                Add <span className="font-bold tabular-nums">₹{amountRemaining}</span> more for <span className="text-[#C5A467] font-bold">Complimentary Shipping</span>
              </p>
            ) : (
              <p className="text-[#1A3826] font-semibold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#2E5C32]" />
                You have unlocked Complimentary Farm Dispatch!
              </p>
            )}
            <div className="w-full bg-[#DFD6C6] h-1.5 rounded-full mt-2 overflow-hidden">
              <div
                className="bg-[#1A3826] h-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
            {items.length === 0 ? (
              <div className="py-16 text-center">
                <p className="font-serif text-2xl text-[#122619]">Your spice bag is empty.</p>
                <p className="text-xs text-[#525955] mt-2 max-w-xs mx-auto">
                  Explore pure Lakadong turmeric, whole seeds, and slow-ground masalas directly from our farm.
                </p>
                <button
                  onClick={() => {
                    setIsCartDrawerOpen(false);
                    onNavigate('/shop');
                  }}
                  className="mt-6 px-6 py-2.5 text-xs font-semibold tracking-widest uppercase bg-[#1A3826] text-[#FAF7F0] rounded hover:bg-[#122619] transition-colors"
                >
                  Explore Spice Shop
                </button>
              </div>
            ) : (
              items.map(item => (
                <div
                  key={`${item.productId}-${item.selectedSize}`}
                  className="flex gap-4 p-3 bg-[#FDFCFA] rounded-lg border border-[#1A3826]/10"
                >
                  {/* Thumbnail */}
                  <div className="w-20 h-20 shrink-0 bg-[#FAF7F0] rounded overflow-hidden">
                    <ProductArtwork slug={item.slug} size="sm" />
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between">
                        <h4 className="font-serif text-base font-bold text-[#122619] leading-tight">
                          {item.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.productId, item.selectedSize)}
                          className="text-[#88908B] hover:text-[#992D1D] p-1 transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-xs text-[#525955] mt-0.5">
                        Size: <span className="font-semibold text-[#122619]">{item.selectedSize}</span>
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#1A3826]/10">
                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-[#1A3826]/20 rounded bg-[#FAF7F0]">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.productId, item.selectedSize, item.quantity - 1)}
                          className="w-7 h-7 flex items-center justify-center text-[#122619] hover:bg-[#1A3826]/10"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center text-xs font-semibold tabular-nums text-[#122619]">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.productId, item.selectedSize, item.quantity + 1)}
                          className="w-7 h-7 flex items-center justify-center text-[#122619] hover:bg-[#1A3826]/10"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Line Item Total */}
                      <div className="text-right">
                        <span className="font-serif text-base font-bold text-[#122619] tabular-nums">
                          ₹{item.price * item.quantity}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Coupon Code & Totals Section */}
          {items.length > 0 && (
            <div className="bg-[#F5EFEB] border-t border-[#C5A467]/30 px-6 py-4 space-y-3">
              {/* Coupon Form */}
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={couponInput}
                    onChange={e => setCouponInput(e.target.value)}
                    placeholder="Coupon (e.g. FARMFRESH10)"
                    className="w-full bg-[#FAF7F0] border border-[#1A3826]/20 rounded px-3 py-1.5 text-xs text-[#122619] focus:outline-none focus:ring-1 focus:ring-[#1A3826]"
                  />
                  <Tag className="w-3.5 h-3.5 absolute right-2.5 top-2 text-[#7B827E]" />
                </div>
                <button
                  type="submit"
                  className="px-3 py-1.5 bg-[#1A3826] text-[#FAF7F0] text-xs font-semibold uppercase tracking-wider rounded hover:bg-[#122619]"
                >
                  Apply
                </button>
              </form>

              {couponCode && (
                <div className="flex items-center justify-between text-xs text-[#1A3826] bg-[#E8E1D5] px-2.5 py-1 rounded">
                  <span>Applied: <strong>{couponCode}</strong></span>
                  <button onClick={removeCoupon} className="text-[#992D1D] hover:underline text-[11px]">Remove</button>
                </div>
              )}

              {couponMessage && (
                <p className={`text-[11px] ${couponMessage.isError ? 'text-[#992D1D]' : 'text-[#1A3826]'}`}>
                  {couponMessage.text}
                </p>
              )}

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-[#525955] pt-2 border-t border-[#1A3826]/10">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-[#122619] font-medium tabular-nums">₹{subtotal}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-[#1A3826] font-medium">
                    <span>Discount</span>
                    <span className="tabular-nums">-₹{discount}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-[#122619] font-medium tabular-nums">
                    {shippingFee === 0 ? <span className="text-[#C5A467] font-bold">FREE</span> : `₹${shippingFee}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-[#122619] pt-2 border-t border-[#1A3826]/15">
                  <span className="font-serif text-lg">Total Amount</span>
                  <span className="font-serif text-xl tabular-nums">₹{totalAmount}</span>
                </div>
              </div>

              {/* Regulatory Food Info Assurance Note */}
              <div className="flex items-center gap-1.5 text-[10px] text-[#525955] pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C5A467] shrink-0" />
                <span>Compliant with Indian Food Safety & FSSAI mandatory e-commerce labeling.</span>
              </div>

              {/* CTA Buttons */}
              <div className="pt-2 space-y-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsCartDrawerOpen(false);
                    onNavigate('/checkout');
                  }}
                  className="w-full py-3 bg-[#1A3826] hover:bg-[#122619] text-[#FAF7F0] text-xs font-semibold tracking-widest uppercase rounded flex items-center justify-center gap-2 cursor-pointer shadow-sm transition-colors"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4 text-[#C5A467]" />
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setIsCartDrawerOpen(false);
                    onNavigate('/cart');
                  }}
                  className="w-full py-2 bg-transparent border border-[#1A3826]/30 text-[#122619] hover:bg-[#1A3826]/5 text-xs font-semibold tracking-wider uppercase rounded transition-colors text-center"
                >
                  View Full Cart Page
                </button>
              </div>
            </div>
          )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
