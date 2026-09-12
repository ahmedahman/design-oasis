"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";

import { Panorama } from "./scenes/panorama";

/**
 * The only module that mounts a WebGL context. Loaded through next/dynamic with
 * ssr:false from `hero.tsx`, so three.js never reaches the initial bundle.
 *
 * `frameloop="demand"` is deliberately NOT used here: the panorama drifts, so
 * it needs a continuous loop. R3F tears the context down on unmount, and the
 * canvas only exists while the hero is mounted.
 */
export function HeroScene({ src, drift }: { src: string; drift: boolean }) {
  return (
    <Canvas
      camera={{ fov: 74, near: 1, far: 1100, position: [0, 0, 0] }}
      // Cap the pixel ratio: a retina panorama at DPR 3 costs far more than it
      // shows, and this is a background.
      dpr={[1, 1.75]}
      gl={{ antialias: false, powerPreference: "high-performance" }}
      style={{ position: "absolute", inset: 0 }}
    >
      <Suspense fallback={null}>
        <Panorama src={src} drift={drift} />
      </Suspense>
    </Canvas>
  );
}

export default HeroScene;
