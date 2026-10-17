import { execFileSync } from "node:child_process";
import { mkdirSync, readFileSync } from "node:fs";

const END_OFFSET = 30;

const timeline = JSON.parse(
  readFileSync(new URL("../src/timeline.json", import.meta.url), "utf8"),
);

/**
 * Mid-narration and settled (after the last word) frame for every narrated
 * scene; middle and last frame of the silent closing card.
 */
const frames = timeline.scenes.flatMap((scene) => {
  if (scene.lineFrames === 0) {
    return [
      Math.floor((scene.from + scene.to) / 2),
      Math.min(scene.to, timeline.durationInFrames) - 1,
    ];
  }
  const lineEnd = scene.lineStart + scene.lineFrames;
  return [
    scene.lineStart + Math.floor(scene.lineFrames / 2),
    Math.min(lineEnd + END_OFFSET, timeline.durationInFrames - 1),
  ];
});

mkdirSync("out/stills", { recursive: true });
for (const frame of frames) {
  const name = `out/stills/frame-${String(frame).padStart(4, "0")}.png`;
  execFileSync(
    "npx",
    [
      "remotion",
      "still",
      "src/index.ts",
      "Hybridisation",
      name,
      `--frame=${frame}`,
    ],
    { stdio: "inherit" },
  );
}
