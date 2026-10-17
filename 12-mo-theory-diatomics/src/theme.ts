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
  durationInFrames: 5790,
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
  "hook-o2-magnet": { from: 0, to: 480 },
  "lcao-bond-order": { from: 480, to: 1410 },
  "period-2-orbitals": { from: 1410, to: 1950 },
  "sp-mixing": { from: 1950, to: 2670 },
  "filling-o2-b2": { from: 2670, to: 3570 },
  "worked-example-o2-series": { from: 3570, to: 4470 },
  pitfalls: { from: 4470, to: 5070 },
  "key-takeaways": { from: 5070, to: 5790 },
} as const;

export type SceneId = keyof typeof SCENES;
