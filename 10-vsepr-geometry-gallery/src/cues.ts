import timeline from "./timeline.json";
import { SCENES, type NarratedScene } from "./theme";

const normalize = (word: string) =>
  word.toLowerCase().replace(/[^a-z0-9]/g, "");

const words = (text: string) =>
  text.split(/\s+/).map(normalize).filter(Boolean);

function lineOf(scene: NarratedScene) {
  const line = timeline.lines.find((entry) => entry.scene === scene);
  if (!line) {
    throw new Error(`No narration line for ${scene}.`);
  }
  return line;
}

/**
 * Scene-relative frame at which `phrase` is spoken, from the measured
 * sentence timings in `timeline.json`, assuming an even pace within each
 * sentence. Throws if the phrase is not in the narration.
 */
export function cue(scene: NarratedScene, phrase: string, offset = 0) {
  const sentences = lineOf(scene).sentences.map((sentence) => ({
    ...sentence,
    words: words(sentence.text),
  }));
  const spoken = sentences.flatMap((sentence) => sentence.words);
  const target = words(phrase);
  const index = spoken.findIndex((_, i) =>
    target.every((word, j) => spoken[i + j] === word),
  );
  if (index < 0) {
    throw new Error(`"${phrase}" is not in the ${scene} narration.`);
  }
  let before = 0;
  for (const sentence of sentences) {
    if (index < before + sentence.words.length) {
      const fraction = (index - before) / sentence.words.length;
      return Math.round(
        sentence.startFrame +
          fraction * sentence.frames -
          SCENES[scene].from +
          offset,
      );
    }
    before += sentence.words.length;
  }
  throw new Error(`"${phrase}" could not be timed in ${scene}.`);
}

/** Scene-relative frame at which the scene's narration ends. */
export function narrationEnd(scene: NarratedScene) {
  return lineOf(scene).endFrame - SCENES[scene].from;
}
