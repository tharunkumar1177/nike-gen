import { AbsoluteFill } from "remotion";
import { easeInOut, easeOut, fadeIn, lerp, progress } from "../components/anim";
import { FULL_LEGEND, Legend } from "../components/Legend";
import { baseline, PeriodicTable } from "../components/PeriodicTable";
import { useSceneFrame } from "../components/SceneFrame";
import { Text } from "../components/Text";
import { cue } from "../cues";
import { colors, SCENES, type } from "../theme";

const SCENE = "special-cases";
const LENGTH = SCENES[SCENE].to - SCENES[SCENE].from;
const DIM = cue(SCENE, "Let's look at two special cases");
const HYDROGEN = cue(SCENE, "Hydrogen is one s one");
const NONMETAL = cue(SCENE, "It sits in group one");
const HELIUM = cue(SCENE, "Helium is one s two");
const S_BLOCK = cue(SCENE, "making it an s block element");
const GROUP_18 = cue(SCENE, "However, it sits in group eighteen");
const RESTORE = LENGTH - 30;

const SPECIAL = new Set(["H", "He"]);

/** He's right edge, up the strip between group 18 and the legend, to the s chip. */
const LINK = "M1498 408 H1508 V175 H1518";

export function SpecialScene() {
  const frame = useSceneFrame();
  const restore = progress(frame, RESTORE, LENGTH, easeInOut);
  const dim = progress(frame, DIM, DIM + 30, easeInOut) * (1 - restore);
  const callouts = 1 - restore;
  const hIn = progress(frame, HYDROGEN, HYDROGEN + 15, easeOut);
  const heIn = progress(frame, HELIUM, HELIUM + 15, easeOut);
  const pulse = progress(frame, S_BLOCK, S_BLOCK + 15, easeOut);
  const heScale = frame >= S_BLOCK ? lerp(1.15, 1, pulse) : 1;
  const link = progress(frame, S_BLOCK, S_BLOCK + 15, easeOut);
  const labels = 1 - 0.7 * dim;
  return (
    <AbsoluteFill>
      <PeriodicTable
        look={(el) => ({
          color: 1,
          dim: SPECIAL.has(el.symbol) ? 0 : dim,
          scale: el.symbol === "He" ? heScale : 1,
        })}
        periodLabels={labels}
        groupLabels={labels}
        axisTitles={1}
      />
      <div style={{ opacity: labels }}>
        <Legend shown={FULL_LEGEND} />
      </div>
      <Text
        x={lerp(470, 490, hIn)}
        y={baseline(416, type.label)}
        size={type.label}
        weight={500}
        color={colors.axis}
        anchor="start"
        opacity={hIn * callouts}
      >
        1s¹
      </Text>
      <Text
        x={422}
        y={baseline(310, type.label)}
        size={type.label}
        weight={500}
        anchor="start"
        opacity={fadeIn(frame, NONMETAL) * callouts}
      >
        Nonmetal
      </Text>
      <Text
        x={lerp(1440, 1420, heIn)}
        y={baseline(416, type.label)}
        size={type.label}
        weight={500}
        color={colors.axis}
        anchor="end"
        opacity={heIn * callouts}
      >
        1s²
      </Text>
      <Text
        x={1498}
        y={baseline(310, type.label)}
        size={type.label}
        weight={500}
        color={colors.sText}
        anchor="end"
        opacity={fadeIn(frame, GROUP_18) * callouts}
      >
        s-block, placed in group 18
      </Text>
      {link > 0 ? (
        <svg
          width={1920}
          height={1080}
          style={{ position: "absolute", left: 0, top: 0, opacity: callouts }}
        >
          <mask id="he-link-reveal">
            <path
              d={LINK}
              pathLength={1}
              stroke="white"
              strokeWidth={6}
              fill="none"
              strokeDasharray={`${link} 1`}
            />
          </mask>
          <path
            d={LINK}
            mask="url(#he-link-reveal)"
            stroke={colors.s}
            strokeWidth={3}
            fill="none"
            strokeDasharray="6 6"
          />
        </svg>
      ) : null}
    </AbsoluteFill>
  );
}
