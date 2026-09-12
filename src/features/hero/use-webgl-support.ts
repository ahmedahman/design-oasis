"use client";

import { useEffect, useState } from "react";

type Support = "pending" | "ok" | "unsupported";

/**
 * Decides whether the WebGL scene is allowed to load at all.
 *
 * The hero must never be the reason a page fails, so this refuses on three
 * counts: no WebGL context, the user asking the browser to save data, and a
 * device reporting too little memory to carry a texture this size.
 */
export function useWebGLSupport(): Support {
  const [support, setSupport] = useState<Support>("pending");

  useEffect(() => {
    type NavigatorWithHints = Navigator & {
      connection?: { saveData?: boolean };
      deviceMemory?: number;
    };
    const nav = navigator as NavigatorWithHints;

    if (nav.connection?.saveData) {
      setSupport("unsupported");
      return;
    }

    // Reported in GiB. Anything under 4 is not worth a 4K equirect texture.
    if (typeof nav.deviceMemory === "number" && nav.deviceMemory < 4) {
      setSupport("unsupported");
      return;
    }

    try {
      const canvas = document.createElement("canvas");
      const gl =
        canvas.getContext("webgl2") ??
        canvas.getContext("webgl") ??
        canvas.getContext("experimental-webgl");

      if (!gl) {
        setSupport("unsupported");
        return;
      }

      // Release the probe context immediately rather than waiting for GC —
      // browsers cap the number of live contexts.
      (gl as WebGLRenderingContext).getExtension("WEBGL_lose_context")?.loseContext();
      setSupport("ok");
    } catch {
      setSupport("unsupported");
    }
  }, []);

  return support;
}
