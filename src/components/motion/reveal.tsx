"use client";

import { motion } from "motion/react";

import { STAGGER, TRANSITION, VIEWPORT } from "@/lib/config/motion";
import { cn } from "@/lib/utils/cn";

type RevealProps = React.ComponentProps<"div"> & {
  /** Seconds to wait before this element starts. */
  delay?: number;
  /** Distance travelled, in px. */
  distance?: number;
  /** Stagger direct children instead of animating as one block. */
  stagger?: boolean;
};

/**
 * The default entrance: a short rise into place as the element enters view.
 * Reach for this before writing any bespoke animation.
 */
export function Reveal({
  className,
  children,
  delay = 0,
  distance = 24,
  stagger = false,
  ...props
}: RevealProps) {
  return (
    <motion.div
      data-reveal
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      variants={{
        hidden: { opacity: 0, y: distance },
        visible: {
          opacity: 1,
          y: 0,
          transition: stagger
            ? { ...TRANSITION.reveal, delay, staggerChildren: STAGGER }
            : { ...TRANSITION.reveal, delay },
        },
      }}
      {...(props as React.ComponentProps<typeof motion.div>)}
    >
      {children}
    </motion.div>
  );
}

/**
 * A child of a `stagger` Reveal. Inherits the parent's timing.
 *
 * `as` matters for more than tidiness: a div inside a <ul> is invalid markup
 * and stops the list being announced as a list, so any RevealItem used inside
 * one must pass `as="li"`.
 */
export function RevealItem({
  className,
  children,
  as = "div",
  ...props
}: React.ComponentProps<"div"> & { as?: "div" | "li" }) {
  /* Cast so the spread props type against one element. The two differ only in
     their ref type, and nothing here passes a ref. */
  const MotionTag = (as === "li" ? motion.li : motion.div) as typeof motion.div;

  return (
    <MotionTag
      data-reveal
      className={cn(className)}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: TRANSITION.reveal },
      }}
      {...(props as React.ComponentProps<typeof motion.div>)}
    >
      {children}
    </MotionTag>
  );
}
