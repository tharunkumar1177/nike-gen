import type { ReactNode } from "react";
import { AbsoluteFill } from "remotion";
import { dropped, easeInOut, fadeIn, lerp, progress } from "../components/anim";
import { Nucleus, packNucleons } from "../components/Nucleus";
import { Nuclide } from "../components/Nuclide";
import { useSceneFrame } from "../components/SceneFrame";
import { SceneTitle } from "../components/SceneTitle";
import { Arrow, Text } from "../components/Text";
import { cue } from "../cues";
import { colors, FONT } from "../theme";

const HEAVY = { x: 960, y: 690 } as const;
const HEAVY_NUCLEONS = packNucleons(44, 32, 95 / 241);
const ALPHA_START = { x: 1088, y: 676 } as const;
const ALPHA_END = { x: 1420, y: 560 } as const;
const ALPHA_NUCLEONS = [
  { dx: -15, dy: -15, proton: true },
  { dx: 15, dy: 15, proton: true },
  { dx: 15, dy: -15, proton: false },
  { dx: -15, dy: 15, proton: false },
];

const CUES = {
  equation: cue("alpha-decay", "Smoke detectors hide a speck"),
  heavy: cue("alpha-decay", "Heavy nuclei with more than eighty three protons"),
  alpha: cue("alpha-decay", "emit an alpha particle"),
  tags: cue("alpha-decay", "drops the mass number by four"),
};

function Tagged({ tags, children }: { tags: ReactNode; children: ReactNode }) {
  return (
    <span style={{ position: "relative", display: "inline-block" }}>
      {children}
      <span
        style={{
          position: "absolute",
          left: "50%",
          top: "100%",
          transform: "translateX(-50%)",
        }}
      >
        {tags}
      </span>
    </span>
  );
}

export function AlphaScene() {
  const frame = useSceneFrame();
  const equation = fadeIn(frame, CUES.equation);
  const heavy = fadeIn(frame, CUES.heavy);
  const flight = progress(frame, CUES.alpha, CUES.alpha + 30, easeInOut);
  const tags = dropped(frame, CUES.tags);
  const alphaX = lerp(ALPHA_START.x, ALPHA_END.x, flight);
  const alphaY = lerp(ALPHA_START.y, ALPHA_END.y, flight);
  return (
    <AbsoluteFill>
      <SceneTitle>Alpha Decay</SceneTitle>
      <Text x={960} y={350} size={64} anchor="middle" opacity={equation}>
        <Nuclide a="241" z="95">
          Am
        </Nuclide>
        <Arrow />
        <Tagged
          tags={
            <span
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                fontSize: 32,
                fontWeight: 700,
                lineHeight: 1.25,
                color: colors.alphaText,
                whiteSpace: "nowrap",
                opacity: tags.opacity,
                transform: `translateY(${tags.dy * -0.4}px)`,
              }}
            >
              <span>A − 4</span>
              <span>Z − 2</span>
            </span>
          }
        >
          <Nuclide a="237" z="93">
            Np
          </Nuclide>
        </Tagged>
        <span style={{ margin: "0 0.35em" }}>+</span>
        <Nuclide a="4" z="2" color={colors.alphaText}>
          He
        </Nuclide>
      </Text>
      <svg
        width={1920}
        height={1080}
        style={{ position: "absolute", left: 0, top: 0 }}
      >
        <Nucleus
          x={HEAVY.x}
          y={HEAVY.y}
          radius={16}
          nucleons={HEAVY_NUCLEONS}
          opacity={heavy}
        />
        <g opacity={heavy}>
          <circle
            cx={alphaX}
            cy={alphaY}
            r={40}
            fill={colors.alpha}
            opacity={0.25 + 0.35 * flight}
          />
          <Nucleus
            x={alphaX}
            y={alphaY}
            radius={15}
            nucleons={ALPHA_NUCLEONS}
          />
        </g>
      </svg>
      <Text
        x={HEAVY.x}
        y={890}
        size={32}
        anchor="middle"
        color={colors.muted}
        opacity={heavy}
      >
        Americium-241: 95 protons, 146 neutrons
      </Text>
      <div
        style={{
          position: "absolute",
          left: ALPHA_END.x + 60,
          top: ALPHA_END.y,
          transform: "translateY(-50%)",
          fontFamily: FONT,
          fontSize: 40,
          fontWeight: 700,
          color: colors.alphaText,
          whiteSpace: "nowrap",
          opacity: fadeIn(frame, CUES.alpha + 24),
        }}
      >
        α ={" "}
        <Nuclide a="4" z="2">
          He
        </Nuclide>
        <div style={{ fontSize: 28, fontWeight: 400, color: colors.muted }}>
          2 protons + 2 neutrons
        </div>
      </div>
    </AbsoluteFill>
  );
}
