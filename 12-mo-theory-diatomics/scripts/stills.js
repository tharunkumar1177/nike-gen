import { execFileSync } from "node:child_process";
import { mkdirSync } from "node:fs";

const FRAMES = [400, 1480, 1990, 2740, 3670, 4660, 5200, 5800];

mkdirSync("out/stills", { recursive: true });
for (const frame of FRAMES) {
  const name = `out/stills/frame-${String(frame).padStart(4, "0")}.png`;
  execFileSync(
    "npx",
    ["remotion", "still", "src/index.ts", "MoTheory", name, `--frame=${frame}`],
    { stdio: "inherit" },
  );
}
