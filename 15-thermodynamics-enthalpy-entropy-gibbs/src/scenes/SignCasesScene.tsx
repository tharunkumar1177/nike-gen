import { AbsoluteFill, useVideoConfig } from "remotion";
import { fadeIn, popped } from "../components/anim";
import { useSceneFrame } from "../components/SceneFrame";
import { Text } from "../components/Text";
import { cue } from "../cues";
import { colors, FONT, type } from "../theme";

const AXES_AT = cue("four-sign-cases", "gives four cases");
const ALWAYS_AT = cue("four-sign-cases", "always spontaneous");
const NEVER_AT = cue("four-sign-cases", "never spontaneous");
const MATCH_AT = cue("four-sign-cases", "both signs match");

const GRID = { left: 400, top: 360, cell: 680, row: 240 } as const;

const CELLS = [
  {
    col: 0,
    row: 0,
    text: "Spontaneous at all T",
    fill: colors.spontaneous,
    ink: colors.spontaneousText,
    at: ALWAYS_AT,
  },
  {
    col: 1,
    row: 0,
    text: "Spontaneous at low T",
    fill: colors.temperatureDependent,
    ink: colors.temperatureDependentText,
    at: MATCH_AT,
  },
  {
    col: 0,
    row: 1,
    text: "Spontaneous at high T",
    fill: colors.temperatureDependent,
    ink: colors.temperatureDependentText,
    at: MATCH_AT + 10,
  },
  {
    col: 1,
    row: 1,
    text: "Non-spontaneous at all T",
    fill: colors.nonSpontaneous,
    ink: colors.nonSpontaneousText,
    at: NEVER_AT,
  },
] as const;

const COLUMN_LABELS = ["ΔS > 0", "ΔS < 0"];
const ROW_LABELS = ["ΔH < 0", "ΔH > 0"];

export function SignCasesScene() {
  const frame = useSceneFrame();
  const { fps } = useVideoConfig();
  const axes = fadeIn(frame, AXES_AT);
  return (
    <AbsoluteFill>
      <Text
        x={960}
        y={170}
        size={type.subtitle}
        weight={700}
        anchor="middle"
        color={colors.gibbsText}
        opacity={fadeIn(frame, 0)}
      >
        ΔG = ΔH − TΔS
      </Text>
      {COLUMN_LABELS.map((label, i) => (
        <Text
          key={label}
          x={GRID.left + GRID.cell * (i + 0.5)}
          y={GRID.top - 60}
          size={type.body}
          weight={700}
          color={colors.entropyText}
          anchor="middle"
          opacity={axes}
        >
          {label}
        </Text>
      ))}
      {ROW_LABELS.map((label, i) => (
        <Text
          key={label}
          x={GRID.left - 40}
          y={GRID.top + GRID.row * (i + 0.5)}
          size={type.body}
          weight={700}
          color={colors.enthalpyText}
          anchor="end"
          opacity={axes}
        >
          {label}
        </Text>
      ))}
      <div
        style={{
          position: "absolute",
          left: GRID.left,
          top: GRID.top,
          width: GRID.cell * 2,
          height: GRID.row * 2,
          boxSizing: "border-box",
          border: `4px solid ${colors.muted}`,
          borderRadius: 16,
          opacity: axes,
        }}
      />
      {CELLS.map(({ col, row, text, fill, ink, at }) => {
        const shown = popped(frame, fps, at);
        if (shown.opacity <= 0) return null;
        return (
          <div
            key={text}
            style={{
              position: "absolute",
              left: GRID.left + GRID.cell * col + 8,
              top: GRID.top + GRID.row * row + 8,
              width: GRID.cell - 16,
              height: GRID.row - 16,
              borderRadius: 12,
              background: fill,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: FONT,
              fontSize: type.body,
              fontWeight: 700,
              color: ink,
              opacity: shown.opacity,
              transform: `scale(${shown.scale})`,
            }}
          >
            {text}
          </div>
        );
      })}
      <Text
        x={960}
        y={GRID.top + GRID.row * 2 + 90}
        size={type.label}
        color={colors.muted}
        anchor="middle"
        opacity={fadeIn(frame, MATCH_AT + 30)}
      >
        When the signs match, the crossover temperature T = ΔH / ΔS decides.
      </Text>
    </AbsoluteFill>
  );
}
