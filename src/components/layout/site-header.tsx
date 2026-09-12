"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { Magnetic } from "@/components/motion";
import { BrandLogo } from "@/components/shared/brand-logo";
import { Button } from "@/components/ui/button";
import { DARK_HERO_ROUTES, MAIN_NAV } from "@/lib/config/navigation";
import { ROUTES } from "@/lib/constants/routes";
import { cn } from "@/lib/utils/cn";

/**
 * Transparent over the hero, solid once the page scrolls under it. `overDark`
 * is set by pages whose first section is a dark band.
 */
export function SiteHeader() {
  const pathname = usePathname();
  const overDark = DARK_HERO_ROUTES.includes(pathname);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on navigation. Adjusting state during render is the
  // recommended pattern here — an effect would cause a cascading render.
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  const light = overDark && !scrolled;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled ? "bg-canvas/90 border-border border-b backdrop-blur-md" : "bg-transparent",
      )}
      data-cursor-theme={light ? "dark" : undefined}
    >
      <div className="px-gutter h-header mx-auto flex w-full max-w-[1600px] items-center justify-between gap-6">
        <Magnetic strength={0.2}>
          <BrandLogo className={cn(light ? "text-white" : "text-foreground")} />
        </Magnetic>

        <nav aria-label="Main" className="hidden items-center gap-9 md:flex">
          {MAIN_NAV.map((item) => {
            const active = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  /* py-3 is what carries the link past the 24px minimum touch
                     target; the type itself is only 12px tall. */
                  "relative py-3 text-xs tracking-[0.12em] uppercase transition-colors",
                  light ? "text-white/80 hover:text-white" : "text-muted hover:text-foreground",
                  active && (light ? "text-white" : "text-foreground"),
                )}
              >
                {item.label}
                {active && (
                  <span aria-hidden className="bg-lime absolute bottom-1.5 left-0 h-px w-full" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Button
            asChild
            size="sm"
            variant={light ? "onDarkOutline" : "outline"}
            className="max-sm:hidden"
          >
            <Link href={ROUTES.contact}>Start a conversation</Link>
          </Button>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            className={cn(
              "text-xs tracking-[0.12em] uppercase md:hidden",
              light ? "text-white" : "text-foreground",
            )}
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </div>

      <nav
        id="mobile-nav"
        aria-label="Main"
        hidden={!open}
        className="bg-canvas border-border px-gutter border-t py-6 md:hidden"
      >
        <ul className="flex flex-col gap-5">
          {[...MAIN_NAV, { label: "Contact", href: ROUTES.contact }].map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="font-display text-2xl tracking-tight">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
