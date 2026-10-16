import { AbsoluteFill } from "remotion";
import { easeInOut, lerp, progress } from "../components/anim";
import { Term } from "../components/Config";
import { useSceneFrame } from "../components/SceneFrame";
import { Text } from "../components/Text";
import { cue } from "../cues";
import { colors, type } from "../theme";

const SCENE = "notation-order";

const SIZE = 64;
const PITCH = 118;

const OXYGEN = { y: 440, at: cue(SCENE, "for oxygen") };
const OXYGEN_TERMS = [
  { name: "1s", count: 2, x: 622, at: cue(SCENE, "one s two") },
  { name: "2s", count: 2, x: 740, at: cue(SCENE, "two s two") },
  { name: "2p", count: 4, x: 858, at: cue(SCENE, "two p four") },
] as const;

const IRON = { y: 640, at: cue(SCENE, "for iron") };
const IRON_CORE = [
  { name: "1s", count: 2 },
  { name: "2s", count: 2 },
  { name: "2p", count: 6 },
  { name: "3s", count: 2 },
  { name: "3p", count: 6 },
] as const;
const IRON_LEFT = 642;
const D_X = IRON_LEFT + 5 * PITCH;
const S_X = IRON_LEFT + 6 * PITCH;

const SWAP = cue(SCENE, "even though");

const fade = (frame: number, at: number) => progress(frame, at, at + 15);

export function NotationScene() {
  const frame = useSceneFrame();
  const swap = progress(frame, SWAP, SWAP + 30, easeInOut);
  const arc = Math.sin(Math.PI * swap) * 40;
  return (
    <AbsoluteFill>
      <Text
        x={520}
        y={OXYGEN.y}
        size={SIZE}
        weight={700}
        anchor="start"
        opacity={fade(frame, OXYGEN.at)}
      >
        O:
      </Text>
      {OXYGEN_TERMS.map(({ name, count, x, at }) => (
        <Text
          key={name}
          x={x}
          y={OXYGEN.y}
          size={SIZE}
          anchor="start"
          opacity={fade(frame, at)}
        >
          <Term name={name} count={count} />
        </Text>
      ))}

      <Text
        x={520}
        y={IRON.y}
        size={SIZE}
        weight={700}
        anchor="start"
        opacity={fade(frame, IRON.at)}
      >
        Fe:
      </Text>
      {IRON_CORE.map(({ name, count }, i) => (
        <Text
          key={name}
          x={IRON_LEFT + i * PITCH}
          y={IRON.y}
          size={SIZE}
          anchor="start"
          opacity={fade(frame, IRON.at + 10 + i * 10)}
        >
          <Term name={name} count={count} />
        </Text>
      ))}
      <Text
        x={lerp(D_X, S_X, swap)}
        y={IRON.y + arc}
        size={SIZE}
        anchor="start"
        opacity={fade(frame, IRON.at + 60)}
      >
        <Term name="3d" count={6} />
      </Text>
      <Text
        x={lerp(S_X, D_X, swap)}
        y={IRON.y - arc}
        size={SIZE}
        anchor="start"
        opacity={fade(frame, IRON.at + 70)}
      >
        <Term name="4s" count={2} />
      </Text>
      <Text
        x={1338}
        y={760}
        size={type.body}
        color={colors.axis}
        opacity={fade(frame, SWAP)}
      >
        4s fills before 3d
      </Text>
    </AbsoluteFill>
  );
}
