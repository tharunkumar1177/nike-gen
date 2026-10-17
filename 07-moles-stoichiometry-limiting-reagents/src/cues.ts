import script from "../audio/script.json";
import { SCENES, type NarratedScene } from "./theme";

const normalize = (word: string) =>
  word.toLowerCase().replace(/[^a-z0-9]/g, "");

const words = (text: string) =>
  text.split(/\s+/).map(normalize).filter(Boolean);

/**
 * Scene-relative frame at which `phrase` is spoken, assuming an even pace
 * across the line's declared length. Throws if the phrase is not in the narration.
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
  const span = SCENES[scene];
  const framesPerWord = (line.seconds * script.fps) / spoken.length;
  return Math.round(
    span.speechFrom - span.from + index * framesPerWord + offset,
  );
}
