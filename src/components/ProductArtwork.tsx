import React from 'react';

interface ProductArtworkProps {
  slug: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'hero';
}

export const ProductArtwork: React.FC<ProductArtworkProps> = ({
  slug,
  className = '',
  size = 'md',
}) => {
  const getDims = () => {
    switch (size) {
      case 'sm':
        return { w: 180, h: 180 };
      case 'lg':
        return { w: 420, h: 420 };
      case 'hero':
        return { w: 540, h: 540 };
      case 'md':
      default:
        return { w: 320, h: 320 };
    }
  };

  const { w, h } = getDims();

  // Helper: Authentic Hexagonal Tractor Shield Logo matching the uploaded photo
  const renderJarEmblem = (x: number, y: number, scale = 0.38) => (
    <g transform={`translate(${x}, ${y}) scale(${scale})`}>
      {/* Outer Hexagon */}
      <polygon
        points="100,10 185,50 185,150 100,190 15,150 15,50"
        fill="#FFFFFF"
        stroke="#111814"
        strokeWidth="5"
        strokeLinejoin="round"
      />
      <polygon
        points="100,18 178,54 178,146 100,182 22,146 22,54"
        fill="#FFFFFF"
        stroke="#111814"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      {/* Distant Mountains */}
      <polygon points="100,32 145,86 55,86" fill="#E2E8DF" />
      {/* Pine Trees */}
      <polygon points="34,68 44,84 38,84 48,98 22,98 32,84 26,84" fill="#111814" />
      <polygon points="166,68 176,84 170,84 180,98 154,98 164,84 158,84" fill="#111814" />
      {/* Farm Tractor */}
      <g transform="translate(68, 48) scale(0.65)">
        <path d="M12 12 L38 12 L34 38 L16 38 Z" fill="#111814" />
        <polygon points="16,16 24,16 22,34 16,34" fill="#FFFFFF" />
        <polygon points="27,16 34,16 32,34 25,34" fill="#FFFFFF" />
        <path d="M36 24 L60 26 L62 46 L34 46 Z" fill="#111814" />
        <line x1="52" y1="24" x2="52" y2="10" stroke="#111814" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="25" cy="50" r="18" fill="#111814" />
        <circle cx="25" cy="50" r="11" fill="#FFFFFF" stroke="#111814" strokeWidth="1.5" />
        <circle cx="25" cy="50" r="5" fill="#111814" />
        <circle cx="62" cy="54" r="11" fill="#111814" />
        <circle cx="62" cy="54" r="7" fill="#FFFFFF" stroke="#111814" strokeWidth="1.5" />
        <circle cx="62" cy="54" r="3" fill="#111814" />
      </g>
      {/* Central Banner: KATHLOURIA FARMS */}
      <polygon points="4,116 20,96 20,122 4,122 12,109" fill="#111814" />
      <polygon points="196,116 180,96 180,122 196,122 188,109" fill="#111814" />
      <rect x="16" y="96" width="168" height="28" fill="#111814" rx="1" />
      <text
        x="100"
        y="115"
        textAnchor="middle"
        fill="#FFFFFF"
        fontSize="12.5"
        fontWeight="900"
        letterSpacing="1.2"
        fontFamily="sans-serif"
      >
        KATHLOURIA FARMS
      </text>
      {/* Estd 1891 Punjab */}
      <line x1="46" y1="138" x2="62" y2="138" stroke="#111814" strokeWidth="1.8" strokeLinecap="round" />
      <text x="100" y="141" textAnchor="middle" fill="#111814" fontSize="9.5" fontWeight="800" letterSpacing="1.5">
        — ESTD 1891 —
      </text>
      <line x1="138" y1="138" x2="154" y2="138" stroke="#111814" strokeWidth="1.8" strokeLinecap="round" />
      <text x="100" y="156" textAnchor="middle" fill="#111814" fontSize="10.5" fontWeight="800" letterSpacing="2.5">
        • PUNJAB •
      </text>
    </g>
  );

  // Common Glass Jar Anatomy
  const renderGlassJar = ({
    ribbonColor,
    ribbonDark,
    spiceFillGrad,
    accentFoliageColor,
    productTitle1,
    productTitle2,
    productTitle3,
    renderBowlContents,
    renderTableBotanicals,
  }: {
    ribbonColor: string;
    ribbonDark: string;
    spiceFillGrad: string;
    accentFoliageColor: string;
    productTitle1: string;
    productTitle2?: string;
    productTitle3?: string;
    renderBowlContents: () => React.ReactNode;
    renderTableBotanicals: () => React.ReactNode;
  }) => (
    <g>
      <defs>
        {/* Table Shadow */}
        <radialGradient id="jarBaseShadow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#000000" stopOpacity="0.45" />
          <stop offset="60%" stopColor="#000000" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0" />
        </radialGradient>
        {/* Glass reflection gradient */}
        <linearGradient id="glassReflection" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.4" />
          <stop offset="15%" stopColor="#FFFFFF" stopOpacity="0.05" />
          <stop offset="50%" stopColor="#000000" stopOpacity="0" />
          <stop offset="85%" stopColor="#FFFFFF" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.3" />
        </linearGradient>
        {/* Black Ribbed Lid Gradient */}
        <linearGradient id="lidGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#1C1E1D" />
          <stop offset="20%" stopColor="#3A3E3B" />
          <stop offset="50%" stopColor="#1E201F" />
          <stop offset="80%" stopColor="#353936" />
          <stop offset="100%" stopColor="#111312" />
        </linearGradient>
        {/* Wooden Bowl Gradient */}
        <radialGradient id="woodenBowlGrad" cx="50%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#5E3516" />
          <stop offset="60%" stopColor="#3D200B" />
          <stop offset="100%" stopColor="#221105" />
        </radialGradient>
        {/* Drop shadow filter */}
        <filter id="jarShadow" x="-15%" y="-15%" width="130%" height="140%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="5" />
          <feOffset dx="2" dy="8" result="offsetblur" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.35" />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* 1. Rustic Farm Table Surface */}
      <rect x="0" y="325" width="400" height="75" fill="#4A3423" />
      {/* Wood grain planks */}
      <line x1="0" y1="325" x2="400" y2="325" stroke="#332114" strokeWidth="2.5" />
      <line x1="0" y1="355" x2="400" y2="355" stroke="#382517" strokeWidth="1" strokeDasharray="60 10 90 20" />
      <line x1="0" y1="378" x2="400" y2="378" stroke="#382517" strokeWidth="1" strokeDasharray="40 15 120 10" />

      {/* Ambient shadow underneath jar & bowl */}
      <ellipse cx="200" cy="336" rx="90" ry="16" fill="url(#jarBaseShadow)" />
      <ellipse cx="200" cy="365" rx="75" ry="14" fill="url(#jarBaseShadow)" />

      {/* 2. THE GLASS APOTHECARY JAR */}
      <g filter="url(#jarShadow)">
        {/* Outer Glass Jar Silhouette */}
        <path
          d="M 125,75 
             C 125,65 140,58 152,58 
             L 248,58 
             C 260,58 275,65 275,75 
             L 278,320 
             C 278,332 260,335 200,335 
             C 140,335 122,332 122,320 
             Z"
          fill="#F5F5F0"
          stroke="#D8DDD6"
          strokeWidth="1.5"
        />

        {/* Jar Interior Content: Filled with Spice */}
        <path
          d="M 126,76 
             C 126,68 140,62 152,62 
             L 248,62 
             C 260,62 274,68 274,76 
             L 276,318 
             C 276,330 258,333 200,333 
             C 142,333 124,330 124,318 
             Z"
          fill={spiceFillGrad}
        />

        {/* Glass wall highlights & specular sheen */}
        <path
          d="M 125,75 L 122,320"
          stroke="#FFFFFF"
          strokeWidth="3.5"
          opacity="0.6"
          strokeLinecap="round"
        />
        <path
          d="M 132,78 L 130,320"
          stroke="#FFFFFF"
          strokeWidth="1.5"
          opacity="0.3"
          strokeLinecap="round"
        />
        <path
          d="M 275,75 L 278,320"
          stroke="#FFFFFF"
          strokeWidth="2.5"
          opacity="0.45"
          strokeLinecap="round"
        />

        {/* 3. THE JAR LABEL (Ivory / Warm White) */}
        <g transform="translate(132, 92)">
          {/* Label Card Body */}
          <rect
            x="0"
            y="0"
            width="136"
            height="188"
            rx="3"
            fill="#FAF8F2"
            stroke="#DCD4C4"
            strokeWidth="1"
          />

          {/* Green Vegetarian Dot in Square (Top Right of Label) */}
          <g transform="translate(118, 8)">
            <rect x="0" y="0" width="11" height="11" fill="#FFFFFF" stroke="#166534" strokeWidth="1.2" />
            <circle cx="5.5" cy="5.5" r="3.2" fill="#166534" />
          </g>

          {/* Kathlouria Farms Hexagonal Emblem Top Center */}
          {renderJarEmblem(32, 10, 0.36)}

          {/* "— PREMIUM —" */}
          <text
            x="68"
            y="94"
            textAnchor="middle"
            fill="#232724"
            fontSize="8"
            fontWeight="800"
            letterSpacing="2.2"
            fontFamily="'Plus Jakarta Sans', sans-serif"
          >
            — PREMIUM —
          </text>

          {/* Product Title Lines */}
          <text
            x="68"
            y="114"
            textAnchor="middle"
            fill="#121614"
            fontSize="15"
            fontWeight="900"
            letterSpacing="0.8"
            fontFamily="'Cormorant Garamond', Georgia, serif"
          >
            {productTitle1}
          </text>
          {productTitle2 && (
            <text
              x="68"
              y="130"
              textAnchor="middle"
              fill="#121614"
              fontSize="13"
              fontWeight="900"
              letterSpacing="1"
              fontFamily="'Cormorant Garamond', Georgia, serif"
            >
              {productTitle2}
            </text>
          )}
          {productTitle3 && (
            <text
              x="68"
              y="144"
              textAnchor="middle"
              fill="#121614"
              fontSize="11"
              fontWeight="800"
              letterSpacing="0.6"
              fontFamily="'Cormorant Garamond', Georgia, serif"
            >
              {productTitle3}
            </text>
          )}

          {/* "Pure · Natural · Authentic" */}
          <text
            x="68"
            y={productTitle3 ? '156' : '144'}
            textAnchor="middle"
            fill="#6E685F"
            fontSize="7"
            fontStyle="italic"
            fontWeight="600"
            fontFamily="'Plus Jakarta Sans', sans-serif"
          >
            Pure · Natural · Authentic
          </text>

          {/* Bottom Agricultural Etching & Botanical Flourishes */}
          <g transform="translate(8, 154)" opacity="0.85">
            {/* Farm furrows in accent color */}
            <path
              d="M 4 22 Q 35 12, 60 22 Q 85 12, 116 22"
              stroke={accentFoliageColor}
              strokeWidth="0.9"
              fill="none"
            />
            <path
              d="M 0 26 Q 30 18, 60 26 Q 90 18, 120 26"
              stroke={accentFoliageColor}
              strokeWidth="0.8"
              fill="none"
            />
            {/* Left side foliage */}
            <path
              d="M 8 16 Q 14 6, 22 14 Q 14 18, 8 16 Z"
              fill={accentFoliageColor}
              opacity="0.8"
            />
            {/* Right side foliage */}
            <path
              d="M 112 16 Q 106 6, 98 14 Q 106 18, 112 16 Z"
              fill={accentFoliageColor}
              opacity="0.8"
            />
          </g>
        </g>

        {/* 4. BLACK SCREW-ON RIBBED CAP */}
        {/* Cap Base */}
        <rect
          x="138"
          y="32"
          width="124"
          height="28"
          rx="3"
          fill="url(#lidGrad)"
          stroke="#101211"
          strokeWidth="1.2"
        />
        {/* Cap Top Rim */}
        <rect
          x="142"
          y="28"
          width="116"
          height="8"
          rx="2"
          fill="#2D302E"
        />
        {/* Ribbed Grooves on the cap */}
        {[...Array(19)].map((_, i) => (
          <line
            key={i}
            x1={144 + i * 6}
            y1="34"
            x2={144 + i * 6}
            y2="58"
            stroke="#111312"
            strokeWidth="1.8"
          />
        ))}
        {/* Cap Highlights */}
        <line x1="140" y1="33" x2="260" y2="33" stroke="#606662" strokeWidth="1" />
        <line x1="140" y1="59" x2="260" y2="59" stroke="#111312" strokeWidth="1.2" />

        {/* 5. VERTICAL "100% Authentic" COLOR RIBBON (Hangs from Cap) */}
        <g transform="translate(187, 34)">
          {/* Ribbon Body */}
          <rect
            x="0"
            y="0"
            width="26"
            height="58"
            fill={ribbonColor}
            stroke={ribbonDark}
            strokeWidth="0.8"
          />
          {/* Ribbon inverted V bottom cut */}
          <polygon
            points="0,58 13,50 26,58 26,50 0,50"
            fill={ribbonColor}
          />
          {/* Vertical Text: 100% Authentic */}
          <text
            x="-44"
            y="17"
            transform="rotate(-90)"
            textAnchor="middle"
            fill="#FAF8F2"
            fontSize="7"
            fontWeight="800"
            letterSpacing="1"
            fontFamily="'Plus Jakarta Sans', sans-serif"
          >
            100% Authentic
          </text>
        </g>
      </g>

      {/* 6. WOODEN BOWL IN FOREGROUND */}
      <g transform="translate(142, 276)" filter="url(#jarShadow)">
        {/* Outer Carved Wooden Bowl */}
        <ellipse cx="58" cy="46" rx="56" ry="20" fill="url(#woodenBowlGrad)" stroke="#1F0E04" strokeWidth="1.8" />
        {/* Inner Bowl Lip */}
        <ellipse cx="58" cy="43" rx="52" ry="17" fill="#2E1608" />

        {/* Bowl Spice Mound (Custom per product) */}
        {renderBowlContents()}
      </g>

      {/* 7. RAW BOTANICALS & SEEDS ON TABLE IN FOREGROUND */}
      {renderTableBotanicals()}
    </g>
  );

  const renderVisual = () => {
    switch (slug) {
      // =========================================================================
      // PRODUCT 1: PREMIUM SAUNF (FENNEL SEEDS)
      // Green Ribbon, whole green fennel seeds in jar & bowl, fennel herb umbel
      // =========================================================================
      case 'premium-saunf':
      case 'saunf':
      case 'fennel-seeds':
        return renderGlassJar({
          ribbonColor: '#1F6B34',
          ribbonDark: '#144622',
          spiceFillGrad: '#587A4F',
          accentFoliageColor: '#286E3A',
          productTitle1: 'SAUNF',
          productTitle2: '(FENNEL SEEDS)',
          renderBowlContents: () => (
            <g>
              {/* Mound of whole fragrant green fennel seeds */}
              <ellipse cx="58" cy="38" rx="48" ry="15" fill="#4D7044" />
              <path d="M 12 40 Q 58 10, 104 40 Z" fill="#587A4F" />
              {/* Fennel seed texture */}
              {[...Array(38)].map((_, i) => (
                <ellipse
                  key={i}
                  cx={22 + (i % 9) * 8 + (i % 2) * 4}
                  cy={18 + Math.floor(i / 9) * 5 + ((i * 3) % 4)}
                  rx="3.2"
                  ry="1.4"
                  transform={`rotate(${(i * 37) % 60 - 30} ${22 + (i % 9) * 8} ${18 + Math.floor(i / 9) * 5})`}
                  fill={i % 3 === 0 ? '#6E945F' : i % 2 === 0 ? '#4E7345' : '#88AE77'}
                  stroke="#3A5933"
                  strokeWidth="0.4"
                />
              ))}
            </g>
          ),
          renderTableBotanicals: () => (
            <g>
              {/* Flowering Fennel Umbel Sprig on Left */}
              <g transform="translate(42, 285) rotate(-15)">
                <path d="M 60 70 Q 30 40, 10 10" stroke="#3D683A" strokeWidth="2.2" fill="none" />
                <path d="M 35 45 Q 15 35, 0 30" stroke="#3D683A" strokeWidth="1.4" fill="none" />
                <path d="M 45 55 Q 65 35, 75 25" stroke="#3D683A" strokeWidth="1.4" fill="none" />
                {/* Yellow-green fennel florets */}
                {[
                  [10, 10], [5, 6], [14, 4], [0, 30], [-5, 26], [75, 25], [82, 22]
                ].map(([fx, fy], i) => (
                  <circle key={i} cx={fx} cy={fy} r="2.8" fill="#B5C945" stroke="#5E7822" strokeWidth="0.5" />
                ))}
              </g>
              {/* Scattered green fennel seeds on table */}
              {[
                [110, 350, 15], [125, 362, -25], [140, 355, 40], [255, 358, -10], [275, 352, 35], [290, 365, -40], [180, 372, 20]
              ].map(([sx, sy, rot], i) => (
                <ellipse
                  key={i}
                  cx={sx}
                  cy={sy}
                  rx="3.5"
                  ry="1.5"
                  transform={`rotate(${rot} ${sx} ${sy})`}
                  fill="#628954"
                  stroke="#37552E"
                  strokeWidth="0.4"
                />
              ))}
            </g>
          ),
        });

      // =========================================================================
      // PRODUCT 2: PREMIUM JEERA POWDER
      // Bronze/Brown Ribbon, cumin powder in jar & bowl, whole jeera seeds
      // =========================================================================
      case 'jeera-powder':
      case 'cumin-powder':
      case 'cumin':
      case 'cumin-seeds':
        return renderGlassJar({
          ribbonColor: '#7A5229',
          ribbonDark: '#523414',
          spiceFillGrad: '#8A6237',
          accentFoliageColor: '#7A5229',
          productTitle1: 'JEERA',
          productTitle2: 'POWDER',
          renderBowlContents: () => (
            <g>
              {/* High mound of golden-brown stone ground cumin powder */}
              <ellipse cx="58" cy="38" rx="48" ry="15" fill="#755029" />
              <path d="M 12 40 Q 58 8, 104 40 Z" fill="#8C6235" />
              {/* Specular texture and fine spice grain highlights */}
              <path d="M 35 24 Q 58 12, 82 24" stroke="#B88A58" strokeWidth="1.2" opacity="0.6" fill="none" />
              {[...Array(25)].map((_, i) => (
                <circle
                  key={i}
                  cx={28 + (i % 7) * 9 + (i % 2) * 3}
                  cy={18 + Math.floor(i / 7) * 6}
                  r="1.2"
                  fill={i % 2 === 0 ? '#AA7E4D' : '#694520'}
                />
              ))}
            </g>
          ),
          renderTableBotanicals: () => (
            <g>
              {/* Hand-carved wooden spice tool on table */}
              <g transform="translate(75, 345) rotate(-18)">
                <rect x="0" y="0" width="38" height="6" rx="3" fill="#3D200B" stroke="#221105" strokeWidth="0.8" />
                <circle cx="38" cy="3" r="7" fill="#5E3516" stroke="#221105" strokeWidth="0.8" />
              </g>
              {/* Scattered whole cumin seeds on table */}
              {[
                [120, 355, 30], [135, 362, -15], [260, 355, 45], [278, 362, -20], [295, 358, 10], [195, 374, -35]
              ].map(([jx, jy, rot], i) => (
                <ellipse
                  key={i}
                  cx={jx}
                  cy={jy}
                  rx="3.8"
                  ry="1.2"
                  transform={`rotate(${rot} ${jx} ${jy})`}
                  fill="#78552D"
                  stroke="#473016"
                  strokeWidth="0.4"
                />
              ))}
            </g>
          ),
        });

      // =========================================================================
      // PRODUCT 3: PREMIUM LAKADONG TURMERIC POWDER
      // Yellow-Gold Ribbon, vibrant golden-orange powder, fresh rhizome slices
      // =========================================================================
      case 'lakadong-turmeric-powder':
      case 'turmeric-powder':
      case 'turmeric':
      case 'haldi':
        return renderGlassJar({
          ribbonColor: '#E59B16',
          ribbonDark: '#A86C05',
          spiceFillGrad: '#F5A61D',
          accentFoliageColor: '#D9840B',
          productTitle1: 'LAKADONG',
          productTitle2: 'TURMERIC',
          productTitle3: 'POWDER',
          renderBowlContents: () => (
            <g>
              {/* High mound of vibrant golden-orange Lakadong turmeric powder */}
              <ellipse cx="58" cy="38" rx="48" ry="15" fill="#D9800B" />
              <path d="M 12 40 Q 58 6, 104 40 Z" fill="#F8A81B" />
              <path d="M 32 20 Q 58 10, 84 20" stroke="#FFE382" strokeWidth="1.5" opacity="0.75" fill="none" />
              {/* Velvet spice powder texture */}
              {[...Array(24)].map((_, i) => (
                <circle
                  key={i}
                  cx={26 + (i % 8) * 8 + (i % 2) * 4}
                  cy={16 + Math.floor(i / 8) * 6}
                  r="1.2"
                  fill={i % 2 === 0 ? '#FFD45E' : '#B86803'}
                />
              ))}
            </g>
          ),
          renderTableBotanicals: () => (
            <g>
              {/* Fresh Cut Turmeric Root Rhizomes with Bright Orange Rings */}
              {/* Sliced root section 1 */}
              <g transform="translate(100, 342) rotate(15)">
                <ellipse cx="12" cy="12" rx="10" ry="12" fill="#E8820C" stroke="#7A3D02" strokeWidth="1.5" />
                <ellipse cx="12" cy="12" rx="7.5" ry="9.5" fill="#FFAA22" />
                <circle cx="12" cy="12" r="4" fill="#FFC952" />
              </g>
              {/* Sliced root section 2 */}
              <g transform="translate(122, 350) rotate(-10)">
                <ellipse cx="10" cy="10" rx="9" ry="11" fill="#E8820C" stroke="#7A3D02" strokeWidth="1.5" />
                <ellipse cx="10" cy="10" rx="6.5" ry="8.5" fill="#FFAA22" />
                <circle cx="10" cy="10" r="3.5" fill="#FFC952" />
              </g>
              {/* Small wooden pestle / masher */}
              <g transform="translate(255, 345) rotate(22)">
                <rect x="0" y="0" width="34" height="8" rx="4" fill="#4A250B" stroke="#2B1404" strokeWidth="0.9" />
                <circle cx="34" cy="4" r="6" fill="#693712" />
              </g>
              {/* Turmeric powder dust on table */}
              <ellipse cx="140" cy="365" rx="15" ry="4" fill="#F8A81B" opacity="0.4" filter="blur(2px)" />
            </g>
          ),
        });

      // =========================================================================
      // PRODUCT 4: PREMIUM RED CHILLY FLAKES
      // Red Ribbon, crushed chilli flakes with seeds, glossy whole dried chillies
      // =========================================================================
      case 'red-chilly-flakes':
      case 'chilli':
      case 'red-chilli':
      default:
        return renderGlassJar({
          ribbonColor: '#A81C10',
          ribbonDark: '#700F06',
          spiceFillGrad: '#A82215',
          accentFoliageColor: '#9C1A0F',
          productTitle1: 'RED CHILLY',
          productTitle2: 'FLAKES',
          renderBowlContents: () => (
            <g>
              {/* Mound of coarse crushed red chilly flakes */}
              <ellipse cx="58" cy="38" rx="48" ry="15" fill="#85150B" />
              <path d="M 12 40 Q 58 8, 104 40 Z" fill="#AB2215" />
              {/* Rich flakes texture with visible golden seeds */}
              <polygon points="35,26 42,22 39,30" fill="#D63A29" />
              <polygon points="50,18 57,14 55,22" fill="#8E140A" />
              <polygon points="62,26 68,22 66,30" fill="#BF2E1F" />
              <polygon points="76,32 82,28 80,36" fill="#801208" />
              <polygon points="26,34 32,30 30,38" fill="#D63A29" />
              {/* Natural golden seeds */}
              <circle cx="44" cy="22" r="2.2" fill="#ECC97B" stroke="#99701E" strokeWidth="0.5" />
              <circle cx="56" cy="28" r="2.4" fill="#ECC97B" stroke="#99701E" strokeWidth="0.5" />
              <circle cx="34" cy="32" r="2" fill="#ECC97B" stroke="#99701E" strokeWidth="0.5" />
              <circle cx="68" cy="32" r="2.2" fill="#ECC97B" stroke="#99701E" strokeWidth="0.5" />
              <circle cx="52" cy="36" r="2" fill="#ECC97B" stroke="#99701E" strokeWidth="0.5" />
            </g>
          ),
          renderTableBotanicals: () => (
            <g>
              {/* Glossy Sun-Cured Whole Red Chillies in Foreground */}
              {/* Chilli 1 */}
              <g transform="translate(65, 338) rotate(-14)">
                <path d="M 10 18 Q 40 4, 70 24 Q 40 30, 10 18 Z" fill="#AB1F12" stroke="#661007" strokeWidth="1.4" />
                <path d="M 10 18 Q 4 16, 2 12" stroke="#285E2B" strokeWidth="2.4" strokeLinecap="round" fill="none" />
                {/* Specular sheen */}
                <path d="M 22 15 Q 40 8, 58 18" stroke="#FFA399" strokeWidth="1.2" strokeLinecap="round" opacity="0.65" fill="none" />
              </g>
              {/* Chilli 2 */}
              <g transform="translate(250, 335) rotate(16)">
                <path d="M 10 18 Q 40 6, 68 22 Q 40 28, 10 18 Z" fill="#94190D" stroke="#5E0D05" strokeWidth="1.4" />
                <path d="M 10 18 Q 4 16, 2 12" stroke="#285E2B" strokeWidth="2.4" strokeLinecap="round" fill="none" />
              </g>
              {/* Scattered chilli seeds on table */}
              {[
                [110, 362], [125, 355], [260, 362], [275, 356], [195, 370]
              ].map(([csx, csy], i) => (
                <circle key={i} cx={csx} cy={csy} r="2.1" fill="#EDCB80" stroke="#99701E" strokeWidth="0.5" />
              ))}
            </g>
          ),
        });
    }
  };

  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden rounded-xl bg-[#FAF7F0] ${className}`}
      style={{ aspectRatio: '1 / 1' }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[#F7F3EA] to-[#EFE7D8] opacity-90" />
      <div className="absolute inset-2 border border-[#C5A467]/30 rounded-lg pointer-events-none" />
      <svg
        viewBox="0 0 400 400"
        width={w}
        height={h}
        className="relative z-10 w-full h-full object-contain filter drop-shadow-md transition-transform duration-500 hover:scale-[1.03]"
      >
        {renderVisual()}
      </svg>
    </div>
  );
};
