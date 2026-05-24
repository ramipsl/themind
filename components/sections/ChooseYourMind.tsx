"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import DoodleCard from "@/components/ui/DoodleCard";
import DoodlePattern from "@/components/ui/DoodlePattern";
import { useLanguage, type TranslationKey } from "@/lib/i18n";

// ─── Experience icons — monoline, viewBox 0 0 48 48 ──────────────────────────
// All stroke weights match MonolineIcons.tsx (strokeWidth 1.8 primary, 1.4 secondary).

function BoardGamesIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden>
      {/* Board */}
      <rect x="6" y="12" width="36" height="28" rx="3"
        stroke="currentColor" strokeWidth="1.8"/>
      {/* Header row divider */}
      <path d="M6,20 L42,20"
        stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.5"/>
      {/* Column dividers in header */}
      <path d="M16,12 L16,20" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/>
      <path d="M32,12 L32,20" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/>
      {/* Playing pieces */}
      <circle cx="14" cy="31" r="3"   stroke="currentColor" strokeWidth="1.4"/>
      <circle cx="24" cy="31" r="3"   stroke="currentColor" strokeWidth="1.4"/>
      <circle cx="34" cy="31" r="3"   fill="currentColor"   opacity="0.55"/>
    </svg>
  );
}

function VIPRoomIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden>
      {/* Crown */}
      <path
        d="M10,34 L10,22 L18,28 L24,14 L30,28 L38,22 L38,34 Z"
        stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"
      />
      {/* Base band */}
      <path d="M8,38 L40,38" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      {/* Center gem */}
      <circle cx="24" cy="30" r="2" fill="currentColor"/>
      {/* Side gems */}
      <circle cx="15" cy="30" r="1.4" fill="currentColor" opacity="0.5"/>
      <circle cx="33" cy="30" r="1.4" fill="currentColor" opacity="0.5"/>
    </svg>
  );
}

function MonobowlingIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden>
      {/* Bowling pin — circle head + body */}
      <circle cx="24" cy="11" r="7" stroke="currentColor" strokeWidth="1.8"/>
      <path
        d="M19,18 L15,40 Q15,44 24,44 Q33,44 33,40 L29,18 Z"
        stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"
      />
    </svg>
  );
}

function RooftopIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden>
      {/* Terrace floor */}
      <path d="M4,38 L44,38" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      {/* Railing posts */}
      <path d="M10,38 L10,28" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      <path d="M19,38 L19,28" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      <path d="M29,38 L29,28" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      <path d="M38,38 L38,28" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      {/* Railing top rail */}
      <path d="M10,28 L38,28" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
      {/* Star (4-point sparkle) */}
      <path
        d="M20,14 L21.5,9 L23,14 L28,15.5 L23,17 L21.5,22 L20,17 L15,15.5 Z"
        stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"
      />
      {/* Small accent dots */}
      <circle cx="33" cy="10" r="1.4" fill="currentColor" opacity="0.55"/>
      <circle cx="29" cy="17" r="1"   fill="currentColor" opacity="0.35"/>
    </svg>
  );
}

function FoodCoffeeIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden>
      {/* Coffee cup body */}
      <path d="M8,18 L14,40 L24,40 L30,18 Z"
        stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
      {/* Handle */}
      <path d="M30,24 Q36,24 36,29 Q36,34 30,34"
        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      {/* Steam */}
      <path d="M13,14 Q15,10 13,6"
        stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.55"/>
      <path d="M19,14 Q21,10 19,6"
        stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.55"/>
      {/* Fork */}
      <path d="M40,8 L40,40"
        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path
        d="M37,8 L37,15 Q40,17 43,15 L43,8"
        stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"
      />
    </svg>
  );
}

// ─── Experience data ──────────────────────────────────────────────────────────
// arTitle: optional explicit Arabic rendering for cards whose title mixes
// Arabic and English tokens (e.g. "غرفة VIP"). Supplying a ReactNode here
// lets us apply dir="rtl" on the heading + dir="ltr" on the English span
// instead of relying on the Unicode Bidi Algorithm's auto-detection.
const EXPERIENCES: {
  id:        number;
  Icon:      () => React.ReactElement;
  titleKey:  TranslationKey;
  descKey:   TranslationKey;
  branchKey?: TranslationKey;
  arTitle?:  React.ReactNode;
}[] = [
  { id: 1, Icon: BoardGamesIcon,  titleKey: "choose.boardGames.title",  descKey: "choose.boardGames.desc"  },
  { id: 2, Icon: VIPRoomIcon,     titleKey: "choose.vip.title",         descKey: "choose.vip.desc",
    // Explicit bidi: Arabic word right, English token left — reads RTL as "غرفة VIP" ✓
    arTitle: <>غرفة{" "}<span dir="ltr">VIP</span></>,
  },
  { id: 3, Icon: MonobowlingIcon, titleKey: "choose.monobowling.title", descKey: "choose.monobowling.desc", branchKey: "choose.monobowling.branch" },
  { id: 4, Icon: RooftopIcon,     titleKey: "choose.rooftop.title",     descKey: "choose.rooftop.desc",     branchKey: "choose.rooftop.branch"     },
  { id: 5, Icon: FoodCoffeeIcon,  titleKey: "choose.foodCoffee.title",  descKey: "choose.foodCoffee.desc"  },
];

// ─── Section ──────────────────────────────────────────────────────────────────

export default function ChooseYourMind() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const { t, lang } = useLanguage();

  return (
    <section id="experiences" ref={ref}
      className="relative overflow-hidden py-14 md:py-20 px-6 bg-bg-card">

      <DoodlePattern id="choose-bg" opacity={0.042} scale={1.30} />

      <div className="relative z-[1] max-w-site mx-auto">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-14"
        >
          <p className={lang === "ar"
            ? "font-body text-[10px] tracking-normal text-ink-muted mb-3"
            : "font-body text-[10px] tracking-[0.32em] uppercase text-ink-muted mb-3"}>
            {t("choose.eyebrow")}
          </p>
          <h2
            className="font-display font-bold text-ink"
            style={{ fontSize: "clamp(2rem, 4.5vw, 3rem)" }}
          >
            {t("choose.title")}
          </h2>
          <p className="font-body text-sm text-ink-muted mt-4 max-w-sm mx-auto leading-relaxed">
            {t("choose.body")}
          </p>
        </motion.div>

        {/* Experience card grid — 2 cols mobile, 3 tablet, 5 desktop */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {EXPERIENCES.map(({ id, Icon, titleKey, descKey, branchKey, arTitle }, i) => (
            <motion.div
              key={id}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.09 }}
            >
              <DoodleCard className="flex flex-col gap-4 p-5 h-full">
                <div className="w-12 h-12 text-ink flex-shrink-0">
                  <Icon />
                </div>
                <div className="flex flex-col flex-1">
                  {/* dir="rtl" sets bidi context for mixed content; text-left
                      keeps alignment consistent with the other (LTR) card titles */}
                  <h3
                    dir={lang === "ar" && arTitle ? "rtl" : undefined}
                    className="font-display font-bold text-ink text-sm leading-tight mb-2 text-left"
                  >
                    {lang === "ar" && arTitle ? arTitle : t(titleKey)}
                  </h3>
                  <p className="font-body text-xs text-ink-muted leading-snug">
                    {t(descKey)}
                  </p>
                  {branchKey && (
                    <p
                      dir={lang === "ar" ? "rtl" : undefined}
                      className="font-body text-[10px] text-ink-faint leading-snug mt-auto pt-2"
                    >
                      {t(branchKey)}
                    </p>
                  )}
                </div>
              </DoodleCard>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
