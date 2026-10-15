import { useMemo } from "react";
import { seeded } from "./anim";

type Props = {
  cx: number;
  cy: number;
  /** Screen radius in px of 5 a₀. */
  radius: number;
  count: number;
  color: string;
  /** Number of dots shown, 0–1 of `count`, revealed in sample order. */
  reveal?: number;
  opacity?: number;
  dotRadius?: number;
};

const SPAN_A0 = 5;

/**
 * Electron positions sampled from the 1s ψ² and projected onto the screen.
 * The 1s radial density r²e^(−2r) is a Gamma(3, ½) distribution, so
 * r = −(ln u₁ + ln u₂ + ln u₃)/2 samples it exactly.
 */
export function DotCloud({
  cx,
  cy,
  radius,
  count,
  color,
  reveal = 1,
  opacity = 1,
  dotRadius = 2.6,
}: Props) {
  const points = useMemo(() => {
    const list: { x: number; y: number }[] = [];
    for (let i = 0; i < count; i += 1) {
      const u1 = 1 - seeded(i * 5 + 1);
      const u2 = 1 - seeded(i * 5 + 2);
      const u3 = 1 - seeded(i * 5 + 3);
      const r = -(Math.log(u1) + Math.log(u2) + Math.log(u3)) / 2;
      const cosTheta = 2 * seeded(i * 5 + 4) - 1;
      const phi = 2 * Math.PI * seeded(i * 5 + 5);
      const sinTheta = Math.sqrt(1 - cosTheta * cosTheta);
      list.push({
        x: (r * sinTheta * Math.cos(phi) * radius) / SPAN_A0,
        y: (r * cosTheta * radius) / SPAN_A0,
      });
    }
    return list;
  }, [count, radius]);
  const shown = Math.round(reveal * count);
  return (
    <svg
      width={2 * radius}
      height={2 * radius}
      viewBox={`${-radius} ${-radius} ${2 * radius} ${2 * radius}`}
      style={{
        position: "absolute",
        left: cx - radius,
        top: cy - radius,
        overflow: "visible",
        opacity,
      }}
    >
      {points.slice(0, shown).map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={dotRadius} fill={color} />
      ))}
    </svg>
  );
}
