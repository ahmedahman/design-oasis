import { ROUTES } from "@/lib/constants/routes";

export type NavItem = { label: string; href: string };

/** Navigation is data, not markup — SiteHeader and SiteFooter both render from here. */
export const MAIN_NAV: NavItem[] = [
  { label: "Projects", href: ROUTES.projects },
  { label: "Services", href: ROUTES.services },
  { label: "Partner", href: ROUTES.partner },
  { label: "Studio", href: ROUTES.studio },
];

export const FOOTER_NAV: { title: string; items: NavItem[] }[] = [
  {
    title: "Work",
    items: [
      { label: "All projects", href: ROUTES.projects },
      { label: "Residential", href: `${ROUTES.projects}?sector=residential` },
      { label: "Hospitality", href: `${ROUTES.projects}?sector=hospitality` },
      { label: "Mixed-use", href: `${ROUTES.projects}?sector=mixed-use` },
    ],
  },
  {
    title: "Services",
    items: [
      { label: "Design & Build", href: `${ROUTES.services}#design-build` },
      { label: "Development", href: `${ROUTES.services}#development` },
      { label: "Architecture", href: `${ROUTES.services}#architecture` },
    ],
  },
  {
    title: "Landowners",
    items: [
      { label: "Joint ventures", href: `${ROUTES.partner}#structure` },
      { label: "Returns", href: `${ROUTES.partner}#returns` },
      { label: "Submit your land", href: `${ROUTES.partner}#submit` },
    ],
  },
  {
    title: "Company",
    items: [
      { label: "The studio", href: ROUTES.studio },
      { label: "Contact", href: ROUTES.contact },
    ],
  },
];

/**
 * Routes whose first section is a full-bleed dark image, so the header starts
 * transparent with light type instead of dark-on-canvas. Config rather than a
 * prop threaded through layouts — every page here gets it right by default.
 *
 * Prefixes exist because project detail pages are dynamic: `/projects/[slug]`
 * opens on a cover photograph, while `/projects` itself is an ordinary light
 * page top and must not match.
 */
const DARK_HERO_ROUTES: string[] = [ROUTES.home];
const DARK_HERO_PREFIXES: string[] = [`${ROUTES.projects}/`];

export function hasDarkHero(pathname: string): boolean {
  return (
    DARK_HERO_ROUTES.includes(pathname) ||
    DARK_HERO_PREFIXES.some((prefix) => pathname.startsWith(prefix))
  );
}
