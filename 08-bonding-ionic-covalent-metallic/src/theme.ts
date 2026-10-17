import { loadFont } from "@remotion/google-fonts/Roboto";

const { fontFamily } = loadFont("normal", {
  weights: ["400", "500", "700"],
  subsets: ["latin", "greek"],
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
  muted: "#4B5563",
  axis: "#1C1C1E",
  chip: "#F3F4F6",
  atomFill: "#F9FAFB",
  atomStroke: "#4B5563",
  covalent: "#10B981",
  covalentText: "#047857",
  ionic: "#8B5CF6",
  ionicText: "#6D28D9",
  metallic: "#F97316",
  metallicText: "#C2410C",
  electron: "#F59E0B",
  electronText: "#B45309",
  cation: "#3B82F6",
  cationText: "#1D4ED8",
  anion: "#EF4444",
  anionText: "#B91C1C",
  pitfallFill: "#FEF2F2",
  pitfallBorder: "#FCA5A5",
  pitfallText: "#DC2626",
} as const;

export const type = {
  title: 96,
  subtitle: 64,
  body: 48,
  label: 32,
} as const;

/** Keys match the scene ids in `audio/script.json`. */
export const SCENES = {
  "concept-energy": { from: 0, to: 739 },
  "covalent-shared": { from: 739, to: 1502 },
  "ionic-lattice": { from: 1502, to: 2384 },
  "metallic-sea": { from: 2384, to: 3111 },
  "electronegativity-scale": { from: 3111, to: 4128 },
  "properties-pitfalls": { from: 4128, to: 5100 },
  "closing-card": { from: 5100, to: 5400 },
} as const;

export type NarratedScene = Exclude<keyof typeof SCENES, "closing-card">;
