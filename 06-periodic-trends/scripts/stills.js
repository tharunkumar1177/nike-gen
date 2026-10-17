import { execFileSync } from "node:child_process";
import { mkdirSync, readFileSync } from "node:fs";

const END_OFFSET = 30;

const timeline = JSON.parse(
  readFileSync(new URL("../src/timeline.json", import.meta.url), "utf8"),
);

/** Mid-narration and settled (after the last word) frame for every scene. */
const frames = timeline.scenes.flatMap((scene) => {
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
      "PeriodicTrends",
      name,
      `--frame=${frame}`,
    ],
    { stdio: "inherit" },
  );
}
