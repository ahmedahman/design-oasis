import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/shared/section-heading";

/**
 * The top of every page that does not open on the hero. Clears the fixed header
 * once, here, so no page has to remember to.
 *
 * Splits by default: a page top is the widest, emptiest heading on the site,
 * with nothing beside it to balance the measure.
 */
export function PageHeader({
  eyebrow,
  title,
  lede,
  aside,
  children,
  rules = true,
  layout = "split",
}: {
  eyebrow?: string;
  title: React.ReactNode;
  lede?: string;
  aside?: React.ReactNode;
  children?: React.ReactNode;
  rules?: boolean;
  layout?: "split" | "wide";
}) {
  return (
    <Section rules={rules} className="pt-header-offset pb-12 md:pb-16">
      <SectionHeading
        as="h1"
        layout={layout}
        eyebrow={eyebrow}
        title={title}
        lede={lede}
        aside={aside}
      />
      {children}
    </Section>
  );
}
