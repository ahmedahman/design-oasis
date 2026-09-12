"use client";

import { motion } from "motion/react";

import { STAGGER, TRANSITION, VIEWPORT } from "@/lib/config/motion";
import { cn } from "@/lib/utils/cn";

import { useReducedMotion } from "./use-reduced-motion";

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
  const reduced = useReducedMotion();

  if (reduced)
    return (
      <div className={className} {...props}>
        {children}
      </div>
    );

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

/** A child of a `stagger` Reveal. Inherits the parent's timing. */
export function RevealItem({ className, children, ...props }: React.ComponentProps<"div">) {
  const reduced = useReducedMotion();

  if (reduced)
    return (
      <div className={className} {...props}>
        {children}
      </div>
    );

  return (
    <motion.div
      data-reveal
      className={cn(className)}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: TRANSITION.reveal },
      }}
      {...(props as React.ComponentProps<typeof motion.div>)}
    >
      {children}
    </motion.div>
  );
}
