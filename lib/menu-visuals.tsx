import type { ReactNode } from "react";

// ─── Category visuals ────────────────────────────────────────────────────────
// One shared set of monoline SVG paths per category id (including the virtual
// group ids used by the filter: sandwiches, hot-drinks, cold-drinks).
// `CategoryIcon`         → 14px pill icon
// `CategoryIllustration` → large low-opacity card motif (uses the same paths
//                          at bigger size with a thinner stroke for the
//                          hand-drawn / editorial feel).
//
// Both use stroke="currentColor" so colour is controlled by Tailwind utilities
// at the call site (e.g. text-ink/[0.06]).

const PATHS: Record<string, ReactNode> = {
  all: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M8 12h8M12 8v8" />
    </>
  ),
  breakfast: (
    <>
      <ellipse cx="12" cy="15" rx="9" ry="3" />
      <circle cx="9" cy="11" r="2.2" />
      <path d="M14 10c0 1.5 1.2 2.5 2.5 2.5" />
      <path d="M5 13l-1-1M19 13l1-1" />
    </>
  ),
  salad: (
    <>
      <path d="M3 11h18" />
      <path d="M5 11a7 7 0 0 0 14 0" />
      <path d="M9 8c0-1 1-2 2-2" />
      <path d="M13 7c1 0 2 1 2 2" />
      <path d="M11 9v-1" />
    </>
  ),
  pasta: (
    <>
      <path d="M4 13c2-3 14-3 16 0" />
      <ellipse cx="12" cy="15" rx="9" ry="3" />
      <path d="M8 10c0 1 1 1 1 2" />
      <path d="M12 9c0 1 1 1 1 2" />
      <path d="M16 10c0 1 1 1 1 2" />
    </>
  ),
  meat: (
    <>
      <path d="M5 14c0-4 4-8 9-7 4 1 6 4 5 7-1 2-3 3-6 3-5 0-8-1-8-3z" />
      <circle cx="9" cy="13" r="0.8" />
      <path d="M14 11c1 0 2 1 2 2" />
    </>
  ),
  chicken: (
    <>
      <path d="M6 17c-2-3 0-8 5-9 4-1 7 1 7 5 0 3-3 6-7 6-3 0-4-1-5-2z" />
      <path d="M15 7l2-3M17 4l1 2M19 5l-1 1" />
      <circle cx="13" cy="11" r="0.7" />
    </>
  ),
  sandwiches: (
    <>
      <path d="M4 9l8-4 8 4-8 4z" />
      <path d="M4 13l8 4 8-4" />
      <path d="M4 9v4M20 9v4" />
      <path d="M8 11l1 1M13 10l1 1" />
    </>
  ),
  strips: (
    <>
      <rect x="5" y="6" width="3" height="12" rx="1.5" />
      <rect x="10.5" y="6" width="3" height="12" rx="1.5" />
      <rect x="16" y="6" width="3" height="12" rx="1.5" />
    </>
  ),
  rizzo: (
    <>
      <circle cx="12" cy="12" r="8" />
      <path d="M8 10c1-1 3-1 4 0" />
      <path d="M12 14c1 1 3 1 4 0" />
      <circle cx="9" cy="14" r="0.6" />
      <circle cx="15" cy="10" r="0.6" />
    </>
  ),
  pizza: (
    <>
      <path d="M3 7l9 13 9-13z" />
      <path d="M5 8c5 1 9 1 14 0" />
      <circle cx="9" cy="11" r="0.9" />
      <circle cx="15" cy="11" r="0.9" />
      <circle cx="12" cy="15" r="0.9" />
    </>
  ),
  mojito: (
    <>
      <path d="M6 7h12l-2 12H8z" />
      <path d="M9 11l6-2" />
      <path d="M10 14h4" />
      <path d="M13 5v-1M11 4v-1" />
    </>
  ),
  burger: (
    <>
      <path d="M4 11c0-3 4-5 8-5s8 2 8 5" />
      <path d="M4 11h16" />
      <path d="M4 14h16" />
      <path d="M4 17c1 1 3 1 4 0s3 1 4 0 3 1 4 0 3 1 4 0" />
      <circle cx="9" cy="9" r="0.4" />
      <circle cx="14" cy="8.5" r="0.4" />
    </>
  ),
  fries: (
    <>
      <path d="M7 9l1 11h8l1-11z" />
      <path d="M9 4v6M12 3v7M15 5v5" />
      <path d="M7 12h10" />
    </>
  ),
  espresso: (
    <>
      <path d="M5 8h12v6a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4z" />
      <path d="M17 10h2a2 2 0 0 1 0 4h-2" />
      <path d="M9 5c0-1 1-1 1-2" />
      <path d="M12 5c0-1 1-1 1-2" />
      <path d="M15 5c0-1 1-1 1-2" />
    </>
  ),
  coffee: (
    <>
      <path d="M5 8h12v6a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4z" />
      <path d="M17 10h2a2 2 0 0 1 0 4h-2" />
      <path d="M9 5c0-1 1-1 1-2" />
    </>
  ),
  drinks: (
    <>
      <path d="M7 8h10l-1 12H8z" />
      <path d="M14 8l3-4" />
      <path d="M16.5 3.5h1" />
      <path d="M9 12h6" />
    </>
  ),
  desserts: (
    <>
      <path d="M5 18l3-10h8l3 10z" />
      <path d="M5 14h14" />
      <circle cx="12" cy="6" r="1" />
      <path d="M12 7v1" />
    </>
  ),
  "cold-drinks": (
    <>
      <path d="M7 7h10l-1 13H8z" />
      <path d="M8 10h8" />
      <path d="M10 14h4" />
      <path d="M10 7l-1-2M14 7l1-2" />
    </>
  ),
  smoothies: (
    <>
      <path d="M7 9c0-2 2-4 5-4s5 2 5 4" />
      <path d="M7 9h10l-1 11H8z" />
      <path d="M11 4v-1M9 11h6" />
    </>
  ),
  "milk-shake": (
    <>
      <path d="M7 8h10l-1 11H8z" />
      <path d="M7 8c0-2 2-3 5-3s5 1 5 3" />
      <path d="M12 5v-2" />
      <path d="M10 4l2-2 2 2" />
    </>
  ),
  "ice-cream": (
    <>
      <path d="M8 10a4 4 0 0 1 8 0" />
      <path d="M8 10h8l-4 10z" />
      <path d="M9 13c1 0 1.5-1 2-1M13 13c1 0 1.5-1 2-1" />
    </>
  ),
  "hot-drinks": (
    <>
      <path d="M5 10h12v5a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4z" />
      <path d="M17 12h2a2 2 0 0 1 0 4h-2" />
      <path d="M9 7c0-1 1-1 1-2" />
      <path d="M12 7c0-1 1-1 1-2" />
      <path d="M15 7c0-1 1-1 1-2" />
    </>
  ),
  pastries: (
    <>
      <path d="M4 12l8-5 8 5-8 5z" />
      <path d="M4 12v3l8 5 8-5v-3" />
      <path d="M9 10l1 2M14 10l-1 2" />
    </>
  ),
  cake: (
    <>
      <path d="M5 12h14v6H5z" />
      <path d="M5 12c0-2 3-3 7-3s7 1 7 3" />
      <path d="M5 15c2 1 4 1 7 0s5 1 7 0" />
      <path d="M12 6v3" />
      <path d="M10 6l2-2 2 2" />
    </>
  ),
  "made-in-the-mind": (
    <>
      <rect x="5" y="5" width="14" height="14" rx="2" transform="rotate(8 12 12)" />
      <circle cx="9" cy="9" r="0.8" />
      <circle cx="15" cy="9" r="0.8" />
      <circle cx="12" cy="12" r="0.8" />
      <circle cx="9" cy="15" r="0.8" />
      <circle cx="15" cy="15" r="0.8" />
    </>
  ),
};

interface VisualProps {
  id: string;
  className?: string;
}

export function CategoryIcon({ id, className }: VisualProps) {
  const content = PATHS[id];
  if (!content) return null;
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={className}
    >
      {content}
    </svg>
  );
}

export function CategoryIllustration({ id, className }: VisualProps) {
  const content = PATHS[id];
  if (!content) return null;
  return (
    <svg
      width="150"
      height="150"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={0.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={className}
    >
      {content}
    </svg>
  );
}
