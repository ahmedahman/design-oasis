"use client";

import { motion } from "motion/react";

import { TRANSITION, VIEWPORT } from "@/lib/config/motion";
import { cn } from "@/lib/utils/cn";

/**
 * A clip-path wipe from the bottom while the image inside scales 1.08 → 1, so
 * the photograph *settles* rather than fading in.
 *
 * This is the single pattern most responsible for how expensive the site feels.
 * Every project image, hero still and editorial photo goes through it.
 *
 * Three layers, and the split matters: IntersectionObserver computes its ratio
 * AFTER clipping, so an element that starts at `inset(100%)` reports a ratio of
 * zero and can never satisfy `viewport.amount` — it hides itself from its own
 * trigger. The observed element therefore carries no clip; the clip sits on a
 * child, which inherits the variant state.
 */
export function ImageReveal({
  className,
  children,
  delay = 0,
  ...props
}: React.ComponentProps<"div"> & { delay?: number }) {
  const transition = { ...TRANSITION.reveal, delay };

  return (
    <motion.div
      className={cn("overflow-hidden", className)}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      {...(props as React.ComponentProps<typeof motion.div>)}
    >
      <motion.div
        data-reveal
        className="h-full w-full"
        variants={{
          hidden: { clipPath: "inset(100% 0% 0% 0%)" },
          visible: { clipPath: "inset(0% 0% 0% 0%)", transition },
        }}
      >
        <motion.div
          data-reveal
          className="h-full w-full"
          variants={{
            hidden: { scale: 1.08 },
            visible: { scale: 1, transition },
          }}
        >
          {children}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
