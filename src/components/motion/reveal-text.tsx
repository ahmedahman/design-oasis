"use client";

import { motion } from "motion/react";
import { createElement } from "react";

import { STAGGER, TRANSITION, VIEWPORT } from "@/lib/config/motion";
import { cn } from "@/lib/utils/cn";

import { useReducedMotion } from "./use-reduced-motion";

type RevealTextProps = {
  /**
   * The lines, split by the author rather than measured at runtime. Explicit
   * line breaks are a design decision — a headline should break where it reads
   * best, not where the viewport happens to wrap it.
   */
  lines: readonly string[];
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
  lineClassName?: string;
  delay?: number;
};

/**
 * Line-masked headline. Each line translates up out of an overflow mask on a
 * stagger — the second of the three patterns that carry the site.
 *
 * The full string is exposed to assistive tech as one label so a screen reader
 * hears a sentence, not a list of fragments.
 */
export function RevealText({
  lines,
  as = "h2",
  className,
  lineClassName,
  delay = 0,
}: RevealTextProps) {
  const reduced = useReducedMotion();
  const label = lines.join(" ");

  if (reduced) {
    return createElement(
      as,
      { className: cn(className) },
      lines.map((line) => (
        <span key={line} className={cn("block", lineClassName)}>
          {line}
        </span>
      )),
    );
  }

  const Tag = motion[as];

  return (
    <Tag
      className={cn(className)}
      aria-label={label}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      transition={{ delayChildren: delay, staggerChildren: STAGGER }}
    >
      {lines.map((line) => (
        <span key={line} aria-hidden className="block overflow-hidden">
          <motion.span
            data-reveal
            className={cn("block", lineClassName)}
            variants={{
              hidden: { y: "110%" },
              visible: { y: "0%", transition: TRANSITION.reveal },
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
