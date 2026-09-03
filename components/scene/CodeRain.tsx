"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { Color, type InstancedMesh, MathUtils, Object3D } from "three";
import { LazyScene } from "./LazyScene";
import { SceneFrame } from "./SceneFrame";

const COLUMNS = 22;
const PER_COLUMN = 9;
const COUNT = COLUMNS * PER_COLUMN;
const TOP = 3.4;
const BOTTOM = -3.4;
const SPAN = TOP - BOTTOM;

/** Deterministic pseudo-random, so the layout is stable across renders. */
const seeded = (i: number, salt: number) => {
  const x = Math.sin(i * 91.7 + salt * 57.3) * 43758.5453;
  return x - Math.floor(x);
};

/** Glyph-sized bars falling in columns, like code scrolling past. */
function Rain() {
  const mesh = useRef<InstancedMesh>(null);
  const dummy = useMemo(() => new Object3D(), []);

  const cells = useMemo(
    () =>
      Array.from({ length: COUNT }, (_, i) => {
        const column = Math.floor(i / PER_COLUMN);
        return {
          x: MathUtils.lerp(-5.2, 5.2, column / (COLUMNS - 1)),
          z: MathUtils.lerp(-2.5, 0.4, seeded(column, 3)),
          speed: MathUtils.lerp(0.5, 1.5, seeded(column, 1)),
          offset: seeded(i, 2) * SPAN,
          width: MathUtils.lerp(0.06, 0.2, seeded(i, 4)),
        };
      }),
    [],
  );

  const colors = useMemo(() => {
    const palette = ["#38bdf8", "#5eead4", "#c4b5fd", "#fbbf24"];
    const list = new Float32Array(COUNT * 3);
    const color = new Color();
    for (let i = 0; i < COUNT; i++) {
      color.set(palette[Math.floor(seeded(i, 7) * palette.length)]);
      color.toArray(list, i * 3);
    }
    return list;
  }, []);

  useFrame((state) => {
    const node = mesh.current;
    if (!node) return;
    const t = state.clock.elapsedTime;

    for (let i = 0; i < COUNT; i++) {
      const cell = cells[i];
      // Wrap each bar back to the top once it falls past the bottom.
      const y = TOP - ((cell.offset + t * cell.speed) % SPAN);
      dummy.position.set(cell.x, y, cell.z);
      dummy.scale.set(cell.width, 0.022, 1);
      dummy.updateMatrix();
      node.setMatrixAt(i, dummy.matrix);
    }
    node.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, COUNT]}>
      <planeGeometry args={[1, 1]}>
        <instancedBufferAttribute attach="attributes-color" args={[colors, 3]} />
      </planeGeometry>
      <meshBasicMaterial vertexColors transparent opacity={0.5} />
    </instancedMesh>
  );
}

export function CodeRain({ className = "" }: { className?: string }) {
  return (
    <LazyScene className={`pointer-events-none absolute inset-0 ${className}`}>
      <SceneFrame camera={{ position: [0, 0, 6], fov: 46 }}>
        <Rain />
      </SceneFrame>
    </LazyScene>
  );
}
