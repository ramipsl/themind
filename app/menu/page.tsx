"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import DoodlePattern from "@/components/ui/DoodlePattern";
import DoodleDivider from "@/components/ui/DoodleDivider";
import Button from "@/components/ui/Button";
import TalabatOrderButton from "@/components/ui/TalabatOrderButton";
import PricePill, { ACCENT } from "@/components/ui/PricePill";
import MenuCategoryNav from "@/components/ui/MenuCategoryNav";
import { type MenuCategory } from "@/lib/menu-data";
import { CategoryIllustration } from "@/lib/menu-visuals";
import { getCategoriesForFilter } from "@/lib/menu-filters";
import { useLanguage, useT, type TranslationKey } from "@/lib/i18n";
import { type MenuItem } from "@/lib/menu-data";

// Resolve a category id to its translated heading (falls back to category.name).
function categoryHeading(
  t: (k: TranslationKey) => string,
  cat: MenuCategory,
): string {
  const key = `category.${cat.id}` as TranslationKey;
  const translated = t(key);
  return translated === key ? cat.name : translated;
}

// Render an item's name in the active language, falling back to English.
function itemName(item: MenuItem, lang: "en" | "ar"): string {
  if (lang === "ar" && item.nameAr) return item.nameAr;
  return item.name;
}

// ─── Small ambient sparkle ───────────────────────────────────────────────────
function Sparkle() {
  return (
    <svg width="14" height="14" viewBox="0 0 40 40" fill="none" aria-hidden
      className="text-ink pointer-events-none select-none">
      <path
        d="M20,2 L22.5,17 L38,20 L22.5,23 L20,38 L17.5,23 L2,20 L17.5,17 Z"
        stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"
      />
    </svg>
  );
}

// ─── Category block ──────────────────────────────────────────────────────────

function CategoryBlock({ category, index }: { category: MenuCategory; index: number }) {
  const t = useT();
  const { lang, dir } = useLanguage();
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.35, delay: Math.min(index, 6) * 0.03 }}
      className={[
        "relative overflow-hidden",
        "break-inside-avoid",
        "border border-ink/12 rounded-[18px_20px_18px_19px]",
        "bg-bg-base shadow-[3px_3px_0px_rgba(26,23,20,0.06)]",
        "p-6 md:p-7",
      ].join(" ")}
    >
      {/* Background illustration — top-right, low opacity, behind content */}
      <div className="absolute -top-3 -right-3 text-ink/[0.07] pointer-events-none select-none">
        <CategoryIllustration id={category.id} />
      </div>

      {/* Category heading */}
      <h2
        id={category.id}
        dir={dir}
        className="relative font-display font-bold text-ink text-2xl mb-1 pb-3 border-b border-ink/20 scroll-mt-32"
      >
        {categoryHeading(t, category)}
      </h2>

      {/* Items
          Arabic: dir="rtl" on the li flips the justify-between flex row so
          the name lands on the right and PricePill on the left.
          text-right on the name div pins the text to the right edge of its
          flex-1 block so it never drifts toward centre.
          English: no dir, unchanged left-name / right-price layout. */}
      <ul className="relative divide-y divide-ink-faint/70">
        {category.items.map((item, i) => (
          <li
            key={`${category.id}-${i}`}
            dir={lang === "ar" ? "rtl" : undefined}
            className="flex items-center justify-between gap-3 py-3"
          >
            <div className={`min-w-0 flex-1${lang === "ar" ? " text-right" : ""}`}>
              <p
                dir={dir}
                className="font-display font-bold text-ink text-[15px] leading-tight"
              >
                {itemName(item, lang)}
              </p>
              {item.todoVerify && (
                <p className="font-body text-[10px] text-ink-faint mt-0.5 tracking-wide uppercase">
                  {t("menu.todoVerify")}
                </p>
              )}
            </div>
            <PricePill price={item.price} />
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

// Apply the search query across a list of categories.
// - If the category name (in either language) matches, all of its items are kept.
// - Otherwise only items whose English OR Arabic name matches are kept.
// - Categories with zero matching items are dropped.
function applySearch(
  list:    MenuCategory[],
  query:   string,
  heading: (cat: MenuCategory) => string,
): MenuCategory[] {
  const q = query.trim().toLowerCase();
  if (!q) return list;
  return list
    .map((c) => {
      const nameMatch =
        c.name.toLowerCase().includes(q) ||
        heading(c).toLowerCase().includes(q);
      const items = nameMatch
        ? c.items
        : c.items.filter((i) => {
            const en = i.name.toLowerCase();
            const ar = i.nameAr?.toLowerCase() ?? "";
            return en.includes(q) || (ar !== "" && ar.includes(q));
          });
      return { ...c, items };
    })
    .filter((c) => c.items.length > 0);
}

export default function MenuPage() {
  const { t, lang } = useLanguage();
  // Two-level filter state:
  //   primary   = top-level filter ("all", "drinks", "burger", …)
  //   secondary = narrowing filter; defaults to the primary id, meaning
  //               "no narrowing". Different from primary only when the user
  //               picks a sub-pill (e.g. primary="drinks", secondary="espresso").
  const [primary,   setPrimary]   = useState<string>("all");
  const [secondary, setSecondary] = useState<string>("all");
  const [search,    setSearch]    = useState<string>("");

  // Ref attached to the cards grid section so we can scroll it into view on
  // category changes without scrolling all the way to the top of the page.
  const cardsRef = useRef<HTMLElement>(null);
  // Tracks the last search value the scroll effect acted on. Initialised to
  // the initial search value ("") so the effect is a no-op on first render
  // (and on StrictMode's double-invoke) — only real user changes trigger scroll.
  const prevSearchRef = useRef(search);

  // Force the page to the very top on initial mount regardless of browser
  // scroll-restoration or StrictMode side-effects.
  useEffect(() => { window.scrollTo(0, 0); }, []);

  // Scroll the cards section back to just below the sticky controls.
  // Measures the nav height at call-time so it works whether or not the
  // secondary filter row is currently visible.
  function scrollToCards() {
    const section = cardsRef.current;
    if (!section) return;
    const nav = document.getElementById("menu-category-nav");
    const navH = nav ? nav.offsetHeight : 0;
    // 64px = h-16 header that the sticky nav sits below.
    const y = section.getBoundingClientRect().top + window.scrollY - 64 - navH;
    window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });
  }

  // When the primary changes, reset the secondary and scroll back to the top
  // of the cards area so the user starts from the beginning of the new category.
  function handlePrimaryChange(id: string) {
    setPrimary(id);
    setSecondary(id);
    scrollToCards();
  }

  // Secondary filter change: same scroll reset.
  function handleSecondaryChange(id: string) {
    setSecondary(id);
    scrollToCards();
  }

  // Scroll to cards when search changes, debounced so rapid keystrokes don't
  // produce a scroll on every character. Comparing to prevSearchRef means this
  // is a no-op on mount (both start as "") and survives StrictMode double-invoke.
  useEffect(() => {
    if (search === prevSearchRef.current) return;
    prevSearchRef.current = search;
    const timer = setTimeout(scrollToCards, 300);
    return () => clearTimeout(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  // Effective filter is always the secondary, since it tracks the primary
  // when no narrowing is active. When the user has typed a search query,
  // ignore the active category and search globally across all items.
  const baseList = search.trim()
    ? getCategoriesForFilter("all")
    : getCategoriesForFilter(secondary);
  const visible  = applySearch(baseList, search, (c) => categoryHeading(t, c));
  const isSingle = visible.length === 1;
  const isEmpty  = visible.length === 0;

  return (
    <main>
      <Header />

      {/* ─── Page intro ─── */}
      <section className="relative pt-32 pb-8 px-6">
        <DoodlePattern id="menu-page-intro-bg" opacity={0.018} scale={1.35} />

        <div className="relative max-w-site mx-auto text-center">
          {/* Back to home */}
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-8"
          >
            <Link
              href="/"
              className={[
                `inline-flex items-center gap-1.5 font-body font-medium ${lang === "ar" ? "" : "tracking-wide"} cursor-pointer select-none`,
                "text-xs px-4 py-1.5 rounded-[10px_12px_10px_11px]",
                "border-2 border-ink bg-bg-base text-ink",
                "shadow-[2px_2px_0px_#1A1714] hover:shadow-[3px_3px_0px_#1A1714] hover:bg-warm",
                "active:shadow-[1px_1px_0px_#1A1714] active:translate-y-[1px]",
                "transition-all duration-150",
              ].join(" ")}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                strokeLinejoin="round" aria-hidden>
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                <polyline points="9 22 9 12 15 12 15 22"/>
              </svg>
              {t("menu.backToHome")}
            </Link>
          </motion.div>

          {/* Eyebrow — decorative food/café icons */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 mb-3"
          >
            <Sparkle />
            {/* Coffee cup */}
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden
              className="text-ink pointer-events-none select-none opacity-60">
              <path d="M4 3h13v10c0 1.1-.9 2-2 2H6c-1.1 0-2-.9-2-2V3z"
                stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
              <path d="M17 6h2.5c.5 0 .9.4.9.9v2.2c0 .5-.4.9-.9.9H17"
                stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {/* Fork and spoon */}
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden
              className="text-ink pointer-events-none select-none opacity-60">
              <path d="M6 4v8c0 .5.4 1 1 1h2c.6 0 1-.4 1-1V4"
                stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M14 4v8c0 .5.4 1 1 1h2c.6 0 1-.4 1-1V4"
                stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M4 13h16"
                stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
              <path d="M9 13v5M15 13v5"
                stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
            </svg>
            {/* Plate */}
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden
              className="text-ink pointer-events-none select-none opacity-60">
              <circle cx="12" cy="14" r="8"
                stroke="currentColor" strokeWidth="1.4" fill="none"/>
              <path d="M12 8v12M8 14h8"
                stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.7"/>
            </svg>
            <Sparkle />
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.18 }}
            className="font-display font-bold text-ink leading-[1.05]"
            style={{ fontSize: "clamp(2.4rem, 6vw, 4rem)" }}
          >
            {t("menu.title")}
          </motion.h1>

          {/* Body */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.28 }}
            className="font-body text-sm text-ink-muted mt-4 max-w-md mx-auto leading-relaxed"
          >
            {t("menu.body")}
          </motion.p>

          {/* Currency note pill
              Arabic: dir="rtl" reverses the flex row so the د.ع pill ends up
              on the left and the Arabic phrase on the right — reads RTL as
              "كل الأسعار بـ [د.ع]" without changing DOM order. */}
          <motion.div
            dir={lang === "ar" ? "rtl" : undefined}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.36 }}
            className="flex items-center justify-center gap-2 mt-6"
          >
            <span className="font-body text-[10px] text-ink-muted">{t("menu.allPricesIn")}</span>
            <span
              className="font-body text-[10px] font-semibold text-white rounded-full px-2.5 py-0.5"
              style={{ backgroundColor: ACCENT }}
            >
              {t("menu.iqd")}
            </span>
          </motion.div>

          {/* Talabat delivery CTA */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.46 }}
            className="mt-8 relative z-[41]"
          >
            <TalabatOrderButton variant="outline" />
          </motion.div>
        </div>
      </section>

      <DoodleDivider className="px-6" />

      <MenuCategoryNav
        primary={primary}
        secondary={secondary}
        onPrimaryChange={handlePrimaryChange}
        onSecondaryChange={handleSecondaryChange}
        search={search}
        onSearchChange={setSearch}
      />

      {/* ─── Category grid ─── */}
      <section ref={cardsRef} className="relative overflow-hidden py-14 px-6">
        <DoodlePattern id="menu-page-grid-bg" opacity={0.014} scale={1.55} />

        <div className="relative z-[1] max-w-site mx-auto">
          {isEmpty ? (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="text-center py-20"
            >
              <p className="font-display font-bold text-ink text-2xl mb-2">
                {t("menu.empty.title")}
              </p>
              <p className="font-body text-sm text-ink-muted">
                {t("menu.empty.body")}
              </p>
            </motion.div>
          ) : (
            <div
              className={
                isSingle
                  ? "max-w-2xl mx-auto"
                  : "grid grid-cols-1 md:grid-cols-2 gap-x-14 gap-y-14 lg:gap-x-20 lg:gap-y-16"
              }
            >
              <AnimatePresence mode="popLayout" initial={false}>
                {visible.map((category, i) => (
                  <CategoryBlock key={category.id} category={category} index={i} />
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </section>

      <DoodleDivider className="px-6" flip />

      {/* ─── Closing CTA ─── */}
      <section className="relative overflow-hidden py-20 px-6 text-center">
        <DoodlePattern id="menu-page-cta-bg" opacity={0.014} scale={1.50} />

        <div className="relative z-[1] max-w-site mx-auto">
          <p className="font-body text-sm text-ink-muted mb-6">
            {t("menu.closingNote")}
          </p>
          <Link
            href="/"
            className={[
              `inline-flex items-center gap-1.5 font-body font-medium ${lang === "ar" ? "" : "tracking-wide"} cursor-pointer select-none`,
              "text-xs px-4 py-1.5 rounded-[10px_12px_10px_11px]",
              "border-2 border-ink bg-bg-base text-ink",
              "shadow-[2px_2px_0px_#1A1714] hover:shadow-[3px_3px_0px_#1A1714] hover:bg-warm",
              "active:shadow-[1px_1px_0px_#1A1714] active:translate-y-[1px]",
              "transition-all duration-150",
            ].join(" ")}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round"
              strokeLinejoin="round" aria-hidden>
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
              <polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
            {t("menu.backToHome")}
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
