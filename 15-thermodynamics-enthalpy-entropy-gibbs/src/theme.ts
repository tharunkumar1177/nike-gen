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

export const colors = {
  background: "#FFFFFF",
  text: "#1C1C1E",
  muted: "#4C566A",
  box: "#ECEFF4",
  enthalpy: "#FFCDD2",
  enthalpyText: "#B71C1C",
  entropy: "#C8E6C9",
  entropyText: "#2E7D32",
  gibbs: "#BBDEFB",
  gibbsText: "#1565C0",
  exothermic: "#FFE0B2",
  exothermicText: "#B23C00",
  endothermic: "#E1BEE7",
  endothermicText: "#6A1B9A",
  spontaneous: "#B2DFDB",
  spontaneousText: "#00695C",
  nonSpontaneous: "#FFCCBC",
  nonSpontaneousText: "#BF360C",
  temperatureDependent: "#FFF9C4",
  temperatureDependentText: "#8A5A00",
  pitfall: "#FFCDD2",
  pitfallText: "#D32F2F",
} as const;

export const type = {
  title: 96,
  subtitle: 64,
  body: 48,
  label: 32,
} as const;

export const NARRATED_SCENES = [
  "system-surroundings-enthalpy",
  "hess-law",
  "entropy",
  "second-law",
  "gibbs-free-energy",
  "four-sign-cases",
  "worked-example-enthalpy-entropy",
  "worked-example-gibbs",
  "crossover-temperature",
  "pitfalls",
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
