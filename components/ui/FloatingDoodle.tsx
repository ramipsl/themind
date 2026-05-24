"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export type DoodleShape =
  | "sparkle"   // 4-pointed star
  | "squiggle"  // wavy line
  | "circle"    // hand-drawn wobbly circle
  | "dots"      // 3×3 dot grid
  | "star"      // 5-pointed star
  | "cross"     // + mark

// All shapes use currentColor so they inherit from the parent's text-* class
const shapes: Record<DoodleShape, (s: number) => React.ReactNode> = {
  sparkle: (s) => (
    <svg width={s} height={s} viewBox="0 0 40 40" fill="none">
      <path
        d="M20,2 L22.5,17 L38,20 L22.5,23 L20,38 L17.5,23 L2,20 L17.5,17 Z"
        stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"
      />
    </svg>
  ),
  squiggle: (s) => (
    <svg width={s * 2.2} height={s * 0.55} viewBox="0 0 88 22" fill="none">
      <path
        d="M2,11 Q10,2 18,11 Q26,20 34,11 Q42,2 50,11 Q58,20 66,11 Q74,2 82,8"
        stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"
      />
    </svg>
  ),
  circle: (s) => (
    <svg width={s} height={s} viewBox="0 0 44 44" fill="none">
      <path
        d="M22,4 Q38,3 40,20 Q41,37 24,41 Q7,42 4,26 Q2,9 18,4 Q20,3 22,4"
        stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"
      />
    </svg>
  ),
  dots: (s) => (
    <svg width={s} height={s} viewBox="0 0 36 36" fill="none">
      {[6, 18, 30].flatMap((x) =>
        [6, 18, 30].map((y) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r="2.4" fill="currentColor" />
        ))
      )}
    </svg>
  ),
  star: (s) => (
    <svg width={s} height={s} viewBox="0 0 32 32" fill="none">
      <path
        d="M16,3 L18.5,13 L29,12 L21,19 L24,29 L16,23.5 L8,29 L11,19 L3,12 L13.5,13 Z"
        stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"
      />
    </svg>
  ),
  cross: (s) => (
    <svg width={s} height={s} viewBox="0 0 32 32" fill="none">
      <path
        d="M16,4 L16,28 M4,16 L28,16"
        stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"
      />
    </svg>
  ),
};

interface FloatingDoodleProps {
  type: DoodleShape;
  size?: number;
  className?: string;
  delay?: number;
  duration?: number;
  opacity?: number;
  amplitude?: number;
}

export default function FloatingDoodle({
  type,
  size = 30,
  className,
  delay = 0,
  duration = 4,
  opacity = 0.3,
  amplitude = 8,
}: FloatingDoodleProps) {
  // Each shape gets a slight rotation arc to feel like it's floating in air,
  // not sliding on a rail. Magnitude varies by shape for variety.
  const rotateMap: Record<DoodleShape, number[]> = {
    sparkle:  [0,  4, -2,  0],
    squiggle: [0, -3,  2,  0],
    circle:   [0,  2, -3,  0],
    dots:     [0,  3, -1,  0],
    star:     [0, -4,  3, -1, 0],
    cross:    [0,  5, -3,  0],
  };

  return (
    <motion.div
      className={cn("pointer-events-none select-none text-ink", className)}
      style={{ opacity }}
      animate={{
        y:      [0, -amplitude, 0],
        rotate: rotateMap[type],
      }}
      transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
    >
      {shapes[type](size)}
    </motion.div>
  );
}
