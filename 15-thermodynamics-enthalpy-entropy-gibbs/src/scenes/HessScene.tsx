import { AbsoluteFill, useVideoConfig } from "remotion";
import { dropped, fadeIn, popped, progress } from "../components/anim";
import { DrawnArrow } from "../components/DrawnArrow";
import { useSceneFrame } from "../components/SceneFrame";
import { F, Text } from "../components/Text";
import { cue } from "../cues";
import { colors, SAFE, type, VIDEO } from "../theme";

const TITLE_AT = cue("hess-law", "enthalpy is a state function");
const LEVELS_AT = cue("hess-law", "depends on the current state");
const DIRECT_AT = cue("hess-law", "not the specific path taken");
const STEP1_AT = cue("hess-law", "sum of multiple steps");
const STEP2_AT = cue("hess-law", "sum of those individual steps");
const SUM_AT = cue("hess-law", "total enthalpy change is simply the sum");

const START = { x1: 460, x2: 760, y: 350 } as const;
const MIDDLE = { x1: 1000, x2: 1500, y: 500 } as const;
const END = { x1: 460, x2: 1500, y: 850 } as const;
const DIRECT_X = 610;
const STEP2_X = 1250;

function Level({
  x1,
  x2,
  y,
  opacity,
}: {
  x1: number;
  x2: number;
  y: number;
  opacity: number;
}) {
  if (opacity <= 0) return null;
  return (
    <svg
      width={VIDEO.width}
      height={VIDEO.height}
      style={{ position: "absolute", left: 0, top: 0, opacity }}
    >
      <line
        x1={x1}
        y1={y}
        x2={x2}
        y2={y}
        stroke={colors.text}
        strokeWidth={6}
        strokeLinecap="round"
      />
    </svg>
  );
}

export function HessScene() {
  const frame = useSceneFrame();
  const { fps } = useVideoConfig();
  const levels = fadeIn(frame, LEVELS_AT);
  const middle = fadeIn(frame, STEP1_AT);
  const step1 = progress(frame, STEP1_AT + 10, STEP1_AT + 40);
  const step2 = progress(frame, STEP2_AT, STEP2_AT + 30);
  return (
    <AbsoluteFill>
      <Text
        x={SAFE}
        y={180}
        size={type.title}
        weight={700}
        {...dropped(frame, TITLE_AT)}
      >
        Hess&apos;s Law
      </Text>
      <Level {...START} opacity={levels} />
      <Text
        x={DIRECT_X}
        y={START.y - 40}
        size={type.body}
        anchor="middle"
        opacity={levels}
      >
        C(s) + <F>O2</F>(g)
      </Text>
      <Level {...END} opacity={levels} />
      <Text
        x={DIRECT_X}
        y={END.y + 45}
        size={type.body}
        anchor="middle"
        opacity={levels}
      >
        <F>CO2</F>(g)
      </Text>
      <DrawnArrow
        from={[DIRECT_X, START.y + 20]}
        to={[DIRECT_X, END.y - 20]}
        progress={progress(frame, DIRECT_AT, DIRECT_AT + 30)}
        color={colors.enthalpyText}
      />
      <Text
        x={DIRECT_X - 30}
        y={600}
        size={type.body}
        weight={700}
        color={colors.enthalpyText}
        anchor="end"
        opacity={fadeIn(frame, DIRECT_AT + 20)}
      >
        ΔH° = −393.51 kJ
      </Text>
      <Level {...MIDDLE} opacity={middle} />
      <Text
        x={STEP2_X}
        y={MIDDLE.y - 40}
        size={type.body}
        anchor="middle"
        opacity={middle}
      >
        CO(g) + ½ <F>O2</F>(g)
      </Text>
      <DrawnArrow
        from={[START.x2 + 20, START.y + 10]}
        to={[MIDDLE.x1 - 10, MIDDLE.y - 10]}
        progress={step1}
        color={colors.text}
      />
      <Text
        x={900}
        y={360}
        size={type.body}
        opacity={fadeIn(frame, STEP1_AT + 30)}
      >
        ΔH° = −110.52 kJ
      </Text>
      <DrawnArrow
        from={[STEP2_X, MIDDLE.y + 20]}
        to={[STEP2_X, END.y - 20]}
        progress={step2}
        color={colors.text}
      />
      <Text
        x={STEP2_X + 30}
        y={680}
        size={type.body}
        opacity={fadeIn(frame, STEP2_AT + 20)}
      >
        ΔH° = −282.99 kJ
      </Text>
      <Text
        x={960}
        y={985}
        size={type.subtitle}
        weight={700}
        color={colors.enthalpyText}
        anchor="middle"
        {...popped(frame, fps, SUM_AT)}
      >
        −110.52 + (−282.99) = −393.51 kJ
      </Text>
    </AbsoluteFill>
  );
}
