import { colors, FONT, type } from "../theme";
import { Sub } from "./Text";

const WIDTH = 1480;
const HEIGHT = 300;
const NODE = { width: 360, height: 120 } as const;
const NODES = [
  { center: 180, label: "Mass (g)" },
  { center: 740, label: "Moles (mol)" },
  { center: 1300, label: "Particles" },
] as const;

type ArrowSpec = {
  x1: number;
  x2: number;
  y: number;
  labelY: number;
  op: "×" | "÷";
  factor: "M" | "NA";
};

const ARROWS: readonly ArrowSpec[] = [
  { x1: 380, x2: 540, y: 120, labelY: 78, op: "÷", factor: "M" },
  { x1: 540, x2: 380, y: 180, labelY: 222, op: "×", factor: "M" },
  { x1: 940, x2: 1100, y: 120, labelY: 78, op: "×", factor: "NA" },
  { x1: 1100, x2: 940, y: 180, labelY: 222, op: "÷", factor: "NA" },
];

/** Arrow order: mass→moles (÷ M), moles→mass (× M), moles→particles (× N_A), particles→moles (÷ N_A). */
export type MapArrow = 0 | 1 | 2 | 3;

type Highlight = { arrow: MapArrow; color: string; textColor: string };

type Props = {
  /** Centre of the map in px. */
  x: number;
  y: number;
  scale?: number;
  opacity?: number;
  /** Opacity of each of the three nodes. */
  nodes: readonly [number, number, number];
  /** Draw progress 0→1 of each arrow, in `MapArrow` order. */
  arrows: readonly [number, number, number, number];
  highlight?: Highlight;
};

function lit(highlight: Highlight | undefined, index: number) {
  return highlight?.arrow === index ? highlight : undefined;
}

function Factor({ name }: { name: ArrowSpec["factor"] }) {
  if (name === "M") return "M";
  return (
    <>
      N<Sub>A</Sub>
    </>
  );
}

export function ConversionMap({
  x,
  y,
  scale = 1,
  opacity = 1,
  nodes,
  arrows,
  highlight,
}: Props) {
  if (opacity <= 0) return null;
  return (
    <div
      style={{
        position: "absolute",
        left: x - WIDTH / 2,
        top: y - HEIGHT / 2,
        width: WIDTH,
        height: HEIGHT,
        transform: `scale(${scale})`,
        transformOrigin: "center",
        opacity,
        fontFamily: FONT,
      }}
    >
      {NODES.map((node, i) => (
        <div
          key={node.label}
          style={{
            position: "absolute",
            left: node.center - NODE.width / 2,
            top: HEIGHT / 2 - NODE.height / 2,
            width: NODE.width,
            height: NODE.height,
            boxSizing: "border-box",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: colors.box,
            border: `3px solid ${colors.muted}`,
            borderRadius: 16,
            fontSize: type.body,
            fontWeight: 500,
            color: colors.text,
            opacity: nodes[i],
          }}
        >
          {node.label}
        </div>
      ))}
      <svg
        width={WIDTH}
        height={HEIGHT}
        style={{ position: "absolute", left: 0, top: 0 }}
      >
        {ARROWS.map((arrow, i) => {
          const drawn = arrows[i] ?? 0;
          if (drawn <= 0) return null;
          const on = lit(highlight, i);
          const tip = arrow.x1 + (arrow.x2 - arrow.x1) * drawn;
          const back = Math.sign(arrow.x2 - arrow.x1) * -14;
          const head = `${tip + back},${arrow.y - 12} ${tip},${arrow.y} ${tip + back},${arrow.y + 12}`;
          return (
            <g
              key={i}
              stroke={on ? on.color : colors.muted}
              strokeWidth={on ? 8 : 4}
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            >
              <line x1={arrow.x1} y1={arrow.y} x2={tip} y2={arrow.y} />
              <polyline points={head} />
            </g>
          );
        })}
      </svg>
      {ARROWS.map((arrow, i) => {
        const on = lit(highlight, i);
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: (arrow.x1 + arrow.x2) / 2,
              top: arrow.labelY,
              transform: "translate(-50%, -50%)",
              fontSize: type.label,
              fontWeight: on ? 700 : 500,
              color: on ? on.textColor : colors.muted,
              opacity: arrows[i],
              whiteSpace: "nowrap",
            }}
          >
            {arrow.op} <Factor name={arrow.factor} />
          </div>
        );
      })}
    </div>
  );
}
