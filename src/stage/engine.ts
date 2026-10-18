import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { Movement, CENTER } from "./movement";
import { SHOTS, buildPaths } from "./chapters";
import { chapters } from "@/data/portfolio";
import { cinema, prefersReducedMotion } from "@/lib/cinema";
import { tick } from "@/lib/audio";

const TICK_EVERY = 0.25; // seconds, a 28,800 vph escapement
const TICK_STEP = 0.0125; // barrel radians per tick
const SCROLL_TO_ANGLE = 0.0011;
const MAX_MASTER_VEL = 0.9;

const smoother = (x: number) => x * x * x * (x * (x * 6 - 15) + 10);
const clamp = (x: number, a: number, b: number) => Math.min(b, Math.max(a, x));
const wrapPi = (a: number) => Math.atan2(Math.sin(a), Math.cos(a));

export interface Stage {
  dispose(): void;
}

export function createStage(canvas: HTMLCanvasElement): Stage | null {
  let renderer: THREE.WebGLRenderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: "high-performance" });
  } catch {
    return null;
  }
  const reduced = prefersReducedMotion();

  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.setClearColor(0x120e0a, 1);

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x120e0a, 0.0105);
  const pmrem = new THREE.PMREMGenerator(renderer);
  const envTex = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environment = envTex;
  scene.environmentIntensity = 0.62;

  const camera = new THREE.PerspectiveCamera(30, 1, 0.5, 200);

  // ---- lights
  const key = new THREE.DirectionalLight(0xffdcae, 3.3);
  key.position.set(CENTER.x - 9, CENTER.y + 13, 24);
  key.target.position.copy(CENTER);
  key.castShadow = true;
  key.shadow.mapSize.set(2048, 2048);
  const sc = key.shadow.camera;
  sc.left = -17; sc.right = 17; sc.top = 17; sc.bottom = -17; sc.near = 1; sc.far = 70;
  key.shadow.bias = -0.0005;
  key.shadow.normalBias = 0.025;
  const rim = new THREE.DirectionalLight(0xb7c3d2, 0.9);
  rim.position.set(CENTER.x + 14, CENTER.y - 6, 10);
  rim.target.position.copy(CENTER);
  const glint = new THREE.PointLight(0xffe3b8, 70, 28, 1.5);
  glint.position.set(CENTER.x, CENTER.y, 7);
  scene.add(key, key.target, rim, rim.target, glint);

  // ---- the movement
  const movement = new Movement();
  scene.add(movement.group);

  // ---- dust in the light
  const DUST = 240;
  const dustPos = new Float32Array(DUST * 3);
  const dustSeed = new Float32Array(DUST);
  for (let i = 0; i < DUST; i++) {
    dustPos[i * 3] = CENTER.x + (Math.random() - 0.5) * 34;
    dustPos[i * 3 + 1] = CENTER.y + (Math.random() - 0.5) * 24;
    dustPos[i * 3 + 2] = -1 + Math.random() * 16;
    dustSeed[i] = Math.random() * 10;
  }
  const dustGeo = new THREE.BufferGeometry();
  dustGeo.setAttribute("position", new THREE.BufferAttribute(dustPos, 3));
  const dust = new THREE.Points(
    dustGeo,
    new THREE.PointsMaterial({ color: 0xf0d9aa, size: 0.07, transparent: true, opacity: 0.35, depthWrite: false, sizeAttenuation: true }),
  );
  scene.add(dust);

  // ---- camera path
  const paths = buildPaths();
  const nShots = SHOTS.length;
  const tmpP = new THREE.Vector3();
  const tmpL = new THREE.Vector3();

  // ---- section anchors (document coordinates)
  let tops: number[] = [];
  let bottoms: number[] = [];
  const measure = () => {
    tops = [];
    bottoms = [];
    chapters.forEach((c) => {
      const el = document.getElementById(c.id);
      if (!el) {
        tops.push(tops.length ? bottoms[bottoms.length - 1] : 0);
        bottoms.push(tops[tops.length - 1] + 1);
        return;
      }
      const r = el.getBoundingClientRect();
      tops.push(r.top + window.scrollY);
      bottoms.push(r.bottom + window.scrollY);
    });
  };

  const computeU = () => {
    const y = window.scrollY + window.innerHeight * 0.5;
    const mids = tops.map((t, i) => (t + bottoms[i]) / 2);
    if (y <= mids[0]) return 0;
    if (y >= mids[nShots - 1]) return nShots - 1;
    let i = 0;
    while (i < nShots - 2 && y > mids[i + 1]) i++;
    const f = (y - mids[i]) / (mids[i + 1] - mids[i]);
    return i + smoother(clamp(f, 0, 1));
  };

  const currentChapter = () => {
    const y = window.scrollY + window.innerHeight * 0.4;
    let c = 0;
    for (let i = 0; i < tops.length; i++) if (y >= tops[i]) c = i;
    return c;
  };

  // ---- sizing
  let aspect = 1;
  const resize = () => {
    const w = canvas.clientWidth || window.innerWidth;
    const h = canvas.clientHeight || window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, w < 760 ? 1.5 : 2);
    renderer.setPixelRatio(dpr);
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    aspect = w / h;
    camera.updateProjectionMatrix();
    measure();
  };
  resize();
  const ro = new ResizeObserver(resize);
  ro.observe(document.body);
  window.addEventListener("resize", resize);

  // ---- state
  let master = 0;
  let masterVel = 0;
  let tickTimer = 0;
  let tickTarget = 0;
  let tickPos = 0;
  let tickVel = 0;
  let prevScroll = window.scrollY;
  let u = computeU();
  let zoom = 0;
  let zoomTarget = 0;
  let yaw = 0, pitch = 0, yawT = 0, pitchT = 0;
  const pointer = new THREE.Vector2(0, 0);
  const pointerS = new THREE.Vector2(0, 0);
  let introT = reduced ? 10 : 0;
  let announcedReady = reduced;
  let lastChapter = -1;
  let frozenU: number | null = null;
  let dragMoved = 0;

  // ---- interaction
  const ray = new THREE.Raycaster();
  const ndc = new THREE.Vector2();
  const setNdc = (e: PointerEvent | MouseEvent) => {
    const r = canvas.getBoundingClientRect();
    ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
  };
  type Drag =
    | { kind: "gear"; gear: import("./movement").Gear; last: number; id: number; t: number }
    | { kind: "orbit"; x: number; y: number; id: number };
  let drag: Drag | null = null;

  const pickGear = () => {
    ray.setFromCamera(ndc, camera);
    const hit = ray.intersectObjects(movement.gearMeshes, false)[0];
    return hit ? (hit.object.userData.gear as import("./movement").Gear) : null;
  };
  const gearAngleAt = (gear: import("./movement").Gear) => {
    ray.setFromCamera(ndc, camera);
    const normal = new THREE.Vector3(0, 0, 1).applyQuaternion(movement.group.quaternion);
    const point = movement.group.localToWorld(new THREE.Vector3(gear.pos.x, gear.pos.y, gear.z));
    const plane = new THREE.Plane().setFromNormalAndCoplanarPoint(normal, point);
    const hit = new THREE.Vector3();
    if (!ray.ray.intersectPlane(plane, hit)) return null;
    movement.group.worldToLocal(hit);
    return Math.atan2(hit.y - gear.pos.y, hit.x - gear.pos.x);
  };

  const onDown = (e: PointerEvent) => {
    if (e.target !== canvas || e.button !== 0) return;
    const free = cinema.get().free;
    if (e.pointerType === "touch" && !free) return;
    setNdc(e);
    const g = pickGear();
    dragMoved = 0;
    if (g) {
      const a = gearAngleAt(g);
      if (a === null) return;
      drag = { kind: "gear", gear: g, last: a, id: e.pointerId, t: performance.now() };
      masterVel = 0;
      canvas.style.cursor = "grabbing";
    } else {
      drag = { kind: "orbit", x: e.clientX, y: e.clientY, id: e.pointerId };
      canvas.style.cursor = "grabbing";
    }
    canvas.setPointerCapture?.(e.pointerId);
  };

  const onMove = (e: PointerEvent) => {
    pointer.set((e.clientX / window.innerWidth) * 2 - 1, -(e.clientY / window.innerHeight) * 2 + 1);
    if (!drag) {
      if (e.target === canvas && e.pointerType === "mouse") {
        setNdc(e);
        canvas.style.cursor = pickGear() ? "grab" : "default";
      }
      return;
    }
    if (drag.id !== e.pointerId) return;
    setNdc(e);
    if (drag.kind === "gear") {
      const a = gearAngleAt(drag.gear);
      if (a === null) return;
      const da = wrapPi(a - drag.last);
      drag.last = a;
      const dMaster = da / drag.gear.ratio;
      master += dMaster;
      const now = performance.now();
      const dt = Math.max((now - drag.t) / 1000, 0.008);
      drag.t = now;
      masterVel = clamp(masterVel * 0.6 + (dMaster / dt) * 0.4, -MAX_MASTER_VEL, MAX_MASTER_VEL);
      dragMoved += Math.abs(dMaster);
      if (dragMoved > 0.022) {
        dragMoved = 0;
        tick(0.55);
      }
    } else {
      yawT = clamp(yawT + (e.clientX - drag.x) * 0.0042, -0.75, 0.75);
      pitchT = clamp(pitchT + (e.clientY - drag.y) * 0.0034, -0.5, 0.5);
      drag.x = e.clientX;
      drag.y = e.clientY;
    }
  };

  const onUp = (e: PointerEvent) => {
    if (!drag || drag.id !== e.pointerId) return;
    drag = null;
    canvas.releasePointerCapture?.(e.pointerId);
    canvas.style.cursor = "default";
  };

  const onWheel = (e: WheelEvent) => {
    if (!cinema.get().free) return;
    e.preventDefault();
    zoomTarget = clamp(zoomTarget + e.deltaY * 0.0012, -0.4, 0.45);
  };
  const onDbl = (e: MouseEvent) => {
    if (e.target !== canvas) return;
    yawT = pitchT = 0;
    zoomTarget = 0;
  };

  window.addEventListener("pointerdown", onDown);
  window.addEventListener("pointermove", onMove);
  window.addEventListener("pointerup", onUp);
  window.addEventListener("pointercancel", onUp);
  window.addEventListener("wheel", onWheel, { passive: false });
  window.addEventListener("dblclick", onDbl);

  const unsub = cinema.subscribe(() => {
    const { free } = cinema.get();
    if (free && frozenU === null) frozenU = u;
    if (!free && frozenU !== null) {
      frozenU = null;
      zoomTarget = 0;
      yawT = pitchT = 0;
    }
    canvas.style.touchAction = free ? "none" : "pan-y";
  });
  canvas.style.touchAction = "pan-y";

  // ---- loop
  let raf = 0;
  let last = performance.now();
  let time = 0;
  const frame = (now: number) => {
    raf = requestAnimationFrame(frame);
    const dt = Math.min((now - last) / 1000, 0.05);
    last = now;
    time += dt;
    introT += dt;

    const st = cinema.get();
    const targetU = frozenU ?? computeU();
    u += (targetU - u) * (1 - Math.exp(-dt * 6));
    const ui = Math.min(Math.floor(u), nShots - 2);
    const uf = u - ui;
    const A = SHOTS[ui];
    const B = SHOTS[ui + 1];
    const fov = THREE.MathUtils.lerp(A.fov, B.fov, uf);
    const exposureBase = THREE.MathUtils.lerp(A.exposure, B.exposure, uf);
    const settle = THREE.MathUtils.lerp(A.settle, B.settle, uf);
    const roll = THREE.MathUtils.lerp(A.roll ?? 0, B.roll ?? 0, uf);

    paths.pos.getPoint(u / (nShots - 1), tmpP);
    paths.look.getPoint(u / (nShots - 1), tmpL);

    // keep the subject framed on narrow screens
    const fit = Math.max(1, 1.45 / aspect);
    zoom += (zoomTarget - zoom) * (1 - Math.exp(-dt * 6));
    const offset = tmpP.clone().sub(tmpL).multiplyScalar(fit * (1 + zoom));

    // opening dolly
    const intro = reduced ? 1 : clamp(introT / 4.2, 0, 1);
    const ie = 1 - Math.pow(1 - intro, 3);
    offset.multiplyScalar(1 + (1 - ie) * 0.9);
    const lookNow = tmpL.clone();
    // portrait screens: centre the subject and park it in the upper half, text goes below
    const narrow = clamp((1.3 - aspect) / 0.8, 0, 1);
    lookNow.x += (CENTER.x - lookNow.x) * narrow * 0.85;
    lookNow.y -= narrow * 3.2;
    lookNow.y -= (1 - ie) * 5;

    pointerS.lerp(pointer, 1 - Math.exp(-dt * 3));
    const camPos = lookNow.clone().add(offset);
    const dist = offset.length();
    camPos.x += pointerS.x * dist * 0.012;
    camPos.y += pointerS.y * dist * 0.009;
    if (!reduced) {
      camPos.x += Math.sin(time * 0.31) * 0.09;
      camPos.y += Math.cos(time * 0.27) * 0.07;
    }
    camera.position.copy(camPos);
    camera.up.set(Math.sin(roll), Math.cos(roll), 0);
    camera.lookAt(lookNow);
    if (Math.abs(camera.fov - fov) > 0.01) {
      camera.fov = fov;
      camera.updateProjectionMatrix();
    }

    // orbit spring (returns home unless the viewer holds the controls)
    if (!drag && !st.free) {
      yawT *= Math.exp(-dt * 1.6);
      pitchT *= Math.exp(-dt * 1.6);
    }
    yaw += (yawT - yaw) * (1 - Math.exp(-dt * 8));
    pitch += (pitchT - pitch) * (1 - Math.exp(-dt * 8));
    movement.group.position.copy(CENTER);
    movement.group.rotation.set(pitch, yaw, 0);
    movement.group.position.sub(CENTER.clone().applyEuler(movement.group.rotation));

    // ---- drive the barrel
    const sy = window.scrollY;
    master += (sy - prevScroll) * SCROLL_TO_ANGLE;
    prevScroll = sy;

    if (!drag) {
      master += masterVel * dt;
      masterVel *= Math.exp(-dt * 1.7);
      if (Math.abs(masterVel) < 0.0005) masterVel = 0;
    }

    if (!reduced && !drag && introT > 1.2) {
      tickTimer += dt;
      if (tickTimer >= TICK_EVERY) {
        tickTimer -= TICK_EVERY;
        tickTarget += TICK_STEP * (0.25 + 0.75 * settle);
        tick(0.7);
      }
    }
    const acc = (tickTarget - tickPos) * 950 - tickVel * 26;
    tickVel += acc * dt;
    tickPos += tickVel * dt;

    movement.update(master + tickPos, introT, time, reduced ? 1 : settle);

    // pointer glint
    const gl = new THREE.Vector3(pointerS.x, pointerS.y, 0.5).unproject(camera);
    const dir = gl.sub(camera.position).normalize();
    const t = (7 - camera.position.z) / dir.z;
    glint.position.copy(camera.position).addScaledVector(dir, t > 0 ? t : 20);

    if (!reduced) {
      const p = dustGeo.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < DUST; i++) {
        p.setY(i, p.getY(i) + dt * (0.12 + (dustSeed[i] % 1) * 0.1));
        p.setX(i, p.getX(i) + Math.sin(time * 0.2 + dustSeed[i]) * dt * 0.08);
        if (p.getY(i) > CENTER.y + 12) p.setY(i, CENTER.y - 12);
      }
      p.needsUpdate = true;
    }

    const fade = clamp(introT / 1.4, 0, 1);
    renderer.toneMappingExposure = exposureBase * (0.04 + 0.96 * fade * fade);
    renderer.render(scene, camera);

    const ch = currentChapter();
    if (ch !== lastChapter) {
      lastChapter = ch;
      cinema.set({ chapter: ch });
    }
    if (!announcedReady && introT > 3.4) {
      announcedReady = true;
      cinema.set({ ready: true });
    }
  };

  const onLost = (e: Event) => e.preventDefault();
  canvas.addEventListener("webglcontextlost", onLost);
  raf = requestAnimationFrame(frame);
  cinema.set({ stage: true, ready: reduced });
  if (import.meta.env.DEV) (window as unknown as { __skipIntro: () => void }).__skipIntro = () => (introT = 10);

  return {
    dispose() {
      cancelAnimationFrame(raf);
      ro.disconnect();
      unsub();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("dblclick", onDbl);
      canvas.removeEventListener("webglcontextlost", onLost);
      movement.dispose();
      dustGeo.dispose();
      envTex.dispose();
      pmrem.dispose();
      renderer.dispose();
      cinema.set({ stage: false });
    },
  };
}
