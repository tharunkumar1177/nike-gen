// Imported by both the Remotion bundle and Node scripts (via type stripping),
// so this module must stay free of imports and non-erasable TypeScript syntax.

export type TimingScript = {
  fps: number;
  leadFrames: number;
  gapFrames: number;
  closingFrames: number;
  lines: readonly { scene: string; seconds: number }[];
};

export type Span = {
  scene: string;
  from: number;
  to: number;
  /** Absolute frame where the narration line starts. */
  speechFrom: number;
};

/**
 * Lays scenes end to end: each narrated scene lasts its declared speech
 * length plus `gapFrames`, so consecutive lines are separated by exactly
 * `gapFrames` of silence. The silent closing card follows the last scene.
 */
export function layout(script: TimingScript) {
  const spans: Span[] = [];
  let from = 0;
  for (const line of script.lines) {
    const to = from + Math.ceil(line.seconds * script.fps) + script.gapFrames;
    spans.push({
      scene: line.scene,
      from,
      to,
      speechFrom: from + script.leadFrames,
    });
    from = to;
  }
  const closing = { from, to: from + script.closingFrames };
  return { spans, closing, durationInFrames: closing.to };
}
