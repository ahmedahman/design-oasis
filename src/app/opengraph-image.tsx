import { ImageResponse } from "next/og";

import { SITE } from "@/lib/config/site";

export const alt = `${SITE.name} — ${SITE.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * The share card. Tokens cannot reach here — `next/og` renders outside the app's
 * CSS — so the brand values are repeated as literals and must be kept in step
 * with the `@theme` block in globals.css.
 *
 * The display serif is not available to this renderer either (Satori only has
 * what is handed to it), so the card is set in the system sans rather than
 * naming a face that would silently fall back.
 */
export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#0B0C2E",
        padding: 72,
        fontFamily: "Helvetica, Arial, sans-serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: 999,
            border: "7px solid #8DC63F",
            display: "flex",
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            color: "white",
            fontSize: 20,
            letterSpacing: 4,
            lineHeight: 1.3,
            fontFamily: "Helvetica, Arial, sans-serif",
          }}
        >
          <span>DESIGN</span>
          <span style={{ color: "#8DC63F" }}>OASIS</span>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", width: 90, height: 3, background: "#8DC63F" }} />
        <div
          style={{ display: "flex", color: "white", fontSize: 74, lineHeight: 1.05, marginTop: 28 }}
        >
          Land becomes an asset
        </div>
        <div style={{ display: "flex", color: "white", fontSize: 74, lineHeight: 1.05 }}>
          when someone designs it.
        </div>
        <div
          style={{
            display: "flex",
            color: "rgba(255,255,255,0.62)",
            fontSize: 24,
            marginTop: 30,
            fontFamily: "Helvetica, Arial, sans-serif",
          }}
        >
          Real estate development &amp; architecture · Maitama, Abuja
        </div>
      </div>
    </div>,
    size,
  );
}
