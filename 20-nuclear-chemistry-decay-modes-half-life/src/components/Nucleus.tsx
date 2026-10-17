import { colors } from "../theme";

export type Nucleon = { dx: number; dy: number; proton: boolean };

const GOLDEN = 0.6180339887;

/**
 * Hexagonal packing offsets for `count` nucleons, filled ring by ring from the
 * centre; protons are spread evenly through the cluster at `protonShare`.
 */
export function packNucleons(
  count: number,
  spacing: number,
  protonShare = 0.5,
) {
  const cells: { dx: number; dy: number; d: number }[] = [];
  const rings = Math.ceil(Math.sqrt(count)) + 1;
  for (let row = -rings; row <= rings; row += 1) {
    for (let col = -rings; col <= rings; col += 1) {
      const dx = (col + (row % 2 === 0 ? 0 : 0.5)) * spacing;
      const dy = row * spacing * 0.866;
      cells.push({ dx, dy, d: Math.hypot(dx, dy) });
    }
  }
  cells.sort((a, b) => a.d - b.d || a.dx - b.dx || a.dy - b.dy);
  return cells.slice(0, count).map(({ dx, dy }, i) => ({
    dx,
    dy,
    proton: ((i + 1) * GOLDEN) % 1 < protonShare,
  }));
}

type Props = {
  x: number;
  y: number;
  radius: number;
  nucleons: readonly Nucleon[];
  opacity?: number;
  scale?: number;
};

/** Cluster of proton and neutron discs centred on (x, y), drawn inside an SVG. */
export function Nucleus({
  x,
  y,
  radius,
  nucleons,
  opacity = 1,
  scale = 1,
}: Props) {
  if (opacity <= 0) return null;
  return (
    <g opacity={opacity} transform={`translate(${x} ${y}) scale(${scale})`}>
      {nucleons.map(({ dx, dy, proton }, i) => (
        <circle
          key={i}
          cx={dx}
          cy={dy}
          r={radius}
          fill={proton ? colors.proton : colors.neutron}
          stroke={colors.background}
          strokeWidth={2}
        />
      ))}
    </g>
  );
}
