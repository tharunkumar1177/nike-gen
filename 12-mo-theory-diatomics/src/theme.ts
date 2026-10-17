import { loadFont } from "@remotion/google-fonts/Roboto";

const { fontFamily } = loadFont("normal", {
  weights: ["400", "500", "700"],
  subsets: ["latin", "greek", "math"],
});

export const FONT = fontFamily;

export const VIDEO = {
  width: 1920,
  height: 1080,
  fps: 30,
  durationInFrames: 5850,
} as const;

export const SAFE = 120;
export const CROSSFADE = 30;

export const colors = {
  background: "#FFFFFF",
  text: "#1C1C1E",
  axis: "#4C566A",
  box: "#E5E9F0",
  bonding: "#88C0D0",
  bondingText: "#2B7992",
  antibonding: "#D08770",
  antibondingText: "#A55B46",
  sigma: "#B48EAD",
  sigmaText: "#7C5375",
  pi: "#A3BE8C",
  piText: "#4A7A40",
  unpaired: "#D32F2F",
} as const;

export const type = {
  title: 96,
  subtitle: 64,
  body: 48,
  label: 32,
} as const;

/** Keys match the scene ids in `audio/script.json`. */
export const SCENES = {
  "hook-o2-magnet": { from: 0, to: 450 },
  "lcao-bond-order": { from: 450, to: 1530 },
  "period-2-orbitals": { from: 1530, to: 2040 },
  "sp-mixing": { from: 2040, to: 2790 },
  "filling-o2-b2": { from: 2790, to: 3720 },
  "worked-example-o2-series": { from: 3720, to: 4710 },
  pitfalls: { from: 4710, to: 5250 },
  "key-takeaways": { from: 5250, to: 5850 },
} as const;

export type SceneId = keyof typeof SCENES;
