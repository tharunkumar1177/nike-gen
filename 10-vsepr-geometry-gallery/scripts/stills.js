import { execFileSync } from "node:child_process";
import { mkdirSync } from "node:fs";

const FRAMES = [650, 1750, 3000, 4700, 6100, 7200, 7900];

mkdirSync("out/stills", { recursive: true });
for (const frame of FRAMES) {
  const name = `out/stills/frame-${String(frame).padStart(4, "0")}.png`;
  execFileSync(
    "npx",
    [
      "remotion",
      "still",
      "src/index.ts",
      "VseprGallery",
      name,
      `--frame=${frame}`,
    ],
    { stdio: "inherit" },
  );
}
