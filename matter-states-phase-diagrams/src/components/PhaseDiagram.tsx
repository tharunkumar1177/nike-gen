import { curvePath } from "./geometry";
import { PLOT, type Substance } from "./phases";
import { colors, FONT } from "../theme";

export type DiagramProgress = {
  axes: number;
  boundaries: number;
  regions: number;
  atm: number;
  supercriticalEdges: number;
  supercriticalFill: number;
  /** 0→1 accent overlay on the solid–liquid line. */
  slope: number;
};

type Props = {
  substance: Substance;
  progress: DiagramProgress;
  /** Screen scale, used to keep accent strokes a constant on-screen width. */
  scale?: number;
};

const GRID_STEPS = 10;

function DrawnPath({
  d,
  drawn,
  stroke,
  width,
}: {
  d: string;
  drawn: number;
  stroke: string;
  width: number;
}) {
  if (drawn <= 0) return null;
  return (
    <path
      d={d}
      pathLength={1}
      fill="none"
      stroke={stroke}
      strokeWidth={width}
      strokeLinecap="round"
      strokeDasharray="1 1"
      strokeDashoffset={1 - drawn}
    />
  );
}

export function PhaseDiagram({ substance, progress: p, scale = 1 }: Props) {
  const width = PLOT.right - PLOT.left;
  const height = PLOT.bottom - PLOT.top;
  const atmEnd = PLOT.left + width * p.atm;
  const sc = substance.critical;
  return (
    <g fontFamily={FONT}>
      <g opacity={p.axes}>
        {Array.from({ length: GRID_STEPS - 1 }, (_, i) => {
          const x = PLOT.left + (width * (i + 1)) / GRID_STEPS;
          const y = PLOT.top + (height * (i + 1)) / GRID_STEPS;
          return (
            <g key={i} stroke={colors.grid} strokeWidth={2}>
              <line x1={x} y1={PLOT.top} x2={x} y2={PLOT.bottom} />
              <line x1={PLOT.left} y1={y} x2={PLOT.right} y2={y} />
            </g>
          );
        })}
      </g>
      <g opacity={0.2 * p.regions}>
        <path d={substance.regions.solid} fill={colors.solid} />
        <path d={substance.regions.liquid} fill={colors.liquid} />
        <path d={substance.regions.gas} fill={colors.gas} />
      </g>
      <path
        d={substance.regions.supercritical}
        fill={colors.axis}
        opacity={0.1 * p.supercriticalFill}
      />
      {p.supercriticalEdges > 0 ? (
        <g
          stroke={colors.axis}
          strokeWidth={4}
          strokeDasharray="12 10"
          fill="none"
        >
          <line
            x1={sc.x}
            y1={sc.y}
            x2={sc.x}
            y2={sc.y - (sc.y - PLOT.top) * p.supercriticalEdges}
          />
          <line
            x1={sc.x}
            y1={sc.y}
            x2={sc.x + (PLOT.right - sc.x) * p.supercriticalEdges}
            y2={sc.y}
          />
        </g>
      ) : null}
      <g opacity={p.axes} stroke={colors.axis} strokeWidth={4} strokeLinecap="round">
        <line x1={PLOT.left} y1={PLOT.bottom} x2={PLOT.right} y2={PLOT.bottom} />
        <line x1={PLOT.left} y1={PLOT.bottom} x2={PLOT.left} y2={PLOT.top} />
      </g>
      {[substance.solidGas, substance.solidLiquid, substance.liquidGas].map(
        (curve, i) => (
          <DrawnPath
            key={i}
            d={curvePath(curve)}
            drawn={p.boundaries}
            stroke={colors.text}
            width={6}
          />
        ),
      )}
      {p.slope > 0 ? (
        <path
          d={curvePath(substance.solidLiquid)}
          fill="none"
          stroke={colors.accent}
          strokeWidth={6 / scale}
          strokeLinecap="round"
          opacity={p.slope}
        />
      ) : null}
      {p.atm > 0 ? (
        <line
          x1={PLOT.left}
          y1={substance.atmY}
          x2={atmEnd}
          y2={substance.atmY}
          stroke={colors.axis}
          strokeWidth={4}
          strokeDasharray="16 12"
        />
      ) : null}
      <g opacity={p.axes} fill={colors.text} fontSize={48}>
        <text x={960} y={940} textAnchor="middle" dominantBaseline="central">
          Temperature
        </text>
        <text
          x={200}
          y={540}
          textAnchor="middle"
          dominantBaseline="central"
          transform="rotate(-90 200 540)"
        >
          Pressure
        </text>
        <text
          x={1600}
          y={866}
          textAnchor="end"
          fontSize={32}
          fontWeight={500}
          fill={colors.axis}
        >
          Not to scale
        </text>
      </g>
    </g>
  );
}
