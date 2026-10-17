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

/** Title band from wireframe.svg: rules at y 120 and 248, content from y 264. */
export const BAND = {
  top: 120,
  bottom: 248,
  inset: 32,
  rule: 3,
  contentTop: 264,
} as const;

export const colors = {
  background: "#FFFFFF",
  text: "#1C1C1E",
  muted: "#4B5563",
  rule: "#1C1C1E",
  wire: "#4B5563",
  glass: "#1C1C1E",
  panel: "#F9FAFB",
  panelStroke: "#CBD5E1",
  clear: "#F8FAFC",
  copperSolution: "#DBEAFE",
  zinc: "#9CA3AF",
  copper: "#B45309",
  silver: "#D1D5DB",
  silverStroke: "#6B7280",
  bridge: "#F3F4F6",
  bridgeStroke: "#9CA3AF",
  oxidation: "#F59E0B",
  oxidationText: "#78350F",
  oxidationFill: "#FFFBEB",
  reduction: "#3B82F6",
  reductionText: "#1E3A8A",
  reductionFill: "#EFF6FF",
  electron: "#A855F7",
  electronText: "#4C1D95",
  cation: "#10B981",
  cationText: "#064E3B",
  anion: "#EF4444",
  anionText: "#7F1D1D",
  pitfall: "#B91C1C",
  pitfallFill: "#FEE2E2",
  source: "#1F2937",
  sourceText: "#F9FAFB",
} as const;

export const type = {
  title: 80,
  heading: 48,
  hero: 40,
  body: 32,
  label: 28,
} as const;

export const NARRATED_SCENES = [
  "redox-intro",
  "balancing",
  "galvanic-cell",
  "reduction-potentials",
  "free-energy",
  "nernst-equation",
  "electrolysis",
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
