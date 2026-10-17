import script from "../audio/script.json";
import { SCENES, type SceneId } from "./theme";

/** Kokoro clip lengths in seconds, as logged by `audio/generate.js` in CI. */
const MEASURED_SECONDS: Record<SceneId, number> = {
  "hook-o2-magnet": 11.97,
  "lcao-bond-order": 26.07,
  "period-2-orbitals": 13.43,
  "sp-mixing": 19.8,
  "filling-o2-b2": 25.77,
  "worked-example-o2-series": 25.23,
  pitfalls: 15.13,
  "key-takeaways": 16.5,
};

const normalize = (word: string) =>
  word.toLowerCase().replace(/[^a-z0-9]/g, "");

const words = (text: string) =>
  text.split(/\s+/).map(normalize).filter(Boolean);

/**
 * Scene-relative frame at which `phrase` is spoken, assuming an even pace
 * across the line. Throws if the phrase is not in the narration.
 */
export function cue(scene: SceneId, phrase: string, offset = 0) {
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
