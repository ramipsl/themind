// Transparent Talabat wordmark assets — no background rectangle.
// Dark:  /public/talabat-wordmark-dark.png  → ink (#1A1714) on transparent
// White: /public/talabat-wordmark-white.png → white on transparent
//
// If an official SVG is ever provided, replace src paths and remove this comment.

interface TalabatWordmarkProps {
  variant?: "outline" | "primary";
  className?: string;
}

export default function TalabatWordmark({
  variant = "outline",
  className,
}: TalabatWordmarkProps) {
  const src =
    variant === "primary"
      ? "/talabat-wordmark-white.png"
      : "/talabat-wordmark-dark.png";

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt="talabat"
      height={17}
      style={{
        height: 17,
        width: "auto",
        display: "block",
        flexShrink: 0,
        imageRendering: "auto",
        transform: "translateY(-2px)",
      }}
      className={className}
    />
  );
}
