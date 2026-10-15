import { AbsoluteFill } from "remotion";
import { progress } from "../components/anim";
import { Sup, Term } from "../components/Config";
import { BOX, OrbitalRow, up, down } from "../components/Orbital";
import { useSceneFrame } from "../components/SceneFrame";
import { Text } from "../components/Text";
import { cue } from "../cues";
import { colors, type } from "../theme";

const SCENE = "chromium-copper";

const D_LEFT = 580;
const S_LEFT = 1220;

const ELEMENTS = [
  {
    symbol: "Cr",
    d: 5,
    y: 200,
    at: cue(SCENE, "chromium"),
    dSpins: Array.from({ length: 5 }, () => [up(1)]),
  },
  {
    symbol: "Cu",
    d: 10,
    y: 550,
    at: cue(SCENE, "argon core three d ten"),
    dSpins: Array.from({ length: 5 }, () => [up(1), down(1)]),
  },
] as const;

const LOWEST = cue(SCENE, "lowest total energy");
const NOTE = cue(SCENE, "half-filled stability");

const fade = (frame: number, at: number) => progress(frame, at, at + 30);

export function ExceptionsScene() {
  const frame = useSceneFrame();
  return (
    <AbsoluteFill>
      {ELEMENTS.map(({ symbol, d, y, at, dSpins }) => {
        const boxes = fade(frame, at + 30);
        return (
          <div key={symbol}>
            <Text x={960} y={y} size={64} opacity={fade(frame, at)}>
              <span style={{ fontWeight: 700 }}>{symbol}: [Ar] </span>
              <Term name="3d" count={d} />{" "}
              <span
                style={{
                  color: colors.sText,
                  fontWeight: 700,
                  background: `${colors.s}59`,
                  borderRadius: 12,
                  padding: "0 8px",
                }}
              >
                4s<Sup>1</Sup>
              </span>
            </Text>
            <OrbitalRow
              x={D_LEFT}
              y={y + 120 - BOX / 2}
              stroke={colors.dText}
              opacity={boxes}
              spins={dSpins}
            />
            <OrbitalRow
              x={S_LEFT}
              y={y + 120 - BOX / 2}
              stroke={colors.sText}
              opacity={boxes}
              spins={[[up(1)]]}
            />
          </div>
        );
      })}
      <Text
        x={960}
        y={455}
        size={type.body}
        weight={500}
        opacity={fade(frame, LOWEST)}
      >
        Lowest total energy
      </Text>
      <Text x={960} y={880} size={type.body} opacity={fade(frame, NOTE)}>
        <span style={{ fontWeight: 700 }}>Pitfall: </span>‘Half-filled
        stability’ is a simplification.
      </Text>
    </AbsoluteFill>
  );
}
