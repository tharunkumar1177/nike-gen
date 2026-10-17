import { execFileSync } from "node:child_process";
import { mkdirSync } from "node:fs";

const FRAMES = [410, 1340, 1880, 2600, 3500, 4400, 5000, 5700];

mkdirSync("out/stills", { recursive: true });
for (const frame of FRAMES) {
  const name = `out/stills/frame-${String(frame).padStart(4, "0")}.png`;
  execFileSync(
    "npx",
    ["remotion", "still", "src/index.ts", "MoTheory", name, `--frame=${frame}`],
    { stdio: "inherit" },
  );
}
