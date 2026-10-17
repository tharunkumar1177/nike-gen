import type { ReactNode } from "react";
import { AbsoluteFill, useVideoConfig } from "remotion";
import { dropped, fadeIn, popped, progress } from "../components/anim";
import { Cell, CELL } from "../components/Cell";
import {
  Concentrations,
  ElectrodeTitles,
  HalfCellLabels,
} from "../components/CellLabels";
import { Pitfall } from "../components/Pitfall";
import { useSceneFrame } from "../components/SceneFrame";
import { Ion, Sub, Text } from "../components/Text";
import { TitleBand } from "../components/TitleBand";
import { cue } from "../cues";
import { colors, type, VIDEO } from "../theme";

const SCENE = "reduction-potentials";
const WHY_AT = cue(SCENE, "why does zinc hand electrons");
const MEASURE_AT = cue(SCENE, "We measure this pull");
const ALONE_AT = cue(SCENE, "cannot be measured alone");
const SHE_AT = cue(SCENE, "standard hydrogen electrode");
const COPPER_AT = cue(SCENE, "Copper pulls electrons");
const ZINC_AT = cue(SCENE, "zinc pushes");
const SUBTRACT_AT = cue(SCENE, "Subtracting the anode from the cathode");
const TOTAL_AT = cue(SCENE, "total cell potential");

const COLUMN_X = 1180;
const AXIS = { x: 1220, top: 470, bottom: 820, zero: 593, perVolt: 245 };
const LABEL_X = 1260;

const COPPER_E = 0.34;
const ZINC_E = -0.7618;

const yOf = (volts: number) => AXIS.zero - volts * AXIS.perVolt;

type Mark = { volts: number; label: ReactNode; color: string; at: number };

const MARKS: Mark[] = [
  {
    volts: COPPER_E,
    label: (
      <>
        <Ion f="Cu" c="2+" />
        /Cu: +0.34 V
      </>
    ),
    color: colors.reductionText,
    at: COPPER_AT,
  },
  { volts: 0, label: "SHE: 0 V", color: colors.muted, at: SHE_AT },
  {
    volts: ZINC_E,
    label: (
      <>
        <Ion f="Zn" c="2+" />
        /Zn: −0.76 V
      </>
    ),
    color: colors.oxidationText,
    at: ZINC_AT,
  },
];

function Ladder({ frame }: { frame: number }) {
  const axis = fadeIn(frame, MEASURE_AT);
  const bracket = fadeIn(frame, SUBTRACT_AT);
  const top = yOf(COPPER_E);
  const bottom = yOf(ZINC_E);
  return (
    <svg
      width={VIDEO.width}
      height={VIDEO.height}
      style={{ position: "absolute", inset: 0 }}
    >
      <line
        x1={AXIS.x}
        y1={AXIS.top}
        x2={AXIS.x}
        y2={AXIS.bottom}
        stroke={colors.text}
        strokeWidth={3}
        opacity={axis}
      />
      {MARKS.map(({ volts, color, at }) => (
        <line
          key={volts}
          x1={AXIS.x - 16}
          y1={yOf(volts)}
          x2={AXIS.x + 16}
          y2={yOf(volts)}
          stroke={color}
          strokeWidth={4}
          opacity={fadeIn(frame, at)}
        />
      ))}
      <path
        d={`M ${AXIS.x - 22} ${top} H ${AXIS.x - 34} V ${bottom} H ${AXIS.x - 22}`}
        fill="none"
        stroke={colors.electron}
        strokeWidth={4}
        opacity={bracket}
      />
    </svg>
  );
}

function Reading({ frame }: { frame: number }) {
  if (frame < COPPER_AT) {
    return <span style={{ opacity: fadeIn(frame, WHY_AT) }}>?</span>;
  }
  if (frame < ZINC_AT) {
    return <span style={{ opacity: fadeIn(frame, COPPER_AT) }}>0.34 V</span>;
  }
  if (frame < TOTAL_AT) return null;
  return <span style={{ opacity: fadeIn(frame, TOTAL_AT) }}>1.10 V</span>;
}

export function ReductionPotentialsScene() {
  const frame = useSceneFrame();
  const { fps } = useVideoConfig();
  const she =
    progress(frame, SHE_AT, SHE_AT + 30) -
    progress(frame, ZINC_AT, ZINC_AT + 30);
  const titles = fadeIn(frame, SUBTRACT_AT);
  return (
    <AbsoluteFill>
      <TitleBand>Standard Potentials</TitleBand>
      <Cell frame={frame} she={she} reading={<Reading frame={frame} />} />
      <HalfCellLabels she={she} />
      <Concentrations left="1 M" right="1 M" opacity={fadeIn(frame, SHE_AT)} />
      <Text
        x={CELL.left.label + 60}
        y={410}
        size={type.label}
        weight={700}
        anchor="end"
        opacity={she}
      >
        E° = 0 V
      </Text>
      <Text
        x={CELL.left.label + 60}
        y={450}
        size={type.label}
        color={colors.muted}
        anchor="end"
        opacity={she}
      >
        (defined)
      </Text>
      <ElectrodeTitles anode={titles} cathode={titles} />
      <Pitfall left={COLUMN_X} top={264} {...dropped(frame, ALONE_AT)}>
        A single half-cell potential cannot be measured alone.
      </Pitfall>
      <Text
        x={AXIS.x}
        y={AXIS.top - 28}
        size={type.label}
        color={colors.muted}
        anchor="middle"
        opacity={fadeIn(frame, MEASURE_AT)}
      >
        E° (V)
      </Text>
      <Ladder frame={frame} />
      {MARKS.map(({ volts, label, color, at }) => (
        <Text
          key={volts}
          x={LABEL_X}
          y={yOf(volts)}
          size={type.body}
          weight={700}
          color={color}
          {...dropped(frame, at)}
        >
          {label}
        </Text>
      ))}
      <Text
        x={COLUMN_X}
        y={870}
        size={type.body}
        {...dropped(frame, SUBTRACT_AT)}
      >
        E°<Sub>cell</Sub> = E°<Sub>cathode</Sub> − E°<Sub>anode</Sub>
      </Text>
      <Text
        x={COLUMN_X}
        y={925}
        size={type.body}
        weight={700}
        color={colors.electronText}
        {...popped(frame, fps, TOTAL_AT)}
      >
        = +0.34 V − (−0.76 V) = +1.10 V
      </Text>
    </AbsoluteFill>
  );
}
