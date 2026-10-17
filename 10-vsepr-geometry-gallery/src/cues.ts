import script from "../audio/script.json";
import { SCENES, type NarratedScene } from "./theme";

/**
 * Kokoro clip lengths in seconds, as logged by `audio/generate.js` in CI.
 * Until measured, these are word counts at 2.5 words per second.
 */
const MEASURED_SECONDS: Record<NarratedScene, number> = {
  "concept-hero": 35.6,
  "procedure-steps": 24.8,
  "sn-2-4-gallery": 50,
  "sn-5-family": 45.6,
  "sn-6-family": 35.2,
  pitfalls: 26.8,
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
