'use client';

import React from 'react';
import { motion } from 'motion/react';
import { BrandLogo } from '../components/BrandLogo';
import { ArrowRight, ShieldCheck, Heart, Leaf, Award, Wheat, Sun } from 'lucide-react';

interface OurStoryPageProps {
  onNavigate: (path: string) => void;
}

export const OurStoryPage: React.FC<OurStoryPageProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-16">
      {/* Hero Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-3xl mx-auto space-y-4"
      >
        <span className="text-xs font-semibold tracking-widest uppercase text-[#C5A467]">
          Generations of Purity · Estd. 1891
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-[#142C1E] leading-tight">
          Rooted in Punjab Soil, Ground with Reverence
        </h1>
        <p className="text-base text-[#525955] leading-relaxed">
          More than a century of cultivating authentic Indian heirloom crops, preserving essential volatile oils, and standing against industrial adulteration.
        </p>
      </motion.div>

      {/* Brand Heritage Seal Centerpiece */}
      <div className="flex justify-center">
        <BrandLogo variant="shield" size="xl" theme="light-on-dark" />
      </div>

      {/* Narrative Chapters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#142C1E]/15 space-y-4 shadow-xs">
          <span className="font-serif text-3xl font-bold text-[#C5A467]">1891</span>
          <h3 className="font-serif text-xl font-bold text-[#142C1E]">The Ancestral Acreage</h3>
          <p className="text-xs text-[#525955] leading-relaxed">
            Our forefathers began cultivating organic mustard, cumin, and coriander in Punjab's fertile alluvial plains, utilizing natural flood irrigation and traditional composting methods.
          </p>
        </div>

        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#142C1E]/15 space-y-4 shadow-xs">
          <span className="font-serif text-3xl font-bold text-[#C5A467]">1968</span>
          <h3 className="font-serif text-xl font-bold text-[#142C1E]">Stone Pulverization</h3>
          <p className="text-xs text-[#525955] leading-relaxed">
            When modern factories switched to high-heat metal pulverizers that scorch spice aromas, we stayed true to slow stone milling, keeping temperatures under 35°C to save natural curcumin and aroma.
          </p>
        </div>

        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#142C1E]/15 space-y-4 shadow-xs">
          <span className="font-serif text-3xl font-bold text-[#C5A467]">Today</span>
          <h3 className="font-serif text-xl font-bold text-[#142C1E]">Pan-India Farmstead</h3>
          <p className="text-xs text-[#525955] leading-relaxed">
            Directly connecting thousands of Indian families to verified single-origin harvests from Meghalaya, Kerala, and Punjab. Sealed under cleanroom hygienic conditions.
          </p>
        </div>
      </div>

      {/* Values Callout */}
      <div className="bg-[#142C1E] text-[#FAF7F0] p-8 sm:p-12 rounded-3xl border border-[#C5A467]/30 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="space-y-3 max-w-xl">
          <span className="text-xs font-semibold tracking-widest uppercase text-[#C5A467]">
            Our Farm Promise
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold">
            Never Blended with Starch. Never Artificially Colored.
          </h2>
          <p className="text-xs text-[#FAF7F0]/80 leading-relaxed">
            Every batch goes through NABL accredited laboratory chromatography testing for heavy metals, pesticides, and curcumin content before dispatch.
          </p>
        </div>

        <button
          onClick={() => onNavigate('/shop')}
          className="px-8 py-3.5 bg-[#C5A467] text-[#122619] font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-[#D4B579] transition-colors shrink-0"
        >
          Explore Our Harvest
        </button>
      </div>
    </div>
  );
};
