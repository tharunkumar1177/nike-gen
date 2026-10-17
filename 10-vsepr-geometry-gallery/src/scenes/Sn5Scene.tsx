import { AbsoluteFill, useVideoConfig } from "remotion";
import { fadeWindow, pop, progress } from "../components/anim";
import { Chem } from "../components/Chem";
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

const S = "sn-5-family" as const;
const COUNT = 4;

export function Sn5Scene() {
  const frame = useSceneFrame();
  const { fps } = useVideoConfig();

  const axial = cue(S, "Lone pairs go in equatorial");
  const equatorial = cue(S, "where each meets only");
  const pcl5 = cue(S, "P C L five is");
  const worked = cue(S, "For a worked example");
  const sf4Has = cue(S, "S F four has");
  const sn5 = cue(S, "giving steric number five");
  const sf4 = cue(S, "The lone pair is equatorial");
  const seesaw = cue(S, "making an A X four E");
  const big = cue(S, "with angles squeezed");
  const small = cue(S, "and one hundred one point");
  const clf3 = cue(S, "C L F three is");
  const tShape = cue(S, "a T shape at");
  const xef2 = cue(S, "X E F two is");
  const linear = cue(S, "linear at one hundred eighty");
  const end = narrationEnd(S) + 30;
  const start = 40;

  const contrast = (t0: number, t1: number) =>
    fadeWindow(frame, t0, t0 + 15, t1 - 10, t1);
  const axialOn = contrast(axial, equatorial);
  const equatorialOn = contrast(equatorial, pcl5);

  const sf4Measured = domainsFor("AX4E", 1);
  const items: (GalleryItem & {
    formula: string;
    shape: string;
    infoAt: number;
    angleAt: number;
    angle: string;
  })[] = [
    {
      id: "PCl5",
      formula: "PCl₅",
      shape: "trigonal bipyramidal",
      cls: "AX5",
      central: "P",
      ligands: "Cl",
      enter: start,
      exit: worked,
      thumbIndex: 0,
      thumbCount: COUNT,
      infoAt: pcl5,
      angleAt: pcl5 + 20,
      angle: "90°, 120°",
      poses: [
        { at: axial - 20, pose: eulerPose(30, 20) },
        { at: equatorial - 20, pose: eulerPose(0, 90) },
        { at: pcl5, pose: "spin" },
      ],
      arcs: [
        { at: axial + 10, until: equatorial - 10, a: 0, b: 2, label: "90°" },
        { at: axial + 20, until: equatorial - 10, a: 0, b: 3 },
        { at: axial + 30, until: equatorial - 10, a: 0, b: 4 },
        { at: equatorial + 10, until: pcl5 - 10, a: 2, b: 0, label: "90°" },
        { at: equatorial + 20, until: pcl5 - 10, a: 2, b: 1, label: "90°" },
        { at: pcl5 + 20, a: 0, b: 2, label: "90°" },
        { at: pcl5 + 35, a: 2, b: 3, label: "120°" },
      ],
      extra: (f) => {
        if (f >= axial && f < equatorial) {
          return {
            highlight: [0, 2, 3, 4],
            highlightColor: colors.pitfall,
            highlightAmount: axialOn,
          };
        }
        if (f >= equatorial && f < pcl5) {
          return {
            highlight: [2, 0, 1],
            highlightColor: colors.highlight,
            highlightAmount: equatorialOn,
          };
        }
        return {};
      },
    },
    {
      id: "SF4",
      formula: "SF₄",
      shape: "seesaw",
      cls: "AX4E",
      central: "S",
      ligands: "F",
      enter: sf4,
      exit: clf3,
      thumbIndex: 1,
      thumbCount: COUNT,
      infoAt: seesaw,
      angleAt: big + 20,
      angle: "173.1°, 101.6°",
      squeezeAt: big,
      poses: [
        { at: seesaw, pose: eulerPose(0, 90) },
        {
          at: small - 20,
          pose: facePose(
            sf4Measured[3]?.dir ?? [1, 0, 0],
            sf4Measured[4]?.dir ?? [-1, 0, 0],
            [0, -1, 0],
          ),
        },
      ],
      arcs: [
        {
          at: big + 10,
          until: small - 20,
          a: 0,
          b: 1,
          via: [0, 0, -1],
          label: "173.1°",
          radius: 0.5,
        },
        { at: small + 10, a: 3, b: 4, label: "101.6°" },
      ],
    },
    {
      id: "ClF3",
      formula: "ClF₃",
      shape: "T-shaped",
      cls: "AX3E2",
      central: "Cl",
      ligands: "F",
      enter: clf3,
      exit: xef2,
      thumbIndex: 2,
      thumbCount: COUNT,
      infoAt: clf3 + 10,
      angleAt: tShape + 20,
      angle: "87.5°",
      squeezeAt: tShape,
      poses: [{ at: tShape - 20, pose: eulerPose(0, 90) }],
      arcs: [{ at: tShape + 10, a: 0, b: 2, label: "87.5°" }],
    },
    {
      id: "XeF2",
      formula: "XeF₂",
      shape: "linear",
      cls: "AX2E3",
      central: "Xe",
      ligands: "F",
      enter: xef2,
      exit: end,
      thumbIndex: 3,
      thumbCount: COUNT,
      infoAt: xef2 + 10,
      angleAt: linear + 20,
      angle: "180°",
      poses: [{ at: linear - 20, pose: eulerPose(12, 30) }],
      arcs: [
        {
          at: linear + 10,
          a: 0,
          b: 1,
          via: [1, 0, 0],
          label: "180°",
          radius: 0.5,
        },
      ],
    },
  ];

  const lewisOn = fadeWindow(frame, sf4Has, sf4Has + 20, sf4 - 15, sf4);
  const snOn = progress(frame, sn5, sn5 + 15);

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
        opacity={fadeWindow(frame, axial, axial + 15, pcl5 - 15, pcl5)}
        scale={0.9 + 0.1 * pop(frame, fps, axial)}
        align="flex-start"
        gap={24}
      >
        <Line size={type.subtitle} weight={700}>
          Where do lone pairs go?
        </Line>
        <Line
          size={type.body}
          weight={500}
          color={colors.pitfall}
          opacity={axialOn > 0 ? 1 : 0.35}
        >
          Axial: 3 domains at 90°
        </Line>
        <Line
          size={type.body}
          weight={500}
          color={colors.highlight}
          opacity={progress(frame, equatorial, equatorial + 15)}
        >
          Equatorial: 2 domains at 90°
        </Line>
      </Card>
      <Lewis2D
        name="SF4"
        cx={HERO.cx}
        cy={HERO.cy}
        bond={150}
        fontSize={64}
        opacity={lewisOn}
      />
      <Card
        cx={INFO.cx}
        cy={INFO.cy}
        width={INFO.width}
        opacity={lewisOn}
        scale={0.9 + 0.1 * pop(frame, fps, sf4Has)}
        gap={12}
      >
        <Line size={type.subtitle} weight={700}>
          <Chem>Worked example: SF₄</Chem>
        </Line>
        <Line size={type.body}>4 bonds</Line>
        <Line size={type.body} color={colors.lonePairText}>
          + 1 lone pair
        </Line>
        <Line
          size={type.body}
          weight={700}
          color={colors.highlight}
          opacity={snOn}
        >
          = SN 5
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
