import type { Metadata } from "next";

import { Section } from "@/components/layout/section";
import { PageHeader } from "@/components/layout/page-header";
import { MetaStats } from "@/components/shared/meta-stats";
import { ProjectsIndex } from "@/features/projects/components/projects-index";
import { parseView } from "@/features/projects/lib/views";
import { SECTORS, type SectorSlug } from "@/lib/config/sectors";
import { getProjects, getUsedSectors } from "@/lib/data/projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Selected work from Design Oasis — luxury residential, hospitality, mixed-use, resort and institutional developments across Nigeria.",
};

function parseSector(value: string | undefined): SectorSlug | null {
  return SECTORS.some((s) => s.slug === value) ? (value as SectorSlug) : null;
}

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ view?: string; sector?: string }>;
}) {
  const params = await searchParams;
  const [projects, available] = await Promise.all([getProjects(), getUsedSectors()]);

  // Counted from the data rather than written down, so the figures cannot drift
  // out of step with the fixtures.
  const models = new Set(projects.flatMap((project) => project.models));

  return (
    <>
      <PageHeader
        eyebrow="Selected work"
        title="Projects"
        lede="Residential, hospitality, mixed-use and institutional work across Abuja, Kano and beyond — each one carrying the development model it was built under."
        aside={
          <MetaStats
            stats={[
              { value: String(projects.length), label: "Projects" },
              { value: String(available.length), label: "Sectors" },
              { value: String(models.size), label: "Development models" },
            ]}
          />
        }
      />
      <Section className="pt-0">
        <ProjectsIndex
          projects={projects}
          available={available}
          initialView={parseView(params.view)}
          initialSector={parseSector(params.sector)}
        />
      </Section>
    </>
  );
}
