import { AbsoluteFill, useVideoConfig } from "remotion";
import { dropped, fadeIn, popped } from "../components/anim";
import { Pitfall } from "../components/Pitfall";
import { useSceneFrame } from "../components/SceneFrame";
import { Approx, Sub, Sup, Text } from "../components/Text";
import { TitleBand } from "../components/TitleBand";
import { cue } from "../cues";
import { colors, type, VIDEO } from "../theme";

const SCENE = "free-energy";
const CELLS_AT = cue(SCENE, "small A A and a large D");
const INTENSIVE_AT = cue(SCENE, "E naught is intensive");
const RELATES_AT = cue(SCENE, "Standard free energy relates");
const EQUALS_AT = cue(SCENE, "It equals minus n F");
const MOLES_AT = cue(SCENE, "With two moles of electrons");
const KJ_AT = cue(SCENE, "minus two hundred and twelve");
const K_AT = cue(SCENE, "massive equilibrium constant");

const D_AT = CELLS_AT + 15;

const BASE_Y = 760;
const BATTERIES = [
  { name: "AA", left: 300, width: 80, height: 200, nub: 30, at: CELLS_AT },
  { name: "D", left: 480, width: 160, height: 260, nub: 50, at: D_AT },
];
const MATH_X = 800;
const STEP_X = 880;

function Batteries({ frame }: { frame: number }) {
  return (
    <svg
      width={VIDEO.width}
      height={VIDEO.height}
      style={{ position: "absolute", inset: 0 }}
    >
      {BATTERIES.map(({ name, left, width, height, nub, at }) => {
        const top = BASE_Y - height;
        return (
          <g key={name} opacity={fadeIn(frame, at)}>
            <rect
              x={left + (width - nub) / 2}
              y={top - 14}
              width={nub}
              height={18}
              rx={4}
              fill={colors.silverStroke}
            />
            <rect
              x={left}
              y={top}
              width={width}
              height={height}
              rx={12}
              fill={colors.panel}
              stroke={colors.text}
              strokeWidth={3}
            />
            <rect
              x={left + 3}
              y={top + 3}
              width={width - 6}
              height={height * 0.3}
              rx={9}
              fill={colors.copper}
            />
          </g>
        );
      })}
    </svg>
  );
}

export function FreeEnergyScene() {
  const frame = useSceneFrame();
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill>
      <TitleBand>Free Energy</TitleBand>
      <Batteries frame={frame} />
      {BATTERIES.map(({ name, left, width, at }) => (
        <Text
          key={name}
          x={left + width / 2}
          y={810}
          size={type.body}
          weight={700}
          anchor="middle"
          opacity={fadeIn(frame, at)}
        >
          {name} 1.5 V
        </Text>
      ))}
      <Text
        x={470}
        y={870}
        size={type.label}
        color={colors.muted}
        anchor="middle"
        opacity={fadeIn(frame, INTENSIVE_AT + 20)}
      >
        More reactant, not a stronger push
      </Text>
      <Pitfall
        left={MATH_X}
        top={264}
        width={900}
        {...dropped(frame, INTENSIVE_AT)}
      >
        E° is intensive; multiplying a half-reaction does not multiply E°.
      </Pitfall>
      <Text
        x={MATH_X}
        y={445}
        size={type.label}
        color={colors.muted}
        opacity={fadeIn(frame, RELATES_AT)}
      >
        Voltage linked to chemical energy, per mole of reaction
      </Text>
      <Text
        x={MATH_X}
        y={505}
        size={type.hero}
        weight={700}
        {...dropped(frame, EQUALS_AT)}
      >
        ΔG° = −nFE°<Sub>cell</Sub>
      </Text>
      <Text x={STEP_X} y={575} size={type.hero} {...dropped(frame, MOLES_AT)}>
        = −(2)(96 485 C/mol)(1.10 V)
      </Text>
      <Text
        x={STEP_X}
        y={645}
        size={type.hero}
        weight={700}
        color={colors.electronText}
        {...popped(frame, fps, KJ_AT)}
      >
        = −212 267 J/mol
        <Approx />
        −212 kJ/mol
      </Text>
      <Text
        x={MATH_X}
        y={735}
        size={type.heading}
        weight={700}
        color={colors.cationText}
        {...popped(frame, fps, K_AT)}
      >
        K<Approx />
        1.4 × 10<Sup>37</Sup>
      </Text>
      <Text
        x={MATH_X}
        y={805}
        size={type.label}
        color={colors.muted}
        opacity={fadeIn(frame, K_AT + 20)}
      >
        log K = (2 × 1.10) / 0.0592 = 37.16: products strongly favored
      </Text>
    </AbsoluteFill>
  );
}
