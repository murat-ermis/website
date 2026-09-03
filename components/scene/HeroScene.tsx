"use client";

import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { type RefObject, Suspense, useRef } from "react";
import type { Group } from "three";
import { DeveloperCharacter } from "./DeveloperCharacter";
import type { PhaseId } from "./poses";
import { CAMERA_POSITION, CAMERA_TARGET, ResponsiveCamera } from "./ResponsiveCamera";
import { Room } from "./Room";
import { Workstation } from "./Workstation";

const DESK_TOP_Y = 0.74;

type Props = {
  speedRef: RefObject<number>;
  clockRef: RefObject<number>;
  onPhaseChange: (id: PhaseId) => void;
};

export default function HeroScene({ speedRef, clockRef, onPhaseChange }: Props) {
  const chairRef = useRef<Group>(null);

  return (
    <Canvas
      // "percentage" maps to PCFShadowMap; three deprecated PCFSoftShadowMap.
      shadows="percentage"
      dpr={[1, 2]}
      // preserveDrawingBuffer keeps the canvas readable after a frame, so
      // screenshots and link-preview crawlers capture the scene instead of a
      // blank rectangle. The cost is negligible for a scene this small.
      gl={{
        antialias: true,
        powerPreference: "high-performance",
        preserveDrawingBuffer: true,
      }}
      camera={{
        position: CAMERA_POSITION.toArray(),
        fov: 40,
        near: 0.1,
        far: 60,
      }}
      // The scene is decorative; the page states the same thing in text.
      aria-hidden="true"
    >
      <color attach="background" args={["#10131f"]} />
      <fog attach="fog" args={["#10131f", 6, 14]} />

      <ResponsiveCamera />
      <OrbitControls
        makeDefault
        target={CAMERA_TARGET.toArray()}
        enablePan={false}
        enableZoom={false}
        enableDamping
        dampingFactor={0.08}
        minPolarAngle={Math.PI * 0.24}
        maxPolarAngle={Math.PI * 0.5}
        minAzimuthAngle={Math.PI * 0.22}
        maxAzimuthAngle={Math.PI * 0.66}
      />

      <ambientLight intensity={0.55} color="#b9c5ff" />
      <hemisphereLight args={["#8ea2ff", "#1b2038", 0.5]} />
      <directionalLight
        castShadow
        position={[4.6, 5.4, 2.2]}
        intensity={1.5}
        shadow-mapSize={[2048, 2048]}
        shadow-bias={-0.0005}
        shadow-camera-near={0.5}
        shadow-camera-far={16}
        shadow-camera-left={-4}
        shadow-camera-right={4}
        shadow-camera-top={4}
        shadow-camera-bottom={-4}
      />
      {/* Monitor backwash on the character's face while they are at the desk. */}
      <pointLight
        position={[-0.42, DESK_TOP_Y + 0.4, 0.42]}
        intensity={2.2}
        distance={3}
        decay={2}
        color="#5cc8ff"
      />
      {/* Cool bounce from the window on the back wall. */}
      <pointLight
        position={[-2.6, 1.9, 0.9]}
        intensity={3.2}
        distance={5}
        decay={2}
        color="#3b82f6"
      />

      <Suspense fallback={null}>
        <Room />
        <Workstation chairRef={chairRef} speedRef={speedRef} />
        <DeveloperCharacter
          chairRef={chairRef}
          speedRef={speedRef}
          clockRef={clockRef}
          onPhaseChange={onPhaseChange}
        />
      </Suspense>
    </Canvas>
  );
}
