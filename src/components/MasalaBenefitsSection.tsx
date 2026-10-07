import React, { useState } from 'react';
import { INITIAL_PRODUCTS } from '../data/products';
import { ProductArtwork } from './ProductArtwork';
import { Product } from '../types';
import { WheatSheafArt } from './AgriculturalMotifs';
import {
  Flame,
  Sparkles,
  HeartPulse,
  ShieldCheck,
  Zap,
  Activity,
  Award,
  CheckCircle2,
  ArrowRight,
  Leaf,
} from 'lucide-react';

interface MasalaBenefitsSectionProps {
  onSelectProduct: (product: Product) => void;
}

export const MasalaBenefitsSection: React.FC<MasalaBenefitsSectionProps> = ({ onSelectProduct }) => {
  const [selectedSlug, setSelectedSlug] = useState<string>('lakadong-turmeric-powder');

  const selectedProduct =
    INITIAL_PRODUCTS.find(p => p.slug === selectedSlug) || INITIAL_PRODUCTS[0];

  const featuredSpices = [
    {
      slug: 'premium-saunf',
      title: 'Saunf (Fennel Seeds)',
      vernacular: 'सौंफ (Saunf)',
      keyNote: 'Mukhwas & Digestive Comfort',
      icon: Leaf,
      color: '#166534',
    },
    {
      slug: 'jeera-powder',
      title: 'Jeera Powder',
      vernacular: 'जीरा (Jeera)',
      keyNote: 'Pancreatic Enzymes & Agni',
      icon: Activity,
      color: '#7A5229',
    },
    {
      slug: 'lakadong-turmeric-powder',
      title: 'Lakadong Turmeric',
      vernacular: 'लकाडोंग हल्दी (Haldi)',
      keyNote: '7-9% Curcumin & Anti-Inflammatory',
      icon: Sparkles,
      color: '#EAA221',
    },
    {
      slug: 'red-chilly-flakes',
      title: 'Red Chilly Flakes',
      vernacular: 'लाल मिर्च (Lal Mirch)',
      keyNote: 'Metabolism & Natural Capsaicin',
      icon: Flame,
      color: '#A81C10',
    },
  ];

  return (
    <section className="bg-[#F5EFEB] border-y border-[#C5A467]/35 py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.24em] text-[#C5A467] uppercase">
            <WheatSheafArt className="w-4 h-3" color="#C5A467" />
            <span>Ayurvedic Wisdom & Modern Nutrition</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#143823] tracking-tight">
            HEALTH & CULINARY BENEFITS OF OUR FARM MASALAS
          </h2>
          <p className="text-xs sm:text-sm text-[#525955] leading-relaxed">
            Every Kathlouria Farms spice carries living bioactive volatile oils, potent antioxidants, and centuries of traditional Indian digestive knowledge.
          </p>
        </div>

        {/* Spice Selector Tabs */}
        <div className="flex items-center justify-start md:justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {featuredSpices.map(spice => {
            const Icon = spice.icon;
            const isSelected = selectedSlug === spice.slug;
            return (
              <button
                key={spice.slug}
                onClick={() => setSelectedSlug(spice.slug)}
                className={`px-4 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-2 shrink-0 cursor-pointer ${
                  isSelected
                    ? 'bg-[#143823] text-[#FAF7F0] shadow-md'
                    : 'bg-[#FDFCFA] text-[#143823] border border-[#143823]/15 hover:border-[#143823]/40'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-[#C5A467]' : 'text-[#7B827E]'}`} />
                <span>{spice.title}</span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Detail Card */}
        <div className="bg-[#FDFCFA] border border-[#143823]/15 rounded-2xl p-6 sm:p-10 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Packaging Illustration Left */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="w-full max-w-sm bg-[#FAF7F0] p-4 rounded-xl border border-[#143823]/10 shadow-inner">
              <ProductArtwork slug={selectedProduct.slug} size="lg" />
            </div>
            <button
              onClick={() => onSelectProduct(selectedProduct)}
              className="mt-4 px-6 py-2.5 bg-[#143823] hover:bg-[#0D2617] text-[#FAF7F0] text-xs font-semibold uppercase tracking-widest rounded flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>View Product & Buy Now</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#C5A467]" />
            </button>
          </div>

          {/* Benefits Details Right */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold tracking-widest text-[#C5A467] uppercase mb-1">
                <span>{selectedProduct.categoryLabel}</span>
                {selectedProduct.vernacularName && (
                  <>
                    <span>·</span>
                    <span>{selectedProduct.vernacularName}</span>
                  </>
                )}
              </div>
              <h3 className="font-serif text-2xl sm:text-4xl font-bold text-[#143823]">
                Why Your Body Thrives on Pure {selectedProduct.name}
              </h3>
              <p className="text-xs sm:text-sm text-[#525955] mt-2 leading-relaxed">
                {selectedProduct.shortDescription}
              </p>
            </div>

            {/* List of Benefits */}
            <div className="space-y-3.5 pt-2">
              {selectedProduct.benefits?.map((benefit, idx) => (
                <div
                  key={idx}
                  className="p-3.5 bg-[#FAF7F0] rounded-xl border border-[#143823]/10 flex items-start gap-3"
                >
                  <div className="w-6 h-6 rounded-full bg-[#143823] text-[#C5A467] flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                    ✓
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h4 className="font-serif text-base font-bold text-[#143823]">
                        {benefit.title}
                      </h4>
                      <span className="text-[10px] bg-[#EAE2D3] text-[#143823] font-semibold px-2 py-0.5 rounded uppercase tracking-wider">
                        {benefit.highlight}
                      </span>
                    </div>
                    <p className="text-xs text-[#525955] leading-relaxed mt-1">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Culinary Uses Recommendation */}
            {selectedProduct.culinaryUses && selectedProduct.culinaryUses.length > 0 && (
              <div className="p-4 bg-[#EFE8DD] rounded-xl border border-[#C5A467]/40 space-y-1.5 text-xs">
                <span className="font-bold text-[#143823] uppercase tracking-wider text-[11px] block">
                  Chef & Kitchen Recommendation:
                </span>
                <ul className="list-disc pl-4 space-y-1 text-[#525955]">
                  {selectedProduct.culinaryUses.map((use, i) => (
                    <li key={i}>{use}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
