import { execFileSync } from "node:child_process";
import { mkdirSync } from "node:fs";

const FRAMES = [640, 1560, 2270, 3260, 4170, 5000, 5300];

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
