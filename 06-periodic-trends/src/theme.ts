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
  fps: timeline.fps,
  durationInFrames: timeline.durationInFrames,
} as const;

export const SAFE = 120;
export const CROSSFADE = 30;

export const colors = {
  background: "#FFFFFF",
  text: "#1C1C1E",
  axis: "#4C566A",
  tile: "#E5E9F0",
  radius: "#88C0D0",
  radiusText: "#2B7992",
  ie: "#D08770",
  ieText: "#A55B46",
  ea: "#B48EAD",
  eaText: "#7C5375",
  en: "#A3BE8C",
  enText: "#4A7A40",
  forbidden: "#D32F2F",
} as const;

export const type = {
  title: 96,
  subtitle: 64,
  body: 48,
  label: 32,
} as const;

/** Keys match the scene ids in `audio/script.json`. */
export const SCENE_IDS = [
  "model-zeff",
  "atomic-radius",
  "ionization-energy",
  "electron-affinity",
  "electronegativity",
  "worked-example",
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
