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
  f: "#EBCB8B",
  fText: "#9A7A3A",
} as const;

export type Block = "s" | "p" | "d" | "f";

export const blockColors: Record<Block, { fill: string; text: string }> = {
  s: { fill: colors.s, text: colors.sText },
  p: { fill: colors.p, text: colors.pText },
  d: { fill: colors.d, text: colors.dText },
  f: { fill: colors.f, text: colors.fText },
};

export const type = {
  title: 96,
  subtitle: 64,
  body: 48,
  label: 32,
} as const;

/** Keys match the scene ids in `audio/script.json`. */
export const SCENES = {
  "ordering-groups": { from: 0, to: 720 },
  "building-blocks": { from: 720, to: 1600 },
  "special-cases": { from: 1600, to: 2350 },
  "offsets-exceptions": { from: 2350, to: 3320 },
  "example-phosphorus": { from: 3320, to: 4210 },
  "example-vanadium": { from: 4210, to: 5040 },
  "closing-card": { from: 5040, to: 5400 },
} as const;

export type NarratedScene = Exclude<keyof typeof SCENES, "closing-card">;
