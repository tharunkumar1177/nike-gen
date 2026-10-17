import { execFileSync } from "node:child_process";
import { mkdirSync } from "node:fs";

const FRAMES = [770, 1300, 1880, 2950, 3980, 4860, 5150];

mkdirSync("out/stills", { recursive: true });
for (const frame of FRAMES) {
  const name = `out/stills/frame-${String(frame).padStart(4, "0")}.png`;
  execFileSync(
    "npx",
    ["remotion", "still", "src/index.ts", "Lewis", name, `--frame=${frame}`],
    { stdio: "inherit" },
  );
}
