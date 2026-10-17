import { AbsoluteFill, useVideoConfig } from "remotion";
import { fadeIn, pop, popped, progress } from "../components/anim";
import {
  ArrowLine,
  ATOMS,
  Molecule,
  polar,
  Stage,
  type Element,
  type MoleculeSpec,
} from "../components/Molecule";
import { useSceneFrame } from "../components/SceneFrame";
import { F, Text, Title } from "../components/Text";
import { cue } from "../cues";
import { colors, type } from "../theme";

const SCENE = "london-dispersion";
const ALL_AT = cue(SCENE, "between all molecules");
const TEMP_AT = cue(SCENE, "temporary dipoles");
const POLAR_AT = cue(SCENE, "more polarizable");
const RISE_AT = cue(SCENE, "boiling points rise");
const SHAPE_AT = cue(SCENE, "Shape matters");
const COMPACT_AT = cue(SCENE, "compact neopentane");
const HIGHER_AT = cue(SCENE, "boils higher");

const ROW_Y = 500;

function hydride(centre: Element): MoleculeSpec {
  const length = ATOMS[centre].r + ATOMS.H.r + 18;
  return {
    atoms: [
      { el: centre, x: 0, y: 0 },
      ...[45, 135, 225, 315].map((angle) => ({
        el: "H" as const,
        ...polar(angle, length),
      })),
    ],
    bonds: [
      [0, 1],
      [0, 2],
      [0, 3],
      [0, 4],
    ],
  };
}

const HYDRIDES = [
  { formula: "CH4", centre: "C", mass: "16 g/mol", x: 240, cloud: 96 },
  { formula: "SiH4", centre: "Si", mass: "32 g/mol", x: 450, cloud: 104 },
  { formula: "GeH4", centre: "Ge", mass: "77 g/mol", x: 665, cloud: 112 },
  { formula: "SnH4", centre: "Sn", mass: "123 g/mol", x: 890, cloud: 124 },
] as const;

const PENTANE_AT = { x: 1400, y: 470 };
const N_PENTANE: MoleculeSpec = {
  atoms: [-140, -70, 0, 70, 140].map((x, i) => ({
    el: "C" as const,
    x,
    y: i % 2 === 0 ? 22 : -22,
  })),
  bonds: [
    [0, 1],
    [1, 2],
    [2, 3],
    [3, 4],
  ],
};

const NEOPENTANE_AT = { x: 1400, y: 720 };
const NEOPENTANE: MoleculeSpec = {
  atoms: [
    { el: "C", x: 0, y: 0 },
    { el: "C", x: -58, y: -58 },
    { el: "C", x: 58, y: -58 },
    { el: "C", x: 58, y: 58 },
    { el: "C", x: -58, y: 58 },
  ],
  bonds: [
    [0, 1],
    [0, 2],
    [0, 3],
    [0, 4],
  ],
};

const cloudStyle = (opacity: number) => ({
  fill: colors.dispersion,
  fillOpacity: 0.25 * opacity,
  stroke: colors.dispersion,
  strokeWidth: 3,
  strokeOpacity: opacity,
});

export function DispersionScene() {
  const frame = useSceneFrame();
  const { fps } = useVideoConfig();
  const shift = -16 * progress(frame, TEMP_AT, TEMP_AT + 20);
  const delta = fadeIn(frame, TEMP_AT + 10);
  const appear = HYDRIDES.map((_, i) =>
    i === 0 ? fadeIn(frame, ALL_AT) : pop(frame, fps, POLAR_AT + i * 10),
  );
  const shape = fadeIn(frame, SHAPE_AT);
  const shapeClouds = fadeIn(frame, COMPACT_AT);
  return (
    <AbsoluteFill>
      <Title opacity={fadeIn(frame, 0)}>London Dispersion Forces</Title>
      <Text
        x={570}
        y={300}
        size={type.body}
        weight={700}
        anchor="middle"
        color={colors.muted}
        opacity={appear[0]}
      >
        Size
      </Text>
      <Text
        x={1400}
        y={300}
        size={type.body}
        weight={700}
        anchor="middle"
        color={colors.muted}
        opacity={shape}
      >
        Shape
      </Text>
      <Stage>
        {HYDRIDES.map(({ formula, centre, x, cloud }, i) => {
          const shown = appear[i] ?? 0;
          if (shown <= 0) return null;
          const dx = i === 0 ? shift : 0;
          return (
            <g key={formula}>
              <ellipse
                cx={x + dx}
                cy={ROW_Y}
                rx={cloud * shown}
                ry={cloud * shown}
                {...cloudStyle(Math.min(1, shown))}
              />
              <Molecule
                spec={hydride(centre)}
                at={{ x, y: ROW_Y }}
                opacity={Math.min(1, shown)}
                scale={Math.min(1, shown)}
              />
            </g>
          );
        })}
        <ArrowLine
          from={{ x: 160, y: 800 }}
          to={{ x: 980, y: 800 }}
          color={colors.dispersionText}
          progress={progress(frame, RISE_AT, RISE_AT + 30)}
        />
        <ellipse
          cx={PENTANE_AT.x}
          cy={PENTANE_AT.y}
          rx={200}
          ry={72}
          {...cloudStyle(shapeClouds)}
        />
        <circle
          cx={NEOPENTANE_AT.x}
          cy={NEOPENTANE_AT.y}
          r={112}
          {...cloudStyle(shapeClouds)}
        />
        <Molecule spec={N_PENTANE} at={PENTANE_AT} opacity={shape} />
        <Molecule spec={NEOPENTANE} at={NEOPENTANE_AT} opacity={shape} />
      </Stage>
      <Text
        x={240 - 96}
        y={400}
        size={type.label}
        weight={700}
        anchor="middle"
        color={colors.deltaMinusText}
        opacity={delta}
      >
        δ−
      </Text>
      <Text
        x={240 + 96}
        y={400}
        size={type.label}
        weight={700}
        anchor="middle"
        color={colors.deltaPlusText}
        opacity={delta}
      >
        δ+
      </Text>
      {HYDRIDES.map(({ formula, mass, x }, i) => {
        const shown = Math.min(1, appear[i] ?? 0);
        return (
          <div key={formula}>
            <Text
              x={x}
              y={660}
              size={type.body}
              weight={500}
              anchor="middle"
              opacity={shown}
            >
              <F>{formula}</F>
            </Text>
            <Text
              x={x}
              y={715}
              size={type.label}
              anchor="middle"
              color={colors.muted}
              opacity={shown}
            >
              {mass}
            </Text>
          </div>
        );
      })}
      <Text
        x={570}
        y={850}
        size={type.label}
        weight={500}
        anchor="middle"
        color={colors.dispersionText}
        opacity={fadeIn(frame, RISE_AT + 15)}
      >
        Boiling point increases
      </Text>
      <Text
        x={1400}
        y={365}
        size={type.label}
        weight={500}
        anchor="middle"
        opacity={shape}
      >
        n-pentane
      </Text>
      <Text
        x={1400}
        y={580}
        size={type.label}
        weight={500}
        anchor="middle"
        opacity={shape}
      >
        neopentane
      </Text>
      <Text
        x={1400}
        y={890}
        size={type.label}
        anchor="middle"
        color={colors.muted}
        opacity={shape}
      >
        Both <F>C5H12</F>
      </Text>
      <Text
        x={1630}
        y={PENTANE_AT.y}
        size={type.body}
        weight={700}
        color={colors.dispersionText}
        {...popped(frame, fps, HIGHER_AT)}
      >
        36 °C
      </Text>
      <Text
        x={1630}
        y={NEOPENTANE_AT.y}
        size={type.body}
        weight={700}
        color={colors.muted}
        {...popped(frame, fps, HIGHER_AT + 10)}
      >
        9.5 °C
      </Text>
    </AbsoluteFill>
  );
}
