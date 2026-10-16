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
  grid: "#E5E9F0",
  solid: "#5E81AC",
  liquid: "#A3BE8C",
  gas: "#D08770",
  accent: "#BF616A",
  endothermic: "#C62828",
  exothermic: "#4A148C",
} as const;

export const type = {
  title: 96,
  subtitle: 64,
  body: 48,
  label: 32,
} as const;

export const SCENES = {
  intro: { from: 0, to: 600 },
  states: { from: 600, to: 1500 },
  changes: { from: 1500, to: 2100 },
  heating: { from: 2100, to: 2910 },
  /** Scenes 5–7 and the closing card share one continuous diagram. */
  diagram: { from: 2910, to: 5400 },
} as const;
