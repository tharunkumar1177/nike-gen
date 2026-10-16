import { execFileSync } from "node:child_process";
import { mkdirSync } from "node:fs";

const FRAMES = [450, 1350, 2250, 3150, 4050, 4800, 5250];

mkdirSync("out/stills", { recursive: true });
for (const frame of FRAMES) {
  const name = `out/stills/frame-${String(frame).padStart(4, "0")}.png`;
  execFileSync(
    "npx",
    [
      "remotion",
      "still",
      "src/index.ts",
      "ElectronConfiguration",
      name,
      `--frame=${frame}`,
    ],
    { stdio: "inherit" },
  );
}
