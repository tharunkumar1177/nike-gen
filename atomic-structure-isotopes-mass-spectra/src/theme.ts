import { loadFont } from "@remotion/google-fonts/Roboto";

const { fontFamily } = loadFont("normal", {
  weights: ["400", "500", "700"],
  subsets: ["latin"],
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
  axis: "#4C566A",
  grid: "#E5E9F0",
  proton: "#BF616A",
  protonText: "#99414B",
  neutron: "#5E81AC",
  electron: "#D08770",
  electronText: "#A55B46",
  cl35: "#A3BE8C",
  cl35Text: "#4A7A40",
  cl37: "#B48EAD",
  cl37Text: "#7C5375",
  accent: "#88C0D0",
  accentText: "#2B7992",
  error: "#D32F2F",
} as const;

export const type = {
  title: 96,
  subtitle: 64,
  body: 48,
  label: 32,
} as const;

export const SCENES = {
  particles: { from: 0, to: 900 },
  isotopes: { from: 900, to: 1800 },
  spectrometer: { from: 1800, to: 2650 },
  spectrum: { from: 2650, to: 3450 },
  /** Scenes 5 and 6 share one continuous grid and number line. */
  average: { from: 3450, to: 5100 },
  closing: { from: 5100, to: 5400 },
} as const;
