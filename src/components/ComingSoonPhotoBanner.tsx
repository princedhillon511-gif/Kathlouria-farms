import React, { useState } from 'react';
import { Product } from '../types';

interface ComingSoonPhotoBannerProps {
  onSelectProduct?: (product: Product) => void;
  products: Product[];
}

// Static precalculated sun rays coordinates to eliminate floating point hydration mismatches
const SUN_RAYS = [
  { x2: 490.0, y2: 300.0 },
  { x2: 463.36, y2: 433.94 },
  { x2: 387.49, y2: 547.49 },
  { x2: 273.94, y2: 623.36 },
  { x2: 140.0, y2: 650.0 },
  { x2: 6.06, y2: 623.36 },
  { x2: -107.49, y2: 547.49 },
  { x2: -183.36, y2: 433.94 },
  { x2: -210.0, y2: 300.0 },
  { x2: -183.36, y2: 166.06 },
  { x2: -107.49, y2: 52.51 },
  { x2: 6.06, y2: -23.36 },
  { x2: 140.0, y2: -50.0 },
  { x2: 273.94, y2: -23.36 },
  { x2: 387.49, y2: 52.51 },
  { x2: 463.36, y2: 166.06 },
];

export const ComingSoonPhotoBanner: React.FC<ComingSoonPhotoBannerProps> = ({
  onSelectProduct,
  products,
}) => {
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);

  const saunf = products.find(p => p.id === 'premium-saunf');
  const jeera = products.find(p => p.id === 'jeera-powder');
  const turmeric = products.find(p => p.id === 'lakadong-turmeric-powder');
  const chilly = products.find(p => p.id === 'red-chilly-flakes');

  return (
    <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl border-2 border-[#C5A467]/40 bg-[#0c1810]">
      {/* 
        Ultra-Detailed Panorama of PHOTO-2026-07-16-10-27-06.jpeg:
        - Sunset burst & sky on left
        - Receding crop rows & trees
        - John Deere Green tractor & green trailer
        - Red wooden barn & tall grain silo on right
        - "COMING SOON" with green leaf sprout emblem
        - Dark rustic wooden table
        - 4 Signature Apothecary Glass Jars:
          1) Saunf (Green ribbon, wooden bowl of whole seeds, wild fennel umbel)
          2) Jeera Powder (Bronze ribbon, wooden bowl of cumin powder, wooden pestle)
          3) Lakadong Turmeric (Gold ribbon, wooden bowl of powder, turmeric root discs)
          4) Red Chilly Flakes (Red ribbon, wooden bowl of flakes, whole chillies)
      */}
      <svg
        viewBox="0 0 1200 900"
        className="w-full h-auto block select-none"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          {/* Sunset sky gradient */}
          <linearGradient id="photoSkyGrad" x1="0%" y1="0%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="#FFA62B" />
            <stop offset="18%" stopColor="#FFC857" />
            <stop offset="35%" stopColor="#E08B38" />
            <stop offset="55%" stopColor="#6C93A4" />
            <stop offset="100%" stopColor="#355C7D" />
          </linearGradient>

          {/* Sunburst radial */}
          <radialGradient id="sunburstGrad" cx="12%" cy="32%" r="45%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
            <stop offset="10%" stopColor="#FFF275" stopOpacity="0.95" />
            <stop offset="30%" stopColor="#FF9F1C" stopOpacity="0.6" />
            <stop offset="60%" stopColor="#E71D36" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0" />
          </radialGradient>

          {/* Farmland hills gradient */}
          <linearGradient id="farmHills" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#416B30" />
            <stop offset="50%" stopColor="#2A4D1F" />
            <stop offset="100%" stopColor="#173111" />
          </linearGradient>

          {/* Wooden table surface gradient */}
          <linearGradient id="woodTableGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#4A3423" />
            <stop offset="40%" stopColor="#332114" />
            <stop offset="100%" stopColor="#1E120A" />
          </linearGradient>

          {/* Glass jar body reflection */}
          <linearGradient id="glassReflect" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.45" />
            <stop offset="15%" stopColor="#FFFFFF" stopOpacity="0.08" />
            <stop offset="50%" stopColor="#000000" stopOpacity="0.05" />
            <stop offset="85%" stopColor="#FFFFFF" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.4" />
          </linearGradient>

          {/* Ribbed lid gradient */}
          <linearGradient id="ribbedLid" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#161817" />
            <stop offset="25%" stopColor="#3C403E" />
            <stop offset="50%" stopColor="#1F2220" />
            <stop offset="75%" stopColor="#383D3A" />
            <stop offset="100%" stopColor="#121312" />
          </linearGradient>

          {/* Wooden bowl gradient */}
          <radialGradient id="woodenBowl" cx="50%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#5E3516" />
            <stop offset="65%" stopColor="#3A1F0B" />
            <stop offset="100%" stopColor="#1E0E03" />
          </radialGradient>

          {/* Drop shadow */}
          <filter id="sceneShadow" x="-10%" y="-10%" width="125%" height="130%">
            <feDropShadow dx="2" dy="8" stdDeviation="6" floodOpacity="0.4" />
          </filter>
        </defs>

        {/* 1. SKY & SUNSET BACKGROUND */}
        <rect x="0" y="0" width="1200" height="750" fill="url(#photoSkyGrad)" />

        {/* Cloud formations */}
        <path d="M 0 80 Q 200 40 450 90 Q 700 30 1000 70 Q 1150 90 1200 60 L 1200 0 L 0 0 Z" fill="#FFA040" opacity="0.35" />
        <path d="M 100 130 Q 350 90 600 120 Q 900 80 1200 140 L 1200 0 L 0 0 Z" fill="#E88835" opacity="0.25" />

        {/* Sunflare on left (near tree) */}
        <circle cx="140" cy="300" r="180" fill="url(#sunburstGrad)" />
        {/* Sunburst radiant rays (statically positioned to eliminate hydration mismatch) */}
        {SUN_RAYS.map((ray, i) => (
          <line
            key={i}
            x1="140"
            y1="300"
            x2={ray.x2}
            y2={ray.y2}
            stroke="#FFF4A3"
            strokeWidth="3"
            opacity="0.35"
          />
        ))}

        {/* Left silhouette oak tree */}
        <ellipse cx="140" cy="270" rx="90" ry="105" fill="#182A12" opacity="0.95" />
        <ellipse cx="90" cy="290" rx="60" ry="70" fill="#1F3617" opacity="0.9" />
        <ellipse cx="180" cy="260" rx="55" ry="65" fill="#1A3013" opacity="0.9" />
        <rect x="130" y="350" width="22" height="75" fill="#14210F" />

        {/* Distant farm tree line & hills */}
        <path d="M 0 380 Q 300 350 600 370 Q 900 360 1200 380 L 1200 450 L 0 450 Z" fill="#2E4A1E" />
        <path d="M 0 395 Q 400 375 800 385 Q 1050 370 1200 390 L 1200 480 L 0 480 Z" fill="#223B16" />

        {/* 2. CROP ROWS IN PERSPECTIVE (Green Agricultural Furrows) */}
        <rect x="0" y="420" width="1200" height="330" fill="url(#farmHills)" />
        {[...Array(32)].map((_, i) => (
          <line
            key={i}
            x1={i * 40}
            y1="750"
            x2={260 + i * 15}
            y2="420"
            stroke="#162B0F"
            strokeWidth={3 + (i % 3)}
            opacity="0.75"
          />
        ))}
        {/* Lush green crop texture along rows */}
        {[...Array(24)].map((_, i) => (
          <ellipse
            key={i}
            cx={50 + (i % 6) * 190 + (i * 12) % 40}
            cy={470 + Math.floor(i / 6) * 45}
            rx={28 + (i % 4) * 8}
            ry={12 + (i % 3) * 4}
            fill="#3B6324"
            opacity="0.8"
          />
        ))}

        {/* 3. RED BARN & GRAIN SILO ON THE RIGHT */}
        {/* Grain Silo */}
        <g transform="translate(1040, 250)">
          {/* Silo Dome Roof */}
          <path d="M 10 90 Q 55 20 100 90 Z" fill="#8E999E" stroke="#5E676B" strokeWidth="2" />
          {/* Silo Ribbed Cylinder */}
          <rect x="10" y="90" width="90" height="210" fill="#A5AFB4" stroke="#687277" strokeWidth="2" />
          {[...Array(9)].map((_, i) => (
            <line key={i} x1="10" y1={110 + i * 22} x2="100" y2={110 + i * 22} stroke="#687277" strokeWidth="1.8" />
          ))}
        </g>
        {/* Traditional Red Barn */}
        <g transform="translate(830, 310)">
          {/* Barn Main Body */}
          <rect x="20" y="80" width="220" height="150" fill="#8A2218" stroke="#5E140C" strokeWidth="2.5" />
          {/* Gambrel Roof */}
          <polygon points="10,80 130,10 250,80" fill="#5E1812" stroke="#3D0D08" strokeWidth="2.5" />
          {/* White Barn Trim & Windows */}
          <rect x="110" y="35" width="40" height="35" fill="#FFFFFF" stroke="#8A2218" strokeWidth="2" />
          <line x1="130" y1="35" x2="130" y2="70" stroke="#8A2218" strokeWidth="2" />
          <line x1="110" y1="52" x2="150" y2="52" stroke="#8A2218" strokeWidth="2" />
          {/* Double Barn Doors with X crossbucks */}
          <rect x="85" y="145" width="90" height="85" fill="#3D0D08" stroke="#FFFFFF" strokeWidth="2" />
          <line x1="85" y1="145" x2="130" y2="230" stroke="#FFFFFF" strokeWidth="1.5" />
          <line x1="130" y1="145" x2="85" y2="230" stroke="#FFFFFF" strokeWidth="1.5" />
          <line x1="130" y1="145" x2="175" y2="230" stroke="#FFFFFF" strokeWidth="1.5" />
          <line x1="175" y1="145" x2="130" y2="230" stroke="#FFFFFF" strokeWidth="1.5" />
          {/* Weathervane on top */}
          <line x1="130" y1="10" x2="130" y2="-12" stroke="#FFFFFF" strokeWidth="2.5" />
          <polygon points="126,-12 134,-12 130,-22" fill="#FFFFFF" />
        </g>

        {/* 4. JOHN DEERE TRACTOR & PRODUCE TRAILER */}
        {/* Produce Trailer (Green body loaded with green pumpkins/produce) */}
        <g transform="translate(640, 420)">
          <rect x="0" y="30" width="180" height="75" fill="#1C5E28" stroke="#0F3816" strokeWidth="3" />
          {/* Trailer ribs */}
          <line x1="45" y1="30" x2="45" y2="105" stroke="#0F3816" strokeWidth="3" />
          <line x1="90" y1="30" x2="90" y2="105" stroke="#0F3816" strokeWidth="3" />
          <line x1="135" y1="30" x2="135" y2="105" stroke="#0F3816" strokeWidth="3" />
          {/* Produce Mound (Green harvest) */}
          {[...Array(14)].map((_, i) => (
            <circle
              key={i}
              cx={20 + i * 11}
              cy={22 - (i % 3) * 5}
              r="14"
              fill={i % 2 === 0 ? '#4ADE80' : '#22C55E'}
              stroke="#15803D"
              strokeWidth="1.5"
            />
          ))}
          {/* Yellow trailer wheel */}
          <circle cx="140" cy="115" r="30" fill="#EAB308" stroke="#1F2937" strokeWidth="8" />
        </g>
        {/* John Deere Green & Yellow Tractor */}
        <g transform="translate(420, 310)">
          {/* Tractor Cab Glass */}
          <path d="M 80 40 L 160 40 L 180 120 L 70 120 Z" fill="#B0E0E6" opacity="0.8" stroke="#154B1E" strokeWidth="3" />
          {/* Roof */}
          <rect x="65" y="28" width="115" height="15" rx="4" fill="#2E7D32" stroke="#14461B" strokeWidth="2.5" />
          {/* Amber beacon lights on cab */}
          <circle cx="75" cy="22" r="5" fill="#F59E0B" />
          <circle cx="165" cy="22" r="5" fill="#F59E0B" />
          {/* Tractor Engine Hood (Signature Green) */}
          <path d="M 0 125 L 85 120 L 85 180 L 10 185 Z" fill="#2E7D32" stroke="#14461B" strokeWidth="3" />
          {/* John Deere Yellow Stripe on Hood */}
          <line x1="0" y1="140" x2="85" y2="136" stroke="#FACC15" strokeWidth="4.5" />
          {/* Front Grille & Headlights */}
          <rect x="2" y="145" width="12" height="32" fill="#1F2937" />
          <circle cx="8" cy="152" r="4.5" fill="#FEF08A" stroke="#CA8A04" strokeWidth="1" />
          <circle cx="8" cy="168" r="4.5" fill="#FEF08A" stroke="#CA8A04" strokeWidth="1" />
          {/* Exhaust Stack */}
          <line x1="70" y1="120" x2="70" y2="45" stroke="#1F2937" strokeWidth="5.5" strokeLinecap="round" />
          {/* Rear Huge Yellow Wheel */}
          <circle cx="155" cy="180" r="55" fill="#EAB308" stroke="#1F2937" strokeWidth="16" />
          {/* Front Smaller Yellow Wheel */}
          <circle cx="35" cy="190" r="32" fill="#EAB308" stroke="#1F2937" strokeWidth="11" />
        </g>

        {/* 5. TOP "COMING SOON" HEADLINE & LEAF EMBLEM */}
        <g transform="translate(600, 100)" textAnchor="middle">
          {/* Two-leaf green sprout icon in center */}
          <g transform="translate(0, 55)">
            <path d="M 0 15 C 0 5, -8 0, -18 -4 C -18 8, -8 15, 0 15 Z" fill="#15803D" />
            <path d="M 0 15 C 0 5, 8 0, 18 -4 C 18 8, 8 15, 0 15 Z" fill="#22C55E" />
            <path d="M 0 15 L 0 0" stroke="#0F3816" strokeWidth="2" />
          </g>

          {/* Underline Flourish Bars */}
          <line x1="-360" y1="65" x2="-35" y2="65" stroke="#112C1B" strokeWidth="3" strokeLinecap="round" />
          <line x1="35" y1="65" x2="360" y2="65" stroke="#112C1B" strokeWidth="3" strokeLinecap="round" />

          {/* "COMING SOON" Bold Serif Typography matching the photo */}
          <text
            x="0"
            y="25"
            fill="#112C1B"
            fontSize="98"
            fontWeight="900"
            letterSpacing="6"
            fontFamily="'Cormorant Garamond', Georgia, serif"
            style={{ textShadow: '0 2px 8px rgba(255,255,255,0.4)' }}
          >
            COMING SOON
          </text>
        </g>

        {/* 6. RUSTIC WOODEN FARM TABLE IN FOREGROUND */}
        <rect x="0" y="740" width="1200" height="160" fill="url(#woodTableGrad)" />
        {/* Table plank edge */}
        <line x1="0" y1="740" x2="1200" y2="740" stroke="#2B180C" strokeWidth="4" />
        <line x1="0" y1="775" x2="1200" y2="775" stroke="#221207" strokeWidth="2" strokeDasharray="120 15 180 20" />
        <line x1="0" y1="815" x2="1200" y2="815" stroke="#221207" strokeWidth="1.5" strokeDasharray="80 20 140 15" />

        {/* Ambient shadow underneath all 4 jars & bowls */}
        <ellipse cx="230" cy="745" rx="110" ry="18" fill="#000000" opacity="0.5" />
        <ellipse cx="475" cy="745" rx="110" ry="18" fill="#000000" opacity="0.5" />
        <ellipse cx="725" cy="745" rx="110" ry="18" fill="#000000" opacity="0.5" />
        <ellipse cx="970" cy="745" rx="110" ry="18" fill="#000000" opacity="0.5" />

        {/* 7. THE 4 EXACT PRODUCTS LINED UP ON THE TABLE (MATCHING PHOTO) */}

        {/* ================================================================= */}
        {/* PRODUCT 1: PREMIUM SAUNF (FENNEL SEEDS) */}
        {/* ================================================================= */}
        <g
          transform="translate(130, 440)"
          className="cursor-pointer transition-transform duration-300 hover:opacity-95"
          onClick={() => saunf && onSelectProduct && onSelectProduct(saunf)}
          onMouseEnter={() => setHoveredProduct('saunf')}
          onMouseLeave={() => setHoveredProduct(null)}
        >
          {/* Glass Jar Body */}
          <rect x="25" y="60" width="150" height="240" rx="12" fill="#E8F0E4" stroke="#D1DDD0" strokeWidth="2" />
          {/* Whole green fennel seeds filling jar */}
          <rect x="28" y="64" width="144" height="232" rx="10" fill="#587A4F" />
          {/* Glass sheen */}
          <rect x="25" y="60" width="150" height="240" rx="12" fill="url(#glassReflect)" />
          <line x1="34" y1="70" x2="34" y2="290" stroke="#FFFFFF" strokeWidth="4" opacity="0.5" />

          {/* Ivory Label */}
          <rect x="36" y="105" width="128" height="175" rx="3" fill="#FAF8F2" stroke="#DDD5C6" strokeWidth="1" />
          {/* Green Veg Mark (Top right of label) */}
          <rect x="144" y="112" width="12" height="12" fill="#FFFFFF" stroke="#166534" strokeWidth="1.2" />
          <circle cx="150" cy="118" r="3.5" fill="#166534" />
          {/* Tractor Crest Emblem */}
          <g transform="translate(56, 115) scale(0.44)">
            <polygon points="100,10 185,50 185,140 100,180 15,140 15,50" fill="#FFFFFF" stroke="#111814" strokeWidth="5" />
            <rect x="18" y="90" width="164" height="28" fill="#111814" />
            <text x="100" y="110" textAnchor="middle" fill="#FFFFFF" fontSize="12.5" fontWeight="900" fontFamily="sans-serif">KATHLOURIA FARMS</text>
            <text x="100" y="132" textAnchor="middle" fill="#111814" fontSize="9.5" fontWeight="800">— ESTD 1891 —</text>
            <text x="100" y="150" textAnchor="middle" fill="#111814" fontSize="10.5" fontWeight="800">• PUNJAB •</text>
            <circle cx="70" cy="62" r="14" fill="#111814" />
            <circle cx="130" cy="66" r="10" fill="#111814" />
          </g>
          {/* Text on Label */}
          <text x="100" y="202" textAnchor="middle" fill="#232724" fontSize="9" fontWeight="800" letterSpacing="1.8">— PREMIUM —</text>
          <text x="100" y="222" textAnchor="middle" fill="#166534" fontSize="18" fontWeight="900" letterSpacing="0.8" fontFamily="'Cormorant Garamond', Georgia, serif">SAUNF</text>
          <text x="100" y="238" textAnchor="middle" fill="#143823" fontSize="11" fontWeight="800" fontFamily="'Cormorant Garamond', Georgia, serif">(FENNEL SEEDS)</text>
          <text x="100" y="254" textAnchor="middle" fill="#5F6662" fontSize="8" fontStyle="italic">Pure · Natural · Authentic</text>
          {/* Bottom green field etching */}
          <path d="M 40 270 Q 100 260 160 270" stroke="#166534" strokeWidth="1" fill="none" />

          {/* Black Ribbed Lid */}
          <rect x="35" y="32" width="130" height="30" rx="3" fill="url(#ribbedLid)" stroke="#111312" strokeWidth="1.5" />
          {[...Array(16)].map((_, i) => (
            <line key={i} x1={42 + i * 7.5} y1="34" x2={42 + i * 7.5} y2="60" stroke="#111312" strokeWidth="2" />
          ))}

          {/* Vertical Green Ribbon "100% Authentic" */}
          <rect x="88" y="34" width="24" height="60" fill="#1F6B34" stroke="#144622" strokeWidth="0.8" />
          <polygon points="88,94 100,86 112,94 112,86 88,86" fill="#1F6B34" />
          <text x="-66" y="104" transform="rotate(-90)" textAnchor="middle" fill="#FAF8F2" fontSize="7" fontWeight="800" letterSpacing="0.8">100% Authentic</text>

          {/* Wooden Bowl in Front with whole fennel seeds */}
          <g transform="translate(20, 240)" filter="url(#sceneShadow)">
            <ellipse cx="80" cy="65" rx="75" ry="26" fill="url(#woodenBowl)" stroke="#1F0E04" strokeWidth="2.5" />
            <ellipse cx="80" cy="60" rx="68" ry="22" fill="#2E1608" />
            {/* Mound of fennel seeds */}
            <path d="M 20 60 Q 80 20 140 60 Z" fill="#587A4F" />
            <ellipse cx="80" cy="52" rx="60" ry="18" fill="#4D7044" />
          </g>

          {/* Wild flowering fennel umbel sprig on left */}
          <g transform="translate(-40, 240)">
            <path d="M 50 100 Q 10 50 -10 10" stroke="#3D683A" strokeWidth="3" fill="none" />
            <circle cx="-10" cy="10" r="5" fill="#B5C945" stroke="#5E7822" strokeWidth="1" />
            <circle cx="5" cy="5" r="4.5" fill="#B5C945" stroke="#5E7822" strokeWidth="1" />
            <circle cx="-20" cy="25" r="4" fill="#B5C945" stroke="#5E7822" strokeWidth="1" />
          </g>
          {/* Scattered seeds on table */}
          {[...Array(12)].map((_, i) => (
            <ellipse
              key={i}
              cx={10 + (i % 4) * 40 + (i * 7) % 20}
              cy={325 + Math.floor(i / 4) * 8}
              rx="4"
              ry="1.8"
              fill="#628954"
              stroke="#37552E"
              strokeWidth="0.5"
            />
          ))}
        </g>

        {/* ================================================================= */}
        {/* PRODUCT 2: PREMIUM JEERA POWDER */}
        {/* ================================================================= */}
        <g
          transform="translate(375, 440)"
          className="cursor-pointer transition-transform duration-300 hover:opacity-95"
          onClick={() => jeera && onSelectProduct && onSelectProduct(jeera)}
          onMouseEnter={() => setHoveredProduct('jeera')}
          onMouseLeave={() => setHoveredProduct(null)}
        >
          {/* Glass Jar Body */}
          <rect x="25" y="60" width="150" height="240" rx="12" fill="#F0EDE4" stroke="#DDD7D0" strokeWidth="2" />
          {/* Cumin powder filling jar */}
          <rect x="28" y="64" width="144" height="232" rx="10" fill="#8A6237" />
          {/* Glass sheen */}
          <rect x="25" y="60" width="150" height="240" rx="12" fill="url(#glassReflect)" />
          <line x1="34" y1="70" x2="34" y2="290" stroke="#FFFFFF" strokeWidth="4" opacity="0.5" />

          {/* Ivory Label */}
          <rect x="36" y="105" width="128" height="175" rx="3" fill="#FAF8F2" stroke="#DDD5C6" strokeWidth="1" />
          {/* Green Veg Mark */}
          <rect x="144" y="112" width="12" height="12" fill="#FFFFFF" stroke="#166534" strokeWidth="1.2" />
          <circle cx="150" cy="118" r="3.5" fill="#166534" />
          {/* Tractor Crest Emblem */}
          <g transform="translate(56, 115) scale(0.44)">
            <polygon points="100,10 185,50 185,140 100,180 15,140 15,50" fill="#FFFFFF" stroke="#111814" strokeWidth="5" />
            <rect x="18" y="90" width="164" height="28" fill="#111814" />
            <text x="100" y="110" textAnchor="middle" fill="#FFFFFF" fontSize="12.5" fontWeight="900" fontFamily="sans-serif">KATHLOURIA FARMS</text>
            <text x="100" y="132" textAnchor="middle" fill="#111814" fontSize="9.5" fontWeight="800">— ESTD 1891 —</text>
            <text x="100" y="150" textAnchor="middle" fill="#111814" fontSize="10.5" fontWeight="800">• PUNJAB •</text>
            <circle cx="70" cy="62" r="14" fill="#111814" />
            <circle cx="130" cy="66" r="10" fill="#111814" />
          </g>
          {/* Text on Label */}
          <text x="100" y="202" textAnchor="middle" fill="#232724" fontSize="9" fontWeight="800" letterSpacing="1.8">— PREMIUM —</text>
          <text x="100" y="222" textAnchor="middle" fill="#7A5229" fontSize="18" fontWeight="900" letterSpacing="0.8" fontFamily="'Cormorant Garamond', Georgia, serif">JEERA</text>
          <text x="100" y="238" textAnchor="middle" fill="#523414" fontSize="13" fontWeight="800" fontFamily="'Cormorant Garamond', Georgia, serif">POWDER</text>
          <text x="100" y="254" textAnchor="middle" fill="#5F6662" fontSize="8" fontStyle="italic">Pure · Natural · Authentic</text>
          {/* Bottom brown field etching */}
          <path d="M 40 270 Q 100 260 160 270" stroke="#7A5229" strokeWidth="1" fill="none" />

          {/* Black Ribbed Lid */}
          <rect x="35" y="32" width="130" height="30" rx="3" fill="url(#ribbedLid)" stroke="#111312" strokeWidth="1.5" />
          {[...Array(16)].map((_, i) => (
            <line key={i} x1={42 + i * 7.5} y1="34" x2={42 + i * 7.5} y2="60" stroke="#111312" strokeWidth="2" />
          ))}

          {/* Vertical Bronze Ribbon "100% Authentic" */}
          <rect x="88" y="34" width="24" height="60" fill="#7A5229" stroke="#523414" strokeWidth="0.8" />
          <polygon points="88,94 100,86 112,94 112,86 88,86" fill="#7A5229" />
          <text x="-66" y="104" transform="rotate(-90)" textAnchor="middle" fill="#FAF8F2" fontSize="7" fontWeight="800" letterSpacing="0.8">100% Authentic</text>

          {/* Wooden Bowl in Front with ground cumin mound */}
          <g transform="translate(20, 240)" filter="url(#sceneShadow)">
            <ellipse cx="80" cy="65" rx="75" ry="26" fill="url(#woodenBowl)" stroke="#1F0E04" strokeWidth="2.5" />
            <ellipse cx="80" cy="60" rx="68" ry="22" fill="#2E1608" />
            {/* High mound of roasted ground cumin */}
            <path d="M 20 60 Q 80 14 140 60 Z" fill="#8C6235" />
            <ellipse cx="80" cy="46" rx="55" ry="18" fill="#755029" />
          </g>

          {/* Wooden spice masher/pestle lying in foreground */}
          <g transform="translate(50, 320) rotate(-18)">
            <rect x="0" y="0" width="50" height="8" rx="4" fill="#3D200B" stroke="#221105" strokeWidth="1" />
            <circle cx="50" cy="4" r="9" fill="#5E3516" stroke="#221105" strokeWidth="1" />
          </g>
          {/* Scattered cumin seeds on table */}
          {[...Array(14)].map((_, i) => (
            <ellipse
              key={i}
              cx={30 + (i % 5) * 32 + (i * 9) % 25}
              cy={325 + Math.floor(i / 5) * 8}
              rx="4.2"
              ry="1.4"
              fill="#78552D"
              stroke="#473016"
              strokeWidth="0.5"
            />
          ))}
        </g>

        {/* ================================================================= */}
        {/* PRODUCT 3: PREMIUM LAKADONG TURMERIC POWDER */}
        {/* ================================================================= */}
        <g
          transform="translate(625, 440)"
          className="cursor-pointer transition-transform duration-300 hover:opacity-95"
          onClick={() => turmeric && onSelectProduct && onSelectProduct(turmeric)}
          onMouseEnter={() => setHoveredProduct('turmeric')}
          onMouseLeave={() => setHoveredProduct(null)}
        >
          {/* Glass Jar Body */}
          <rect x="25" y="60" width="150" height="240" rx="12" fill="#FDF7E7" stroke="#ECE0C8" strokeWidth="2" />
          {/* Golden turmeric powder filling jar */}
          <rect x="28" y="64" width="144" height="232" rx="10" fill="#F5A61D" />
          {/* Glass sheen */}
          <rect x="25" y="60" width="150" height="240" rx="12" fill="url(#glassReflect)" />
          <line x1="34" y1="70" x2="34" y2="290" stroke="#FFFFFF" strokeWidth="4" opacity="0.5" />

          {/* Ivory Label */}
          <rect x="36" y="105" width="128" height="175" rx="3" fill="#FAF8F2" stroke="#DDD5C6" strokeWidth="1" />
          {/* Green Veg Mark */}
          <rect x="144" y="112" width="12" height="12" fill="#FFFFFF" stroke="#166534" strokeWidth="1.2" />
          <circle cx="150" cy="118" r="3.5" fill="#166534" />
          {/* Tractor Crest Emblem */}
          <g transform="translate(56, 115) scale(0.44)">
            <polygon points="100,10 185,50 185,140 100,180 15,140 15,50" fill="#FFFFFF" stroke="#111814" strokeWidth="5" />
            <rect x="18" y="90" width="164" height="28" fill="#111814" />
            <text x="100" y="110" textAnchor="middle" fill="#FFFFFF" fontSize="12.5" fontWeight="900" fontFamily="sans-serif">KATHLOURIA FARMS</text>
            <text x="100" y="132" textAnchor="middle" fill="#111814" fontSize="9.5" fontWeight="800">— ESTD 1891 —</text>
            <text x="100" y="150" textAnchor="middle" fill="#111814" fontSize="10.5" fontWeight="800">• PUNJAB •</text>
            <circle cx="70" cy="62" r="14" fill="#111814" />
            <circle cx="130" cy="66" r="10" fill="#111814" />
          </g>
          {/* Text on Label */}
          <text x="100" y="202" textAnchor="middle" fill="#232724" fontSize="9" fontWeight="800" letterSpacing="1.8">— PREMIUM —</text>
          <text x="100" y="218" textAnchor="middle" fill="#D9840B" fontSize="15" fontWeight="900" letterSpacing="0.8" fontFamily="'Cormorant Garamond', Georgia, serif">LAKADONG</text>
          <text x="100" y="233" textAnchor="middle" fill="#D9840B" fontSize="13" fontWeight="900" letterSpacing="0.8" fontFamily="'Cormorant Garamond', Georgia, serif">TURMERIC</text>
          <text x="100" y="246" textAnchor="middle" fill="#8C4405" fontSize="10" fontWeight="800" fontFamily="'Cormorant Garamond', Georgia, serif">POWDER</text>
          <text x="100" y="258" textAnchor="middle" fill="#5F6662" fontSize="7.5" fontStyle="italic">Pure · Natural · Authentic</text>
          {/* Bottom golden field etching */}
          <path d="M 40 270 Q 100 260 160 270" stroke="#D9840B" strokeWidth="1" fill="none" />

          {/* Black Ribbed Lid */}
          <rect x="35" y="32" width="130" height="30" rx="3" fill="url(#ribbedLid)" stroke="#111312" strokeWidth="1.5" />
          {[...Array(16)].map((_, i) => (
            <line key={i} x1={42 + i * 7.5} y1="34" x2={42 + i * 7.5} y2="60" stroke="#111312" strokeWidth="2" />
          ))}

          {/* Vertical Golden-Yellow Ribbon "100% Authentic" */}
          <rect x="88" y="34" width="24" height="60" fill="#E59B16" stroke="#A86C05" strokeWidth="0.8" />
          <polygon points="88,94 100,86 112,94 112,86 88,86" fill="#E59B16" />
          <text x="-66" y="104" transform="rotate(-90)" textAnchor="middle" fill="#FAF8F2" fontSize="7" fontWeight="800" letterSpacing="0.8">100% Authentic</text>

          {/* Wooden Bowl in Front with conical mound of golden turmeric */}
          <g transform="translate(20, 240)" filter="url(#sceneShadow)">
            <ellipse cx="80" cy="65" rx="75" ry="26" fill="url(#woodenBowl)" stroke="#1F0E04" strokeWidth="2.5" />
            <ellipse cx="80" cy="60" rx="68" ry="22" fill="#2E1608" />
            {/* High conical mound of vibrant turmeric powder */}
            <path d="M 20 60 Q 80 8 140 60 Z" fill="#F8A81B" />
            <ellipse cx="80" cy="42" rx="55" ry="18" fill="#D9800B" />
          </g>

          {/* Sliced Fresh Turmeric Root Rhizomes in Foreground */}
          <g transform="translate(70, 315)">
            <ellipse cx="15" cy="15" rx="14" ry="16" fill="#E8820C" stroke="#7A3D02" strokeWidth="2" />
            <ellipse cx="15" cy="15" rx="10" ry="12" fill="#FFAA22" />
            <circle cx="15" cy="15" r="5" fill="#FFC952" />

            <g transform="translate(22, 6)">
              <ellipse cx="12" cy="12" rx="11" ry="13" fill="#E8820C" stroke="#7A3D02" strokeWidth="1.8" />
              <ellipse cx="12" cy="12" rx="8" ry="10" fill="#FFAA22" />
              <circle cx="12" cy="12" r="4" fill="#FFC952" />
            </g>
          </g>
        </g>

        {/* ================================================================= */}
        {/* PRODUCT 4: PREMIUM RED CHILLY FLAKES */}
        {/* ================================================================= */}
        <g
          transform="translate(870, 440)"
          className="cursor-pointer transition-transform duration-300 hover:opacity-95"
          onClick={() => chilly && onSelectProduct && onSelectProduct(chilly)}
          onMouseEnter={() => setHoveredProduct('chilly')}
          onMouseLeave={() => setHoveredProduct(null)}
        >
          {/* Glass Jar Body */}
          <rect x="25" y="60" width="150" height="240" rx="12" fill="#FDF0EE" stroke="#EAD3CF" strokeWidth="2" />
          {/* Crushed red chilli flakes filling jar */}
          <rect x="28" y="64" width="144" height="232" rx="10" fill="#A82215" />
          {/* Glass sheen */}
          <rect x="25" y="60" width="150" height="240" rx="12" fill="url(#glassReflect)" />
          <line x1="34" y1="70" x2="34" y2="290" stroke="#FFFFFF" strokeWidth="4" opacity="0.5" />

          {/* Ivory Label */}
          <rect x="36" y="105" width="128" height="175" rx="3" fill="#FAF8F2" stroke="#DDD5C6" strokeWidth="1" />
          {/* Green Veg Mark */}
          <rect x="144" y="112" width="12" height="12" fill="#FFFFFF" stroke="#166534" strokeWidth="1.2" />
          <circle cx="150" cy="118" r="3.5" fill="#166534" />
          {/* Tractor Crest Emblem */}
          <g transform="translate(56, 115) scale(0.44)">
            <polygon points="100,10 185,50 185,140 100,180 15,140 15,50" fill="#FFFFFF" stroke="#111814" strokeWidth="5" />
            <rect x="18" y="90" width="164" height="28" fill="#111814" />
            <text x="100" y="110" textAnchor="middle" fill="#FFFFFF" fontSize="12.5" fontWeight="900" fontFamily="sans-serif">KATHLOURIA FARMS</text>
            <text x="100" y="132" textAnchor="middle" fill="#111814" fontSize="9.5" fontWeight="800">— ESTD 1891 —</text>
            <text x="100" y="150" textAnchor="middle" fill="#111814" fontSize="10.5" fontWeight="800">• PUNJAB •</text>
            <circle cx="70" cy="62" r="14" fill="#111814" />
            <circle cx="130" cy="66" r="10" fill="#111814" />
          </g>
          {/* Text on Label */}
          <text x="100" y="202" textAnchor="middle" fill="#232724" fontSize="9" fontWeight="800" letterSpacing="1.8">— PREMIUM —</text>
          <text x="100" y="220" textAnchor="middle" fill="#A81C10" fontSize="17" fontWeight="900" letterSpacing="0.8" fontFamily="'Cormorant Garamond', Georgia, serif">RED CHILLY</text>
          <text x="100" y="238" textAnchor="middle" fill="#700F06" fontSize="14" fontWeight="900" letterSpacing="0.8" fontFamily="'Cormorant Garamond', Georgia, serif">FLAKES</text>
          <text x="100" y="254" textAnchor="middle" fill="#5F6662" fontSize="8" fontStyle="italic">Pure · Natural · Authentic</text>
          {/* Bottom red field etching */}
          <path d="M 40 270 Q 100 260 160 270" stroke="#A81C10" strokeWidth="1" fill="none" />

          {/* Black Ribbed Lid */}
          <rect x="35" y="32" width="130" height="30" rx="3" fill="url(#ribbedLid)" stroke="#111312" strokeWidth="1.5" />
          {[...Array(16)].map((_, i) => (
            <line key={i} x1={42 + i * 7.5} y1="34" x2={42 + i * 7.5} y2="60" stroke="#111312" strokeWidth="2" />
          ))}

          {/* Vertical Red Ribbon "100% Authentic" */}
          <rect x="88" y="34" width="24" height="60" fill="#A81C10" stroke="#700F06" strokeWidth="0.8" />
          <polygon points="88,94 100,86 112,94 112,86 88,86" fill="#A81C10" />
          <text x="-66" y="104" transform="rotate(-90)" textAnchor="middle" fill="#FAF8F2" fontSize="7" fontWeight="800" letterSpacing="0.8">100% Authentic</text>

          {/* Wooden Bowl in Front with coarse red chilly flakes & seeds */}
          <g transform="translate(20, 240)" filter="url(#sceneShadow)">
            <ellipse cx="80" cy="65" rx="75" ry="26" fill="url(#woodenBowl)" stroke="#1F0E04" strokeWidth="2.5" />
            <ellipse cx="80" cy="60" rx="68" ry="22" fill="#2E1608" />
            {/* Mound of coarse crushed chilli flakes */}
            <path d="M 20 60 Q 80 12 140 60 Z" fill="#AB2215" />
            <ellipse cx="80" cy="46" rx="55" ry="18" fill="#85150B" />
            {/* Flakes and golden seeds */}
            {[...Array(12)].map((_, i) => (
              <circle
                key={i}
                cx={40 + (i % 4) * 25 + (i * 7) % 15}
                cy={38 + Math.floor(i / 4) * 8}
                r="2.5"
                fill="#ECC97B"
                stroke="#99701E"
                strokeWidth="0.5"
              />
            ))}
          </g>

          {/* Whole Dried Red Chillies with stems lying in foreground on right */}
          <g transform="translate(130, 310)">
            {/* Chilli 1 */}
            <path d="M 0 10 Q 30 -5 65 14 Q 35 22 0 10 Z" fill="#9C170A" stroke="#5E0D05" strokeWidth="1.5" />
            <path d="M 0 10 Q -6 8 -8 2" stroke="#2D5A27" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            {/* Chilli 2 */}
            <path d="M 15 22 Q 45 8 75 25 Q 45 32 15 22 Z" fill="#801207" stroke="#4D0903" strokeWidth="1.5" />
            <path d="M 15 22 Q 9 20 7 14" stroke="#2D5A27" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          </g>
        </g>
      </svg>

      {/* Floating interactive tooltip */}
      <div className="bg-[#0A1A0F] border-t border-[#C5A467]/30 py-2.5 px-4 flex flex-wrap items-center justify-between gap-3 text-xs text-[#FAF7F0]/90">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#4ADE80] animate-pulse" />
          <span className="font-semibold text-[#C5A467] tracking-wider uppercase">
            Official Farm Photography Lineup:
          </span>
          <span className="text-white/80">
            Click any jar to explore its health benefits, volatile oils & sizes
          </span>
        </div>
        <div className="flex items-center gap-4 text-[11px] font-medium text-[#C5A467]">
          <span>🌿 1. Premium Saunf</span>
          <span>🌰 2. Jeera Powder</span>
          <span>✨ 3. Lakadong Turmeric</span>
          <span>🌶️ 4. Red Chilly Flakes</span>
        </div>
      </div>
    </div>
  );
};
