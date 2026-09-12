"use client";

import { useReducedMotion as useMotionReducedMotion } from "motion/react";

/**
 * Re-exported so every primitive imports reduced-motion from one place, and so
 * the fallback when the hook returns `null` (server / first paint) is decided
 * once: assume motion is allowed, then correct on hydration.
 */
export function useReducedMotion(): boolean {
  return useMotionReducedMotion() ?? false;
}
