"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

// ─── DoodleDivider ───────────────────────────────────────────────────────────
// Hand-drawn wavy line used as the standard separator between major sections.
// Visual rules:
//   • stroke ink (#1A1714) at ~22-26% opacity — visible but never heavy
//   • strokeWidth 1.9 — reads clearly at desktop & mobile
//   • strokeLinecap round — soft pen-ink look
//   • draws in on scroll via strokeDashoffset animation
//
// Props:
//   flip      — mirror horizontally for visual variety
//   tight     — reduce vertical padding (use when section already has padding)

interface DoodleDividerProps {
  className?: string;
  flip?:      boolean;
  tight?:     boolean;
}

export default function DoodleDivider({ className, flip, tight }: DoodleDividerProps) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  // Wave path: 12 control segments across a 1200-unit canvas → drawn length ≈ 1210
  const PATH =
    "M0,20 Q50,6 100,20 Q150,34 200,20 Q250,6 300,20 Q350,34 400,20 " +
    "Q450,6 500,20 Q550,34 600,20 Q650,6 700,20 Q750,34 800,20 " +
    "Q850,6 900,20 Q950,34 1000,20 Q1050,6 1100,20 Q1150,34 1200,20";

  return (
    <div
      ref={ref}
      aria-hidden
      className={cn(
        "w-full overflow-hidden",
        tight ? "py-2 md:py-4" : "py-4 md:py-8",
        flip ? "[transform:scaleX(-1)]" : "",
        className
      )}
    >
      <svg
        viewBox="0 0 1200 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
        preserveAspectRatio="none"
      >
        <motion.path
          d={PATH}
          stroke="#1A1714"
          strokeOpacity="0.24"
          strokeWidth="1.9"
          strokeLinecap="round"
          fill="none"
          strokeDasharray="1210"
          initial={{ strokeDashoffset: 1210 }}
          animate={inView ? { strokeDashoffset: 0 } : {}}
          transition={{ duration: 1.6, ease: "easeOut" }}
        />
      </svg>
    </div>
  );
}
