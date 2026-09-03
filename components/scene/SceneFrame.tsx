"use client";

import { Canvas, type CanvasProps } from "@react-three/fiber";
import type { ReactNode } from "react";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

/**
 * Shared Canvas setup for the small decorative scenes: no shadows, capped
 * pixel ratio, and a single static frame when the visitor asked for less
 * motion.
 */
export function SceneFrame({
  children,
  camera,
  className,
  ...rest
}: {
  children: ReactNode;
  camera?: CanvasProps["camera"];
  className?: string;
} & Omit<CanvasProps, "children" | "camera" | "className">) {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <Canvas
      className={className}
      dpr={[1, 1.6]}
      frameloop={reducedMotion ? "demand" : "always"}
      camera={camera ?? { position: [0, 0, 6], fov: 45 }}
      gl={{ antialias: true, alpha: true, preserveDrawingBuffer: true }}
      // Every one of these scenes is decoration; the copy beside it carries
      // the meaning.
      aria-hidden="true"
      {...rest}
    >
      {children}
    </Canvas>
  );
}
