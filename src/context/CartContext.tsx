import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, PlacedOrder } from '../types';
import { useRegulatory } from './RegulatoryContext';

interface CartContextType {
  items: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>, quantity?: number) => void;
  removeFromCart: (productId: string, selectedSize: string) => void;
  updateQuantity: (productId: string, selectedSize: string, newQty: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  discount: number;
  couponCode: string;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  shippingFee: number;
  totalAmount: number;
  isCartDrawerOpen: boolean;
  setIsCartDrawerOpen: (open: boolean) => void;
  recentOrder: PlacedOrder | null;
  setRecentOrder: (order: PlacedOrder | null) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'kathlouria_cart_items';
const ORDER_STORAGE_KEY = 'kathlouria_last_order';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { config } = useRegulatory();
  const [items, setItems] = useState<CartItem[]>([]);
  const [couponCode, setCouponCode] = useState<string>('');
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [recentOrder, setRecentOrder] = useState<PlacedOrder | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  // Safely hydrate from localStorage on client-side only
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);
      if (savedCart) {
        const parsed = JSON.parse(savedCart);
        if (Array.isArray(parsed)) setItems(parsed);
      }
      const savedOrder = localStorage.getItem(ORDER_STORAGE_KEY);
      if (savedOrder) {
        setRecentOrder(JSON.parse(savedOrder));
      }
    } catch {}
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch {}
  }, [items, isHydrated]);

  useEffect(() => {
    if (!isHydrated) return;
    try {
      if (recentOrder) {
        localStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify(recentOrder));
      }
    } catch {}
  }, [recentOrder, isHydrated]);

  const addToCart = (newItem: Omit<CartItem, 'quantity'>, quantity: number = 1) => {
    setItems(prevItems => {
      const existingIndex = prevItems.findIndex(
        i => i.productId === newItem.productId && i.selectedSize === newItem.selectedSize
      );
      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex].quantity += quantity;
        return updated;
      }
      return [...prevItems, { ...newItem, quantity }];
    });
    setIsCartDrawerOpen(true);
  };

  const removeFromCart = (productId: string, selectedSize: string) => {
    setItems(prev => prev.filter(i => !(i.productId === productId && i.selectedSize === selectedSize)));
  };

  const updateQuantity = (productId: string, selectedSize: string, newQty: number) => {
    if (newQty <= 0) {
      removeFromCart(productId, selectedSize);
      return;
    }
    setItems(prev =>
      prev.map(i => {
        if (i.productId === productId && i.selectedSize === selectedSize) {
          return { ...i, quantity: newQty };
        }
        return i;
      })
    );
  };

  const clearCart = () => {
    setItems([]);
    setCouponCode('');
    setDiscountPercent(0);
  };

  const applyCoupon = (code: string): boolean => {
    const clean = code.trim().toUpperCase();
    if (clean === 'FARMFRESH10' || clean === 'KATHLOURIA10') {
      setCouponCode(clean);
      setDiscountPercent(10);
      return true;
    }
    if (clean === 'HERITAGE1891') {
      setCouponCode(clean);
      setDiscountPercent(15);
      return true;
    }
    return false;
  };

  const removeCoupon = () => {
    setCouponCode('');
    setDiscountPercent(0);
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = Math.round((subtotal * discountPercent) / 100);
  const shippingFee = subtotal === 0 || subtotal >= config.freeShippingThreshold ? 0 : config.standardShippingFee;
  const totalAmount = Math.max(0, subtotal - discount + shippingFee);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
        discount,
        couponCode,
        applyCoupon,
        removeCoupon,
        shippingFee,
        totalAmount,
        isCartDrawerOpen,
        setIsCartDrawerOpen,
        recentOrder,
        setRecentOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
