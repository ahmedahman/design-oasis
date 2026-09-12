import type { Metadata } from "next";

import { PageHeader } from "@/components/layout/page-header";
import { Section } from "@/components/layout/section";
import { Reveal, RevealItem } from "@/components/motion";
import { SectionHeading } from "@/components/shared/section-heading";
import { EnquiryForm } from "@/features/enquiries/components/enquiry-form";
import { ADVANTAGES, JV_CONTRIBUTIONS, RETURN_OPTIONS } from "@/lib/config/partner";

export const metadata: Metadata = {
  title: "Partner with us",
  description:
    "Landowner-friendly joint venture and Build–Operate–Transfer structures. Contribute land as equity and take completed units, profit share, fixed returns or long-term income.",
};

export default function PartnerPage() {
  return (
    <>
      <PageHeader
        eyebrow="For landowners"
        title="Your land is the equity. We bring everything else."
        lede="Selling land realises its value once. Developing it realises value every year it stands. A joint venture lets you keep the upside without carrying the execution."
      />

      <Section id="structure" tone="surface">
        <SectionHeading eyebrow="The structure" title="How a joint venture works." />
        <Reveal className="mt-14 grid gap-10 md:grid-cols-2 md:gap-16">
          {JV_CONTRIBUTIONS.map((side) => (
            <div key={side.party} className="border-lime border-t pt-6">
              <h3 className="font-display text-2xl tracking-tight">{side.party}</h3>
              <ul className="mt-6 flex flex-col gap-3">
                {side.items.map((item) => (
                  <li key={item} className="text-muted border-border border-b pb-3">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </Reveal>
      </Section>

      <Section id="returns" rules>
        <SectionHeading
          eyebrow="Your return"
          title="Four ways to take it."
          lede="The right structure depends on whether you want certainty, upside, or income — and we will model all of them before you decide."
        />
        <Reveal stagger className="mt-14 grid gap-x-12 gap-y-10 md:grid-cols-2">
          {RETURN_OPTIONS.map((option, i) => (
            <RevealItem key={option.title} className="border-border border-t pt-6">
              <p className="text-muted-light text-[10px] tracking-[0.2em] uppercase">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="font-display mt-4 text-2xl tracking-tight">{option.title}</h3>
              <p className="text-muted mt-3">{option.detail}</p>
            </RevealItem>
          ))}
        </Reveal>
      </Section>

      <Section tone="dark" rules>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          <div>
            <p className="text-lime text-[10px] tracking-[0.2em] uppercase">Why us</p>
            <h2 className="font-display mt-5 text-4xl leading-[1.08] tracking-tight text-balance md:text-5xl">
              Design creativity, financial discipline.
            </h2>
          </div>
          <Reveal stagger>
            <ul>
              {ADVANTAGES.map((advantage) => (
                <RevealItem key={advantage} className="border-light/15 border-t py-5">
                  <span className="text-light/80">{advantage}</span>
                </RevealItem>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>

      <Section id="submit" tone="surface">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:gap-20">
          <SectionHeading
            eyebrow="Start here"
            title="Submit your land."
            lede="Tell us where it is and roughly how large. We will come back with an honest read on what it could carry — and whether a JV is the right route at all."
          />
          <Reveal delay={0.1}>
            <EnquiryForm kind="LAND" />
          </Reveal>
        </div>
      </Section>
    </>
  );
}
