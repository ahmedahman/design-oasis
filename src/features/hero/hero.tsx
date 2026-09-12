"use client";

import { AnimatePresence, motion } from "motion/react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useState } from "react";

import { useReducedMotion } from "@/components/motion";
import { TRANSITION } from "@/lib/config/motion";

import { cn } from "@/lib/utils/cn";

import { useWebGLSupport } from "./use-webgl-support";

/* three.js lands in its own chunk, fetched only once the poster is on screen
   and the device has been cleared as capable. */
const HeroScene = dynamic(() => import("./hero-scene").then((m) => m.HeroScene), {
  ssr: false,
});

type HeroProps = {
  /** Equirectangular panorama, 2:1. */
  panorama: string;
  /** Shown immediately, and kept as the whole hero wherever WebGL is refused. */
  poster: string;
  posterAlt: string;
};

/**
 * The draggable hero. A poster paints first; the scene fades in over it once
 * three.js has loaded. If WebGL is unavailable, data-saver is on, or the device
 * reports too little memory, the poster simply stays — there is no error state
 * because there is no failure, only a quieter hero.
 */
export function Hero({ panorama, poster, posterAlt }: HeroProps) {
  const support = useWebGLSupport();
  const reduced = useReducedMotion();
  const [sceneReady, setSceneReady] = useState(false);
  const [hasDragged, setHasDragged] = useState(false);

  // Give the poster a frame to paint before we start fetching three.js.
  const [mountScene, setMountScene] = useState(false);
  useEffect(() => {
    if (support !== "ok") return;
    const id = window.setTimeout(() => setMountScene(true), 120);
    return () => window.clearTimeout(id);
  }, [support]);

  useEffect(() => {
    if (!mountScene) return;
    // The canvas has no load event; this is simply when we allow the crossfade.
    const id = window.setTimeout(() => setSceneReady(true), 600);
    return () => window.clearTimeout(id);
  }, [mountScene]);

  const interactive = support === "ok" && sceneReady;

  return (
    <div
      className={cn(
        "absolute inset-0 overflow-hidden",
        interactive && "cursor-grab touch-none [body[data-dragging]_&]:cursor-grabbing",
      )}
      data-cursor-theme="dark"
      {...(interactive ? { "data-cursor-drag": true, "data-cursor-label": "Click & drag" } : {})}
    >
      <Image src={poster} alt={posterAlt} fill priority sizes="100vw" className="object-cover" />

      {mountScene && (
        <AnimatePresence>
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: sceneReady ? 1 : 0 }}
            transition={TRANSITION.reveal}
          >
            <HeroScene src={panorama} drift={!reduced} onFirstDrag={() => setHasDragged(true)} />
          </motion.div>
        </AnimatePresence>
      )}

      {/* Seats the scene so its edges do not read as a pasted rectangle. */}
      <div className="shadow-scene-vignette pointer-events-none absolute inset-0 z-5" aria-hidden />
      <div className="bg-hero-scrim pointer-events-none absolute inset-0 z-6" aria-hidden />

      {/* The cursor announces the drag, but only where there is a cursor. Without
          this most phone visitors never discover the site's one real
          interaction. It appears only once the scene is actually live — there is
          nothing to drag while the poster is standing in for it — and retires
          for good after the first drag. */}
      <AnimatePresence>
        {interactive && !hasDragged && (
          <motion.p
            className="text-light/85 right-gutter pointer-events-none absolute bottom-8 z-7 flex items-center gap-2.5 text-[10px] tracking-[0.2em] uppercase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={TRANSITION.standard}
          >
            <span aria-hidden>&#8596;</span>
            Drag to look around
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
