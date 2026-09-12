"use client";

import Lenis from "lenis";
import { useEffect } from "react";

import { useReducedMotion } from "./use-reduced-motion";

/**
 * Lenis under everything. Mounted once in the root layout.
 *
 * Smooth scroll is the cheapest large gain in perceived quality — and the one
 * thing every reference site for this project has in common.
 */
export function SmoothScroll() {
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;

    const lenis = new Lenis({
      duration: 1.1,
      // Expo-out, matching EASE_OUT in lib/config/motion.
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 1.6,
    });

    let frame = 0;
    function raf(time: number) {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    }
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, [reduced]);

  return null;
}
