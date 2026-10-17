import { useVideoConfig } from "remotion";
import { fadeIn, pop, progress } from "../components/anim";
import { PitfallTag, Title } from "../components/Labels";
import {
  AtomSymbol,
  Bond,
  bondOrder,
  ChargeBadge,
  LonePairs,
  Stage,
  type Point,
} from "../components/Lewis";
import { useSceneFrame } from "../components/SceneFrame";
import { Text } from "../components/Text";
import { cue } from "../cues";
import { colors, FONT } from "../theme";

const SCENE = "resonance-o3";

/** Bent O₃: terminal atoms sit 180 px from the centre at 150° and 30°. */
const ozone = (cx: number, cy: number) => ({
  left: { x: cx - 156, y: cy + 90 },
  centre: { x: cx, y: cy },
  right: { x: cx + 156, y: cy + 90 },
});

const ONE = ozone(450, 450);
const TWO = ozone(1470, 450);
const HYBRID = ozone(960, 700);

/** Lone-pair angles that avoid the bond to the centre (left bond at −30°, right at 210°). */
const PAIRS = {
  leftDouble: [90, 210],
  leftSingle: [60, 150, 240],
  centre: [270],
  rightDouble: [90, 330],
  rightSingle: [300, 30, 120],
};

/** Badge offset at `angle` degrees, `distance` px from the atom centre. */
const at = (angle: number, distance: number) => {
  const rad = (angle * Math.PI) / 180;
  return { dx: Math.cos(rad) * distance, dy: Math.sin(rad) * distance };
};

const BADGE = {
  leftDouble: at(270, 92),
  leftSingle: at(195, 92),
  centre: at(330, 80),
  rightDouble: at(270, 92),
  rightSingle: at(345, 92),
};

function Ozone({
  atoms,
  doubleOn,
  badges,
}: {
  atoms: ReturnType<typeof ozone>;
  doubleOn: "left" | "right";
  badges: { opacity: number; scale: number };
}) {
  const leftDouble = doubleOn === "left";
  return (
    <>
      <AtomSymbol {...atoms.left} symbol="O" />
      <AtomSymbol {...atoms.centre} symbol="O" />
      <AtomSymbol {...atoms.right} symbol="O" />
      <Bond
        from={atoms.left}
        to={atoms.centre}
        lines={bondOrder(leftDouble ? 2 : 1)}
      />
      <Bond
        from={atoms.centre}
        to={atoms.right}
        lines={bondOrder(leftDouble ? 1 : 2)}
      />
      <LonePairs
        atom={atoms.left}
        angles={leftDouble ? PAIRS.leftDouble : PAIRS.leftSingle}
      />
      <LonePairs atom={atoms.centre} angles={PAIRS.centre} />
      <LonePairs
        atom={atoms.right}
        angles={leftDouble ? PAIRS.rightSingle : PAIRS.rightDouble}
      />
      <ChargeBadge
        atom={atoms.left}
        value={leftDouble ? 0 : -1}
        {...(leftDouble ? BADGE.leftDouble : BADGE.leftSingle)}
        {...badges}
      />
      <ChargeBadge
        atom={atoms.centre}
        value={1}
        {...BADGE.centre}
        {...badges}
      />
      <ChargeBadge
        atom={atoms.right}
        value={leftDouble ? -1 : 0}
        {...(leftDouble ? BADGE.rightSingle : BADGE.rightDouble)}
        {...badges}
      />
    </>
  );
}

function ResonanceArrow({ from, to, y }: { from: number; to: number; y: number }) {
  const head = 22;
  return (
    <g stroke={colors.resonance} strokeWidth={6} strokeLinecap="round" fill="none">
      <line x1={from + 4} y1={y} x2={to - 4} y2={y} />
      <polyline points={`${from + head},${y - head} ${from},${y} ${from + head},${y + head}`} />
      <polyline points={`${to - head},${y - head} ${to},${y} ${to - head},${y + head}`} />
    </g>
  );
}

function BondLabel({ a, b, opacity }: { a: Point; b: Point; opacity: number }) {
  const mid = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
  const side = a.x < b.x === a.y > b.y ? -1 : 1;
  return (
    <Text
      x={mid.x + side * 62}
      y={mid.y - 44}
      size={32}
      weight={700}
      color={colors.resonance}
      opacity={opacity}
    >
      128 pm
    </Text>
  );
}

const SCALE = [
  { label: "O=O", value: "121 pm", color: colors.muted, weight: 400 },
  { label: "Hybrid", value: "128 pm", color: colors.resonance, weight: 700 },
  { label: "O–O", value: "147 pm", color: colors.muted, weight: 400 },
] as const;

export function ResonanceScene() {
  const frame = useSceneFrame();
  const { fps } = useVideoConfig();

  const intro = cue(SCENE, "Sometimes, two or more valid structures");
  const left = cue(SCENE, "draw a double bond on the left");
  const right = cue(SCENE, "or the right");
  const arrow = cue(SCENE, "These are resonance structures");
  const flips = cue(SCENE, "The real molecule is not a mixture");
  const hybrid = cue(SCENE, "It is a single resonance hybrid");
  const equal = cue(SCENE, "Both bonds in O three are equal");
  const between = cue(SCENE, "between a single and a double bond");

  const badges = (start: number) => {
    const t = pop(frame, fps, start);
    return { opacity: Math.min(1, t * 1.5), scale: t };
  };

  const tag = pop(frame, fps, flips);
  const strike = progress(frame, flips + 15, flips + 45);
  const hybridT = fadeIn(frame, hybrid);
  const hybridBonds = progress(frame, hybrid + 10, hybrid + 35);
  const labels = fadeIn(frame, equal + 15);
  const scale = fadeIn(frame, between);

  return (
    <>
      <Title title="Resonance" opacity={fadeIn(frame, intro)} />

      <Stage opacity={fadeIn(frame, left)}>
        <Ozone atoms={ONE} doubleOn="left" badges={badges(left + 20)} />
      </Stage>
      <Stage opacity={fadeIn(frame, right)}>
        <Ozone atoms={TWO} doubleOn="right" badges={badges(right + 20)} />
      </Stage>
      <Stage opacity={fadeIn(frame, arrow)}>
        <ResonanceArrow from={860} to={1060} y={495} />
      </Stage>

      <PitfallTag
        x={960}
        center
        y={300}
        strike={strike}
        size={36}
        opacity={Math.min(1, tag * 1.5)}
        dy={(1 - tag) * 20}
      >
        Molecules flip between structures
      </PitfallTag>

      <Stage opacity={hybridT}>
        <AtomSymbol {...HYBRID.left} symbol="O" />
        <AtomSymbol {...HYBRID.centre} symbol="O" />
        <AtomSymbol {...HYBRID.right} symbol="O" />
        <Bond
          from={HYBRID.left}
          to={HYBRID.centre}
          lines={["solid", "dashed"]}
          color={colors.resonance}
          draw={hybridBonds}
        />
        <Bond
          from={HYBRID.right}
          to={HYBRID.centre}
          lines={["dashed", "solid"]}
          color={colors.resonance}
          draw={hybridBonds}
        />
      </Stage>
      <Text
        x={HYBRID.centre.x}
        y={900}
        size={32}
        weight={500}
        color={colors.resonance}
        opacity={hybridT}
      >
        Resonance hybrid
      </Text>
      <BondLabel a={HYBRID.left} b={HYBRID.centre} opacity={labels} />
      <BondLabel a={HYBRID.centre} b={HYBRID.right} opacity={labels} />

      {SCALE.map((row, i) => (
        <div
          key={row.label}
          style={{
            position: "absolute",
            left: 1380,
            top: 680 + i * 56,
            transform: "translateY(-50%)",
            display: "flex",
            gap: 24,
            fontFamily: FONT,
            fontSize: 32,
            fontWeight: row.weight,
            color: row.color,
            opacity: scale,
            whiteSpace: "nowrap",
          }}
        >
          <span style={{ width: 120 }}>{row.label}</span>
          <span>{row.value}</span>
        </div>
      ))}
    </>
  );
}
