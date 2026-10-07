import React from 'react';

export const TractorArt: React.FC<{ className?: string; color?: string }> = ({
  className = '',
  color = '#C5A467',
}) => (
  <svg
    viewBox="0 0 120 70"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    {/* Rear big wheel */}
    <circle cx="28" cy="46" r="18" stroke={color} strokeWidth="2.2" fill="none" />
    <circle cx="28" cy="46" r="9" stroke={color} strokeWidth="1.2" fill={color} fillOpacity="0.2" />
    <circle cx="28" cy="46" r="3" fill={color} />
    {/* Wheel spokes */}
    <line x1="28" y1="28" x2="28" y2="64" stroke={color} strokeWidth="1.2" />
    <line x1="10" y1="46" x2="46" y2="46" stroke={color} strokeWidth="1.2" />
    <line x1="15" y1="33" x2="41" y2="59" stroke={color} strokeWidth="1.2" />
    <line x1="15" y1="59" x2="41" y2="33" stroke={color} strokeWidth="1.2" />

    {/* Front small wheel */}
    <circle cx="92" cy="52" r="11" stroke={color} strokeWidth="2" fill="none" />
    <circle cx="92" cy="52" r="4" fill={color} />
    <line x1="92" y1="41" x2="92" y2="63" stroke={color} strokeWidth="1" />
    <line x1="81" y1="52" x2="103" y2="52" stroke={color} strokeWidth="1" />

    {/* Chassis & Hood */}
    <path
      d="M28 36 L48 36 L52 24 L94 28 L98 48 L48 48"
      stroke={color}
      strokeWidth="2.2"
      strokeLinejoin="round"
      fill="none"
    />
    {/* Radiator grill */}
    <line x1="94" y1="30" x2="94" y2="44" stroke={color} strokeWidth="1.4" />
    <line x1="90" y1="30" x2="90" y2="44" stroke={color} strokeWidth="1" />

    {/* Exhaust pipe with vintage bend */}
    <path d="M80 26 L80 10 L84 8" stroke={color} strokeWidth="2" strokeLinecap="round" fill="none" />
    
    {/* Driver Seat & Steering */}
    <path d="M44 26 L40 18 L34 18" stroke={color} strokeWidth="1.8" strokeLinecap="round" fill="none" />
    <path d="M52 24 L56 16" stroke={color} strokeWidth="1.8" fill="none" />
    <line x1="53" y1="16" x2="61" y2="16" stroke={color} strokeWidth="2.2" strokeLinecap="round" />

    {/* Ground furrow line */}
    <path
      d="M2 66 C 30 64, 60 67, 118 66"
      stroke={color}
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeDasharray="4 2"
    />
  </svg>
);

export const WheatSheafArt: React.FC<{ className?: string; color?: string }> = ({
  className = '',
  color = '#C5A467',
}) => (
  <svg viewBox="0 0 80 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
    <path d="M40 38 L40 4" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    <path d="M40 8 C34 5, 28 8, 30 14 C35 15, 38 12, 40 8 Z" fill={color} fillOpacity="0.7" />
    <path d="M40 8 C46 5, 52 8, 50 14 C45 15, 42 12, 40 8 Z" fill={color} fillOpacity="0.7" />
    <path d="M40 16 C32 13, 26 16, 28 22 C34 23, 38 20, 40 16 Z" fill={color} fillOpacity="0.7" />
    <path d="M40 16 C48 13, 54 16, 52 22 C46 23, 42 20, 40 16 Z" fill={color} fillOpacity="0.7" />
    <path d="M40 24 C34 22, 28 25, 30 30 C35 31, 38 28, 40 24 Z" fill={color} fillOpacity="0.7" />
    <path d="M40 24 C46 22, 52 25, 50 30 C45 31, 42 28, 40 24 Z" fill={color} fillOpacity="0.7" />
  </svg>
);

export const FarmlandLandscapeIllustration: React.FC<{ className?: string }> = ({
  className = '',
}) => (
  <div className={`relative overflow-hidden ${className}`}>
    <svg
      viewBox="0 0 1200 480"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full object-cover"
    >
      {/* Soft Morning Mist Gradient */}
      <defs>
        <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#152C1E" />
          <stop offset="50%" stopColor="#1C3827" />
          <stop offset="100%" stopColor="#254631" />
        </linearGradient>
        <linearGradient id="sunGlow" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#E0B768" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#E0B768" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="furrowGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#213E2B" />
          <stop offset="100%" stopColor="#102216" />
        </linearGradient>
      </defs>

      {/* Sky Canvas */}
      <rect width="1200" height="480" fill="url(#skyGrad)" />

      {/* Morning Sun Rising over Hillslopes */}
      <circle cx="850" cy="190" r="160" fill="url(#sunGlow)" />
      <circle cx="850" cy="190" r="45" fill="#C5A467" fillOpacity="0.4" />

      {/* Distant Foothills */}
      <path
        d="M0 240 Q 220 180, 480 230 T 960 210 Q 1100 220, 1200 240 L1200 480 L0 480 Z"
        fill="#183322"
        opacity="0.8"
      />
      <path
        d="M0 270 Q 300 230, 620 260 T 1200 250 L1200 480 L0 480 Z"
        fill="#1B3B26"
        opacity="0.9"
      />

      {/* Heritage Agricultural Furrows */}
      <path
        d="M0 320 C 350 300, 750 340, 1200 310 L 1200 480 L 0 480 Z"
        fill="url(#furrowGrad)"
      />
      {/* Terraced Contour Lines */}
      <path
        d="M-50 340 C 280 320, 680 355, 1250 330"
        stroke="#C5A467"
        strokeWidth="1.2"
        strokeOpacity="0.3"
        fill="none"
      />
      <path
        d="M-50 375 C 320 350, 720 390, 1250 360"
        stroke="#C5A467"
        strokeWidth="1.4"
        strokeOpacity="0.35"
        fill="none"
      />
      <path
        d="M-50 415 C 350 390, 780 435, 1250 400"
        stroke="#C5A467"
        strokeWidth="1.6"
        strokeOpacity="0.4"
        fill="none"
      />

      {/* Tractor working the fields in midground */}
      <g transform="translate(680, 265) scale(0.65)">
        <TractorArt color="#C5A467" />
      </g>

      {/* Traditional Acacia & Neem Tree Silhouettes */}
      <g transform="translate(180, 180) scale(0.8)">
        <path d="M40 120 L40 70 Q 30 50, 10 30 Q 30 35, 40 45 Q 50 30, 70 20 Q 55 40, 42 60 L42 120 Z" fill="#122619" />
        <ellipse cx="38" cy="40" rx="45" ry="32" fill="#152C1E" opacity="0.9" />
      </g>
      <g transform="translate(240, 195) scale(0.6)">
        <ellipse cx="35" cy="45" rx="35" ry="25" fill="#152C1E" opacity="0.8" />
      </g>
    </svg>
  </div>
);
