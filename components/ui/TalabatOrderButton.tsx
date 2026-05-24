"use client";

import { useState, useRef, useEffect } from "react";
import TalabatWordmark from "./TalabatWordmark";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/i18n";

const BRANCHES = [
  { name: "The Mind — Zayouna Branch",   url: "https://www.talabat.com/iraq/the-mind" },
  { name: "The Mind — Adhamiyah Branch", url: "https://www.talabat.com/iraq/the-mind-al-aathameya" },
];

const buttonBase =
  "inline-flex items-center justify-center gap-2 px-7 py-3.5 " +
  "font-body text-sm tracking-wide font-medium cursor-pointer select-none " +
  "transition-all duration-150 rounded-[14px_16px_14px_15px]";

const buttonStyle =
  "bg-bg-base text-ink border-2 border-ink " +
  "shadow-[3px_3px_0px_#1A1714] hover:shadow-[4px_4px_0px_#1A1714] hover:bg-warm " +
  "active:shadow-[1px_1px_0px_#1A1714] active:translate-y-[1px]";

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden
      className={cn("transition-transform duration-200 shrink-0", open && "rotate-180")}
    >
      <path d="M2,4 L6,8 L10,4" stroke="currentColor" strokeWidth="1.6"
        strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

interface TalabatOrderButtonProps {
  className?: string;
  variant?: "outline" | "primary";
}

export default function TalabatOrderButton({
  className,
  variant = "outline",
}: TalabatOrderButtonProps) {
  const { t, lang } = useLanguage();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close on click outside
  useEffect(() => {
    if (!open) return;
    function onMouseDown(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onMouseDown);
    return () => document.removeEventListener("mousedown", onMouseDown);
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const applied = variant === "primary"
    ? cn(buttonBase,
        "bg-ink text-bg-base border-2 border-ink " +
        "shadow-[3px_3px_0px_#1A1714] hover:shadow-[4px_4px_0px_#1A1714] " +
        "active:shadow-[1px_1px_0px_#1A1714] active:translate-y-[1px]",
        className)
    : cn(buttonBase, buttonStyle, className);

  return (
    <div ref={containerRef} className="relative inline-block z-[50]">
      {/* Language-specific flex direction.
          Arabic  (dir="rtl"): flex main axis runs right→left, so DOM order
            [text][wordmark][chevron] renders visually as [chevron][wordmark][text].
            An Arabic reader reads right→left: اطلب من → talabat → ›  ✓
          English (dir="ltr"): normal left→right, Order from → talabat → ›  ✓ */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        dir={lang === "ar" ? "rtl" : "ltr"}
        className={applied}
      >
        <span className="shrink-0">{t("menu.orderFrom")}</span>
        <TalabatWordmark variant={variant} />
        <ChevronIcon open={open} />
      </button>

      {open && (
        <div
          role="listbox"
          className={[
            "absolute left-0 top-full mt-2 z-[9999]",
            "min-w-full w-max",
            "bg-bg-base border border-ink/15",
            "rounded-[12px_14px_12px_13px]",
            "shadow-[3px_3px_0px_#1A1714]",
            "overflow-hidden",
          ].join(" ")}
        >
          {BRANCHES.map((branch) => (
            <a
              key={branch.name}
              href={branch.url}
              target="_blank"
              rel="noopener noreferrer"
              role="option"
              aria-selected={false}
              onClick={() => setOpen(false)}
              className="flex items-center gap-2.5 px-5 py-3.5 font-body text-sm text-ink hover:bg-warm transition-colors"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"
                strokeLinejoin="round" aria-hidden className="text-ink-muted shrink-0">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              {branch.name}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
