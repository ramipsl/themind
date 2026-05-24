import Image from "next/image";

// ─── Logo assets ──────────────────────────────────────────────────────────────
//
// Full logo (icon + text baked in) — used when no separate text is rendered
//   /public/logo-dark-transparent.png   487×422  ratio 1.154
//   /public/logo-light-transparent.png  487×422  ratio 1.154
//
// Icon-only (symbol only, no text) — used when "THE MIND" text is rendered beside it
//   /public/logo-icon-only.png          374×240  ratio 1.558
//   /public/logo-icon-only-light.png    374×240  ratio 1.558
//
// `iconOnly` prop controls layout mode:
//   true  → full logo image, no text span (hero, footer)
//   false → icon-only image + "THE MIND" text span beside it (navbar)

interface LogoProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  /** true = show full logo image, no text beside it (hero / footer) */
  iconOnly?: boolean;
  /** Use white-ink assets for dark backgrounds (footer) */
  light?: boolean;
}

// Width (px) for each size level
const widthPx = { sm: 44, md: 56, lg: 160 } as const;

// Full-logo aspect ratio: 487 / 422
const FULL_RATIO = 487 / 422;
// Icon-only aspect ratio: 374 / 240
const ICON_RATIO = 374 / 240;

const textCls = {
  sm: "text-sm",
  md: "text-xl",
  lg: "text-2xl",
} as const;

export default function Logo({
  size = "md",
  className = "",
  iconOnly,
  light,
}: LogoProps) {
  const imgW = widthPx[size];

  // iconOnly=true  → full logo image (text baked in), no separate text span
  // iconOnly=false → icon-only symbol image + "THE MIND" text span beside it
  const src  = iconOnly
    ? (light ? "/logo-light-transparent.png" : "/logo-dark-transparent.png")
    : (light ? "/logo-icon-only-light.png"   : "/logo-icon-only.png");

  const imgH = iconOnly
    ? Math.round(imgW / FULL_RATIO)
    : Math.round(imgW / ICON_RATIO);

  return (
    <div className={`flex items-center gap-3 ${className}`} style={{ background: "transparent" }}>
      <Image
        src={src}
        alt="The Mind Cafe and Boardgames logo"
        width={imgW}
        height={imgH}
        className="flex-shrink-0 object-contain"
        style={{ background: "transparent", color: "transparent" }}
        quality={95}
        priority
        placeholder="empty"
      />

      {/* Text only rendered when NOT iconOnly — image is icon-only in that case */}
      {!iconOnly && (
        <div className="flex flex-col leading-none -mt-1.5">
          <span className={`font-display font-bold tracking-tight ${textCls[size]}`}>
            THE MIND
          </span>
        </div>
      )}
    </div>
  );
}
