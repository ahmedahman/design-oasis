"use client";

import { motion } from "motion/react";
import { usePathname } from "next/navigation";

import { TRANSITION } from "@/lib/config/motion";

/**
 * The route curtain. Rendered from `app/template.tsx`, which React remounts on
 * every navigation, so keying on the pathname is enough to replay it.
 *
 * Deliberately exit-less: `AnimatePresence mode="wait"` around a Next.js route
 * would hold the old page while the new one is already streaming, which fights
 * the router and breaks scroll restoration. A curtain that wipes away over the
 * newly-mounted page reads the same without it.
 *
 * Reduced motion is handled in CSS (`[data-curtain]` is hidden outright) rather
 * than by branching here — the server cannot know the preference, and markup
 * that differs between server and client is a hydration mismatch.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <>
      <motion.div
        key={pathname}
        data-curtain
        aria-hidden
        className="bg-dark pointer-events-none fixed inset-0 z-90 origin-top"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={TRANSITION.page}
        style={{ transformOrigin: "top" }}
      />
      {children}
    </>
  );
}
