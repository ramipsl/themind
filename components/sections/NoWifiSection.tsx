"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import DoodlePattern from "@/components/ui/DoodlePattern";
import { useLanguage } from "@/lib/i18n";

// ─── Brand green ──────────────────────────────────────────────────────────────
const GREEN = "#2E5C45";

// ─── Narrative illustration ───────────────────────────────────────────────────
// Monoline scene: three people gathered around a table.
// Phone face-down, coffee steaming, board game tile, one speech bubble.
// Keeps the same stroke weight and linecap language as MonolineIcons.tsx.
function TableGatheringScene() {
  return (
    <svg
      viewBox="0 0 280 224"
      fill="none"
      aria-hidden
      className="w-full max-w-[340px] mx-auto text-ink"
    >
      {/* ── Table oval ── */}
      <ellipse
        cx="140" cy="152" rx="108" ry="50"
        stroke="currentColor" strokeWidth="1.8"
      />

      {/* ── Person — top (back of table) ── */}
      <circle cx="140" cy="68" r="15" stroke="currentColor" strokeWidth="1.7"/>
      <path
        d="M125,83 Q125,98 140,98 Q155,98 155,83"
        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
      />

      {/* ── Person — left ── */}
      <circle cx="36" cy="144" r="13" stroke="currentColor" strokeWidth="1.7"/>
      <path
        d="M23,157 Q23,170 36,170 Q49,170 49,157"
        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
      />

      {/* ── Person — right ── */}
      <circle cx="244" cy="144" r="13" stroke="currentColor" strokeWidth="1.7"/>
      <path
        d="M231,157 Q231,170 244,170 Q257,170 257,157"
        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
      />

      {/* ── Phone face-down on table ──
          Rectangle with two diagonal lines = screen facing away from viewer.
      ── */}
      <rect
        x="106" y="130" width="36" height="24" rx="4"
        stroke="currentColor" strokeWidth="1.6"
      />
      <path
        d="M112,136 L136,148"
        stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.45"
      />
      <path
        d="M136,136 L112,148"
        stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.45"
      />

      {/* ── Coffee cup on table ── */}
      <path
        d="M158,122 L170,122 L168,142 L160,142 Z"
        stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"
      />
      <path
        d="M170,128 Q177,128 177,133 Q177,138 170,138"
        stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"
      />
      {/* steam */}
      <path d="M162,118 Q164,113 162,108" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M167,118 Q169,113 167,108" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>

      {/* ── Board game tile on table ── */}
      <rect
        x="116" y="154" width="24" height="20" rx="3"
        stroke="currentColor" strokeWidth="1.4"
      />
      <circle cx="124" cy="162" r="1.5" fill="currentColor" opacity="0.55"/>
      <circle cx="132" cy="166" r="1.5" fill="currentColor" opacity="0.55"/>

      {/* ── Speech bubble — top-right of top person, conversation happening ── */}
      <path
        d="M152,58 Q152,46 164,46 Q176,46 176,58 Q176,70 164,70 L158,77 L160,70 Q152,70 152,58 Z"
        stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"
      />

      {/* ── Small sparkle — memory makers feel ── */}
      <path
        d="M208,82 L209.5,77 L211,82 L216,83.5 L211,85 L209.5,90 L208,85 L203,83.5 Z"
        stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" opacity="0.35"
      />
    </svg>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export default function NoWifiSection() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const { t, lang, dir } = useLanguage();

  return (
    <section ref={ref} className="relative overflow-hidden py-14 md:py-20 px-6">

      <DoodlePattern id="nowifi-bg" opacity={0.038} scale={1.40} />

      <div className="relative z-[1] max-w-site mx-auto">

        {/* ── Poster card — off-white, ink border, slightly uneven radius ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className={[
            "rounded-[22px_24px_20px_23px]",
            "border border-ink/20",
            "bg-bg-card",
            "shadow-[3px_4px_0px_#C9C5BF]",
            "px-6 py-8 md:px-16 md:py-16",
          ].join(" ")}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">

            {/* Illustration */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="order-2 md:order-1"
            >
              <TableGatheringScene />
            </motion.div>

            {/* Text */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.18 }}
              className="order-1 md:order-2"
            >
              {/* Eyebrow */}
              {/* Eyebrow stays English ("The whole point") in both language modes */}
              <p lang="en" dir="ltr"
                className="font-body text-[10px] tracking-[0.32em] uppercase text-ink-muted mb-5">
                {t("noWifi.eyebrow")}
              </p>

              {/* Headline with green highlight strip — language-specific markup.
                  In RTL (Arabic): dir="rtl" on the h2 makes first DOM child sit
                  rightmost. "بدون" is first → rightmost; Wi-Fi badge (dir="ltr"
                  so the English token is an LTR atom) sits to its left.
                  Visual left→right: [Wi-Fi badge] [بدون]
                  Reading right→left: بدون Wi-Fi ✓
                  In LTR (English): plain flow, No [Wi-Fi] Needed. */}
              {lang === "ar" ? (
                <h2
                  dir="rtl"
                  className="font-display font-bold text-ink leading-[1.08] mb-7"
                  style={{ fontSize: "clamp(2rem, 4vw, 2.8rem)" }}
                >
                  <span>{t("noWifi.title.no")}</span>
                  {" "}
                  <span
                    dir="ltr"
                    className="text-white rounded px-1.5 py-0.5 inline-block"
                    style={{ backgroundColor: GREEN }}
                  >
                    {t("noWifi.title.wifi")}
                  </span>
                </h2>
              ) : (
                <h2
                  className="font-display font-bold text-ink leading-[1.08] mb-7"
                  style={{ fontSize: "clamp(2rem, 4vw, 2.8rem)" }}
                >
                  {t("noWifi.title.no")}{" "}
                  <span
                    className="text-white rounded px-1.5 py-0.5 inline-block"
                    style={{ backgroundColor: GREEN }}
                  >
                    {t("noWifi.title.wifi")}
                  </span>
                  {t("noWifi.title.needed") ? <>{" "}{t("noWifi.title.needed")}</> : null}
                </h2>
              )}

              {/* Body copy */}
              <p dir={dir} className="font-body text-base text-ink-muted leading-relaxed mb-5">
                {t("noWifi.body1")}
              </p>

              <p dir={dir} className="font-body text-sm text-ink-muted leading-relaxed">
                {t("noWifi.body2.before")}
                <span
                  className="text-white rounded px-1 inline-block"
                  style={{ backgroundColor: GREEN }}
                >
                  {t("noWifi.body2.faceDown")}
                </span>
                {t("noWifi.body2.after")}
              </p>
            </motion.div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}
