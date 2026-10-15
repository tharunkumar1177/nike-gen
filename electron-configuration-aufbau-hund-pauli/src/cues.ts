import script from "../audio/script.json";
import { SCENES, type NarratedScene } from "./theme";

/** Narration pace per scene, in frames per word. */
const FRAMES_PER_WORD: Record<NarratedScene, number> = {
  "orbitals-pauli": 12.5,
  "aufbau-diagonal": 12.5,
  "hunds-rule": 12.5,
  "notation-order": 12.5,
  "shorthand-ions": 12.5,
  "chromium-copper": 12.5,
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
  return Math.round(
    line.startFrame -
      SCENES[scene].from +
      index * FRAMES_PER_WORD[scene] +
      offset,
  );
}
