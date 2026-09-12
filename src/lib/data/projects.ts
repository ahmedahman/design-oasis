import type { SectorSlug } from "@/lib/config/sectors";
import { PROJECTS_FIXTURE } from "@/lib/fixtures/projects.fixture";
import type { Project } from "@/types/project";

/**
 * The swap seam.
 *
 * Every project read in the application goes through this module. Today it
 * filters an in-memory fixture array; when a CMS arrives the bodies become
 * fetches. Because the signatures are the contract, not one component changes.
 *
 * Rule: nothing outside `lib/data` may import from `lib/fixtures`.
 */

export async function getProjects(sector?: SectorSlug): Promise<Project[]> {
  if (!sector) return PROJECTS_FIXTURE;
  return PROJECTS_FIXTURE.filter((p) => p.sector === sector);
}

export async function getFeaturedProjects(limit = 3): Promise<Project[]> {
  return PROJECTS_FIXTURE.filter((p) => p.featured).slice(0, limit);
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  return PROJECTS_FIXTURE.find((p) => p.slug === slug) ?? null;
}

export async function getProjectSlugs(): Promise<string[]> {
  return PROJECTS_FIXTURE.map((p) => p.slug);
}

/** Powers the "next project" link at the foot of a detail page. */
export async function getNextProject(slug: string): Promise<Project | null> {
  const index = PROJECTS_FIXTURE.findIndex((p) => p.slug === slug);
  if (index === -1) return null;
  return PROJECTS_FIXTURE[(index + 1) % PROJECTS_FIXTURE.length];
}

/** Sectors that actually have work in them, for the projects filter. */
export async function getUsedSectors(): Promise<SectorSlug[]> {
  return [...new Set(PROJECTS_FIXTURE.map((p) => p.sector))];
}
