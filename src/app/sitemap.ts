import type { MetadataRoute } from "next";

import { SITE } from "@/lib/config/site";
import { ROUTES } from "@/lib/constants/routes";
import { getProjectSlugs } from "@/lib/data/projects";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const slugs = await getProjectSlugs();
  const now = new Date();

  const pages = [
    { url: ROUTES.home, priority: 1 },
    { url: ROUTES.projects, priority: 0.9 },
    { url: ROUTES.partner, priority: 0.9 },
    { url: ROUTES.services, priority: 0.8 },
    { url: ROUTES.studio, priority: 0.7 },
    { url: ROUTES.contact, priority: 0.7 },
  ];

  return [
    ...pages.map((page) => ({
      url: new URL(page.url, SITE.url).toString(),
      lastModified: now,
      priority: page.priority,
    })),
    ...slugs.map((slug) => ({
      url: new URL(ROUTES.project(slug), SITE.url).toString(),
      lastModified: now,
      priority: 0.8,
    })),
  ];
}
