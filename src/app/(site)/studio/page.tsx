import type { Metadata } from "next";

import { PageHeader } from "@/components/layout/page-header";
import { Section } from "@/components/layout/section";
import { Reveal, RevealItem } from "@/components/motion";
import { SectionHeading } from "@/components/shared/section-heading";
import { StatBand } from "@/components/shared/stat-band";
import { CORE_VALUES, CORPORATE, MISSION, TEAM, VISION } from "@/lib/config/studio";

export const metadata: Metadata = {
  title: "Studio",
  description:
    "Design Oasis Limited is a Nigerian real estate development and architectural firm in Maitama, Abuja, working across joint venture, BOT, design-build and advisory frameworks.",
};

export default function StudioPage() {
  return (
    <>
      {/* The lede is written rather than SITE.description: the home page opens
          with that sentence now, and the two should not echo each other. */}
      <PageHeader
        eyebrow="The studio"
        title="Design excellence, development strategy, investment structuring."
        lede="Small enough that the people who design a project are the people who deliver it, and structured so the design decisions and the financial ones are made by the same team."
      />

      <Section className="pt-0">
        <StatBand />
      </Section>

      <Section tone="dark" rules>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          <div>
            <p className="text-lime text-[10px] tracking-[0.2em] uppercase">Vision</p>
            <p className="font-display mt-6 text-3xl leading-[1.15] tracking-tight text-balance md:text-4xl">
              {VISION}
            </p>
          </div>
          <Reveal stagger>
            <p className="text-lime mb-6 text-[10px] tracking-[0.2em] uppercase">Mission</p>
            <ul>
              {MISSION.map((item) => (
                <RevealItem key={item} as="li" className="border-light/15 border-t py-5">
                  <span className="text-light/80">{item}</span>
                </RevealItem>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>

      <Section tone="surface">
        <SectionHeading
          layout="split"
          eyebrow="Core values"
          title="What we hold to."
          lede="Five commitments that decide how we price, who we partner with, and what we will not put our name to."
        />
        <Reveal stagger className="mt-14 grid gap-x-10 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
          {CORE_VALUES.map((value) => (
            <RevealItem key={value.title} className="border-border border-t pt-6">
              <h3 className="font-display text-2xl tracking-tight">{value.title}</h3>
              <p className="text-muted mt-3">{value.detail}</p>
            </RevealItem>
          ))}
        </Reveal>
      </Section>

      <Section rules>
        <SectionHeading
          layout="split"
          eyebrow="The team"
          title="Who does the work."
          lede="A small studio by design — architects and engineers who stay with a project from the first sketch to the last inspection rather than handing it down a chain."
        />
        <Reveal stagger className="mt-14 grid gap-x-10 gap-y-12 md:grid-cols-2 lg:grid-cols-4">
          {TEAM.map((member) => (
            <RevealItem key={member.name} className="border-border border-t pt-6">
              <h3 className="font-display text-2xl leading-tight tracking-tight">{member.name}</h3>
              <p className="text-lime-text mt-2 text-[10px] tracking-[0.16em] uppercase">
                {member.role}
              </p>
              {"bio" in member && member.bio && (
                <p className="text-muted mt-4 text-sm leading-relaxed">{member.bio}</p>
              )}
            </RevealItem>
          ))}
        </Reveal>
      </Section>

      <Section tone="muted">
        <SectionHeading
          layout="split"
          eyebrow="Corporate"
          title="The details."
          lede="The registered particulars, for anyone running checks before a conversation."
        />
        <Reveal className="mt-12">
          <dl className="grid gap-x-12 sm:grid-cols-2">
            {CORPORATE.map((row) => (
              <div
                key={row.label}
                className="border-border flex items-baseline justify-between gap-6 border-b py-4"
              >
                <dt className="text-muted text-[10px] tracking-[0.16em] uppercase">{row.label}</dt>
                <dd className="text-right">{row.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </Section>
    </>
  );
}
