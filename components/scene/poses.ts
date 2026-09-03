/**
 * Pose model for the procedural developer character.
 *
 * Every joint is a group whose limb geometry hangs down along -Y from the
 * pivot, so a rotation on the group swings the whole limb from its joint.
 * The character faces +Z, which puts its right side at -X and its left at +X.
 *
 * Sign conventions that follow from that:
 *   rotX > 0  swings a limb backward (-Z); negative swings it forward.
 *   rotZ > 0  swings a limb toward +X (out to the character's left).
 *   headRotX > 0 tips the face down.
 */

export type Pose = {
  /** Hip height above the floor. */
  rootY: number;
  /** Distance from the desk; negative is a step backward into the room. */
  rootZ: number;
  /** Turn of the whole body, used to face the camera while exercising. */
  rootRotY: number;
  /** Vertical bounce applied on top of rootY, e.g. while jumping. */
  bounce: number;

  hipRotX: number;
  torsoRotX: number;
  torsoRotY: number;
  torsoRotZ: number;
  headRotX: number;
  headRotY: number;

  shoulderLRotX: number;
  shoulderLRotZ: number;
  elbowLRotX: number;
  shoulderRRotX: number;
  shoulderRRotZ: number;
  elbowRRotX: number;

  hipLRotX: number;
  hipLRotZ: number;
  kneeLRotX: number;
  hipRRotX: number;
  hipRRotZ: number;
  kneeRRotX: number;

  /** How far the chair has rolled to the character's left, in metres. */
  chairPush: number;
};

export const SITTING_HIP_Y = 0.52;
export const STANDING_HIP_Y = 0.93;

export const restPose: Pose = {
  rootY: STANDING_HIP_Y,
  rootZ: 0,
  rootRotY: 0,
  bounce: 0,
  hipRotX: 0,
  torsoRotX: 0,
  torsoRotY: 0,
  torsoRotZ: 0,
  headRotX: 0,
  headRotY: 0,
  shoulderLRotX: 0,
  shoulderLRotZ: 0.09,
  elbowLRotX: -0.12,
  shoulderRRotX: 0,
  shoulderRRotZ: -0.09,
  elbowRRotX: -0.12,
  hipLRotX: 0,
  hipLRotZ: 0.02,
  kneeLRotX: 0,
  hipRRotX: 0,
  hipRRotZ: -0.02,
  kneeRRotX: 0,
  chairPush: 0,
};

export const POSE_KEYS = Object.keys(restPose) as (keyof Pose)[];

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export const clamp01 = (t: number) => (t < 0 ? 0 : t > 1 ? 1 : t);

/** Smoothstep easing, used for every transition between phases. */
export const ease = (t: number) => {
  const x = clamp01(t);
  return x * x * (3 - 2 * x);
};

/** A smooth 0 -> 1 -> 0 bump over the [from, to] slice of a phase. */
export const pulse = (t: number, from: number, to: number) => {
  if (t <= from || t >= to) return 0;
  const local = (t - from) / (to - from);
  return Math.sin(local * Math.PI);
};

/** Blends two poses component-wise; used only for phase cross-fades. */
export const mixPose = (a: Pose, b: Pose, t: number): Pose => {
  const out = {} as Pose;
  for (const key of POSE_KEYS) out[key] = lerp(a[key], b[key], t);
  return out;
};

export type PhaseId =
  | "coding"
  | "standUp"
  | "jacks"
  | "twist"
  | "toeTouch"
  | "squat"
  | "armCircles"
  | "sitDown";

export type Phase = {
  id: PhaseId;
  /** Turkish caption shown in the overlay while the phase plays. */
  label: string;
  duration: number;
  /**
   * @param t normalised progress through the phase, 0..1
   * @param time absolute clock, for oscillations that should not reset
   */
  pose: (t: number, time: number) => Pose;
};

/** Seated at the keyboard: typing, breathing, and the odd pause to think. */
function codingPose(t: number, time: number): Pose {
  // One beat mid-phase where the character leans back off the keyboard.
  const think = pulse(t, 0.44, 0.74);
  const typeSpeed = 13;
  const clatter = Math.sin(time * typeSpeed);
  const clatterOff = Math.sin(time * typeSpeed * 0.87 + 2.1);
  const breathe = Math.sin(time * 1.7) * 0.015;
  const typing = 1 - think;

  return {
    ...restPose,
    rootY: SITTING_HIP_Y,
    rootZ: 0,
    rootRotY: 0,
    bounce: breathe * 0.4,

    hipRotX: 0,
    torsoRotX: lerp(-0.16, 0.2, think) + breathe,
    torsoRotY: Math.sin(time * 0.4) * 0.03 * typing,
    torsoRotZ: 0,
    headRotX: lerp(0.2, -0.3, think) + Math.sin(time * 0.9) * 0.02,
    headRotY: Math.sin(time * 0.55) * 0.09 * typing,

    // Hands rest on the keyboard, then fall away while thinking.
    shoulderLRotX: lerp(-0.62, -0.1, think) + clatter * 0.018 * typing,
    shoulderLRotZ: lerp(0.16, 0.2, think),
    elbowLRotX: lerp(-0.62, -0.55, think) + clatterOff * 0.055 * typing,
    shoulderRRotX: lerp(-0.62, -0.1, think) + clatterOff * 0.018 * typing,
    shoulderRRotZ: lerp(-0.16, -0.2, think),
    elbowRRotX: lerp(-0.62, -0.55, think) + clatter * 0.055 * typing,

    // Thighs forward, shins down: the seated L shape.
    hipLRotX: -1.52,
    hipLRotZ: 0.08,
    kneeLRotX: 1.46,
    hipRRotX: -1.52,
    hipRRotZ: -0.08,
    kneeRRotX: 1.46,
    chairPush: 0,
  };
}

/** Pushes the chair back, rises, steps out and turns toward the viewer. */
function standUpPose(t: number, time: number): Pose {
  const rise = ease(clamp01(t / 0.62));
  const step = ease(clamp01((t - 0.35) / 0.65));
  const seated = codingPose(0.05, time);
  const lift = pulse(t, 0, 0.7);

  return {
    ...restPose,
    rootY: lerp(SITTING_HIP_Y, STANDING_HIP_Y, rise),
    rootZ: lerp(0, -0.72, step),
    rootRotY: lerp(0, 1.32, step),
    bounce: lift * 0.03,

    torsoRotX: lerp(seated.torsoRotX, -0.18 * (1 - rise), rise),
    torsoRotY: 0,
    torsoRotZ: 0,
    headRotX: lerp(seated.headRotX, 0.02, rise),
    headRotY: lerp(0, -0.15, step),

    shoulderLRotX: lerp(seated.shoulderLRotX, 0.12, rise) - lift * 0.25,
    shoulderLRotZ: lerp(seated.shoulderLRotZ, 0.12, rise),
    elbowLRotX: lerp(seated.elbowLRotX, -0.18, rise),
    shoulderRRotX: lerp(seated.shoulderRRotX, 0.12, rise) - lift * 0.25,
    shoulderRRotZ: lerp(seated.shoulderRRotZ, -0.12, rise),
    elbowRRotX: lerp(seated.elbowRRotX, -0.18, rise),

    // Knees push through a crouch on the way up.
    hipLRotX: lerp(seated.hipLRotX, -0.05, rise),
    hipLRotZ: 0.04,
    kneeLRotX: lerp(seated.kneeLRotX, 0.05, rise),
    hipRRotX: lerp(seated.hipRRotX, -0.05, rise),
    hipRRotZ: -0.04,
    kneeRRotX: lerp(seated.kneeRRotX, 0.05, rise),
    chairPush: rise * 1.05,
  };
}

/** Shared base for every standing exercise. */
const standingBase = (): Pose => ({
  ...restPose,
  rootY: STANDING_HIP_Y,
  rootZ: -0.72,
  rootRotY: 1.32,
  chairPush: 1.05,
});

/** Jumping jacks: arms sweep overhead as the feet spread, four reps. */
function jacksPose(t: number, time: number): Pose {
  const reps = 4;
  const settle = ease(clamp01(t / 0.12)) * ease(clamp01((1 - t) / 0.12));
  // 0 at the closed position, 1 at the open position.
  const swing = (1 - Math.cos(time * reps * 1.9)) / 2;
  const open = swing * settle;
  const air = Math.max(0, Math.sin(time * reps * 1.9)) * settle;

  return {
    ...standingBase(),
    bounce: air * 0.1,
    torsoRotX: -0.04,
    headRotX: -0.04 - open * 0.06,

    shoulderLRotZ: lerp(0.12, 2.62, open),
    shoulderLRotX: -0.05,
    elbowLRotX: lerp(-0.2, -0.05, open),
    shoulderRRotZ: lerp(-0.12, -2.62, open),
    shoulderRRotX: -0.05,
    elbowRRotX: lerp(-0.2, -0.05, open),

    hipLRotZ: lerp(0.03, 0.34, open),
    hipRRotZ: lerp(-0.03, -0.34, open),
    kneeLRotX: 0.06 + air * 0.18,
    kneeRRotX: 0.06 + air * 0.18,
  };
}

/** Side bends: one arm arcs overhead while the torso leans the other way. */
function twistPose(t: number, time: number): Pose {
  const settle = ease(clamp01(t / 0.14)) * ease(clamp01((1 - t) / 0.14));
  const sway = Math.sin(time * 1.7) * settle;
  const toLeft = Math.max(0, sway);
  const toRight = Math.max(0, -sway);

  return {
    ...standingBase(),
    torsoRotZ: sway * 0.42,
    torsoRotY: sway * 0.22,
    headRotY: -sway * 0.2,
    headRotX: 0.02,

    // The arm on the stretched side reaches over the head.
    shoulderLRotZ: lerp(0.14, 2.5, toRight),
    shoulderLRotX: -0.12 * toRight,
    elbowLRotX: lerp(-0.25, -0.35, toRight),
    shoulderRRotZ: lerp(-0.14, -2.5, toLeft),
    shoulderRRotX: -0.12 * toLeft,
    elbowRRotX: lerp(-0.25, -0.35, toLeft),

    hipLRotZ: 0.12,
    hipRRotZ: -0.12,
    kneeLRotX: 0.04,
    kneeRRotX: 0.04,
  };
}

/** Forward folds down to the toes and back up again. */
function toeTouchPose(t: number, time: number): Pose {
  const settle = ease(clamp01(t / 0.14)) * ease(clamp01((1 - t) / 0.14));
  const fold = ((1 - Math.cos(time * 1.5)) / 2) * settle;

  return {
    ...standingBase(),
    rootY: STANDING_HIP_Y - fold * 0.06,
    hipRotX: 0,
    torsoRotX: lerp(-0.05, 1.35, fold),
    headRotX: lerp(0.02, -0.35, fold),

    // Shoulders counter-rotate against the folded torso so the arms keep
    // hanging straight down and the hands travel toward the shins.
    shoulderLRotX: lerp(0.1, -1.5, fold),
    shoulderLRotZ: 0.14,
    elbowLRotX: lerp(-0.2, -0.04, fold),
    shoulderRRotX: lerp(0.1, -1.5, fold),
    shoulderRRotZ: -0.14,
    elbowRRotX: lerp(-0.2, -0.04, fold),

    hipLRotX: 0.06 * fold,
    hipRRotX: 0.06 * fold,
    hipLRotZ: 0.06,
    hipRRotZ: -0.06,
    kneeLRotX: -0.08 * fold,
    kneeRRotX: -0.08 * fold,
  };
}

/** Bodyweight squats with the arms held out front for balance. */
function squatPose(t: number, time: number): Pose {
  const settle = ease(clamp01(t / 0.14)) * ease(clamp01((1 - t) / 0.14));
  const down = ((1 - Math.cos(time * 1.9)) / 2) * settle;

  return {
    ...standingBase(),
    rootY: lerp(STANDING_HIP_Y, 0.52, down),
    torsoRotX: lerp(-0.04, -0.42, down),
    headRotX: lerp(0.02, 0.12, down),

    shoulderLRotX: lerp(0.1, -1.45, down),
    shoulderLRotZ: 0.16,
    elbowLRotX: lerp(-0.2, -0.12, down),
    shoulderRRotX: lerp(0.1, -1.45, down),
    shoulderRRotZ: -0.16,
    elbowRRotX: lerp(-0.2, -0.12, down),

    hipLRotX: lerp(-0.02, -1.05, down),
    hipRRotX: lerp(-0.02, -1.05, down),
    hipLRotZ: lerp(0.05, 0.2, down),
    hipRRotZ: lerp(-0.05, -0.2, down),
    kneeLRotX: lerp(0.03, 1.35, down),
    kneeRRotX: lerp(0.03, 1.35, down),
  };
}

/** Big shoulder circles, the two arms a half-turn out of phase. */
function armCirclesPose(t: number, time: number): Pose {
  const settle = ease(clamp01(t / 0.16)) * ease(clamp01((1 - t) / 0.16));
  const spin = time * 2.6;
  const liftL = ((1 - Math.cos(spin)) / 2) * settle;
  const liftR = ((1 - Math.cos(spin + Math.PI)) / 2) * settle;

  return {
    ...standingBase(),
    torsoRotX: -0.04,
    torsoRotY: Math.sin(spin) * 0.06 * settle,
    headRotX: 0.02,

    shoulderLRotZ: lerp(0.14, 2.9, liftL),
    shoulderLRotX: Math.sin(spin) * 0.5 * settle,
    elbowLRotX: -0.12,
    shoulderRRotZ: lerp(-0.14, -2.9, liftR),
    shoulderRRotX: Math.sin(spin + Math.PI) * 0.5 * settle,
    elbowRRotX: -0.12,

    hipLRotZ: 0.09,
    hipRRotZ: -0.09,
    kneeLRotX: 0.04,
    kneeRRotX: 0.04,
  };
}

/** Walks back to the desk, drops into the chair and picks up typing again. */
function sitDownPose(t: number, time: number): Pose {
  const walk = ease(clamp01(t / 0.5));
  const drop = ease(clamp01((t - 0.42) / 0.58));
  const seated = codingPose(0.02, time);
  const standing = standingBase();

  return {
    ...restPose,
    rootY: lerp(STANDING_HIP_Y, SITTING_HIP_Y, drop),
    rootZ: lerp(standing.rootZ, 0, walk),
    rootRotY: lerp(standing.rootRotY, 0, walk),
    bounce: 0,

    torsoRotX: lerp(-0.05, seated.torsoRotX, drop),
    headRotX: lerp(0.02, seated.headRotX, drop),
    headRotY: 0,

    shoulderLRotX: lerp(0.12, seated.shoulderLRotX, drop),
    shoulderLRotZ: lerp(0.12, seated.shoulderLRotZ, drop),
    elbowLRotX: lerp(-0.2, seated.elbowLRotX, drop),
    shoulderRRotX: lerp(0.12, seated.shoulderRRotX, drop),
    shoulderRRotZ: lerp(-0.12, seated.shoulderRRotZ, drop),
    elbowRRotX: lerp(-0.2, seated.elbowRRotX, drop),

    hipLRotX: lerp(-0.05, seated.hipLRotX, drop),
    hipLRotZ: 0.06,
    kneeLRotX: lerp(0.05, seated.kneeLRotX, drop),
    hipRRotX: lerp(-0.05, seated.hipRRotX, drop),
    hipRRotZ: -0.06,
    kneeRRotX: lerp(0.05, seated.kneeRRotX, drop),

    chairPush: lerp(1.05, 0, drop),
  };
}

export const PHASES: readonly Phase[] = [
  { id: "coding", label: "Kod yazıyor", duration: 13, pose: codingPose },
  { id: "standUp", label: "Mola veriyor", duration: 2.2, pose: standUpPose },
  { id: "jacks", label: "Jumping jack", duration: 5.5, pose: jacksPose },
  { id: "twist", label: "Yana esneme", duration: 4.5, pose: twistPose },
  { id: "toeTouch", label: "Öne eğilme", duration: 4.5, pose: toeTouchPose },
  { id: "squat", label: "Squat", duration: 4.5, pose: squatPose },
  { id: "armCircles", label: "Kol çevirme", duration: 4, pose: armCirclesPose },
  { id: "sitDown", label: "Masaya dönüyor", duration: 2.4, pose: sitDownPose },
];

export const LOOP_DURATION = PHASES.reduce((sum, p) => sum + p.duration, 0);

/** Index of the phase covering `clock`, plus progress within it. */
export function resolvePhase(clock: number) {
  const loop = ((clock % LOOP_DURATION) + LOOP_DURATION) % LOOP_DURATION;
  let acc = 0;
  for (let i = 0; i < PHASES.length; i++) {
    const phase = PHASES[i];
    if (loop < acc + phase.duration) {
      return { index: i, phase, t: (loop - acc) / phase.duration };
    }
    acc += phase.duration;
  }
  const last = PHASES.length - 1;
  return { index: last, phase: PHASES[last], t: 1 };
}

/** Absolute clock time at which a phase starts, for the skip control. */
export function phaseStart(index: number) {
  let acc = 0;
  for (let i = 0; i < index; i++) acc += PHASES[i].duration;
  return acc;
}
