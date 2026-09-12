"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { useRef } from "react";

import { SPRING } from "@/lib/config/motion";
import { cn } from "@/lib/utils/cn";

import { useReducedMotion } from "./use-reduced-motion";

/**
 * Drifts its child toward the pointer while the pointer is over it. Used on the
 * primary CTA and the logo — sparingly, or it turns into a fairground.
 */
export function Magnetic({
  className,
  children,
  strength = 0.25,
  ...props
}: React.ComponentProps<"div"> & { strength?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const x = useSpring(useMotionValue(0), SPRING.soft);
  const y = useSpring(useMotionValue(0), SPRING.soft);

  if (reduced) {
    return (
      <div className={className} {...props}>
        {children}
      </div>
    );
  }

  function onMove(event: React.PointerEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((event.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((event.clientY - (rect.top + rect.height / 2)) * strength);
  }

  function onLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      className={cn("inline-block", className)}
      style={{ x, y }}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      {...(props as React.ComponentProps<typeof motion.div>)}
    >
      {children}
    </motion.div>
  );
}
