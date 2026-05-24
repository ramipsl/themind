import type { Config } from "tailwindcss";

// ─── Design tokens — single source of truth ─────────────────────────────────
// Edit here to retheme the entire site

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // ── Colors ───────────────────────────────────────────────────────────
      colors: {
        "bg-base": "#F5F2EC",   // warm off-white — main page background
        "bg-card": "#FAFAF7",   // slightly lighter — card & section backgrounds
        ink: {
          DEFAULT: "#1A1714",   // near-black — headlines, icons
          muted: "#6B6560",     // secondary text, captions
          faint: "#C9C5BF",     // borders, dividers, placeholder lines
        },
        warm:   "#E8DFD0",        // cream — hover states, game card backgrounds
        accent: "#2E5C45",        // deep green — price pills, small labels (from real menu palette)
      },

      // ── Font families — driven by CSS vars set in app/layout.tsx ─────────
      // To swap fonts: update the localFont() calls in layout.tsx
      fontFamily: {
        // --font-arabic (Cairo) sits between the custom Latin font and system-ui.
        // For Latin chars the browser uses the custom font; for Arabic chars it
        // falls through to Cairo, which has full Arabic coverage.
        display: ["var(--font-primary)", "var(--font-arabic)", "system-ui", "sans-serif"],
        body:    ["var(--font-auxiliary)", "var(--font-arabic)", "system-ui", "sans-serif"],
      },

      // ── Animations ───────────────────────────────────────────────────────
      animation: {
        float:       "float 4s ease-in-out infinite",
        "float-slow": "float 6s ease-in-out infinite",
        "float-fast": "float 2.8s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%":      { transform: "translateY(-8px)" },
        },
      },

      // ── Spacing ──────────────────────────────────────────────────────────
      maxWidth: {
        site: "72rem", // 1152px — max content width
      },
    },
  },
  plugins: [],
};

export default config;
