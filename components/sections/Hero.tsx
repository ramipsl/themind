"use client";

import { motion, type Variants } from "framer-motion";
import Button from "@/components/ui/Button";
import FloatingDoodle from "@/components/ui/FloatingDoodle";
import { useLanguage, dict } from "@/lib/i18n";

// Reusable staggered fade-up for hero content.
// Tuple-typed bezier is required by framer-motion's Easing type.
const fadeUp: Variants = {
  hidden:   { opacity: 0, y: 28 },
  visible:  (delay: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.72, delay, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export default function Hero({ id }: { id?: string } = {}) {
  const { t, lang } = useLanguage();
  return (
    <section
      id={id}
      style={{
        paddingTop: "calc(5rem + env(safe-area-inset-top, 0px))",
        backgroundImage: "url('/The Mind Interior.jpeg')",
      }}
      className="relative min-h-screen flex flex-col items-center justify-center px-6 pb-14 overflow-hidden bg-cover bg-no-repeat bg-top md:bg-center"
    >
      {/* Cream tint — keeps dark ink colours readable over the photo */}
      <div className="absolute inset-0 bg-[#F5F2EC]/[0.70]" />
      {/* Vignette — softens edges, pulls focus to centre content */}
      <div className="absolute inset-0"
        style={{ background: "radial-gradient(ellipse 80% 70% at 50% 40%, transparent 0%, rgba(245,242,236,0.35) 100%)" }}
      />
      {/* Mobile top fade — holds solid cream past the 64px navbar, then fades.
          md:hidden keeps it off desktop where the taller fade below takes over. */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 pointer-events-none md:hidden"
        style={{
          height: "110px",
          background: "linear-gradient(to bottom, #F5F2EC 0%, #F5F2EC 62%, rgba(245,242,236,0.45) 82%, transparent 100%)",
        }}
      />
      {/* Desktop top fade — longer and more gradual on wider screens.
          Holds solid cream through the navbar zone, then fades smoothly.
          hidden on mobile so the two fades never stack. */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 pointer-events-none hidden md:block"
        style={{
          height: "220px",
          background: "linear-gradient(to bottom, #F5F2EC 0%, #F5F2EC 38%, rgba(245,242,236,0.5) 62%, transparent 100%)",
        }}
      />

      {/* ── Floating accent doodles — animated, ride on top of the pattern ──
          Kept to 4 so they add life without competing with the pattern.
      ─────────────────────────────────────────────────────────────────── */}
      <FloatingDoodle type="sparkle" size={22} delay={0}   duration={4.8} opacity={0.24}
        className="absolute top-28 left-5 md:left-14" />
      <FloatingDoodle type="circle"  size={40} delay={1.1} duration={5.8} opacity={0.14}
        className="absolute bottom-36 right-4 md:right-12" />
      <FloatingDoodle type="star"    size={18} delay={0.6} duration={4.2} opacity={0.20}
        className="absolute top-1/2 left-3 md:left-8" />
      <FloatingDoodle type="cross"   size={14} delay={1.8} duration={5.0} opacity={0.18}
        className="absolute top-1/3 right-4 md:right-32" />

      {/* ── Central content ── */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto w-full">

        {/* Logo mark — no animation wrapper, no background, no transform.
            Plain img renders the transparent PNG directly. */}
        <img
          src="/logo-dark-transparent.png"
          alt="The Mind Café logo"
          width={160}
          height={139}
          loading="eager"
          decoding="async"
          className="mb-7 hero-logo"
          style={{ display: "block" }}
        />

        {/* Eyebrow label — always English regardless of language mode */}
        <motion.p
          lang="en"
          dir="ltr"
          custom={0.1}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="font-body text-[10px] tracking-[0.34em] uppercase text-ink-muted mb-4"
        >
          {t("hero.eyebrow")}
        </motion.p>

        {/* Main headline — always English regardless of language mode */}
        <motion.h1
          lang="en"
          dir="ltr"
          custom={0.22}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="font-display font-bold text-ink leading-[1.04] mb-5"
          style={{ fontSize: "clamp(2.8rem, 8.5vw, 6.2rem)" }}
        >
          {t("hero.title")}
        </motion.h1>

        {/* Sub-headline — grid stack keeps height stable across language switches.
            Both language versions live in the same grid cell (gridArea "1/1") so
            the container is always max(EN height, AR height); toggling visibility
            never causes reflow, which is what was shifting the logo. */}
        <div className="grid mb-6 md:mb-9">
          <motion.p
            custom={0.38}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="font-body text-base md:text-lg text-ink-muted leading-relaxed max-w-[460px]"
            style={{ gridArea: "1/1", visibility: lang === "ar" ? "hidden" : "visible" }}
            aria-hidden={lang === "ar" ? true : undefined}
          >
            {dict.en["hero.body"]}
          </motion.p>
          <p
            dir="rtl"
            className="font-body text-base md:text-lg text-ink-muted leading-relaxed max-w-[460px]"
            style={{ gridArea: "1/1", visibility: lang === "en" ? "hidden" : "visible" }}
            aria-hidden={lang === "en" ? true : undefined}
          >
            {dict.ar["hero.body"]}
          </p>
        </div>

        {/* CTA row */}
        <motion.div
          custom={0.54}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="flex items-center w-full justify-center"
        >
          <Button href="/menu" variant="outline" size="xl">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"
              strokeLinejoin="round" aria-hidden>
              <rect x="4" y="3" width="16" height="18" rx="2"/>
              <line x1="8"  y1="8"  x2="16" y2="8"/>
              <line x1="8"  y1="12" x2="16" y2="12"/>
              <line x1="8"  y1="16" x2="13" y2="16"/>
            </svg>
            {t("hero.viewMenu")}
          </Button>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.8 }}
          className="mt-8 md:mt-12 flex flex-col items-center gap-2"
        >
          <motion.svg
            width="20" height="30" viewBox="0 0 20 30" fill="none"
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <rect x="1" y="1" width="18" height="24" rx="9"
              stroke="#6B6560" strokeWidth="1.4"/>
            <motion.circle
              cx="10" cy="8" r="2.5" fill="#6B6560"
              animate={{ cy: [8, 14, 8], opacity: [0.9, 0.3, 0.9] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.svg>
          <span lang="en" dir="ltr" className="font-body text-[9px] text-ink-muted tracking-[0.28em] uppercase">{t("hero.scroll")}</span>
        </motion.div>
      </div>
    </section>
  );
}
