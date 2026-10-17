import type { ReactNode } from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { easeOutQuart, fadeIn, lerp, pop, progress } from "../components/anim";
import { AffinityBadge, Pitfall, Title } from "../components/Panels";
import { cue } from "../cues";
import { ELECTRONEGATIVITY } from "../data";
import { colors, FONT, type } from "../theme";

const SCENE = "electronegativity";

const INDEX = cue(SCENE, "Electronegativity is an index");
const NITROGEN = cue(SCENE, "Nitrogen shows this difference");
const HIGHEST = cue(SCENE, "Fluorine is the highest");
const LOWEST = cue(SCENE, "cesium and francium are the lowest");

const PANEL_TOP = 260;
const PANEL_HEIGHT = 240;

function Panel({
  left,
  width,
  show,
  children,
}: {
  left: number;
  width: number;
  show: number;
  children: ReactNode;
}) {
  if (show <= 0) return null;
  return (
    <div
      style={{
        position: "absolute",
        left,
        top: PANEL_TOP,
        width,
        height: PANEL_HEIGHT,
        boxSizing: "border-box",
        padding: "28px 36px",
        borderRadius: 16,
        background: colors.tile,
        fontFamily: FONT,
        lineHeight: 1.2,
        color: colors.text,
        whiteSpace: "nowrap",
        opacity: Math.min(1, show),
        transform: `scale(${lerp(0.9, 1, Math.min(1, show))})`,
      }}
    >
      {children}
    </div>
  );
}

const EN_LINE = { color: colors.enText, fontWeight: 700 } as const;

export function ElectronegativityScene() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pitfall = fadeIn(frame, INDEX);
  const strike = progress(frame, INDEX + 20, INDEX + 40, easeOutQuart);
  const fix = fadeIn(frame, INDEX + 40);
  const nitrogen = pop(frame, fps, NITROGEN);
  const highest = fadeIn(frame, HIGHEST);
  const lowest = fadeIn(frame, LOWEST);
  return (
    <AbsoluteFill>
      <Title>Electronegativity</Title>
      <AffinityBadge opacity={1} />

      <Panel left={120} width={450} show={nitrogen}>
        <div style={{ fontSize: type.body, fontWeight: 700 }}>Nitrogen (N)</div>
        <div style={{ fontSize: type.label, marginTop: 14 }}>
          EA: &lt; 0 (unbound)
        </div>
        <div style={{ ...EN_LINE, fontSize: type.label, marginTop: 8 }}>
          EN: {ELECTRONEGATIVITY.N}
        </div>
      </Panel>

      <Panel left={620} width={760} show={highest}>
        <div style={{ ...EN_LINE, fontSize: type.body }}>
          Highest: F {ELECTRONEGATIVITY.F}
        </div>
        <div style={{ ...EN_LINE, fontSize: type.body, opacity: lowest }}>
          Lowest: Cs {ELECTRONEGATIVITY.Cs}, Fr {ELECTRONEGATIVITY.Fr}
        </div>
      </Panel>

      <Pitfall
        x={120}
        y={560}
        size={type.body}
        width={1100}
        wrong="Atoms want an octet"
        correction="Configurations simply lower total energy"
        opacity={pitfall}
        strike={strike}
        fix={fix}
      />
    </AbsoluteFill>
  );
}
