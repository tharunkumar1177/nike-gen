import { loadFont } from "@remotion/google-fonts/Roboto";
import script from "../audio/script.json";
import { layout, type Span } from "./timeline";

const { fontFamily } = loadFont("normal", {
  weights: ["400", "500", "700"],
  subsets: ["latin", "greek"],
});

export const FONT = fontFamily;

const timeline = layout(script);

export const VIDEO = {
  width: 1920,
  height: 1080,
  fps: script.fps,
  durationInFrames: timeline.durationInFrames,
} as const;

export const SAFE = 120;
export const CROSSFADE = 30;
export const HEADING_Y = 150;

export const colors = {
  background: "#FFFFFF",
  text: "#1C1C1E",
  muted: "#4C566A",
  box: "#E5E9F0",
  grid: "#D8DEE9",
  water: "#ECEFF4",
  acid: "#81A1C1",
  acidText: "#4C566A",
  base: "#B48EAD",
  baseText: "#7C5375",
  hydronium: "#BF616A",
  hydroniumText: "#8F3B26",
  hydroxide: "#5E81AC",
  hydroxideInk: "#ECEFF4",
  pka: "#EBCB8B",
  pkaText: "#8F6B2E",
  phenolphthalein: "#F48FB1",
  phenolphthaleinText: "#D81B60",
  methylRed: "#FFCC80",
  methylRedText: "#E65100",
  pitfall: "#D32F2F",
  pitfallFill: "#F2DEDE",
} as const;

export const type = {
  title: 96,
  subtitle: 64,
  body: 48,
  label: 32,
} as const;

export const NARRATED_SCENES = [
  "bronsted-lowry-ph",
  "ka-pka-strength",
  "weak-acid-ice",
  "buffer-mechanism",
  "buffer-vs-water",
  "titration-curve",
  "indicators",
] as const;

export type NarratedScene = (typeof NARRATED_SCENES)[number];

/** Frame range of each scene; keys match the scene ids in `audio/script.json`. */
export const SCENES = Object.fromEntries(
  NARRATED_SCENES.map((id) => {
    const span = timeline.spans.find((entry) => entry.scene === id);
    if (!span) {
      throw new Error(`No narration line for ${id}.`);
    }
    return [id, span];
  }),
) as Record<NarratedScene, Span>;

export const CLOSING = timeline.closing;
