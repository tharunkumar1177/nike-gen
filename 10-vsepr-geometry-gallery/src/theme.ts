import { loadFont } from "@remotion/google-fonts/Roboto";

const { fontFamily } = loadFont("normal", {
  weights: ["400", "500", "700"],
  subsets: ["latin"],
});

export const FONT = fontFamily;

export const VIDEO = {
  width: 1920,
  height: 1080,
  fps: 30,
  durationInFrames: 8100,
} as const;

export const SAFE = 120;
export const CROSSFADE = 30;

export const colors = {
  background: "#FFFFFF",
  text: "#1C1C1E",
  muted: "#616161",
  central: "#424242",
  halogen: "#4CAF50",
  halogenText: "#2E7D32",
  oxygen: "#E53935",
  hydrogen: "#B0BEC5",
  other: "#1E88E5",
  bond: "#9E9E9E",
  lonePair: "#FFC107",
  lonePairText: "#8D6E00",
  frame: "#E0E0E0",
  angle: "#00897B",
  highlight: "#1E88E5",
  pitfall: "#D81B60",
  card: "#F5F7FA",
  cardBorder: "#E0E0E0",
} as const;

export const type = {
  title: 96,
  subtitle: 64,
  body: 48,
  label: 32,
} as const;

/** Keys match the scene ids in `audio/script.json`. */
export const SCENES = {
  "concept-hero": { from: 0, to: 1300 },
  "procedure-steps": { from: 1300, to: 2200 },
  "sn-2-4-gallery": { from: 2200, to: 3950 },
  "sn-5-family": { from: 3950, to: 5500 },
  "sn-6-family": { from: 5500, to: 6750 },
  pitfalls: { from: 6750, to: 7750 },
  "closing-card": { from: 7750, to: 8100 },
} as const;

export type NarratedScene = Exclude<keyof typeof SCENES, "closing-card">;
