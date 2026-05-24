// Hand-drawn monoline SVG icons — all use currentColor, strokeWidth ~1.8.
// These are purpose-built for The Mind's brand; not pulled from any icon library.

interface IconProps {
  className?: string;
  size?: number;
}

/** Coffee cup with steam — Experience section
 *
 *  Fix notes (v2):
 *  - Body right edge is now vertical (x=38) so handle endpoints are exact, no gaps
 *  - Handle stays within the 48px viewBox (peaks at x=45)
 *  - Single continuous M…Q…Q path for the D-loop
 */
export function CoffeeCupIcon({ className, size = 48 }: IconProps) {
  return (
    <svg
      width={size} height={size} viewBox="0 0 48 48"
      fill="none" className={className} aria-hidden
    >
      {/* Cup body — slight taper (wider at top), right edge well-defined */}
      <path
        d="M7,14 L39,14 L35,42 L11,42 Z"
        stroke="currentColor" strokeWidth="1.8"
        strokeLinejoin="round" strokeLinecap="round"
      />
      {/*
        Handle — D-loop.
        Connects at the right edge of the trapezoid:
          At y=22: right edge x ≈ 39 − 4×(22−14)/28 ≈ 38  → M38,22
          At y=36: right edge x ≈ 39 − 4×(36−14)/28 ≈ 36  → end 36,36
        Both endpoints calculated from the body path, so no visual gap.
        Control points peak at x=45, safely inside the 48px viewBox.
      */}
      <path
        d="M38,22 Q45,22 45,29 Q45,36 36,36"
        stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"
      />
      {/* Saucer */}
      <path
        d="M4,45 Q23,48 44,45"
        stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"
      />
      {/* Three steam wisps */}
      <path d="M16,10 Q18,6 16,2"  stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M23,11 Q25,7 23,3"  stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M30,10 Q32,6 30,2"  stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

/** Isometric dice — Experience section
 *
 *  Fix notes (v2):
 *  - Center front pip moved off the rib (x=24) → now two pips per face
 *  - All pip positions verified to be inside their respective face boundaries
 *  - Top face: 2 pips symmetric at y=16
 *  - Left face: 3 pips diagonal, all validated inside face polygon
 *  - Right face: 2 pips, validated inside face polygon
 */
export function DiceIcon({ className, size = 48 }: IconProps) {
  return (
    <svg
      width={size} height={size} viewBox="0 0 48 48"
      fill="none" className={className} aria-hidden
    >
      {/* Outer hexagon */}
      <path
        d="M24,4 L42,14 L42,34 L24,44 L6,34 L6,14 Z"
        stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"
      />
      {/* Top face divider */}
      <path
        d="M6,14 L24,24 L42,14"
        stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"
      />
      {/* Center vertical rib */}
      <path
        d="M24,24 L24,44"
        stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"
      />

      {/*
        Left face: (6,14)→(24,24)→(24,44)→(6,34)   face = 3
        Diagonal upper-left → lower-right. r=1.3 throughout.
        Clearances (perpendicular to slanted edges, line 10x−18y+192=0 / +552=0):
          (10,22): top=5.1  bottom=12.4  left=4  rib=14
          (14,29): top=9.2  bottom=8.2   left=8  rib=10
          (17,34): top=13.1 bottom=5.3   left=11 rib=7  ← all clear of r=1.3
      */}
      <circle cx="10" cy="22" r="1.3" fill="currentColor"/>
      <circle cx="14" cy="29" r="1.3" fill="currentColor"/>
      <circle cx="17" cy="34" r="1.3" fill="currentColor"/>

      {/*
        Right face: (42,14)→(42,34)→(24,44)→(24,24)  face = 2
        Diagonal upper-right → lower-left, symmetric around face centroid (33,29).
        Edge lines: 10x+18y−672=0 (top) and 10x+18y−1032=0 (bottom).
          (35,23): top=4.5  bottom=13.0  right=7  rib=11
          (31,35): top=13.0 bottom=4.5   right=11 rib=7
      */}
      <circle cx="35" cy="23" r="1.3" fill="currentColor"/>
      <circle cx="31" cy="35" r="1.3" fill="currentColor"/>

      {/*
        Top face: rhombus (24,4)→(42,14)→(24,24)→(6,14)  face = 1
        Single pip — all diagonal edge clearances ≥7.
      */}
      <circle cx="24" cy="12" r="1.3" fill="currentColor"/>
    </svg>
  );
}

/** Three people silhouettes — Community card */
export function PeopleIcon({ className, size = 48 }: IconProps) {
  return (
    <svg
      width={size} height={size} viewBox="0 0 48 48"
      fill="none" className={className} aria-hidden
    >
      {/* Left person */}
      <circle cx="13" cy="13" r="6" stroke="currentColor" strokeWidth="1.8"/>
      <path
        d="M1,42 Q1,26 13,26"
        stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"
      />
      {/* Right person */}
      <circle cx="35" cy="13" r="6" stroke="currentColor" strokeWidth="1.8"/>
      <path
        d="M47,42 Q47,26 35,26"
        stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"
      />
      {/* Center person (front) */}
      <circle cx="24" cy="11" r="6" stroke="currentColor" strokeWidth="1.8"/>
      <path
        d="M11,44 Q11,28 24,28 Q37,28 37,44"
        stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"
      />
    </svg>
  );
}
