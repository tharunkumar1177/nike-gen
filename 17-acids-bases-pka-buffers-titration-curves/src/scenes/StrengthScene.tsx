import { AbsoluteFill, useVideoConfig } from "remotion";
import { dropped, fadeIn, lerp, popped, progress } from "../components/anim";
import { Pitfall } from "../components/Pitfall";
import { useSceneFrame } from "../components/SceneFrame";
import { EqArrow, Frac, Sub, Sup, Text } from "../components/Text";
import { cue } from "../cues";
import { colors, HEADING_Y, SAFE, type } from "../theme";

const IONIZE_AT = cue("ka-pka-strength", "Weak acids only partially ionize");
const KA_AT = cue("ka-pka-strength", "We measure this with K a");
const PKA_AT = cue("ka-pka-strength", "or its negative log, p K a");
const SMALLER_AT = cue("ka-pka-strength", "A smaller p K a");
const CONC_AT = cue("ka-pka-strength", "while concentration is");

function Minus() {
  return <Sup>−</Sup>;
}

function slid(frame: number, start: number) {
  const t = progress(frame, start, start + 20);
  return { opacity: t, x: lerp(SAFE - 20, SAFE, t) };
}

const H = (
  <span style={{ color: colors.hydroniumText }}>
    H<Sup>+</Sup>
  </span>
);
const A = (
  <span style={{ color: colors.baseText }}>
    A<Minus />
  </span>
);
const HA = <span style={{ color: colors.acidText }}>HA</span>;

export function StrengthScene() {
  const frame = useSceneFrame();
  const { fps } = useVideoConfig();
  const ka = slid(frame, KA_AT);
  const pka = slid(frame, PKA_AT);
  const box = popped(frame, fps, SMALLER_AT);
  return (
    <AbsoluteFill>
      <Text
        x={SAFE}
        y={HEADING_Y}
        size={type.subtitle}
        weight={700}
        {...popped(frame, fps, 0)}
      >
        Acid Strength: K<Sub>a</Sub> and pK<Sub>a</Sub>
      </Text>
      <Text
        x={SAFE}
        y={310}
        size={type.body}
        weight={700}
        {...dropped(frame, IONIZE_AT)}
      >
        {HA}
        <EqArrow />
        {H} + {A}
      </Text>
      <Text x={ka.x} y={450} size={type.body} weight={700} opacity={ka.opacity}>
        K<Sub>a</Sub> =
        <Frac
          num={
            <>
              [{H}][{A}]
            </>
          }
          den={<>[{HA}]</>}
        />
      </Text>
      <Text
        x={pka.x}
        y={590}
        size={type.body}
        weight={700}
        opacity={pka.opacity}
      >
        pK<Sub>a</Sub> = −log K<Sub>a</Sub>
      </Text>
      <Pitfall
        top={280}
        left={900}
        width={800}
        opacity={box.opacity}
        scale={box.scale}
      >
        <div style={{ marginTop: 12 }}>
          A higher pK<Sub>a</Sub> means a <b>weaker</b> acid.
        </div>
        <div style={{ marginTop: 24, opacity: fadeIn(frame, CONC_AT) }}>
          Strong is not concentrated: strength is how much ionizes,
          concentration is how much is dissolved.
        </div>
      </Pitfall>
    </AbsoluteFill>
  );
}
