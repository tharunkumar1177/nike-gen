import { loadFont } from "@remotion/google-fonts/Roboto";
import timeline from "./timeline.json";

const { fontFamily } = loadFont("normal", {
  weights: ["400", "500", "700"],
  subsets: ["latin", "greek"],
});

export const FONT = fontFamily;

export const VIDEO = {
  width: 1920,
  height: 1080,
  fps: timeline.fps,
  durationInFrames: timeline.durationInFrames,
} as const;

export const SAFE = 120;
export const CROSSFADE = 30;

export const colors = {
  background: "#FFFFFF",
  text: "#1C1C1E",
  muted: "#4C566A",
  panel: "#F4F6F9",
  s: "#88C0D0",
  sText: "#236B8E",
  p: "#B48EAD",
  pText: "#6A4A64",
  hybrid: "#A3BE8C",
  hybridText: "#4A7235",
  lonePair: "#E5E9F0",
  lonePairText: "#4C566A",
  sigma: "#81A1C1",
  sigmaText: "#436080",
  pi: "#B48EAD",
  piText: "#6A4A64",
  caution: "#D08770",
  cautionText: "#9B492E",
} as const;

export const type = {
  title: 96,
  subtitle: 64,
  body: 48,
  label: 32,
} as const;

/** Keys match the scene ids in `audio/script.json`. */
export const SCENE_IDS = [
  "problem-methane",
  "sp3-model",
  "sp2-sp-pi-bonds",
  "expanded-octet",
  "worked-example",
  "pitfalls",
  "closing-card",
] as const;

export type SceneId = (typeof SCENE_IDS)[number];

export type SceneTiming = {
  from: number;
  to: number;
  lineStart: number;
  lineFrames: number;
};

/** Measured scene timing written by `audio/generate.js`. */
export function timing(id: SceneId): SceneTiming {
  const scene = timeline.scenes.find((entry) => entry.id === id);
  if (!scene) {
    throw new Error(`No timeline entry for ${id}.`);
  }
  return scene;
}
