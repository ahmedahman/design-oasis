# Design Oasis — design system

The reference for how the UI is built here. Tokens live in `src/app/globals.css`
(`@theme`); this explains the system around them. Read alongside `AGENTS.md`.

---

## 1. The idea

**"A gallery with a balance sheet behind it."** Design Oasis is not a decorator — it
is a developer that designs. The site should read calm, expensive and evidence-led:
big photography, thin rules, generous air, numbers stated plainly.

Warm luxe editorial, adapted from the Interiox / Indochine references, with the
interaction language taken from Remy Shoots (the view morph) and Pinnacl (the
draggable hero, the column rules, the data-attribute cursor).

## 2. Tokens

Never hardcode a hex or a px in a component. If a value is not a token, add it first.

| Group     | Tokens                                                                            |
| --------- | --------------------------------------------------------------------------------- |
| Surfaces  | `canvas` (bone) · `surface` · `surface-muted`                                     |
| Ground    | `navy-950` (scrims, footer, dark bands) · `navy-900` (the logo navy) · `navy-800` |
| Accent    | `lime` (the logo lime) · `lime-dark` · `lime-light` · `lime-wash`                 |
| Lines     | `border` · `border-strong`                                                        |
| Text      | `foreground` · `muted` · `muted-light`                                            |
| Semantic  | `dark` · `light` · `accent` — aliases so components name intent                   |
| Type      | `font-display` (Fraunces) · `font-sans` (Geist)                                   |
| Radii     | `sm` 4 · `lg` 8 · `2xl` 12 — tight; this is architecture                          |
| Elevation | `shadow-card` · `shadow-raised` · `shadow-modal`                                  |
| Chrome    | `spacing-gutter` · `spacing-header` · `spacing-header-offset`                     |

**One accent, used sparingly.** Lime is for CTAs, active states, rules and hovers.
If a third hue seems necessary, the layout is doing too little.

> Navy and lime are sampled from the brand logo PNGs. Reconcile against the real
> brand values before they are treated as final.

### Fonts must sit on `<html>`

`--font-display` is declared on `:root`, and a `var()` inside a custom property
resolves in the scope where it is **declared**. Put the `next/font` variable classes
on `<body>` and every font token computes to invalid and silently falls back. They
belong on `<html>`.

## 3. Motion

Defined once in `src/lib/config/motion.ts`. Nothing specifies its own duration or
easing at a call site.

```
ease.out    cubic-bezier(0.16, 1, 0.3, 1)     entrances, reveals
ease.morph  cubic-bezier(0.65, 0, 0.35, 1)    layout morphs, view changes
duration    micro .18 · standard .42 · reveal .8 · page .6   (seconds)
stagger     .06 between siblings
```

Four patterns carry the site:

1. **Image reveal** (`ImageReveal`) — a clip-path wipe from the bottom while the image
   scales 1.08 → 1, so the photograph settles rather than fades.
2. **Line-masked text** (`RevealText`) — headlines split by line, each rising out of an
   overflow mask on a stagger.
3. **Pinned ground** — the hero is `fixed` inside an `h-svh` section clipped by
   `[clip-path:inset(0)]`, so content scrolls up over a stationary image.
4. **Lenis smooth scroll** under everything.

Reduced motion is handled in CSS, not by branching components on it. The server
cannot know the preference, so a component that renders different markup for it
mismatches on hydration — `MotionConfig reducedMotion="user"` plus the
`prefers-reduced-motion` block in `globals.css` neutralise the motion instead,
and every component renders one tree.

### `ImageReveal` has three layers on purpose

IntersectionObserver computes its ratio **after** clipping. An element that starts at
`clip-path: inset(100%)` reports a ratio of zero and can never satisfy
`viewport.amount` — it hides itself from its own trigger. So the observed element
carries no clip; the clip sits on a child that inherits the variant state.

## 4. Components

- `components/ui/` — `Button`, `Badge`, `Input`, `Textarea`. Squared, not pill.
- `components/motion/` — every animation in the app goes through these.
- `components/chrome/` — `ColumnRules`, the editorial hairline overlay.
- `components/layout/` — `Container`, `Section`, `PageHeader`, `SiteHeader`, `SiteFooter`.
- `components/forms/` — `FormField` (label + control + error in one).
- `components/shared/` — `BrandLogo`, `SectionHeading`, `StatBand`.

`Section` takes `tone` (`canvas` · `surface` · `muted` · `dark`) and `rules`.
`className` lands on the `<section>`; use `contentClassName` for the inner block.

`PageHeader` is the top of every page that does not open on the hero — it clears the
fixed header once, and renders the page's `h1`. Exactly one `h1` per page.

## 5. The cursor is data attributes

No provider, no client wrapper. Any element — server components included — opts in:

```html
<a data-cursor-label="View project">
  <!-- grows to a labelled disc -->
  <div data-cursor-drag data-cursor-label="Drag">
    <section data-cursor-theme="dark"></section></div
></a>
```

One listener at the root resolves the hovered element with `closest()`.

## 6. The hero

`features/hero/` is the only place `three` may be imported, and the scene always loads
through `next/dynamic` with `ssr: false` behind a poster. It refuses to load at all on
no-WebGL, `saveData`, or under 4 GiB device memory — the poster simply stays.

Swap `public/hero/panorama.png` for a real 2:1 equirectangular interior and delete
`scripts/generate-hero-placeholder.mjs`.

## 7. Placeholders to replace

| What                   | Where                                         |
| ---------------------- | --------------------------------------------- |
| Logo lockup            | `components/shared/brand-logo.tsx` (drawn)    |
| Hero panorama + poster | `public/hero/` + its generator script         |
| Floor plans            | `public/plans/` + its generator script        |
| Project photography    | `lib/fixtures/projects.fixture.ts` (Unsplash) |
