"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface ButtonProps {
  variant?: "primary" | "outline";
  size?: "md" | "lg" | "xl";
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  target?: string;
  rel?: string;
}

const base =
  "inline-flex items-center justify-center gap-2 " +
  "font-body tracking-wide font-medium cursor-pointer select-none " +
  "transition-all duration-150 rounded-[14px_16px_14px_15px]";

const sizes = {
  md: "px-7 py-3.5 text-sm",
  lg: "px-10 py-4 text-base",
  xl: "px-12 py-5 text-lg",
};

const variants = {
  primary:
    "bg-ink text-bg-base border-2 border-ink " +
    "shadow-[3px_3px_0px_#1A1714] hover:shadow-[4px_4px_0px_#1A1714] " +
    "active:shadow-[1px_1px_0px_#1A1714] active:translate-y-[1px]",
  outline:
    "bg-bg-base text-ink border-2 border-ink " +
    "shadow-[3px_3px_0px_#1A1714] hover:shadow-[4px_4px_0px_#1A1714] hover:bg-warm " +
    "active:shadow-[1px_1px_0px_#1A1714] active:translate-y-[1px]",
};

export default function Button({
  variant = "primary",
  size = "md",
  children,
  href,
  onClick,
  className,
  target,
  rel,
}: ButtonProps) {
  const classes = cn(base, sizes[size], variants[variant], className);

  if (href) {
    // Internal routes: plain Next.js Link — className passes through correctly.
    // active: pseudo-class handles the press feedback via CSS.
    if (href.startsWith("/")) {
      return (
        <Link href={href} className={classes}>
          {children}
        </Link>
      );
    }

    // External URLs: motion.a for tap animation + target/rel support.
    return (
      <motion.a
        href={href}
        target={target}
        rel={rel}
        whileTap={{ scale: 0.97 }}
        className={classes}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      onClick={onClick}
      whileTap={{ scale: 0.97 }}
      className={classes}
    >
      {children}
    </motion.button>
  );
}
