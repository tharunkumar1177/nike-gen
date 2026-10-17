import { AbsoluteFill, useVideoConfig } from "remotion";
import { dropped, fadeIn, popped, progress } from "../components/anim";
import { DrawnArrow } from "../components/DrawnArrow";
import { useSceneFrame } from "../components/SceneFrame";
import { Badge, Text } from "../components/Text";
import { cue } from "../cues";
import { colors, FONT, SAFE, type } from "../theme";

const TITLE_AT = cue(
  "system-surroundings-enthalpy",
  "thermodynamics determines",
);
const CONCEPT_AT = cue(
  "system-surroundings-enthalpy",
  "whether a process will occur",
);
const SYSTEM_AT = cue(
  "system-surroundings-enthalpy",
  "the system is the part we study",
);
const SURROUNDINGS_AT = cue(
  "system-surroundings-enthalpy",
  "everything else is the surroundings",
);
const ENTHALPY_AT = cue(
  "system-surroundings-enthalpy",
  "heat exchanged at constant pressure",
);
const EXO_AT = cue(
  "system-surroundings-enthalpy",
  "exothermic processes release heat",
);
const ENDO_AT = cue(
  "system-surroundings-enthalpy",
  "endothermic processes absorb heat",
);

const SYSTEM = { x: 760, y: 500, width: 400, height: 300 } as const;
const SURROUNDINGS = { x: SAFE, y: 470, width: 1680, height: 540 } as const;
const BADGE_Y = 850;

export function EnthalpyScene() {
  const frame = useSceneFrame();
  const { fps } = useVideoConfig();
  const system = popped(frame, fps, SYSTEM_AT);
  const surroundings = fadeIn(frame, SURROUNDINGS_AT);
  const exo = fadeIn(frame, EXO_AT);
  const endo = fadeIn(frame, ENDO_AT);
  return (
    <AbsoluteFill>
      <Text
        x={SAFE}
        y={180}
        size={type.title}
        weight={700}
        {...dropped(frame, TITLE_AT)}
      >
        Thermodynamics
      </Text>
      <Text
        x={SAFE}
        y={280}
        size={type.body}
        color={colors.gibbsText}
        opacity={fadeIn(frame, CONCEPT_AT)}
      >
        ΔG = ΔH − TΔS decides if a process is spontaneous
      </Text>
      <Text
        x={960}
        y={400}
        size={type.subtitle}
        color={colors.enthalpyText}
        anchor="middle"
        opacity={fadeIn(frame, ENTHALPY_AT)}
      >
        Enthalpy: ΔH = heat at constant pressure
      </Text>
      <div
        style={{
          position: "absolute",
          left: SURROUNDINGS.x,
          top: SURROUNDINGS.y,
          width: SURROUNDINGS.width,
          height: SURROUNDINGS.height,
          boxSizing: "border-box",
          border: `3px dashed ${colors.muted}`,
          borderRadius: 24,
          background: colors.box,
          opacity: surroundings,
        }}
      />
      <Text
        x={SAFE + 32}
        y={SURROUNDINGS.y + SURROUNDINGS.height - 50}
        size={type.body}
        opacity={surroundings}
      >
        Surroundings
      </Text>
      <div
        style={{
          position: "absolute",
          left: SYSTEM.x,
          top: SYSTEM.y,
          width: SYSTEM.width,
          height: SYSTEM.height,
          boxSizing: "border-box",
          border: `4px solid ${colors.text}`,
          borderRadius: 16,
          background: colors.background,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: FONT,
          fontSize: type.body,
          fontWeight: 700,
          color: colors.text,
          opacity: system.opacity,
          transform: `scale(${system.scale})`,
        }}
      >
        System
      </div>
      <DrawnArrow
        from={[SYSTEM.x - 10, 700]}
        to={[620, 800]}
        progress={progress(frame, EXO_AT, EXO_AT + 30)}
        color={colors.exothermicText}
      />
      <DrawnArrow
        from={[1300, 800]}
        to={[SYSTEM.x + SYSTEM.width + 10, 700]}
        progress={progress(frame, ENDO_AT, ENDO_AT + 30)}
        color={colors.endothermicText}
      />
      <Text x={480} y={BADGE_Y} size={type.body} anchor="middle" opacity={exo}>
        <Badge
          color={colors.exothermic}
          textColor={colors.exothermicText}
          size={type.body}
        >
          Exothermic (ΔH &lt; 0)
        </Badge>
      </Text>
      <Text
        x={1440}
        y={BADGE_Y}
        size={type.body}
        anchor="middle"
        opacity={endo}
      >
        <Badge
          color={colors.endothermic}
          textColor={colors.endothermicText}
          size={type.body}
        >
          Endothermic (ΔH &gt; 0)
        </Badge>
      </Text>
    </AbsoluteFill>
  );
}
