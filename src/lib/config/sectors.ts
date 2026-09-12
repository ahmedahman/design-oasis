/** The development sectors, from the company profile. Config, not markup. */
export const SECTORS = [
  { slug: "residential", label: "Residential", blurb: "Luxury estates, villas and terraces" },
  { slug: "hospitality", label: "Hospitality", blurb: "Boutique and five-star hotels" },
  { slug: "mixed-use", label: "Mixed-use", blurb: "High-rise residential and commercial towers" },
  { slug: "resort", label: "Resort & lifestyle", blurb: "Golf resorts and integrated leisure" },
  { slug: "commercial", label: "Commercial", blurb: "Retail and office developments" },
  { slug: "institutional", label: "Institutional", blurb: "Government and public infrastructure" },
] as const;

export type SectorSlug = (typeof SECTORS)[number]["slug"];

export const SECTOR_LABELS = Object.fromEntries(
  SECTORS.map((s) => [s.slug, s.label]),
) as Record<SectorSlug, string>;
