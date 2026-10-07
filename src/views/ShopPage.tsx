'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Product } from '../types';
import { INITIAL_PRODUCTS } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { Search, SlidersHorizontal, X, ArrowUpDown, Sparkles } from 'lucide-react';

interface ShopPageProps {
  onSelectProduct: (product: Product) => void;
}

export const ShopPage: React.FC<ShopPageProps> = ({ onSelectProduct }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'name'>('featured');

  const categories = [
    { id: 'all', label: 'All Spices' },
    { id: 'ground-spices', label: 'Ground Spices' },
    { id: 'whole-spices', label: 'Whole Spices' },
    { id: 'heritage-blends', label: 'Heritage Blends' },
  ];

  const filteredProducts = useMemo(() => {
    return INITIAL_PRODUCTS.filter((product) => {
      const matchesCategory =
        selectedCategory === 'all' || product.category === selectedCategory;
      const matchesSearch =
        searchQuery.trim() === '' ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.basePrice - b.basePrice;
      if (sortBy === 'price-desc') return b.basePrice - a.basePrice;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return (b.isHero ? 1 : 0) - (a.isHero ? 1 : 0);
    });
  }, [selectedCategory, searchQuery, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Header Banner */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-2xl mx-auto space-y-3"
      >
        <span className="text-xs font-semibold tracking-widest uppercase text-[#C5A467]">
          Pure Farm Harvest Pantry
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#142C1E]">
          Farmstead Spice Catalog
        </h1>
        <p className="text-sm text-[#525955] leading-relaxed">
          Single-origin whole seeds and cold stone-ground powders sourced directly from regenerative farmsteads.
        </p>
      </motion.div>

      {/* Filter and Search Bar Controls */}
      <div className="bg-[#FAF7F0] border border-[#142C1E]/15 rounded-2xl p-4 sm:p-5 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#525955]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search turmeric, cumin, chili..."
              className="w-full pl-10 pr-10 py-2.5 bg-white border border-[#142C1E]/20 rounded-xl text-sm text-[#142C1E] placeholder:text-[#525955]/60 focus:outline-none focus:ring-2 focus:ring-[#C5A467] focus:border-transparent transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#525955] hover:text-[#142C1E]"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Sort selector */}
          <div className="flex items-center gap-3 self-end md:self-auto">
            <div className="flex items-center gap-1.5 text-xs text-[#525955]">
              <ArrowUpDown className="w-3.5 h-3.5 text-[#C5A467]" />
              <span className="font-medium">Sort by:</span>
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2 bg-white border border-[#142C1E]/20 rounded-xl text-xs font-semibold text-[#142C1E] focus:outline-none focus:ring-2 focus:ring-[#C5A467] cursor-pointer"
            >
              <option value="featured">Featured First</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name">Product Name (A-Z)</option>
            </select>
          </div>
        </div>

        {/* Horizontal Category Filter Pills (Touch friendly scroll on mobile) */}
        <div className="pt-2 border-t border-[#142C1E]/10 flex items-center justify-between overflow-x-auto scrollbar-none pb-1 gap-2">
          <div className="flex items-center gap-2">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`relative px-4 py-2 text-xs font-semibold tracking-wider uppercase rounded-xl transition-all whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-[#142C1E] text-[#FAF7F0] shadow-sm'
                      : 'bg-white text-[#142C1E]/75 hover:text-[#142C1E] border border-[#142C1E]/10'
                  }`}
                >
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          <span className="text-xs text-[#525955] font-semibold tabular-nums whitespace-nowrap hidden sm:inline">
            Showing {filteredProducts.length} items
          </span>
        </div>
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20 bg-white rounded-2xl border border-dashed border-[#142C1E]/20 p-8 space-y-4"
        >
          <div className="w-12 h-12 rounded-full bg-[#EFE9DD] flex items-center justify-center text-[#142C1E] mx-auto">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-2xl font-bold text-[#142C1E]">
            No spices matched your search
          </h3>
          <p className="text-xs text-[#525955] max-w-sm mx-auto">
            Try checking spelling or reset your filters to browse our full farm harvest.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSearchQuery('');
            }}
            className="px-6 py-2.5 bg-[#142C1E] text-[#FAF7F0] text-xs font-semibold tracking-wider uppercase rounded-lg hover:bg-[#1A3826] transition-colors"
          >
            Reset Filters
          </button>
        </motion.div>
      ) : (
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product, idx) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, delay: idx * 0.04 }}
              >
                <ProductCard product={product} onSelect={onSelectProduct} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
};
