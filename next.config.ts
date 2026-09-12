import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  images: {
    // Placeholder photography. Swaps to the real asset host with the fixtures.
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
  },

  // Pins the workspace root to this repo so Turbopack does not infer it from a
  // stray package-lock.json further up the tree.
  turbopack: {
    root: path.join(__dirname),
  },
};

export default nextConfig;
