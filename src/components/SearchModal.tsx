'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Product } from '../types';
import { INITIAL_PRODUCTS } from '../data/products';
import { ProductArtwork } from './ProductArtwork';
import { Search, X, ArrowRight } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, onSelectProduct }) => {
  const [query, setQuery] = useState('');

  const filteredProducts = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return INITIAL_PRODUCTS.filter(
      p =>
        p.name.toLowerCase().includes(q) ||
        p.shortDescription.toLowerCase().includes(q) ||
        p.origin.toLowerCase().includes(q) ||
        p.categoryLabel.toLowerCase().includes(q) ||
        p.tags.some(t => t.toLowerCase().includes(q))
    );
  }, [query]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 md:p-20 flex items-start justify-center">
          {/* Backdrop with Fade */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-[#122619]/65 backdrop-blur-xs"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -16 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="relative w-full max-w-2xl bg-[#FAF7F0] border border-[#C5A467]/35 rounded-2xl shadow-2xl overflow-hidden z-10"
          >
            {/* Search Input Bar */}
            <div className="flex items-center px-5 py-4 border-b border-[#1A3826]/15 bg-[#FDFCFA]">
              <Search className="w-5 h-5 text-[#C5A467] mr-3 shrink-0" />
              <input
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search our harvest spices (e.g. Saunf, Jeera, Turmeric, Red Chilly)..."
                className="w-full bg-transparent text-sm text-[#122619] placeholder-[#88908B] focus:outline-none"
                autoFocus
              />
              <button
                onClick={onClose}
                className="text-[#525955] hover:text-[#122619] p-1.5 rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Results Container */}
            <div className="p-5 max-h-[60vh] overflow-y-auto">
              {query.trim() === '' ? (
                <div className="py-8 text-center">
                  <p className="text-xs text-[#525955] uppercase tracking-wider font-semibold">
                    Popular Farmstead Searches
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center mt-3">
                    {['Lakadong Turmeric', 'Kashmiri Saffron', 'Guntur Chilly', 'Tellicherry Pepper', 'Saunf'].map(term => (
                      <button
                        key={term}
                        onClick={() => setQuery(term)}
                        className="px-3 py-1 bg-white border border-[#1A3826]/15 text-xs text-[#122619] rounded-lg hover:border-[#C5A467] transition-colors cursor-pointer"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              ) : filteredProducts.length === 0 ? (
                <div className="py-12 text-center text-[#525955] space-y-2">
                  <p className="font-serif text-lg text-[#122619]">No harvested spices matched "{query}"</p>
                  <p className="text-xs">Try searching for turmeric, chilly, jeera, or whole seeds.</p>
                </div>
              ) : (
                <div className="space-y-2.5">
                  <p className="text-[11px] font-semibold text-[#525955] uppercase tracking-wider mb-2">
                    Found {filteredProducts.length} Results
                  </p>
                  {filteredProducts.map(product => (
                    <div
                      key={product.id}
                      onClick={() => {
                        onSelectProduct(product);
                        onClose();
                      }}
                      className="flex items-center gap-4 p-3 bg-[#FDFCFA] hover:bg-[#F5EFEB] rounded-xl border border-[#1A3826]/10 transition-colors cursor-pointer group"
                    >
                      <div className="w-14 h-14 shrink-0 bg-[#FAF7F0] rounded-lg overflow-hidden border border-[#142C1E]/10">
                        <ProductArtwork slug={product.slug} size="sm" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-serif text-base font-bold text-[#122619] group-hover:text-[#1A3826] truncate">
                          {product.name}
                        </h4>
                        <p className="text-xs text-[#525955] truncate">{product.shortDescription}</p>
                        <span className="text-[11px] text-[#C5A467] font-semibold">{product.origin}</span>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="font-serif text-lg font-bold text-[#122619] tabular-nums">
                          ₹{product.basePrice}
                        </span>
                        <ArrowRight className="w-4 h-4 text-[#C5A467] ml-auto mt-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
