import { execFileSync } from "node:child_process";
import { mkdirSync } from "node:fs";

const FRAMES = [640, 1420, 2300, 3010, 4040, 5000, 5250];

mkdirSync("out/stills", { recursive: true });
for (const frame of FRAMES) {
  const name = `out/stills/frame-${String(frame).padStart(4, "0")}.png`;
  execFileSync(
    "npx",
    ["remotion", "still", "src/index.ts", "Bonding", name, `--frame=${frame}`],
    { stdio: "inherit" },
  );
}
