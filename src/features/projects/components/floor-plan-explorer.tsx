"use client";

import { Minus, Plus, RotateCcw } from "lucide-react";
import { animate, motion, useMotionValue } from "motion/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { SPRING, TRANSITION } from "@/lib/config/motion";
import { cn } from "@/lib/utils/cn";
import type { FloorPlan, FloorPlanHotspot } from "@/types/project";

const MIN_SCALE = 1;
const MAX_SCALE = 3.2;
const STEP = 0.35;

/**
 * A pan-and-zoom floor plan with hotspots.
 *
 * Hotspots are stored in normalized 0–1 coordinates so they survive any plan
 * image size or re-export.
 *
 * Nothing here branches on `prefers-reduced-motion`: the server cannot know the
 * preference, so markup that differs by it is a hydration mismatch. Motion is
 * neutralised by `MotionConfig reducedMotion="user"` and the media query in
 * globals.css, and the room list below the plan is always rendered — it is the
 * accessible spine of the feature, not a consolation prize, and is how the
 * content reads for anyone who never touches the drawing.
 */
export function FloorPlanExplorer({ plan }: { plan: FloorPlan }) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(MIN_SCALE);
  const [active, setActive] = useState<FloorPlanHotspot | null>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  /* The frame's size, measured rather than read from the ref during render.
     Motion's ref-based dragConstraints measure the *layout* box, which ignores
     the scale transform and yields no travel at all — so the allowance is
     computed here from the live size and the current zoom. */
  const [frame, setFrame] = useState({ width: 0, height: 0 });
  useEffect(() => {
    const element = viewportRef.current;
    if (!element) return;
    const observer = new ResizeObserver(([entry]) => {
      setFrame({ width: entry.contentRect.width, height: entry.contentRect.height });
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const boundX = Math.max(0, (frame.width * (scale - 1)) / 2);
  const boundY = Math.max(0, (frame.height * (scale - 1)) / 2);
  const clamp = (value: number, limit: number) => Math.min(limit, Math.max(-limit, value));

  /* `animate` rather than `.set()`: after a drag, Motion still owns these
     values, and a bare set is liable to be overwritten by the gesture's own
     settle. Animating takes control back and cancels whatever was in flight. */
  function recentre() {
    animate(x, 0, TRANSITION.standard);
    animate(y, 0, TRANSITION.standard);
  }

  function zoom(direction: 1 | -1) {
    setScale((current) => {
      const next = Math.min(MAX_SCALE, Math.max(MIN_SCALE, current + direction * STEP));
      if (next === MIN_SCALE) recentre();
      return next;
    });
  }

  function reset() {
    setScale(MIN_SCALE);
    recentre();
    setActive(null);
  }

  function onKeyDown(event: React.KeyboardEvent) {
    const pan = 60;
    const moves: Record<string, () => void> = {
      ArrowLeft: () => x.set(clamp(x.get() + pan, boundX)),
      ArrowRight: () => x.set(clamp(x.get() - pan, boundX)),
      ArrowUp: () => y.set(clamp(y.get() + pan, boundY)),
      ArrowDown: () => y.set(clamp(y.get() - pan, boundY)),
      "+": () => zoom(1),
      "=": () => zoom(1),
      "-": () => zoom(-1),
      Escape: reset,
    };
    const move = moves[event.key];
    if (!move) return;
    event.preventDefault();
    move();
  }

  const zoomed = scale > MIN_SCALE;

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
        <p className="text-muted text-sm">
          Zoom in and drag to move around the plan. Every room is listed below it.
        </p>
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => zoom(-1)}
            disabled={scale <= MIN_SCALE}
            aria-label="Zoom out"
          >
            <Minus />
          </Button>
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => zoom(1)}
            disabled={scale >= MAX_SCALE}
            aria-label="Zoom in"
          >
            <Plus />
          </Button>
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={reset}
            disabled={!zoomed}
            aria-label="Reset plan"
          >
            <RotateCcw />
          </Button>
        </div>
      </div>

      <div
        ref={viewportRef}
        className="bg-surface-muted border-border relative w-full overflow-hidden border"
        style={{ aspectRatio: `${plan.width} / ${plan.height}` }}
        role="group"
        aria-label={`Floor plan: ${plan.alt}. Use arrow keys to pan, plus and minus to zoom, escape to reset.`}
        tabIndex={0}
        onKeyDown={onKeyDown}
        data-cursor-drag={zoomed ? true : undefined}
        data-cursor-label={zoomed ? "Drag" : undefined}
      >
        <motion.div
          className={cn("absolute inset-0", zoomed && "cursor-grab active:cursor-grabbing")}
          drag={zoomed}
          dragConstraints={{ left: -boundX, right: boundX, top: -boundY, bottom: boundY }}
          dragElastic={0.06}
          style={{ x, y }}
          animate={{ scale }}
          transition={SPRING.soft}
        >
          <Image
            src={plan.src}
            alt={plan.alt}
            fill
            sizes="(max-width: 1024px) 100vw, 66vw"
            className="object-cover"
            draggable={false}
            /* Plans are our own SVGs; the optimizer refuses SVG by default and
               there is nothing to gain from rasterising a line drawing. */
            unoptimized
          />

          {plan.hotspots.map((hotspot) => (
            <button
              key={hotspot.id}
              type="button"
              onClick={() => setActive(hotspot)}
              aria-label={`${hotspot.label} — show detail`}
              className="group absolute -translate-x-1/2 -translate-y-1/2 p-3"
              style={{ left: `${hotspot.x * 100}%`, top: `${hotspot.y * 100}%` }}
            >
              <span className="bg-lime ring-lime/30 group-hover:ring-lime/60 block size-3 rounded-full ring-4 transition-all group-hover:scale-125" />
              <span className="bg-navy-950 pointer-events-none absolute top-1/2 left-8 -translate-y-1/2 rounded-sm px-2.5 py-1 text-[10px] tracking-[0.14em] whitespace-nowrap text-white uppercase opacity-0 transition-opacity group-hover:opacity-100">
                {hotspot.label}
              </span>
            </button>
          ))}
        </motion.div>

        {active && (
          <div className="bg-surface border-border shadow-raised absolute right-4 bottom-4 left-4 max-w-sm border p-5">
            <div className="flex items-start justify-between gap-4">
              <h3 className="font-display text-xl tracking-tight">{active.label}</h3>
              <button
                type="button"
                onClick={() => setActive(null)}
                className="text-muted hover:text-foreground px-2 py-1 text-[10px] tracking-[0.16em] uppercase"
              >
                Close
              </button>
            </div>
            <p className="text-muted mt-2.5 text-sm">{active.detail}</p>
          </div>
        )}
      </div>

      <dl className="mt-8 grid gap-x-10 gap-y-6 sm:grid-cols-2">
        {plan.hotspots.map((hotspot) => (
          <div key={hotspot.id} className="border-border border-t pt-4">
            <dt className="font-display text-lg tracking-tight">{hotspot.label}</dt>
            <dd className="text-muted mt-1.5 text-sm">{hotspot.detail}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
