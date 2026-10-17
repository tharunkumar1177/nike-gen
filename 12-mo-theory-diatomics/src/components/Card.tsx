import type { ReactNode } from "react";
import { spring, useVideoConfig } from "remotion";
import { colors, FONT, type, VIDEO } from "../theme";
import { lerp, progress } from "./anim";
import { useSceneFrame } from "./SceneFrame";

export type CardItem = { text: ReactNode; at: number };

type Props = {
  box: { left: number; top: number; width: number; height: number };
  border: string;
  title: string;
  /** Optional icon drawn before the title. */
  titleIcon?: ReactNode;
  /** Icon drawn before each bullet. */
  bulletIcon: ReactNode;
  items: readonly CardItem[];
};

export function Card({
  box,
  border,
  title,
  titleIcon,
  bulletIcon,
  items,
}: Props) {
  const frame = useSceneFrame();
  const { fps } = useVideoConfig();
  const rise = spring({
    frame: frame - 15,
    fps,
    config: { stiffness: 120, damping: 14, mass: 1 },
  });
  return (
    <div
      style={{
        position: "absolute",
        left: box.left,
        top: box.top,
        width: box.width,
        height: box.height,
        boxSizing: "border-box",
        padding: "70px 80px 0",
        background: colors.background,
        border: `8px solid ${border}`,
        borderRadius: 24,
        transform: `translateY(${lerp(VIDEO.height - box.top, 0, rise)}px)`,
        fontFamily: FONT,
        color: colors.text,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 24,
          fontSize: type.subtitle,
          fontWeight: 700,
          lineHeight: 1,
        }}
      >
        {titleIcon}
        {title}
      </div>
      <div
        style={{
          marginTop: 56,
          paddingLeft: 48,
          display: "flex",
          flexDirection: "column",
          gap: 42,
        }}
      >
        {items.map(({ text, at }, i) => {
          const shown = progress(frame, at, at + 30);
          return (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 24,
                fontSize: type.body,
                lineHeight: 1.2,
                opacity: shown,
                transform: `translateY(${lerp(20, 0, shown)}px)`,
              }}
            >
              <div style={{ flexShrink: 0, display: "flex" }}>{bulletIcon}</div>
              <div>{text}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
