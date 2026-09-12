import { SITE } from "@/lib/config/site";

/**
 * Organization JSON-LD. Rendered once in the root layout so search engines get
 * the firm's identity, location and contact points from every page.
 */
export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: SITE.legalName,
    alternateName: SITE.name,
    description: SITE.description,
    url: SITE.url,
    email: SITE.email,
    telephone: `+${SITE.phoneE164}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.address.street,
      addressLocality: SITE.address.district,
      addressRegion: SITE.address.region,
      addressCountry: "NG",
    },
    areaServed: ["Abuja", "Lagos", "Nigeria"],
    knowsAbout: [
      "Real estate development",
      "Architectural design",
      "Joint venture structuring",
      "Build-Operate-Transfer",
      "Master planning",
    ],
    sameAs: [SITE.social.linkedin, SITE.social.instagram],
  };

  return (
    <script
      type="application/ld+json"
      // The payload is built from our own config — no user input reaches it.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
