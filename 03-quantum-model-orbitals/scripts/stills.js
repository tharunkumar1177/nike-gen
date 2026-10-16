import { execFileSync } from "node:child_process";
import { mkdirSync } from "node:fs";

const FRAMES = [950, 2000, 3350, 4400, 5450, 6500, 7700, 8050];

mkdirSync("out/stills", { recursive: true });
for (const frame of FRAMES) {
  const name = `out/stills/frame-${String(frame).padStart(4, "0")}.png`;
  execFileSync(
    "npx",
    [
      "remotion",
      "still",
      "src/index.ts",
      "QuantumOrbitals",
      name,
      `--frame=${frame}`,
    ],
    { stdio: "inherit" },
  );
}
