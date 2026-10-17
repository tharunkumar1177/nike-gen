import { execFileSync } from "node:child_process";
import { mkdirSync, readFileSync } from "node:fs";

const timeline = JSON.parse(readFileSync("src/timeline.json", "utf8"));

// Mid-narration and just before each narration ends, plus the closing card.
const frames = timeline.lines.flatMap((line) => [
  Math.round((line.startFrame + line.endFrame) / 2),
  line.endFrame - 20,
]);
frames.push(timeline.scenes["closing-card"].to - 40);

mkdirSync("out/stills", { recursive: true });
for (const frame of frames) {
  const name = `out/stills/frame-${String(frame).padStart(4, "0")}.png`;
  execFileSync(
    "npx",
    [
      "remotion",
      "still",
      "src/index.ts",
      "VseprGallery",
      name,
      `--frame=${frame}`,
    ],
    { stdio: "inherit" },
  );
}
