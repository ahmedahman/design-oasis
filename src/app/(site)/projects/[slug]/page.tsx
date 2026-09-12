import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { ImageReveal, Reveal } from "@/components/motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FloorPlanExplorer } from "@/features/projects/components/floor-plan-explorer";
import { DEVELOPMENT_MODELS, PROJECT_STATUS_LABELS } from "@/lib/config/models";
import { SECTOR_LABELS } from "@/lib/config/sectors";
import { ROUTES } from "@/lib/constants/routes";
import { getNextProject, getProjectBySlug, getProjectSlugs } from "@/lib/data/projects";
import { cn } from "@/lib/utils/cn";

export async function generateStaticParams() {
  const slugs = await getProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return {};

  return {
    title: project.title,
    description: project.summary,
    openGraph: {
      title: project.title,
      description: project.summary,
      images: [{ url: project.cover.src }],
    },
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  const next = await getNextProject(slug);

  return (
    <>
      {/* Full-bleed cover. The page title sits over it rather than above it, so
          the photograph is the first thing on the page. Title left, facts right:
          a static image has no reason to keep its right side clear, and this
          surfaces the numbers well before the table further down. */}
      <section className="relative flex h-[72svh] min-h-[30rem] items-end overflow-hidden">
        <Image
          src={project.cover.src}
          alt={project.cover.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="bg-cover-scrim absolute inset-0" aria-hidden />
        <Container className="relative grid gap-8 pb-14 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Badge variant="onDark">{SECTOR_LABELS[project.sector]}</Badge>
            <h1 className="font-display mt-6 text-[clamp(2.25rem,5.5vw,4.5rem)] leading-[1.02] tracking-tight text-white">
              {project.title}
            </h1>
          </div>

          <dl className="text-white/75 lg:col-span-5 lg:col-start-8">
            <div className="flex items-baseline justify-between gap-6 border-t border-white/20 py-3">
              <dt className="text-[10px] tracking-[0.16em] text-white/50 uppercase">Location</dt>
              <dd className="text-right">{project.location}</dd>
            </div>
            <div className="flex items-baseline justify-between gap-6 border-t border-white/20 py-3">
              <dt className="text-[10px] tracking-[0.16em] text-white/50 uppercase">Status</dt>
              <dd className="text-right">{PROJECT_STATUS_LABELS[project.status]}</dd>
            </div>
            <div className="flex items-baseline justify-between gap-6 border-t border-white/20 py-3">
              <dt className="text-[10px] tracking-[0.16em] text-white/50 uppercase">Year</dt>
              <dd className="text-right tabular-nums">{project.year}</dd>
            </div>
            <div className="flex items-baseline justify-between gap-6 border-y border-white/20 py-3">
              <dt className="text-[10px] tracking-[0.16em] text-white/50 uppercase">Structure</dt>
              <dd className="flex flex-wrap justify-end gap-1.5">
                {project.models.map((model) => (
                  <Badge key={model} variant="onDark">
                    {DEVELOPMENT_MODELS[model].label}
                  </Badge>
                ))}
              </dd>
            </div>
          </dl>
        </Container>
      </section>

      <Section rules>
        <div className="grid gap-14 lg:grid-cols-[1.6fr_1fr] lg:gap-20">
          <Reveal>
            <p className="font-display text-3xl leading-[1.2] tracking-tight text-balance md:text-4xl">
              {project.summary}
            </p>
            <div className="mt-10 flex flex-col gap-6">
              {project.body.map((paragraph) => (
                <p key={paragraph.slice(0, 40)} className="text-muted text-lg leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <dl className="border-border border-t">
              {project.facts.map((fact) => (
                <div
                  key={fact.label}
                  className="border-border flex items-baseline justify-between gap-6 border-b py-4"
                >
                  <dt className="text-muted text-[10px] tracking-[0.16em] uppercase">
                    {fact.label}
                  </dt>
                  <dd className="font-display text-xl tracking-tight">{fact.value}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-8">
              <p className="text-muted-light text-[10px] tracking-[0.16em] uppercase">Engagement</p>
              <ul className="mt-3 flex flex-col gap-1.5">
                {project.models.map((model) => (
                  <li key={model} className="text-sm">
                    {DEVELOPMENT_MODELS[model].full}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section tone="surface" contentClassName="grid gap-6 md:grid-cols-2">
        {project.gallery.map((image, i) => (
          <ImageReveal
            key={image.src + i}
            delay={i % 2 === 0 ? 0 : 0.08}
            className={cn(
              "relative w-full",
              image.orientation === "portrait" ? "aspect-[3/4]" : "aspect-[4/3]",
              project.gallery.length % 2 === 1 && i === 0 && "md:col-span-2 md:aspect-[16/9]",
            )}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </ImageReveal>
        ))}
      </Section>

      {project.floorPlan && (
        <Section rules>
          <Reveal className="mb-10">
            <p className="text-lime-text mb-5 text-[10px] tracking-[0.2em] uppercase">The plan</p>
            <h2 className="font-display max-w-2xl text-4xl leading-[1.08] tracking-tight text-balance md:text-5xl">
              Explore the layout.
            </h2>
          </Reveal>
          <FloorPlanExplorer plan={project.floorPlan} />
        </Section>
      )}

      {next && (
        <Section tone="dark" rules>
          <p className="text-lime text-[10px] tracking-[0.2em] uppercase">Next project</p>
          <div className="mt-6 flex flex-wrap items-end justify-between gap-8">
            <h2 className="font-display text-4xl leading-tight tracking-tight md:text-6xl">
              {next.title}
            </h2>
            <Button asChild variant="onDark">
              <Link href={ROUTES.project(next.slug)}>View project</Link>
            </Button>
          </div>
        </Section>
      )}
    </>
  );
}
