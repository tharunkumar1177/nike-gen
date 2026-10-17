import { Composition } from "remotion";
import { Lesson } from "./Lesson";
import { VIDEO } from "./theme";

export function Root() {
  return (
    <Composition
      id="GasesSolutions"
      component={Lesson}
      durationInFrames={VIDEO.durationInFrames}
      fps={VIDEO.fps}
      width={VIDEO.width}
      height={VIDEO.height}
    />
  );
}
