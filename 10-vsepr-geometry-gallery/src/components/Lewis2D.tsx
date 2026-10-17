import { colors, FONT } from "../theme";

export type LewisLigand = {
  symbol: string;
  /** Degrees clockwise from up. */
  angle: number;
  order: 1 | 2 | 3;
  /** Lone pairs on this ligand. */
  lonePairs: number;
};

export type LewisStructure = {
  central: string;
  /** Directions of the central atom's lone pairs, degrees clockwise from up. */
  centralLonePairs: number[];
  ligands: LewisLigand[];
};

const F3: Omit<LewisLigand, "angle"> = { symbol: "F", order: 1, lonePairs: 3 };

export const LEWIS = {
  CO2: {
    central: "C",
    centralLonePairs: [],
    ligands: [
      { symbol: "O", angle: 270, order: 2, lonePairs: 2 },
      { symbol: "O", angle: 90, order: 2, lonePairs: 2 },
    ],
  },
  H2O: {
    central: "O",
    centralLonePairs: [0, 180],
    ligands: [
      { symbol: "H", angle: 270, order: 1, lonePairs: 0 },
      { symbol: "H", angle: 90, order: 1, lonePairs: 0 },
    ],
  },
  NH3: {
    central: "N",
    centralLonePairs: [0],
    ligands: [
      { symbol: "H", angle: 270, order: 1, lonePairs: 0 },
      { symbol: "H", angle: 90, order: 1, lonePairs: 0 },
      { symbol: "H", angle: 180, order: 1, lonePairs: 0 },
    ],
  },
  SF4: {
    central: "S",
    centralLonePairs: [0],
    ligands: [
      { ...F3, angle: 270 },
      { ...F3, angle: 90 },
      { ...F3, angle: 225 },
      { ...F3, angle: 135 },
    ],
  },
  XeF4: {
    central: "Xe",
    centralLonePairs: [0, 180],
    ligands: [
      { ...F3, angle: 45 },
      { ...F3, angle: 135 },
      { ...F3, angle: 225 },
      { ...F3, angle: 315 },
    ],
  },
} satisfies Record<string, LewisStructure>;

export type LewisName = keyof typeof LEWIS;

const RAD = Math.PI / 180;
const dir = (deg: number) => ({
  x: Math.sin(deg * RAD),
  y: -Math.cos(deg * RAD),
});

type Layout = {
  cx: number;
  cy: number;
  /** Centre-to-centre bond length in px. */
  bond: number;
  /** Font size of element symbols in px. */
  fontSize?: number;
};

const LONE_PAIR_OFFSET = 0.68;

/** Screen anchors of a Lewis structure, for attaching callouts. */
export function lewisAnchors(
  name: LewisName,
  { cx, cy, bond, fontSize = 56 }: Layout,
) {
  const s = LEWIS[name] as LewisStructure;
  return {
    central: { x: cx, y: cy },
    ligands: s.ligands.map((l) => {
      const d = dir(l.angle);
      return { x: cx + d.x * bond, y: cy + d.y * bond };
    }),
    bonds: s.ligands.map((l) => {
      const d = dir(l.angle);
      return { x: cx + (d.x * bond) / 2, y: cy + (d.y * bond) / 2 };
    }),
    lonePairs: s.centralLonePairs.map((angle) => {
      const d = dir(angle);
      const r = fontSize * LONE_PAIR_OFFSET;
      return { x: cx + d.x * r, y: cy + d.y * r };
    }),
  };
}

function DotPair({
  x,
  y,
  angle,
  r,
  color,
}: {
  x: number;
  y: number;
  angle: number;
  r: number;
  color: string;
}) {
  const t = dir(angle + 90);
  const gap = r * 1.8;
  return (
    <>
      <circle cx={x + t.x * gap} cy={y + t.y * gap} r={r} fill={color} />
      <circle cx={x - t.x * gap} cy={y - t.y * gap} r={r} fill={color} />
    </>
  );
}

type Props = Layout & {
  name: LewisName;
  opacity?: number;
  /** Colour of the central atom's lone-pair dots. */
  lonePairColor?: string;
};

/** Flat Lewis structure: element symbols, bond lines, and lone-pair dots. */
export function Lewis2D({
  name,
  cx,
  cy,
  bond,
  fontSize = 56,
  opacity = 1,
  lonePairColor = colors.lonePairText,
}: Props) {
  const s = LEWIS[name] as LewisStructure;
  const dot = Math.max(3, fontSize * 0.07);
  const clear = fontSize * 0.55;
  const left = cx - bond * 1.6;
  const top = cy - bond * 1.6;
  const local = (x: number, y: number) => ({ x: x - left, y: y - top });
  const c = local(cx, cy);
  return (
    <svg
      width={bond * 3.2}
      height={bond * 3.2}
      style={{ position: "absolute", left, top, opacity, overflow: "visible" }}
    >
      {s.ligands.map((l, i) => {
        const d = dir(l.angle);
        const n = { x: -d.y, y: d.x };
        const offsets =
          l.order === 1
            ? [0]
            : l.order === 2
              ? [-0.11, 0.11]
              : [-0.16, 0, 0.16];
        const end = { x: c.x + d.x * bond, y: c.y + d.y * bond };
        return (
          <g key={i}>
            {offsets.map((o, k) => (
              <line
                key={k}
                x1={c.x + d.x * clear + n.x * o * fontSize}
                y1={c.y + d.y * clear + n.y * o * fontSize}
                x2={end.x - d.x * clear + n.x * o * fontSize}
                y2={end.y - d.y * clear + n.y * o * fontSize}
                stroke={colors.text}
                strokeWidth={Math.max(2, fontSize * 0.06)}
                strokeLinecap="round"
              />
            ))}
            {Array.from({ length: l.lonePairs }, (_, k) => {
              const spread = l.lonePairs === 3 ? 90 : 60;
              const angle =
                l.angle +
                (l.lonePairs === 1
                  ? 0
                  : -spread + (2 * spread * k) / (l.lonePairs - 1));
              const p = dir(angle);
              return (
                <DotPair
                  key={k}
                  x={end.x + p.x * fontSize * 0.62}
                  y={end.y + p.y * fontSize * 0.62}
                  angle={angle}
                  r={dot}
                  color={colors.text}
                />
              );
            })}
            <text
              x={end.x}
              y={end.y}
              textAnchor="middle"
              dominantBaseline="central"
              fontFamily={FONT}
              fontWeight={500}
              fontSize={fontSize}
              fill={colors.text}
            >
              {l.symbol}
            </text>
          </g>
        );
      })}
      {s.centralLonePairs.map((angle, i) => {
        const p = dir(angle);
        return (
          <DotPair
            key={i}
            x={c.x + p.x * fontSize * LONE_PAIR_OFFSET}
            y={c.y + p.y * fontSize * LONE_PAIR_OFFSET}
            angle={angle}
            r={dot * 1.15}
            color={lonePairColor}
          />
        );
      })}
      <text
        x={c.x}
        y={c.y}
        textAnchor="middle"
        dominantBaseline="central"
        fontFamily={FONT}
        fontWeight={700}
        fontSize={fontSize}
        fill={colors.text}
      >
        {s.central}
      </text>
    </svg>
  );
}
