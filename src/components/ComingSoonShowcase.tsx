import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Leaf } from 'lucide-react';
import { ProductArtwork } from './ProductArtwork';
import { ComingSoonPhotoBanner } from './ComingSoonPhotoBanner';
import { Product } from '../types';

interface ComingSoonShowcaseProps {
  onSelectProduct: (product: Product) => void;
  onNavigate: (path: string) => void;
  products: Product[];
}

export const ComingSoonShowcase: React.FC<ComingSoonShowcaseProps> = ({
  onSelectProduct,
  onNavigate,
  products,
}) => {
  const saunf = products.find(p => p.id === 'premium-saunf');
  const jeera = products.find(p => p.id === 'jeera-powder');
  const turmeric = products.find(p => p.id === 'lakadong-turmeric-powder');
  const chilly = products.find(p => p.id === 'red-chilly-flakes');

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#0F2417] via-[#143823] to-[#0A1A10] text-[#FAF7F0] border-y border-[#C5A467]/35 py-16 sm:py-24">
      {/* Background Golden Sunset Farm Atmosphere */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <svg viewBox="0 0 1440 600" className="w-full h-full object-cover" preserveAspectRatio="none">
          <radialGradient id="sunsetGlow" cx="20%" cy="30%" r="50%">
            <stop offset="0%" stopColor="#FFC83B" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#EA8216" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#0F2417" stopOpacity="0" />
          </radialGradient>
          <rect x="0" y="0" width="1440" height="600" fill="url(#sunsetGlow)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Full-width Official Photograph Composition Banner */}
        <div className="space-y-4">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-[#C5A467]/60 bg-[#122A1B]/90 text-[#C5A467] text-xs font-bold tracking-[0.24em] uppercase">
              <Leaf className="w-3.5 h-3.5" />
              <span>OFFICIAL FARM PHOTOGRAPH · 4 SIGNATURE APOTHECARY JARS</span>
            </div>
            <p className="text-xs sm:text-sm text-[#FAF7F0]/80">
              Only authentic Kathlouria Farms spices as showcased in our farm photography lineup.
            </p>
          </div>

          <ComingSoonPhotoBanner products={products} onSelectProduct={onSelectProduct} />
        </div>

        {/* 4 Glass Jar Products Grid directly matching the photograph */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
          {[
            {
              prod: saunf,
              slug: 'premium-saunf',
              name: 'PREMIUM SAUNF',
              sub: '(FENNEL SEEDS)',
              badge: 'Sweet Anethole Digestif',
              color: '#166534',
              accentBg: '#143823',
            },
            {
              prod: jeera,
              slug: 'jeera-powder',
              name: 'PREMIUM JEERA',
              sub: 'POWDER',
              badge: 'Cold-Stone Ground Cumin',
              color: '#7A5229',
              accentBg: '#2D1F13',
            },
            {
              prod: turmeric,
              slug: 'lakadong-turmeric-powder',
              name: 'PREMIUM LAKADONG',
              sub: 'TURMERIC POWDER',
              badge: '7–9% High Curcumin',
              color: '#D98218',
              accentBg: '#3D2506',
            },
            {
              prod: chilly,
              slug: 'red-chilly-flakes',
              name: 'PREMIUM RED CHILLY',
              sub: 'FLAKES',
              badge: 'Sun-Cured with Seeds',
              color: '#A81C10',
              accentBg: '#380B07',
            },
          ].map(({ prod, slug, name, sub, badge, color, accentBg }) => (
            <div
              key={slug}
              onClick={() => prod && onSelectProduct(prod)}
              className="group bg-[#FDFCFA] text-[#122619] rounded-2xl p-5 border border-[#C5A467]/30 hover:border-[#C5A467] shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer flex flex-col justify-between"
            >
              <div>
                {/* Visual Glass Jar Slot */}
                <div className="rounded-xl overflow-hidden bg-[#FAF7F0] border border-[#143823]/10 relative mb-4">
                  <ProductArtwork slug={slug} size="md" />
                  <span
                    className="absolute top-2.5 right-2.5 text-[9px] font-bold tracking-wider uppercase px-2 py-0.5 rounded text-white shadow-xs"
                    style={{ backgroundColor: color }}
                  >
                    100% Authentic
                  </span>
                </div>

                {/* Subtitle & Badge */}
                <span className="text-[10px] font-bold tracking-[0.2em] text-[#C5A467] uppercase block mb-1">
                  {badge}
                </span>

                {/* Title */}
                <h3 className="font-serif text-xl font-black text-[#143823] group-hover:text-[#C5A467] transition-colors leading-tight">
                  {name}
                  <span className="block text-sm font-bold text-[#525955]">{sub}</span>
                </h3>

                <p className="text-xs text-[#525955] leading-relaxed mt-2 line-clamp-2">
                  {prod?.shortDescription}
                </p>
              </div>

              {/* Price & Action */}
              <div className="mt-5 pt-3 border-t border-[#143823]/10 flex items-center justify-between">
                <div>
                  <span className="font-serif text-xl font-bold text-[#143823] tabular-nums">
                    ₹{prod?.basePrice}
                  </span>
                  <span className="text-[11px] text-[#7B827E] line-through ml-1.5 tabular-nums">
                    ₹{prod?.sizes[0]?.mrp}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={e => {
                    e.stopPropagation();
                    if (prod) onSelectProduct(prod);
                  }}
                  className="px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-[#FAF7F0] rounded transition-colors flex items-center gap-1 shadow-sm"
                  style={{ backgroundColor: color }}
                >
                  <span>Explore</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Call to Action Button */}
        <div className="text-center pt-4">
          <button
            onClick={() => onNavigate('/shop')}
            className="px-8 py-3.5 bg-[#C5A467] hover:bg-[#B69251] text-[#122619] font-bold text-xs tracking-[0.22em] uppercase rounded shadow-xl transition-all transform hover:-translate-y-0.5 cursor-pointer inline-flex items-center gap-2"
          >
            <span>Explore Entire Spice Pantry</span>
            <ArrowRight className="w-4 h-4 text-[#122619]" />
          </button>
        </div>
      </div>
    </section>
  );
};
