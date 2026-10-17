import { spring, useVideoConfig } from "remotion";
import { fadeIn, lerp, pop, progress } from "../components/anim";
import { Chip, Title } from "../components/Labels";
import { Atom, Charge, H_RADIUS, SharedPair } from "../components/Particles";
import { useSceneFrame } from "../components/SceneFrame";
import { cue } from "../cues";
import { colors } from "../theme";

const SCENE = "covalent-shared";

const CL2 = { y: 500, from: [380, 620], to: [440, 560], pair: 500 };
const HCL = { y: 500, hFrom: 1250, hTo: 1350, clFrom: 1550, clTo: 1450 };
const HCL_CONTACT = HCL.hTo + H_RADIUS;
const HCL_SHIFTED = HCL_CONTACT + 28;

export function CovalentScene() {
  const frame = useSceneFrame();
  const { fps } = useVideoConfig();

  const share = cue(SCENE, "In a covalent bond");
  const identical = cue(SCENE, "two chlorine atoms");
  const equally = cue(SCENE, "share the electrons equally");
  const differ = cue(SCENE, "If the atoms differ");
  const hcl = cue(SCENE, "hydrogen and chlorine");
  const unequal = cue(SCENE, "the sharing is unequal");
  const polar = cue(SCENE, "creating a polar covalent");

  const settle = (start: number) =>
    spring({
      frame: frame - start,
      fps,
      config: { damping: 16, stiffness: 80 },
    });

  const leftIn = fadeIn(frame, share);
  const leftT = settle(share);
  const leftPair = fadeIn(frame, share + 25);
  const rightIn = fadeIn(frame, differ);
  const rightT = settle(differ);
  const rightPair = fadeIn(frame, differ + 25);
  const shift = progress(frame, unequal, unequal + 30);
  const deltas = fadeIn(frame, unequal + 20);

  const chip = (start: number) => {
    const t = pop(frame, fps, start);
    return { opacity: Math.min(1, t * 1.5), dy: (1 - t) * 20 };
  };

  return (
    <>
      <Title title="Covalent: Shared Pairs" color={colors.covalentText} />

      <Atom
        x={lerp(CL2.from[0]!, CL2.to[0]!, leftT)}
        y={CL2.y}
        symbol="Cl"
        opacity={leftIn}
      />
      <Atom
        x={lerp(CL2.from[1]!, CL2.to[1]!, leftT)}
        y={CL2.y}
        symbol="Cl"
        opacity={leftIn}
      />
      <SharedPair x={CL2.pair} y={CL2.y} opacity={leftPair} />
      <Chip x={500} y={680} {...chip(identical)}>
        Cl<sub style={{ fontSize: "0.7em" }}>2</sub>
      </Chip>
      <Chip x={500} y={760} color={colors.covalentText} {...chip(equally)}>
        Nonpolar
      </Chip>

      <Atom
        x={lerp(HCL.hFrom, HCL.hTo, rightT)}
        y={HCL.y}
        r={H_RADIUS}
        symbol="H"
        symbolSize={40}
        opacity={rightIn}
      />
      <Atom
        x={lerp(HCL.clFrom, HCL.clTo, rightT)}
        y={HCL.y}
        symbol="Cl"
        opacity={rightIn}
      />
      <SharedPair
        x={lerp(HCL_CONTACT, HCL_SHIFTED, shift)}
        y={HCL.y}
        opacity={rightPair}
      />
      <Charge x={1320} y={430} color={colors.electronText} opacity={deltas}>
        δ+
      </Charge>
      <Charge x={1500} y={410} color={colors.electronText} opacity={deltas}>
        δ−
      </Charge>
      <Chip x={1400} y={680} {...chip(hcl)}>
        HCl
      </Chip>
      <Chip x={1400} y={760} color={colors.covalentText} {...chip(polar)}>
        Polar
      </Chip>
    </>
  );
}
