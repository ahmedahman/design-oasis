import type { Metadata } from "next";

import { PageHeader } from "@/components/layout/page-header";
import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/motion";
import { EnquiryForm } from "@/features/enquiries/components/enquiry-form";
import { SITE } from "@/lib/config/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Talk to Design Oasis — ${SITE.addressLine}. ${SITE.email}, ${SITE.phoneDisplay}.`,
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Get in touch"
        title="Start a conversation."
        lede="A project, a site, or a question about how a joint venture would work on your land — all of it starts the same way."
      />

      <Section className="pt-0">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <Reveal>
            <dl className="flex flex-col gap-8">
              <div>
                <dt className="text-muted-light text-[10px] tracking-[0.16em] uppercase">Studio</dt>
                <dd className="font-display mt-2 text-xl leading-snug tracking-tight">
                  {SITE.address.street}
                  <br />
                  {SITE.address.district}, {SITE.address.city}
                  <br />
                  {SITE.address.region}, {SITE.address.country}
                </dd>
              </div>
              <div>
                <dt className="text-muted-light text-[10px] tracking-[0.16em] uppercase">Email</dt>
                <dd className="mt-2">
                  <a
                    href={`mailto:${SITE.email}`}
                    className="hover:text-lime-text transition-colors"
                  >
                    {SITE.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-muted-light text-[10px] tracking-[0.16em] uppercase">Phone</dt>
                <dd className="mt-2 flex flex-col gap-1">
                  <a
                    href={`tel:+${SITE.phoneE164}`}
                    className="hover:text-lime-text transition-colors"
                  >
                    {SITE.phoneDisplay}
                  </a>
                  <a
                    href={`https://wa.me/${SITE.whatsapp}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-muted hover:text-lime-text text-sm transition-colors"
                  >
                    Message on WhatsApp
                  </a>
                </dd>
              </div>
            </dl>
          </Reveal>

          <Reveal delay={0.1}>
            <EnquiryForm kind="CONTACT" />
          </Reveal>
        </div>
      </Section>
    </>
  );
}
