"use client";

import { useSyncExternalStore } from "react";

type Support = "pending" | "ok" | "unsupported";

/**
 * Decides whether the WebGL scene is allowed to load at all.
 *
 * The hero must never be the reason a page fails, so this refuses on three
 * counts: no WebGL context, the user asking the browser to save data, and a
 * device reporting too little memory to carry a texture this size.
 *
 * Read through `useSyncExternalStore` rather than an effect: the answer cannot
 * change during a session, so it is probed once, cached at module scope, and
 * returned as a stable snapshot — no cascading render, and SSR gets "pending".
 */
let cached: Support | null = null;

function probe(): Support {
  if (cached) return cached;

  type NavigatorWithHints = Navigator & {
    connection?: { saveData?: boolean };
    deviceMemory?: number;
  };
  const nav = navigator as NavigatorWithHints;

  if (nav.connection?.saveData) return (cached = "unsupported");

  // Reported in GiB. Anything under 4 is not worth a 4K equirect texture.
  if (typeof nav.deviceMemory === "number" && nav.deviceMemory < 4) {
    return (cached = "unsupported");
  }

  try {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl2") ?? canvas.getContext("webgl");
    if (!gl) return (cached = "unsupported");

    // Release the probe context immediately rather than waiting for GC —
    // browsers cap the number of live contexts.
    gl.getExtension("WEBGL_lose_context")?.loseContext();
    return (cached = "ok");
  } catch {
    return (cached = "unsupported");
  }
}

/** The environment never changes mid-session, so there is nothing to subscribe to. */
const subscribe = () => () => {};
const serverSnapshot = (): Support => "pending";

export function useWebGLSupport(): Support {
  return useSyncExternalStore(subscribe, probe, serverSnapshot);
}
