import { AbsoluteFill, useVideoConfig } from "remotion";
import { dropped, popped, pulse } from "../components/anim";
import { Pitfall } from "../components/Pitfall";
import { Reaction } from "../components/Reaction";
import { useSceneFrame } from "../components/SceneFrame";
import { F, Frac, Sub, Sup, Text } from "../components/Text";
import { cue } from "../cues";
import { colors, HEADING_Y, SAFE, type } from "../theme";

const RATIO_AT = cue("kc-expression", "ratio of product concentrations");
const POWER_AT = cue("kc-expression", "raised to its coefficient");
const OMITTED_AT = cue("kc-expression", "always omitted");
const PRESSURE_AT = cue("kc-expression", "partial pressures");

export function KcScene() {
  const frame = useSceneFrame();
  const { fps } = useVideoConfig();
  const pitfall = popped(frame, fps, OMITTED_AT);
  return (
    <AbsoluteFill>
      <Text
        x={SAFE}
        y={HEADING_Y}
        size={type.subtitle}
        weight={700}
        {...popped(frame, fps, 0)}
      >
        Equilibrium Constant
      </Text>
      <Reaction
        x={1800 - 220}
        y={HEADING_Y}
        size={type.body}
        {...popped(frame, fps, 10)}
      />
      <Text
        x={960}
        y={400}
        size={type.title}
        weight={700}
        color={colors.kqText}
        anchor="middle"
        {...popped(frame, fps, RATIO_AT)}
      >
        K<Sub>c</Sub> ={" "}
        <Frac
          num={
            <span style={{ color: colors.no2Text }}>
              [<F>NO2</F>]
              <Sup>
                <span
                  style={{
                    display: "inline-block",
                    transform: `scale(${pulse(frame, POWER_AT) ** 2})`,
                    color: colors.kqText,
                  }}
                >
                  2
                </span>
              </Sup>
            </span>
          }
          den={
            <span style={{ color: colors.n2o4Text }}>
              [<F>N2O4</F>]
            </span>
          }
        />
      </Text>
      <Text
        x={960}
        y={560}
        size={type.label}
        weight={500}
        color={colors.muted}
        anchor="middle"
        {...dropped(frame, POWER_AT)}
      >
        Products over reactants, each raised to its coefficient
      </Text>
      <Pitfall
        top={650}
        width={1680}
        opacity={pitfall.opacity}
        scale={pitfall.scale}
      >
        Pure solids and liquids do not appear in K. Adding them does not shift
        the equilibrium.
      </Pitfall>
      <Text
        x={960}
        y={880}
        size={type.subtitle}
        weight={500}
        anchor="middle"
        {...dropped(frame, PRESSURE_AT)}
      >
        Gases: K<Sub>p</Sub> = K<Sub>c</Sub>(RT)<Sup>Δn</Sup>
      </Text>
    </AbsoluteFill>
  );
}
