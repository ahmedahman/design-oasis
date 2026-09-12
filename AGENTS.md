<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

---

# Design Oasis — project guidance

Read this before adding pages, components, or architecture changes.
See `README.md` for how to run it and `DESIGN.md` for the visual system.

## What this is

The marketing site for **Design Oasis Limited** (Maitama, Abuja) — a multidisciplinary
real estate development and architectural firm. It does two jobs at once: read as a
design studio worth hiring, and convert landowners into Joint Venture conversations.

**Push 1 is the public site on fixture data** — there is no database and no CMS yet.

## Non-negotiables

1. **If you write the same markup twice, extract a component.** Never recreate a
   primitive that already exists in `components/ui/`. Reach for the existing one and
   extend it with a variant. This is THE rule — everything else supports it.

2. **All motion goes through `components/motion/` primitives.** No inline `<motion.div>`
   carrying an ad-hoc transition object in a page or feature. Durations and easings come
   from `lib/config/motion.ts`. This is what keeps one motion language across the site
   instead of forty slightly different fades.

3. **No hardcoded hex or px in a component.** Tokens live in the `@theme` block in
   `src/app/globals.css`. If a value is not a token, add the token first.

4. **Nothing outside `src/lib/data/` may import from `src/lib/fixtures/`.**
   This is the seam that makes the CMS swap free. Add a function to `lib/data/` rather
   than reaching past it.

5. **Config over markup.** Navigation, services, sectors and project types are data in
   `src/lib/config/`. Adding one is a config edit, never a change in two places.

6. **Server Components by default.** Add `"use client"` only for interactivity. Motion
   components are the client leaves of an otherwise server-rendered tree.

7. **View state lives in the URL, never in a store** (`/projects?view=grid`). This keeps
   a view shareable and the page server-rendered.

8. **Routes come from `lib/constants/routes.ts`.** No magic strings.

9. **three.js is confined to `features/hero/`.** Nothing outside that folder may import
   from `three` or `@react-three/*`, and the scene is always loaded through
   `next/dynamic` with `ssr: false` behind a poster image.

10. **`lint`, `typecheck` and `build` must all pass** before work is done.

## Where things go

- Generic and reusable → `components/ui`, `components/layout`, `components/motion`,
  `components/chrome`, `lib/`
- Domain views, schemas, helpers → `features/<name>/`
- Route files stay thin: compose from features, do not build UI inline.

## Conventions

- Imports use the `@/` alias. Components `PascalCase`, files `kebab-case`.
- Forms are React Hook Form + Zod v4 via `standardSchemaResolver`. Use `Controller` for
  Radix controls — `watch()`/`setValue()` trips the React Compiler lint.
- Variants are CVA; class merging is `cn()` from `lib/utils/cn.ts`.
- The custom cursor is driven by **data attributes**, not context: put
  `data-cursor-label="View"`, `data-cursor-theme="dark"` or `data-cursor-drag` on any
  element, including server components. Never add a client wrapper just for the cursor.
- Every animation respects `prefers-reduced-motion`, handled inside the motion primitive
  so pages never have to remember.
- Copy is plain and specific. Say what a thing is, not how excited we are about it.

## Not the ITPC portal

This repo follows the *architecture* rules of the ITPC portal frontend. It shares **none
of its visual design** — no dark-green government palette, no notched `FieldShell` inputs,
no sidebar app shell. Design Oasis is warm luxe editorial; see `DESIGN.md`.

## Commits

Write commit messages as if authored solely by the human developer. Never add a
`Co-Authored-By` trailer and never mention AI assistance.
