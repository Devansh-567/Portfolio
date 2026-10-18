import * as THREE from "three";

/**
 * A skeleton watch movement built entirely from code.
 *
 * Every wheel shares one tooth module, so centre distances are exact and the
 * tooth phase of each driven wheel is solved analytically (see `solveAngles`).
 * Turn the barrel and the whole train follows at the correct ratios.
 */

export const MODULE = 0.1;
const LAYER = [0, 0.72, 1.44];
const BRIDGE_Z = 2.16;
const PLATE_Z = -1.05;
export const CENTER = new THREE.Vector3(1.8, -1.7, 0);

type MatKey = "brass" | "rose" | "steel" | "graphite";

interface Spec {
  id: string;
  N: number;
  layer: 0 | 1 | 2;
  mat: MatKey;
  mesh?: string; // meshes with this wheel
  phi?: number; // direction (degrees) from the parent wheel to this one
  coax?: string; // shares an axle with this wheel
  spokes?: number;
  thick?: number;
}

const SPECS: Spec[] = [
  { id: "barrel", N: 70, layer: 0, mat: "brass", spokes: 6, thick: 0.34 },
  { id: "g1", N: 24, layer: 0, mat: "steel", mesh: "barrel", phi: 32 },
  { id: "g2", N: 60, layer: 1, mat: "rose", coax: "g1", spokes: 6 },
  { id: "g3", N: 20, layer: 1, mat: "steel", mesh: "g2", phi: -26 },
  { id: "g4", N: 50, layer: 2, mat: "brass", coax: "g3", spokes: 5 },
  { id: "esc", N: 16, layer: 2, mat: "graphite", mesh: "g4", phi: 34 },
  { id: "g6", N: 22, layer: 0, mat: "steel", mesh: "barrel", phi: -116 },
  { id: "g7", N: 54, layer: 1, mat: "brass", coax: "g6", spokes: 6 },
  { id: "g8", N: 18, layer: 1, mat: "steel", mesh: "g7", phi: -28 },
  { id: "g9", N: 40, layer: 2, mat: "rose", coax: "g8", spokes: 5 },
  { id: "g10", N: 14, layer: 2, mat: "graphite", mesh: "g9", phi: -60 },
  { id: "g11", N: 28, layer: 0, mat: "steel", mesh: "barrel", phi: 170 },
  { id: "g12", N: 52, layer: 1, mat: "brass", coax: "g11", spokes: 6 },
];

export interface Gear {
  id: string;
  N: number;
  r: number;
  pos: THREE.Vector2;
  z: number;
  parent?: Gear;
  coaxWith?: Gear;
  phi: number; // radians
  /** angular speed relative to the barrel (signed) */
  ratio: number;
  angle: number;
  mesh: THREE.Mesh;
}

interface Part {
  obj: THREE.Object3D;
  home: THREE.Vector3;
  from: THREE.Vector3;
  delay: number;
  dur: number;
}

const easeOutQuart = (x: number) => 1 - Math.pow(1 - Math.min(Math.max(x, 0), 1), 4);

// ---------------------------------------------------------------- textures

function canvasTex(size: number, draw: (g: CanvasRenderingContext2D, s: number) => void) {
  const c = document.createElement("canvas");
  c.width = c.height = size;
  const g = c.getContext("2d")!;
  draw(g, size);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.NoColorSpace;
  t.anisotropy = 4;
  return t;
}

/** Fine concentric brushing, centred in the texture. */
function ringTexture() {
  return canvasTex(1024, (g, s) => {
    g.fillStyle = "#808080";
    g.fillRect(0, 0, s, s);
    for (let r = 2; r < s / 2; r += 1.6) {
      const v = 128 + (Math.random() - 0.5) * 70;
      g.strokeStyle = `rgb(${v},${v},${v})`;
      g.lineWidth = 1.1;
      g.beginPath();
      g.arc(s / 2, s / 2, r, 0, Math.PI * 2);
      g.stroke();
    }
  });
}

/** Côtes de Genève: soft parallel waves, one period per tile. */
function genevaTexture() {
  const t = canvasTex(256, (g, s) => {
    const img = g.createImageData(s, s);
    for (let x = 0; x < s; x++) {
      const v = 128 + Math.sin((x / s) * Math.PI * 2) * 95;
      for (let y = 0; y < s; y++) {
        const i = (y * s + x) * 4;
        img.data[i] = img.data[i + 1] = img.data[i + 2] = v;
        img.data[i + 3] = 255;
      }
    }
    g.putImageData(img, 0, 0);
  });
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  return t;
}

// --------------------------------------------------------------- materials

const METAL: Record<MatKey, { color: number; rough: number }> = {
  brass: { color: 0xd1a763, rough: 0.3 },
  rose: { color: 0xcf9378, rough: 0.28 },
  steel: { color: 0xc4c9ce, rough: 0.17 },
  graphite: { color: 0x34302c, rough: 0.3 },
};

// -------------------------------------------------------------- geometry

function gearShape(N: number, r: number, spokes: number, hubR: number, rimW: number) {
  const tip = r + MODULE;
  const root = r - 1.25 * MODULE;
  const hp = Math.PI / N;
  const shape = new THREE.Shape();
  const P = (rad: number, a: number): [number, number] => [Math.cos(a) * rad, Math.sin(a) * rad];
  for (let i = 0; i < N; i++) {
    const c = i * 2 * hp;
    const pts = [
      P(root, c - 0.6 * hp),
      P(r, c - 0.47 * hp),
      P(tip, c - 0.24 * hp),
      P(tip, c + 0.24 * hp),
      P(r, c + 0.47 * hp),
      P(root, c + 0.6 * hp),
      P(root, c + hp),
    ];
    pts.forEach(([x, y], j) => (i === 0 && j === 0 ? shape.moveTo(x, y) : shape.lineTo(x, y)));
  }
  shape.closePath();

  if (spokes > 0) {
    const inner = hubR;
    const outer = root - rimW;
    const bar = 0.2;
    const gap = bar / 2 / ((inner + outer) / 2);
    const step = (Math.PI * 2) / spokes;
    for (let k = 0; k < spokes; k++) {
      const a0 = k * step + gap + step * 0.5;
      const a1 = (k + 1) * step - gap + step * 0.5;
      const h = new THREE.Path();
      h.absarc(0, 0, outer, a0, a1, false);
      h.absarc(0, 0, inner, a1, a0, true);
      h.closePath();
      shape.holes.push(h);
    }
  }
  const bore = new THREE.Path();
  bore.absarc(0, 0, 0.1, 0, Math.PI * 2, true);
  shape.holes.push(bore);
  return shape;
}

function capsuleShape(ax: number, ay: number, bx: number, by: number, w: number, window = false) {
  const ang = Math.atan2(by - ay, bx - ax);
  const r = w / 2;
  const s = new THREE.Shape();
  s.absarc(bx, by, r, ang - Math.PI / 2, ang + Math.PI / 2, false);
  s.absarc(ax, ay, r, ang + Math.PI / 2, ang + (3 * Math.PI) / 2, false);
  s.closePath();
  if (window) {
    const L = Math.hypot(bx - ax, by - ay);
    const m = 0.62;
    const ux = (bx - ax) / L;
    const uy = (by - ay) / L;
    const r2 = r - 0.2;
    const h = new THREE.Path();
    h.absarc(bx - ux * m, by - uy * m, r2, ang - Math.PI / 2, ang + Math.PI / 2, false);
    h.absarc(ax + ux * m, ay + uy * m, r2, ang + Math.PI / 2, ang + (3 * Math.PI) / 2, false);
    h.closePath();
    s.holes.push(h);
  }
  return s;
}

const bevel = (depth: number, size = 0.012) => ({
  depth,
  bevelEnabled: true,
  bevelThickness: 0.016,
  bevelSize: size,
  bevelOffset: -size,
  bevelSegments: 2,
  curveSegments: 8,
  steps: 1,
});

class Spiral extends THREE.Curve<THREE.Vector3> {
  constructor(private r0: number, private r1: number, private turns: number) {
    super();
  }
  getPoint(t: number, target = new THREE.Vector3()) {
    const a = t * this.turns * Math.PI * 2;
    const r = this.r0 + (this.r1 - this.r0) * t;
    return target.set(Math.cos(a) * r, Math.sin(a) * r, 0);
  }
}

// ------------------------------------------------------------------ class

export class Movement {
  group = new THREE.Group();
  gears: Gear[] = [];
  gearMeshes: THREE.Mesh[] = [];
  balance = new THREE.Group();
  hairspring!: THREE.Mesh;
  private parts: Part[] = [];
  private axles = new Map<string, THREE.Vector2>();
  private spinFrom = new Map<string, number>();
  private geoms: THREE.BufferGeometry[] = [];
  private mats: THREE.Material[] = [];
  private texs: THREE.Texture[] = [];

  constructor() {
    const ring = ringTexture();
    const geneva = genevaTexture();
    this.texs.push(ring, geneva);

    const metal = (key: MatKey, bump?: THREE.Texture, bumpScale = 1.5) => {
      const m = new THREE.MeshStandardMaterial({
        color: METAL[key].color,
        metalness: 1,
        roughness: METAL[key].rough,
        envMapIntensity: 1.2,
        ...(bump ? { bumpMap: bump, bumpScale } : {}),
      });
      this.mats.push(m);
      return m;
    };

    // ---- wheels
    const byId = new Map<string, Gear>();
    SPECS.forEach((s, i) => {
      const r = (MODULE * s.N) / 2;
      let pos = new THREE.Vector2();
      let parent: Gear | undefined;
      let coaxWith: Gear | undefined;
      const phi = THREE.MathUtils.degToRad(s.phi ?? 0);
      if (s.mesh) {
        parent = byId.get(s.mesh)!;
        const d = parent.r + r;
        pos = new THREE.Vector2(parent.pos.x + d * Math.cos(phi), parent.pos.y + d * Math.sin(phi));
      } else if (s.coax) {
        coaxWith = byId.get(s.coax)!;
        pos = coaxWith.pos.clone();
      }
      const ratio = parent ? -(parent.ratio * parent.N) / s.N : coaxWith ? coaxWith.ratio : 1;

      const hubR = Math.max(0.3, (r - 1.25 * MODULE) * 0.2);
      const rimW = Math.max(0.12, (r - 1.25 * MODULE) * 0.1);
      const thick = s.thick ?? 0.2;
      const geo = new THREE.ExtrudeGeometry(gearShape(s.N, r, s.spokes ?? 0, hubR, rimW), bevel(thick));
      geo.translate(0, 0, -thick / 2);
      this.geoms.push(geo);

      const bump = ring.clone();
      bump.needsUpdate = true;
      const R = r + MODULE;
      bump.repeat.set(1 / (2 * R), 1 / (2 * R));
      bump.offset.set(0.5, 0.5);
      this.texs.push(bump);
      const mesh = new THREE.Mesh(geo, metal(s.mat, bump, 2.2));
      mesh.castShadow = mesh.receiveShadow = true;
      const gear: Gear = { id: s.id, N: s.N, r, pos, z: LAYER[s.layer], parent, coaxWith, phi, ratio, angle: 0, mesh };
      mesh.userData.gear = gear;
      mesh.position.set(pos.x, pos.y, gear.z);
      this.group.add(mesh);
      this.gears.push(gear);
      this.gearMeshes.push(mesh);
      byId.set(s.id, gear);
      this.axles.set(`${pos.x.toFixed(3)},${pos.y.toFixed(3)}`, pos);

      const from = new THREE.Vector3(
        pos.x + (i % 2 ? 1 : -1) * (5 + (i * 3.7) % 9),
        pos.y + (i % 3 ? 1 : -1) * (3 + (i * 2.3) % 8),
        gear.z + 16 + (i * 1.9) % 7,
      );
      this.parts.push({ obj: mesh, home: mesh.position.clone(), from, delay: 0.1 + i * 0.085, dur: 1.7 });
      this.spinFrom.set(s.id, (i % 2 ? 1 : -1) * (2.2 + (i % 4) * 0.9));
    });

    // ---- axles and jewels
    const steel = metal("steel");
    const rhodium = metal("steel");
    rhodium.color.set(0x9a9fa4);
    const rubyMat = new THREE.MeshPhysicalMaterial({
      color: 0x6a0f1f,
      emissive: 0x1a0306,
      roughness: 0.08,
      metalness: 0,
      clearcoat: 1,
      clearcoatRoughness: 0.04,
      ior: 1.76,
    });
    const chatonMat = metal("brass");
    this.mats.push(rubyMat);
    const hardware = new THREE.Group();
    const axleGeo = new THREE.CylinderGeometry(0.085, 0.085, 3.3, 16);
    axleGeo.rotateX(Math.PI / 2);
    const chatonGeo = new THREE.CylinderGeometry(0.4, 0.43, 0.1, 40);
    chatonGeo.rotateX(Math.PI / 2);
    const rubyGeo = new THREE.CylinderGeometry(0.21, 0.25, 0.13, 32);
    rubyGeo.rotateX(Math.PI / 2);
    this.geoms.push(axleGeo, chatonGeo, rubyGeo);
    this.axles.forEach((p) => {
      const axle = new THREE.Mesh(axleGeo, steel);
      axle.position.set(p.x, p.y, 0.95);
      axle.castShadow = true;
      const chaton = new THREE.Mesh(chatonGeo, chatonMat);
      chaton.position.set(p.x, p.y, BRIDGE_Z + 0.13);
      chaton.castShadow = true;
      const ruby = new THREE.Mesh(rubyGeo, rubyMat);
      ruby.position.set(p.x, p.y, BRIDGE_Z + 0.2);
      hardware.add(axle, chaton, ruby);
    });
    this.group.add(hardware);
    this.parts.push({ obj: hardware, home: hardware.position.clone(), from: new THREE.Vector3(0, 0, 14), delay: 1.5, dur: 1.2 });

    // ---- bridges (rose gold, Côtes de Genève)
    const gBump = geneva.clone();
    gBump.needsUpdate = true;
    gBump.repeat.set(1 / 0.62, 1 / 0.62);
    gBump.rotation = Math.PI / 4.6;
    this.texs.push(gBump);
    const bridgeMat = metal("rose", gBump, 2.4);
    const ax = (id: string) => byId.get(id)!.pos;
    const links: [string, string, boolean, number][] = [
      ["g11", "barrel", true, 1.05],
      ["barrel", "g6", true, 1.05],
      ["g1", "g3", true, 1.0],
      ["g3", "esc", false, 0.95],
      ["g6", "g8", true, 0.95],
      ["g8", "g10", false, 0.9],
    ];
    const bridges = new THREE.Group();
    links.forEach(([a, b, win, w], i) => {
      const A = ax(a);
      const B = ax(b);
      const geo = new THREE.ExtrudeGeometry(capsuleShape(A.x, A.y, B.x, B.y, w, win && Math.hypot(B.x - A.x, B.y - A.y) > 2.6), bevel(0.16, 0.02));
      this.geoms.push(geo);
      const m = new THREE.Mesh(geo, bridgeMat);
      m.position.z = BRIDGE_Z + i * 0.004;
      m.castShadow = m.receiveShadow = true;
      bridges.add(m);
    });
    this.group.add(bridges);
    this.parts.push({ obj: bridges, home: bridges.position.clone(), from: new THREE.Vector3(0, 0, 18), delay: 1.2, dur: 1.4 });

    // ---- screws on the bridges
    const screwGeo = new THREE.CylinderGeometry(0.17, 0.17, 0.06, 28);
    screwGeo.rotateX(Math.PI / 2);
    const slotGeo = new THREE.BoxGeometry(0.28, 0.04, 0.03);
    this.geoms.push(screwGeo, slotGeo);
    const slotMat = new THREE.MeshStandardMaterial({ color: 0x15110e, roughness: 0.6, metalness: 0.4 });
    this.mats.push(slotMat);
    const screws = new THREE.Group();
    [
      [-2.4, 0.42],
      [-1.0, -2.0],
      [5.8, 1.6],
      [9.0, 1.7],
      [-0.4, -7.0],
      [1.8, 0.0],
    ].forEach(([x, y], i) => {
      const s = new THREE.Mesh(screwGeo, rhodium);
      const slot = new THREE.Mesh(slotGeo, slotMat);
      slot.position.z = 0.03;
      s.add(slot);
      s.rotation.z = i * 1.3;
      s.position.set(x, y, BRIDGE_Z + 0.26);
      s.castShadow = true;
      screws.add(s);
    });
    this.group.add(screws);
    this.parts.push({ obj: screws, home: screws.position.clone(), from: new THREE.Vector3(0, 0, 20), delay: 1.8, dur: 1.0 });

    // ---- balance wheel with hairspring
    const gold = metal("brass");
    this.mats.push(gold);
    const bal = this.balance;
    const ringGeo = new THREE.TorusGeometry(2.0, 0.12, 20, 120);
    const armGeo = new THREE.BoxGeometry(2.0, 0.16, 0.1);
    const hubGeo = new THREE.CylinderGeometry(0.36, 0.36, 0.14, 36);
    hubGeo.rotateX(Math.PI / 2);
    const poiseGeo = new THREE.CylinderGeometry(0.11, 0.11, 0.3, 20);
    poiseGeo.rotateX(Math.PI / 2);
    this.geoms.push(ringGeo, armGeo, hubGeo, poiseGeo);
    const ringMesh = new THREE.Mesh(ringGeo, gold);
    ringMesh.castShadow = true;
    bal.add(ringMesh);
    for (let k = 0; k < 3; k++) {
      const arm = new THREE.Mesh(armGeo, gold);
      arm.rotation.z = (k * Math.PI * 2) / 3 + Math.PI / 2;
      arm.position.set(Math.cos(arm.rotation.z) * 1.0, Math.sin(arm.rotation.z) * 1.0, 0);
      arm.castShadow = true;
      bal.add(arm);
    }
    bal.add(new THREE.Mesh(hubGeo, gold));
    for (let k = 0; k < 12; k++) {
      const a = (k / 12) * Math.PI * 2;
      const p = new THREE.Mesh(poiseGeo, k % 3 === 0 ? gold : steel);
      p.position.set(Math.cos(a) * 2.0, Math.sin(a) * 2.0, 0);
      p.castShadow = true;
      bal.add(p);
    }
    const springGeo = new THREE.TubeGeometry(new Spiral(0.32, 1.28, 9), 700, 0.014, 5, false);
    this.geoms.push(springGeo);
    const springMat = new THREE.MeshStandardMaterial({ color: 0x7587a8, metalness: 1, roughness: 0.22, envMapIntensity: 1.3 });
    this.mats.push(springMat);
    this.hairspring = new THREE.Mesh(springGeo, springMat);
    this.hairspring.position.z = 0.16;
    bal.add(this.hairspring);
    const balHome = new THREE.Vector3(7.0, -5.3, 0.9);
    bal.position.copy(balHome);
    this.group.add(bal);
    this.parts.push({ obj: bal, home: balHome.clone(), from: new THREE.Vector3(14, -14, 14), delay: 1.0, dur: 1.6 });

    // balance cock
    const cockGeo = new THREE.ExtrudeGeometry(capsuleShape(balHome.x, balHome.y, balHome.x + 3.0, balHome.y + 1.9, 0.9, false), bevel(0.16, 0.02));
    this.geoms.push(cockGeo);
    const cock = new THREE.Mesh(cockGeo, bridgeMat);
    cock.position.z = BRIDGE_Z + 0.03;
    cock.castShadow = cock.receiveShadow = true;
    const cockJewel = new THREE.Mesh(rubyGeo, rubyMat);
    cockJewel.position.set(balHome.x, balHome.y, BRIDGE_Z + 0.22);
    const cockChaton = new THREE.Mesh(chatonGeo, chatonMat);
    cockChaton.position.set(balHome.x, balHome.y, BRIDGE_Z + 0.15);
    const cockGroup = new THREE.Group();
    cockGroup.add(cock, cockChaton, cockJewel);
    this.group.add(cockGroup);
    this.parts.push({ obj: cockGroup, home: cockGroup.position.clone(), from: new THREE.Vector3(0, 0, 18), delay: 1.7, dur: 1.2 });

    // ---- main plate, dial track and case bezel
    const plate = new THREE.Mesh(
      new THREE.CylinderGeometry(13.4, 13.4, 0.4, 160).rotateX(Math.PI / 2),
      (() => {
        const t = geneva.clone();
        t.needsUpdate = true;
        t.repeat.set(1 / 1.1, 1 / 1.1);
        t.rotation = -Math.PI / 5;
        this.texs.push(t);
        const m = new THREE.MeshStandardMaterial({ color: 0x241f1a, metalness: 0.9, roughness: 0.46, bumpMap: t, bumpScale: 1.1, envMapIntensity: 0.8 });
        this.mats.push(m);
        return m;
      })(),
    );
    plate.position.set(CENTER.x, CENTER.y, PLATE_Z);
    plate.receiveShadow = true;
    this.geoms.push(plate.geometry);
    this.group.add(plate);

    const tickMat = new THREE.MeshStandardMaterial({ color: 0xcdb48a, metalness: 0.7, roughness: 0.4, emissive: 0x2a2012 });
    this.mats.push(tickMat);
    const tickGeo = new THREE.BoxGeometry(0.06, 0.34, 0.06);
    const tickLong = new THREE.BoxGeometry(0.1, 0.8, 0.06);
    this.geoms.push(tickGeo, tickLong);
    const ticks = new THREE.Group();
    for (let k = 0; k < 120; k++) {
      const a = (k / 120) * Math.PI * 2;
      const major = k % 10 === 0;
      const t = new THREE.Mesh(major ? tickLong : tickGeo, tickMat);
      const rr = major ? 12.45 : 12.6;
      t.position.set(CENTER.x + Math.cos(a) * rr, CENTER.y + Math.sin(a) * rr, PLATE_Z + 0.22);
      t.rotation.z = a + Math.PI / 2;
      ticks.add(t);
    }
    this.group.add(ticks);

    const bezel = new THREE.Mesh(new THREE.TorusGeometry(13.55, 0.5, 28, 200), metal("brass"));
    bezel.position.set(CENTER.x, CENTER.y, PLATE_Z + 0.1);
    bezel.castShadow = true;
    this.geoms.push(bezel.geometry);
    this.group.add(bezel);
  }

  /** Solve every wheel's angle from the barrel angle so teeth interlock. */
  solveAngles(master: number) {
    for (const g of this.gears) {
      if (!g.parent && !g.coaxWith) g.angle = master;
      else if (g.coaxWith) g.angle = g.coaxWith.angle;
      else {
        const p = g.parent!;
        g.angle = g.phi + Math.PI + Math.PI / g.N - (p.N / g.N) * (p.angle - g.phi);
      }
    }
  }

  /**
   * @param master barrel angle in radians
   * @param intro  seconds since the intro began
   * @param time   running clock, for the balance wheel
   * @param settle 0..1, how much of the balance swing remains (the movement winds down at the end)
   */
  update(master: number, intro: number, time: number, settle: number) {
    this.solveAngles(master);
    for (const p of this.parts) {
      const e = easeOutQuart((intro - p.delay) / p.dur);
      p.obj.visible = intro > p.delay;
      p.obj.position.lerpVectors(p.from, p.home, e);
      p.obj.scale.setScalar(0.25 + 0.75 * e);
    }
    for (const g of this.gears) {
      const part = this.parts.find((q) => q.obj === g.mesh)!;
      const e = easeOutQuart((intro - part.delay) / part.dur);
      g.mesh.rotation.z = g.angle + (1 - e) * (this.spinFrom.get(g.id) ?? 0);
    }
    const swing = Math.sin(time * Math.PI * 2 * 2.0) * (1.05 * settle);
    this.balance.rotation.z = swing;
    this.hairspring.scale.setScalar(1 + swing * 0.018);
  }

  dispose() {
    this.geoms.forEach((g) => g.dispose());
    this.mats.forEach((m) => m.dispose());
    this.texs.forEach((t) => t.dispose());
  }
}
