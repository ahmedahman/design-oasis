/**
 * The motion language, defined once.
 *
 * What separates the reference sites from ordinary ones is not the library —
 * it is that every animation on the page shares an easing curve and a sense of
 * timing. Nothing in this repo specifies its own duration or ease inline.
 */

/** Expo-out. Fast departure, long settle — the reason motion reads "expensive". */
export const EASE_OUT = [0.16, 1, 0.3, 1] as const;

/** Symmetric. For morphs, where the element is travelling, not arriving. */
export const EASE_MORPH = [0.65, 0, 0.35, 1] as const;

/** Seconds, because that is what Motion takes. */
export const DURATION = {
  micro: 0.18,
  standard: 0.42,
  reveal: 0.8,
  page: 0.6,
} as const;

/** Between siblings in a staggered group. */
export const STAGGER = 0.06;

/** Ready-made transitions. Prefer these over assembling one at the call site. */
export const TRANSITION = {
  micro: { duration: DURATION.micro, ease: EASE_OUT },
  standard: { duration: DURATION.standard, ease: EASE_OUT },
  reveal: { duration: DURATION.reveal, ease: EASE_OUT },
  page: { duration: DURATION.page, ease: EASE_MORPH },
  morph: { duration: DURATION.standard, ease: EASE_MORPH },
} as const;

/** For the cursor and anything else that should feel weighted rather than timed. */
export const SPRING = {
  cursor: { stiffness: 520, damping: 38, mass: 0.6 },
  soft: { stiffness: 220, damping: 30 },
} as const;

/** How far into the viewport an element travels before it reveals. */
export const VIEWPORT = { once: true, amount: 0.25 } as const;
