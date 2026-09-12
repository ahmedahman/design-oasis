import type { SectorSlug } from "@/lib/config/sectors";

/** How Design Oasis is engaged on a project. Straight from the company profile. */
export type DevelopmentModel = "JV" | "BOT" | "DESIGN_BUILD" | "ADVISORY" | "DESIGN";

export type ProjectStatus = "COMPLETED" | "IN_PROGRESS" | "IN_DESIGN";

export type ProjectImage = {
  src: string;
  alt: string;
  /** Portrait images earn a taller cell in the grid. */
  orientation?: "landscape" | "portrait";
};

/**
 * A hotspot on a floor plan, in normalized 0–1 coordinates so it survives any
 * plan image size or future re-export.
 */
export type FloorPlanHotspot = {
  id: string;
  x: number;
  y: number;
  label: string;
  detail: string;
};

export type FloorPlan = {
  src: string;
  alt: string;
  /** Natural pixel size, used to set the explorer's aspect ratio. */
  width: number;
  height: number;
  hotspots: FloorPlanHotspot[];
};

export type ProjectFact = { label: string; value: string };

export type Project = {
  id: string;
  slug: string;
  title: string;
  location: string;
  year: string;
  sector: SectorSlug;
  status: ProjectStatus;
  models: DevelopmentModel[];
  /** One line for the list view and cards. */
  summary: string;
  /** Two or three paragraphs for the detail page. */
  body: string[];
  facts: ProjectFact[];
  cover: ProjectImage;
  gallery: ProjectImage[];
  floorPlan?: FloorPlan;
  featured?: boolean;
};
