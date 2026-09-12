"use client";

import { MotionConfig } from "motion/react";

/**
 * `reducedMotion="user"` tells Motion to skip transform and layout animations
 * when the user asks for reduced motion, without any component having to branch
 * on it.
 *
 * That branch is the point. The server cannot know the preference, so a
 * component that renders different markup for it will always mismatch on
 * hydration. Primitives here render one tree; this config plus the
 * `prefers-reduced-motion` block in globals.css neutralise the motion.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
