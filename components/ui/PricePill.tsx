// ─── PricePill ───────────────────────────────────────────────────────────────
// Solid green rounded capsule used for every price on the homepage menu preview
// and the full menu page. Inline backgroundColor sidesteps Tailwind JIT not
// always picking up the brand-accent color from arbitrary scans.

const ACCENT = "#2E5C45";

interface PricePillProps {
  price: string;
  size?: "sm" | "md";
}

export default function PricePill({ price, size = "md" }: PricePillProps) {
  const sizeCls =
    size === "sm"
      ? "text-[10px] px-2.5 py-[3px]"
      : "text-xs px-3 py-1";

  return (
    <span
      className={[
        "inline-block font-body font-semibold text-white",
        "rounded-full whitespace-nowrap shrink-0 leading-none",
        sizeCls,
      ].join(" ")}
      style={{ backgroundColor: ACCENT }}
    >
      {price}
    </span>
  );
}

export { ACCENT };
