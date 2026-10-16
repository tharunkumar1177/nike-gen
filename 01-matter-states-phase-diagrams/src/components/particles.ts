import { seeded } from "./anim";

export type StateKind = "solid" | "liquid" | "gas";
export type Point = { x: number; y: number };

export const VIEWPORT_RADIUS = 200;
export const PARTICLE_RADIUS = 12;
export const SIM_FRAMES = 1800;

const INNER = VIEWPORT_RADIUS - 4 - PARTICLE_RADIUS;

/** Hexagonal lattice: 61 sites, 30 px spacing, centred on the origin. */
function lattice(): Point[] {
  const spacing = 30;
  const rings = 4;
  const points: Point[] = [];
  for (let q = -rings; q <= rings; q += 1) {
    for (let r = -rings; r <= rings; r += 1) {
      if (Math.abs(q + r) > rings) continue;
      points.push({
        x: spacing * (q + r / 2),
        y: spacing * ((Math.sqrt(3) / 2) * r),
      });
    }
  }
  return points;
}

const LATTICE = lattice();

export function solidAt(frame: number): Point[] {
  return LATTICE.map((site, i) => {
    const phase = seeded(i) * Math.PI * 2;
    const phaseY = seeded(i + 100) * Math.PI * 2;
    return {
      x: site.x + Math.sin(frame * 0.4 + phase) * 3,
      y: site.y + Math.sin(frame * 0.44 + phaseY) * 3,
    };
  });
}

function confine(p: Point, v: Point) {
  const distance = Math.hypot(p.x, p.y);
  if (distance <= INNER) return;
  const nx = p.x / distance;
  const ny = p.y / distance;
  p.x = nx * INNER;
  p.y = ny * INNER;
  const along = v.x * nx + v.y * ny;
  if (along > 0) {
    v.x -= 2 * along * nx;
    v.y -= 2 * along * ny;
  }
}

function simulateLiquid(): Point[][] {
  const count = 55;
  const diameter = PARTICLE_RADIUS * 2;
  const positions: Point[] = [];
  const perRow = [5, 7, 9, 11, 11, 12];
  let placed = 0;
  perRow.forEach((n, row) => {
    const y = INNER - PARTICLE_RADIUS - row * diameter * 0.9;
    for (let k = 0; k < n && placed < count; k += 1) {
      const x = (k - (n - 1) / 2) * (diameter + 1);
      positions.push({ x, y });
      placed += 1;
    }
  });
  const velocities = positions.map((_, i) => ({
    x: (seeded(i + 200) - 0.5) * 2,
    y: (seeded(i + 300) - 0.5) * 2,
  }));
  const frames: Point[][] = [];
  for (let frame = 0; frame < SIM_FRAMES; frame += 1) {
    for (let i = 0; i < count; i += 1) {
      const v = velocities[i]!;
      const stir = frame * 0.05 + seeded(i + 400) * Math.PI * 2;
      v.x += Math.cos(stir) * 0.12;
      v.y += Math.sin(stir * 1.3) * 0.12 + 0.08;
    }
    for (let i = 0; i < count; i += 1) {
      for (let j = i + 1; j < count; j += 1) {
        const a = positions[i]!;
        const b = positions[j]!;
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const distance = Math.hypot(dx, dy) || 0.001;
        let push = 0;
        if (distance < diameter) push = (diameter - distance) * 0.25;
        else if (distance < diameter * 1.4)
          push = -(distance - diameter) * 0.01;
        if (push === 0) continue;
        const fx = (dx / distance) * push;
        const fy = (dy / distance) * push;
        velocities[i]!.x -= fx;
        velocities[i]!.y -= fy;
        velocities[j]!.x += fx;
        velocities[j]!.y += fy;
      }
    }
    for (let i = 0; i < count; i += 1) {
      const p = positions[i]!;
      const v = velocities[i]!;
      v.x *= 0.9;
      v.y *= 0.9;
      const speed = Math.hypot(v.x, v.y);
      if (speed > 2) {
        v.x = (v.x / speed) * 2;
        v.y = (v.y / speed) * 2;
      }
      p.x += v.x;
      p.y += v.y;
      confine(p, v);
    }
    frames.push(positions.map((p) => ({ x: p.x, y: p.y })));
  }
  return frames;
}

function simulateGas(): Point[][] {
  const count = 15;
  const speed = 10;
  const positions: Point[] = [];
  for (let i = 0; i < count; i += 1) {
    const angle = seeded(i + 500) * Math.PI * 2;
    const radius = Math.sqrt(seeded(i + 600)) * (INNER - 10);
    positions.push({
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius,
    });
  }
  const velocities = positions.map((_, i) => {
    const heading = seeded(i + 700) * Math.PI * 2;
    return { x: Math.cos(heading) * speed, y: Math.sin(heading) * speed };
  });
  const substeps = 4;
  const frames: Point[][] = [];
  for (let frame = 0; frame < SIM_FRAMES; frame += 1) {
    for (let step = 0; step < substeps; step += 1) {
      for (let i = 0; i < count; i += 1) {
        const p = positions[i]!;
        const v = velocities[i]!;
        p.x += v.x / substeps;
        p.y += v.y / substeps;
        confine(p, v);
      }
    }
    frames.push(positions.map((p) => ({ x: p.x, y: p.y })));
  }
  return frames;
}

const cache: Partial<Record<"liquid" | "gas", Point[][]>> = {};

function track(kind: "liquid" | "gas"): Point[][] {
  const existing = cache[kind];
  if (existing) return existing;
  const frames = kind === "liquid" ? simulateLiquid() : simulateGas();
  cache[kind] = frames;
  return frames;
}

/** Particle centres relative to the viewport centre at a given simulation frame. */
export function particlesAt(kind: StateKind, frame: number): Point[] {
  if (kind === "solid") return solidAt(frame);
  const frames = track(kind);
  const index = Math.min(Math.max(0, Math.floor(frame)), SIM_FRAMES - 1);
  return frames[index]!;
}
