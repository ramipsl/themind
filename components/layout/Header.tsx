"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "@/components/ui/Logo";
import { useLanguage, type TranslationKey } from "@/lib/i18n";

// Nav links — labels resolved via i18n at render time. Keep this list in sync
// with ANCHORS / active-state logic below if you add or remove items.
const NAV_ITEMS: { labelKey: TranslationKey; href: string }[] = [
  { labelKey: "nav.home",      href: "/"           },
  { labelKey: "nav.games",     href: "/#games"     },
  { labelKey: "nav.community", href: "/#community" },
  { labelKey: "nav.seeMore",   href: "/#gallery"   },
];

// Section ids on the homepage that the navbar tracks for active state.
const ANCHORS = NAV_ITEMS
  .filter((l) => l.href.startsWith("/#"))
  .map((l) => l.href.replace("/#", ""));

// Sentinel for "top of homepage, before any tracked section is in view".
// When this is the activeId, the Home link lights up.
const HOME_TOP = "__home_top__";

export default function Header() {
  const pathname = usePathname();
  const isHome   = pathname === "/";

  const { t, lang, toggleLang } = useLanguage();

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMenuOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // IntersectionObserver — only on homepage
  useEffect(() => {
    if (!isHome) { setActiveId(null); return; }

    setActiveId(HOME_TOP);

    const observers: IntersectionObserver[] = [];
    const visible = new Map<string, number>();

    const pick = () => {
      if (visible.size === 0) { setActiveId(HOME_TOP); return; }
      let best = null as string | null;
      let bestRatio = 0;
      visible.forEach((ratio, id) => {
        if (ratio > bestRatio) { bestRatio = ratio; best = id; }
      });
      setActiveId(best);
    };

    ANCHORS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            visible.set(id, entry.intersectionRatio);
          } else {
            visible.delete(id);
          }
          pick();
        },
        { threshold: [0, 0.1, 0.25, 0.5] }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [isHome]);

  // Toggle button label = the *target* language
  const toggleLabel    = lang === "en" ? "AR" : "EN";
  const toggleAriaKey: TranslationKey =
    lang === "en" ? "nav.switchToArabic" : "nav.switchToEnglish";

  return (
    <>
      {/* ── iOS safe-area gap fill ──────────────────────────────────────────
          Covers the notch / Dynamic Island on iPhones.
          Always solid cream — never transparent — so the hero image cannot
          bleed into the status-bar area at any scroll position.
          On non-notch devices env() resolves to 0 → zero height, invisible.
          z-[60] sits above the header (z-50) so nothing punches through.
      ─────────────────────────────────────────────────────────────────────── */}
      <div
        aria-hidden
        className="fixed inset-x-0 top-0 z-[60] pointer-events-none"
        style={{
          backgroundColor: "#F5F2EC",
          height: "env(safe-area-inset-top, 0px)",
        }}
      />

      {/* ── Sticky header bar ──
          top is driven by env() so on notch/Dynamic Island iPhones the header
          sits below the status-bar area rather than behind it.
          On all other devices env() = 0 → same as top-0, no change. */}
      <motion.header
        initial={{ y: -72 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        style={{ top: "env(safe-area-inset-top, 0px)" }}
        className={[
          "fixed inset-x-0 z-50 bg-bg-base transition-all duration-300",
          scrolled
            ? "shadow-[0_1px_8px_rgba(26,23,20,0.05)]"
            : "",
        ].join(" ")}
      >
        <nav className="max-w-site mx-auto px-6 h-16 flex items-center justify-between relative">
          {/* Logo */}
          <Logo size="md" />

          {/* Desktop nav links — absolutely centered in the bar.
              dir="rtl" in Arabic reverses the flex main axis so the first DOM
              item (Home/الرئيسية) sits rightmost and the last (See More/المزيد)
              sits leftmost — matching natural Arabic reading order.
              The logo (left) and right-side controls are outside this ul and
              are unaffected by this dir change. */}
          <ul
            dir={lang === "ar" ? "rtl" : undefined}
            className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2"
          >
            {NAV_ITEMS.map((link, i) => {
              const sectionId = link.href.startsWith("/#")
                ? link.href.replace("/#", "")
                : null;
              const isActive = isHome && (
                (i === 0 && activeId === HOME_TOP) ||
                (sectionId !== null && activeId === sectionId)
              );
              return (
                <li key={link.labelKey}>
                  <a
                    href={link.href}
                    onClick={
                      link.href === "/" && isHome
                        ? (e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }
                        : undefined
                    }
                    className={[
                      `relative group font-body text-sm transition-colors duration-300 ${lang === "ar" ? "" : "tracking-wide"} pb-1 inline-block`,
                      isActive ? "text-ink" : "text-ink-muted hover:text-ink",
                    ].join(" ")}
                  >
                    {t(link.labelKey)}
                    {/* Hand-drawn wobbly underline */}
                    <svg
                      viewBox="0 0 100 5"
                      preserveAspectRatio="none"
                      aria-hidden
                      className={[
                        "absolute -bottom-0.5 left-0 w-full h-[3px] transition-opacity duration-300",
                        isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100",
                      ].join(" ")}
                    >
                      <path
                        d="M0,2.5 Q13,0.5 26,2.5 Q39,4.5 52,2.5 Q65,0.5 78,2.5 Q90,4.5 100,2.5"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        fill="none"
                        strokeLinecap="round"
                      />
                    </svg>
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Right side: Menu CTA + language toggle + hamburger */}
          <div className="flex items-center gap-2.5">
            {/* Menu CTA button — desktop only */}
            <Link
              href="/menu"
              className={[
                `hidden md:inline-flex items-center gap-1.5 font-body font-medium ${lang === "ar" ? "" : "tracking-wide"} cursor-pointer select-none`,
                "text-xs px-4 py-1.5 rounded-[10px_12px_10px_11px]",
                "border-2 border-ink bg-bg-base text-ink",
                "shadow-[2px_2px_0px_#1A1714] hover:shadow-[3px_3px_0px_#1A1714] hover:bg-warm",
                "active:shadow-[1px_1px_0px_#1A1714] active:translate-y-[1px]",
                "transition-all duration-150",
              ].join(" ")}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                strokeLinejoin="round" aria-hidden>
                <rect x="4" y="3" width="16" height="18" rx="2"/>
                <line x1="8"  y1="8"  x2="16" y2="8"/>
                <line x1="8"  y1="12" x2="16" y2="12"/>
                <line x1="8"  y1="16" x2="13" y2="16"/>
              </svg>
              {t("nav.menu")}
            </Link>

            {/* Language toggle — compact outline button matching Menu CTA */}
            <button
              type="button"
              onClick={toggleLang}
              aria-label={t(toggleAriaKey)}
              className={[
                "inline-flex items-center gap-1.5 font-body font-semibold tracking-[0.08em] cursor-pointer select-none",
                "text-[11px] px-3 py-1.5 rounded-[10px_12px_10px_11px]",
                "border-2 border-ink bg-bg-base text-ink",
                "shadow-[2px_2px_0px_#1A1714] hover:shadow-[3px_3px_0px_#1A1714] hover:bg-warm",
                "active:shadow-[1px_1px_0px_#1A1714] active:translate-y-[1px]",
                "transition-all duration-150",
              ].join(" ")}
            >
              {toggleLabel}
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                strokeLinejoin="round" aria-hidden>
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                <line x1="2" y1="12" x2="22" y2="12"/>
              </svg>
            </button>

            {/* Hamburger — mobile only */}
            <button
              onClick={() => setMenuOpen((o) => !o)}
              aria-label={menuOpen ? t("nav.closeMenu") : t("nav.openMenu")}
              className="md:hidden flex flex-col justify-center gap-[5px] p-2 -mr-1"
            >
              <motion.span
                animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.22 }}
                className="block w-5 h-0.5 bg-ink rounded-full origin-center"
              />
              <motion.span
                animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.18 }}
                className="block w-5 h-0.5 bg-ink rounded-full"
              />
              <motion.span
                animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.22 }}
                className="block w-5 h-0.5 bg-ink rounded-full origin-center"
              />
            </button>
          </div>
        </nav>
      </motion.header>

      {/* ── Global navbar fade ─────────────────────────────────────────────
          Fixed gradient strip that sits just below the header on every page.
          Fades from solid bg-base to transparent so content never hard-cuts
          into the navbar edge regardless of what section is scrolled into view.
          z-39 keeps it above regular content but below the sticky menu nav
          (z-40) and the header itself (z-50).
          pointer-events-none ensures it never blocks clicks.
      ──────────────────────────────────────────────────────────────────── */}
      <div
        aria-hidden
        className="fixed inset-x-0 pointer-events-none z-[39] transition-opacity duration-300"
        style={{
          top: "calc(4rem + env(safe-area-inset-top, 0px))",
          height: "48px",
          background: "linear-gradient(to bottom, #F5F2EC 0%, rgba(245,242,236,0.72) 40%, transparent 100%)",
          opacity: scrolled ? 1 : 0,
        }}
      />

      {/* ── Mobile slide-down menu ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            style={{ top: "calc(4rem + env(safe-area-inset-top, 0px))" }}
            className="fixed inset-x-0 z-[45] bg-bg-base border-b border-ink-faint px-6 py-6 md:hidden"
          >
            <ul className="flex flex-col gap-5 mb-6">
              {NAV_ITEMS.map((link) => (
                <li key={link.labelKey}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      if (link.href === "/" && isHome) {
                        e.preventDefault();
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }
                      setMenuOpen(false);
                    }}
                    className="font-body text-lg font-medium text-ink hover:text-ink-muted transition-colors"
                  >
                    {t(link.labelKey)}
                  </a>
                </li>
              ))}
            </ul>

            {/* Menu CTA — mobile only, inside the dropdown */}
            <div className="border-t border-ink-faint pt-5">
              <Link
                href="/menu"
                onClick={() => setMenuOpen(false)}
                className={[
                  `inline-flex items-center gap-1.5 font-body font-medium ${lang === "ar" ? "" : "tracking-wide"} cursor-pointer select-none`,
                  "text-sm px-5 py-2.5 rounded-[10px_12px_10px_11px]",
                  "border-2 border-ink bg-bg-base text-ink",
                  "shadow-[2px_2px_0px_#1A1714] hover:shadow-[3px_3px_0px_#1A1714] hover:bg-warm",
                  "active:shadow-[1px_1px_0px_#1A1714] active:translate-y-[1px]",
                  "transition-all duration-150",
                ].join(" ")}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                  strokeLinejoin="round" aria-hidden>
                  <rect x="4" y="3" width="16" height="18" rx="2"/>
                  <line x1="8"  y1="8"  x2="16" y2="8"/>
                  <line x1="8"  y1="12" x2="16" y2="12"/>
                  <line x1="8"  y1="16" x2="13" y2="16"/>
                </svg>
                {t("nav.menu")}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
