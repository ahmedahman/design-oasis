import Link from "next/link";

import { SITE } from "@/lib/config/site";
import { ROUTES } from "@/lib/constants/routes";
import { cn } from "@/lib/utils/cn";

/**
 * The brand mark: the logo's interlocking "d" — a navy descender through a lime
 * ring. Drawn rather than imported so it inherits colour and never ships a
 * raster at the wrong density.
 *
 * TODO: swap for the official SVG lockup when it arrives. One file, one change.
 */
export function BrandMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 56" fill="none" className={cn("h-8 w-auto", className)} aria-hidden>
      <path
        d="M38 6v34a14 14 0 1 1-14-14h6"
        stroke="currentColor"
        strokeWidth="8"
        className="text-lime"
      />
      <path d="M30 0v34a8 8 0 1 1-8-8h4" stroke="currentColor" strokeWidth="7" />
    </svg>
  );
}

export function BrandLogo({
  className,
  href = ROUTES.home,
  showWordmark = true,
}: {
  className?: string;
  href?: string;
  showWordmark?: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn("inline-flex items-center gap-2.5", className)}
      /* Only name the link explicitly when there is no visible wordmark to do
         it. An aria-label over visible text makes the accessible name disagree
         with what a speech-control user actually reads. */
      aria-label={showWordmark ? undefined : `${SITE.name} — home`}
    >
      <BrandMark />
      {showWordmark && (
        <span className="leading-none">
          <span className="block text-sm font-bold tracking-[0.14em] uppercase">Design</span>{" "}
          <span className="text-lime block text-sm tracking-[0.14em] uppercase">Oasis</span>
        </span>
      )}
    </Link>
  );
}
