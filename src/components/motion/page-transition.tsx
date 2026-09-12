"use client";

import { motion } from "motion/react";
import { usePathname } from "next/navigation";

import { TRANSITION } from "@/lib/config/motion";

import { useReducedMotion } from "./use-reduced-motion";

/**
 * The route curtain. Rendered from `app/template.tsx`, which React remounts on
 * every navigation — so keying on the pathname is enough to replay it.
 *
 * Deliberately an *exit-less* transition: `AnimatePresence mode="wait"` around
 * a Next.js route would hold the old page while the new one is already
 * streaming, which fights the router and breaks scroll restoration. A curtain
 * that wipes away over the newly-mounted page gets the same read without it.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const reduced = useReducedMotion();

  if (reduced) return <>{children}</>;

  return (
    <>
      <motion.div
        key={pathname}
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
