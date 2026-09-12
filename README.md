# Design Oasis

Marketing site for **Design Oasis Limited** — a real estate development and
architectural firm in Maitama, Abuja.

## Run it

```bash
npm install
npm run dev          # http://localhost:3000
```

| Script              | Does                           |
| ------------------- | ------------------------------ |
| `npm run dev`       | Dev server                     |
| `npm run build`     | Production build — must pass   |
| `npm run lint`      | ESLint — must be clean         |
| `npm run typecheck` | `tsc --noEmit` — must be clean |
| `npm run format`    | Prettier                       |

Copy `.env.example` to `.env.local`. Everything runs without any of it set.

## Routes

| Route              | What it is                                                  |
| ------------------ | ----------------------------------------------------------- |
| `/`                | Draggable WebGL hero, positioning, featured work, JV teaser |
| `/projects`        | Slider ↔ grid ↔ list morph, filterable by sector            |
| `/projects/[slug]` | Gallery, facts, drag-to-explore floor plan, next project    |
| `/services`        | Design & Build · Development · Architecture                 |
| `/partner`         | The landowner track: JV structure, returns, land submission |
| `/studio`          | Vision, mission, values, team, corporate detail             |
| `/contact`         | Enquiry form and contact points                             |
| `/api/enquiries`   | Both forms POST here                                        |

## How it is built

Next.js 16 (App Router) · React 19 · TypeScript strict · Tailwind v4 ·
Motion + Lenis · three.js (hero only) · React Hook Form + Zod.

Read **`AGENTS.md`** before changing anything — it carries the rules this repo is
held to. **`DESIGN.md`** covers the visual and motion system.

The short version:

- Never rebuild a primitive that exists in `components/ui/`.
- All animation goes through `components/motion/`; timings come from `lib/config/motion.ts`.
- No hardcoded hex or px in a component — tokens live in `globals.css`.
- Only `lib/data/` may touch `lib/fixtures/`; only `features/hero/` may touch three.js.
  Both are enforced by ESLint.

## Content

Push 1 runs on fixtures — there is no CMS. Project content is real, taken from the
company profile; photography, the hero panorama and the floor plans are placeholders.
`DESIGN.md` §7 lists every one and where it lives.
