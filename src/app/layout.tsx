import type { Metadata, Viewport } from "next";
import { Fraunces, Geist } from "next/font/google";
import { Toaster } from "sonner";

import { Cursor, SmoothScroll } from "@/components/motion";
import { SITE } from "@/lib/config/site";

import "./globals.css";

/* Fraunces for display, Geist for UI — high-contrast serif over a clean
   neo-grotesque. Both behind tokens, so swapping either is a two-line change. */
const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["SOFT", "WONK", "opsz"],
});

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — ${SITE.tagline}`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  openGraph: {
    type: "website",
    siteName: SITE.name,
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
    locale: "en_NG",
  },
};

export const viewport: Viewport = {
  themeColor: "#0B0C2E",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    /* The font variables must sit on <html>, not <body>: `--font-display` is
       declared on :root by the @theme block, and a var() inside a custom
       property resolves in the scope where it is DECLARED, not where it is
       used. On <body> the tokens would compute to invalid and every
       `font-display` would silently fall back. */
    <html lang="en" className={`${fraunces.variable} ${geist.variable}`}>
      <head>
        {/* Motion serialises its `initial` styles into the SSR HTML, so every
            reveal ships as opacity:0. With JS the observer corrects that in a
            frame; without JS the page would stay blank. This restores it. */}
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important;clip-path:none!important}`}</style>
        </noscript>
      </head>
      <body className="font-sans antialiased">
        <SmoothScroll />
        <Cursor />
        {children}
        <Toaster position="bottom-right" closeButton />
      </body>
    </html>
  );
}
