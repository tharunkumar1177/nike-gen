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
  durationInFrames: 8100,
} as const;

export const SAFE = 120;
export const CROSSFADE = 30;

export const colors = {
  background: "#FFFFFF",
  text: "#1C1C1E",
  axis: "#4C566A",
  grid: "#E5E9F0",
  positive: "#1E88E5",
  negative: "#FFC107",
  node: "#9E9E9E",
} as const;

export const type = {
  title: 96,
  subtitle: 64,
  body: 48,
  label: 32,
} as const;

export const SCENES = {
  orbits: { from: 0, to: 1050 },
  numbers: { from: 1050, to: 2100 },
  sOrbitals: { from: 2100, to: 3450 },
  pOrbitals: { from: 3450, to: 4500 },
  dOrbitals: { from: 4500, to: 5550 },
  fOrbitals: { from: 5550, to: 6600 },
  nodes: { from: 6600, to: 7800 },
  closing: { from: 7800, to: 8100 },
} as const;
