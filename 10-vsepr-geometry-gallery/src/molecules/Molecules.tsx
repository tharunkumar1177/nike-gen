import { AbsoluteFill } from "remotion";
import { Stage3D } from "../three/Stage3D";
import { Molecule3D } from "./Molecule3D";
import { MoleculeLabels } from "./MoleculeLabels";
import type { MoleculeSpec } from "./spec";

/** One full-frame 3D stage holding every molecule of a scene, plus their labels. */
export function Molecules({ specs }: { specs: MoleculeSpec[] }) {
  const visible = specs.filter((spec) => (spec.opacity ?? 1) > 0);
  return (
    <AbsoluteFill>
      <Stage3D>
        {visible.map((spec) => (
          <Molecule3D key={spec.id} spec={spec} />
        ))}
      </Stage3D>
      <MoleculeLabels specs={visible} />
    </AbsoluteFill>
  );
}
