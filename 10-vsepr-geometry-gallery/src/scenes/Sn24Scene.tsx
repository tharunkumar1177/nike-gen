import { AbsoluteFill, useVideoConfig } from "remotion";
import { fadeWindow, pop } from "../components/anim";
import { Card, Line } from "../components/Panels";
import { useSceneFrame } from "../components/SceneFrame";
import { cue, narrationEnd } from "../cues";
import { CLASS_INFO, domainsFor, type VseprClass } from "../molecules/geometry";
import {
  gallerySpec,
  InfoCard,
  ThumbLabel,
  type GalleryItem,
} from "../molecules/gallery";
import { Molecules } from "../molecules/Molecules";
import { facePose } from "../molecules/view";
import { colors, type } from "../theme";

const S = "sn-2-4-gallery" as const;

type Entry = {
  cls: VseprClass;
  central: string;
  ligands: string;
  formula: string;
  shape: string;
  enterCue: string;
  angleCue: string;
  angle: string;
  ideal?: string;
  /** Slots spanning the labelled angle. */
  a: number;
  b: number;
  orders?: Partial<Record<number, 1 | 2 | 3>>;
};

const ENTRIES: Entry[] = [
  {
    cls: "AX2",
    central: "C",
    ligands: "O",
    formula: "CO₂",
    shape: "linear",
    enterCue: "C O two is",
    angleCue: "linear at one hundred eighty",
    angle: "180°",
    a: 0,
    b: 1,
    orders: { 0: 2, 1: 2 },
  },
  {
    cls: "AX3",
    central: "B",
    ligands: "F",
    formula: "BF₃",
    shape: "trigonal planar",
    enterCue: "B F three is",
    angleCue: "trigonal planar at one",
    angle: "120°",
    a: 1,
    b: 2,
  },
  {
    cls: "AX2E",
    central: "S",
    ligands: "O",
    formula: "SO₂",
    shape: "bent",
    enterCue: "S O two is",
    angleCue: "bent at one hundred nineteen",
    angle: "119°",
    ideal: "120°",
    a: 1,
    b: 2,
  },
  {
    cls: "AX4",
    central: "C",
    ligands: "H",
    formula: "CH₄",
    shape: "tetrahedral",
    enterCue: "C H four is",
    angleCue: "tetrahedral at one",
    angle: "109.5°",
    a: 1,
    b: 2,
  },
  {
    cls: "AX3E",
    central: "N",
    ligands: "H",
    formula: "NH₃",
    shape: "trigonal pyramidal",
    enterCue: "N H three is",
    angleCue: "trigonal pyramidal at",
    angle: "107°",
    ideal: "109.5°",
    a: 1,
    b: 2,
  },
  {
    cls: "AX2E2",
    central: "O",
    ligands: "H",
    formula: "H₂O",
    shape: "bent",
    enterCue: "H two O is",
    angleCue: "bent at one hundred four",
    angle: "104.5°",
    ideal: "109.5°",
    a: 0,
    b: 1,
  },
];

function buildItems(): (GalleryItem & { entry: Entry; angleAt: number })[] {
  const enters = ENTRIES.map((e) => cue(S, e.enterCue));
  const end = narrationEnd(S) + 30;
  return ENTRIES.map((entry, i) => {
    const enter = enters[i] ?? 0;
    const angleAt = cue(S, entry.angleCue);
    const measured = domainsFor(entry.cls, 1, entry.orders);
    const ideal = domainsFor(entry.cls, 0);
    const da = measured[entry.a]?.dir ?? [1, 0, 0];
    const db = measured[entry.b]?.dir ?? [-1, 0, 0];
    const linear = entry.cls === "AX2";
    const pose = linear
      ? facePose(da, db, [0, 1, 0], [0, 1, 0])
      : facePose(da, db, [0, -1, 0]);
    const ghostA = ideal[entry.a]?.dir;
    const ghostB = ideal[entry.b]?.dir;
    return {
      id: entry.formula,
      cls: entry.cls,
      central: entry.central,
      ligands: entry.ligands,
      orders: entry.orders,
      enter,
      exit: enters[i + 1] ?? end,
      thumbIndex: i,
      thumbCount: ENTRIES.length,
      squeezeAt: entry.ideal ? angleAt : undefined,
      poses: [{ at: angleAt - 30, pose }],
      arcs: [
        ...(entry.ideal && ghostA && ghostB
          ? [
              {
                at: angleAt,
                a: ghostA,
                b: ghostB,
                radius: 0.56,
                color: colors.muted,
                opacity: 0.45,
              },
            ]
          : []),
        {
          at: angleAt + 10,
          a: entry.a,
          b: entry.b,
          label: entry.angle,
          via: linear ? ([0, 1, 0] as const) : undefined,
        },
      ],
      entry,
      angleAt,
    };
  });
}

export function Sn24Scene() {
  const frame = useSceneFrame();
  const { fps } = useVideoConfig();
  const items = buildItems();
  const intro = cue(S, "Steric numbers two through");
  const notation = cue(S, "We use A X m E n notation");
  const first = items[0]?.enter ?? notation + 300;
  const keyA = cue(S, "where A is the central");
  const keyX = cue(S, "X is a bonded atom");
  const keyE = cue(S, "and E is a lone pair");
  const lineIn = (t: number) => fadeWindow(frame, t, t + 15);

  return (
    <AbsoluteFill>
      <Molecules
        specs={items
          .filter((item) => frame >= item.enter)
          .map((item) => gallerySpec(item, frame, fps))}
      />
      <Card
        cx={960}
        cy={420}
        width={1200}
        opacity={fadeWindow(frame, intro - 20, intro, notation - 15, notation)}
        scale={0.9 + 0.1 * pop(frame, fps, intro - 20)}
      >
        <Line size={type.title} weight={700}>
          Steric numbers 2–4
        </Line>
        <Line size={type.body} color={colors.muted}>
          linear · trigonal planar · tetrahedral
        </Line>
      </Card>
      <Card
        cx={960}
        cy={420}
        width={1200}
        opacity={fadeWindow(frame, notation, notation + 20, first - 15, first)}
        scale={0.9 + 0.1 * pop(frame, fps, notation)}
        gap={20}
      >
        <Line size={type.title} weight={700}>
          <span style={{ color: colors.central }}>A</span>
          <span style={{ color: colors.halogenText }}>X</span>
          <sub>m</sub>
          <span style={{ color: colors.lonePairText }}>E</span>
          <sub>n</sub> notation
        </Line>
        <Line size={type.body} opacity={lineIn(keyA)}>
          <b style={{ color: colors.central }}>A</b> = central atom
        </Line>
        <Line size={type.body} opacity={lineIn(keyX)}>
          <b style={{ color: colors.halogenText }}>X</b> = bonded atom (m of
          them)
        </Line>
        <Line size={type.body} opacity={lineIn(keyE)}>
          <b style={{ color: colors.lonePairText }}>E</b> = lone pair (n of
          them)
        </Line>
      </Card>
      {items.map((item) => (
        <InfoCard
          key={item.id}
          frame={frame}
          fps={fps}
          enter={item.enter}
          exit={item.exit}
          formula={item.entry.formula}
          cls={CLASS_INFO[item.cls].label}
          shape={item.entry.shape}
          angleAt={item.angleAt + 20}
          angle={item.entry.angle}
          ideal={item.entry.ideal}
        />
      ))}
      {items.map((item) => (
        <ThumbLabel
          key={item.id}
          frame={frame}
          item={item}
          formula={item.entry.formula}
          shape={item.entry.shape}
        />
      ))}
    </AbsoluteFill>
  );
}
