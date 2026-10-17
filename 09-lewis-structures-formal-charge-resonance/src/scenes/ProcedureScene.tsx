import { useVideoConfig } from "remotion";
import { easeInOut, fadeIn, lerp, pop, progress } from "../components/anim";
import { Chip, Title } from "../components/Labels";
import {
  AtomSymbol,
  Bond,
  BOND_GAP,
  BOND_TRIM,
  BOND_WIDTH,
  DOT_RADIUS,
  LonePair,
  pairCentre,
  PAIR_SPACING,
  SIDE,
  Stage,
  type Point,
} from "../components/Lewis";
import { useSceneFrame } from "../components/SceneFrame";
import { cue } from "../cues";
import { colors, FONT, SAFE } from "../theme";

const SCENE = "procedure-hcn";

const H = { x: 1100, y: 560 };
const C = { x: 1280, y: 560 };
const N = { x: 1460, y: 560 };

const STEPS = [
  "Count total valence electrons",
  "Skeleton with single bonds",
  "Complete octets on terminal atoms",
  "Leftovers on central atom (none left)",
  "Convert lone pairs into multiple bonds",
];

const PANEL = { width: 760, height: 88, top: 316, pitch: 110 };

export function ProcedureScene() {
  const frame = useSceneFrame();
  const { fps } = useVideoConfig();

  const intro = cue(SCENE, "Let's build H C N");
  const count = cue(SCENE, "count the valence electrons");
  const skeleton = cue(SCENE, "draw a skeleton with single bonds");
  const central = cue(SCENE, "H is never central");
  const used = cue(SCENE, "This uses four electrons");
  const terminal = cue(SCENE, "complete terminal octets");
  const nitrogen = cue(SCENE, "remaining six electrons on nitrogen");
  const lacks = cue(SCENE, "carbon lacks an octet");
  const convert = cue(SCENE, "convert two of nitrogen's lone pairs");
  const triple = cue(SCENE, "creating a triple bond");

  const stepStarts = [count, skeleton, terminal, lacks - 25, lacks + 10];
  const activeStep = stepStarts.reduce(
    (active, start, i) => (frame >= start ? i : active),
    -1,
  );

  const chip = (start: number, end?: number) => {
    const t = pop(frame, fps, start);
    const out = end === undefined ? 1 : 1 - fadeIn(frame, end);
    return { opacity: Math.min(1, t * 1.5, out), dy: (1 - t) * 20 };
  };

  const atoms = fadeIn(frame, skeleton);
  const bonds = progress(frame, skeleton + 10, skeleton + 30);
  const pairs = pop(frame, fps, nitrogen);
  const morph = progress(frame, convert, convert + 30, easeInOut);

  const counter =
    frame < used
      ? "10 e⁻ total"
      : frame < nitrogen
        ? "10 e⁻ total · 4 used · 6 left"
        : "10 e⁻ total · 10 used · 0 left";

  return (
    <>
      <Title title="Procedure: HCN" opacity={fadeIn(frame, intro)} />

      {STEPS.map((label, i) => {
        const t = pop(frame, fps, stepStarts[i]!);
        if (t <= 0) return null;
        const active = i === activeStep;
        return (
          <div
            key={label}
            style={{
              position: "absolute",
              left: SAFE,
              top: PANEL.top + i * PANEL.pitch,
              width: PANEL.width,
              height: PANEL.height,
              boxSizing: "border-box",
              display: "flex",
              alignItems: "center",
              gap: 20,
              padding: "0 28px",
              borderRadius: 16,
              backgroundColor: active ? colors.highlight : colors.panel,
              border: `4px solid ${active ? colors.bond : colors.panelBorder}`,
              fontFamily: FONT,
              fontSize: 32,
              color: colors.text,
              opacity: Math.min(1, t * 1.5),
              transform: `translateX(${(1 - t) * -30}px)`,
              whiteSpace: "nowrap",
            }}
          >
            <span
              style={{
                fontWeight: 700,
                color: active ? colors.bond : colors.muted,
              }}
            >
              {i + 1}
            </span>
            <span style={{ fontWeight: active ? 500 : 400 }}>{label}</span>
          </div>
        );
      })}

      <Chip x={C.x} y={400} {...chip(count)}>
        {counter}
      </Chip>

      <Stage>
        <AtomSymbol {...H} symbol="H" opacity={atoms} />
        <AtomSymbol {...C} symbol="C" opacity={atoms} />
        <AtomSymbol {...N} symbol="N" opacity={atoms} />
        <Bond from={H} to={C} draw={bonds} />
        <Bond from={C} to={N} draw={bonds} />
        <LonePair
          at={pairCentre(N, SIDE.right)}
          angle={SIDE.right}
          opacity={Math.min(1, pairs * 1.5)}
          scale={pairs}
        />
        <MorphingPair
          from={pairCentre(N, SIDE.top)}
          lineY={N.y - BOND_GAP}
          appear={pairs}
          morph={morph}
        />
        <MorphingPair
          from={pairCentre(N, SIDE.bottom)}
          lineY={N.y + BOND_GAP}
          appear={pairs}
          morph={morph}
        />
      </Stage>

      <Chip x={C.x} y={720} {...chip(central, lacks - 15)}>
        H is never central
      </Chip>
      <Chip
        x={C.x}
        y={720}
        color={colors.negative}
        {...chip(lacks + 5, triple)}
      >
        C has only 4 e⁻
      </Chip>
      <Chip x={C.x} y={720} color={colors.bond} {...chip(triple + 20)}>
        H 2 e⁻ · C 8 e⁻ · N 8 e⁻
      </Chip>
    </>
  );
}

/**
 * A lone pair on N whose two dots slide to the ends of a new C–N bond line
 * and are joined by it.
 */
function MorphingPair({
  from,
  lineY,
  appear,
  morph,
}: {
  from: Point;
  lineY: number;
  appear: number;
  morph: number;
}) {
  if (appear <= 0) return null;
  const left = { x: C.x + BOND_TRIM, y: lineY };
  const right = { x: N.x - BOND_TRIM, y: lineY };
  const a = {
    x: lerp(from.x - PAIR_SPACING / 2, left.x, morph),
    y: lerp(from.y, left.y, morph),
  };
  const b = {
    x: lerp(from.x + PAIR_SPACING / 2, right.x, morph),
    y: lerp(from.y, right.y, morph),
  };
  const dot = lerp(DOT_RADIUS * appear, BOND_WIDTH / 2, morph);
  const dotColor = morph < 0.5 ? colors.lonePair : colors.bond;
  return (
    <g opacity={Math.min(1, appear * 1.5)}>
      {morph > 0 ? (
        <line
          x1={a.x}
          y1={a.y}
          x2={b.x}
          y2={b.y}
          stroke={colors.bond}
          strokeWidth={BOND_WIDTH}
          strokeLinecap="round"
          opacity={morph}
        />
      ) : null}
      <circle cx={a.x} cy={a.y} r={dot} fill={dotColor} />
      <circle cx={b.x} cy={b.y} r={dot} fill={dotColor} />
    </g>
  );
}
