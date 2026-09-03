"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { type Group, MathUtils } from "three";
import { LazyScene } from "./LazyScene";
import { SceneFrame } from "./SceneFrame";

/** One shape per technology family, coloured to match its ecosystem. */
const NODES = [
  { color: "#8892bf", radius: 2.4, speed: 0.34, tilt: 0.0, size: 0.5, shape: "box" },
  { color: "#00add8", radius: 2.4, speed: 0.34, tilt: 2.1, size: 0.46, shape: "sphere" },
  { color: "#42b883", radius: 2.4, speed: 0.34, tilt: 4.2, size: 0.48, shape: "cone" },
  { color: "#61dafb", radius: 1.5, speed: -0.5, tilt: 1.0, size: 0.4, shape: "torus" },
  { color: "#f89820", radius: 1.5, speed: -0.5, tilt: 3.1, size: 0.4, shape: "box" },
  { color: "#dea584", radius: 1.5, speed: -0.5, tilt: 5.2, size: 0.42, shape: "octa" },
] as const;

function Node({ node }: { node: (typeof NODES)[number] }) {
  const ref = useRef<Group>(null);

  useFrame((state) => {
    const group = ref.current;
    if (!group) return;
    const angle = state.clock.elapsedTime * node.speed + node.tilt;
    group.position.set(
      Math.cos(angle) * node.radius,
      Math.sin(angle * 1.6) * 0.55,
      Math.sin(angle) * node.radius * 0.6,
    );
    group.rotation.x = angle * 0.8;
    group.rotation.y = angle * 1.1;
  });

  return (
    <group ref={ref}>
      <mesh>
        {node.shape === "box" ? (
          <boxGeometry args={[node.size, node.size, node.size]} />
        ) : node.shape === "sphere" ? (
          <sphereGeometry args={[node.size * 0.62, 24, 20]} />
        ) : node.shape === "cone" ? (
          <coneGeometry args={[node.size * 0.62, node.size * 1.2, 5]} />
        ) : node.shape === "torus" ? (
          <torusGeometry args={[node.size * 0.5, node.size * 0.2, 12, 28]} />
        ) : (
          <octahedronGeometry args={[node.size * 0.72, 0]} />
        )}
        <meshStandardMaterial
          color={node.color}
          roughness={0.28}
          metalness={0.35}
          emissive={node.color}
          emissiveIntensity={0.22}
        />
      </mesh>
    </group>
  );
}

/** A slowly turning core with the technology shapes orbiting around it. */
function Orbit() {
  const group = useRef<Group>(null);
  const rings = useMemo(() => [2.4, 1.5], []);

  useFrame((state, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.12;
    // A gentle nod so the composition never reads as perfectly flat.
    group.current.rotation.x = MathUtils.lerp(
      group.current.rotation.x,
      Math.sin(state.clock.elapsedTime * 0.3) * 0.12,
      0.05,
    );
  });

  return (
    <group ref={group}>
      <mesh>
        <icosahedronGeometry args={[0.72, 1]} />
        <meshStandardMaterial
          color="#0f172a"
          emissive="#38bdf8"
          emissiveIntensity={0.5}
          roughness={0.2}
          metalness={0.6}
          flatShading
        />
      </mesh>

      {rings.map((radius) => (
        <mesh key={radius} rotation={[Math.PI / 2, 0, 0]} scale={[1, 0.6, 1]}>
          <torusGeometry args={[radius, 0.008, 6, 90]} />
          <meshBasicMaterial color="#38bdf8" transparent opacity={0.22} />
        </mesh>
      ))}

      {NODES.map((node) => (
        <Node key={`${node.color}-${node.tilt}`} node={node} />
      ))}
    </group>
  );
}

export function TechOrbit({ className = "" }: { className?: string }) {
  return (
    <LazyScene className={className}>
      <SceneFrame camera={{ position: [0, 1.4, 6.2], fov: 42 }}>
        <ambientLight intensity={0.9} color="#c7d2fe" />
        <pointLight position={[4, 4, 4]} intensity={40} color="#7dd3fc" />
        <pointLight position={[-4, -2, 2]} intensity={26} color="#a78bfa" />
        <Orbit />
      </SceneFrame>
    </LazyScene>
  );
}
