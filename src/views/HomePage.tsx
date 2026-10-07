'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Product } from '../types';
import { INITIAL_PRODUCTS } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { BrandLogo } from '../components/BrandLogo';
import { ComingSoonPhotoBanner } from '../components/ComingSoonPhotoBanner';
import { ComingSoonShowcase } from '../components/ComingSoonShowcase';
import { MasalaBenefitsSection } from '../components/MasalaBenefitsSection';
import { useRegulatory } from '../context/RegulatoryContext';
import {
  ArrowRight,
  ShieldCheck,
  Award,
  Sparkles,
  ChevronRight,
  CheckCircle2,
  Wheat,
  Sun,
  Flame,
  Truck,
  Leaf,
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (path: string) => void;
  onSelectProduct: (product: Product) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onSelectProduct }) => {
  const { config, setIsEditorOpen } = useRegulatory();
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Spices' },
    { id: 'ground-spices', label: 'Ground Spices' },
    { id: 'whole-spices', label: 'Whole Spices' },
    { id: 'heritage-blends', label: 'Heritage Blends' },
  ];

  const filteredProducts =
    activeCategory === 'all'
      ? INITIAL_PRODUCTS
      : INITIAL_PRODUCTS.filter((p) => p.category === activeCategory);

  const heroProduct = INITIAL_PRODUCTS.find((p) => p.isHero) || INITIAL_PRODUCTS[0];

  return (
    <div className="space-y-16 sm:space-y-24 overflow-hidden">
      {/* 1. HERO SECTION WITH RICH ANIMATIONS & RESPONSIVE LAYOUT */}
      <section className="relative bg-[#142C1E] text-[#FAF7F0] pt-12 sm:pt-16 pb-20 sm:pb-28 px-4 sm:px-6 lg:px-8 border-b border-[#C5A467]/25 overflow-hidden">
        {/* Subtle decorative background texture & ambient lighting */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(197,164,103,0.15),rgba(255,255,255,0))]" />
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#C5A467]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#2E5C32]/20 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Hero Column: Brand Narrative & CTA */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-7 space-y-6 text-center lg:text-left"
            >
              {/* Kicker badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                className="inline-flex items-center gap-2 px-3 py-1 bg-[#0C1F14] border border-[#C5A467]/30 rounded-full text-xs text-[#C5A467] font-semibold tracking-widest uppercase"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#C5A467]" />
                <span>Punjab Farmstead Harvest · Estd. 1891</span>
              </motion.div>

              <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-[#FAF7F0] tracking-tight leading-[1.15] text-balance">
                Pure, Single-Origin Spices <br className="hidden sm:inline" />
                <span className="italic font-normal text-[#C5A467]">Stone-Ground</span> by Tradition.
              </h1>

              <p className="text-base sm:text-lg text-[#FAF7F0]/85 max-w-2xl mx-auto lg:mx-0 font-light leading-relaxed">
                Grown on organic Indian soil, slow-milled under 35°C to preserve essential oils, aroma, and high natural curcumin. Zero fillers, zero starch, and no artificial colorants.
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onNavigate('/shop')}
                  className="w-full sm:w-auto px-8 py-3.5 bg-[#C5A467] hover:bg-[#D4B579] text-[#122619] font-bold text-xs tracking-widest uppercase rounded shadow-lg shadow-black/20 flex items-center justify-center gap-2 cursor-pointer transition-colors"
                >
                  <span>Explore Spice Catalog</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onNavigate('/our-story')}
                  className="w-full sm:w-auto px-7 py-3.5 bg-transparent hover:bg-white/5 border border-[#FAF7F0]/30 hover:border-[#C5A467] text-[#FAF7F0] font-semibold text-xs tracking-widest uppercase rounded flex items-center justify-center gap-2 cursor-pointer transition-colors"
                >
                  <span>The Farm Heritage</span>
                  <ChevronRight className="w-4 h-4 text-[#C5A467]" />
                </motion.button>
              </div>

              {/* Trust Indicators Bar */}
              <div className="pt-6 border-t border-[#FAF7F0]/15 grid grid-cols-2 sm:grid-cols-4 gap-4 text-left">
                <div className="space-y-1">
                  <span className="font-serif text-2xl font-bold text-[#C5A467] tabular-nums">7.5%+</span>
                  <p className="text-[11px] text-[#FAF7F0]/70 uppercase tracking-wider">Natural Curcumin</p>
                </div>
                <div className="space-y-1">
                  <span className="font-serif text-2xl font-bold text-[#C5A467] tabular-nums">100%</span>
                  <p className="text-[11px] text-[#FAF7F0]/70 uppercase tracking-wider">Cold Stone Ground</p>
                </div>
                <div className="space-y-1">
                  <span className="font-serif text-2xl font-bold text-[#C5A467] tabular-nums">1891</span>
                  <p className="text-[11px] text-[#FAF7F0]/70 uppercase tracking-wider">Punjab Roots</p>
                </div>
                <div className="space-y-1">
                  <span className="font-serif text-2xl font-bold text-[#C5A467] tabular-nums">Zero</span>
                  <p className="text-[11px] text-[#FAF7F0]/70 uppercase tracking-wider">Chemicals or Dyes</p>
                </div>
              </div>
            </motion.div>

            {/* Right Hero Column: Featured Hero Product Spotlight Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5"
            >
              <div className="relative mx-auto max-w-md lg:max-w-none bg-gradient-to-b from-[#1C3E2B] to-[#122619] p-6 sm:p-8 rounded-2xl border border-[#C5A467]/35 shadow-2xl overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#C5A467]/10 rounded-full blur-2xl pointer-events-none" />
                
                <div className="flex items-center justify-between text-[11px] tracking-widest uppercase text-[#C5A467] font-semibold mb-3">
                  <span>Farmstead Crown Jewel</span>
                  <span className="px-2 py-0.5 bg-[#C5A467]/15 rounded border border-[#C5A467]/30">FSSAI Certified</span>
                </div>

                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#FAF7F0] mb-1">
                  {heroProduct.name}
                </h2>
                <p className="text-xs text-[#C5A467] font-medium tracking-wide mb-4">
                  {heroProduct.subName || 'Pure Lakadong Turmeric Powder · Jaintia Hills'}
                </p>

                {/* Hero Product Card Interactive Preview */}
                <div className="bg-[#FAF7F0] rounded-xl p-4 text-[#122619] shadow-inner mb-6">
                  <ProductCard product={heroProduct} onSelect={onSelectProduct} />
                </div>

                <div className="flex items-center justify-between text-xs text-[#FAF7F0]/80 pt-2 border-t border-[#FAF7F0]/15">
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-[#C5A467]" />
                    <span>Lic. No. {config.fssaiLicenceNo}</span>
                  </div>
                  <button
                    onClick={() => setIsEditorOpen(true)}
                    className="text-[#C5A467] hover:underline cursor-pointer text-[11px] uppercase tracking-wider"
                  >
                    View Food Disclosures
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. COMING SOON SEASONAL HARVESTS BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ComingSoonPhotoBanner onSelectProduct={onSelectProduct} products={INITIAL_PRODUCTS} />
      </section>

      {/* 3. FEATURED PRODUCTS CATALOG WITH ANIMATED CATEGORY TABS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#C5A467]">
            <Award className="w-4 h-4" />
            <span>Direct Harvest Collection</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#142C1E]">
            Our Pure Masalas & Whole Seeds
          </h2>
          <p className="text-sm text-[#525955] leading-relaxed">
            Every batch is traceable to certified organic Indian farms. Tested for purity, unadulterated, and sealed in airtight oxygen-barrier packaging.
          </p>
        </div>

        {/* Animated Category Tabs */}
        <div className="flex items-center justify-center mb-8 sm:mb-12">
          <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 bg-[#EFE9DD] rounded-xl border border-[#142C1E]/10">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`relative px-4 sm:px-5 py-2 text-xs font-semibold tracking-wider uppercase rounded-lg transition-colors cursor-pointer ${
                    isActive ? 'text-[#FAF7F0]' : 'text-[#142C1E]/80 hover:text-[#142C1E]'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeCategoryIndicator"
                      className="absolute inset-0 bg-[#142C1E] rounded-lg shadow-sm"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Responsive Product Cards Grid with Staggered Motion */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product, idx) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
              >
                <ProductCard product={product} onSelect={onSelectProduct} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Explore full shop link */}
        <div className="mt-12 text-center">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onNavigate('/shop')}
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#142C1E] hover:bg-[#1A3826] text-[#FAF7F0] font-semibold text-xs tracking-widest uppercase rounded shadow transition-colors cursor-pointer"
          >
            <span>View Complete {INITIAL_PRODUCTS.length} Product Pantry</span>
            <ArrowRight className="w-4 h-4 text-[#C5A467]" />
          </motion.button>
        </div>
      </section>

      {/* 4. THE 4-PILLAR COLD GRINDING PROCESS (FARM CRAFTSMANSHIP) */}
      <section className="bg-[#142C1E] text-[#FAF7F0] py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-y border-[#C5A467]/20">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-semibold tracking-widest uppercase text-[#C5A467]">
              Farm Craftsmanship
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold">
              Why Cold-Stone Ground Spices Taste Different
            </h2>
            <p className="text-sm text-[#FAF7F0]/80 leading-relaxed">
              Industrial high-speed blade mills heat spices past 75°C, burning off fragile aromatic terpenes. We mill slowly under strict temperature control.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div
              whileHover={{ y: -4 }}
              className="p-6 bg-[#0E2015] rounded-xl border border-[#C5A467]/20 space-y-3"
            >
              <div className="w-10 h-10 rounded-lg bg-[#C5A467]/15 flex items-center justify-center text-[#C5A467]">
                <Wheat className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#FAF7F0]">1. Native Single-Origins</h3>
              <p className="text-xs text-[#FAF7F0]/70 leading-relaxed">
                Directly harvested from traditional agro-climatic zones like Lakadong in Meghalaya and Guntur in Andhra.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -4 }}
              className="p-6 bg-[#0E2015] rounded-xl border border-[#C5A467]/20 space-y-3"
            >
              <div className="w-10 h-10 rounded-lg bg-[#C5A467]/15 flex items-center justify-center text-[#C5A467]">
                <Sun className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#FAF7F0]">2. Solar Shade Drying</h3>
              <p className="text-xs text-[#FAF7F0]/70 leading-relaxed">
                Sun-dried under sanitized hygienic mesh to preserve bright natural carotenoids and prevent microbial moisture.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -4 }}
              className="p-6 bg-[#0E2015] rounded-xl border border-[#C5A467]/20 space-y-3"
            >
              <div className="w-10 h-10 rounded-lg bg-[#C5A467]/15 flex items-center justify-center text-[#C5A467]">
                <Flame className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#FAF7F0]">3. Sub-35°C Slow Milling</h3>
              <p className="text-xs text-[#FAF7F0]/70 leading-relaxed">
                Traditional stone pulverization rotates at low RPM, keeping volatile oils trapped inside every granule.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -4 }}
              className="p-6 bg-[#0E2015] rounded-xl border border-[#C5A467]/20 space-y-3"
            >
              <div className="w-10 h-10 rounded-lg bg-[#C5A467]/15 flex items-center justify-center text-[#C5A467]">
                <Truck className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#FAF7F0]">4. Fresh Dispatch</h3>
              <p className="text-xs text-[#FAF7F0]/70 leading-relaxed">
                Packed in small weekly batches directly from our Punjab packaging facility and dispatched promptly across India.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 5. MASALA BENEFITS & AYURVEDA HERITAGE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <MasalaBenefitsSection onSelectProduct={onSelectProduct} />
      </section>

      {/* 6. UPCOMING HARVESTS TIMELINE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ComingSoonShowcase onSelectProduct={onSelectProduct} onNavigate={onNavigate} products={INITIAL_PRODUCTS} />
      </section>

      {/* 7. STATUTORY DISCLOSURE & PAN-INDIA TRUST PLEDGE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#EFE9DD] border border-[#142C1E]/20 rounded-2xl p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#142C1E] text-[#C5A467] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div className="space-y-1">
              <h3 className="font-serif text-xl font-bold text-[#142C1E]">
                FSSAI Registered Food Business Operator
              </h3>
              <p className="text-xs text-[#525955] leading-relaxed max-w-xl">
                Operated by {config.fboName}. Central License No. <span className="font-bold text-[#142C1E]">{config.fssaiLicenceNo}</span>. Guaranteed free of metanil yellow, artificial sudan dyes, and chalk fillers.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={() => onNavigate('/fssai-food-information')}
              className="px-4 py-2.5 bg-[#142C1E] hover:bg-[#1A3826] text-[#FAF7F0] font-semibold text-xs tracking-wider uppercase rounded transition-colors"
            >
              Statutory Food Info
            </button>
            <button
              onClick={() => setIsEditorOpen(true)}
              className="px-4 py-2.5 bg-white border border-[#142C1E]/30 hover:border-[#142C1E] text-[#142C1E] font-semibold text-xs tracking-wider uppercase rounded transition-colors"
            >
              FSSAI Settings
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
