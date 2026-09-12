import type { Metadata } from "next";
import Link from "next/link";

import { PageHeader } from "@/components/layout/page-header";
import { Section } from "@/components/layout/section";
import { Reveal, RevealItem } from "@/components/motion";
import { Button } from "@/components/ui/button";
import { SECTORS } from "@/lib/config/sectors";
import { SERVICES } from "@/lib/config/services";
import { ROUTES } from "@/lib/constants/routes";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Design & Build, real estate development through joint ventures, and architectural design and master planning — the three ways Design Oasis is engaged.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="What we do"
        title="Three ways in."
        lede="Most firms sell one of these. Design Oasis runs all three, which is why the drawing and the deal can be decided together."
      />

      {SERVICES.map((service, i) => (
        <Section key={service.id} id={service.id} tone={i % 2 === 0 ? "surface" : "canvas"}>
          <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:gap-20">
            <Reveal>
              <p className="text-muted-light text-[10px] tracking-[0.2em] uppercase">
                {String(i + 1).padStart(2, "0")} — {service.subtitle}
              </p>
              <h2 className="font-display mt-5 text-4xl leading-[1.08] tracking-tight text-balance md:text-5xl">
                {service.title}
              </h2>
            </Reveal>

            <Reveal stagger delay={0.1}>
              <p className="font-display text-2xl leading-[1.25] tracking-tight text-balance">
                {service.summary}
              </p>
              <ul className="mt-9">
                {service.points.map((point) => (
                  <RevealItem key={point} as="li" className="border-border border-t py-4">
                    <span className="text-muted">{point}</span>
                  </RevealItem>
                ))}
              </ul>
            </Reveal>
          </div>
        </Section>
      ))}

      <Section tone="dark" rules>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          <div>
            <p className="text-lime text-[10px] tracking-[0.2em] uppercase">Sectors</p>
            <h2 className="font-display mt-5 text-4xl leading-[1.08] tracking-tight text-balance md:text-5xl">
              Where the work sits.
            </h2>
            <Button asChild variant="onDark" className="mt-9">
              <Link href={ROUTES.projects}>See the projects</Link>
            </Button>
          </div>
          <Reveal stagger>
            <ul className="grid gap-x-10 sm:grid-cols-2">
              {SECTORS.map((sector) => (
                <RevealItem key={sector.slug} as="li" className="border-light/15 border-t py-5">
                  <p className="font-display text-xl tracking-tight">{sector.label}</p>
                  <p className="text-light/60 mt-1 text-sm">{sector.blurb}</p>
                </RevealItem>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
