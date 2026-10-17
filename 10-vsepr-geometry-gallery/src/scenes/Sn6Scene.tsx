import { AbsoluteFill, useVideoConfig } from "remotion";
import { fadeWindow, pop, progress } from "../components/anim";
import { Lewis2D } from "../components/Lewis2D";
import { Card, Line } from "../components/Panels";
import { useSceneFrame } from "../components/SceneFrame";
import { cue, narrationEnd } from "../cues";
import { CLASS_INFO, domainsFor } from "../molecules/geometry";
import {
  gallerySpec,
  HERO,
  INFO,
  InfoCard,
  ThumbLabel,
  type GalleryItem,
} from "../molecules/gallery";
import { Molecules } from "../molecules/Molecules";
import { eulerPose, facePose } from "../molecules/view";
import { colors, type } from "../theme";

const S = "sn-6-family" as const;
const COUNT = 3;

export function Sn6Scene() {
  const frame = useSceneFrame();
  const { fps } = useVideoConfig();

  const intro = cue(S, "Steric number six is octahedral");
  const equivalent = cue(S, "All six positions are equivalent");
  const sf6 = cue(S, "S F six is");
  const sf6Angle = cue(S, "octahedral with ninety degree");
  const brf5 = cue(S, "B R F five is");
  const brf5Angle = cue(S, "square pyramidal at eighty");
  const worked = cue(S, "For our next worked example");
  const bonds = cue(S, "four bonds and two lone pairs");
  const trans = cue(S, "The two lone pairs sit trans");
  const planar = cue(S, "This leaves an A X four");
  const ninety = cue(S, "exactly ninety degree bond");
  const end = narrationEnd(S) + 30;

  const ideal6 = domainsFor("AX6");
  const items: (GalleryItem & {
    formula: string;
    shape: string;
    infoAt: number;
    angleAt: number;
    angle: string;
    ideal?: string;
  })[] = [
    {
      id: "SF6",
      formula: "SF₆",
      shape: "octahedral",
      cls: "AX6",
      central: "S",
      ligands: "F",
      enter: intro,
      exit: brf5,
      thumbIndex: 0,
      thumbCount: COUNT,
      infoAt: sf6,
      angleAt: sf6Angle + 20,
      angle: "90°",
      spinOffset: 20,
      poses: [{ at: sf6Angle - 20, pose: eulerPose(12, 20) }],
      arcs: [{ at: sf6Angle + 10, a: 2, b: 0, label: "90°" }],
      extra: (f) => ({
        highlight: [0, 1, 2, 3, 4, 5],
        highlightAmount:
          0.6 *
          progress(f, equivalent, equivalent + 15) *
          (1 - progress(f, sf6 - 10, sf6 + 5)),
      }),
    },
    {
      id: "BrF5",
      formula: "BrF₅",
      shape: "square pyramidal",
      cls: "AX5E",
      central: "Br",
      ligands: "F",
      enter: brf5,
      exit: worked,
      thumbIndex: 1,
      thumbCount: COUNT,
      infoAt: brf5 + 10,
      angleAt: brf5Angle + 20,
      angle: "84.8°",
      ideal: "90°",
      squeezeAt: brf5Angle,
      spinOffset: 20,
      poses: [{ at: brf5Angle - 20, pose: eulerPose(8, 20) }],
      arcs: [
        {
          at: brf5Angle,
          a: ideal6[2]?.dir ?? [0, 1, 0],
          b: ideal6[0]?.dir ?? [1, 0, 0],
          radius: 0.56,
          color: colors.muted,
          opacity: 0.45,
        },
        { at: brf5Angle + 10, a: 2, b: 0, label: "84.8°" },
      ],
    },
    {
      id: "XeF4",
      formula: "XeF₄",
      shape: "square planar",
      cls: "AX4E2",
      central: "Xe",
      ligands: "F",
      enter: trans,
      exit: end,
      thumbIndex: 2,
      thumbCount: COUNT,
      infoAt: planar,
      angleAt: ninety + 20,
      angle: "90°",
      poses: [
        { at: trans, pose: eulerPose(0, 30) },
        {
          at: planar,
          pose: facePose([1, 0, 0], [0, 0, 1], [0.7071, -0.7071, 0]),
        },
      ],
      arcs: [
        {
          at: trans + 30,
          until: planar,
          a: 2,
          b: 3,
          via: [0.7071, 0, 0.7071],
          label: "180°",
          radius: 0.5,
          color: colors.lonePairText,
        },
        { at: ninety, a: 0, b: 4, label: "90°" },
      ],
      extra: (f) => ({
        highlight: [2, 3],
        highlightColor: colors.lonePairText,
        highlightAmount:
          0.5 *
          progress(f, trans + 20, trans + 35) *
          (1 - progress(f, planar, planar + 15)),
      }),
    },
  ];

  const lewisOn = fadeWindow(frame, worked, worked + 20, trans - 15, trans);
  const snOn = progress(frame, bonds + 20, bonds + 35);

  return (
    <AbsoluteFill>
      <Molecules
        specs={items
          .filter((item) => frame >= item.enter)
          .map((item) => gallerySpec(item, frame, fps))}
      />
      <Card
        cx={INFO.cx}
        cy={INFO.cy}
        width={INFO.width}
        opacity={fadeWindow(frame, intro, intro + 15, sf6 - 15, sf6)}
        scale={0.9 + 0.1 * pop(frame, fps, intro)}
        gap={20}
      >
        <Line size={type.title} weight={700}>
          SN 6
        </Line>
        <Line size={type.body}>octahedral</Line>
        <Line
          size={type.body}
          color={colors.highlight}
          opacity={progress(frame, equivalent, equivalent + 15)}
        >
          all six positions equivalent
        </Line>
      </Card>
      <Lewis2D name="XeF4" cx={HERO.cx} cy={HERO.cy} bond={150} fontSize={64} opacity={lewisOn} />
      <Card
        cx={INFO.cx}
        cy={INFO.cy}
        width={INFO.width}
        opacity={lewisOn}
        scale={0.9 + 0.1 * pop(frame, fps, worked)}
        gap={12}
      >
        <Line size={type.subtitle} weight={700}>
          Worked example: XeF₄
        </Line>
        <Line size={type.body} opacity={progress(frame, bonds, bonds + 15)}>
          4 bonds
        </Line>
        <Line size={type.body} color={colors.lonePairText} opacity={progress(frame, bonds + 10, bonds + 25)}>
          + 2 lone pairs
        </Line>
        <Line size={type.body} weight={700} color={colors.highlight} opacity={snOn}>
          = SN 6
        </Line>
      </Card>
      <Card
        cx={INFO.cx}
        cy={INFO.cy}
        width={INFO.width}
        opacity={fadeWindow(frame, trans + 20, trans + 35, planar - 15, planar)}
        gap={12}
      >
        <Line size={type.subtitle} weight={700} color={colors.lonePairText}>
          Lone pairs trans
        </Line>
        <Line size={type.body}>180° apart</Line>
        <Line size={type.body} color={colors.muted}>
          no 90° lone pair–lone pair repulsion
        </Line>
      </Card>
      {items.map((item) => (
        <InfoCard
          key={item.id}
          frame={frame}
          fps={fps}
          enter={item.infoAt}
          exit={item.exit}
          formula={item.formula}
          cls={CLASS_INFO[item.cls].label}
          shape={item.shape}
          angleAt={item.angleAt}
          angle={item.angle}
          ideal={item.ideal}
        />
      ))}
      {items.map((item) => (
        <ThumbLabel
          key={item.id}
          frame={frame}
          item={item}
          formula={item.formula}
          shape={item.shape}
        />
      ))}
    </AbsoluteFill>
  );
}
