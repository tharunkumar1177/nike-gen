import { AbsoluteFill, useVideoConfig } from "remotion";
import { dropped, fadeIn, lerp, popped, progress } from "../components/anim";
import { Cell } from "../components/Cell";
import {
  Concentrations,
  ElectrodeTitles,
  HalfCellLabels,
} from "../components/CellLabels";
import { Pitfall } from "../components/Pitfall";
import { useSceneFrame } from "../components/SceneFrame";
import { Frac, Ion, Text } from "../components/Text";
import { TitleBand } from "../components/TitleBand";
import { cue } from "../cues";
import { colors } from "../theme";

const SCENE = "nernst-equation";
const ONE_MOLAR_AT = cue(SCENE, "assume one molar");
const CHANGES_AT = cue(SCENE, "changes its own concentrations");
const TRACKS_AT = cue(SCENE, "Nernst equation tracks this");
const E0_AT = cue(SCENE, "E naught is one point one zero");
const SUPPOSE_AT = cue(SCENE, "Suppose zinc ions");
const Q_AT = cue(SCENE, "reaction quotient Q is ten");
const DROPS_AT = cue(SCENE, "voltage drops to one point zero seven");

const MATH_X = 1080;
const MATH_SIZE = 36;

const ZN = (
  <>
    [<Ion f="Zn" c="2+" />]
  </>
);
const CU = (
  <>
    [<Ion f="Cu" c="2+" />]
  </>
);

function Reading({ frame }: { frame: number }) {
  if (frame < DROPS_AT) return <>1.10 V</>;
  return <span style={{ opacity: fadeIn(frame, DROPS_AT) }}>1.07 V</span>;
}

export function NernstScene() {
  const frame = useSceneFrame();
  const { fps } = useVideoConfig();
  const running = fadeIn(frame, CHANGES_AT);
  const dim = progress(frame, CHANGES_AT, CHANGES_AT + 30);
  const standard = lerp(1, 0.35, dim);
  const swap = progress(frame, SUPPOSE_AT, SUPPOSE_AT + 20);
  return (
    <AbsoluteFill>
      <TitleBand>The Nernst Equation</TitleBand>
      <Cell
        frame={frame}
        electrons={running}
        electronFlows={[{ from: CHANGES_AT, direction: 1 }]}
        ions={running}
        ionFlows={[{ from: CHANGES_AT, direction: 1 }]}
        reading={<Reading frame={frame} />}
      />
      <HalfCellLabels />
      <ElectrodeTitles anode={1} cathode={1} />
      <Concentrations
        left="1 M"
        right="1 M"
        opacity={fadeIn(frame, ONE_MOLAR_AT) * standard * (1 - swap)}
      />
      <Concentrations left="0.10 M" right="0.010 M" opacity={swap} />
      <Text
        x={MATH_X}
        y={340}
        size={MATH_SIZE}
        weight={700}
        {...dropped(frame, TRACKS_AT)}
      >
        E = E° −<Frac num="0.0592 V" den="n" /> log Q
      </Text>
      <Text x={MATH_X} y={450} size={MATH_SIZE} {...dropped(frame, E0_AT)}>
        E = 1.10 V −<Frac num="0.0592 V" den="2" /> log Q
      </Text>
      <Text x={MATH_X} y={560} size={MATH_SIZE} {...dropped(frame, Q_AT)}>
        Q =<Frac num={ZN} den={CU} />=<Frac num="0.10" den="0.010" />= 10
      </Text>
      <Text
        x={MATH_X}
        y={670}
        size={MATH_SIZE}
        weight={700}
        color={colors.electronText}
        {...popped(frame, fps, DROPS_AT)}
      >
        E = 1.10 V − 0.0296 V × 1 = 1.07 V
      </Text>
      <Pitfall
        left={MATH_X}
        top={780}
        width={720}
        {...dropped(frame, DROPS_AT + 20)}
      >
        Use log with 0.0592, and leave solids out of Q.
      </Pitfall>
    </AbsoluteFill>
  );
}
