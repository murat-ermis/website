"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import {
  BufferGeometry,
  Float32BufferAttribute,
  type Group,
  type Mesh,
  Vector3,
} from "three";
import { LazyScene } from "./LazyScene";
import { SceneFrame } from "./SceneFrame";

/**
 * A request travelling from a storefront through a gateway to a bank and back:
 * the shape of the payment work, drawn as nodes with a pulse running the edges.
 */
const NODES: { at: [number, number, number]; color: string; size: number }[] = [
  { at: [-2.6, 0.6, 0], color: "#38bdf8", size: 0.3 },
  { at: [-0.9, -0.7, 0.4], color: "#818cf8", size: 0.24 },
  { at: [0.5, 0.9, -0.3], color: "#a78bfa", size: 0.26 },
  { at: [2.2, -0.3, 0.2], color: "#22d3ee", size: 0.3 },
  { at: [0.2, -1.5, -0.5], color: "#34d399", size: 0.2 },
  { at: [1.3, 1.6, 0.3], color: "#f472b6", size: 0.2 },
];

const EDGES: [number, number][] = [
  [0, 1],
  [1, 2],
  [2, 3],
  [1, 4],
  [4, 3],
  [2, 5],
];

function Pulse({ from, to, offset }: { from: Vector3; to: Vector3; offset: number }) {
  const dot = useRef<Mesh>(null);

  useFrame((state) => {
    if (!dot.current) return;
    // Each pulse loops along its edge on its own offset.
    const t = (state.clock.elapsedTime * 0.35 + offset) % 1;
    dot.current.position.lerpVectors(from, to, t);
    const fade = Math.sin(t * Math.PI);
    dot.current.scale.setScalar(0.05 + fade * 0.06);
  });

  return (
    <mesh ref={dot}>
      <sphereGeometry args={[1, 10, 8]} />
      <meshBasicMaterial color="#e0f2fe" transparent opacity={0.9} />
    </mesh>
  );
}

function Network() {
  const group = useRef<Group>(null);

  const points = useMemo(() => NODES.map((n) => new Vector3(...n.at)), []);

  const wires = useMemo(() => {
    const geometry = new BufferGeometry();
    const positions: number[] = [];
    for (const [a, b] of EDGES) {
      positions.push(...points[a].toArray(), ...points[b].toArray());
    }
    geometry.setAttribute("position", new Float32BufferAttribute(positions, 3));
    return geometry;
  }, [points]);

  useFrame((state, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.1;
    group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.25) * 0.1;
  });

  return (
    <group ref={group}>
      <lineSegments geometry={wires}>
        <lineBasicMaterial color="#38bdf8" transparent opacity={0.28} />
      </lineSegments>

      {NODES.map((node, i) => (
        <mesh key={i} position={node.at}>
          <icosahedronGeometry args={[node.size, 1]} />
          <meshStandardMaterial
            color={node.color}
            emissive={node.color}
            emissiveIntensity={0.55}
            roughness={0.3}
            flatShading
          />
        </mesh>
      ))}

      {EDGES.map(([a, b], i) => (
        <Pulse
          key={`${a}-${b}`}
          from={points[a]}
          to={points[b]}
          offset={i / EDGES.length}
        />
      ))}
    </group>
  );
}

export function FlowNetwork({ className = "" }: { className?: string }) {
  return (
    <LazyScene className={className}>
      <SceneFrame camera={{ position: [0, 0.4, 6.4], fov: 42 }}>
        <ambientLight intensity={1.2} color="#c7d2fe" />
        <pointLight position={[3, 3, 4]} intensity={30} color="#7dd3fc" />
        <Network />
      </SceneFrame>
    </LazyScene>
  );
}
