import { Easing, interpolate, spring } from "remotion";

const clamp = {
  extrapolateLeft: "clamp",
  extrapolateRight: "clamp",
} as const;

export const easeOut = Easing.out(Easing.cubic);
export const easeInOut = Easing.inOut(Easing.cubic);
export const easeOutQuart = Easing.out(Easing.poly(4));

/** 0→1 progress between two frames with ease-out cubic. */
export function progress(
  frame: number,
  start: number,
  end: number,
  easing: (t: number) => number = easeOut,
) {
  return interpolate(frame, [start, end], [0, 1], { ...clamp, easing });
}

type SpringConfig = { stiffness: number; damping: number };

/** 0→1 spring that starts at `start` (default damping 14, stiffness 100). */
export function pop(
  frame: number,
  fps: number,
  start: number,
  config: SpringConfig = { stiffness: 100, damping: 14 },
) {
  return spring({ frame: frame - start, fps, config: { ...config, mass: 1 } });
}

/** 20-frame fade-in starting at `start`. */
export function fadeIn(frame: number, start: number) {
  return progress(frame, start, start + 20);
}

/** 20-frame fade-ins for `keys`, `step` frames apart, from `start`. */
export function stagger(
  frame: number,
  start: number,
  keys: readonly string[],
  step = 6,
): Record<string, number> {
  const entries = keys.map((key, i) => [key, fadeIn(frame, start + i * step)]);
  return Object.fromEntries(entries);
}

export function lerp(from: number, to: number, t: number) {
  return from + (to - from) * t;
}
