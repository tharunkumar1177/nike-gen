import { Easing, interpolate, spring } from "remotion";

const clamp = {
  extrapolateLeft: "clamp",
  extrapolateRight: "clamp",
} as const;

export const easeOut = Easing.out(Easing.cubic);
export const easeInOut = Easing.inOut(Easing.cubic);

/** 0→1 progress between two frames (ease-out cubic by default). */
export function progress(
  frame: number,
  start: number,
  end: number,
  easing: (t: number) => number = easeOut,
) {
  return interpolate(frame, [start, end], [0, 1], { ...clamp, easing });
}

/** Fades in over [inStart, inEnd] and out over [outStart, outEnd]. */
export function fadeWindow(
  frame: number,
  inStart: number,
  inEnd: number,
  outStart = Infinity,
  outEnd = Infinity,
) {
  return Math.min(
    progress(frame, inStart, inEnd),
    1 - progress(frame, outStart, outEnd, easeInOut),
  );
}

/** 0→1 spring that starts at `start` (damping 14, stiffness 100). */
export function pop(frame: number, fps: number, start: number) {
  return spring({
    frame: frame - start,
    fps,
    config: { damping: 14, stiffness: 100, mass: 1 },
  });
}

export function lerp(from: number, to: number, t: number) {
  return from + (to - from) * t;
}

/** Deterministic pseudo-random in [0, 1) from an integer seed. */
export function seeded(seed: number) {
  const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
}
