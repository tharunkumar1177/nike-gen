import { execFileSync } from "node:child_process";
import { mkdirSync } from "node:fs";

const FRAMES = [360, 1170, 2010, 2900, 3840, 4700, 5250];

mkdirSync("out/stills", { recursive: true });
for (const frame of FRAMES) {
  const name = `out/stills/frame-${String(frame).padStart(4, "0")}.png`;
  execFileSync(
    "npx",
    [
      "remotion",
      "still",
      "src/index.ts",
      "PeriodicTableBlocks",
      name,
      `--frame=${frame}`,
    ],
    { stdio: "inherit" },
  );
}
