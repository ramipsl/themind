import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Cairo } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/lib/i18n";

// ─── Local Fonts ─────────────────────────────────────────────────────────────
// To swap fonts later:
//   1. Drop your new .otf/.woff2 files into /public/fonts/
//   2. Update the src paths below — everything else updates automatically.

const fontPrimary = localFont({
  src: "../public/fonts/arlon-semibold.ttf",
  variable: "--font-primary",  // → font-display in Tailwind
  display: "swap",
});

const fontAuxiliary = localFont({
  src: "../public/fonts/auxiliary.otf",
  variable: "--font-auxiliary", // → font-body in Tailwind
  display: "swap",
});

// ─── Arabic companion font ────────────────────────────────────────────────────
// arlon and auxiliary are Latin-only. Cairo covers Arabic Unicode and is
// inserted into both font stacks so Arabic characters use it instead of
// the OS system font. Latin characters continue to use the custom fonts.
const fontArabic = Cairo({
  subsets: ["arabic"],
  weight: ["400", "600", "700"],
  variable: "--font-arabic",
  display: "swap",
});

// ─── Viewport ────────────────────────────────────────────────────────────────
// viewport-fit=cover lets env(safe-area-inset-*) return real values on notched
// iPhones / Dynamic Island devices so the header can fill the gap above it.
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

// ─── Metadata ────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: "The Mind — Café and Board Games | Baghdad",
  description:
    "Baghdad's favourite board game café. Specialty coffee, 500+ games, and late-night conversations. Reserve a table today.",
  openGraph: {
    title: "The Mind — Café and Board Games",
    description: "Where Baghdad comes to play.",
    // TODO: Add a real 1200×630 OG image at /public/og.jpg then uncomment:
    // images: [{ url: "/og.jpg", width: 1200, height: 630 }],
  },
};

// ─── Root Layout ─────────────────────────────────────────────────────────────
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    // Initial render is English/LTR. The LanguageProvider updates
    // documentElement.lang and dir at runtime from localStorage.
    <html lang="en" dir="ltr">
      <head>
        {/* Preload hero logo so it is available before first paint,
            preventing a blank/flash frame in the hero section. */}
        <link rel="preload" as="image" href="/logo-dark-transparent.png" />
        {/* Preload hero background globally so the image is always cached,
            regardless of which route is currently active. This prevents the
            appear→disappear→appear flicker that occurs when Next.js Image's
            internal onLoad state resets during SPA navigation or re-renders. */}
        <link rel="preload" as="image" href="/The Mind Interior.jpeg" />
      </head>
      <body className={`${fontPrimary.variable} ${fontAuxiliary.variable} ${fontArabic.variable}`}>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
