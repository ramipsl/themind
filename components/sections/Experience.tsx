"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import DoodleCard from "@/components/ui/DoodleCard";
import DoodlePattern from "@/components/ui/DoodlePattern";
import {
  CoffeeCupIcon,
  DiceIcon,
  PeopleIcon,
} from "@/components/icons/MonolineIcons";
import { useLanguage, type TranslationKey } from "@/lib/i18n";

const cards: {
  Icon:     React.ComponentType<{ size?: number; className?: string }>;
  titleKey: TranslationKey;
  descKey:  TranslationKey;
}[] = [
  { Icon: CoffeeCupIcon, titleKey: "experience.coffee.title",     descKey: "experience.coffee.desc"     },
  { Icon: DiceIcon,      titleKey: "experience.boardGames.title", descKey: "experience.boardGames.desc" },
  { Icon: PeopleIcon,    titleKey: "experience.community.title",  descKey: "experience.community.desc"  },
];

function SmallSparkle() {
  return (
    <svg width="14" height="14" viewBox="0 0 40 40" fill="none" aria-hidden
      className="text-ink pointer-events-none select-none">
      <path d="M20,2 L22.5,17 L38,20 L22.5,23 L20,38 L17.5,23 L2,20 L17.5,17 Z"
        stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
    </svg>
  );
}

export default function Experience() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { t, lang } = useLanguage();

  return (
    <section ref={ref} className="relative overflow-hidden py-14 md:py-20 px-6">

      <DoodlePattern id="exp-bg" opacity={0.048} scale={1.30} />

      <div className="relative z-[1] max-w-site mx-auto">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 md:mb-16"
        >
          {/* Eyebrow with flanking sparkles */}
          <div className="inline-flex items-center gap-2.5 mb-3">
            <SmallSparkle />
            <p className={lang === "ar"
              ? "font-body text-[10px] tracking-normal text-ink-muted"
              : "font-body text-[10px] tracking-[0.32em] uppercase text-ink-muted"}>
              {t("experience.eyebrow")}
            </p>
            <SmallSparkle />
          </div>

          <h2
            className="font-display font-bold text-ink"
            style={{ fontSize: "clamp(2rem, 4.5vw, 3rem)" }}
          >
            {t("experience.title")}
          </h2>
        </motion.div>

        {/* Card grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map(({ Icon, titleKey, descKey }, i) => (
            <motion.div
              key={titleKey}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.13 }}
            >
              <DoodleCard className="h-full flex flex-col gap-5">
                <div className="w-12 h-12 text-ink">
                  <Icon size={48} />
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
      </div>
    </section>
  );
}
