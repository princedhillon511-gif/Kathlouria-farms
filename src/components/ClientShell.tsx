'use client';

import React, { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { CartProvider } from '../context/CartContext';
import { RegulatoryProvider, useRegulatory } from '../context/RegulatoryContext';
import { Header } from './Header';
import { Footer } from './Footer';
import { CartDrawer } from './CartDrawer';
import { SearchModal } from './SearchModal';
import { RegulatoryEditorModal } from './RegulatoryEditorModal';
import { Product } from '../types';
import { INITIAL_PRODUCTS } from '../data/products';

function AppContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  const handleSelectProduct = (product: Product) => {
    router.push(`/product/${product.slug}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F0] text-[#1F2421]">
      <Header
        currentPath={pathname || '/'}
        onNavigate={handleNavigate}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      <main className="flex-1">
        {children}
      </main>

      <Footer onNavigate={handleNavigate} />

      <CartDrawer onNavigate={handleNavigate} />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectProduct={handleSelectProduct}
      />

      <RegulatoryEditorModal />
    </div>
  );
}

export function ClientShell({ children }: { children: React.ReactNode }) {
  return (
    <RegulatoryProvider>
      <CartProvider>
        <AppContent>
          {children}
        </AppContent>
      </CartProvider>
    </RegulatoryProvider>
  );
}
