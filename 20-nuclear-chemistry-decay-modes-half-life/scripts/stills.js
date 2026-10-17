import { execFileSync } from "node:child_process";
import { mkdirSync, readFileSync } from "node:fs";
import { layout } from "../src/timeline.ts";

const script = JSON.parse(
  readFileSync(new URL("../audio/script.json", import.meta.url), "utf8"),
);
const { spans, closing } = layout(script);

// The last fully built frame of each scene, before its outgoing crossfade.
const FRAMES = [...spans, closing].map(({ to }) => to - 30);

mkdirSync("out/stills", { recursive: true });
for (const frame of FRAMES) {
  const name = `out/stills/frame-${String(frame).padStart(4, "0")}.png`;
  execFileSync(
    "npx",
    [
      "remotion",
      "still",
      "src/index.ts",
      "NuclearDecay",
      name,
      `--frame=${frame}`,
    ],
    { stdio: "inherit" },
  );
}
