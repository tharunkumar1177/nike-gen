import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, pop } from "../components/anim";
import { Title } from "../components/Panels";
import { Sup } from "../components/Script";
import { Text } from "../components/Text";
import { cue } from "../cues";
import { IONS } from "../data";
import { colors, FONT, SAFE, type, VIDEO } from "../theme";

const SCENE = "worked-example";

const LIST = cue(SCENE, "Let's rank an isoelectronic series");
const ELECTRONS = cue(SCENE, "These all have ten electrons");
const PROTONS = cue(SCENE, "eight protons in oxide to thirteen");
const ANSWER = cue(SCENE, "aluminum three plus ion is the smallest");

/** Circle radius in px per pm of ionic radius. */
const PX_PER_PM = 1;
const CENTERS = [300, 620, 890, 1100, 1260] as const;
const CIRCLE_Y = 650;

const IONS_ON_SCREEN = IONS.map((ion, index) => ({
  ...ion,
  x: CENTERS[index] ?? 0,
  r: ion.radius * PX_PER_PM,
}));

function Ion({ symbol, charge }: { symbol: string; charge: string }) {
  return (
    <>
      {symbol}
      <Sup>{charge}</Sup>
    </>
  );
}

function IonList() {
  return IONS.map((ion, index) => (
    <span key={ion.symbol}>
      {index > 0 ? ", " : ""}
      <Ion symbol={ion.symbol} charge={ion.charge} />
    </span>
  ));
}

const STEP = {
  position: "absolute",
  left: SAFE,
  fontFamily: FONT,
  fontSize: type.body,
  lineHeight: 1.2,
  color: colors.text,
  whiteSpace: "nowrap",
} as const;

export function WorkedExampleScene() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const list = fadeIn(frame, LIST);
  const electrons = fadeIn(frame, ELECTRONS);
  const protons = fadeIn(frame, PROTONS);
  const answer = fadeIn(frame, ANSWER);
  const ring = pop(frame, fps, ANSWER);
  const smallest = IONS_ON_SCREEN[IONS_ON_SCREEN.length - 1];
  return (
    <AbsoluteFill>
      <Title>Worked Example: Rank by Radius</Title>

      <div style={{ ...STEP, top: 256, opacity: list }}>
        Ions: <IonList />
      </div>
      <div style={{ ...STEP, top: 336 }}>
        <span style={{ opacity: electrons }}>10 electrons each. </span>
        <span style={{ opacity: protons }}>
          Protons: {IONS.map((ion) => ion.protons).join(", ")}
        </span>
      </div>

      <svg
        width={VIDEO.width}
        height={VIDEO.height}
        style={{ position: "absolute", left: 0, top: 0 }}
      >
        {IONS_ON_SCREEN.map(({ symbol, x, r }, index) => (
          <circle
            key={symbol}
            cx={x}
            cy={CIRCLE_Y}
            r={r * Math.max(0, pop(frame, fps, PROTONS + index * 4))}
            fill={colors.radius}
          />
        ))}
        {smallest ? (
          <circle
            cx={smallest.x}
            cy={CIRCLE_Y}
            r={smallest.r + 10 * ring}
            fill="none"
            stroke={colors.radiusText}
            strokeWidth={5}
            opacity={Math.min(1, ring)}
          />
        ) : null}
      </svg>
      {IONS_ON_SCREEN.map(({ symbol, charge, radius, x }, index) => {
        const shown = fadeIn(frame, PROTONS + index * 4 + 10);
        return (
          <div key={symbol}>
            <Text
              x={x}
              y={CIRCLE_Y - 14}
              size={type.label}
              weight={700}
              opacity={shown}
            >
              <Ion symbol={symbol} charge={charge} />
            </Text>
            <Text x={x} y={CIRCLE_Y + 24} size={24} opacity={shown}>
              {radius} pm
            </Text>
          </div>
        );
      })}

      <Text
        x={SAFE}
        y={830}
        size={type.label}
        color={colors.axis}
        anchor="start"
        opacity={protons}
      >
        Scale: 1 pm = 1 px radius
      </Text>
      <Text
        x={SAFE}
        y={900}
        size={type.body}
        weight={700}
        color={colors.radiusText}
        anchor="start"
        opacity={answer}
      >
        Answer: <Ion symbol="Al" charge="3+" /> is the smallest
      </Text>
    </AbsoluteFill>
  );
}
