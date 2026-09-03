"use client";

import { useFrame } from "@react-three/fiber";
import { type RefObject, useRef } from "react";
import type { Group } from "three";
import {
  type Pose,
  POSE_KEYS,
  PHASES,
  type PhaseId,
  resolvePhase,
  restPose,
} from "./poses";

const SKIN = "#e9b08a";
const HAIR = "#241c26";
const SHIRT = "#6366f1";
const SHIRT_DARK = "#4f46e5";
const PANTS = "#334155";
const SHOE = "#0f172a";

/** Segment lengths, in metres, shared by the rig and the pose maths. */
const UPPER_ARM = 0.28;
const FOREARM = 0.26;
const THIGH = 0.44;
const SHIN = 0.42;
const SHOULDER_Y = 0.5;
const SHOULDER_X = 0.2;

type Props = {
  /** Chair group, pushed back when the character stands up. */
  chairRef?: RefObject<Group | null>;
  /** Multiplies delta time; 0 freezes the animation in place. */
  speedRef: RefObject<number>;
  /** Shared clock so the overlay and the skip control stay in sync. */
  clockRef: RefObject<number>;
  onPhaseChange?: (id: PhaseId) => void;
};

export function DeveloperCharacter({
  chairRef,
  speedRef,
  clockRef,
  onPhaseChange,
}: Props) {
  const root = useRef<Group>(null);
  const hips = useRef<Group>(null);
  const torso = useRef<Group>(null);
  const head = useRef<Group>(null);
  const shoulderL = useRef<Group>(null);
  const elbowL = useRef<Group>(null);
  const shoulderR = useRef<Group>(null);
  const elbowR = useRef<Group>(null);
  const hipL = useRef<Group>(null);
  const kneeL = useRef<Group>(null);
  const hipR = useRef<Group>(null);
  const kneeR = useRef<Group>(null);

  // Mutable pose the rig actually shows; it chases the phase target each frame.
  const poseRef = useRef<Pose>({ ...restPose });
  const lastPhase = useRef<number>(-1);

  useFrame((_, rawDelta) => {
    // Clamp delta so a backgrounded tab does not fast-forward the loop.
    const delta = Math.min(rawDelta, 1 / 20);
    clockRef.current += delta * speedRef.current;
    const time = clockRef.current;

    const { index, phase, t } = resolvePhase(time);
    if (index !== lastPhase.current) {
      lastPhase.current = index;
      onPhaseChange?.(phase.id);
    }

    const target = phase.pose(t, time);
    // Exponential damping keeps the seams between phases from popping.
    const current = poseRef.current;
    const k = 1 - Math.exp(-14 * delta);
    for (const key of POSE_KEYS) {
      current[key] += (target[key] - current[key]) * k;
    }

    if (root.current) {
      root.current.position.set(0, current.rootY + current.bounce, current.rootZ);
      root.current.rotation.y = current.rootRotY;
    }
    if (hips.current) hips.current.rotation.x = current.hipRotX;
    if (torso.current) {
      torso.current.rotation.set(
        current.torsoRotX,
        current.torsoRotY,
        current.torsoRotZ,
      );
    }
    if (head.current) {
      head.current.rotation.x = current.headRotX;
      head.current.rotation.y = current.headRotY;
    }
    if (shoulderL.current) {
      shoulderL.current.rotation.x = current.shoulderLRotX;
      shoulderL.current.rotation.z = current.shoulderLRotZ;
    }
    if (elbowL.current) elbowL.current.rotation.x = current.elbowLRotX;
    if (shoulderR.current) {
      shoulderR.current.rotation.x = current.shoulderRRotX;
      shoulderR.current.rotation.z = current.shoulderRRotZ;
    }
    if (elbowR.current) elbowR.current.rotation.x = current.elbowRRotX;
    if (hipL.current) {
      hipL.current.rotation.x = current.hipLRotX;
      hipL.current.rotation.z = current.hipLRotZ;
    }
    if (kneeL.current) kneeL.current.rotation.x = current.kneeLRotX;
    if (hipR.current) {
      hipR.current.rotation.x = current.hipRRotX;
      hipR.current.rotation.z = current.hipRRotZ;
    }
    if (kneeR.current) kneeR.current.rotation.x = current.kneeRRotX;

    if (chairRef?.current) {
      // The chair rolls out to the character's left so it never intersects
      // them while they exercise behind the desk.
      const push = current.chairPush;
      chairRef.current.position.x = -push;
      chairRef.current.position.z = push * 0.12;
      chairRef.current.rotation.y = push * 0.5;
    }
  });

  return (
    <group ref={root} position={[0, restPose.rootY, 0]}>
      <group ref={hips}>
        <mesh castShadow position={[0, -0.04, 0]}>
          <boxGeometry args={[0.34, 0.18, 0.22]} />
          <meshStandardMaterial color={PANTS} roughness={0.85} />
        </mesh>

        <group ref={torso}>
          <mesh castShadow position={[0, 0.26, 0]}>
            <capsuleGeometry args={[0.17, 0.3, 8, 20]} />
            <meshStandardMaterial color={SHIRT} roughness={0.75} />
          </mesh>
          {/* Hoodie pocket, purely to break up the flat torso. */}
          <mesh position={[0, 0.14, 0.15]}>
            <boxGeometry args={[0.2, 0.11, 0.04]} />
            <meshStandardMaterial color={SHIRT_DARK} roughness={0.8} />
          </mesh>

          <group position={[0, SHOULDER_Y, 0]}>
            <group ref={head}>
              <mesh castShadow position={[0, 0.07, 0]}>
                <capsuleGeometry args={[0.055, 0.06, 6, 12]} />
                <meshStandardMaterial color={SKIN} roughness={0.7} />
              </mesh>
              <mesh castShadow position={[0, 0.24, 0]}>
                <boxGeometry args={[0.2, 0.24, 0.21]} />
                <meshStandardMaterial color={SKIN} roughness={0.7} />
              </mesh>
              {/* Hair cap plus a fringe over the forehead. */}
              <mesh position={[0, 0.33, -0.01]}>
                <boxGeometry args={[0.215, 0.1, 0.225]} />
                <meshStandardMaterial color={HAIR} roughness={0.9} />
              </mesh>
              {/* Fringe sits above the brow so it never covers the eyes. */}
              <mesh position={[0, 0.305, 0.1]}>
                <boxGeometry args={[0.215, 0.06, 0.035]} />
                <meshStandardMaterial color={HAIR} roughness={0.9} />
              </mesh>
              <mesh position={[-0.05, 0.245, 0.108]}>
                <boxGeometry args={[0.05, 0.032, 0.012]} />
                <meshStandardMaterial color="#111827" roughness={0.35} />
              </mesh>
              <mesh position={[0.05, 0.245, 0.108]}>
                <boxGeometry args={[0.05, 0.032, 0.012]} />
                <meshStandardMaterial color="#111827" roughness={0.35} />
              </mesh>
            </group>
          </group>

          <Arm
            side="left"
            shoulderRef={shoulderL}
            elbowRef={elbowL}
            x={SHOULDER_X}
            y={SHOULDER_Y - 0.03}
          />
          <Arm
            side="right"
            shoulderRef={shoulderR}
            elbowRef={elbowR}
            x={-SHOULDER_X}
            y={SHOULDER_Y - 0.03}
          />
        </group>

        <Leg hipRef={hipL} kneeRef={kneeL} x={0.11} />
        <Leg hipRef={hipR} kneeRef={kneeR} x={-0.11} />
      </group>
    </group>
  );
}

function Arm({
  side,
  shoulderRef,
  elbowRef,
  x,
  y,
}: {
  side: "left" | "right";
  shoulderRef: RefObject<Group | null>;
  elbowRef: RefObject<Group | null>;
  x: number;
  y: number;
}) {
  return (
    <group key={side} ref={shoulderRef} position={[x, y, 0]}>
      {/* Deltoid ball, so the arm reads as joined to the torso. */}
      <mesh castShadow>
        <sphereGeometry args={[0.075, 14, 12]} />
        <meshStandardMaterial color={SHIRT} roughness={0.75} />
      </mesh>
      <mesh castShadow position={[0, -UPPER_ARM / 2, 0]}>
        <capsuleGeometry args={[0.055, UPPER_ARM - 0.09, 6, 12]} />
        <meshStandardMaterial color={SHIRT} roughness={0.75} />
      </mesh>
      <group ref={elbowRef} position={[0, -UPPER_ARM, 0]}>
        <mesh castShadow position={[0, -FOREARM / 2, 0]}>
          <capsuleGeometry args={[0.048, FOREARM - 0.09, 6, 12]} />
          <meshStandardMaterial color={SKIN} roughness={0.7} />
        </mesh>
        <mesh castShadow position={[0, -FOREARM - 0.03, 0]}>
          <boxGeometry args={[0.08, 0.08, 0.1]} />
          <meshStandardMaterial color={SKIN} roughness={0.7} />
        </mesh>
      </group>
    </group>
  );
}

function Leg({
  hipRef,
  kneeRef,
  x,
}: {
  hipRef: RefObject<Group | null>;
  kneeRef: RefObject<Group | null>;
  x: number;
}) {
  return (
    <group ref={hipRef} position={[x, -0.1, 0]}>
      <mesh castShadow position={[0, -THIGH / 2, 0]}>
        <capsuleGeometry args={[0.075, THIGH - 0.13, 6, 12]} />
        <meshStandardMaterial color={PANTS} roughness={0.85} />
      </mesh>
      <group ref={kneeRef} position={[0, -THIGH, 0]}>
        <mesh castShadow position={[0, -SHIN / 2, 0]}>
          <capsuleGeometry args={[0.062, SHIN - 0.13, 6, 12]} />
          <meshStandardMaterial color={PANTS} roughness={0.85} />
        </mesh>
        <mesh castShadow position={[0, -SHIN - 0.02, 0.035]}>
          <boxGeometry args={[0.1, 0.07, 0.2]} />
          <meshStandardMaterial color={SHOE} roughness={0.6} />
        </mesh>
      </group>
    </group>
  );
}

export { PHASES };
