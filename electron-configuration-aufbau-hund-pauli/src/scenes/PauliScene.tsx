import { AbsoluteFill, useVideoConfig } from "remotion";
import { dropIn, fadeIn, pop } from "../components/anim";
import { down, OrbitalBox, up } from "../components/Orbital";
import { useSceneFrame } from "../components/SceneFrame";
import { Text } from "../components/Text";
import { cue } from "../cues";
import { colors, type } from "../theme";

const SCENE = "orbitals-pauli";

const SUBSHELLS = [
  {
    label: "s: 2",
    boxes: 1,
    fill: colors.s,
    stroke: colors.sText,
    top: 340,
    at: cue(SCENE, "an s subshell"),
  },
  {
    label: "p: 6",
    boxes: 3,
    fill: colors.p,
    stroke: colors.pText,
    top: 500,
    at: cue(SCENE, "p holds six"),
  },
  {
    label: "d: 10",
    boxes: 5,
    fill: colors.d,
    stroke: colors.dText,
    top: 660,
    at: cue(SCENE, "d holds ten"),
  },
] as const;

const PAULI_SIZE = 150;
const VALID = { x: 1000, y: 380, at: cue(SCENE, "pauli exclusion") };
const VALID_UP = cue(SCENE, "two electrons");
const VALID_DOWN = cue(SCENE, "opposite spins");
const FORBIDDEN = { x: 1350, y: 380, at: cue(SCENE, "two up spins") };
const FORBIDDEN_LABEL = cue(SCENE, "forbidden");
const SPIN_TAG = cue(SCENE, "spin");

export function PauliScene() {
  const frame = useSceneFrame();
  const { fps } = useVideoConfig();
  const title = fadeIn(frame, 15);
  const subtitle = fadeIn(frame, 20);
  return (
    <AbsoluteFill>
      <Text
        x={120}
        y={180 + (1 - title) * 20}
        size={type.title}
        weight={700}
        anchor="start"
        opacity={title}
      >
        Electron Configuration
      </Text>
      <Text
        x={120}
        y={270 + (1 - subtitle) * 20}
        size={type.subtitle}
        anchor="start"
        opacity={subtitle}
      >
        Aufbau, Hund &amp; Pauli
      </Text>

      {SUBSHELLS.map(({ label, boxes, fill, stroke, top, at }) => (
        <div key={label}>
          <Text
            x={120}
            y={top + 60}
            size={type.label}
            weight={500}
            color={stroke}
            anchor="start"
            opacity={fadeIn(frame, at)}
          >
            {label}
          </Text>
          {Array.from({ length: boxes }, (_, i) => (
            <OrbitalBox
              key={i}
              x={220 + i * 120}
              y={top}
              fill={fill}
              stroke={stroke}
              scale={pop(frame, fps, at + i * 5)}
            />
          ))}
        </div>
      ))}

      <Text
        x={1250}
        y={700}
        size={type.label}
        opacity={fadeIn(frame, SPIN_TAG)}
      >
        Spin: quantum property, not literal rotation
      </Text>

      <OrbitalBox
        x={VALID.x}
        y={VALID.y}
        size={PAULI_SIZE}
        stroke={colors.axis}
        scale={pop(frame, fps, VALID.at)}
        spins={[up(dropIn(frame, VALID_UP)), down(dropIn(frame, VALID_DOWN))]}
      />
      <OrbitalBox
        x={FORBIDDEN.x}
        y={FORBIDDEN.y}
        size={PAULI_SIZE}
        stroke={colors.axis}
        scale={pop(frame, fps, FORBIDDEN.at)}
        spins={[
          up(dropIn(frame, FORBIDDEN.at + 15)),
          up(dropIn(frame, FORBIDDEN.at + 30)),
        ]}
      />
      <Text
        x={FORBIDDEN.x + PAULI_SIZE / 2}
        y={580}
        size={type.body}
        weight={700}
        color={colors.forbidden}
        scale={pop(frame, fps, FORBIDDEN_LABEL)}
      >
        Forbidden
      </Text>
    </AbsoluteFill>
  );
}
