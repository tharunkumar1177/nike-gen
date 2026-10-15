/**
 * Hydrogen-like orbitals (Z = 1) in atomic units: lengths in a₀, ρ = r/a₀.
 * ψ = L(ρ) · e^(−ρ/n) · A(x, y, z), where A is the real angular part in
 * Cartesian form (the r^l of R_nl cancels the r^−l of the angular function).
 * Overall constants are dropped; every consumer normalises numerically.
 */

export type OrbitalId =
  | "1s"
  | "2s"
  | "3s"
  | "2px"
  | "2py"
  | "2pz"
  | "3dxy"
  | "3dxz"
  | "3dyz"
  | "3dx2y2"
  | "3dz2"
  | "4fz3"
  | "4fxz2"
  | "4fyz2"
  | "4fxyz"
  | "4fzx2y2"
  | "4fxx23y2"
  | "4fy3x2y2";

type Angular = (x: number, y: number, z: number, r2: number) => number;

type Spec = { n: number; l: number; angular: Angular };

const SPECS: Record<OrbitalId, Spec> = {
  "1s": { n: 1, l: 0, angular: () => 1 },
  "2s": { n: 2, l: 0, angular: () => 1 },
  "3s": { n: 3, l: 0, angular: () => 1 },
  "2px": { n: 2, l: 1, angular: (x) => x },
  "2py": { n: 2, l: 1, angular: (_x, y) => y },
  "2pz": { n: 2, l: 1, angular: (_x, _y, z) => z },
  "3dxy": { n: 3, l: 2, angular: (x, y) => x * y },
  "3dxz": { n: 3, l: 2, angular: (x, _y, z) => x * z },
  "3dyz": { n: 3, l: 2, angular: (_x, y, z) => y * z },
  "3dx2y2": { n: 3, l: 2, angular: (x, y) => x * x - y * y },
  "3dz2": { n: 3, l: 2, angular: (_x, _y, z, r2) => 3 * z * z - r2 },
  "4fz3": { n: 4, l: 3, angular: (_x, _y, z, r2) => z * (5 * z * z - 3 * r2) },
  "4fxz2": { n: 4, l: 3, angular: (x, _y, z, r2) => x * (5 * z * z - r2) },
  "4fyz2": { n: 4, l: 3, angular: (_x, y, z, r2) => y * (5 * z * z - r2) },
  "4fxyz": { n: 4, l: 3, angular: (x, y, z) => x * y * z },
  "4fzx2y2": { n: 4, l: 3, angular: (x, y, z) => z * (x * x - y * y) },
  "4fxx23y2": { n: 4, l: 3, angular: (x, y) => x * (x * x - 3 * y * y) },
  "4fy3x2y2": { n: 4, l: 3, angular: (x, y) => y * (3 * x * x - y * y) },
};

/** Associated-Laguerre factor L(ρ) of R_nl, keyed by `${n}${l}`. */
const LAGUERRE: Record<string, (rho: number) => number> = {
  "10": () => 1,
  "20": (p) => 2 - p,
  "21": () => 1,
  "30": (p) => 27 - 18 * p + 2 * p * p,
  "31": (p) => 6 - p,
  "32": () => 1,
  "40": (p) => 192 - 144 * p + 24 * p * p - p * p * p,
  "41": (p) => 80 - 20 * p + p * p,
  "42": (p) => 12 - p,
  "43": () => 1,
};

function laguerre(n: number, l: number) {
  const fn = LAGUERRE[`${n}${l}`];
  if (!fn) {
    throw new Error(`No radial function for n=${n}, l=${l}.`);
  }
  return fn;
}

export function quantumNumbers(id: OrbitalId) {
  const { n, l } = SPECS[id];
  return { n, l };
}

/** Returns ψ(x, y, z) for the orbital, with x, y, z in a₀. */
export function wavefunction(id: OrbitalId) {
  const { n, l, angular } = SPECS[id];
  const radial = laguerre(n, l);
  return (x: number, y: number, z: number) => {
    const r2 = x * x + y * y + z * z;
    const rho = Math.sqrt(r2);
    return radial(rho) * Math.exp(-rho / n) * angular(x, y, z, r2);
  };
}

/** Returns R_nl(r) up to a constant, with r in a₀. */
export function radialFunction(n: number, l: number) {
  const radial = laguerre(n, l);
  return (r: number) => r ** l * radial(r) * Math.exp(-r / n);
}

/**
 * Radius (a₀) inside which the radial probability r²R² has accumulated
 * `fraction` of its total; used to size sampling boxes.
 */
export function enclosingRadius(n: number, l: number, fraction: number) {
  const R = radialFunction(n, l);
  const step = 0.01;
  const limit = 40 * n * n;
  const density: number[] = [];
  let total = 0;
  for (let r = 0; r <= limit; r += step) {
    const value = r * r * R(r) ** 2;
    density.push(value);
    total += value;
  }
  let sum = 0;
  for (let i = 0; i < density.length; i += 1) {
    sum += density[i] ?? 0;
    if (sum >= fraction * total) {
      return i * step;
    }
  }
  return limit;
}
