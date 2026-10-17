import { AbsoluteFill } from "remotion";
import { dropped, fadeIn, progress } from "../components/anim";
import { Cell } from "../components/Cell";
import {
  ElectrodeTitles,
  FlowLegend,
  HalfCellLabels,
} from "../components/CellLabels";
import { Pitfall } from "../components/Pitfall";
import { useSceneFrame } from "../components/SceneFrame";
import { Bridge, Ion, Text } from "../components/Text";
import { TitleBand } from "../components/TitleBand";
import { cue } from "../cues";
import { colors, type } from "../theme";

const SCENE = "galvanic-cell";
const BUILD_AT = cue(SCENE, "We build a galvanic cell");
const ZINC_AT = cue(SCENE, "zinc in zinc ions");
const COPPER_AT = cue(SCENE, "copper in copper ions");
const ANODE_AT = cue(SCENE, "negative anode");
const CATHODE_AT = cue(SCENE, "positive cathode");
const WIRE_AT = cue(SCENE, "flow through an external wire");
const BRIDGE_AT = cue(SCENE, "A salt bridge allows ions");
const NEUTRAL_AT = cue(SCENE, "keeping both halves neutral");
const NOTATION_AT = cue(SCENE, "Standard cell notation");

const COLUMN_X = 1180;

export function GalvanicCellScene() {
  const frame = useSceneFrame();
  const electrons = fadeIn(frame, WIRE_AT);
  const ions = fadeIn(frame, BRIDGE_AT);
  const meter = fadeIn(frame, ANODE_AT);
  const notation = dropped(frame, NOTATION_AT);
  return (
    <AbsoluteFill>
      <TitleBand>Galvanic Cells</TitleBand>
      <Cell
        frame={frame}
        opacity={fadeIn(frame, BUILD_AT)}
        wear={progress(frame, WIRE_AT, NOTATION_AT + 120)}
        electrons={electrons}
        electronFlows={[{ from: WIRE_AT, direction: 1 }]}
        ions={ions}
        ionFlows={[{ from: BRIDGE_AT, direction: 1 }]}
        reading={<span style={{ opacity: meter }}>1.10 V</span>}
      />
      <HalfCellLabels
        left={fadeIn(frame, ZINC_AT)}
        right={fadeIn(frame, COPPER_AT)}
      />
      <ElectrodeTitles
        anode={fadeIn(frame, ANODE_AT)}
        cathode={fadeIn(frame, CATHODE_AT)}
      />
      <FlowLegend electrons={electrons} ions={ions} />
      <Pitfall left={COLUMN_X} top={264} {...dropped(frame, NEUTRAL_AT)}>
        Electrons never travel through the salt bridge; only ions do.
      </Pitfall>
      <Text x={COLUMN_X} y={560} size={type.hero} weight={700} {...notation}>
        <span style={{ color: colors.oxidationText }}>
          Zn | <Ion f="Zn" c="2+" />
        </span>
        <Bridge />
        <span style={{ color: colors.reductionText }}>
          <Ion f="Cu" c="2+" /> | Cu
        </span>
      </Text>
      <Text
        x={COLUMN_X}
        y={620}
        size={type.label}
        color={colors.muted}
        opacity={fadeIn(frame, NOTATION_AT + 30)}
      >
        <Bridge /> = salt bridge
      </Text>
    </AbsoluteFill>
  );
}
