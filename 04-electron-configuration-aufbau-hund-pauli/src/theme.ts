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
  durationInFrames: 5400,
} as const;

export const SAFE = 120;
export const CROSSFADE = 30;

export const colors = {
  background: "#FFFFFF",
  text: "#1C1C1E",
  axis: "#4C566A",
  box: "#E5E9F0",
  s: "#88C0D0",
  sText: "#2B7992",
  p: "#B48EAD",
  pText: "#7C5375",
  d: "#A3BE8C",
  dText: "#4A7A40",
  spin: "#4C566A",
  forbidden: "#D32F2F",
  higher: "#D08770",
  higherText: "#A55B46",
} as const;

export const type = {
  title: 96,
  subtitle: 64,
  body: 48,
  label: 32,
} as const;

/** Keys match the scene ids in `audio/script.json`. */
export const SCENES = {
  "orbitals-pauli": { from: 0, to: 900 },
  "aufbau-diagonal": { from: 900, to: 1750 },
  "hunds-rule": { from: 1750, to: 2700 },
  "notation-order": { from: 2700, to: 3600 },
  "shorthand-ions": { from: 3600, to: 4500 },
  "chromium-copper": { from: 4500, to: 5100 },
  "closing-card": { from: 5100, to: 5400 },
} as const;

export type NarratedScene = Exclude<keyof typeof SCENES, "closing-card">;
