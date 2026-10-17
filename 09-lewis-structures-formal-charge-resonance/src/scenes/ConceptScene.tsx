import { useVideoConfig } from "remotion";
import { fadeIn, pop, progress } from "../components/anim";
import { Chip, Title } from "../components/Labels";
import { AtomSymbol, Bond, LonePairs, SIDE, Stage } from "../components/Lewis";
import { useSceneFrame } from "../components/SceneFrame";
import { cue } from "../cues";
import { colors, FONT, SAFE, type } from "../theme";

const SCENE = "concept-lewis";

const LEFT = { x: 870, y: 640 };
const RIGHT = { x: 1050, y: 640 };
const RING = 110;

export function ConceptScene() {
  const frame = useSceneFrame();
  const { fps } = useVideoConfig();

  const intro = cue(SCENE, "A Lewis structure is a diagram");
  const bonding = cue(SCENE, "shared bonding pairs as lines");
  const lone = cue(SCENE, "unshared lone pairs as dots");
  const octet = cue(SCENE, "surrounded by eight valence electrons");

  const chip = (start: number) => {
    const t = pop(frame, fps, start);
    return { opacity: Math.min(1, t * 1.5), dy: (1 - t) * 20 };
  };

  const atoms = fadeIn(frame, bonding);
  const bond = progress(frame, bonding + 10, bonding + 30);
  const pairs = pop(frame, fps, lone);
  const ring = progress(frame, octet, octet + 20);
  const leaderBond = fadeIn(frame, bonding + 20);
  const leaderLone = fadeIn(frame, lone + 10);
  const leaderOctet = fadeIn(frame, octet + 10);

  return (
    <>
      <Title title="Lewis Structures" opacity={fadeIn(frame, intro)} />
      <div
        style={{
          position: "absolute",
          left: SAFE,
          top: 270,
          width: 1680,
          fontFamily: FONT,
          fontSize: type.body,
          lineHeight: 1.3,
          color: colors.text,
          opacity: fadeIn(frame, intro + 10),
        }}
      >
        A Lewis structure shows how a molecule&apos;s{" "}
        <span style={{ fontWeight: 700 }}>valence electrons</span> are arranged.
      </div>

      <Stage>
        <line
          x1={960}
          y1={795}
          x2={960}
          y2={652}
          stroke={colors.muted}
          strokeWidth={3}
          opacity={leaderBond}
        />
        <line
          x1={712}
          y1={640}
          x2={784}
          y2={640}
          stroke={colors.muted}
          strokeWidth={3}
          opacity={leaderLone}
        />
        <line
          x1={1160}
          y1={640}
          x2={1228}
          y2={640}
          stroke={colors.muted}
          strokeWidth={3}
          opacity={leaderOctet}
        />
        <AtomSymbol {...LEFT} symbol="F" opacity={atoms} />
        <AtomSymbol {...RIGHT} symbol="F" opacity={atoms} />
        <Bond from={LEFT} to={RIGHT} draw={bond} />
        <LonePairs
          atom={LEFT}
          angles={[SIDE.top, SIDE.left, SIDE.bottom]}
          opacity={Math.min(1, pairs * 1.5)}
          scale={pairs}
        />
        <LonePairs
          atom={RIGHT}
          angles={[SIDE.top, SIDE.right, SIDE.bottom]}
          opacity={Math.min(1, pairs * 1.5)}
          scale={pairs}
        />
        {ring > 0 ? (
          <circle
            cx={RIGHT.x}
            cy={RIGHT.y}
            r={RING * (0.85 + 0.15 * ring)}
            fill="none"
            stroke={colors.muted}
            strokeWidth={4}
            strokeDasharray="14 10"
            opacity={ring}
          />
        ) : null}
      </Stage>

      <Chip x={960} y={830} color={colors.bond} {...chip(bonding + 20)}>
        Bonding pair
      </Chip>
      <Chip x={600} y={640} color={colors.lonePair} {...chip(lone + 10)}>
        Lone pair
      </Chip>
      <Chip x={1400} y={640} {...chip(octet + 10)}>
        Octet: 8 electrons
      </Chip>
    </>
  );
}
