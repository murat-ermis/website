"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Group } from "three";

const WALL = "#171b2e";
const WALL_SIDE = "#141828";
const FLOOR = "#1e2338";
const RUG = "#2b3350";

/** Floor, back wall and the few props that give the room some depth. */
export function Room() {
  return (
    <group>
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[24, 24]} />
        <meshStandardMaterial color={FLOOR} roughness={0.95} />
      </mesh>
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[-0.3, 0.002, -0.1]}>
        <circleGeometry args={[2.1, 40]} />
        <meshStandardMaterial color={RUG} roughness={1} />
      </mesh>

      {/* Far wall, facing the camera across the desk. */}
      <mesh receiveShadow position={[-3.1, 2.4, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[14, 4.8]} />
        <meshStandardMaterial color={WALL} roughness={1} />
      </mesh>
      {/* Wall the desk backs onto, seen edge-on at the right of frame. */}
      <mesh receiveShadow position={[0, 2.4, 1.9]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[14, 4.8]} />
        <meshStandardMaterial color={WALL_SIDE} roughness={1} />
      </mesh>

      <Plant position={[-2.35, 0, 0.95]} />
      <Shelf />
      <Window />
    </group>
  );
}

function Plant({ position }: { position: [number, number, number] }) {
  const leaves = useRef<Group>(null);

  useFrame((state) => {
    if (leaves.current) {
      // Barely-there sway so the room does not feel frozen.
      leaves.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.6) * 0.03;
    }
  });

  return (
    <group position={position}>
      <mesh castShadow receiveShadow position={[0, 0.17, 0]}>
        <cylinderGeometry args={[0.17, 0.13, 0.34, 14]} />
        <meshStandardMaterial color="#9a5b3f" roughness={0.85} />
      </mesh>
      <group ref={leaves} position={[0, 0.34, 0]}>
        {[0, 1, 2, 3, 4, 5].map((i) => {
          const angle = (i / 6) * Math.PI * 2;
          const tilt = 0.5 + (i % 3) * 0.12;
          return (
            <mesh
              key={i}
              castShadow
              position={[Math.cos(angle) * 0.16, 0.34, Math.sin(angle) * 0.16]}
              rotation={[Math.sin(angle) * tilt, angle, Math.cos(angle) * -tilt]}
            >
              <capsuleGeometry args={[0.055, 0.42, 5, 10]} />
              <meshStandardMaterial color="#3f8f5e" roughness={0.85} />
            </mesh>
          );
        })}
      </group>
    </group>
  );
}

function Shelf() {
  const books = ["#ef4444", "#f59e0b", "#22d3ee", "#a78bfa", "#34d399"];
  return (
    <group position={[-3.0, 1.6, -0.55]} rotation={[0, Math.PI / 2, 0]}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[1.3, 0.05, 0.26]} />
        <meshStandardMaterial color="#3f2f24" roughness={0.8} />
      </mesh>
      {books.map((color, i) => (
        <mesh key={color} castShadow position={[-0.42 + i * 0.14, 0.15, 0]}>
          <boxGeometry args={[0.06, 0.25, 0.18]} />
          <meshStandardMaterial color={color} roughness={0.75} />
        </mesh>
      ))}
    </group>
  );
}

/** A lit window pane on the back wall, doubling as the scene's key colour. */
function Window() {
  return (
    <group position={[-3.04, 1.9, 1.0]} rotation={[0, Math.PI / 2, 0]}>
      <mesh>
        <planeGeometry args={[1.3, 1.4]} />
        <meshStandardMaterial
          color="#0f172a"
          emissive="#1e40af"
          emissiveIntensity={0.22}
          roughness={0.4}
        />
      </mesh>
      <mesh position={[0, 0, 0.01]}>
        <boxGeometry args={[0.035, 1.4, 0.02]} />
        <meshStandardMaterial color="#0b1020" roughness={0.8} />
      </mesh>
      <mesh position={[0, 0, 0.01]}>
        <boxGeometry args={[1.3, 0.035, 0.02]} />
        <meshStandardMaterial color="#0b1020" roughness={0.8} />
      </mesh>
    </group>
  );
}
