import { execFileSync } from "node:child_process";
import { mkdirSync } from "node:fs";

const FRAMES = [700, 1530, 2180, 3100, 3920, 4640, 4950];

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
