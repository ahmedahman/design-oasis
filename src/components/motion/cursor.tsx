"use client";

import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useState } from "react";

import { SPRING, TRANSITION } from "@/lib/config/motion";

type CursorState = { label: string | null; drag: boolean; active: boolean };

/**
 * The custom cursor, driven by data attributes rather than React context.
 *
 * Any element — including a server component — opts in with a plain attribute:
 *
 *   data-cursor-label="View project"   grows the cursor to a labelled disc
 *   data-cursor-drag                   shows the drag affordance
 *
 * A single listener at the root resolves the hovered element with `closest()`.
 * That means no provider, no client wrapper, and nothing to remember to wire up.
 */
export function Cursor() {
  const [state, setState] = useState<CursorState>({ label: null, drag: false, active: false });
  const [enabled, setEnabled] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, SPRING.cursor);
  const sy = useSpring(y, SPRING.cursor);

  useEffect(() => {
    // A custom cursor on a touch device is a cursor nobody can see.
    const fine = window.matchMedia("(pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setEnabled(fine.matches && !reduced.matches);

    sync();
    fine.addEventListener("change", sync);
    reduced.addEventListener("change", sync);
    return () => {
      fine.removeEventListener("change", sync);
      reduced.removeEventListener("change", sync);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;

    function onMove(event: PointerEvent) {
      x.set(event.clientX);
      y.set(event.clientY);

      const target = event.target as Element | null;
      const hit = target?.closest?.("[data-cursor-label],[data-cursor-drag],a,button");

      if (!hit) {
        setState({ label: null, drag: false, active: false });
        return;
      }

      setState({
        label: hit.getAttribute("data-cursor-label"),
        drag: hit.hasAttribute("data-cursor-drag"),
        active: true,
      });
    }

    function onLeave() {
      setState({ label: null, drag: false, active: false });
    }

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  const labelled = Boolean(state.label);

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-100 mix-blend-difference"
      style={{ x: sx, y: sy }}
    >
      <motion.div
        className="flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white"
        animate={{
          width: labelled ? 88 : state.active ? 40 : 12,
          height: labelled ? 88 : state.active ? 40 : 12,
        }}
        transition={TRANSITION.standard}
      >
        <AnimatePresence>
          {labelled && (
            <motion.span
              key={state.label}
              className="px-2 text-center text-[10px] leading-tight font-medium tracking-wide text-black uppercase"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={TRANSITION.micro}
            >
              {state.label}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
