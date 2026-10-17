/** Deterministic PRNG (mulberry32), so particle layouts are identical on every render. */
export function seeded(seed: number) {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Start position and velocity in box-normalised units (0-1, per frame). */
export type Particle = { u: number; v: number; du: number; dv: number };

export function makeParticles(count: number, seed: number, speed: number) {
  const random = seeded(seed);
  return Array.from({ length: count }, (): Particle => {
    const angle = random() * 2 * Math.PI;
    const pace = speed * (0.7 + 0.6 * random());
    return {
      u: random(),
      v: random(),
      du: pace * Math.cos(angle),
      dv: pace * Math.sin(angle),
    };
  });
}

/** Folds an unbounded coordinate into 0-1 as if it bounced between two walls. */
function bounce(value: number) {
  const m = ((value % 2) + 2) % 2;
  return m <= 1 ? m : 2 - m;
}

export type Rect = { x: number; y: number; width: number; height: number };

/** Centre of a particle of `radius` after `time` frames of free flight in `rect`. */
export function placeParticle(
  particle: Particle,
  time: number,
  rect: Rect,
  radius: number,
) {
  const u = bounce(particle.u + particle.du * time);
  const v = bounce(particle.v + particle.dv * time);
  return {
    x: rect.x + radius + u * Math.max(0, rect.width - 2 * radius),
    y: rect.y + radius + v * Math.max(0, rect.height - 2 * radius),
  };
}

/**
 * Elapsed flight time when speed ramps linearly from 1 to `final` over
 * `ramp` frames starting at `start`, then holds.
 */
export function slowedTime(
  frame: number,
  start: number,
  ramp: number,
  final: number,
) {
  if (frame <= start) return frame;
  const d = Math.min(frame - start, ramp);
  const ramped = d - ((1 - final) * d * d) / (2 * ramp);
  return start + ramped + final * Math.max(0, frame - start - ramp);
}

/** `count` points of a hexagonal packing around (cx, cy), nearest first. */
export function hexCluster(
  count: number,
  cx: number,
  cy: number,
  spacing: number,
) {
  const points: { x: number; y: number }[] = [];
  const rings = Math.ceil(Math.sqrt(count)) + 1;
  for (let row = -rings; row <= rings; row += 1) {
    for (let col = -rings; col <= rings; col += 1) {
      points.push({
        x: cx + (col + (row % 2 === 0 ? 0 : 0.5)) * spacing,
        y: cy + row * spacing * (Math.sqrt(3) / 2),
      });
    }
  }
  const distance = (p: { x: number; y: number }) =>
    Math.hypot(p.x - cx, p.y - cy);
  return points.sort((a, b) => distance(a) - distance(b)).slice(0, count);
}
