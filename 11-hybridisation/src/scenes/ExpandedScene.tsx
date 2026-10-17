import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, pop, progress } from "../components/anim";
import { SvgLabel } from "../components/Boxes";
import { AngleArc, Atom, Bond, Dash, Wedge } from "../components/Molecule";
import { Box, Stage, Title } from "../components/Panels";
import { Sub } from "../components/Script";
import { Text } from "../components/Text";
import { cue } from "../cues";
import { colors, type } from "../theme";

const SCENE = "expanded-octet";

const BEATS = {
  pcl5: cue(SCENE, "Five domains"),
  tbpAngles: cue(SCENE, "trigonal bipyramidal shape"),
  sp3d: cue(SCENE, "labelled S P three D,"),
  pcl5Name: cue(SCENE, "like in phosphorus pentachloride"),
  sf6: cue(SCENE, "Six domains"),
  ohAngle: cue(SCENE, "octahedral"),
  sp3d2: cue(SCENE, "labelled S P three D two"),
  sf6Name: cue(SCENE, "as in sulfur hexafluoride"),
  caution: cue(SCENE, "textbooks often mix in D orbitals"),
  cautionText: cue(SCENE, "actually contribute very little"),
};

type Point = { x: number; y: number };
type Ligand = Point & { kind: "line" | "wedge" | "dash" };

const P = { x: 540, y: 500 };
const PCL5: Ligand[] = [
  { x: 440, y: 440, kind: "dash" },
  { x: 540, y: 300, kind: "line" },
  { x: 540, y: 700, kind: "line" },
  { x: 740, y: 500, kind: "line" },
  { x: 440, y: 560, kind: "wedge" },
];
const S = { x: 1380, y: 500 };
const SF6: Ligand[] = [
  { x: 1520, y: 440, kind: "dash" },
  { x: 1240, y: 440, kind: "dash" },
  { x: 1380, y: 300, kind: "line" },
  { x: 1380, y: 700, kind: "line" },
  { x: 1520, y: 560, kind: "wedge" },
  { x: 1240, y: 560, kind: "wedge" },
];

const degrees = (from: Point, to: Point) =>
  (Math.atan2(to.y - from.y, to.x - from.x) * 180) / Math.PI;

const scaleAbout = (x: number, y: number, s: number) =>
  `translate(${x} ${y}) scale(${s}) translate(${-x} ${-y})`;

function Molecule({
  centre,
  symbol,
  ligand,
  ligands,
  grow,
}: {
  centre: Point;
  symbol: string;
  ligand: string;
  ligands: Ligand[];
  grow: number;
}) {
  if (grow <= 0) return null;
  return (
    <g
      opacity={Math.min(1, grow)}
      transform={scaleAbout(centre.x, centre.y, grow)}
    >
      {ligands.map((l, i) => {
        if (l.kind === "wedge") return <Wedge key={i} a={centre} b={l} />;
        if (l.kind === "dash") return <Dash key={i} a={centre} b={l} />;
        return <Bond key={i} a={centre} b={l} />;
      })}
      {ligands
        .filter((l) => l.kind === "dash")
        .map((l, i) => (
          <Atom key={`back-${i}`} {...l} size={40}>
            {ligand}
          </Atom>
        ))}
      <Atom {...centre}>{symbol}</Atom>
      {ligands
        .filter((l) => l.kind !== "dash")
        .map((l, i) => (
          <Atom key={`front-${i}`} {...l} size={40}>
            {ligand}
          </Atom>
        ))}
    </g>
  );
}

export function ExpandedScene() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const title = progress(frame, 0, 30);
  const pcl5 = pop(frame, fps, BEATS.pcl5);
  const tbp = progress(frame, BEATS.tbpAngles, BEATS.tbpAngles + 15);
  const sf6 = pop(frame, fps, BEATS.sf6);
  const oh = progress(frame, BEATS.ohAngle, BEATS.ohAngle + 15);
  const caution = fadeIn(frame, BEATS.caution);
  const cautionText = fadeIn(frame, BEATS.cautionText);

  return (
    <AbsoluteFill>
      <Title opacity={title}>Five and Six Domains</Title>
      <Stage>
        <Molecule
          centre={P}
          symbol="P"
          ligand="Cl"
          ligands={PCL5}
          grow={pcl5}
        />
        <AngleArc
          at={P}
          from={-90}
          to={0}
          radius={70}
          label="90°"
          labelRadius={115}
          progress={tbp}
        />
        <AngleArc
          at={P}
          from={degrees(P, PCL5[4]!)}
          to={360 + degrees(P, PCL5[0]!)}
          radius={52}
          label="120°"
          labelRadius={98}
          progress={tbp}
        />
        <Molecule centre={S} symbol="S" ligand="F" ligands={SF6} grow={sf6} />
        <AngleArc
          at={S}
          from={degrees(S, SF6[4]!)}
          to={90}
          radius={70}
          label="90°"
          labelRadius={115}
          progress={oh}
        />
        <SvgLabel
          x={P.x}
          y={790}
          size={type.body}
          weight={700}
          color={colors.hybridText}
          opacity={fadeIn(frame, BEATS.sp3d)}
        >
          sp³d
        </SvgLabel>
        <SvgLabel
          x={S.x}
          y={790}
          size={type.body}
          weight={700}
          color={colors.hybridText}
          opacity={fadeIn(frame, BEATS.sp3d2)}
        >
          sp³d²
        </SvgLabel>
      </Stage>
      <Text
        x={P.x}
        y={842}
        size={type.label}
        weight={500}
        opacity={fadeIn(frame, BEATS.pcl5Name)}
      >
        PCl<Sub>5</Sub> · trigonal bipyramidal
      </Text>
      <Text
        x={S.x}
        y={842}
        size={type.label}
        weight={500}
        opacity={fadeIn(frame, BEATS.sf6Name)}
      >
        SF<Sub>6</Sub> · octahedral
      </Text>
      <Box
        x={360}
        y={880}
        width={1200}
        height={80}
        border={colors.cautionText}
        background="rgba(208, 135, 112, 0.2)"
        opacity={caution}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span
          style={{
            fontSize: type.label,
            fontWeight: 500,
            color: colors.cautionText,
            opacity: cautionText,
          }}
        >
          Note: d orbitals contribute very little in reality.
        </span>
      </Box>
    </AbsoluteFill>
  );
}
