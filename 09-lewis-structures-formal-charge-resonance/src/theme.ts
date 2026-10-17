import { loadFont } from "@remotion/google-fonts/Roboto";

const { fontFamily } = loadFont("normal", {
  weights: ["400", "500", "700"],
  subsets: ["latin", "greek"],
});

export const FONT = fontFamily;

export const VIDEO = {
  width: 1920,
  height: 1080,
  fps: 30,
  durationInFrames: 4993,
} as const;

export const SAFE = 120;
export const CROSSFADE = 30;

export const colors = {
  background: "#FFFFFF",
  text: "#1C1C1E",
  muted: "#4B5563",
  chip: "#F3F4F6",
  panel: "#F9FAFB",
  panelBorder: "#E5E7EB",
  bond: "#047857",
  lonePair: "#B45309",
  positive: "#1D4ED8",
  negative: "#B91C1C",
  resonance: "#6D28D9",
  highlight: "#ECFDF5",
  pitfallFill: "#FEF2F2",
  pitfallBorder: "#FCA5A5",
  pitfallText: "#DC2626",
} as const;

export const type = {
  title: 96,
  subtitle: 64,
  body: 48,
  label: 32,
} as const;

/** Keys match the scene ids in `audio/script.json`. */
export const SCENES = {
  "concept-lewis": { from: 0, to: 809 },
  "procedure-hcn": { from: 809, to: 1841 },
  "formal-charge-co2": { from: 1841, to: 2872 },
  "resonance-o3": { from: 2872, to: 3788 },
  "pitfalls-exceptions": { from: 3788, to: 4693 },
  "closing-card": { from: 4693, to: 4993 },
} as const;

export type NarratedScene = Exclude<keyof typeof SCENES, "closing-card">;
