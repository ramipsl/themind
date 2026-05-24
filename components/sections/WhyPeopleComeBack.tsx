"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import DoodleCard from "@/components/ui/DoodleCard";
import DoodlePattern from "@/components/ui/DoodlePattern";
import { useLanguage, type TranslationKey } from "@/lib/i18n";

const CARDS: { id: number; icon: () => React.ReactElement; titleKey: TranslationKey; descKey: TranslationKey }[] = [
  { id: 1, icon: MemoryIcon,      titleKey: "why.memory.title",     descKey: "why.memory.desc"     },
  { id: 2, icon: NoWifiIcon,      titleKey: "why.noWifi.title",     descKey: "why.noWifi.desc"     },
  { id: 3, icon: GamesForAllIcon, titleKey: "why.games.title",      descKey: "why.games.desc"      },
  { id: 4, icon: FoodDrinksIcon,  titleKey: "why.foodDrinks.title", descKey: "why.foodDrinks.desc" },
];

// ─── Card icons ───────────────────────────────────────────────────────────────

function MemoryIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden>
      <rect x="6" y="14" width="36" height="26" rx="4"
        stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
      <circle cx="24" cy="27" r="7" stroke="currentColor" strokeWidth="1.8"/>
      <circle cx="24" cy="27" r="3" stroke="currentColor" strokeWidth="1.4"/>
      <path d="M16,14 L16,10 Q16,8 18,8 L22,8 Q24,8 24,10 L24,14"
        stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
      <circle cx="37" cy="20" r="1.8" fill="currentColor" opacity="0.55"/>
    </svg>
  );
}

function NoWifiIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden>
      <circle cx="13" cy="14" r="5.5" stroke="currentColor" strokeWidth="1.8"/>
      <path d="M3,40 Q3,28 13,28 Q18,28 21,32"
        stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      <circle cx="35" cy="14" r="5.5" stroke="currentColor" strokeWidth="1.8"/>
      <path d="M45,40 Q45,28 35,28 Q30,28 27,32"
        stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      {/* Speech bubble */}
      <path d="M19,20 Q19,15 24,15 Q29,15 29,20 Q29,25 24,25 L21,28 L22,25 Q19,25 19,20 Z"
        stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
    </svg>
  );
}

function GamesForAllIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden>
      <rect x="6" y="10" width="36" height="28" rx="4"
        stroke="currentColor" strokeWidth="1.8"/>
      <path d="M6,20 L42,20"
        stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" opacity="0.5"/>
      <rect x="12" y="25" width="9" height="9" rx="2"
        stroke="currentColor" strokeWidth="1.4"/>
      <circle cx="15" cy="28" r="1" fill="currentColor"/>
      <circle cx="18" cy="31" r="1" fill="currentColor"/>
      <circle cx="31" cy="27" r="3" stroke="currentColor" strokeWidth="1.4"/>
      <path d="M31,30 L31,34" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      <path d="M28,34 L34,34" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      <path d="M20,14 L24,10 L28,14"
        stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function FoodDrinksIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden>
      <path d="M8,14 L14,40 L22,40 L28,14 Z"
        stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
      <path d="M28,20 Q35,20 35,26 Q35,32 28,32"
        stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
      <path d="M14,10 Q15,7 14,5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" opacity="0.5"/>
      <path d="M18,10 Q19,7 18,5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" opacity="0.5"/>
      <path d="M39,8 L39,22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M37,8 L37,14 Q39,16 41,14 L41,8"
        stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M39,22 L39,40" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

function SpeechBubbleSmall() {
  return (
    <svg width="18" height="15" viewBox="0 0 36 30" fill="none" aria-hidden
      className="text-ink pointer-events-none select-none">
      <path d="M4,4 Q4,2 6,2 L30,2 Q32,2 32,4 L32,18 Q32,20 30,20 L14,20 L8,28 L10,20 L6,20 Q4,20 4,18 Z"
        stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
    </svg>
  );
}

// ─── Section component ────────────────────────────────────────────────────────

export default function WhyPeopleComeBack() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const { t, lang } = useLanguage();

  return (
    <section id="community" ref={ref} className="relative overflow-hidden py-14 md:py-20 px-6 bg-bg-card">

      <DoodlePattern id="community-bg" opacity={0.044} scale={1.25} />

      <div className="relative z-[1] max-w-site mx-auto">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 md:mb-16"
        >
          {/* Eyebrow with flanking speech bubbles */}
          <div className="inline-flex items-center gap-2.5 mb-3">
            <SpeechBubbleSmall />
            <p className={lang === "ar"
              ? "font-body text-[10px] tracking-normal text-ink-muted"
              : "font-body text-[10px] tracking-[0.32em] uppercase text-ink-muted"}>
              {t("why.eyebrow")}
            </p>
            <SpeechBubbleSmall />
          </div>

          <h2
            className="font-display font-bold text-ink"
            style={{ fontSize: "clamp(2rem, 4.5vw, 3rem)" }}
          >
            {t("why.title")}
          </h2>
          <p className="font-body text-sm text-ink-muted mt-4 max-w-sm mx-auto leading-relaxed">
            {t("why.body")}
          </p>
        </motion.div>

        {/* 2x2 card grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {CARDS.map(({ id, icon: Icon, titleKey, descKey }, i) => (
            <motion.div
              key={id}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.11 }}
            >
              <DoodleCard className="h-full flex flex-col gap-5">
                <div className="w-12 h-12 text-ink">
                  <Icon />
                </div>
                <div>
                  <h3 className="font-display font-bold text-ink text-xl mb-2">
                    {t(titleKey)}
                  </h3>
                  <p className="font-body text-sm text-ink-muted leading-relaxed">
                    {t(descKey)}
                  </p>
                </div>
              </DoodleCard>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="text-center font-body text-xs text-ink-faint mt-6 md:mt-10"
        >
          {t("why.footer")}
        </motion.p>
      </div>
    </section>
  );
}
