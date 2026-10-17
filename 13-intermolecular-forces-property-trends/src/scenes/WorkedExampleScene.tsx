import type { ReactNode } from "react";
import { AbsoluteFill, useVideoConfig } from "remotion";
import { fadeIn, popped } from "../components/anim";
import { Molecule, Stage, type MoleculeSpec } from "../components/Molecule";
import { useSceneFrame } from "../components/SceneFrame";
import { Badge, F, Text, Title } from "../components/Text";
import { cue } from "../cues";
import { colors, FONT, type } from "../theme";

const SCENE = "worked-example";
const RANK_AT = cue(SCENE, "rank the boiling points");
const SIMILAR_AT = cue(SCENE, "sizes and masses are similar");
const DISPERSION_AT = cue(SCENE, "has only dispersion");
const DIPOLE_AT = cue(SCENE, "adds dipole dipole");
const HBOND_AT = cue(SCENE, "adds hydrogen bonding");
const RANKING_AT = cue(SCENE, "seventy eight");

const STRUCTURE_Y = 370;
const BADGE_Y = [610, 680, 750] as const;
const BP_Y = 860;

const chain = (
  atoms: MoleculeSpec["atoms"],
  bonds: MoleculeSpec["bonds"],
): MoleculeSpec => ({ atoms, bonds });

const COMPOUNDS = [
  {
    name: "Propane",
    formula: "CH3CH2CH3",
    mass: "44 g/mol",
    x: 400,
    spec: chain(
      [
        { el: "C", x: -70, y: 20 },
        { el: "C", x: 0, y: -20 },
        { el: "C", x: 70, y: 20 },
      ],
      [
        [0, 1],
        [1, 2],
      ],
    ),
    forces: 1,
    bp: "−42 °C",
    bpAt: cue(SCENE, "minus forty two"),
  },
  {
    name: "Dimethyl ether",
    formula: "CH3OCH3",
    mass: "46 g/mol",
    x: 960,
    spec: chain(
      [
        { el: "C", x: -75, y: 25 },
        { el: "O", x: 0, y: -25 },
        { el: "C", x: 75, y: 25 },
      ],
      [
        [0, 1],
        [1, 2],
      ],
    ),
    forces: 2,
    bp: "−25 °C",
    bpAt: cue(SCENE, "minus twenty five"),
  },
  {
    name: "Ethanol",
    formula: "CH3CH2OH",
    mass: "46 g/mol",
    x: 1520,
    spec: chain(
      [
        { el: "C", x: -105, y: 20 },
        { el: "C", x: -35, y: -20 },
        { el: "O", x: 35, y: 20 },
        { el: "H", x: 105, y: -20 },
      ],
      [
        [0, 1],
        [1, 2],
        [2, 3],
      ],
    ),
    forces: 3,
    bp: "78 °C",
    bpAt: RANKING_AT,
  },
] as const;

const FORCES = [
  {
    label: "Dispersion",
    color: colors.dispersion,
    text: colors.dispersionText,
    at: DISPERSION_AT,
  },
  {
    label: "Dipole-dipole",
    color: colors.dipole,
    text: colors.dipoleText,
    at: DIPOLE_AT,
  },
  {
    label: "Hydrogen bond",
    color: colors.hbond,
    text: colors.hbondText,
    at: HBOND_AT,
  },
] as const;

function Centred({
  x,
  y,
  opacity,
  scale = 1,
  children,
}: {
  x: number;
  y: number;
  opacity: number;
  scale?: number;
  children: ReactNode;
}) {
  if (opacity <= 0) return null;
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        transform: `translate(-50%, -50%) scale(${scale})`,
        whiteSpace: "nowrap",
        fontFamily: FONT,
        opacity,
      }}
    >
      {children}
    </div>
  );
}

export function WorkedExampleScene() {
  const frame = useSceneFrame();
  const { fps } = useVideoConfig();
  const ring = fadeIn(frame, HBOND_AT + 10);
  return (
    <AbsoluteFill>
      <Title opacity={fadeIn(frame, 0)}>Worked Example</Title>
      <Stage>
        {COMPOUNDS.map(({ name, x, spec }, i) => (
          <Molecule
            key={name}
            spec={spec}
            at={{ x, y: STRUCTURE_Y }}
            opacity={fadeIn(frame, RANK_AT + i * 8)}
          />
        ))}
        {ring > 0 && (
          <ellipse
            cx={1520 + 70}
            cy={STRUCTURE_Y}
            rx={72}
            ry={48}
            fill="none"
            stroke={colors.hbondText}
            strokeWidth={4}
            opacity={ring}
          />
        )}
      </Stage>
      {COMPOUNDS.map(({ name, formula, mass, x, forces, bp, bpAt }, i) => (
        <div key={name}>
          <Text
            x={x}
            y={470}
            size={type.body}
            weight={500}
            anchor="middle"
            opacity={fadeIn(frame, RANK_AT + i * 8)}
          >
            {name}
          </Text>
          <Text
            x={x}
            y={525}
            size={type.label}
            anchor="middle"
            color={colors.muted}
            opacity={fadeIn(frame, SIMILAR_AT + i * 8)}
          >
            <F>{formula}</F> · {mass}
          </Text>
          {FORCES.slice(0, forces).map(({ label, color, text, at }, j) => {
            const shown = popped(frame, fps, at + i * 8);
            return (
              <Centred
                key={label}
                x={x}
                y={BADGE_Y[j] ?? 0}
                opacity={shown.opacity}
                scale={shown.scale}
              >
                <Badge color={color} textColor={text} size={type.label}>
                  {label}
                </Badge>
              </Centred>
            );
          })}
          <Text
            x={x}
            y={BP_Y}
            size={type.subtitle}
            weight={700}
            anchor="middle"
            color={i === 2 ? colors.hbondText : colors.text}
            {...popped(frame, fps, bpAt)}
          >
            {bp}
          </Text>
        </div>
      ))}
      {[680, 1240].map((x) => (
        <Text
          key={x}
          x={x}
          y={BP_Y}
          size={type.subtitle}
          weight={700}
          anchor="middle"
          color={colors.muted}
          opacity={fadeIn(frame, RANKING_AT + 15)}
        >
          {"<"}
        </Text>
      ))}
    </AbsoluteFill>
  );
}
