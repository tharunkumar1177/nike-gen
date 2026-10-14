import { execFileSync } from "node:child_process";
import { mkdirSync } from "node:fs";

const FRAMES = [450, 1250, 1800, 2500, 3460, 4200, 4980, 5250];

mkdirSync("out/stills", { recursive: true });
for (const frame of FRAMES) {
  const name = `out/stills/frame-${String(frame).padStart(4, "0")}.png`;
  execFileSync(
    "npx",
    [
      "remotion",
      "still",
      "src/index.ts",
      "MatterStates",
      name,
      `--frame=${frame}`,
    ],
    { stdio: "inherit" },
  );
}
