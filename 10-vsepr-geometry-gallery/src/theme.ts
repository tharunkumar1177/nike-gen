import { loadFont } from "@remotion/google-fonts/Roboto";
import timeline from "./timeline.json";

const { fontFamily } = loadFont("normal", {
  weights: ["400", "500", "700"],
  subsets: ["latin"],
});

export const FONT = fontFamily;

export const VIDEO = {
  width: 1920,
  height: 1080,
  fps: 30,
  durationInFrames: timeline.durationInFrames,
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

/**
 * Scene windows laid out by `audio/generate.js` from the measured narration;
 * keys match the scene ids in `audio/script.json`.
 */
export const SCENES = timeline.scenes;

export type NarratedScene = Exclude<keyof typeof SCENES, "closing-card">;
