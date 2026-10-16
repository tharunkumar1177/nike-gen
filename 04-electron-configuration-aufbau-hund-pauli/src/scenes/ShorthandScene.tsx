import type { CSSProperties, ReactNode } from "react";
import { AbsoluteFill } from "remotion";
import { easeInOut, fadeIn, lerp, progress } from "../components/anim";
import { Sup, Term } from "../components/Config";
import { BOX, down, OrbitalRow, up } from "../components/Orbital";
import { useSceneFrame } from "../components/SceneFrame";
import { Text } from "../components/Text";
import { cue } from "../cues";
import { colors, FONT, type } from "../theme";

const SCENE = "shorthand-ions";

const COLLAPSE = cue(SCENE, "replacing the inner core");
const PITFALL = cue(SCENE, "a common pitfall");
const BOXES_IN = PITFALL + 20;
const STRIKE = cue(SCENE, "in transition metal ions");
const ABOVE = cue(SCENE, "four s lies above");
const ION = cue(SCENE, "loses the four s");

const GAP = "0.35em";
const BOXES_TOP = 390;
const D_LEFT = 580;
const S_LEFT = 1220;
/** Shift that centres the five 3d boxes once the 4s box is gone. */
const D_SHIFT = 960 - (D_LEFT + (5 * BOX) / 2);

const CORE = [
  { name: "1s", count: 2 },
  { name: "2s", count: 2 },
  { name: "2p", count: 6 },
  { name: "3s", count: 2 },
  { name: "3p", count: 6 },
] as const;

/** Inline item whose width shrinks to zero as `open` goes 1 → 0. */
function Collapsible({
  open,
  width,
  style,
  children,
}: {
  open: number;
  width: number;
  style?: CSSProperties;
  children: ReactNode;
}) {
  return (
    <span
      style={{
        display: "inline-block",
        overflow: "hidden",
        whiteSpace: "nowrap",
        maxWidth: width * open,
        ...style,
      }}
    >
      {children}
    </span>
  );
}

export function ShorthandScene() {
  const frame = useSceneFrame();
  const collapse = progress(frame, COLLAPSE, COLLAPSE + 30);
  const ion = progress(frame, ION, ION + 30, easeInOut);
  const strike = progress(frame, STRIKE, STRIKE + 20);
  const boxes = progress(frame, BOXES_IN, BOXES_IN + 30);
  return (
    <AbsoluteFill>
      <Text x={960} y={180} size={type.body} opacity={fadeIn(frame, PITFALL)}>
        <span style={{ fontWeight: 700 }}>Pitfall: </span>
        <span style={{ position: "relative" }}>
          ‘Last in, first out’
          <span
            style={{
              position: "absolute",
              left: 0,
              top: "50%",
              width: `${strike * 100}%`,
              height: 4,
              background: colors.forbidden,
            }}
          />
        </span>
      </Text>

      <div
        style={{
          position: "absolute",
          left: 0,
          top: 300,
          width: "100%",
          transform: "translateY(-50%)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontFamily: FONT,
          fontSize: 64,
          lineHeight: 1.2,
          color: colors.text,
        }}
      >
        <span
          style={{
            display: "inline-grid",
            justifyItems: "end",
            fontWeight: 700,
          }}
        >
          <span style={{ gridArea: "1 / 1", opacity: 1 - ion }}>Fe:</span>
          <span style={{ gridArea: "1 / 1", opacity: ion }}>
            Fe<Sup>2+</Sup>:
          </span>
        </span>
        <Collapsible
          open={1 - collapse}
          width={580}
          style={{ opacity: 1 - collapse }}
        >
          {CORE.map(({ name, count }) => (
            <span key={name} style={{ paddingLeft: GAP }}>
              <Term name={name} count={count} />
            </span>
          ))}
        </Collapsible>
        <Collapsible open={collapse} width={130}>
          <span
            style={{
              display: "inline-block",
              paddingLeft: GAP,
              fontWeight: 700,
              opacity: collapse,
              transform: `scale(${lerp(0.8, 1, collapse)})`,
            }}
          >
            [Ar]
          </span>
        </Collapsible>
        <span style={{ paddingLeft: GAP }}>
          <Term name="3d" count={6} />
        </span>
        <Collapsible
          open={1 - ion}
          width={115}
          style={{ opacity: 1 - ion, transform: `translateY(${ion * 50}px)` }}
        >
          <span style={{ paddingLeft: GAP }}>
            <Term name="4s" count={2} />
          </span>
        </Collapsible>
      </div>

      <OrbitalRow
        x={D_LEFT + D_SHIFT * ion}
        y={BOXES_TOP}
        stroke={colors.dText}
        opacity={boxes}
        spins={[[up(1), down(1)], [up(1)], [up(1)], [up(1)], [up(1)]]}
      />
      <Text
        x={D_LEFT + (5 * BOX) / 2 + D_SHIFT * ion}
        y={BOXES_TOP + BOX + 50}
        size={type.label}
        weight={500}
        color={colors.dText}
        opacity={boxes}
      >
        3d
      </Text>
      <OrbitalRow
        x={S_LEFT}
        y={BOXES_TOP - 50 * ion}
        stroke={colors.sText}
        opacity={boxes * (1 - ion)}
        spins={[[up(1), down(1)]]}
      />
      <Text
        x={S_LEFT + BOX / 2}
        y={BOXES_TOP + BOX + 50 - 50 * ion}
        size={type.label}
        weight={500}
        color={colors.sText}
        opacity={boxes * (1 - ion)}
      >
        4s
      </Text>

      <Text
        x={960}
        y={720}
        size={type.body}
        weight={500}
        opacity={fadeIn(frame, ABOVE)}
      >
        4s lies above 3d in ions
      </Text>
    </AbsoluteFill>
  );
}
