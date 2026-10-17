import { execFileSync } from "node:child_process";
import { mkdirSync } from "node:fs";

const FRAMES = [400, 1200, 2000, 2800, 3700, 4700, 5250];

mkdirSync("out/stills", { recursive: true });
for (const frame of FRAMES) {
  const name = `out/stills/frame-${String(frame).padStart(4, "0")}.png`;
  execFileSync(
    "npx",
    ["remotion", "still", "src/index.ts", "Bonding", name, `--frame=${frame}`],
    { stdio: "inherit" },
  );
}
