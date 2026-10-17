import { AbsoluteFill, useVideoConfig } from "remotion";
import {
  baseFraction,
  EQUIVALENCE_ML,
  EQUIVALENCE_PH,
  HALF_ML,
  PKA,
  TITRATION,
  weakCurve,
} from "../acidbase";
import { dropped, easeInOut, fadeIn, lerp, popped, progress } from "../components/anim";
import { Chip } from "../components/Chip";
import { Pitfall } from "../components/Pitfall";
import { useSceneFrame } from "../components/SceneFrame";
import { EqArrow, F, Sub, Sup, Text } from "../components/Text";
import { TitrationGraph, xOf, yOf } from "../components/TitrationGraph";
import { cue } from "../cues";
import { colors, HEADING_Y, SAFE, type } from "../theme";

const DRAW_AT = cue("titration-curve", "Titrating this acid");
const HALF_AT = cue("titration-curve", "At half equivalence");
const EQ_AT = cue("titration-curve", "At equivalence");
const WATER_AT = cue("titration-curve", "reacts with water to make O H minus");
const STRONG_AT = cue("titration-curve", "not seven like a strong acid");

const DRAW_FRAMES = 60;
const GLIDE_FRAMES = 20;
const PANEL = { x: 1200, chipsY: [370, 470], spacing: 120, radius: 40 } as const;
const CHIPS = 10;

function Minus() {
  return <Sup>−</Sup>;
}

/** Volume of NaOH under the cursor at `frame`. */
function cursorMl(frame: number) {
  const drawn = TITRATION.maxMl * progress(frame, DRAW_AT, DRAW_AT + DRAW_FRAMES, (t) => t);
  if (frame < HALF_AT) return drawn;
  const toHalf = lerp(
    TITRATION.maxMl,
    HALF_ML,
    progress(frame, HALF_AT, HALF_AT + GLIDE_FRAMES, easeInOut),
  );
  if (frame < EQ_AT) return toHalf;
  return lerp(
    HALF_ML,
    EQUIVALENCE_ML,
    progress(frame, EQ_AT, EQ_AT + GLIDE_FRAMES, easeInOut),
  );
}

export function TitrationScene() {
  const frame = useSceneFrame();
  const { fps } = useVideoConfig();
  const graph = fadeIn(frame, DRAW_AT - 30);
  const reveal =
    TITRATION.maxMl * progress(frame, DRAW_AT, DRAW_AT + DRAW_FRAMES, (t) => t);
  const ml = cursorMl(frame);
  const converted = Math.round(CHIPS * baseFraction(ml));
  const strong = progress(frame, STRONG_AT, STRONG_AT + 45, (t) => t);
  const panel = fadeIn(frame, DRAW_AT);
  return (
    <AbsoluteFill>
      <Text
        x={SAFE}
        y={HEADING_Y}
        size={type.subtitle}
        weight={700}
        {...popped(frame, fps, 0)}
      >
        Worked Example: Titration Curve
      </Text>
      <Text
        x={SAFE}
        y={225}
        size={type.label}
        color={colors.muted}
        {...dropped(frame, 20)}
      >
        {TITRATION.acidMl.toFixed(2)} mL of {TITRATION.acidM.toFixed(3)} M
        acetic acid titrated with {TITRATION.baseM.toFixed(3)} M NaOH
      </Text>
      <TitrationGraph
        opacity={graph}
        reveal={reveal}
        strongReveal={TITRATION.maxMl * strong}
        cursor={{ ml, opacity: panel }}
        markers={[
          {
            ml: HALF_ML,
            pH: PKA,
            label: (
              <>
                {HALF_ML.toFixed(2)} mL: pH = pK<Sub>a</Sub> = {PKA.toFixed(2)}
              </>
            ),
            opacity: fadeIn(frame, HALF_AT + 10),
            dx: -120,
            dy: -60,
          },
          {
            ml: EQUIVALENCE_ML,
            pH: EQUIVALENCE_PH,
            label: (
              <>
                {EQUIVALENCE_ML.toFixed(2)} mL: pH = {EQUIVALENCE_PH.toFixed(2)}
              </>
            ),
            opacity: fadeIn(frame, EQ_AT + 10),
            dx: -330,
            dy: -40,
          },
        ]}
      />
      <Text
        x={xOf(2)}
        y={yOf(weakCurve(6)) + 70}
        size={28}
        weight={700}
        color={colors.hydroniumText}
        opacity={strong > 0 ? fadeIn(frame, STRONG_AT + 20) : 0}
      >
        strong acid (HCl)
      </Text>
      <Text
        x={PANEL.x}
        y={300}
        size={type.label}
        weight={500}
        color={colors.muted}
        opacity={panel}
      >
        In the flask: HA converted to A<Minus />
      </Text>
      {Array.from({ length: CHIPS }, (_, i) => {
        const isBase = i < converted;
        const row = Math.floor(i / 5);
        return (
          <Chip
            key={i}
            species={isBase ? "base" : "acid"}
            x={PANEL.x + PANEL.radius + 20 + (i % 5) * PANEL.spacing}
            y={PANEL.chipsY[row] ?? 0}
            radius={PANEL.radius}
            opacity={panel}
          >
            {isBase ? (
              <>
                A<Minus />
              </>
            ) : (
              "HA"
            )}
          </Chip>
        );
      })}
      <Text
        x={PANEL.x}
        y={590}
        size={type.body}
        weight={700}
        {...popped(frame, fps, WATER_AT)}
      >
        <span style={{ color: colors.baseText }}>
          A<Minus />
        </span>{" "}
        + <F>H2O</F>
        <EqArrow />
        <span style={{ color: colors.acidText }}>HA</span> +{" "}
        <span style={{ color: colors.hydroxide }}>
          OH<Minus />
        </span>
      </Text>
      <Pitfall
        top={670}
        left={PANEL.x}
        width={600}
        opacity={fadeIn(frame, STRONG_AT)}
      >
        for a weak acid, the equivalence point is not pH 7.
      </Pitfall>
    </AbsoluteFill>
  );
}
