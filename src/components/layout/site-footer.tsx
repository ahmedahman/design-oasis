import Link from "next/link";

import { Container } from "@/components/layout/container";
import { BrandMark } from "@/components/shared/brand-logo";
import { FOOTER_NAV } from "@/lib/config/navigation";
import { SITE } from "@/lib/config/site";
import { ROUTES } from "@/lib/constants/routes";

export function SiteFooter() {
  return (
    <footer className="bg-dark text-light" data-cursor-theme="dark">
      <Container className="py-20 md:py-28">
        <div className="grid gap-14 lg:grid-cols-[1.4fr_2fr]">
          <div>
            <BrandMark className="h-12" />
            <p className="font-display mt-7 max-w-sm text-3xl leading-[1.15] tracking-tight text-balance">
              Turning land into assets that hold their value.
            </p>
            <address className="text-light/60 mt-8 text-sm not-italic">{SITE.addressLine}</address>
            <div className="mt-4 flex flex-col gap-1 text-sm">
              <a href={`mailto:${SITE.email}`} className="hover:text-lime w-fit transition-colors">
                {SITE.email}
              </a>
              <a
                href={`tel:+${SITE.phoneE164}`}
                className="hover:text-lime w-fit transition-colors"
              >
                {SITE.phoneDisplay}
              </a>
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {FOOTER_NAV.map((group) => (
              <div key={group.title}>
                <h2 className="text-lime text-[10px] tracking-[0.18em] uppercase">{group.title}</h2>
                <ul className="mt-5 flex flex-col gap-3">
                  {group.items.map((item) => (
                    <li key={item.href + item.label}>
                      <Link
                        href={item.href}
                        className="text-light/70 hover:text-light text-sm transition-colors"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="border-light/15 text-light/50 mt-16 flex flex-col gap-3 border-t pt-7 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {SITE.legalName}. {SITE.tagline}.
          </p>
          <div className="flex gap-6">
            <Link href={ROUTES.partner} className="hover:text-light transition-colors">
              Landowners
            </Link>
            <a
              href={SITE.social.linkedin}
              target="_blank"
              rel="noreferrer"
              className="hover:text-light transition-colors"
            >
              LinkedIn
            </a>
            <a
              href={SITE.social.instagram}
              target="_blank"
              rel="noreferrer"
              className="hover:text-light transition-colors"
            >
              Instagram
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
