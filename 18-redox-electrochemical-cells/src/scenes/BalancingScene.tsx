import type { ReactNode } from "react";
import { AbsoluteFill, useVideoConfig } from "remotion";
import { dropped, fadeIn, popped } from "../components/anim";
import { useSceneFrame } from "../components/SceneFrame";
import { Arrow, Electron, F, Ion, Text } from "../components/Text";
import { TitleBand } from "../components/TitleBand";
import { cue } from "../cues";
import { colors, FONT, type } from "../theme";

const SCENE = "balancing";
const TRAVEL_AT = cue(SCENE, "If electrons are to travel");
const OXYGEN_AT = cue(SCENE, "balance oxygen with water");
const HYDROGEN_AT = cue(SCENE, "hydrogen with H plus");
const CHARGE_AT = cue(SCENE, "electrons to balance the charges");
const FIVE_AT = cue(SCENE, "multiply the iron reaction by five");
const NET_AT = cue(SCENE, "adding them together");

const PANEL = { top: 300, height: 200 };
const OXIDATION = { left: 120, width: 800 };
const REDUCTION = { left: 960, width: 840 };
const EQUATION_Y = 430;

const STEPS: { label: ReactNode; at: number }[] = [
  {
    label: (
      <>
        1 · O: add <F>H2O</F>
      </>
    ),
    at: OXYGEN_AT,
  },
  {
    label: (
      <>
        2 · H: add <Ion f="H" c="+" />
      </>
    ),
    at: HYDROGEN_AT,
  },
  {
    label: (
      <>
        3 · Charge: add <Electron />
      </>
    ),
    at: CHARGE_AT,
  },
  {
    label: (
      <>
        4 · Match <Electron />: × 5
      </>
    ),
    at: FIVE_AT,
  },
];

function Term({ shown, children }: { shown: number; children: ReactNode }) {
  return <span style={{ opacity: shown }}>{children}</span>;
}

function Panel({
  left,
  width,
  fill,
  stroke,
  title,
  color,
  opacity,
}: {
  left: number;
  width: number;
  fill: string;
  stroke: string;
  title: string;
  color: string;
  opacity: number;
}) {
  return (
    <div
      style={{
        position: "absolute",
        left,
        top: PANEL.top,
        width,
        height: PANEL.height,
        boxSizing: "border-box",
        padding: "16px 24px",
        background: fill,
        border: `2px solid ${stroke}`,
        borderRadius: 16,
        fontFamily: FONT,
        fontSize: type.label,
        fontWeight: 700,
        color,
        opacity,
      }}
    >
      {title}
    </div>
  );
}

export function BalancingScene() {
  const frame = useSceneFrame();
  const { fps } = useVideoConfig();
  const panels = fadeIn(frame, TRAVEL_AT);
  const water = fadeIn(frame, OXYGEN_AT);
  const protons = fadeIn(frame, HYDROGEN_AT);
  const charge = fadeIn(frame, CHARGE_AT);
  const five = fadeIn(frame, FIVE_AT);
  const electron = { color: colors.electronText };
  return (
    <AbsoluteFill>
      <TitleBand>Balancing Redox</TitleBand>
      <Panel
        left={OXIDATION.left}
        width={OXIDATION.width}
        fill={colors.oxidationFill}
        stroke={colors.oxidation}
        title="Oxidation half"
        color={colors.oxidationText}
        opacity={panels}
      />
      <Panel
        left={REDUCTION.left}
        width={REDUCTION.width}
        fill={colors.reductionFill}
        stroke={colors.reduction}
        title="Reduction half"
        color={colors.reductionText}
        opacity={panels}
      />
      <Text
        x={OXIDATION.left + OXIDATION.width - 24}
        y={PANEL.top + 34}
        size={type.body}
        weight={700}
        color={colors.oxidationText}
        anchor="end"
        {...popped(frame, fps, FIVE_AT)}
      >
        × 5
      </Text>
      <Text
        x={OXIDATION.left + OXIDATION.width / 2}
        y={EQUATION_Y}
        size={type.hero}
        weight={500}
        anchor="middle"
        opacity={panels}
      >
        <Term shown={five}>5</Term>
        <Ion f="Fe" c="2+" />
        <Arrow />
        <Term shown={five}>5</Term>
        <Ion f="Fe" c="3+" />
        <Term shown={charge}>
          {" + "}
          <span style={electron}>
            <Term shown={five}>5</Term>
            <Electron />
          </span>
        </Term>
      </Text>
      <Text
        x={REDUCTION.left + REDUCTION.width / 2}
        y={EQUATION_Y}
        size={type.hero}
        weight={500}
        anchor="middle"
        opacity={panels}
      >
        <Ion f="MnO4" c="−" />
        <Term shown={protons}>
          {" + 8"}
          <Ion f="H" c="+" />
        </Term>
        <Term shown={charge}>
          {" + "}
          <span style={electron}>
            5<Electron />
          </span>
        </Term>
        <Arrow />
        <Ion f="Mn" c="2+" />
        <Term shown={water}>
          {" + 4"}
          <F>H2O</F>
        </Term>
      </Text>
      {STEPS.map(({ label, at }, i) => {
        const { opacity, dy } = dropped(frame, at);
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: 120 + i * 420,
              top: 540,
              width: 400,
              boxSizing: "border-box",
              padding: "12px 20px",
              borderRadius: 12,
              background: colors.panel,
              border: `2px solid ${colors.panelStroke}`,
              fontFamily: FONT,
              fontSize: type.label,
              color: colors.text,
              opacity,
              transform: `translateY(${dy}px)`,
            }}
          >
            {label}
          </div>
        );
      })}
      <Text
        x={960}
        y={720}
        size={44}
        weight={700}
        anchor="middle"
        {...popped(frame, fps, NET_AT)}
      >
        5<Ion f="Fe" c="2+" /> + <Ion f="MnO4" c="−" /> + 8<Ion f="H" c="+" />
        <Arrow />5<Ion f="Fe" c="3+" /> + <Ion f="Mn" c="2+" /> + 4<F>H2O</F>
      </Text>
      <Text
        x={960}
        y={810}
        size={type.body}
        color={colors.muted}
        anchor="middle"
        opacity={fadeIn(frame, NET_AT + 20)}
      >
        Charge check: +10 − 1 + 8 = +17 on the left; +15 + 2 = +17 on the
        right
      </Text>
    </AbsoluteFill>
  );
}
