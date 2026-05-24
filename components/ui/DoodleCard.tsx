"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface DoodleCardProps {
  children: React.ReactNode;
  className?: string;
  lift?: boolean;
}

export default function DoodleCard({
  children,
  className,
  lift = true,
}: DoodleCardProps) {
  return (
    <motion.div
      whileHover={
        lift
          ? { y: -5, boxShadow: "4px 6px 0px #1A1714" }
          : {}
      }
      transition={{ type: "spring", stiffness: 360, damping: 18 }}
      className={cn(
        // Sketch-border feel: each corner is slightly different radius
        "rounded-[18px_20px_16px_19px]",
        "bg-bg-card border border-ink-faint",
        "shadow-[2px_3px_0px_#C9C5BF]",
        "p-6",
        className
      )}
    >
      {children}
    </motion.div>
  );
}
