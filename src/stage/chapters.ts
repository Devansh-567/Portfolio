import * as THREE from "three";

/**
 * One camera set-up per chapter. Between chapters the camera glides along a
 * Catmull-Rom spline through these points, driven by scroll position.
 * `look` is where the camera aims; `settle` is how much of the balance-wheel
 * swing remains (the movement winds down in the final shot).
 */
export interface Shot {
  pos: [number, number, number];
  look: [number, number, number];
  fov: number;
  exposure: number;
  settle: number;
  roll?: number;
}

export const SHOTS: Shot[] = [
  // I Prologue: wide, subject pushed to the right so the title can sit left
  { pos: [-1.2, -2.0, 50], look: [-5.2, -1.2, 0], fov: 30, exposure: 1.05, settle: 1 },
  // II Origins: closer on the barrel, subject right
  { pos: [-0.5, -0.5, 30], look: [-7.2, -0.3, 0.6], fov: 30, exposure: 0.95, settle: 1, roll: 0.02 },
  // III The record: raking angle across the train, heavily dimmed behind the ledger
  { pos: [14, -6, 26], look: [3.5, -1.5, 0.8], fov: 30, exposure: 0.52, settle: 1, roll: -0.05 },
  // IV The work: macro on the balance wheel
  { pos: [4.6, -2.4, 11.5], look: [6.8, -5.1, 1.0], fov: 28, exposure: 0.62, settle: 1, roll: 0.04 },
  // V The papers: low sweep across the wheel teeth
  { pos: [-5.5, -7.2, 12.5], look: [0, -1.0, 0.8], fov: 32, exposure: 0.36, settle: 1, roll: 0.07 },
  // VI The cabinet: ruby jewels on the bridges
  { pos: [4.0, 2.6, 10.5], look: [2.0, 0.3, 1.9], fov: 30, exposure: 0.42, settle: 1, roll: -0.04 },
  // VII In print: profile view that shows the layers
  { pos: [-15, -3.5, 19], look: [2.0, -2.0, 1.0], fov: 30, exposure: 0.5, settle: 1, roll: 0.03 },
  // VIII Foundations: from below, looking up the train
  { pos: [3.5, -15.5, 21], look: [2.2, -2.0, 1.0], fov: 30, exposure: 0.5, settle: 1, roll: -0.03 },
  // IX Say hello: the full movement, winding down
  { pos: [1.8, -1.7, 40], look: [1.8, -1.7, 0], fov: 30, exposure: 0.8, settle: 0.22 },
];

export function buildPaths() {
  const pos = new THREE.CatmullRomCurve3(SHOTS.map((s) => new THREE.Vector3(...s.pos)), false, "centripetal");
  const look = new THREE.CatmullRomCurve3(SHOTS.map((s) => new THREE.Vector3(...s.look)), false, "centripetal");
  return { pos, look };
}
