"use client";

import { useFrame } from "@react-three/fiber";
import { type RefObject, useRef } from "react";
import type { Group, Mesh, MeshBasicMaterial } from "three";

const DESK_TOP_Y = 0.74;
const DESK_Z = 0.68;
const WOOD = "#8b5e3c";
const WOOD_DARK = "#6b452c";
const METAL = "#475569";
const PLASTIC = "#1e293b";

/** Screen text metrics: 15 rows fit inside the 0.5 m tall panel. */
const ROW_HEIGHT = 0.027;
const ROW_COUNT = 15;

/**
 * The desk sits in front of the character (+Z) with the monitor pushed off to
 * one side so it never occludes the character from the hero camera.
 */
export function Workstation({
  chairRef,
  speedRef,
}: {
  chairRef: RefObject<Group | null>;
  speedRef: RefObject<number>;
}) {
  return (
    <group>
      <Desk />
      <Monitor speedRef={speedRef} />
      <Keyboard />
      <Mug />
      <group ref={chairRef}>
        <Chair />
      </group>
    </group>
  );
}

function Desk() {
  return (
    <group position={[0, 0, DESK_Z]}>
      <mesh castShadow receiveShadow position={[-0.1, DESK_TOP_Y, 0]}>
        <boxGeometry args={[2.1, 0.05, 0.78]} />
        <meshStandardMaterial color={WOOD} roughness={0.6} />
      </mesh>
      <mesh receiveShadow position={[-0.1, DESK_TOP_Y - 0.05, 0]}>
        <boxGeometry args={[2.06, 0.05, 0.74]} />
        <meshStandardMaterial color={WOOD_DARK} roughness={0.8} />
      </mesh>
      {[
        [-1.09, -0.32],
        [-1.09, 0.32],
        [0.89, -0.32],
        [0.89, 0.32],
      ].map(([x, z]) => (
        <mesh key={`${x}:${z}`} castShadow position={[x, DESK_TOP_Y / 2, z]}>
          <boxGeometry args={[0.05, DESK_TOP_Y, 0.05]} />
          <meshStandardMaterial color={METAL} roughness={0.5} metalness={0.3} />
        </mesh>
      ))}
    </group>
  );
}

/** Monitor with a screen that flickers as if code were scrolling past. */
function Monitor({ speedRef }: { speedRef: RefObject<number> }) {
  const screen = useRef<Mesh>(null);
  const life = useRef(0);

  useFrame((_, delta) => {
    life.current += Math.min(delta, 1 / 20) * speedRef.current;
    const mat = screen.current?.material as MeshBasicMaterial | undefined;
    if (!mat) return;
    // Subtle brightness drift so the screen never looks like a static decal.
    const t = life.current;
    const glow = 0.055 + Math.sin(t * 2.3) * 0.012 + Math.sin(t * 11.7) * 0.006;
    mat.color.setRGB(glow * 0.35, glow * 0.75, glow);
  });

  return (
    <group position={[-0.88, 0, DESK_Z + 0.1]} rotation={[0, -1.0, 0]}>
      <mesh castShadow position={[0, DESK_TOP_Y + 0.05, 0]}>
        <boxGeometry args={[0.26, 0.02, 0.18]} />
        <meshStandardMaterial color={PLASTIC} roughness={0.5} />
      </mesh>
      <mesh castShadow position={[0, DESK_TOP_Y + 0.14, 0]}>
        <boxGeometry args={[0.05, 0.18, 0.05]} />
        <meshStandardMaterial color={PLASTIC} roughness={0.5} />
      </mesh>
      <mesh castShadow position={[0, DESK_TOP_Y + 0.42, 0]}>
        <boxGeometry args={[0.94, 0.56, 0.03]} />
        <meshStandardMaterial color={PLASTIC} roughness={0.5} />
      </mesh>
      <mesh
        ref={screen}
        position={[0, DESK_TOP_Y + 0.42, -0.02]}
        rotation={[0, Math.PI, 0]}
      >
        <planeGeometry args={[0.88, 0.5]} />
        <meshBasicMaterial color="#0c1f30" />
      </mesh>
      <CodeLines />
    </group>
  );
}

/** Fake syntax-highlighted lines drawn as thin quads on the screen. */
function CodeLines() {
  const rows = useRef<Group>(null);
  const life = useRef(0);

  useFrame((_, delta) => {
    life.current += Math.min(delta, 1 / 20);
    if (rows.current) {
      // Scrolling by one row height and wrapping keeps every line on-screen.
      rows.current.position.y = -((life.current * 0.035) % ROW_HEIGHT);
    }
  });

  const palette = ["#7dd3fc", "#c4b5fd", "#fbbf24", "#4ade80", "#f9a8d4"];
  const lines = Array.from({ length: ROW_COUNT }, (_, i) => ({
    width: 0.12 + ((i * 37) % 47) / 110,
    indent: (i % 3) * 0.06,
    color: palette[i % palette.length],
  }));

  return (
    <group
      position={[0, DESK_TOP_Y + 0.42, -0.023]}
      rotation={[0, Math.PI, 0]}
    >
      <group ref={rows}>
        {lines.map((line, i) => (
          <mesh
            key={i}
            position={[
              -0.37 + line.indent + line.width / 2,
              0.21 - i * ROW_HEIGHT,
              0,
            ]}
          >
            <planeGeometry args={[line.width, 0.008]} />
            <meshBasicMaterial color={line.color} transparent opacity={0.8} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

function Keyboard() {
  return (
    <group position={[0.02, DESK_TOP_Y + 0.03, DESK_Z - 0.28]} rotation={[0, -0.1, 0]}>
      <mesh castShadow rotation={[-0.04, 0, 0]}>
        <boxGeometry args={[0.44, 0.018, 0.15]} />
        <meshStandardMaterial color="#111827" roughness={0.6} />
      </mesh>
      <mesh position={[0.35, -0.004, 0.02]}>
        <boxGeometry args={[0.09, 0.012, 0.13]} />
        <meshStandardMaterial color="#111827" roughness={0.6} />
      </mesh>
    </group>
  );
}

function Mug() {
  return (
    <group position={[0.58, DESK_TOP_Y + 0.06, DESK_Z + 0.05]}>
      <mesh castShadow>
        <cylinderGeometry args={[0.045, 0.04, 0.1, 16]} />
        <meshStandardMaterial color="#e2e8f0" roughness={0.4} />
      </mesh>
      <mesh position={[0, 0.048, 0]}>
        <cylinderGeometry args={[0.038, 0.038, 0.008, 16]} />
        <meshStandardMaterial color="#4a2c17" roughness={0.3} />
      </mesh>
      <mesh position={[0.055, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.025, 0.007, 8, 16]} />
        <meshStandardMaterial color="#e2e8f0" roughness={0.4} />
      </mesh>
    </group>
  );
}

/** Office chair; the parent group slides it back when the character stands. */
function Chair() {
  return (
    <group position={[0, 0, -0.06]}>
      <mesh castShadow receiveShadow position={[0, 0.395, 0]}>
        <boxGeometry args={[0.46, 0.07, 0.44]} />
        <meshStandardMaterial color={PLASTIC} roughness={0.75} />
      </mesh>
      <mesh castShadow position={[0, 0.7, -0.22]} rotation={[0.16, 0, 0]}>
        <boxGeometry args={[0.44, 0.52, 0.07]} />
        <meshStandardMaterial color={PLASTIC} roughness={0.75} />
      </mesh>
      <mesh castShadow position={[0, 0.235, 0]}>
        <cylinderGeometry args={[0.045, 0.045, 0.3, 12]} />
        <meshStandardMaterial color={METAL} roughness={0.4} metalness={0.5} />
      </mesh>
      {[0, 1, 2, 3, 4].map((i) => {
        const angle = (i / 5) * Math.PI * 2;
        return (
          <group key={i} rotation={[0, angle, 0]}>
            <mesh castShadow position={[0, 0.1, 0.13]}>
              <boxGeometry args={[0.05, 0.03, 0.28]} />
              <meshStandardMaterial color={METAL} roughness={0.5} />
            </mesh>
            <mesh castShadow position={[0, 0.04, 0.26]}>
              <sphereGeometry args={[0.04, 10, 10]} />
              <meshStandardMaterial color="#0f172a" roughness={0.6} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}
