import { Container } from "@/components/layout/container";
import { RevealText } from "@/components/motion";
import { ColumnRules } from "@/components/chrome/column-rules";
import { SITE } from "@/lib/config/site";

import { Hero } from "./hero";

/**
 * The pinned ground. The scene is `fixed` inside an `h-svh` section clipped by
 * `clip-path: inset(0)` — which promotes the section to a containing block, so
 * the fixed child stays put while the page scrolls up over it. Cheap, and the
 * single biggest "this feels built" cue on the site.
 */
export function HeroSection() {
  return (
    <section
      className="bg-dark text-light relative flex h-svh flex-col justify-end [clip-path:inset(0)]"
      data-cursor-theme="dark"
    >
      <div className="fixed inset-0 z-0">
        <Hero
          panorama="/hero/panorama.png"
          poster="/hero/poster.png"
          posterAlt="A colonnade of light bays receding toward a lit horizon"
        />
      </div>

      <ColumnRules className="z-10" />

      <Container className="relative z-10 pb-16 md:pb-20">
        <p className="mb-7 flex items-center gap-4 text-[10px] tracking-[0.2em] uppercase">
          <span aria-hidden className="bg-lime h-px w-10 shrink-0" />
          {SITE.tagline}
        </p>
        <RevealText
          as="h1"
          lines={["Land becomes", "an asset when", "someone designs it."]}
          className="font-display max-w-5xl text-[clamp(2.5rem,7vw,6.5rem)] leading-[0.95] tracking-tight"
        />
        <p className="text-light/70 mt-8 max-w-md text-base">{SITE.description}</p>
      </Container>
    </section>
  );
}
