import type { ReactNode } from "react";
import { colors, FONT, VIDEO } from "../theme";
import { lerp } from "./anim";

export type Element = "H" | "C" | "O" | "F" | "Cl" | "Si" | "Ge" | "Sn";

type AtomStyle = { r: number; fill: string; label: string; stroke?: string };

export const ATOMS: Record<Element, AtomStyle> = {
  H: { r: 24, fill: "#FFFFFF", label: "#3B4252", stroke: colors.covalent },
  C: { r: 32, fill: "#4C566A", label: "#ECEFF4" },
  O: { r: 32, fill: "#BF616A", label: "#FFFFFF" },
  F: { r: 32, fill: "#A3BE8C", label: "#2E3440" },
  Cl: { r: 36, fill: "#A3BE8C", label: "#2E3440" },
  Si: { r: 36, fill: "#B48EAD", label: "#FFFFFF" },
  Ge: { r: 40, fill: "#B48EAD", label: "#FFFFFF" },
  Sn: { r: 48, fill: "#B48EAD", label: "#FFFFFF" },
};

export type Point = { x: number; y: number };

export type AtomSpec = Point & { el: Element };

export type MoleculeSpec = {
  atoms: AtomSpec[];
  bonds: [number, number][];
  /** Lone pairs as (atom index, direction in degrees, clockwise from +x). */
  lonePairs?: [number, number][];
};

export const BOND_WIDTH = 8;

export function polar(angle: number, distance: number): Point {
  const rad = (angle * Math.PI) / 180;
  return { x: distance * Math.cos(rad), y: distance * Math.sin(rad) };
}

const WATER_ANGLE = 104.5;
const OH_LENGTH = 84;

/**
 * Water with one O–H along `angle` and the other rotated by 104.5°; the two
 * lone pairs sit opposite the hydrogens. Atom 0 is O, atoms 1 and 2 are H.
 */
export function water(angle = 0): MoleculeSpec {
  const h1 = polar(angle, OH_LENGTH);
  const h2 = polar(angle + WATER_ANGLE, OH_LENGTH);
  const away = angle + WATER_ANGLE / 2 + 180;
  return {
    atoms: [
      { el: "O", x: 0, y: 0 },
      { el: "H", ...h1 },
      { el: "H", ...h2 },
    ],
    bonds: [
      [0, 1],
      [0, 2],
    ],
    lonePairs: [
      [0, away - 55],
      [0, away + 55],
    ],
  };
}

/** Absolute position of atom `index` in a molecule placed at `at`. */
export function atomAt(spec: MoleculeSpec, index: number, at: Point): Point {
  const atom = spec.atoms[index];
  if (!atom) throw new Error(`No atom ${index}.`);
  return { x: at.x + atom.x, y: at.y + atom.y };
}

/** Absolute centre of a lone pair, just outside its atom. */
export function lonePairAt(
  spec: MoleculeSpec,
  index: number,
  at: Point,
): Point {
  const pair = spec.lonePairs?.[index];
  if (!pair) throw new Error(`No lone pair ${index}.`);
  const [atomIndex, angle] = pair;
  const atom = spec.atoms[atomIndex];
  if (!atom) throw new Error(`No atom ${atomIndex}.`);
  const offset = polar(angle, ATOMS[atom.el].r + 16);
  return { x: at.x + atom.x + offset.x, y: at.y + atom.y + offset.y };
}

/** Full-frame SVG layer for diagrams. */
export function Stage({ children }: { children: ReactNode }) {
  return (
    <svg
      width={VIDEO.width}
      height={VIDEO.height}
      viewBox={`0 0 ${VIDEO.width} ${VIDEO.height}`}
      style={{ position: "absolute", left: 0, top: 0 }}
    >
      {children}
    </svg>
  );
}

type MoleculeProps = {
  spec: MoleculeSpec;
  at: Point;
  opacity?: number;
  scale?: number;
  bondWidth?: number;
  /** 0–1 visibility of the lone pairs. */
  lonePairs?: number;
};

export function Molecule({
  spec,
  at,
  opacity = 1,
  scale = 1,
  bondWidth = BOND_WIDTH,
  lonePairs = 0,
}: MoleculeProps) {
  if (opacity <= 0) return null;
  return (
    <g
      transform={`translate(${at.x} ${at.y}) scale(${scale})`}
      opacity={opacity}
    >
      {spec.bonds.map(([a, b]) => {
        const from = spec.atoms[a];
        const to = spec.atoms[b];
        if (!from || !to) return null;
        return (
          <line
            key={`${a}-${b}`}
            x1={from.x}
            y1={from.y}
            x2={to.x}
            y2={to.y}
            stroke={colors.covalent}
            strokeWidth={bondWidth}
            strokeLinecap="round"
          />
        );
      })}
      {lonePairs > 0 &&
        spec.lonePairs?.map(([index, angle], i) => {
          const atom = spec.atoms[index];
          if (!atom) return null;
          const centre = polar(angle, ATOMS[atom.el].r + 16);
          const spread = polar(angle + 90, 8);
          return (
            <g
              key={i}
              opacity={Math.min(1, lonePairs)}
              transform={`translate(${atom.x + centre.x} ${atom.y + centre.y}) scale(${lonePairs})`}
            >
              <circle
                cx={spread.x}
                cy={spread.y}
                r={6}
                fill={colors.covalent}
              />
              <circle
                cx={-spread.x}
                cy={-spread.y}
                r={6}
                fill={colors.covalent}
              />
            </g>
          );
        })}
      {spec.atoms.map((atom, i) => (
        <Atom key={i} el={atom.el} x={atom.x} y={atom.y} />
      ))}
    </g>
  );
}

export function Atom({ el, x, y }: AtomSpec) {
  const style = ATOMS[el];
  return (
    <g>
      <circle
        cx={x}
        cy={y}
        r={style.r}
        fill={style.fill}
        stroke={style.stroke}
        strokeWidth={style.stroke ? 3 : 0}
      />
      <text
        x={x}
        y={y}
        textAnchor="middle"
        dominantBaseline="central"
        fontFamily={FONT}
        fontWeight={700}
        fontSize={Math.round(style.r * (el.length > 1 ? 0.8 : 0.95))}
        fill={style.label}
      >
        {el}
      </text>
    </g>
  );
}

type ImfProps = {
  from: Point;
  to: Point;
  color: string;
  /** 0–1 drawing progress from `from` to `to`. */
  progress: number;
  /** Gap left clear at each end, in px. */
  trim?: [number, number];
  opacity?: number;
  width?: number;
};

/** Dashed intermolecular attraction, drawn from `from` toward `to`. */
export function ImfLine({
  from,
  to,
  color,
  progress,
  trim = [0, 0],
  opacity = 1,
  width = BOND_WIDTH,
}: ImfProps) {
  if (progress <= 0 || opacity <= 0) return null;
  const length = Math.hypot(to.x - from.x, to.y - from.y);
  const ux = (to.x - from.x) / length;
  const uy = (to.y - from.y) / length;
  const start = { x: from.x + ux * trim[0], y: from.y + uy * trim[0] };
  const end = { x: to.x - ux * trim[1], y: to.y - uy * trim[1] };
  return (
    <line
      x1={start.x}
      y1={start.y}
      x2={lerp(start.x, end.x, progress)}
      y2={lerp(start.y, end.y, progress)}
      stroke={color}
      strokeWidth={width}
      strokeDasharray="12 12"
      opacity={opacity}
    />
  );
}

type ArrowProps = {
  from: Point;
  to: Point;
  color: string;
  progress: number;
  width?: number;
  head?: number;
};

/** Straight arrow drawn from `from` toward `to`, head appearing as it lands. */
export function ArrowLine({
  from,
  to,
  color,
  progress,
  width = 6,
  head = 22,
}: ArrowProps) {
  if (progress <= 0) return null;
  const tip = {
    x: lerp(from.x, to.x, progress),
    y: lerp(from.y, to.y, progress),
  };
  const angle = (Math.atan2(to.y - from.y, to.x - from.x) * 180) / Math.PI;
  const left = polar(angle + 150, head);
  const right = polar(angle - 150, head);
  return (
    <g
      stroke={color}
      strokeWidth={width}
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    >
      <line x1={from.x} y1={from.y} x2={tip.x} y2={tip.y} />
      <path
        d={`M ${tip.x + left.x} ${tip.y + left.y} L ${tip.x} ${tip.y} L ${tip.x + right.x} ${tip.y + right.y}`}
      />
    </g>
  );
}
