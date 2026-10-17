import type { ReactNode } from "react";
import { colors, FONT } from "../theme";
import { Frac, Sub, Text } from "./Text";

export const GRAPH = {
  x: 950,
  y: 850,
  width: 800,
  height: 450,
  halfLives: 4,
} as const;

export const graphX = (halfLives: number) =>
  GRAPH.x + (halfLives / GRAPH.halfLives) * GRAPH.width;
export const graphY = (fraction: number) => GRAPH.y - fraction * GRAPH.height;

const CURVE_STEPS = 160;

function curvePath(upTo: number) {
  const points: string[] = [];
  const steps = Math.max(1, Math.round(CURVE_STEPS * upTo));
  for (let i = 0; i <= steps; i += 1) {
    const h = (i / CURVE_STEPS) * GRAPH.halfLives;
    points.push(`${graphX(h).toFixed(1)},${graphY(0.5 ** h).toFixed(1)}`);
  }
  return `M${points.join(" L")}`;
}

export type Marker = {
  halfLives: number;
  label: ReactNode;
  reveal: number;
};

type Props = {
  axes: number;
  /** 0→1 draw-on of the N/N₀ = (1/2)^n curve. */
  curve: number;
  markers?: readonly Marker[];
};

/** Fraction remaining against time in half-lives, with dashed half-life guides. */
export function DecayGraph({ axes, curve, markers = [] }: Props) {
  return (
    <>
      <svg
        width={1920}
        height={1080}
        style={{ position: "absolute", left: 0, top: 0 }}
      >
        <g opacity={axes} stroke={colors.text} strokeWidth={3}>
          <line
            x1={GRAPH.x}
            y1={GRAPH.y}
            x2={GRAPH.x + GRAPH.width}
            y2={GRAPH.y}
          />
          <line
            x1={GRAPH.x}
            y1={GRAPH.y}
            x2={GRAPH.x}
            y2={GRAPH.y - GRAPH.height}
          />
          {[1, 2, 3, 4].map((h) => (
            <line
              key={h}
              x1={graphX(h)}
              y1={GRAPH.y}
              x2={graphX(h)}
              y2={GRAPH.y + 10}
            />
          ))}
          {[0.5, 1].map((f) => (
            <line
              key={f}
              x1={GRAPH.x - 10}
              y1={graphY(f)}
              x2={GRAPH.x}
              y2={graphY(f)}
            />
          ))}
        </g>
        {markers.map(({ halfLives, reveal }) => {
          const y = graphY(0.5 ** halfLives);
          const x = graphX(halfLives);
          const across = x - GRAPH.x;
          const drawn = reveal * (across + GRAPH.y - y);
          const drop = Math.max(0, drawn - across);
          return (
            <g key={halfLives} opacity={reveal > 0 ? 1 : 0}>
              <path
                d={`M${GRAPH.x} ${y} H${GRAPH.x + Math.min(drawn, across)}${drop > 0 ? ` V${y + drop}` : ""}`}
                fill="none"
                stroke={colors.halfLife}
                strokeWidth={3}
                strokeDasharray="10 8"
              />
              <circle
                cx={x}
                cy={y}
                r={9 * reveal}
                fill={colors.halfLife}
                stroke={colors.background}
                strokeWidth={2}
              />
            </g>
          );
        })}
        {curve > 0 ? (
          <path
            d={curvePath(curve)}
            fill="none"
            stroke={colors.text}
            strokeWidth={4}
            strokeLinejoin="round"
          />
        ) : null}
      </svg>
      {markers.map(({ halfLives, label, reveal }) => (
        <Text
          key={halfLives}
          x={graphX(halfLives) + 16}
          y={graphY(0.5 ** halfLives) - 40}
          size={32}
          weight={700}
          color={colors.halfLifeText}
          opacity={reveal}
        >
          {label}
        </Text>
      ))}
      {[0, 1, 2, 3, 4].map((h) => (
        <Text
          key={h}
          x={graphX(h)}
          y={GRAPH.y + 34}
          size={28}
          anchor="middle"
          color={colors.muted}
          opacity={axes}
        >
          {h}
        </Text>
      ))}
      {[
        [0, "0"],
        [0.5, "0.5"],
        [1, "1.0"],
      ].map(([f, label]) => (
        <Text
          key={label}
          x={GRAPH.x - 18}
          y={graphY(Number(f))}
          size={28}
          anchor="end"
          color={colors.muted}
          opacity={axes}
        >
          {label}
        </Text>
      ))}
      <Text
        x={GRAPH.x + GRAPH.width / 2}
        y={GRAPH.y + 82}
        size={30}
        anchor="middle"
        opacity={axes}
      >
        Time (half-lives)
      </Text>
      <div
        style={{
          position: "absolute",
          left: GRAPH.x - 92,
          top: GRAPH.y - GRAPH.height / 2,
          transform: "translate(-50%, -50%) rotate(-90deg)",
          fontFamily: FONT,
          fontSize: 30,
          color: colors.text,
          whiteSpace: "nowrap",
          opacity: axes,
        }}
      >
        Fraction remaining, N/N<Sub>0</Sub>
      </div>
    </>
  );
}

/** Stacked 1/2^n fraction used for half-life marker labels. */
export function HalfLabel({ den }: { den: number }) {
  return <Frac num="1" den={String(den)} />;
}
