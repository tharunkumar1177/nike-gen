import { fadeIn, lerp } from "./anim";
import { useSceneFrame } from "./SceneFrame";
import { BAND, colors, FONT, SAFE, type, VIDEO } from "../theme";

function Rule({ y }: { y: number }) {
  return (
    <div
      style={{
        position: "absolute",
        left: SAFE,
        top: y - BAND.rule / 2,
        width: VIDEO.width - 2 * SAFE,
        height: BAND.rule,
        background: colors.rule,
      }}
    />
  );
}

/** Scene title between two safe-width rules at the top-left (wireframe.svg). */
export function TitleBand({ children }: { children: string }) {
  const frame = useSceneFrame();
  const reveal = fadeIn(frame, 0);
  return (
    <>
      <Rule y={BAND.top} />
      <div
        style={{
          position: "absolute",
          left: SAFE + BAND.inset,
          top: BAND.top + type.title / 5,
          fontFamily: FONT,
          fontSize: type.title,
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
      <Rule y={BAND.bottom} />
    </>
  );
}
