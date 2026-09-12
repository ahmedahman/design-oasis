"use client";

import { LayoutGroup } from "motion/react";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useState } from "react";

import { useReducedMotion } from "@/components/motion";
import type { SectorSlug } from "@/lib/config/sectors";
import type { Project } from "@/types/project";

import { type ProjectView } from "../lib/views";
import { ProjectGrid, ProjectList, ProjectSlider } from "./project-views";
import { SectorFilter } from "./sector-filter";
import { ViewToggle } from "./view-toggle";

/**
 * The morph. One projects array, three layouts, and a `LayoutGroup` so the
 * shared `layoutId` on each image animates between positions instead of the
 * browser swapping one tree for another.
 *
 * View and sector are mirrored into the URL so a layout is linkable and the
 * page still server-renders — but the state that drives the morph is local, so
 * the animation starts on click rather than after a round trip.
 */
export function ProjectsIndex({
  projects,
  available,
  initialView,
  initialSector,
}: {
  projects: Project[];
  available: SectorSlug[];
  initialView: ProjectView;
  initialSector: SectorSlug | null;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const reduced = useReducedMotion();

  const [view, setView] = useState<ProjectView>(initialView);
  const [sector, setSector] = useState<SectorSlug | null>(initialSector);

  const syncUrl = useCallback(
    (nextView: ProjectView, nextSector: SectorSlug | null) => {
      const params = new URLSearchParams();
      if (nextView !== "grid") params.set("view", nextView);
      if (nextSector) params.set("sector", nextSector);
      const query = params.toString();
      router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
    },
    [pathname, router],
  );

  const changeView = useCallback(
    (next: ProjectView) => {
      setView(next);
      syncUrl(next, sector);
    },
    [sector, syncUrl],
  );

  const changeSector = useCallback(
    (next: SectorSlug | null) => {
      setSector(next);
      syncUrl(view, next);
    },
    [view, syncUrl],
  );

  const visible = sector ? projects.filter((p) => p.sector === sector) : projects;

  return (
    <>
      <div className="mb-12 flex flex-wrap items-center justify-between gap-6">
        <SectorFilter sector={sector} available={available} onChange={changeSector} />
        <ViewToggle view={view} onChange={changeView} />
      </div>

      {visible.length === 0 ? (
        <p className="text-muted py-20 text-center">No projects in this sector yet.</p>
      ) : (
        /* Disabling the group under reduced motion turns the morph into a plain
           swap rather than animating layout for someone who asked us not to. */
        <LayoutGroup id={reduced ? undefined : "projects"}>
          {view === "grid" && <ProjectGrid projects={visible} />}
          {view === "list" && <ProjectList projects={visible} />}
          {view === "slider" && <ProjectSlider projects={visible} />}
        </LayoutGroup>
      )}
    </>
  );
}
