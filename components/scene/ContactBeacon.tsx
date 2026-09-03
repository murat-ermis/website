"use client";

import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import type { Group, Mesh } from "three";
import { LazyScene } from "./LazyScene";
import { SceneFrame } from "./SceneFrame";

/** A knot that speeds up while the pointer is over it. */
function Beacon() {
  const group = useRef<Group>(null);
  const knot = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const speed = useRef(1);

  useFrame((state, delta) => {
    speed.current += ((hovered ? 3.2 : 1) - speed.current) * Math.min(delta * 4, 1);
    if (knot.current) {
      knot.current.rotation.x += delta * 0.3 * speed.current;
      knot.current.rotation.y += delta * 0.45 * speed.current;
    }
    if (group.current) {
      group.current.position.y = Math.sin(state.clock.elapsedTime * 0.9) * 0.12;
    }
  });

  return (
    <group ref={group}>
      <mesh
        ref={knot}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <torusKnotGeometry args={[0.78, 0.23, 140, 20]} />
        <meshStandardMaterial
          color="#1e293b"
          emissive="#38bdf8"
          emissiveIntensity={hovered ? 0.75 : 0.35}
          roughness={0.22}
          metalness={0.7}
        />
      </mesh>
      <mesh scale={2.1}>
        <sphereGeometry args={[1, 24, 18]} />
        <meshBasicMaterial color="#0ea5e9" transparent opacity={0.045} />
      </mesh>
    </group>
  );
}

export function ContactBeacon({ className = "" }: { className?: string }) {
  return (
    <LazyScene className={className}>
      <SceneFrame camera={{ position: [0, 0, 5.2], fov: 42 }}>
        <ambientLight intensity={0.7} color="#c7d2fe" />
        <pointLight position={[3, 3, 4]} intensity={38} color="#7dd3fc" />
        <pointLight position={[-3, -2, 2]} intensity={22} color="#a78bfa" />
        <Beacon />
      </SceneFrame>
    </LazyScene>
  );
}
