"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { Color, type InstancedMesh, MathUtils, Object3D } from "three";
import { LazyScene } from "./LazyScene";
import { SceneFrame } from "./SceneFrame";

const COUNT = 90;
const PALETTE = ["#38bdf8", "#818cf8", "#a78bfa", "#22d3ee"];

type Seed = {
  position: [number, number, number];
  scale: number;
  spin: [number, number, number];
  drift: number;
  phase: number;
};

/** Deterministic pseudo-random so the layout never shifts between renders. */
function seeded(i: number, salt: number) {
  const x = Math.sin(i * 127.1 + salt * 311.7) * 43758.5453;
  return x - Math.floor(x);
}

/** A slow drift of translucent shards, used as a full-bleed section backdrop. */
function Shards() {
  const mesh = useRef<InstancedMesh>(null);
  const dummy = useMemo(() => new Object3D(), []);

  const seeds = useMemo<Seed[]>(
    () =>
      Array.from({ length: COUNT }, (_, i) => ({
        position: [
          MathUtils.lerp(-9, 9, seeded(i, 1)),
          MathUtils.lerp(-4.5, 4.5, seeded(i, 2)),
          MathUtils.lerp(-7, 1.5, seeded(i, 3)),
        ],
        scale: MathUtils.lerp(0.1, 0.42, seeded(i, 4)),
        spin: [
          MathUtils.lerp(-0.3, 0.3, seeded(i, 5)),
          MathUtils.lerp(-0.3, 0.3, seeded(i, 6)),
          MathUtils.lerp(-0.3, 0.3, seeded(i, 7)),
        ],
        drift: MathUtils.lerp(0.1, 0.36, seeded(i, 8)),
        phase: seeded(i, 9) * Math.PI * 2,
      })),
    [],
  );

  useFrame((state) => {
    const node = mesh.current;
    if (!node) return;
    const t = state.clock.elapsedTime;

    for (let i = 0; i < COUNT; i++) {
      const seed = seeds[i];
      dummy.position.set(
        seed.position[0] + Math.sin(t * seed.drift + seed.phase) * 0.5,
        seed.position[1] + Math.cos(t * seed.drift * 0.8 + seed.phase) * 0.4,
        seed.position[2],
      );
      dummy.rotation.set(
        t * seed.spin[0] + seed.phase,
        t * seed.spin[1] + seed.phase,
        t * seed.spin[2],
      );
      dummy.scale.setScalar(seed.scale);
      dummy.updateMatrix();
      node.setMatrixAt(i, dummy.matrix);
    }
    node.instanceMatrix.needsUpdate = true;
  });

  // Colours are baked once; only the transforms change per frame.
  const colors = useMemo(() => {
    const list = new Float32Array(COUNT * 3);
    const color = new Color();
    for (let i = 0; i < COUNT; i++) {
      color.set(PALETTE[i % PALETTE.length]);
      color.toArray(list, i * 3);
    }
    return list;
  }, []);

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, COUNT]}>
      <octahedronGeometry args={[1, 0]}>
        <instancedBufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </octahedronGeometry>
      <meshStandardMaterial
        vertexColors
        transparent
        opacity={0.32}
        roughness={0.35}
        metalness={0.1}
      />
    </instancedMesh>
  );
}

/** Absolutely positioned so it can sit behind a whole section. */
export function AmbientField({ className = "" }: { className?: string }) {
  return (
    <LazyScene className={`pointer-events-none absolute inset-0 ${className}`}>
      <SceneFrame camera={{ position: [0, 0, 8], fov: 50 }}>
        <ambientLight intensity={1.1} color="#c7d2fe" />
        <directionalLight position={[4, 6, 5]} intensity={1.4} />
        <Shards />
      </SceneFrame>
    </LazyScene>
  );
}
