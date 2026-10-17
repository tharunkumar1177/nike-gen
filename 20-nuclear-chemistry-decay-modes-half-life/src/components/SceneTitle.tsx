import { fadeIn, lerp } from "./anim";
import { useSceneFrame } from "./SceneFrame";
import { colors, FONT, TITLE, TITLE_BOTTOM } from "../theme";

function Rule({ y }: { y: number }) {
  return (
    <div
      style={{
        position: "absolute",
        left: TITLE.left,
        top: y - TITLE.ruleWidth / 2,
        width: TITLE.right - TITLE.left,
        height: TITLE.ruleWidth,
        background: colors.text,
      }}
    />
  );
}

/** Scene title set between two full-width rules at the top-left of the frame. */
export function SceneTitle({ children }: { children: string }) {
  const frame = useSceneFrame();
  const reveal = fadeIn(frame, 0);
  return (
    <>
      <Rule y={TITLE.top} />
      <div
        style={{
          position: "absolute",
          left: TITLE.left + TITLE.inset,
          top: TITLE.top + TITLE.padding,
          fontFamily: FONT,
          fontSize: TITLE.size,
          fontWeight: 700,
          lineHeight: 1.2,
          color: colors.text,
          whiteSpace: "nowrap",
          opacity: reveal,
          transform: `translateX(${lerp(-24, 0, reveal)}px)`,
        }}
      >
        {children}
      </div>
      <Rule y={TITLE_BOTTOM} />
    </>
  );
}
