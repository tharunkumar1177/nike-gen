import script from "../audio/script.json";
import { SCENES, type NarratedScene } from "./theme";

/**
 * Kokoro clip lengths in seconds, as logged by `audio/generate.js` in CI.
 * Until measured, these are 0.37 s per word plus 0.2 s between sentences.
 */
const MEASURED_SECONDS: Record<NarratedScene, number> = {
  "concept-hero": 34.1,
  "procedure-steps": 25.3,
  "sn-2-4-gallery": 47.7,
  "sn-5-family": 43.4,
  "sn-6-family": 33.8,
  pitfalls: 24.5,
};

const normalize = (word: string) =>
  word.toLowerCase().replace(/[^a-z0-9]/g, "");

const words = (text: string) =>
  text.split(/\s+/).map(normalize).filter(Boolean);

/**
 * Scene-relative frame at which `phrase` is spoken, assuming an even pace
 * across the line. Throws if the phrase is not in the narration.
 */
export function cue(scene: NarratedScene, phrase: string, offset = 0) {
  const line = script.lines.find((entry) => entry.scene === scene);
  if (!line) {
    throw new Error(`No narration line for ${scene}.`);
  }
  const spoken = words(line.text);
  const target = words(phrase);
  const index = spoken.findIndex((_, i) =>
    target.every((word, j) => spoken[i + j] === word),
  );
  if (index < 0) {
    throw new Error(`"${phrase}" is not in the ${scene} narration.`);
  }
  const framesPerWord = (MEASURED_SECONDS[scene] * script.fps) / spoken.length;
  return Math.round(
    line.startFrame - SCENES[scene].from + index * framesPerWord + offset,
  );
}

/** Scene-relative frame at which the scene's narration ends. */
export function narrationEnd(scene: NarratedScene) {
  const line = script.lines.find((entry) => entry.scene === scene);
  if (!line) {
    throw new Error(`No narration line for ${scene}.`);
  }
  return Math.round(
    line.startFrame - SCENES[scene].from + MEASURED_SECONDS[scene] * script.fps,
  );
}
