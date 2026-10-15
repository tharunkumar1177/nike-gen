import {
  enclosingRadius,
  quantumNumbers,
  wavefunction,
  type OrbitalId,
} from "./wavefunctions";

export type SurfaceMesh = {
  positions: Float32Array;
  normals: Float32Array;
  indices: Uint32Array;
};

export type OrbitalSurface = {
  /** Lobes where ψ > 0 and ψ < 0, in units of `radius` (fits a unit sphere). */
  positive: SurfaceMesh;
  negative: SurfaceMesh;
  /** Largest vertex distance from the nucleus, in a₀. */
  radius: number;
  /** |ψ| on the 90% boundary. */
  isovalue: number;
};

const CELLS = 60;
const ENCLOSED = 0.9;

// Six tetrahedra sharing the cube diagonal 0–6; corners are (i, j, k) offsets.
const CORNERS = [
  [0, 0, 0],
  [1, 0, 0],
  [1, 1, 0],
  [0, 1, 0],
  [0, 0, 1],
  [1, 0, 1],
  [1, 1, 1],
  [0, 1, 1],
] as const;
const TETRAHEDRA = [
  [0, 5, 1, 6],
  [0, 1, 2, 6],
  [0, 2, 3, 6],
  [0, 3, 7, 6],
  [0, 7, 4, 6],
  [0, 4, 5, 6],
] as const;

const cache = new Map<OrbitalId, OrbitalSurface>();

export function orbitalSurface(id: OrbitalId): OrbitalSurface {
  const cached = cache.get(id);
  if (cached) {
    return cached;
  }
  const surface = buildSurface(id);
  cache.set(id, surface);
  return surface;
}

function buildSurface(id: OrbitalId): OrbitalSurface {
  const { n, l } = quantumNumbers(id);
  const psi = wavefunction(id);
  const half = enclosingRadius(n, l, 0.9995);
  const side = CELLS + 1;
  const step = (2 * half) / CELLS;
  const field = new Float32Array(side * side * side);
  for (let k = 0; k < side; k += 1) {
    for (let j = 0; j < side; j += 1) {
      for (let i = 0; i < side; i += 1) {
        field[i + side * (j + side * k)] = psi(
          -half + i * step,
          -half + j * step,
          -half + k * step,
        );
      }
    }
  }
  const isovalue = boundaryValue(field);
  const sample = (x: number, y: number, z: number) => psi(x, y, z);
  const positive = extract(field, side, half, step, isovalue, 1, sample);
  const negative = extract(field, side, half, step, isovalue, -1, sample);
  const radius = Math.max(positive.radius, negative.radius);
  scale(positive.mesh, 1 / radius);
  scale(negative.mesh, 1 / radius);
  return {
    positive: positive.mesh,
    negative: negative.mesh,
    radius,
    isovalue,
  };
}

/** |ψ| whose ψ² contour encloses `ENCLOSED` of the total probability. */
function boundaryValue(field: Float32Array) {
  const density = new Float64Array(field.length);
  let total = 0;
  for (let i = 0; i < field.length; i += 1) {
    const value = (field[i] ?? 0) ** 2;
    density[i] = value;
    total += value;
  }
  density.sort();
  let sum = 0;
  for (let i = density.length - 1; i >= 0; i -= 1) {
    const value = density[i] ?? 0;
    sum += value;
    if (sum >= ENCLOSED * total) {
      return Math.sqrt(value);
    }
  }
  return 0;
}

function extract(
  field: Float32Array,
  side: number,
  half: number,
  step: number,
  isovalue: number,
  sign: 1 | -1,
  psi: (x: number, y: number, z: number) => number,
) {
  const positions: number[] = [];
  const normals: number[] = [];
  const indices: number[] = [];
  const vertexByEdge = new Map<number, number>();
  const count = side * side * side;
  const h = step * 0.25;
  let radius = 0;

  const value = (index: number) => sign * (field[index] ?? 0) - isovalue;
  const point = (index: number) => {
    const i = index % side;
    const j = Math.floor(index / side) % side;
    const k = Math.floor(index / (side * side));
    return [-half + i * step, -half + j * step, -half + k * step] as const;
  };

  const edgeVertex = (a: number, b: number) => {
    const key = a < b ? a * count + b : b * count + a;
    const existing = vertexByEdge.get(key);
    if (existing !== undefined) {
      return existing;
    }
    const va = value(a);
    const vb = value(b);
    const t = va / (va - vb);
    const pa = point(a);
    const pb = point(b);
    const x = pa[0] + t * (pb[0] - pa[0]);
    const y = pa[1] + t * (pb[1] - pa[1]);
    const z = pa[2] + t * (pb[2] - pa[2]);
    // The lobe interior is where sign·ψ exceeds the isovalue, so the outward
    // normal points down the gradient of sign·ψ.
    let nx = -sign * (psi(x + h, y, z) - psi(x - h, y, z));
    let ny = -sign * (psi(x, y + h, z) - psi(x, y - h, z));
    let nz = -sign * (psi(x, y, z + h) - psi(x, y, z - h));
    const length = Math.hypot(nx, ny, nz) || 1;
    nx /= length;
    ny /= length;
    nz /= length;
    const index = positions.length / 3;
    positions.push(x, y, z);
    normals.push(nx, ny, nz);
    radius = Math.max(radius, Math.hypot(x, y, z));
    vertexByEdge.set(key, index);
    return index;
  };

  const triangle = (a: number, b: number, c: number) => {
    const ax = positions[a * 3] ?? 0;
    const ay = positions[a * 3 + 1] ?? 0;
    const az = positions[a * 3 + 2] ?? 0;
    const ux = (positions[b * 3] ?? 0) - ax;
    const uy = (positions[b * 3 + 1] ?? 0) - ay;
    const uz = (positions[b * 3 + 2] ?? 0) - az;
    const vx = (positions[c * 3] ?? 0) - ax;
    const vy = (positions[c * 3 + 1] ?? 0) - ay;
    const vz = (positions[c * 3 + 2] ?? 0) - az;
    const cx = uy * vz - uz * vy;
    const cy = uz * vx - ux * vz;
    const cz = ux * vy - uy * vx;
    const facing =
      cx * ((normals[a * 3] ?? 0) + (normals[b * 3] ?? 0) + (normals[c * 3] ?? 0)) +
      cy *
        ((normals[a * 3 + 1] ?? 0) +
          (normals[b * 3 + 1] ?? 0) +
          (normals[c * 3 + 1] ?? 0)) +
      cz *
        ((normals[a * 3 + 2] ?? 0) +
          (normals[b * 3 + 2] ?? 0) +
          (normals[c * 3 + 2] ?? 0));
    if (facing >= 0) {
      indices.push(a, b, c);
    } else {
      indices.push(a, c, b);
    }
  };

  const corner = new Array<number>(8).fill(0);
  for (let k = 0; k < side - 1; k += 1) {
    for (let j = 0; j < side - 1; j += 1) {
      for (let i = 0; i < side - 1; i += 1) {
        let inside = 0;
        CORNERS.forEach(([di, dj, dk], c) => {
          const index = i + di + side * (j + dj + side * (k + dk));
          corner[c] = index;
          if (value(index) > 0) {
            inside += 1;
          }
        });
        if (inside === 0 || inside === 8) {
          continue;
        }
        for (const tet of TETRAHEDRA) {
          const ids = tet.map((c) => corner[c] ?? 0);
          const inner = ids.filter((id) => value(id) > 0);
          const outer = ids.filter((id) => value(id) <= 0);
          if (inner.length === 1 || inner.length === 3) {
            // One vertex sits alone on its side of the surface.
            const [lone, a, b, c] = (
              inner.length === 1 ? [...inner, ...outer] : [...outer, ...inner]
            ) as [number, number, number, number];
            triangle(edgeVertex(lone, a), edgeVertex(lone, b), edgeVertex(lone, c));
          } else if (inner.length === 2) {
            const [p, q] = inner as [number, number];
            const [r, s] = outer as [number, number];
            const e0 = edgeVertex(p, r);
            const e1 = edgeVertex(p, s);
            const e2 = edgeVertex(q, s);
            const e3 = edgeVertex(q, r);
            triangle(e0, e1, e2);
            triangle(e0, e2, e3);
          }
        }
      }
    }
  }

  return {
    mesh: {
      positions: new Float32Array(positions),
      normals: new Float32Array(normals),
      indices: new Uint32Array(indices),
    },
    radius,
  };
}

function scale(mesh: SurfaceMesh, factor: number) {
  for (let i = 0; i < mesh.positions.length; i += 1) {
    mesh.positions[i] = (mesh.positions[i] ?? 0) * factor;
  }
}
