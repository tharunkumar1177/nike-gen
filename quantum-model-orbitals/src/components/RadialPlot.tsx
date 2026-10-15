import { useMemo } from "react";
import { radialFunction } from "../orbitals/wavefunctions";
import { colors, FONT, type } from "../theme";

export type RadialCurve = {
  n: number;
  l: number;
  color: string;
  /** 0–1 share of the r range drawn so far. */
  progress: number;
  opacity?: number;
};

export type RadialMarker = {
  /** Radius in a₀. */
  r: number;
  label: string;
  color: string;
  opacity: number;
  /** Label offset from the axis, in px above the plot floor. */
  labelLift?: number;
  /** Which side of the marker line the label sits on. */
  side?: "left" | "right";
  /** 0–1 extra emphasis on the marker line. */
  pulse?: number;
};

export type LegendEntry = { label: string; color: string };

type Props = {
  /** Top-left corner and size of the axes box, in px. */
  x: number;
  y: number;
  w: number;
  h: number;
  /** Largest radius on the x axis, in a₀. */
  rMax: number;
  tickStep: number;
  curves: RadialCurve[];
  markers?: RadialMarker[];
  legend?: LegendEntry[];
  xLabel: string;
  yLabel: string;
  opacity?: number;
};

const SAMPLES = 480;

function normalisedCurve(n: number, l: number, rMax: number) {
  const R = radialFunction(n, l);
  const step = rMax / SAMPLES;
  const values: number[] = [];
  // Normalise over a range wide enough to hold the whole distribution.
  let total = 0;
  const wide = 60 * n;
  for (let r = 0; r <= wide; r += 0.01) {
    total += r * r * R(r) ** 2 * 0.01;
  }
  for (let i = 0; i <= SAMPLES; i += 1) {
    const r = i * step;
    values.push((r * r * R(r) ** 2) / total);
  }
  return values;
}

export function RadialPlot({
  x,
  y,
  w,
  h,
  rMax,
  tickStep,
  curves,
  markers = [],
  legend = [],
  xLabel,
  yLabel,
  opacity = 1,
}: Props) {
  const keys = curves.map((c) => `${c.n}${c.l}`).join(",");
  const data = useMemo(
    () =>
      keys
        .split(",")
        .map((key) => normalisedCurve(Number(key[0]), Number(key[1]), rMax)),
    [keys, rMax],
  );
  const yMax = 1.12 * Math.max(...data.flat());
  const px = (r: number) => x + (r / rMax) * w;
  const py = (value: number) => y + h - (value / yMax) * h;
  const ticks: number[] = [];
  for (let r = 0; r <= rMax + 1e-9; r += tickStep) {
    ticks.push(r);
  }
  return (
    <svg
      width={1920}
      height={1080}
      style={{ position: "absolute", left: 0, top: 0, opacity }}
    >
      <line
        x1={x}
        y1={y + h}
        x2={x + w}
        y2={y + h}
        stroke={colors.axis}
        strokeWidth={3}
      />
      <line x1={x} y1={y} x2={x} y2={y + h} stroke={colors.axis} strokeWidth={3} />
      {ticks.map((r) => (
        <g key={r}>
          <line
            x1={px(r)}
            y1={y + h}
            x2={px(r)}
            y2={y + h + 10}
            stroke={colors.axis}
            strokeWidth={2}
          />
          <text
            x={px(r)}
            y={y + h + 38}
            textAnchor="middle"
            fontFamily={FONT}
            fontSize={type.label - 6}
            fontWeight={500}
            fill={colors.axis}
          >
            {r}
          </text>
        </g>
      ))}
      <text
        x={x + w / 2}
        y={y + h + 80}
        textAnchor="middle"
        fontFamily={FONT}
        fontSize={type.label}
        fontWeight={500}
        fill={colors.text}
      >
        {xLabel}
      </text>
      <text
        x={x - 28}
        y={y + h / 2}
        textAnchor="middle"
        fontFamily={FONT}
        fontSize={type.label}
        fontWeight={500}
        fill={colors.text}
        transform={`rotate(-90 ${x - 28} ${y + h / 2})`}
      >
        {yLabel}
      </text>
      {markers.map((m) =>
        m.opacity > 0 ? (
          <g key={m.label} opacity={m.opacity}>
            <line
              x1={px(m.r)}
              y1={y + h - (m.labelLift ?? h * 0.82)}
              x2={px(m.r)}
              y2={y + h}
              stroke={colors.node}
              strokeWidth={2.5 + 3 * (m.pulse ?? 0)}
              strokeDasharray="10 8"
            />
            <circle cx={px(m.r)} cy={y + h} r={8} fill={m.color} />
            <text
              x={px(m.r) + (m.side === "left" ? -12 : 12)}
              y={y + h - (m.labelLift ?? h * 0.82)}
              textAnchor={m.side === "left" ? "end" : "start"}
              fontFamily={FONT}
              fontSize={type.label - 4}
              fontWeight={500}
              fill={m.color}
            >
              {m.label}
            </text>
          </g>
        ) : null,
      )}
      {legend.map((entry, index) => (
        <g key={entry.label}>
          <line
            x1={x + w - 150}
            y1={y + 24 + index * 42}
            x2={x + w - 90}
            y2={y + 24 + index * 42}
            stroke={entry.color}
            strokeWidth={5}
            strokeLinecap="round"
          />
          <text
            x={x + w - 74}
            y={y + 35 + index * 42}
            fontFamily={FONT}
            fontSize={type.label - 4}
            fontWeight={500}
            fill={colors.text}
          >
            {entry.label}
          </text>
        </g>
      ))}
      {curves.map((curve, index) => {
        const values = data[index] ?? [];
        const last = Math.round(curve.progress * SAMPLES);
        if (last < 1) {
          return null;
        }
        const d = values
          .slice(0, last + 1)
          .map((v, i) => `${i === 0 ? "M" : "L"}${px((i * rMax) / SAMPLES)},${py(v)}`)
          .join(" ");
        return (
          <path
            key={`${curve.n}${curve.l}`}
            d={d}
            fill="none"
            stroke={curve.color}
            strokeWidth={5}
            strokeLinejoin="round"
            strokeLinecap="round"
            opacity={curve.opacity ?? 1}
          />
        );
      })}
    </svg>
  );
}
