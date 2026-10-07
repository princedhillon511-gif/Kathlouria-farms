import React from 'react';

interface BrandLogoProps {
  variant?: 'horizontal' | 'vertical' | 'emblem' | 'compact' | 'shield';
  theme?: 'dark-on-light' | 'light-on-dark';
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

// Static precalculated spoke coordinates to prevent any floating-point SSR/client hydration mismatch
const REAR_WHEEL_SPOKES = [
  { x1: 48.0, y1: 58.0, x2: 52.0, y2: 58.0 },
  { x1: 46.02, y1: 66.68, x2: 49.62, y2: 68.41 },
  { x1: 40.47, y1: 73.64, x2: 42.96, y2: 76.76 },
  { x1: 32.45, y1: 77.5, x2: 33.34, y2: 81.4 },
  { x1: 23.55, y1: 77.5, x2: 22.66, y2: 81.4 },
  { x1: 15.53, y1: 73.64, x2: 13.04, y2: 76.76 },
  { x1: 9.98, y1: 66.68, x2: 6.38, y2: 68.41 },
  { x1: 8.0, y1: 58.0, x2: 4.0, y2: 58.0 },
  { x1: 9.98, y1: 49.32, x2: 6.38, y2: 47.59 },
  { x1: 15.53, y1: 42.36, x2: 13.04, y2: 39.24 },
  { x1: 23.55, y1: 38.5, x2: 22.66, y2: 34.6 },
  { x1: 32.45, y1: 38.5, x2: 33.34, y2: 34.6 },
  { x1: 40.47, y1: 42.36, x2: 42.96, y2: 39.24 },
  { x1: 46.02, y1: 49.32, x2: 49.62, y2: 47.59 },
];

const FRONT_WHEEL_SPOKES = [
  { x1: 85.0, y1: 64.0, x2: 88.0, y2: 64.0 },
  { x1: 82.9, y1: 70.47, x2: 85.33, y2: 72.23 },
  { x1: 77.4, y1: 74.46, x2: 78.33, y2: 77.31 },
  { x1: 70.6, y1: 74.46, x2: 69.67, y2: 77.31 },
  { x1: 65.1, y1: 70.47, x2: 62.67, y2: 72.23 },
  { x1: 63.0, y1: 64.0, x2: 60.0, y2: 64.0 },
  { x1: 65.1, y1: 57.53, x2: 62.67, y2: 55.77 },
  { x1: 70.6, y1: 53.54, x2: 69.67, y2: 50.69 },
  { x1: 77.4, y1: 53.54, x2: 78.33, y2: 50.69 },
  { x1: 82.9, y1: 57.53, x2: 85.33, y2: 55.77 },
];

export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = 'horizontal',
  theme = 'dark-on-light',
  className = '',
  size = 'md',
}) => {
  const isLightOnDark = theme === 'light-on-dark';

  // Exact Hexagonal Shield Logo from First Photo (IMG_7615.jpeg)
  const darkGreen = isLightOnDark ? '#FAF7F0' : '#143823';
  const badgeGreen = '#143823';
  const bgIvory = isLightOnDark ? '#142C1E' : '#FAF8F2';
  const mountainSage = isLightOnDark ? '#264B34' : '#DCE3D8';

  const renderHexagonShield = (w = 64, h = 64) => (
    <svg
      width={w}
      height={h}
      viewBox="0 0 240 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0 transition-transform duration-300 hover:scale-105"
      aria-label="Kathlouria Farms Punjab - Estd. 1891 Official Logo"
    >
      <defs>
        {/* Drop shadow for subtle shield depth */}
        <filter id="badgeShadow" x="-10%" y="-10%" width="120%" height="125%" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#000000" floodOpacity="0.15" />
        </filter>
        {/* Clip path inside hexagon shield */}
        <clipPath id="shieldInnerClip">
          <polygon points="120,18 214,64 214,168 120,214 26,168 26,64" />
        </clipPath>
      </defs>

      {/* Hexagonal Shield Outer Thick Border */}
      <polygon
        points="120,14 220,62 220,172 120,220 20,172 20,62"
        fill={bgIvory}
        stroke={badgeGreen}
        strokeWidth="6"
        strokeLinejoin="round"
        filter="url(#badgeShadow)"
      />

      {/* Hexagonal Inner Fine Border */}
      <polygon
        points="120,22 212,66 212,166 120,210 28,166 28,66"
        fill={bgIvory}
        stroke={badgeGreen}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />

      {/* Clipped Area for Mountains & Sky */}
      <g clipPath="url(#shieldInnerClip)">
        {/* Soft mountain peaks in background */}
        <polygon points="120,38 174,104 66,104" fill={mountainSage} />
        <polygon points="76,64 116,104 36,104" fill={mountainSage} opacity="0.8" />
        <polygon points="164,64 204,104 124,104" fill={mountainSage} opacity="0.8" />

        {/* Left Evergreen Pine Tree */}
        <g transform="translate(40, 92) scale(0.7)">
          <polygon points="20,0 34,22 26,22 38,40 28,40 40,58 0,58 12,40 2,40 14,22 6,22" fill={badgeGreen} />
          <rect x="16" y="58" width="8" height="12" fill={badgeGreen} />
        </g>

        {/* Right Evergreen Pine Tree */}
        <g transform="translate(172, 92) scale(0.7)">
          <polygon points="20,0 34,22 26,22 38,40 28,40 40,58 0,58 12,40 2,40 14,22 6,22" fill={badgeGreen} />
          <rect x="16" y="58" width="8" height="12" fill={badgeGreen} />
        </g>

        {/* Center Vintage Agricultural Tractor */}
        <g transform="translate(74, 52) scale(0.95)">
          {/* Cab roof and frame */}
          <path d="M12 12 L44 12 L40 44 L16 44 Z" fill={badgeGreen} />
          {/* Windshield glass panes with white diagonal reflection */}
          <polygon points="16,16 26,16 24,40 16,40" fill={bgIvory} />
          <polygon points="29,16 40,16 37,40 27,40" fill={bgIvory} />
          {/* Glare lines */}
          <line x1="20" y1="20" x2="22" y2="36" stroke={badgeGreen} strokeWidth="1.5" />
          <line x1="33" y1="20" x2="35" y2="36" stroke={badgeGreen} strokeWidth="1.5" />

          {/* Engine hood & front grille */}
          <path d="M42 28 L72 30 L74 54 L40 54 Z" fill={badgeGreen} />
          {/* Grille vertical vents */}
          <line x1="58" y1="36" x2="58" y2="46" stroke={bgIvory} strokeWidth="2" strokeLinecap="round" />
          <line x1="64" y1="36" x2="64" y2="46" stroke={bgIvory} strokeWidth="2" strokeLinecap="round" />
          <line x1="70" y1="38" x2="70" y2="46" stroke={bgIvory} strokeWidth="2" strokeLinecap="round" />

          {/* Vertical Exhaust Pipe with curve */}
          <path d="M62 28 L62 14 Q 62 10, 66 8" stroke={badgeGreen} strokeWidth="3" strokeLinecap="round" fill="none" />

          {/* Big Rear Knobby Wheel */}
          <circle cx="28" cy="58" r="22" fill={badgeGreen} />
          {/* Knobby tire tread lugs (statically positioned) */}
          {REAR_WHEEL_SPOKES.map((spoke, i) => (
            <line
              key={i}
              x1={spoke.x1}
              y1={spoke.y1}
              x2={spoke.x2}
              y2={spoke.y2}
              stroke={bgIvory}
              strokeWidth="2.2"
              strokeLinecap="round"
            />
          ))}
          <circle cx="28" cy="58" r="14" fill={bgIvory} stroke={badgeGreen} strokeWidth="2" />
          <circle cx="28" cy="58" r="7" fill={badgeGreen} />

          {/* Small Front Knobby Wheel */}
          <circle cx="74" cy="64" r="13" fill={badgeGreen} />
          {FRONT_WHEEL_SPOKES.map((spoke, i) => (
            <line
              key={i}
              x1={spoke.x1}
              y1={spoke.y1}
              x2={spoke.x2}
              y2={spoke.y2}
              stroke={bgIvory}
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          ))}
          <circle cx="74" cy="64" r="8" fill={bgIvory} stroke={badgeGreen} strokeWidth="1.8" />
          <circle cx="74" cy="64" r="4" fill={badgeGreen} />
        </g>
      </g>

      {/* Center Ribbon Banner with Swallowtail Notches */}
      <g transform="translate(0, 126)">
        {/* Banner shadow/fold corners */}
        <polygon points="12,18 24,28 24,18" fill="#0C2417" />
        <polygon points="228,18 216,28 216,18" fill="#0C2417" />

        {/* Left swallowtail ribbon end */}
        <polygon points="6,26 24,0 24,32 6,32 16,16" fill={badgeGreen} />
        {/* Right swallowtail ribbon end */}
        <polygon points="234,26 216,0 216,32 234,32 224,16" fill={badgeGreen} />

        {/* Main Banner Bar */}
        <rect x="18" y="0" width="204" height="34" rx="1.5" fill={badgeGreen} />

        {/* Banner Text: KATHLOURIA FARMS in bold condensed uppercase */}
        <text
          x="120"
          y="23"
          textAnchor="middle"
          fill="#FAF8F2"
          fontSize="17"
          fontWeight="900"
          letterSpacing="1.8"
          fontFamily="'Plus Jakarta Sans', system-ui, sans-serif"
          className="select-none"
        >
          KATHLOURIA FARMS
        </text>
      </g>

      {/* Bottom Section: ESTD. 1891 and PUNJAB */}
      <g transform="translate(0, 168)">
        {/* Horizontal dashes around ESTD. 1891 */}
        <line x1="56" y1="12" x2="76" y2="12" stroke={badgeGreen} strokeWidth="2.5" strokeLinecap="round" />
        <text
          x="120"
          y="16"
          textAnchor="middle"
          fill={badgeGreen}
          fontSize="11"
          fontWeight="800"
          letterSpacing="2"
          fontFamily="'Plus Jakarta Sans', sans-serif"
        >
          ESTD. 1891
        </text>
        <line x1="164" y1="12" x2="184" y2="12" stroke={badgeGreen} strokeWidth="2.5" strokeLinecap="round" />

        {/* Bullets around PUNJAB */}
        <circle cx="88" cy="28" r="2.5" fill={badgeGreen} />
        <text
          x="120"
          y="32"
          textAnchor="middle"
          fill={badgeGreen}
          fontSize="12"
          fontWeight="800"
          letterSpacing="4"
          fontFamily="'Plus Jakarta Sans', sans-serif"
        >
          PUNJAB
        </text>
        <circle cx="152" cy="28" r="2.5" fill={badgeGreen} />
      </g>
    </svg>
  );

  if (variant === 'emblem' || variant === 'shield') {
    const dim = size === 'sm' ? 44 : size === 'lg' ? 80 : size === 'xl' ? 104 : 64;
    return <div className={`inline-flex items-center justify-center ${className}`}>{renderHexagonShield(dim, dim)}</div>;
  }

  if (variant === 'vertical') {
    return (
      <div className={`flex flex-col items-center text-center gap-2 ${className}`}>
        {renderHexagonShield(size === 'sm' ? 48 : size === 'lg' ? 90 : 72, size === 'sm' ? 48 : size === 'lg' ? 90 : 72)}
        <div className="flex flex-col items-center">
          <span
            className="font-serif text-2xl font-bold tracking-[0.14em] uppercase transition-colors"
            style={{ color: darkGreen }}
          >
            Kathlouria Farms
          </span>
          <span className="text-[10px] tracking-[0.24em] font-semibold uppercase mt-0.5 text-[#C5A467]">
            Estd. 1891 · Punjab
          </span>
        </div>
      </div>
    );
  }

  // Horizontal variant (for Top Navigation and Header)
  const emblemDim = size === 'sm' ? 40 : size === 'lg' ? 58 : size === 'xl' ? 70 : 48;
  const titleSize = size === 'sm' ? 'text-lg' : size === 'lg' ? 'text-2xl' : size === 'xl' ? 'text-3xl' : 'text-xl';
  const subtitleSize = size === 'sm' ? 'text-[9px]' : 'text-[10px]';

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {renderHexagonShield(emblemDim, emblemDim)}
      <div className="flex flex-col justify-center leading-none">
        <span
          className={`font-serif font-bold tracking-[0.12em] uppercase ${titleSize}`}
          style={{ color: darkGreen }}
        >
          Kathlouria Farms
        </span>
        <div className="flex items-center gap-1.5 mt-1">
          <span className={`${subtitleSize} font-bold tracking-[0.2em] uppercase text-[#C5A467]`}>
            Estd. 1891
          </span>
          <span className="w-1 h-1 rounded-full bg-[#C5A467] opacity-75" />
          <span className={`${subtitleSize} font-semibold tracking-[0.2em] uppercase`} style={{ color: darkGreen }}>
            Punjab
          </span>
          <span className="w-1 h-1 rounded-full bg-[#C5A467] opacity-75 hidden sm:inline" />
          <span className={`${subtitleSize} tracking-[0.12em] font-normal uppercase hidden sm:inline text-[#C5A467]`}>
            From Our Farm To Your Family
          </span>
        </div>
      </div>
    </div>
  );
};
