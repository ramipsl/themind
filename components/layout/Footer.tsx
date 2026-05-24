"use client";

import { CONTACT } from "@/lib/data";
import Logo from "@/components/ui/Logo";
import { useLanguage, type TranslationKey } from "@/lib/i18n";

// Map static day labels in CONTACT to translation keys for known values.
function dayLabel(t: (k: TranslationKey) => string, days: string): string {
  if (days === "Every Day") return t("footer.everyDay");
  return days;
}

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

function MapPinIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
      <circle cx="12" cy="10" r="3"/>
    </svg>
  );
}

export default function Footer() {
  const { t, lang } = useLanguage();

  return (
    <footer className="bg-ink text-bg-base">
      <div className="max-w-site mx-auto px-6 pt-16 pb-10">

        {/* ── Three-column grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">

          {/* Brand column */}
          <div>
            <div className="mb-4">
              <Logo size="md" light iconOnly />
            </div>
            <p className="font-body text-sm text-bg-base/55 leading-relaxed max-w-[260px]">
              {t("footer.tagline")}
            </p>
          </div>

          {/* Hours column */}
          <div>
            <h4 className={lang === "ar"
              ? "font-body text-[10px] tracking-normal text-bg-base/35 mb-5"
              : "font-body text-[10px] tracking-[0.3em] uppercase text-bg-base/35 mb-5"}>
              {t("footer.hoursTitle")}
            </h4>
            <ul className="space-y-3">
              {CONTACT.hours.map((h) => (
                <li key={h.days}>
                  <p className="font-body text-xs text-bg-base/50">{dayLabel(t, h.days)}</p>
                  <p className="font-body text-sm text-bg-base">{h.time}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Find Us column */}
          <div>
            <h4 className={lang === "ar"
              ? "font-body text-[10px] tracking-normal text-bg-base/35 mb-5"
              : "font-body text-[10px] tracking-[0.3em] uppercase text-bg-base/35 mb-5"}>
              {t("footer.findUs")}
            </h4>
            <div className="flex flex-col gap-4">
              <a
                href={CONTACT.instagramUrl}
                target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-3 font-body text-sm text-bg-base/55 hover:text-bg-base transition-colors"
              >
                <InstagramIcon />
                @{CONTACT.instagramHandle}
              </a>
              {/* Branch map links */}
              {CONTACT.branches.map((b) => (
                <a
                  key={b.name}
                  href={b.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 font-body text-sm text-bg-base/55 hover:text-bg-base transition-colors"
                >
                  <MapPinIcon />
                  {b.name}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="border-t border-bg-base/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-body text-xs text-bg-base/25">
            © {new Date().getFullYear()} {t("footer.copyright")}
          </p>
          <p className="font-body text-xs text-bg-base/25">
            {t("footer.address")}
          </p>
        </div>
      </div>
    </footer>
  );
}
