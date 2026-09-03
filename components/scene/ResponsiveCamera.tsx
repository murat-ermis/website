"use client";

import { useThree } from "@react-three/fiber";
import { useEffect } from "react";
import { Vector3 } from "three";

/** Framing tuned for a wide hero; narrower canvases dolly back from here. */
export const CAMERA_POSITION = new Vector3(4.45, 1.78, 0.8);
export const CAMERA_TARGET = new Vector3(-0.3, 1.02, 0.1);
const BASE_ASPECT = 1.55;
const MAX_DOLLY = 1.62;

type Controls = { update?: () => void } | null;

/**
 * Pulls the camera away from the target as the canvas gets narrower, so the
 * character still fits horizontally when they stand up and spread their arms.
 * Runs only on resize, leaving OrbitControls in charge while the user drags.
 */
export function ResponsiveCamera() {
  const camera = useThree((state) => state.camera);
  const size = useThree((state) => state.size);
  const controls = useThree((state) => state.controls) as Controls;

  useEffect(() => {
    const aspect = size.width / Math.max(size.height, 1);
    const dolly = Math.min(Math.max(BASE_ASPECT / aspect, 1), MAX_DOLLY);

    camera.position
      .copy(CAMERA_TARGET)
      .addScaledVector(CAMERA_POSITION.clone().sub(CAMERA_TARGET), dolly);
    camera.lookAt(CAMERA_TARGET);
    camera.updateProjectionMatrix();
    controls?.update?.();
  }, [camera, controls, size.width, size.height]);

  return null;
}
