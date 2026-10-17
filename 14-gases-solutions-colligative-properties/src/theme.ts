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
  box: "#E5E9F0",
  gas: "#88C0D0",
  gasText: "#2B7992",
  solvent: "#81A1C1",
  solventText: "#3B607B",
  solute: "#B48EAD",
  soluteText: "#7C5375",
  ion: "#EBCB8B",
  ionText: "#8F6B2E",
  membrane: "#A3BE8C",
  membraneText: "#4A7A40",
  pitfall: "#FFCDD2",
  pitfallText: "#C62828",
  boil: "#C62828",
  freeze: "#1976D2",
} as const;

export const type = {
  title: 96,
  subtitle: 64,
  body: 48,
  label: 32,
} as const;

export const NARRATED_SCENES = [
  "ideal-gas-law",
  "real-gases",
  "molality-vs-molarity",
  "colligative-properties",
  "vapour-pressure",
  "boiling-freezing-points",
  "worked-example-freezing",
  "osmosis-osmotic-pressure",
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
