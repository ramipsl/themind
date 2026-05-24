"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { GAMES } from "@/lib/data";
import DoodleCard from "@/components/ui/DoodleCard";
import Tag from "@/components/ui/Tag";
import DoodlePattern from "@/components/ui/DoodlePattern";
import { useLanguage } from "@/lib/i18n";

const GREEN = "#2E5C45";

function SmallDiceIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 28 28" fill="none" aria-hidden
      className="text-ink pointer-events-none select-none">
      <rect x="2" y="2" width="24" height="24" rx="4" stroke="currentColor" strokeWidth="1.4"/>
      <circle cx="8"  cy="8"  r="2" fill="currentColor"/>
      <circle cx="14" cy="14" r="2" fill="currentColor"/>
      <circle cx="20" cy="20" r="2" fill="currentColor"/>
    </svg>
  );
}

export default function FeaturedGames() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const { t, lang, dir } = useLanguage();

  return (
    <section id="games" ref={ref} className="relative overflow-hidden py-14 md:py-20 px-6 bg-bg-card">

      <DoodlePattern id="games-bg" opacity={0.044} scale={1.25} />

      <div className="relative z-[1] max-w-site mx-auto">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 md:mb-16"
        >
          {/* Eyebrow with flanking dice */}
          <div className="inline-flex items-center gap-2.5 mb-3">
            <SmallDiceIcon />
            <p className={lang === "ar"
              ? "font-body text-[10px] tracking-normal text-ink-muted"
              : "font-body text-[10px] tracking-[0.32em] uppercase text-ink-muted"}>
              {t("games.eyebrow")}
            </p>
            <SmallDiceIcon />
          </div>

          <h2
            className="font-display font-bold text-ink"
            style={{ fontSize: "clamp(2rem, 4.5vw, 3rem)" }}
          >
            {t("games.title")}
          </h2>
          <p className="font-body text-sm text-ink-muted mt-3 max-w-xs mx-auto">
            {t("games.body")}
          </p>
          {/* Mobile: two lines with green highlight on second line */}
          <p dir={dir} className="md:hidden font-body text-sm text-ink-muted mt-4 max-w-sm mx-auto">
            {t("games.ask.before")}
            <br />
            <span
              className="text-white rounded px-1 py-0.5 inline-block"
              style={{ backgroundColor: GREEN }}
            >
              {t("games.ask.highlight")}
            </span>
          </p>
          {/* Desktop: one line with green highlight */}
          <p dir={dir} className="hidden md:block font-body text-sm text-ink-muted mt-1 whitespace-nowrap mx-auto">
            {t("games.ask.beforeInline")}
            <span
              className="text-white rounded px-1 py-0.5 inline-block"
              style={{ backgroundColor: GREEN }}
            >
              {t("games.ask.highlight")}
            </span>
          </p>
        </motion.div>

        {/* Game card grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {GAMES.map((game, i) => (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.07 }}
            >
              <DoodleCard className="flex flex-col gap-3 p-5">
                <div className="w-full aspect-square bg-warm rounded-[12px_14px_12px_13px] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={game.image}
                    alt={game.name}
                    className="w-full h-full object-cover select-none pointer-events-none"
                    draggable={false}
                    loading="lazy"
                  />
                </div>
                <div>
                  <h3 className="font-display font-bold text-ink text-sm leading-tight mb-2">
                    {game.name}
                  </h3>
                  <div className="flex items-center gap-2 flex-nowrap">
                    <Tag className="shrink-0">{game.tag}</Tag>
                    <span className="font-body text-[10px] text-ink-muted whitespace-nowrap shrink-0">
                      {game.players}{t("games.players")}
                    </span>
                  </div>
                </div>
              </DoodleCard>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-center font-body text-sm text-ink-muted mt-6 md:mt-10"
        >
          {t("games.footer")}
        </motion.p>

      </div>
    </section>
  );
}
