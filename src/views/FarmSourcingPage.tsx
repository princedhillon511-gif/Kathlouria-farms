'use client';

import React from 'react';
import { motion } from 'motion/react';
import { MapPin, ShieldCheck, Sun, Leaf, Droplets } from 'lucide-react';

interface FarmSourcingPageProps {
  onNavigate: (path: string) => void;
}

export const FarmSourcingPage: React.FC<FarmSourcingPageProps> = ({ onNavigate }) => {
  const regions = [
    {
      name: 'Jaintia Hills, Meghalaya',
      crop: 'Lakadong Turmeric',
      description: 'Grown on untouched organic hillside terrain with pristine monsoon rainfall, producing world-record curcumin levels over 7.5%.',
      climate: 'Sub-tropical Highland',
    },
    {
      name: 'Guntur, Andhra Pradesh',
      crop: 'Guntur Sannam Chillies',
      description: 'Cultivated under intense Deccan sun for bright natural capsaicin and crimson color without synthetic dyes or seed oil adulteration.',
      climate: 'Arid Tropical Plain',
    },
    {
      name: 'Malabar Coast, Kerala',
      crop: 'Tellicherry Black Peppercorns',
      description: 'Hand-harvested at peak maturity from ancient rain-fed vine canopies, sun-cured naturally on clean bamboo mats.',
      climate: 'Humid Coastal Rainforest',
    },
    {
      name: 'Kathlouria Farmstead, Punjab',
      crop: 'Coriander & Cumin Seeds',
      description: 'Alluvial soil beds nurtured with regenerative multi-cropping, giving sweet aromatic linalool and nutty digestive potency.',
      climate: 'Fertile Riverine Plains',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-16">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-2xl mx-auto space-y-3"
      >
        <span className="text-xs font-semibold tracking-widest uppercase text-[#C5A467]">
          Geographical Origin & Terroir
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#142C1E]">
          Sourced From India's Pristine Agro-Climates
        </h1>
        <p className="text-sm text-[#525955] leading-relaxed">
          True potency comes from native soil conditions. We harvest each botanical exclusively from its ancestral Indian terroir.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {regions.map((reg, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -4 }}
            className="p-6 sm:p-8 bg-white rounded-2xl border border-[#142C1E]/15 space-y-4 shadow-xs"
          >
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 bg-[#FAF7F0] border border-[#142C1E]/15 rounded text-xs font-bold text-[#142C1E]">
                {reg.crop}
              </span>
              <span className="text-xs text-[#C5A467] font-semibold">{reg.climate}</span>
            </div>

            <h3 className="font-serif text-2xl font-bold text-[#142C1E] flex items-center gap-2">
              <MapPin className="w-5 h-5 text-[#C5A467]" />
              {reg.name}
            </h3>

            <p className="text-xs text-[#525955] leading-relaxed">{reg.description}</p>
          </motion.div>
        ))}
      </div>

      <div className="text-center pt-8">
        <button
          onClick={() => onNavigate('/shop')}
          className="px-8 py-3.5 bg-[#142C1E] text-[#FAF7F0] font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-[#1A3826] transition-colors"
        >
          View Single-Origin Spices
        </button>
      </div>
    </div>
  );
};
