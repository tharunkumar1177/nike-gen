import { loadFont } from "@remotion/google-fonts/IBMPlexSans";
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

/** Title band geometry from `wireframe.svg`. */
export const BAND = {
  left: SAFE,
  right: VIDEO.width - SAFE,
  top: SAFE,
  bottom: 248,
  rule: 3,
  inset: 32,
  /** First y available to scene content. */
  content: 264,
} as const;

export const colors = {
  background: "#FFFFFF",
  text: "#1C1C1E",
  muted: "#4B5563",
  faint: "#9CA3AF",
  box: "#F3F4F6",
  grid: "#E5E7EB",
  reactant: "#1E40AF",
  reactantFill: "#DBEAFE",
  product: "#047857",
  productFill: "#D1FAE5",
  intermediate: "#B45309",
  intermediateFill: "#FEF3C7",
  catalyst: "#6D28D9",
  catalystFill: "#EDE9FE",
  energy: "#BE123C",
  energyFill: "#FFE4E6",
  pitfall: "#D32F2F",
  pitfallFill: "#F2DEDE",
} as const;

export const type = {
  title: 80,
  heading: 64,
  body: 48,
  small: 32,
} as const;

export const NARRATED_SCENES = [
  "rates-and-rate-laws",
  "initial-rates",
  "collision-theory",
  "reaction-mechanisms",
  "catalysis",
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
