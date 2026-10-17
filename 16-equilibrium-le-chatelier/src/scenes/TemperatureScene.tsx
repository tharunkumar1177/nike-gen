import { AbsoluteFill, interpolateColors, useVideoConfig } from "remotion";
import {
  dropped,
  easeInOut,
  fadeIn,
  popped,
  progress,
} from "../components/anim";
import { Pitfall } from "../components/Pitfall";
import { Reaction } from "../components/Reaction";
import { useSceneFrame } from "../components/SceneFrame";
import { Arrow, F, Text } from "../components/Text";
import { cue } from "../cues";
import { colors, HEADING_Y, SAFE, type } from "../theme";

const ONLY_AT = cue("temperature-catalyst", "only factor that changes K");
const ENDO_AT = cue("temperature-catalyst", "This reaction is endothermic");
const HEAT_AT = cue("temperature-catalyst", "Adding heat shifts it right");
const CATALYST_AT = cue("temperature-catalyst", "A catalyst only speeds");
const FASTER_AT = cue("temperature-catalyst", "reaches equilibrium faster");
const NO_SHIFT_AT = cue("temperature-catalyst", "without shifting the balance");

const FLASK = { x: 400, neckTop: 560, shoulder: 660, bottom: 870 } as const;
const GAS = ["#EBD3C4", "#A0522D"] as const;
const COLUMN_X = 1100;

function Flask({ tint, heat }: { tint: number; heat: number }) {
  const { x, neckTop, shoulder, bottom } = FLASK;
  const outline = [
    `M${x - 40} ${neckTop}`,
    `V${shoulder}`,
    `L${x - 170} ${bottom - 30}`,
    `Q${x - 180} ${bottom} ${x - 140} ${bottom}`,
    `H${x + 140}`,
    `Q${x + 180} ${bottom} ${x + 170} ${bottom - 30}`,
    `L${x + 40} ${shoulder}`,
    `V${neckTop}`,
  ].join(" ");
  return (
    <svg width="100%" height="100%" style={{ position: "absolute" }}>
      <path
        d={`${outline} Z`}
        fill={interpolateColors(tint, [0, 1], [...GAS])}
        stroke="none"
      />
      <path
        d={outline}
        fill="none"
        stroke={colors.muted}
        strokeWidth={6}
        strokeLinejoin="round"
      />
      <rect
        x={x - 56}
        y={neckTop - 24}
        width={112}
        height={28}
        rx={8}
        fill={colors.muted}
      />
      <g
        stroke={colors.heat}
        strokeWidth={8}
        strokeLinecap="round"
        fill="none"
        opacity={heat}
      >
        {[-90, 0, 90].map((dx) => (
          <path
            key={dx}
            d={`M${x + dx} ${bottom + 70} q-14 -14 0 -28 q14 -14 0 -28`}
          />
        ))}
      </g>
    </svg>
  );
}

export function TemperatureScene() {
  const frame = useSceneFrame();
  const { fps } = useVideoConfig();
  const tint = progress(frame, HEAT_AT, HEAT_AT + 75, easeInOut);
  const pitfall = popped(frame, fps, NO_SHIFT_AT);
  return (
    <AbsoluteFill>
      <Text
        x={SAFE}
        y={HEADING_Y}
        size={type.subtitle}
        weight={700}
        {...popped(frame, fps, 0)}
      >
        Temperature and Catalysts
      </Text>
      <Text
        x={SAFE}
        y={250}
        size={type.body}
        weight={700}
        color={colors.kqText}
        {...popped(frame, fps, ONLY_AT)}
      >
        Only temperature changes the value of K
      </Text>
      <Reaction
        y={370}
        size={type.subtitle}
        heat={1}
        directional
        {...popped(frame, fps, ENDO_AT)}
      />
      <Text
        x={960}
        y={460}
        size={type.label}
        weight={500}
        color={colors.heatText}
        anchor="middle"
        {...dropped(frame, ENDO_AT + 15)}
      >
        ΔH° = +57.2 kJ/mol (endothermic): heat acts as a reactant
      </Text>
      <AbsoluteFill style={{ opacity: fadeIn(frame, ENDO_AT + 20) }}>
        <Flask tint={tint} heat={fadeIn(frame, HEAT_AT)} />
      </AbsoluteFill>
      <Text
        x={620}
        y={700}
        size={type.body}
        weight={700}
        color={colors.forwardText}
        {...popped(frame, fps, HEAT_AT)}
      >
        Add heat
        <Arrow />
        shifts right
      </Text>
      <Text
        x={620}
        y={770}
        size={type.label}
        color={colors.no2Text}
        {...dropped(frame, HEAT_AT + 30)}
      >
        More brown <F>NO2</F>
      </Text>
      <Text
        x={COLUMN_X}
        y={600}
        size={type.body}
        weight={700}
        {...popped(frame, fps, CATALYST_AT)}
      >
        Catalyst
      </Text>
      <Text
        x={COLUMN_X}
        y={660}
        size={type.label}
        color={colors.muted}
        {...dropped(frame, CATALYST_AT + 10)}
      >
        Speeds up both directions equally
      </Text>
      <Text
        x={COLUMN_X}
        y={710}
        size={type.label}
        color={colors.muted}
        {...dropped(frame, FASTER_AT)}
      >
        Reaches equilibrium faster
      </Text>
      <Pitfall
        top={770}
        left={COLUMN_X}
        width={700}
        opacity={pitfall.opacity}
        scale={pitfall.scale}
      >
        A catalyst does not shift the equilibrium.
      </Pitfall>
    </AbsoluteFill>
  );
}
