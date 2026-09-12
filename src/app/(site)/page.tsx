import Link from "next/link";

import { Section } from "@/components/layout/section";
import { Reveal, RevealItem } from "@/components/motion";
import { SectionHeading } from "@/components/shared/section-heading";
import { StatBand } from "@/components/shared/stat-band";
import { Button } from "@/components/ui/button";
import { HeroSection } from "@/features/hero/hero-section";
import { ProjectCard } from "@/features/projects/components/project-card";
import { SERVICES } from "@/lib/config/services";
import { getFeaturedProjects } from "@/lib/data/projects";
import { ROUTES } from "@/lib/constants/routes";

export default async function HomePage() {
  const featured = await getFeaturedProjects(3);

  return (
    <>
      <HeroSection />

      {/* Everything from here scrolls up over the pinned hero. */}
      <div className="bg-canvas relative z-10">
        <Section id="approach" rules>
          <SectionHeading
            eyebrow="What we are"
            title="A developer that designs, not a consultant that advises."
            lede="Design Oasis works at the intersection of design excellence, development strategy and investment structuring — so the drawing and the deal are decided together, by the same people."
          />
          <Reveal delay={0.1} className="mt-14">
            <StatBand />
          </Reveal>
        </Section>

        <Section id="work" tone="surface">
          <div className="flex flex-wrap items-end justify-between gap-8">
            <SectionHeading eyebrow="Selected work" title="Recent projects" />
            <Reveal delay={0.1}>
              <Button asChild variant="outline">
                <Link href={ROUTES.projects}>All projects</Link>
              </Button>
            </Reveal>
          </div>

          <div className="mt-16 grid gap-x-10 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
            {featured.map((project, i) => (
              <ProjectCard key={project.id} project={project} priority={i === 0} />
            ))}
          </div>
        </Section>

        <Section id="how" rules>
          <SectionHeading eyebrow="How we work" title="Three ways in." />
          <Reveal stagger className="mt-16 grid gap-x-10 gap-y-14 lg:grid-cols-3">
            {SERVICES.map((service, i) => (
              <RevealItem key={service.id} className="border-border border-t pt-7">
                <p className="text-muted-light text-[10px] tracking-[0.2em] uppercase">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="font-display mt-5 text-3xl leading-tight tracking-tight">
                  {service.title}
                </h3>
                <p className="text-muted mt-4">{service.summary}</p>
                <Link
                  href={`${ROUTES.services}#${service.id}`}
                  className="text-lime-text hover:text-navy-950 mt-7 inline-block text-xs tracking-[0.12em] uppercase transition-colors"
                >
                  Read more
                  <span className="sr-only"> about {service.title}</span>
                </Link>
              </RevealItem>
            ))}
          </Reveal>
        </Section>

        <Section id="landowners" tone="dark" rules>
          <div className="grid items-end gap-12 lg:grid-cols-2">
            <SectionHeading
              eyebrow="For landowners"
              title="Your land is the equity. We bring everything else."
              lede="Design leadership, development planning, financial modelling, investor coordination and execution — structured so you keep upside instead of selling it."
            />
            <Reveal delay={0.1} className="lg:justify-self-end">
              <Button asChild variant="accent" size="lg">
                <Link href={ROUTES.partner}>See how a JV works</Link>
              </Button>
            </Reveal>
          </div>
        </Section>
      </div>
    </>
  );
}
