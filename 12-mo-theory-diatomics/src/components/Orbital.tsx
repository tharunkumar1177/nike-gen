import { colors } from "../theme";

/** Native orbital box size. */
export const BOX = 120;

export type Spin = { dir: "up" | "down"; shown: number; color?: string };

/** Harpoon x positions inside a box: left slot and right slot. */
const SLOTS = [BOX / 2 - 22, BOX / 2 + 22] as const;

function Harpoon({ x, spin }: { x: number; spin: Spin }) {
  if (spin.shown <= 0) return null;
  const d =
    spin.dir === "up"
      ? `M ${x} 100 L ${x} 20 L ${x - 16} 42`
      : `M ${x} 20 L ${x} 100 L ${x + 16} 78`;
  return (
    <path
      d={d}
      fill="none"
      stroke={spin.color ?? colors.axis}
      strokeWidth={6}
      strokeLinecap="round"
      strokeLinejoin="round"
      opacity={spin.shown}
      transform={`translate(0 ${(1 - spin.shown) * -20})`}
    />
  );
}

type BoxProps = {
  /** Left edge in px. */
  x: number;
  /** Top edge in px. */
  y: number;
  stroke: string;
  /** Up to two electrons: first fills the left slot, second the right. */
  spins?: readonly Spin[];
  opacity?: number;
};

export function OrbitalBox({
  x,
  y,
  stroke,
  spins = [],
  opacity = 1,
}: BoxProps) {
  if (opacity <= 0) return null;
  return (
    <svg
      width={BOX}
      height={BOX}
      viewBox={`0 0 ${BOX} ${BOX}`}
      style={{
        position: "absolute",
        left: x,
        top: y,
        overflow: "visible",
        opacity,
      }}
    >
      <rect
        x={1.5}
        y={1.5}
        width={BOX - 3}
        height={BOX - 3}
        rx={12}
        fill={colors.box}
        stroke={stroke}
        strokeWidth={3}
      />
      {spins.slice(0, 2).map((spin, i) => (
        <Harpoon key={i} x={SLOTS[i] ?? SLOTS[0]} spin={spin} />
      ))}
    </svg>
  );
}
