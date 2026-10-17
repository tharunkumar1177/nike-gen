import { Easing, interpolate, spring } from "remotion";

const clamp = {
  extrapolateLeft: "clamp",
  extrapolateRight: "clamp",
} as const;

export const easeOut = Easing.out(Easing.cubic);
export const easeInOut = Easing.inOut(Easing.cubic);

/** 0→1 progress between two frames with ease-out cubic. */
export function progress(
  frame: number,
  start: number,
  end: number,
  easing: (t: number) => number = easeOut,
) {
  return interpolate(frame, [start, end], [0, 1], { ...clamp, easing });
}

/** 0→1 spring that starts at `start` (damping 14, stiffness 100). */
export function pop(frame: number, fps: number, start: number) {
  return spring({
    frame: frame - start,
    fps,
    config: { damping: 14, stiffness: 100, mass: 1 },
  });
}

/** 20-frame fade-in starting at `start`. */
export function fadeIn(frame: number, start: number) {
  return progress(frame, start, start + 20);
}

/** 15-frame drop-in starting at `start`. */
export function dropIn(frame: number, start: number) {
  return progress(frame, start, start + 15);
}

/** Scale that swells 1 → 1.2 → 1 over 15 frames from `start`. */
export function pulse(frame: number, start: number) {
  const t = interpolate(frame, [start, start + 15], [0, 1], clamp);
  return 1 + 0.2 * Math.sin(Math.PI * t);
}

export function lerp(from: number, to: number, t: number) {
  return from + (to - from) * t;
}

/** `Text` props for a drop-in from 24 px above. */
export function dropped(frame: number, start: number) {
  const t = dropIn(frame, start);
  return { opacity: t, dy: lerp(-24, 0, t) };
}

/** `Text` props for a spring pop from 80 % scale. */
export function popped(frame: number, fps: number, start: number) {
  const t = pop(frame, fps, start);
  return { opacity: Math.min(1, t * 2), scale: lerp(0.8, 1, t) };
}
