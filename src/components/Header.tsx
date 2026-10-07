import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BrandLogo } from './BrandLogo';
import { useCart } from '../context/CartContext';
import { useRegulatory } from '../context/RegulatoryContext';
import { Search, ShoppingBag, Menu, X, ShieldCheck, Database } from 'lucide-react';

interface HeaderProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  onOpenSearch: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPath,
  onNavigate,
  onOpenSearch,
}) => {
  const { totalItems, setIsCartDrawerOpen } = useCart();
  const { setIsEditorOpen } = useRegulatory();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Shop', path: '/shop' },
    { label: 'Our Story', path: '/our-story' },
    { label: 'Farm & Sourcing', path: '/farm-sourcing' },
    { label: 'Quality', path: '/quality' },
    { label: 'Contact', path: '/contact' },
  ];

  const handleLinkClick = (path: string) => {
    onNavigate(path);
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Top Heritage Notice Bar */}
      <div className="bg-[#0F1F14] text-[#FAF7F0] border-b border-[#C5A467]/20 text-[11px] py-1.5 px-4 tracking-wider uppercase">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-[#C5A467]">ESTD. 1891</span>
            <span className="hidden sm:inline text-white/40">·</span>
            <span className="hidden sm:inline text-white/80 font-normal">Authentic Indian Farm-to-Kitchen Spices</span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span className="text-[#C5A467]">Complimentary Delivery</span>
            <span className="text-white/60">above ₹499 across India</span>
            <button
              onClick={() => setIsEditorOpen(true)}
              className="hidden md:inline-flex items-center gap-1 text-[#C5A467] hover:text-white transition-colors cursor-pointer ml-2 text-[10px] uppercase tracking-wider"
              title="View & Edit Food Safety / FSSAI Information"
            >
              <ShieldCheck className="w-3 h-3 text-[#C5A467]" />
              <span>Food Info / FSSAI</span>
            </button>
            <button
              onClick={() => handleLinkClick('/clients')}
              className="inline-flex items-center gap-1 text-[#4ADE80] hover:text-white transition-colors cursor-pointer ml-2 text-[10px] uppercase tracking-wider font-semibold"
              title="View Supabase Client Data & Orders (rilxmhisjltxnatjwtrz)"
            >
              <Database className="w-3 h-3 text-[#4ADE80]" />
              <span>Database & Clients</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Sticky Navigation Bar (Deep Forest Green with Gold Accents) */}
      <header className="sticky top-0 z-40 bg-[#142C1E] text-[#FAF7F0] border-b border-[#C5A467]/25 shadow-sm transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Zone 1: Brand Wordmark & Seal */}
          <div className="flex items-center">
            <button
              onClick={() => handleLinkClick('/')}
              className="flex items-center text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A467] rounded cursor-pointer"
              aria-label="Kathlouria Farms Home"
            >
              <BrandLogo variant="horizontal" theme="light-on-dark" size="md" />
            </button>
          </div>

          {/* Zone 2: Navigation Links (Clean typography, no pills) */}
          <nav className="hidden lg:flex items-center gap-8" aria-label="Main Navigation">
            {navLinks.map(link => {
              const isActive = currentPath === link.path;
              return (
                <button
                  key={link.path}
                  onClick={() => handleLinkClick(link.path)}
                  className={`text-[13px] tracking-[0.16em] uppercase transition-colors relative py-1 cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'text-[#C5A467] font-semibold'
                      : 'text-[#FAF7F0]/85 hover:text-[#C5A467] font-medium'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#C5A467]" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Primary Actions (Search, Cart, Mobile Toggle) */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Search Trigger */}
            <button
              onClick={onOpenSearch}
              className="w-10 h-10 flex items-center justify-center text-[#FAF7F0] hover:text-[#C5A467] transition-colors rounded-lg cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A467]"
              aria-label="Search spices"
              title="Search spices and collections"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Shopping Bag Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsCartDrawerOpen(true)}
              className="relative h-10 px-3 flex items-center gap-2 text-[#FAF7F0] hover:text-[#C5A467] transition-colors rounded-lg cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A467]"
              aria-label={`Shopping Cart with ${totalItems} items`}
            >
              <ShoppingBag className="w-5 h-5" />
              <motion.span
                key={totalItems}
                suppressHydrationWarning
                initial={{ scale: 0.6 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                className="text-xs font-bold tabular-nums bg-[#C5A467] text-[#122619] rounded-full w-5 h-5 flex items-center justify-center shadow-xs"
              >
                {totalItems}
              </motion.span>
            </motion.button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(prev => !prev)}
              className="lg:hidden w-10 h-10 flex items-center justify-center text-[#FAF7F0] hover:text-[#C5A467] rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A467] cursor-pointer"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer with Smooth Animation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="lg:hidden border-t border-[#C5A467]/20 bg-[#122619] px-6 py-6 space-y-4 overflow-hidden shadow-2xl"
            >
              <nav className="flex flex-col space-y-2">
                {navLinks.map((link, idx) => {
                  const isActive = currentPath === link.path;
                  return (
                    <motion.button
                      key={link.path}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.04 }}
                      onClick={() => handleLinkClick(link.path)}
                      className={`text-left text-sm tracking-[0.14em] uppercase py-3 border-b border-[#FAF7F0]/10 flex items-center justify-between cursor-pointer ${
                        isActive ? 'text-[#C5A467] font-semibold' : 'text-[#FAF7F0] hover:text-[#C5A467]'
                      }`}
                    >
                      <span>{link.label}</span>
                      {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#C5A467]" />}
                    </motion.button>
                  );
                })}
              </nav>
              <div className="pt-2 flex flex-col gap-2.5">
                <button
                  onClick={() => {
                    onNavigate('/cart');
                    setMobileMenuOpen(false);
                  }}
                  suppressHydrationWarning
                  className="w-full py-3.5 text-center text-xs font-semibold tracking-widest uppercase bg-[#C5A467] text-[#122619] rounded-xl hover:bg-[#D4B579] transition-colors cursor-pointer shadow-md"
                >
                  View Cart ({totalItems})
                </button>
                <button
                  onClick={() => {
                    setIsEditorOpen(true);
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2.5 text-center text-xs tracking-wider uppercase border border-[#C5A467]/40 text-[#C5A467] rounded-xl flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Food Safety & FSSAI Details</span>
                </button>
                <button
                  onClick={() => {
                    handleLinkClick('/clients');
                  }}
                  className="w-full py-2.5 text-center text-xs tracking-wider uppercase bg-[#142C1E] border border-[#4ADE80]/40 text-[#4ADE80] rounded-xl flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Database className="w-3.5 h-3.5 text-[#4ADE80]" />
                  <span>Database & Clients (Supabase)</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};
