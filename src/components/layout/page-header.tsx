import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/shared/section-heading";

/**
 * The top of every page that does not open on the hero. Clears the fixed
 * header once, here, so no page has to remember to.
 */
export function PageHeader({
  eyebrow,
  title,
  lede,
  children,
  rules = true,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  lede?: string;
  children?: React.ReactNode;
  rules?: boolean;
}) {
  return (
    <Section rules={rules} className="pt-header-offset pb-12 md:pb-16">
      <SectionHeading as="h1" eyebrow={eyebrow} title={title} lede={lede} />
      {children}
    </Section>
  );
}
