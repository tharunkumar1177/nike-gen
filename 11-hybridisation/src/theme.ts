import { loadFont } from "@remotion/google-fonts/IBMPlexSans";
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

export const SAFE = 100;
export const CROSSFADE = 30;

const TITLE_SIZE = 70;
const LINE_HEIGHT = 1.2;

/** Scene title block from `wireframe.svg`, top-left with no rules. */
export const TITLE = {
  size: TITLE_SIZE,
  /** Left edge: two fifths of the title size in from the safe margin. */
  left: SAFE + TITLE_SIZE * 0.4,
  /** Top edge: one fifth of the title size below the safe margin. */
  top: SAFE + TITLE_SIZE * 0.2,
  subtitleSize: 40,
  /** Space between the title's line box and the subtitle's. */
  subtitleGap: 8,
} as const;

export const TITLE_BOTTOM = TITLE.top + TITLE.size * LINE_HEIGHT;
export const SUBTITLE_TOP = TITLE_BOTTOM + TITLE.subtitleGap;
export const SUBTITLE_BOTTOM =
  SUBTITLE_TOP + TITLE.subtitleSize * LINE_HEIGHT;

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
  title: TITLE_SIZE,
  subtitle: TITLE.subtitleSize,
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
