import { AbsoluteFill } from "remotion";
import { dropped, easeInOut, fadeIn, lerp, progress } from "../components/anim";
import { Cell, type Flow } from "../components/Cell";
import {
  ElectrodeTitles,
  FlowLegend,
  HalfCellLabels,
} from "../components/CellLabels";
import { Pitfall } from "../components/Pitfall";
import { useSceneFrame } from "../components/SceneFrame";
import { Arrow, Ion, Text } from "../components/Text";
import { TitleBand } from "../components/TitleBand";
import { cue } from "../cues";
import { colors, type } from "../theme";

const SCENE = "electrolysis";
const DISCHARGE_AT = cue(SCENE, "As a cell discharges");
const ZERO_AT = cue(SCENE, "zero volts at equilibrium");
const SOURCE_AT = cue(SCENE, "external power source");
const WRONG_AT = cue(SCENE, "drives electrons the wrong way");
const OXIDATION_AT = cue(SCENE, "Oxidation still happens at the anode");
const POSITIVE_AT = cue(SCENE, "the anode is the positive electrode");

const COLUMN_X = 1180;
const FLOWS: Flow[] = [
  { from: 0, to: ZERO_AT, direction: 1 },
  { from: WRONG_AT, direction: -1 },
];

export function ElectrolysisScene() {
  const frame = useSceneFrame();
  const discharge = progress(frame, DISCHARGE_AT, ZERO_AT, easeInOut);
  const recharge = progress(frame, WRONG_AT, WRONG_AT + 240);
  const volts = lerp(1.1, 0, discharge);
  const direction = frame < WRONG_AT ? 1 : -1;
  return (
    <AbsoluteFill>
      <TitleBand>Electrolysis</TitleBand>
      <Cell
        frame={frame}
        wear={0.5 + 0.5 * discharge - 0.6 * recharge}
        electrons={1}
        electronFlows={FLOWS}
        ions={1}
        ionFlows={FLOWS}
        source={progress(frame, SOURCE_AT, SOURCE_AT + 30)}
        reading={`${volts.toFixed(2)} V`}
      />
      <HalfCellLabels />
      <ElectrodeTitles
        anode={1}
        cathode={1}
        electrolysis={progress(frame, POSITIVE_AT, POSITIVE_AT + 30)}
      />
      <FlowLegend electrons={1} ions={1} direction={direction} />
      <Pitfall left={COLUMN_X} top={264} {...dropped(frame, OXIDATION_AT)}>
        Oxidation is always at the anode, but the anode is positive in
        electrolysis.
      </Pitfall>
      <Text
        x={COLUMN_X}
        y={560}
        size={type.body}
        weight={700}
        {...dropped(frame, ZERO_AT)}
      >
        Dead cell: E = 0 V at equilibrium
      </Text>
      <Text
        x={COLUMN_X}
        y={660}
        size={type.hero}
        weight={700}
        color={colors.oxidationText}
        {...dropped(frame, WRONG_AT)}
      >
        Cu + <Ion f="Zn" c="2+" />
        <Arrow />
        <Ion f="Cu" c="2+" /> + Zn
      </Text>
      <Text
        x={COLUMN_X}
        y={720}
        size={type.label}
        color={colors.muted}
        opacity={fadeIn(frame, WRONG_AT + 20)}
      >
        Non-spontaneous: driven by the power source
      </Text>
    </AbsoluteFill>
  );
}
