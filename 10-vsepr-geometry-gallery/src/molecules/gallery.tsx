import type { ReactNode } from "react";
import { easeInOut, fadeWindow, lerp, pop, progress } from "../components/anim";
import { Card, Line } from "../components/Panels";
import { Text } from "../components/Text";
import { colors, SAFE, type, VIDEO } from "../theme";
import { domainsFor, type VseprClass } from "./geometry";
import type { ArcSpec, MoleculeSpec } from "./spec";
import { blendPose, eulerPose, type Pose } from "./view";

export const HERO = { cx: 600, cy: 420, size: 560 } as const;
export const INFO = { cx: 1350, cy: 420, width: 760 } as const;
export const THUMB = { cy: 790, size: 150, formulaY: 890, nameY: 930 } as const;

export const SPIN_DEG_PER_FRAME = 0.2;
const SHRINK_FRAMES = 36;

export function thumbX(index: number, count: number) {
  const span = VIDEO.width - 2 * SAFE;
  return SAFE + (span / count) * (index + 0.5);
}

export function spinPose(frame: number, offset = 0) {
  return eulerPose(undefined, offset + SPIN_DEG_PER_FRAME * frame);
}

/** A pose to ease into over 30 frames from `at`; "spin" resumes the idle spin. */
export type PoseStep = { at: number; pose: Pose | "spin" };

export function poseAt(frame: number, steps: PoseStep[], spinOffset = 0) {
  let current = spinPose(frame, spinOffset);
  for (const step of steps) {
    const target =
      step.pose === "spin" ? spinPose(frame, spinOffset) : step.pose;
    current = blendPose(
      current,
      target,
      progress(frame, step.at, step.at + 30, easeInOut),
    );
  }
  return current;
}

/** An arc that draws on over 30 frames from `at` and fades from `until`. */
export type TimedArc = ArcSpec & { at: number; until?: number };

export function arcsAt(frame: number, arcs: TimedArc[]): ArcSpec[] {
  return arcs
    .filter((arc) => frame >= arc.at)
    .map(({ at, until, ...arc }) => ({
      ...arc,
      progress: progress(frame, at, at + 30),
      opacity:
        (arc.opacity ?? 1) *
        (until === undefined ? 1 : 1 - progress(frame, until, until + 15)),
    }));
}

export type GalleryItem = {
  id: string;
  cls: VseprClass;
  central: string;
  ligands: string;
  orders?: Partial<Record<number, 1 | 2 | 3>>;
  /** Frame the hero appears. */
  enter: number;
  /** Frame the hero starts shrinking into the strip; omit to stay. */
  exit?: number;
  thumbIndex: number;
  thumbCount: number;
  poses?: PoseStep[];
  arcs?: TimedArc[];
  /** Frame the angles start easing from ideal to measured. */
  squeezeAt?: number;
  spinOffset?: number;
  hero?: Partial<Pick<MoleculeSpec, "cx" | "cy" | "size">>;
  /** Per-frame overrides, e.g. highlights. */
  extra?: (frame: number) => Partial<MoleculeSpec>;
};

export function gallerySpec(
  item: GalleryItem,
  frame: number,
  fps: number,
): MoleculeSpec {
  const hero = { ...HERO, ...item.hero };
  const exit = item.exit ?? Infinity;
  const appear = pop(frame, fps, item.enter);
  const shrink = progress(frame, exit, exit + SHRINK_FRAMES, easeInOut);
  const squeeze =
    item.squeezeAt === undefined
      ? 0
      : progress(frame, item.squeezeAt, item.squeezeAt + 30, easeInOut);
  const offset = item.spinOffset ?? 0;
  const pose = blendPose(
    poseAt(frame, item.poses ?? [], offset),
    spinPose(frame, offset),
    shrink,
  );
  return {
    id: item.id,
    domains: domainsFor(item.cls, squeeze, item.orders),
    central: item.central,
    ligands: item.ligands,
    cx: lerp(hero.cx, thumbX(item.thumbIndex, item.thumbCount), shrink),
    cy: lerp(hero.cy, THUMB.cy, shrink),
    size: lerp(hero.size * (0.85 + 0.15 * appear), THUMB.size, shrink),
    pose,
    opacity: progress(frame, item.enter, item.enter + 15),
    frameOpacity: 1 - shrink,
    arcs: arcsAt(frame, item.arcs ?? []).map((arc) => ({
      ...arc,
      opacity: (arc.opacity ?? 1) * (1 - shrink),
    })),
    ...item.extra?.(frame),
  };
}

/** Formula and shape name under a thumbnail, fading in once the hero has shrunk. */
export function ThumbLabel({
  frame,
  item,
  formula,
  shape,
}: {
  frame: number;
  item: GalleryItem;
  formula: string;
  shape: string;
}) {
  const exit = item.exit ?? Infinity;
  const opacity = progress(frame, exit + 20, exit + 40);
  if (opacity <= 0) {
    return null;
  }
  const x = thumbX(item.thumbIndex, item.thumbCount);
  return (
    <>
      <Text
        x={x}
        y={THUMB.formulaY}
        size={type.label}
        weight={700}
        opacity={opacity}
      >
        {formula}
      </Text>
      <Text
        x={x}
        y={THUMB.nameY}
        size={28}
        weight={400}
        color={colors.muted}
        opacity={opacity}
      >
        {shape}
      </Text>
    </>
  );
}

/** Hero info card: formula, AXₘEₙ class, shape, and angle lines. */
export function InfoCard({
  frame,
  fps,
  enter,
  exit = Infinity,
  formula,
  cls,
  shape,
  angleAt,
  angle,
  ideal,
}: {
  frame: number;
  fps: number;
  enter: number;
  exit?: number;
  formula: ReactNode;
  cls: string;
  shape: string;
  angleAt: number;
  angle: string;
  /** Ideal angle shown above the measured one when they differ. */
  ideal?: string;
}) {
  const opacity = fadeWindow(frame, enter, enter + 15, exit, exit + 15);
  const angleIn = progress(frame, angleAt, angleAt + 20);
  return (
    <Card
      cx={INFO.cx}
      cy={INFO.cy}
      width={INFO.width}
      opacity={opacity}
      scale={0.9 + 0.1 * pop(frame, fps, enter)}
      gap={12}
    >
      <Line size={type.title} weight={700}>
        {formula}
      </Line>
      <Line size={type.subtitle} weight={500} color={colors.central}>
        {cls}
      </Line>
      <Line size={type.body}>{shape}</Line>
      {ideal ? (
        <Line size={type.label} color={colors.muted} opacity={angleIn}>
          ideal {ideal}
        </Line>
      ) : null}
      <Line
        size={type.body}
        weight={700}
        color={colors.angle}
        opacity={angleIn}
        dy={(1 - angleIn) * 12}
      >
        {angle}
      </Line>
    </Card>
  );
}
