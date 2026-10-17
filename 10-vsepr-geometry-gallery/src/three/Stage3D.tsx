import { ThreeCanvas } from "@remotion/three";
import type { ReactNode } from "react";
import { VIDEO } from "../theme";

/** Full-frame orthographic stage: one world unit per screen pixel. */
export function Stage3D({ children }: { children: ReactNode }) {
  return (
    <ThreeCanvas
      width={VIDEO.width}
      height={VIDEO.height}
      orthographic
      flat
      dpr={1}
      camera={{ position: [0, 0, 2000], near: 1, far: 4000, zoom: 1 }}
      gl={{ antialias: true, preserveDrawingBuffer: true }}
      style={{ position: "absolute", left: 0, top: 0 }}
    >
      <ambientLight intensity={1.1} />
      <directionalLight position={[-700, 900, 1400]} intensity={1.9} />
      <directionalLight position={[900, -300, 600]} intensity={0.45} />
      {children}
    </ThreeCanvas>
  );
}
