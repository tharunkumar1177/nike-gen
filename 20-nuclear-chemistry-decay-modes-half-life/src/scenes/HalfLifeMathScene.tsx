import { AbsoluteFill } from "remotion";
import { dropped, progress } from "../components/anim";
import { DecayGraph, HalfLabel } from "../components/DecayGraph";
import { Pitfall } from "../components/Pitfall";
import { useSceneFrame } from "../components/SceneFrame";
import { SceneTitle } from "../components/SceneTitle";
import { Frac, Sub, Sup, Text } from "../components/Text";
import { cue } from "../cues";
import { colors } from "../theme";

const CUES = {
  half: cue("half-life-math", "each half life halves what remains"),
  quarter: cue("half-life-math", "then a quarter"),
  eighth: cue("half-life-math", "then an eighth"),
  pitfall: cue("half-life-math", "It is never all gone"),
  order: cue("half-life-math", "Radioactive decay is a first order process"),
  k: cue("half-life-math", "The rate constant, k, equals"),
  n: cue("half-life-math", "The remaining amount is"),
};

const EQUATION_X = 495;

export function HalfLifeMathScene() {
  const frame = useSceneFrame();
  const reveal = (start: number) => progress(frame, start, start + 20);
  const order = dropped(frame, CUES.order);
  const k = dropped(frame, CUES.k);
  const n = dropped(frame, CUES.n);
  return (
    <AbsoluteFill>
      <SceneTitle>The Half-Life Equation</SceneTitle>
      <DecayGraph
        axes={1}
        curve={1}
        markers={[
          {
            halfLives: 1,
            label: <HalfLabel den={2} />,
            reveal: reveal(CUES.half),
          },
          {
            halfLives: 2,
            label: <HalfLabel den={4} />,
            reveal: reveal(CUES.quarter),
          },
          {
            halfLives: 3,
            label: <HalfLabel den={8} />,
            reveal: reveal(CUES.eighth),
          },
        ]}
      />
      <Pitfall
        top={290}
        width={750}
        size={36}
        opacity={progress(frame, CUES.pitfall, CUES.pitfall + 15)}
      >
        After two half-lives, one quarter remains, not zero.
      </Pitfall>
      <Text
        x={EQUATION_X}
        y={500}
        size={36}
        weight={700}
        anchor="middle"
        color={colors.muted}
        opacity={order.opacity}
        dy={order.dy}
      >
        First-order decay
      </Text>
      <Text
        x={EQUATION_X}
        y={610}
        size={56}
        anchor="middle"
        opacity={k.opacity}
        dy={k.dy}
      >
        k ={" "}
        <Frac
          num="0.693"
          den={
            <>
              t<Sub>1/2</Sub>
            </>
          }
        />
      </Text>
      <Text
        x={EQUATION_X}
        y={760}
        size={56}
        anchor="middle"
        opacity={n.opacity}
        dy={n.dy}
      >
        N = N<Sub>0</Sub> e<Sup>−kt</Sup>
      </Text>
    </AbsoluteFill>
  );
}
