"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { CategoryIcon } from "@/lib/menu-visuals";
import {
  PRIMARY_FILTERS,
  SECONDARY_FILTERS,
  hasSecondaryFilters,
  type FilterPill,
} from "@/lib/menu-filters";
import { useLanguage, type TranslationKey } from "@/lib/i18n";

interface MenuCategoryNavProps {
  primary:            string;
  secondary:          string;
  onPrimaryChange:    (id: string) => void;
  onSecondaryChange:  (id: string) => void;
  search:             string;
  onSearchChange:     (value: string) => void;
}

// Filter id → translation key for its display label.
const FILTER_KEYS: Record<string, TranslationKey> = {
  // Primary
  "all":              "filter.all",
  "breakfast":        "filter.breakfast",
  "salad":            "filter.salad",
  "pasta":            "filter.pasta",
  "meat":             "filter.meat",
  "chicken":          "filter.chicken",
  "sandwiches":       "filter.sandwiches",
  "pizza":            "filter.pizza",
  "burger":           "filter.burger",
  "fries":            "filter.fries",
  "drinks":           "filter.drinks",
  "desserts":         "filter.desserts",
  "made-in-the-mind": "filter.madeInTheMind",
  // Secondary
  "espresso":            "filter.espresso",
  "coffee":              "filter.coffee",
  "cold-drinks":         "filter.coldDrinks",
  "smoothies":           "filter.smoothies",
  "milk-shake":          "filter.milkShake",
  "ice-cream":           "filter.iceCream",
  "hot-drinks":          "filter.hotDrinks",
  "pastries":            "filter.pastries",
  "cake":                "filter.cake",
  "meat-sandwiches":     "filter.meatSandwiches",
  "chicken-sandwiches":  "filter.chickenSandwiches",
};

function pillLabel(
  t:    (k: TranslationKey) => string,
  pill: FilterPill,
): string {
  const key = FILTER_KEYS[pill.id];
  return key ? t(key) : pill.name;
}

// Two-level sticky filter bar:
//   Row 1 — primary categories (always visible, with icons)
//   Row 2 — secondary narrowing pills (visible only when the active primary
//           has any). Visually lighter / subordinate. No icons.
export default function MenuCategoryNav({
  primary,
  secondary,
  onPrimaryChange,
  onSecondaryChange,
  search,
  onSearchChange,
}: MenuCategoryNavProps) {
  const { t, lang } = useLanguage();
  const primaryListRef   = useRef<HTMLUListElement>(null);
  const secondaryListRef = useRef<HTMLUListElement>(null);

  // Track previous values so these effects only fire on actual changes, not on
  // initial mount. Comparing to the ref value (initialised from the prop) means
  // the effect is a no-op on first render — and on StrictMode's double-invoke —
  // without needing a separate boolean mounted flag.
  const prevPrimaryRef   = useRef(primary);
  const prevSecondaryRef = useRef(secondary);

  useEffect(() => {
    if (primary === prevPrimaryRef.current) return;
    prevPrimaryRef.current = primary;
    const pill = primaryListRef.current?.querySelector<HTMLElement>(`[data-cat="${primary}"]`);
    pill?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }, [primary]);

  useEffect(() => {
    if (secondary === prevSecondaryRef.current) return;
    prevSecondaryRef.current = secondary;
    const pill = secondaryListRef.current?.querySelector<HTMLElement>(`[data-cat="${secondary}"]`);
    pill?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }, [secondary]);

  const showSecondary = hasSecondaryFilters(primary);
  // Prepend an "All" pill whose id matches the active primary so that the
  // page-level "secondary equals primary → no narrowing" convention is honoured.
  const secondaryPills: FilterPill[] = showSecondary
    ? [{ id: primary, name: "All" }, ...SECONDARY_FILTERS[primary]]
    : [];

  return (
    <div id="menu-category-nav" style={{ top: "calc(4rem + env(safe-area-inset-top, 0px))" }} className="sticky z-40 bg-bg-base border-y border-ink-faint">

      {/* ─── Search row ─── */}
      <div className="px-6 py-3 border-b border-ink-faint/60">
        <div className="max-w-sm mx-auto relative">
          <svg
            width="14" height="14" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="1.8"
            strokeLinecap="round" strokeLinejoin="round"
            aria-hidden
            className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-muted pointer-events-none"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
          <input
            type="search"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={t("menu.searchPlaceholder")}
            aria-label={t("menu.searchAria")}
            className="w-full pl-10 pr-10 py-2.5 font-body text-sm text-ink placeholder:text-ink-faint bg-bg-base border border-ink/15 rounded-full focus:outline-none focus:border-ink/50 transition-colors"
          />
          {search && (
            <button
              type="button"
              onClick={() => onSearchChange("")}
              aria-label={t("menu.clearSearch")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-muted hover:text-ink p-1 cursor-pointer transition-colors"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>

      <nav aria-label={t("menu.primaryAria")}>
        {/* dir="rtl" in Arabic reverses the flex-row so pills flow right→left
            and the horizontal scroll origin sits at the right end naturally. */}
        <div
          dir={lang === "ar" ? "rtl" : undefined}
          className="overflow-x-auto [&::-webkit-scrollbar]:hidden px-6"
          style={{ scrollbarWidth: "none" }}
        >
          <ul
            ref={primaryListRef}
            className="flex items-center gap-2 py-3 flex-nowrap"
          >
            {PRIMARY_FILTERS.map((opt) => {
              const isActive = primary === opt.id;
              return (
                <li key={opt.id} className="shrink-0">
                  <button
                    type="button"
                    data-cat={opt.id}
                    onClick={() => onPrimaryChange(opt.id)}
                    aria-pressed={isActive}
                    className={cn(
                      "inline-flex items-center gap-1.5 whitespace-nowrap cursor-pointer",
                      lang === "ar"
                        ? "font-body text-[10px] tracking-normal"
                        : "font-body text-[10px] tracking-[0.18em] uppercase",
                      "px-3 py-1.5 rounded-full border transition-colors duration-200",
                      isActive
                        ? "bg-ink text-bg-base border-ink"
                        : "text-ink-muted border-ink-faint hover:text-ink hover:border-ink/40",
                    )}
                  >
                    <CategoryIcon id={opt.id} className="shrink-0 opacity-80" />
                    {pillLabel(t, opt)}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      <AnimatePresence initial={false}>
        {showSecondary && (
          <motion.nav
            key="secondary"
            aria-label={t("menu.secondaryAria")}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="overflow-hidden border-t border-ink-faint/60 bg-bg-base"
          >
            <div
              dir={lang === "ar" ? "rtl" : undefined}
              className="max-w-site mx-auto overflow-x-auto [&::-webkit-scrollbar]:hidden"
              style={{ scrollbarWidth: "none" }}
            >
              <ul
                ref={secondaryListRef}
                className="flex items-center gap-1.5 px-6 py-2 flex-nowrap md:flex-wrap md:justify-center"
              >
                {secondaryPills.map((opt) => {
                  const isActive = secondary === opt.id;
                  // The "All" reset pill mirrors the active primary id, so
                  // show the explicit "All" label rather than re-translating
                  // the parent category's name.
                  const label = opt.name === "All"
                    ? t("filter.all")
                    : pillLabel(t, opt);
                  return (
                    <li key={opt.id} className="shrink-0">
                      <button
                        type="button"
                        data-cat={opt.id}
                        onClick={() => onSecondaryChange(opt.id)}
                        aria-pressed={isActive}
                        className={cn(
                          "inline-block whitespace-nowrap cursor-pointer",
                          lang === "ar"
                            ? "font-body text-[9px] tracking-normal"
                            : "font-body text-[9px] tracking-[0.16em] uppercase",
                          "px-2.5 py-1 rounded-full transition-colors duration-200",
                          isActive
                            ? "bg-ink/10 text-ink"
                            : "text-ink-faint hover:text-ink-muted",
                        )}
                      >
                        {label}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </div>
  );
}
