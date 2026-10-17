import { AbsoluteFill, useVideoConfig } from "remotion";
import { fadeIn, pop } from "../components/anim";
import { ScaleAbout, Stage } from "../components/Diagram";
import { useSceneFrame } from "../components/SceneFrame";
import { Sub } from "../components/Script";
import { Text } from "../components/Text";
import { cue } from "../cues";
import { colors, FONT, SAFE, type } from "../theme";

const SCENE = "hook-o2-magnet";

const MAGNET = cue(SCENE, "liquid oxygen");
const LEWIS = cue(SCENE, "but the standard lewis structure");
const FAILS = cue(SCENE, "we need molecular orbital theory");

const LEWIS_X = 1200;
const LEWIS_Y = 650;
const ATOMS = [LEWIS_X - 95, LEWIS_X + 95] as const;

function LewisO2() {
  return (
    <>
      {ATOMS.map((x) => (
        <g key={x}>
          <text
            x={x}
            y={LEWIS_Y}
            textAnchor="middle"
            dominantBaseline="central"
            fontFamily={FONT}
            fontSize={120}
            fontWeight={500}
            fill={colors.text}
          >
            O
          </text>
          {[-85, 85].map((dy) =>
            [-14, 14].map((dx) => (
              <circle
                key={`${dy}${dx}`}
                cx={x + dx}
                cy={LEWIS_Y + dy}
                r={8}
                fill={colors.text}
              />
            )),
          )}
        </g>
      ))}
      {[-14, 14].map((dy) => (
        <line
          key={dy}
          x1={LEWIS_X - 40}
          x2={LEWIS_X + 40}
          y1={LEWIS_Y + dy}
          y2={LEWIS_Y + dy}
          stroke={colors.text}
          strokeWidth={8}
          strokeLinecap="round"
        />
      ))}
    </>
  );
}

export function HookScene() {
  const frame = useSceneFrame();
  const { fps } = useVideoConfig();
  const intro = fadeIn(frame, 0);
  const magnet = fadeIn(frame, MAGNET);
  const lewis = pop(frame, fps, LEWIS);
  const cross = pop(frame, fps, FAILS);
  return (
    <AbsoluteFill>
      <Stage>
        <g opacity={magnet}>
          <path
            d="M 400 500 L 250 500 A 150 150 0 0 0 250 800 L 400 800"
            fill="none"
            stroke={colors.axis}
            strokeWidth={60}
          />
          <line
            x1={340}
            x2={400}
            y1={500}
            y2={500}
            stroke={colors.unpaired}
            strokeWidth={60}
          />
          <line
            x1={340}
            x2={400}
            y1={800}
            y2={800}
            stroke={colors.bonding}
            strokeWidth={60}
          />
          <path
            d="M 600 350 Q 300 650 600 950"
            fill="none"
            stroke={colors.axis}
            strokeOpacity={0.55}
            strokeWidth={20}
            strokeLinecap="round"
            strokeDasharray="60 24"
            strokeDashoffset={-frame * 4}
          />
        </g>
        <ScaleAbout cx={LEWIS_X} cy={LEWIS_Y} scale={lewis}>
          <LewisO2 />
        </ScaleAbout>
        <ScaleAbout cx={LEWIS_X} cy={LEWIS_Y} scale={cross}>
          {[-1, 1].map((side) => (
            <line
              key={side}
              x1={LEWIS_X - 85}
              x2={LEWIS_X + 85}
              y1={LEWIS_Y - 85 * side}
              y2={LEWIS_Y + 85 * side}
              stroke={colors.unpaired}
              strokeWidth={16}
              strokeLinecap="round"
            />
          ))}
        </ScaleAbout>
      </Stage>
      <Text
        x={SAFE}
        y={180}
        size={type.title}
        weight={700}
        anchor="start"
        opacity={intro}
      >
        Molecular Orbital Theory
      </Text>
      <Text
        x={SAFE}
        y={270}
        size={type.subtitle}
        weight={500}
        anchor="start"
        opacity={intro}
      >
        Diatomics &amp; Paramagnetism
      </Text>
      <Text
        x={660}
        y={360}
        size={type.label}
        weight={500}
        color={colors.axis}
        anchor="start"
        opacity={magnet}
      >
        Liquid O<Sub>2</Sub>
      </Text>
      <Text
        x={LEWIS_X}
        y={480}
        size={type.label}
        weight={500}
        color={colors.axis}
        opacity={lewis}
      >
        Lewis structure
      </Text>
      <Text
        x={LEWIS_X}
        y={800}
        size={type.body}
        weight={700}
        color={colors.unpaired}
        opacity={fadeIn(frame, FAILS)}
      >
        Fails to predict paramagnetism
      </Text>
    </AbsoluteFill>
  );
}
