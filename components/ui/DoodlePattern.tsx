// ─── DoodlePattern ───────────────────────────────────────────────────────────
// Reusable SVG <pattern> wallpaper for section backgrounds.
//
// The pattern tile is 200×200 with 10 café-themed monoline doodles spread
// across four quadrants. Changing `scale` resizes the tile proportionally
// via patternTransform — larger scale = sparser pattern, fewer tiles/area.
//
// Usage:
//   <DoodlePattern id="hero-bg"     opacity={0.072} scale={1.00} />  ← hero (densest)
//   <DoodlePattern id="exp-bg"      opacity={0.048} scale={1.30} />  ← sections
//   <DoodlePattern id="gallery-bg"  opacity={0.036} scale={1.50} />  ← lightest
//
// id must be unique per page to avoid SVG pattern ID collisions.
// Explicit hex strokes avoid currentColor inheritance issues in SVG patterns.

const INK = "#1A1714";
const SW  = 1.15;

interface DoodlePatternProps {
  id:        string;
  opacity?:  number;
  scale?:    number;
  className?: string;
}

export default function DoodlePattern({
  id,
  opacity  = 0.07,
  scale    = 1,
  className,
}: DoodlePatternProps) {
  const transform = scale !== 1 ? `scale(${scale})` : undefined;

  return (
    <div
      className={`absolute inset-0 pointer-events-none select-none z-0 ${className ?? ""}`}
      aria-hidden
      style={{ opacity }}
    >
      <svg
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <pattern
            id={id}
            x="0"
            y="0"
            width="200"
            height="200"
            patternUnits="userSpaceOnUse"
            patternTransform={transform}
          >

            {/* ── Dice (top-left, 14–46 × 14–46) ── */}
            <rect x="14" y="14" width="32" height="32" rx="5"
              stroke={INK} strokeWidth={SW} fill="none"/>
            <circle cx="22" cy="22" r="2.4" fill={INK}/>
            <circle cx="30" cy="30" r="2.4" fill={INK}/>
            <circle cx="38" cy="38" r="2.4" fill={INK}/>

            {/* ── 4-point sparkle (top-center, ~99–119 × 16–35) ── */}
            <path
              d="M109,16 L111.5,23 L119,25.5 L111.5,28 L109,35 L106.5,28 L99,25.5 L106.5,23 Z"
              stroke={INK} strokeWidth={SW} strokeLinejoin="round" fill="none"
            />

            {/* ── Coffee steam wisps (top-right, ~152–170 × 8–30) ── */}
            <path d="M154,30 Q156,20 154,11" stroke={INK} strokeWidth={1.05} strokeLinecap="round" fill="none"/>
            <path d="M161,30 Q163,18 161,8"  stroke={INK} strokeWidth={1.05} strokeLinecap="round" fill="none"/>
            <path d="M168,30 Q170,20 168,11" stroke={INK} strokeWidth={1.05} strokeLinecap="round" fill="none"/>

            {/* ── Curved hand arrow (left-center, 13–44 × 87–108) ── */}
            <path d="M13,94 Q26,87 44,100"
              stroke={INK} strokeWidth={SW} strokeLinecap="round" fill="none"/>
            <path d="M37,92 L44,100 L37,108"
              stroke={INK} strokeWidth={SW} strokeLinecap="round" strokeLinejoin="round" fill="none"/>

            {/* ── Speech bubble (center, 89–158 × 71–112) ── */}
            <path
              d="M89,71 Q89,68 92,68 L155,68 Q158,68 158,71 L158,92 Q158,96 155,96 L108,96 L100,108 L103,96 L92,96 Q89,96 89,92 Z"
              stroke={INK} strokeWidth={SW} strokeLinejoin="round" fill="none"
            />

            {/* ── Dot cluster (right-center, 177–188 × 74–96) ── */}
            <circle cx="179" cy="77" r="2.2" fill={INK}/>
            <circle cx="187" cy="77" r="2.2" fill={INK}/>
            <circle cx="179" cy="85" r="2.2" fill={INK}/>
            <circle cx="187" cy="85" r="2.2" fill={INK}/>
            <circle cx="183" cy="93" r="2.2" fill={INK}/>

            {/* ── Chess pawn (bottom-left, centered ~28 × 130–165) ── */}
            <circle cx="28" cy="130" r="8"  stroke={INK} strokeWidth={SW} fill="none"/>
            <path d="M22,138 L34,138 L37,151 L19,151 Z"
              stroke={INK} strokeWidth={SW} strokeLinejoin="round" fill="none"/>
            <path d="M14,155 L42,155" stroke={INK} strokeWidth={1.5} strokeLinecap="round"/>
            <path d="M17,159 L39,159" stroke={INK} strokeWidth={1.0} strokeLinecap="round"/>

            {/* ── Wobbly circle (bottom mid-left, ~55–77 × 152–174) ── */}
            <path
              d="M65,152 Q74,149 76,158 Q78,167 70,170 Q62,173 58,165 Q54,157 63,153 Q64,152 65,152"
              stroke={INK} strokeWidth={1.05} strokeLinecap="round" fill="none"
            />

            {/* ── Playing card (bottom-center, 88–112 × 133–165) ── */}
            <rect x="88" y="133" width="24" height="32" rx="4"
              stroke={INK} strokeWidth={SW} fill="none"/>
            <path d="M100,142 L104,149 L100,156 L96,149 Z"
              stroke={INK} strokeWidth={1.0} strokeLinejoin="round" fill="none"/>

            {/* ── Puzzle piece (bottom-right, ~142–182 × 136–176) ── */}
            <path
              d="M142,136 L155,136 Q154,131 159,131 Q164,131 163,136 L176,136 L176,149 Q181,148 181,153 Q181,158 176,157 L176,170 L142,170 Z"
              stroke={INK} strokeWidth={SW} strokeLinejoin="round" fill="none"
            />

          </pattern>
        </defs>

        <rect width="100%" height="100%" fill={`url(#${id})`}/>
      </svg>
    </div>
  );
}
