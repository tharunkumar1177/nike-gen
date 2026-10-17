import { colors } from "../theme";
import type { Domain, Vec3 } from "./geometry";
import type { Placement } from "./view";

/** Distance from the central atom to a ligand centre, in molecule units. */
export const BOND_LENGTH = 0.8;
export const CENTRAL_RADIUS = 0.2;
export const LONE_PAIR_LENGTH = 0.72;
export const ARC_RADIUS = 0.4;

export type ArcSpec = {
  /** Slot index or explicit direction. */
  a: number | Vec3;
  b: number | Vec3;
  /** Direction inside the arc's plane, needed for 180° arcs. */
  via?: Vec3;
  label?: string;
  /** 0→1 draw-on progress. */
  progress?: number;
  opacity?: number;
  color?: string;
  radius?: number;
};

export type MoleculeSpec = Placement & {
  id: string;
  domains: Domain[];
  central: string;
  /** Ligand element symbol, or one per slot index. */
  ligands: string | readonly string[];
  opacity?: number;
  lonePairOpacity?: number;
  lonePairScale?: number;
  frameOpacity?: number;
  labelOpacity?: number;
  arcs?: ArcSpec[];
  /** Slots tinted with `highlightColor` by `highlightAmount`. */
  highlight?: number[];
  highlightColor?: string;
  highlightAmount?: number;
};

export function ligandOf(spec: MoleculeSpec, slot: number) {
  return typeof spec.ligands === "string"
    ? spec.ligands
    : (spec.ligands[slot] ?? spec.ligands[0] ?? "X");
}

export function elementColor(symbol: string) {
  if (symbol === "F" || symbol === "Cl" || symbol === "Br") {
    return colors.halogen;
  }
  if (symbol === "O") {
    return colors.oxygen;
  }
  if (symbol === "H") {
    return colors.hydrogen;
  }
  return colors.other;
}

/** Label colour with AA contrast on the atom's fill. */
export function elementTextColor(symbol: string) {
  const fill = elementColor(symbol);
  return fill === colors.halogen || fill === colors.hydrogen
    ? colors.text
    : "#FFFFFF";
}

export function ligandRadius(symbol: string) {
  return symbol === "H" ? 0.12 : 0.16;
}

export function resolveDir(spec: MoleculeSpec, ref: number | Vec3): Vec3 {
  if (typeof ref !== "number") {
    return ref;
  }
  const domain = spec.domains[ref];
  if (!domain) {
    throw new Error(`${spec.id} has no slot ${ref}.`);
  }
  return domain.dir;
}

/**
 * Points along an arc of radius `radius` from `a` toward `b`, plus the
 * direction of the arc's midpoint.
 */
export function arcPoints(
  a: Vec3,
  b: Vec3,
  radius: number,
  progress: number,
  via?: Vec3,
) {
  const dot = (u: Vec3, v: Vec3) => u[0] * v[0] + u[1] * v[1] + u[2] * v[2];
  const len = (u: Vec3) => Math.hypot(u[0], u[1], u[2]);
  const unit = (u: Vec3): Vec3 => {
    const l = len(u) || 1;
    return [u[0] / l, u[1] / l, u[2] / l];
  };
  const ua = unit(a);
  const ub = unit(b);
  const total = Math.acos(Math.max(-1, Math.min(1, dot(ua, ub))));
  let towards: Vec3 = via ?? ub;
  if (!via && total > Math.PI - 0.01) {
    towards = Math.abs(ua[1]) < 0.9 ? [0, 1, 0] : [0, 0, 1];
  }
  const k = dot(towards, ua);
  const u = unit([
    towards[0] - k * ua[0],
    towards[1] - k * ua[1],
    towards[2] - k * ua[2],
  ]);
  const at = (phi: number): Vec3 => [
    Math.cos(phi) * ua[0] + Math.sin(phi) * u[0],
    Math.cos(phi) * ua[1] + Math.sin(phi) * u[1],
    Math.cos(phi) * ua[2] + Math.sin(phi) * u[2],
  ];
  const steps = 32;
  const points: Vec3[] = [];
  for (let i = 0; i <= steps; i += 1) {
    const p = at((total * progress * i) / steps);
    points.push([p[0] * radius, p[1] * radius, p[2] * radius]);
  }
  return { points, mid: at(total / 2) };
}
