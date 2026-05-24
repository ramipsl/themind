"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { CONTACT } from "@/lib/data";
import { ACCENT } from "@/components/ui/PricePill";
import DoodlePattern from "@/components/ui/DoodlePattern";
import Button from "@/components/ui/Button";
import { useLanguage } from "@/lib/i18n";

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="2" y="2" width="20" height="20" rx="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" stroke="none"/>
    </svg>
  );
}

function EyebrowMark() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none"
      stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      {/* Four-point star sparkle, monoline aesthetic */}
      <line x1="5" y1="1" x2="5" y2="9" />
      <line x1="1" y1="5" x2="9" y2="5" />
      <circle cx="5" cy="5" r="1.2" />
    </svg>
  );
}

export default function Gallery() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const { t, lang } = useLanguage();

  return (
    <section id="gallery" ref={ref} className="relative overflow-hidden py-14 md:py-20 px-6">
      <DoodlePattern id="gallery-bg" opacity={0.022} scale={1.50} />

      <div className="relative z-[1] max-w-site mx-auto text-center">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* Eyebrow with flanking sparkle marks */}
          <div className="inline-flex items-center gap-2.5 mb-3">
            <EyebrowMark />
            <p className={lang === "ar"
              ? "font-body text-[10px] tracking-normal text-ink-muted"
              : "font-body text-[10px] tracking-[0.32em] uppercase text-ink-muted"}>
              {t("gallery.eyebrow")}
            </p>
            <EyebrowMark />
          </div>

          {/* dir="rtl" in Arabic: bidi places Arabic words rightmost, the LTR
              "Instagram" token floats left. Reading RTL: المزيد على Instagram ✓
              English: no dir, plain LTR. */}
          <h2
            dir={lang === "ar" ? "rtl" : undefined}
            className="font-display font-bold text-ink"
            style={{ fontSize: "clamp(2rem, 4.5vw, 3rem)" }}
          >
            {t("gallery.title")}
          </h2>

          <p className="font-body text-sm text-ink-muted mt-3 max-w-sm mx-auto">
            {t("gallery.body1")}
            <br />
            <span
              className="text-white rounded px-1 py-0.5 inline-block"
              style={{ backgroundColor: ACCENT }}
            >
              {t("gallery.body2")}
            </span>
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-6 md:mt-10"
        >
          {/* Arabic: the wrapper div inherits dir="ltr" to the motion.a so the
              inline-flex axis stays left→right and the Instagram icon cannot jump.
              The text span carries dir="rtl" so within the span the Arabic
              "زيارة" sits rightmost and "Instagram" sits left — visual:
              [icon] [Instagram] [زيارة] — reading RTL: زيارة Instagram ✓
              English: no dir attributes, unchanged. */}
          <div dir={lang === "ar" ? "ltr" : undefined}>
            <Button
              href={CONTACT.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="outline"
            >
              <InstagramIcon />
              <span
                dir={lang === "ar" ? "rtl" : undefined}
                className="font-bold"
              >
                {t("gallery.visit")}
              </span>
            </Button>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
