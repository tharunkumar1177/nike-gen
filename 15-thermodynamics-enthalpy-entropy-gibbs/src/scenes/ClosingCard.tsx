import { AbsoluteFill, useVideoConfig } from "remotion";
import { fadeIn, lerp, pop } from "../components/anim";
import { useSceneFrame } from "../components/SceneFrame";
import { Sub } from "../components/Text";
import { colors, FONT, type, VIDEO } from "../theme";

const CARD = { left: 160, top: 200, width: 1600, height: 680 } as const;

const TAKEAWAYS = [
  { text: <>ΔH: heat exchanged at constant pressure.</>, at: 60 },
  {
    text: (
      <>
        ΔS: dispersal of matter and energy; ΔS<Sub>univ</Sub> &gt; 0 when
        spontaneous.
      </>
    ),
    at: 90,
  },
  { text: <>ΔG = ΔH − TΔS; ΔG &lt; 0 means spontaneous.</>, at: 120 },
  { text: <>Signs of ΔH and ΔS set the temperature dependence.</>, at: 150 },
];

export function ClosingCard() {
  const frame = useSceneFrame();
  const { fps } = useVideoConfig();
  const rise = pop(frame, fps, 30);
  return (
    <AbsoluteFill>
      <div
        style={{
          position: "absolute",
          left: CARD.left,
          top: CARD.top,
          width: CARD.width,
          height: CARD.height,
          boxSizing: "border-box",
          padding: "64px 80px 0",
          background: colors.box,
          border: `3px solid ${colors.muted}`,
          borderRadius: 24,
          transform: `translateY(${lerp(VIDEO.height - CARD.top, 0, rise)}px)`,
          fontFamily: FONT,
          color: colors.text,
        }}
      >
        <div style={{ fontSize: type.title, fontWeight: 700, lineHeight: 1 }}>
          Key Takeaways
        </div>
        <ul
          style={{
            margin: "48px 0 0",
            paddingLeft: 48,
            display: "flex",
            flexDirection: "column",
            gap: 32,
          }}
        >
          {TAKEAWAYS.map(({ text, at }) => {
            const shown = fadeIn(frame, at);
            return (
              <li
                key={at}
                style={{
                  fontSize: type.body,
                  lineHeight: 1.2,
                  opacity: shown,
                  transform: `translateY(${lerp(20, 0, shown)}px)`,
                }}
              >
                {text}
              </li>
            );
          })}
        </ul>
      </div>
    </AbsoluteFill>
  );
}
