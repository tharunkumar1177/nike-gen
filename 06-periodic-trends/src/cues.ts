import script from "../audio/script.json";
import { timing, type SceneId } from "./theme";

const normalize = (word: string) =>
  word.toLowerCase().replace(/[^a-z0-9]/g, "");

const words = (text: string) =>
  text.split(/\s+/).map(normalize).filter(Boolean);

/**
 * Scene-relative frame at which `phrase` is spoken, assuming an even pace
 * across the measured line. Throws if the phrase is not in the narration.
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
  const { from, lineStart, lineFrames } = timing(scene);
  const framesPerWord = lineFrames / spoken.length;
  return Math.round(lineStart - from + index * framesPerWord + offset);
}
