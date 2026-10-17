import script from "../audio/script.json";
import { SCENES, type NarratedScene } from "./theme";

/** Kokoro clip lengths in seconds, as logged by `audio/generate.js` in CI. */
const MEASURED_SECONDS: Record<NarratedScene, number> = {
  "ordering-groups": 19.3,
  "building-blocks": 20.65,
  "special-cases": 16.23,
  "offsets-exceptions": 23.48,
  "example-phosphorus": 21.45,
  "example-vanadium": 19.65,
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
