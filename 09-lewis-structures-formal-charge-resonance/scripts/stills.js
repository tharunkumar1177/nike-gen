import { execFileSync } from "node:child_process";
import { mkdirSync } from "node:fs";

const FRAMES = [769, 1460, 1800, 2830, 3745, 4650, 4950];

mkdirSync("out/stills", { recursive: true });
for (const frame of FRAMES) {
  const name = `out/stills/frame-${String(frame).padStart(4, "0")}.png`;
  execFileSync(
    "npx",
    ["remotion", "still", "src/index.ts", "Lewis", name, `--frame=${frame}`],
    { stdio: "inherit" },
  );
}
