import { AbsoluteFill, useVideoConfig } from "remotion";
import { pop, progress } from "../components/anim";
import { Card, Line } from "../components/Panels";
import { useSceneFrame } from "../components/SceneFrame";
import { Text } from "../components/Text";
import { domainsFor, type VseprClass } from "../molecules/geometry";
import { spinPose, thumbX } from "../molecules/gallery";
import { Molecules } from "../molecules/Molecules";
import type { MoleculeSpec } from "../molecules/spec";
import { type } from "../theme";

const TAKEAWAYS = [
  "Electron domains spread out to minimise repulsion.",
  "Steric number = bonded atoms + lone pairs.",
  "Lone pairs compress bond angles.",
  "SN 5 lone pairs go equatorial; SN 6 lone pairs go trans.",
];

const GALLERY: { cls: VseprClass; central: string; ligands: string; formula: string }[] = [
  { cls: "AX2", central: "C", ligands: "O", formula: "CO₂" },
  { cls: "AX3", central: "B", ligands: "F", formula: "BF₃" },
  { cls: "AX2E", central: "S", ligands: "O", formula: "SO₂" },
  { cls: "AX4", central: "C", ligands: "H", formula: "CH₄" },
  { cls: "AX3E", central: "N", ligands: "H", formula: "NH₃" },
  { cls: "AX2E2", central: "O", ligands: "H", formula: "H₂O" },
  { cls: "AX5", central: "P", ligands: "Cl", formula: "PCl₅" },
  { cls: "AX4E", central: "S", ligands: "F", formula: "SF₄" },
  { cls: "AX3E2", central: "Cl", ligands: "F", formula: "ClF₃" },
  { cls: "AX2E3", central: "Xe", ligands: "F", formula: "XeF₂" },
  { cls: "AX6", central: "S", ligands: "F", formula: "SF₆" },
  { cls: "AX5E", central: "Br", ligands: "F", formula: "BrF₅" },
  { cls: "AX4E2", central: "Xe", ligands: "F", formula: "XeF₄" },
];

const STRIP_Y = 800;
const STRIP_START = 150;

export function ClosingCard() {
  const frame = useSceneFrame();
  const { fps } = useVideoConfig();
  const cardIn = progress(frame, 30, 50);
  const specs: MoleculeSpec[] = GALLERY.map((g, i) => ({
    id: g.formula,
    domains: domainsFor(g.cls, 1, g.cls === "AX2" ? { 0: 2, 1: 2 } : {}),
    central: g.central,
    ligands: g.ligands,
    cx: thumbX(i, GALLERY.length),
    cy: STRIP_Y,
    size: 110,
    pose: spinPose(frame, i * 25),
    opacity: progress(frame, STRIP_START + i * 4, STRIP_START + i * 4 + 15),
  }));
  return (
    <AbsoluteFill>
      <Card
        cx={960}
        cy={390}
        width={1500}
        opacity={cardIn}
        scale={0.92 + 0.08 * pop(frame, fps, 30)}
        align="flex-start"
        gap={22}
        padding={56}
      >
        <Line size={type.title} weight={700}>
          Key Takeaways
        </Line>
        {TAKEAWAYS.map((text, i) => {
          const t = progress(frame, 60 + i * 15, 75 + i * 15);
          return (
            <Line key={text} size={type.body} opacity={t} dy={(1 - t) * 16}>
              {text}
            </Line>
          );
        })}
      </Card>
      <Molecules specs={specs} />
      {GALLERY.map((g, i) => (
        <Text
          key={g.formula}
          x={thumbX(i, GALLERY.length)}
          y={STRIP_Y + 85}
          size={type.label}
          weight={700}
          opacity={progress(frame, STRIP_START + i * 4 + 10, STRIP_START + i * 4 + 25)}
        >
          {g.formula}
        </Text>
      ))}
    </AbsoluteFill>
  );
}
