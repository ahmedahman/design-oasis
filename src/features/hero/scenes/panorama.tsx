"use client";

import { useFrame, useLoader, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
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
 * Asset cost is one JPG, which is why this variant ships first — a real Design
 * Oasis interior drops straight in with no code change.
 */
export function Panorama({ src, drift }: PanoramaProps) {
  const texture = useLoader(THREE.TextureLoader, src);
  const { camera, gl } = useThree();

  const lon = useRef(0);
  const lat = useRef(0);
  const dragging = useRef(false);
  const last = useRef({ x: 0, y: 0 });

  useEffect(() => {
    texture.colorSpace = THREE.SRGBColorSpace;
  }, [texture]);

  useEffect(() => {
    const el = gl.domElement;

    function down(event: PointerEvent) {
      dragging.current = true;
      last.current = { x: event.clientX, y: event.clientY };
      el.setPointerCapture(event.pointerId);
      el.style.cursor = "grabbing";
    }

    function move(event: PointerEvent) {
      if (!dragging.current) return;
      lon.current -= (event.clientX - last.current.x) * 0.12;
      lat.current += (event.clientY - last.current.y) * 0.12;
      // Stop short of the poles, where an equirect image degenerates.
      lat.current = Math.max(-70, Math.min(70, lat.current));
      last.current = { x: event.clientX, y: event.clientY };
    }

    function up(event: PointerEvent) {
      dragging.current = false;
      if (el.hasPointerCapture(event.pointerId)) el.releasePointerCapture(event.pointerId);
      el.style.cursor = "grab";
    }

    el.style.cursor = "grab";
    // touch-action is what stops the browser stealing the drag to scroll.
    el.style.touchAction = "none";
    el.addEventListener("pointerdown", down);
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerup", up);
    el.addEventListener("pointercancel", up);

    return () => {
      el.removeEventListener("pointerdown", down);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerup", up);
      el.removeEventListener("pointercancel", up);
    };
  }, [gl]);

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

  return (
    <mesh scale={[-1, 1, 1]}>
      <sphereGeometry args={[500, 60, 40]} />
      <meshBasicMaterial map={texture} side={THREE.BackSide} toneMapped={false} />
    </mesh>
  );
}
