import { loadFont } from "@remotion/google-fonts/Roboto";
import script from "../audio/script.json";
import { layout, type Span } from "./timeline";

const { fontFamily } = loadFont("normal", {
  weights: ["400", "500", "700"],
  subsets: ["latin"],
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

export const colors = {
  background: "#FFFFFF",
  text: "#1C1C1E",
  muted: "#4C566A",
  box: "#E5E9F0",
  h2: "#88C0D0",
  h2Text: "#2B7992",
  o2: "#B48EAD",
  o2Text: "#7C5375",
  h2o: "#A3BE8C",
  h2oText: "#4A7A40",
  limiting: "#D08770",
  limitingText: "#A55B46",
  excess: "#EBCB8B",
  excessText: "#8F6B2E",
  pitfall: "#D32F2F",
} as const;

export const type = {
  title: 96,
  subtitle: 64,
  body: 48,
  label: 32,
} as const;

export const NARRATED_SCENES = [
  "the-mole",
  "molar-mass-map",
  "mole-ratios",
  "limiting-reagent",
  "identifying-limiting",
  "theoretical-yield",
  "percent-yield-pitfalls",
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
