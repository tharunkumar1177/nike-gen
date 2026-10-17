import { colors } from "../theme";

export const LOBE = 160;
const FILL_OPACITY = 0.85;

type LobeProps = {
  x: number;
  y: number;
  /** Direction in degrees, 0 = right, 90 = down (SVG convention). */
  angle: number;
  length?: number;
  width?: number;
  fill: string;
  stroke: string;
  opacity?: number;
};

/** Teardrop lobe with its point at (x, y), extending along `angle`. */
export function Lobe({
  x,
  y,
  angle,
  length = LOBE,
  width = length * 0.62,
  fill,
  stroke,
  opacity = 1,
}: LobeProps) {
  if (opacity <= 0 || length <= 0) return null;
  const h = width / 2;
  const d = [
    "M 0 0",
    `C ${length * 0.2} ${-h * 1.1}, ${length * 0.9} ${-h * 1.15}, ${length} 0`,
    `C ${length * 0.9} ${h * 1.15}, ${length * 0.2} ${h * 1.1}, 0 0`,
    "Z",
  ].join(" ");
  return (
    <path
      d={d}
      transform={`translate(${x} ${y}) rotate(${angle})`}
      fill={fill}
      fillOpacity={FILL_OPACITY}
      stroke={stroke}
      strokeWidth={3}
      strokeLinejoin="round"
      opacity={opacity}
    />
  );
}

type OrbitalProps = {
  x: number;
  y: number;
  angle?: number;
  length?: number;
  opacity?: number;
};

export function SOrbital({
  x,
  y,
  radius = 70,
  opacity = 1,
}: {
  x: number;
  y: number;
  radius?: number;
  opacity?: number;
}) {
  if (opacity <= 0) return null;
  return (
    <g opacity={opacity}>
      <circle
        cx={x}
        cy={y}
        r={radius}
        fill={colors.s}
        fillOpacity={FILL_OPACITY}
        stroke={colors.sText}
        strokeWidth={3}
      />
      <Nucleus x={x} y={y} />
    </g>
  );
}

/** Two opposed p lobes through a nucleus. */
export function POrbital({
  x,
  y,
  angle = 0,
  length = LOBE * 0.8,
  opacity = 1,
  fill = colors.p,
  stroke = colors.pText,
}: OrbitalProps & { fill?: string; stroke?: string }) {
  if (opacity <= 0) return null;
  return (
    <g opacity={opacity}>
      <Lobe
        x={x}
        y={y}
        angle={angle}
        length={length}
        fill={fill}
        stroke={stroke}
      />
      <Lobe
        x={x}
        y={y}
        angle={angle + 180}
        length={length}
        fill={fill}
        stroke={stroke}
      />
    </g>
  );
}

/** Hybrid orbital: one large lobe plus a small back lobe. */
export function HybridOrbital({
  x,
  y,
  angle = 0,
  length = LOBE,
  opacity = 1,
}: OrbitalProps) {
  if (opacity <= 0) return null;
  return (
    <g opacity={opacity}>
      <Lobe
        x={x}
        y={y}
        angle={angle + 180}
        length={length * 0.28}
        fill={colors.hybrid}
        stroke={colors.hybridText}
      />
      <Lobe
        x={x}
        y={y}
        angle={angle}
        length={length}
        fill={colors.hybrid}
        stroke={colors.hybridText}
      />
    </g>
  );
}

export function Nucleus({ x, y }: { x: number; y: number }) {
  return <circle cx={x} cy={y} r={6} fill={colors.text} />;
}
