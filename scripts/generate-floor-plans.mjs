/**
 * Generates schematic floor-plan placeholders as SVG.
 *
 * A stock photograph is the wrong placeholder for a plan — it tells you nothing
 * about whether the explorer works. These are line drawings whose room boxes
 * are positioned to contain the hotspot coordinates in the fixtures, so the
 * drag-and-zoom feature can be judged properly before real plans arrive.
 *
 * Replace public/plans/*.svg with real drawings and update the hotspot
 * coordinates in lib/fixtures/projects.fixture.ts to match.
 *
 *   node scripts/generate-floor-plans.mjs
 */
import { mkdirSync, writeFileSync } from "node:fs";

const INK = "#14152E";
const HAIR = "#C9C3B8";
const WASH = "#F1EEE8";
const WALL = 7;

/** `rooms` are [x, y, w, h, label] in plan units. */
function plan({ width, height, rooms, title }) {
  let grid = "";
  for (let x = 0; x <= width; x += 100) {
    grid += `<line x1="${x}" y1="0" x2="${x}" y2="${height}" stroke="${HAIR}" stroke-width="1"/>`;
  }
  for (let y = 0; y <= height; y += 100) {
    grid += `<line x1="0" y1="${y}" x2="${width}" y2="${y}" stroke="${HAIR}" stroke-width="1"/>`;
  }

  const body = rooms
    .map(
      ([x, y, w, h, label]) => `
  <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${WASH}" stroke="${INK}" stroke-width="${WALL}"/>
  <text x="${x + w / 2}" y="${y + h / 2}" fill="${INK}" font-family="Helvetica,Arial,sans-serif"
        font-size="30" letter-spacing="4" text-anchor="middle" dominant-baseline="middle"
        opacity="0.75">${label.toUpperCase()}</text>`,
    )
    .join("");

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">
  <rect width="${width}" height="${height}" fill="#FFFFFF"/>
  <g opacity="0.5">${grid}</g>${body}
  <rect x="${WALL / 2}" y="${WALL / 2}" width="${width - WALL}" height="${height - WALL}" fill="none" stroke="${INK}" stroke-width="${WALL}"/>
  <text x="40" y="${height - 40}" fill="${INK}" font-family="Helvetica,Arial,sans-serif" font-size="26" letter-spacing="6" opacity="0.55">${title.toUpperCase()}</text>
</svg>`;
}

mkdirSync("public/plans", { recursive: true });

// Hotspots at (0.28,0.36) (0.52,0.55) (0.71,0.30) (0.40,0.75) of 2400×1600.
writeFileSync(
  "public/plans/kano-golf-resort.svg",
  plan({
    width: 2400,
    height: 1600,
    title: "Kano Golf Resort — masterplan",
    rooms: [
      [420, 380, 500, 300, "Hotel"],
      [1060, 740, 420, 300, "Clubhouse"],
      [1540, 320, 420, 300, "Wellness"],
      [740, 1060, 520, 300, "Events campus"],
    ],
  }),
);

// Hotspots at (0.33,0.44) (0.60,0.34) (0.72,0.66) (0.14,0.76) of 2000×1400.
writeFileSync(
  "public/plans/katampe-villas.svg",
  plan({
    width: 2000,
    height: 1400,
    title: "Katampe villa — ground floor",
    rooms: [
      [420, 460, 480, 340, "Living"],
      [1000, 340, 400, 300, "Kitchen"],
      [1240, 780, 460, 320, "Principal suite"],
      [140, 940, 340, 260, "Boys' quarters"],
    ],
  }),
);

console.log("wrote public/plans/kano-golf-resort.svg and public/plans/katampe-villas.svg");
