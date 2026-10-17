import type { ReactNode } from "react";
import { AbsoluteFill, useVideoConfig } from "remotion";
import { dropIn, dropped, fadeIn, lerp, popped } from "../components/anim";
import { useSceneFrame } from "../components/SceneFrame";
import { Badge, Text } from "../components/Text";
import { cue } from "../cues";
import { colors, FONT, SAFE, type, VIDEO } from "../theme";

const TITLE_AT = cue("gibbs-free-energy", "Gibbs free energy");
const BASE_AT = cue("gibbs-free-energy", "combines enthalpy and entropy");
const DH_AT = cue("gibbs-free-energy", "equals delta H");
const T_AT = cue("gibbs-free-energy", "minus temperature");
const DS_AT = cue("gibbs-free-energy", "times delta S");
const NEGATIVE_AT = cue(
  "gibbs-free-energy",
  "negative delta G means spontaneous",
);
const ZERO_AT = cue("gibbs-free-energy", "while zero indicates");

const CASES_X = 400;

function Term({
  t,
  color = colors.text,
  children,
}: {
  t: number;
  color?: string;
  children: ReactNode;
}) {
  return (
    <span
      style={{
        display: "inline-block",
        whiteSpace: "pre",
        color,
        opacity: t,
        transform: `translateY(${lerp(-24, 0, t)}px)`,
      }}
    >
      {children}
    </span>
  );
}

export function GibbsScene() {
  const frame = useSceneFrame();
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill>
      <Text
        x={SAFE}
        y={180}
        size={type.title}
        weight={700}
        color={colors.gibbsText}
        {...dropped(frame, TITLE_AT)}
      >
        Gibbs Free Energy
      </Text>
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 400,
          width: VIDEO.width,
          transform: "translateY(-50%)",
          textAlign: "center",
          fontFamily: FONT,
          fontSize: type.title,
          fontWeight: 700,
          lineHeight: 1.2,
          whiteSpace: "nowrap",
        }}
      >
        <Term t={fadeIn(frame, BASE_AT)} color={colors.gibbsText}>
          ΔG ={" "}
        </Term>
        <Term t={dropIn(frame, DH_AT)} color={colors.enthalpyText}>
          ΔH
        </Term>
        <Term t={fadeIn(frame, T_AT)}> − T</Term>
        <Term t={dropIn(frame, DS_AT)} color={colors.entropyText}>
          ΔS
        </Term>
      </div>
      <Text
        x={CASES_X}
        y={650}
        size={type.subtitle}
        {...popped(frame, fps, NEGATIVE_AT)}
      >
        <Badge
          color={colors.spontaneous}
          textColor={colors.spontaneousText}
          size={type.subtitle}
        >
          ΔG &lt; 0: Spontaneous
        </Badge>
      </Text>
      <Text
        x={CASES_X + 36}
        y={770}
        size={type.subtitle}
        opacity={fadeIn(frame, ZERO_AT)}
      >
        ΔG = 0: Equilibrium
      </Text>
      <Text
        x={CASES_X}
        y={890}
        size={type.subtitle}
        {...popped(frame, fps, ZERO_AT + 30)}
      >
        <Badge
          color={colors.nonSpontaneous}
          textColor={colors.nonSpontaneousText}
          size={type.subtitle}
        >
          ΔG &gt; 0: Non-spontaneous
        </Badge>
      </Text>
    </AbsoluteFill>
  );
}
