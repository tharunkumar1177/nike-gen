import { loadFont } from "@remotion/google-fonts/IBMPlexSans";
import script from "../audio/script.json";
import { layout, type Span } from "./timeline";

const { fontFamily } = loadFont("normal", {
  weights: ["400", "500", "700"],
  subsets: ["latin", "greek"],
});

export const FONT = fontFamily;

const timeline = layout(script);

export const VIDEO = {
  width: 1920,
  height: 1080,
  fps: script.fps,
  durationInFrames: timeline.durationInFrames,
} as const;

export const SAFE = 120;
export const CROSSFADE = 30;

/** Scene title band from `wireframe.svg`: rules at the safe margin, 80 px title. */
export const TITLE = {
  size: 80,
  ruleWidth: 3,
  left: SAFE,
  right: VIDEO.width - SAFE,
  top: SAFE,
  /** Inset of the title from the rules' left end (2/5 of the title size). */
  inset: 32,
  /** Padding between each rule and the nearest text (1/5 of the title size). */
  padding: 16,
} as const;

/** Bottom rule: top rule + padding + one 1.2-line-height title line + padding. */
export const TITLE_BOTTOM = TITLE.top + TITLE.padding * 2 + TITLE.size * 1.2;
/** First y available to scene content: the bottom rule plus the same padding. */
export const CONTENT_TOP = TITLE_BOTTOM + TITLE.padding;
export const CONTENT_BOTTOM = VIDEO.height - SAFE;

export const colors = {
  background: "#FFFFFF",
  text: "#1C1C1E",
  muted: "#475569",
  box: "#F1F5F9",
  grid: "#CBD5E1",
  proton: "#EF4444",
  protonText: "#7F1D1D",
  neutron: "#3B82F6",
  neutronText: "#1E3A8A",
  alpha: "#F59E0B",
  alphaText: "#78350F",
  betaMinus: "#10B981",
  betaMinusText: "#064E3B",
  positron: "#8B5CF6",
  positronText: "#4C1D95",
  gamma: "#EC4899",
  gammaText: "#831843",
  band: "#94A3B8",
  bandText: "#0F172A",
  halfLife: "#F97316",
  halfLifeText: "#7C2D12",
  pitfall: "#B91C1C",
  pitfallFill: "#FEE2E2",
} as const;

export const type = {
  title: TITLE.size,
  body: 48,
  label: 32,
} as const;

export const NARRATED_SCENES = [
  "nuclear-stability",
  "alpha-decay",
  "beta-decay-modes",
  "gamma-and-penetration",
  "balancing-equations",
  "half-life-concept",
  "half-life-math",
  "radiocarbon-dating",
] as const;

export type NarratedScene = (typeof NARRATED_SCENES)[number];

/** Frame range of each scene; keys match the scene ids in `audio/script.json`. */
export const SCENES = Object.fromEntries(
  NARRATED_SCENES.map((id) => {
    const span = timeline.spans.find((entry) => entry.scene === id);
    if (!span) {
      throw new Error(`No narration line for ${id}.`);
    }
    return [id, span];
  }),
) as Record<NarratedScene, Span>;

export const CLOSING = timeline.closing;
