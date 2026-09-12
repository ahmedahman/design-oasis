/** The central route map. No magic strings in components. */
export const ROUTES = {
  home: "/",
  projects: "/projects",
  project: (slug: string) => `/projects/${slug}`,
  services: "/services",
  partner: "/partner",
  studio: "/studio",
  contact: "/contact",
} as const;

export const API_ROUTES = {
  enquiries: "/api/enquiries",
} as const;
