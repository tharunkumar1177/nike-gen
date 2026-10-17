import { AbsoluteFill } from "remotion";
import { Card } from "../components/Card";
import { cue } from "../cues";
import { colors } from "../theme";

const SCENE = "pitfalls";

function Warning() {
  return (
    <svg width={64} height={64} viewBox="0 0 64 64">
      <g
        fill="none"
        stroke={colors.unpaired}
        strokeWidth={4}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M32 8 L58 54 L6 54 Z" />
        <path d="M32 24 L32 40" />
        <path d="M32 48 L32 50" />
      </g>
    </svg>
  );
}

function Cross() {
  return (
    <svg width={36} height={36} viewBox="0 0 36 36">
      <path
        d="M8 8 L28 28 M28 8 L8 28"
        stroke={colors.unpaired}
        strokeWidth={4}
        strokeLinecap="round"
      />
    </svg>
  );
}

const ITEMS = [
  {
    text: "s–p mixing is an interaction, not sp hybridisation.",
    at: cue(SCENE, "s p mixing is"),
  },
  { text: "σ is not always below π.", at: cue(SCENE, "sigma is not always") },
  {
    text: "Bond order 0 means no stable bond predicted, not that molecules cannot exist.",
    at: cue(SCENE, "and bond order zero"),
  },
];

export function PitfallsScene() {
  return (
    <AbsoluteFill>
      <Card
        box={{ left: 120, top: 230, width: 1680, height: 620 }}
        border={colors.unpaired}
        title="Pitfalls"
        titleIcon={<Warning />}
        bulletIcon={<Cross />}
        items={ITEMS}
      />
    </AbsoluteFill>
  );
}
