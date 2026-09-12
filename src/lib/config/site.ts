/**
 * The canonical origin used for metadataBase, canonical URLs and OG tags.
 *
 * Resolution order:
 *   1. NEXT_PUBLIC_SITE_URL  — set this once the real domain is live.
 *   2. VERCEL_URL            — the deploy's own URL, so preview links share
 *                              correctly instead of pointing at a domain that
 *                              does not exist yet.
 *   3. localhost             — development.
 */
function resolveSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.NEXT_PUBLIC_VERCEL_URL) return `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000";
}

/** Single source of truth for brand copy and contact points. */
export const SITE = {
  name: "Design Oasis",
  legalName: "Design Oasis Limited",
  shortName: "Design Oasis",
  tagline: "Sustainability · Innovation · Value",
  description:
    "A Nigerian real estate development and architectural firm turning land into high-performing assets — luxury residential, hospitality, commercial and mixed-use, delivered through design-led joint ventures.",
  url: resolveSiteUrl(),
  email: "designoasislimited@gmail.com",
  phoneDisplay: "+234 817 556 2004",
  /** E.164 without the leading + — used for tel: and wa.me links. */
  phoneE164: "2348175562004",
  whatsapp: "2348175562004",
  address: {
    street: "6D Osara Lane",
    district: "Maitama",
    city: "Abuja",
    region: "FCT",
    country: "Nigeria",
  },
  addressLine: "6D Osara Lane, Maitama, Abuja, FCT",
  founded: "2019",
  social: {
    instagram: "https://instagram.com/designoasislimited",
    linkedin: "https://linkedin.com/company/designoasislimited",
  },
} as const;

/** Proof points. Numbers stated plainly — no adjectives doing the work. */
export const STATS = [
  { value: "22ha", label: "Largest development under design" },
  { value: "6", label: "Rail terminals designed nationwide" },
  { value: "4", label: "Development models offered" },
  { value: "2", label: "Core markets: Abuja and Lagos" },
] as const;
