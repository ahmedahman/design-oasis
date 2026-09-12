"use client";

import { useFrame, useThree, type ThreeEvent } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

type PanoramaProps = {
  src: string;
  /** Idle drift is suppressed under prefers-reduced-motion. */
  drift: boolean;
};

/**
 * An equirectangular image on a sphere turned inside out, with the camera at
 * its centre. Dragging looks around; releasing hands back to a slow drift.
 *
 * The texture is loaded imperatively rather than through `useLoader` so its
 * colour space can be set on a local before it ever reaches React, and so it
 * can be disposed on unmount. Pointer-down comes from R3F's own event system
 * and move/up from the window, which keeps the renderer untouched.
 */
export function Panorama({ src, drift }: PanoramaProps) {
  const [texture, setTexture] = useState<THREE.Texture | null>(null);
  const { camera, invalidate } = useThree();

  const lon = useRef(0);
  const lat = useRef(0);
  const dragging = useRef(false);
  const last = useRef({ x: 0, y: 0 });

  useEffect(() => {
    let disposed = false;
    let loaded: THREE.Texture | null = null;

    new THREE.TextureLoader().load(src, (tex) => {
      if (disposed) {
        tex.dispose();
        return;
      }
      tex.colorSpace = THREE.SRGBColorSpace;
      loaded = tex;
      setTexture(tex);
      invalidate();
    });

    return () => {
      disposed = true;
      loaded?.dispose();
    };
  }, [src, invalidate]);

  useEffect(() => {
    function move(event: PointerEvent) {
      if (!dragging.current) return;
      lon.current -= (event.clientX - last.current.x) * 0.12;
      lat.current += (event.clientY - last.current.y) * 0.12;
      // Stop short of the poles, where an equirect image degenerates.
      lat.current = Math.max(-70, Math.min(70, lat.current));
      last.current = { x: event.clientX, y: event.clientY };
    }

    function up() {
      dragging.current = false;
      document.body.removeAttribute("data-dragging");
    }

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerup", up);
    window.addEventListener("pointercancel", up);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      window.removeEventListener("pointercancel", up);
    };
  }, []);

  function onPointerDown(event: ThreeEvent<PointerEvent>) {
    dragging.current = true;
    last.current = { x: event.clientX, y: event.clientY };
    document.body.setAttribute("data-dragging", "");
  }

  useFrame((_, delta) => {
    if (drift && !dragging.current) lon.current += delta * 1.2;

    const phi = THREE.MathUtils.degToRad(90 - lat.current);
    const theta = THREE.MathUtils.degToRad(lon.current);

    camera.lookAt(
      500 * Math.sin(phi) * Math.cos(theta),
      500 * Math.cos(phi),
      500 * Math.sin(phi) * Math.sin(theta),
    );
  });

  if (!texture) return null;

  return (
    <mesh scale={[-1, 1, 1]} onPointerDown={onPointerDown}>
      <sphereGeometry args={[500, 60, 40]} />
      <meshBasicMaterial map={texture} side={THREE.BackSide} toneMapped={false} />
    </mesh>
  );
}
