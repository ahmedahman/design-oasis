/**
 * Generates the placeholder hero assets: an equirectangular panorama and a
 * matching poster crop, in the brand palette.
 *
 * This exists so the hero ships without hotlinking a stock panorama (CORS and
 * licensing both bite there). Replace public/hero/panorama.png with a real
 * Design Oasis interior — 2:1 equirectangular — and delete this script.
 *
 *   node scripts/generate-hero-placeholder.mjs
 */
import { deflateSync } from "node:zlib";
import { writeFileSync } from "node:fs";

const NAVY = [0x0b, 0x0c, 0x2e];
const NAVY_MID = [0x1b, 0x1b, 0x4e];
const BONE = [0xfa, 0xf8, 0xf4];
const LIME = [0x8d, 0xc6, 0x3f];

const mix = (a, b, t) => a.map((v, i) => Math.round(v + (b[i] - v) * Math.max(0, Math.min(1, t))));
const smooth = (t) => t * t * (3 - 2 * t);

/** Deterministic value noise, so regenerating gives the identical file. */
function noise(x, y) {
  const s = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453;
  return s - Math.floor(s);
}

function sample(u, v) {
  // u: 0..1 around the horizon. v: 0..1 top to bottom.
  const horizon = 0.52;

  let rgb;
  if (v < horizon) {
    // Ceiling: bone washing down to navy as it approaches the horizon.
    const t = smooth(v / horizon);
    rgb = mix(BONE, NAVY_MID, t * 0.92);
  } else {
    // Floor: navy, darkening downward.
    const t = smooth((v - horizon) / (1 - horizon));
    rgb = mix(NAVY_MID, NAVY, t);
  }

  // Vertical bays — the structure that makes dragging legible.
  const bays = 8;
  const phase = (u * bays) % 1;
  const bay = Math.abs(phase - 0.5) * 2;
  const nearHorizon = 1 - Math.min(1, Math.abs(v - horizon) / 0.34);

  // Warm light spilling from each opening.
  const glow = Math.pow(1 - bay, 3) * nearHorizon;
  rgb = mix(rgb, BONE, glow * 0.55);

  // A single lime reveal line along the horizon.
  const line = Math.pow(1 - Math.min(1, Math.abs(v - horizon) / 0.006), 2);
  rgb = mix(rgb, LIME, line * 0.5 * (0.35 + 0.65 * Math.pow(1 - bay, 2)));

  // Grain, so flat areas do not band.
  const g = (noise(Math.floor(u * 900), Math.floor(v * 900)) - 0.5) * 9;
  return rgb.map((c) => Math.max(0, Math.min(255, Math.round(c + g))));
}

function png(width, height, pixel) {
  // One filter byte (0 = none) per scanline, then RGB triples.
  const raw = Buffer.alloc(height * (1 + width * 3));
  let p = 0;
  for (let y = 0; y < height; y++) {
    raw[p++] = 0;
    for (let x = 0; x < width; x++) {
      const [r, g, b] = pixel(x / width, y / height);
      raw[p++] = r;
      raw[p++] = g;
      raw[p++] = b;
    }
  }

  const chunk = (type, data) => {
    const len = Buffer.alloc(4);
    len.writeUInt32BE(data.length);
    const body = Buffer.concat([Buffer.from(type, "ascii"), data]);
    const crc = Buffer.alloc(4);
    crc.writeUInt32BE(crc32(body) >>> 0);
    return Buffer.concat([len, body, crc]);
  };

  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 2; // truecolour
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk("IHDR", ihdr),
    chunk("IDAT", deflateSync(raw, { level: 9 })),
    chunk("IEND", Buffer.alloc(0)),
  ]);
}

const CRC_TABLE = Array.from({ length: 256 }, (_, n) => {
  let c = n;
  for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  return c >>> 0;
});

function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) c = CRC_TABLE[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return c ^ 0xffffffff;
}

writeFileSync("public/hero/panorama.png", png(2048, 1024, sample));

// The poster is the same scene through the camera's default framing, so the
// crossfade from poster to canvas has nothing to give away.
writeFileSync(
  "public/hero/poster.png",
  png(1920, 1080, (u, v) => sample(0.5 + (u - 0.5) * 0.2, 0.5 + (v - 0.5) * 0.38)),
);

console.log("wrote public/hero/panorama.png and public/hero/poster.png");
