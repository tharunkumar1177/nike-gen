import { AbsoluteFill, useVideoConfig } from "remotion";
import {
  EQUIVALENCE_ML,
  EQUIVALENCE_PH,
  METHYL_RED,
  PHENOLPHTHALEIN,
  TITRATION,
} from "../acidbase";
import { dropped, fadeIn, popped } from "../components/anim";
import { useSceneFrame } from "../components/SceneFrame";
import { Text } from "../components/Text";
import { TitrationGraph, PLOT, yOf } from "../components/TitrationGraph";
import { cue } from "../cues";
import { colors, HEADING_Y, SAFE, type } from "../theme";

const JUMP_AT = cue("indicators", "changes color during the steep jump");
const PHENOL_AT = cue("indicators", "Phenolphthalein changes");
const RED_AT = cue("indicators", "Methyl red would change");

const LABEL_X = PLOT.x + PLOT.width + 40;

type Range = { from: number; to: number };

const range = ({ from, to }: Range) =>
  `pH ${from.toFixed(1)} to ${to.toFixed(1)}`;

function BandLabel({
  band,
  name,
  verdict,
  color,
  reveal,
}: {
  band: Range;
  name: string;
  verdict: string;
  color: string;
  reveal: { opacity: number; dy: number };
}) {
  const y = yOf((band.from + band.to) / 2);
  return (
    <>
      <Text
        x={LABEL_X}
        y={y - 40}
        size={type.label}
        weight={700}
        color={color}
        {...reveal}
      >
        {name}
      </Text>
      <Text x={LABEL_X} y={y} size={28} color={colors.muted} {...reveal}>
        {range(band)}
      </Text>
      <Text
        x={LABEL_X}
        y={y + 38}
        size={28}
        weight={500}
        color={color}
        {...reveal}
      >
        {verdict}
      </Text>
    </>
  );
}

export function IndicatorScene() {
  const frame = useSceneFrame();
  const { fps } = useVideoConfig();
  const phenol = fadeIn(frame, PHENOL_AT);
  const red = fadeIn(frame, RED_AT);
  return (
    <AbsoluteFill>
      <Text
        x={SAFE}
        y={HEADING_Y}
        size={type.subtitle}
        weight={700}
        {...popped(frame, fps, 0)}
      >
        Choosing an Indicator
      </Text>
      <TitrationGraph
        opacity={1}
        reveal={TITRATION.maxMl}
        highlight={{
          fromMl: 24,
          toMl: 26,
          fromPh: 4,
          toPh: 11,
          opacity: fadeIn(frame, JUMP_AT),
        }}
        bands={[
          { ...PHENOLPHTHALEIN, fill: colors.phenolphthalein, opacity: phenol },
          { ...METHYL_RED, fill: colors.methylRed, opacity: red },
        ]}
        markers={[
          {
            ml: EQUIVALENCE_ML,
            pH: EQUIVALENCE_PH,
            label: `equivalence, pH ${EQUIVALENCE_PH.toFixed(2)}`,
            opacity: 1,
            dx: -380,
            dy: -40,
          },
        ]}
      />
      <BandLabel
        band={PHENOLPHTHALEIN}
        name="Phenolphthalein"
        verdict="spans the jump"
        color={colors.phenolphthaleinText}
        reveal={dropped(frame, PHENOL_AT)}
      />
      <BandLabel
        band={METHYL_RED}
        name="Methyl red"
        verdict="changes too early"
        color={colors.methylRedText}
        reveal={dropped(frame, RED_AT)}
      />
    </AbsoluteFill>
  );
}
