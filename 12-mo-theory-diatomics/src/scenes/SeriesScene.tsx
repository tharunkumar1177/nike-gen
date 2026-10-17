import { AbsoluteFill, useVideoConfig } from "remotion";
import { fadeIn, pop, progress } from "../components/anim";
import { Arrow, Dashed, ScaleAbout, Stage } from "../components/Diagram";
import { useSceneFrame } from "../components/SceneFrame";
import { Formula, MoLabel, Sup } from "../components/Script";
import { Text } from "../components/Text";
import { cue } from "../cues";
import { colors, SAFE, type } from "../theme";

const SCENE = "worked-example-o2-series";

type Species = {
  charge?: string;
  piStar: number;
  bondOrder: number;
  length: number;
  /** Length as printed; superoxide is approximate. */
  lengthText: string;
  at: number;
};

const SERIES: readonly Species[] = [
  {
    charge: "+",
    piStar: 1,
    bondOrder: 2.5,
    length: 112,
    lengthText: "112",
    at: cue(SCENE, "o two plus has"),
  },
  {
    piStar: 2,
    bondOrder: 2,
    length: 121,
    lengthText: "121",
    at: cue(SCENE, "o two has bond order two"),
  },
  {
    charge: "−",
    piStar: 3,
    bondOrder: 1.5,
    length: 134,
    lengthText: "≈ 134",
    at: cue(SCENE, "adding electrons makes superoxide"),
  },
  {
    charge: "2−",
    piStar: 4,
    bondOrder: 1,
    length: 149,
    lengthText: "149",
    at: cue(SCENE, "and peroxide"),
  },
];

const TREND = cue(SCENE, "higher bond order means");

const COLUMNS = { species: 200, piStar: 430, bondOrder: 650, length: 820 };
const HEADER_Y = 300;
const ROW_Y = (i: number) => 420 + i * 100;

const AXIS = { left: 1100, right: 1700, bottom: 800, top: 200 } as const;
const BO_TICKS = [1, 1.5, 2, 2.5, 3] as const;
const LENGTH_TICKS = [110, 120, 130, 140, 150] as const;
const plotX = (bondOrder: number) => 1200 + (bondOrder - 1) * 240;
const plotY = (length: number) => 800 - (length - 100) * 10;

export function SeriesScene() {
  const frame = useSceneFrame();
  const { fps } = useVideoConfig();
  const frameIn = fadeIn(frame, 0);
  const trend = progress(frame, TREND, TREND + 30);

  return (
    <AbsoluteFill>
      <Stage>
        <g opacity={frameIn} stroke={colors.axis} strokeWidth={3}>
          <line
            x1={AXIS.left}
            x2={AXIS.right}
            y1={AXIS.bottom}
            y2={AXIS.bottom}
          />
          <line x1={AXIS.left} x2={AXIS.left} y1={AXIS.bottom} y2={AXIS.top} />
          {BO_TICKS.map((bo) => (
            <line
              key={bo}
              x1={plotX(bo)}
              x2={plotX(bo)}
              y1={AXIS.bottom}
              y2={AXIS.bottom + 10}
            />
          ))}
          {LENGTH_TICKS.map((length) => (
            <line
              key={length}
              x1={AXIS.left - 10}
              x2={AXIS.left}
              y1={plotY(length)}
              y2={plotY(length)}
            />
          ))}
        </g>
        {SERIES.slice(1).map((species, i) => {
          const previous = SERIES[i];
          if (!previous) return null;
          return (
            <Dashed
              key={species.length}
              x1={plotX(previous.bondOrder)}
              y1={plotY(previous.length)}
              x2={plotX(species.bondOrder)}
              y2={plotY(species.length)}
              shown={progress(frame, species.at, species.at + 30)}
            />
          );
        })}
        {SERIES.map((species) => {
          const cx = plotX(species.bondOrder);
          const cy = plotY(species.length);
          return (
            <ScaleAbout
              key={species.length}
              cx={cx}
              cy={cy}
              scale={pop(frame, fps, species.at)}
            >
              <circle cx={cx} cy={cy} r={8} fill={colors.axis} />
            </ScaleAbout>
          );
        })}
        <Arrow
          x1={1236}
          y1={275}
          x2={1596}
          y2={645}
          shown={trend}
          color={colors.text}
          width={6}
          head={22}
        />
      </Stage>

      <Text
        x={SAFE}
        y={130}
        size={type.subtitle}
        weight={700}
        anchor="start"
        opacity={frameIn}
      >
        Worked Example: the <Formula base="O" sub="2" /> Series
      </Text>
      {[
        { x: COLUMNS.species, text: <>Species</> },
        {
          x: COLUMNS.piStar,
          text: (
            <>
              Valence e<Sup>−</Sup> in <MoLabel letter="π" star shell="2p" />
            </>
          ),
        },
        { x: COLUMNS.bondOrder, text: <>BO</> },
        { x: COLUMNS.length, text: <>Length (pm)</> },
      ].map(({ x, text }) => (
        <Text
          key={x}
          x={x}
          y={HEADER_Y}
          size={type.label}
          weight={500}
          color={colors.axis}
          opacity={frameIn}
        >
          {text}
        </Text>
      ))}
      {SERIES.map((species, i) => {
        const shown = fadeIn(frame, species.at);
        const y = ROW_Y(i);
        return (
          <div key={species.length} style={{ opacity: shown }}>
            <Text x={COLUMNS.species} y={y} size={type.body}>
              <Formula base="O" sub="2" sup={species.charge} />
            </Text>
            <Text x={COLUMNS.piStar} y={y} size={type.body}>
              {species.piStar}
            </Text>
            <Text x={COLUMNS.bondOrder} y={y} size={type.body}>
              {species.bondOrder}
            </Text>
            <Text x={COLUMNS.length} y={y} size={type.body}>
              {species.lengthText}
            </Text>
          </div>
        );
      })}

      {BO_TICKS.map((bo) => (
        <Text
          key={bo}
          x={plotX(bo)}
          y={840}
          size={type.label}
          weight={500}
          color={colors.axis}
          opacity={frameIn}
        >
          {bo}
        </Text>
      ))}
      {LENGTH_TICKS.map((length) => (
        <Text
          key={length}
          x={AXIS.left - 20}
          y={plotY(length)}
          size={type.label}
          weight={500}
          color={colors.axis}
          anchor="end"
          opacity={frameIn}
        >
          {length}
        </Text>
      ))}
      <Text x={1440} y={900} size={type.label} weight={500} opacity={frameIn}>
        Bond Order
      </Text>
      <Text
        x={990}
        y={500}
        size={type.label}
        weight={500}
        rotate={-90}
        opacity={frameIn}
      >
        Length (pm)
      </Text>
      <Text
        x={1460}
        y={420}
        size={type.label}
        weight={700}
        anchor="start"
        opacity={trend}
      >
        Stronger, shorter bond
      </Text>
    </AbsoluteFill>
  );
}
