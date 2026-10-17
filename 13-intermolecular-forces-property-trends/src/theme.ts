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
  covalent: "#4C566A",
  dispersion: "#88C0D0",
  dispersionText: "#2B7992",
  dipole: "#B48EAD",
  dipoleText: "#7C5375",
  hbond: "#A3BE8C",
  hbondText: "#4A7A40",
  deltaPlus: "#81A1C1",
  deltaPlusText: "#3E6A99",
  deltaMinus: "#D08770",
  deltaMinusText: "#A55B46",
  pitfall: "#D32F2F",
  pitfallFill: "#FFEBEE",
} as const;

export const type = {
  title: 96,
  subtitle: 64,
  body: 48,
  label: 32,
} as const;

export const NARRATED_SCENES = [
  "intra-vs-inter",
  "london-dispersion",
  "dipole-dipole",
  "hydrogen-bonding",
  "property-trends",
  "worked-example",
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
