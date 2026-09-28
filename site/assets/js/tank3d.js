// Renderer 3D tangki (Three.js). Cairan dibentuk dari geometri penuh yang dipotong
// clipping plane pada ketinggian cairan, lalu permukaan ditutup bentuk penampang yang tepat.
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { maxHeight } from "./geometry.js";

const TARGET_SIZE = 3.2;

function readColor(name, fallback) {
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  try {
    return new THREE.Color(v || fallback);
  } catch {
    return new THREE.Color(fallback);
  }
}

function dims(tank) {
  switch (tank.type) {
    case "rect":
      return { L: tank.length, W: tank.width, H: tank.height };
    case "vcyl":
      return { L: tank.diameter, W: tank.diameter, H: tank.height };
    case "hcyl":
      return { L: tank.length, W: tank.diameter, H: tank.diameter };
    case "hcylEll": {
      const a = tank.headDepth ?? tank.diameter / 4;
      return { L: tank.length + 2 * a, W: tank.diameter, H: tank.diameter };
    }
    default:
      return { L: 1, W: 1, H: 1 };
  }
}

/** Kumpulan geometri bentuk tangki (dalam satuan dunia), dasar tangki di y = 0. */
function shapeParts(tank, s, shrink = 1) {
  const parts = [];
  const k = s * shrink;
  if (tank.type === "rect") {
    const g = new THREE.BoxGeometry(tank.length * k, tank.height * k, tank.width * k);
    g.translate(0, (tank.height * s) / 2, 0);
    parts.push(g);
  } else if (tank.type === "vcyl") {
    const r = (tank.diameter / 2) * k;
    const g = new THREE.CylinderGeometry(r, r, tank.height * k, 64, 1);
    g.translate(0, (tank.height * s) / 2, 0);
    parts.push(g);
  } else {
    const r = (tank.diameter / 2) * k;
    const L = tank.length * s;
    const cy = (tank.diameter / 2) * s;
    const g = new THREE.CylinderGeometry(r, r, L * shrink, 64, 1, true);
    g.rotateZ(Math.PI / 2);
    g.translate(0, cy, 0);
    parts.push(g);
    if (tank.type === "hcylEll") {
      const a = (tank.headDepth ?? tank.diameter / 4) * k;
      for (const side of [-1, 1]) {
        // x = −r·cos(φ)·sin(θ): φ ∈ (π/2, 3π/2) menghasilkan belahan x > 0.
        const head = new THREE.SphereGeometry(r, 48, 24, side > 0 ? Math.PI / 2 : -Math.PI / 2, Math.PI);
        head.scale(a / r, 1, 1);
        head.translate((side * L * shrink) / 2, cy, 0);
        parts.push(head);
      }
    } else {
      for (const side of [-1, 1]) {
        const cap = new THREE.CircleGeometry(r, 64);
        cap.rotateY((side * Math.PI) / 2);
        cap.translate((side * L * shrink) / 2, cy, 0);
        parts.push(cap);
      }
    }
  }
  return parts;
}

/** Bentuk permukaan cairan (penampang horizontal) pada ketinggian h (cm). */
function surfaceGeometry(tank, s, hcm) {
  const H = maxHeight(tank);
  const h = Math.min(Math.max(hcm, 0.001), H - 0.001);
  if (tank.type === "rect") {
    const g = new THREE.PlaneGeometry(tank.length * s * 0.985, tank.width * s * 0.985);
    g.rotateX(-Math.PI / 2);
    return g;
  }
  if (tank.type === "vcyl") {
    const g = new THREE.CircleGeometry((tank.diameter / 2) * s * 0.985, 64);
    g.rotateX(-Math.PI / 2);
    return g;
  }
  const r = tank.diameter / 2;
  const w = Math.sqrt(Math.max(0, r * r - (r - h) * (r - h))) * s * 0.985;
  const L = tank.length * s;
  if (tank.type === "hcyl") {
    const g = new THREE.PlaneGeometry(L * 0.995, 2 * w);
    g.rotateX(-Math.PI / 2);
    return g;
  }
  const a = (tank.headDepth ?? tank.diameter / 4) * s;
  const ax = (a * w) / (r * s);
  const shape = new THREE.Shape();
  shape.moveTo(-L / 2, -w);
  shape.lineTo(L / 2, -w);
  shape.absellipse(L / 2, 0, ax, w, -Math.PI / 2, Math.PI / 2, false, 0);
  shape.lineTo(-L / 2, w);
  shape.absellipse(-L / 2, 0, ax, w, Math.PI / 2, (3 * Math.PI) / 2, false, 0);
  const g = new THREE.ShapeGeometry(shape, 48);
  g.rotateX(-Math.PI / 2);
  return g;
}

export function createTankRenderer(container, { tank, levelPct, reducedMotion }) {
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "low-power" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.localClippingEnabled = true;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  container.prepend(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
  camera.position.set(4.6, 2.9, 5.4);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.enableZoom = false;
  controls.enablePan = false;
  controls.autoRotate = !reducedMotion;
  controls.autoRotateSpeed = 0.7;
  controls.minPolarAngle = 0.3;
  controls.maxPolarAngle = 1.48;

  scene.add(new THREE.HemisphereLight(0xffffff, 0x4b5a6a, 1.25));
  const sun = new THREE.DirectionalLight(0xffffff, 1.5);
  sun.position.set(3, 6, 4);
  scene.add(sun);

  const colors = {
    fuel: readColor("--fuel", "#d97706"),
    fuel2: readColor("--fuel-2", "#f59e0b"),
    accent: readColor("--accent", "#0b7a84"),
    line: readColor("--line-strong", "#c7cfd9"),
  };

  const clipPlane = new THREE.Plane(new THREE.Vector3(0, -1, 0), 1);
  const liquidMat = new THREE.MeshStandardMaterial({
    color: colors.fuel,
    roughness: 0.35,
    metalness: 0.05,
    clippingPlanes: [clipPlane],
    side: THREE.DoubleSide,
  });
  const surfaceMat = new THREE.MeshStandardMaterial({
    color: colors.fuel2,
    roughness: 0.2,
    metalness: 0.1,
    emissive: colors.fuel2,
    emissiveIntensity: 0.12,
    side: THREE.DoubleSide,
  });
  const shellMat = new THREE.MeshPhysicalMaterial({
    color: 0xa9bfd0,
    roughness: 0.15,
    metalness: 0,
    transparent: true,
    opacity: 0.16,
    depthWrite: false,
    side: THREE.DoubleSide,
  });
  const edgeMat = new THREE.LineBasicMaterial({ color: colors.accent, transparent: true, opacity: 0.55 });
  const beamMat = new THREE.MeshBasicMaterial({ color: colors.accent, transparent: true, opacity: 0.16, depthWrite: false });
  const ringMat = new THREE.MeshBasicMaterial({ color: colors.accent, transparent: true, opacity: 0.5, side: THREE.DoubleSide, depthWrite: false });
  const shadowTex = (() => {
    const c = document.createElement("canvas");
    c.width = 128;
    c.height = 128;
    const g = c.getContext("2d");
    const grad = g.createRadialGradient(64, 64, 4, 64, 64, 64);
    grad.addColorStop(0, "rgba(0,0,0,0.28)");
    grad.addColorStop(1, "rgba(0,0,0,0)");
    g.fillStyle = grad;
    g.fillRect(0, 0, 128, 128);
    return new THREE.CanvasTexture(c);
  })();
  const shadowMat = new THREE.MeshBasicMaterial({ map: shadowTex, transparent: true, depthWrite: false });

  const tankGroup = new THREE.Group();
  scene.add(tankGroup);

  let current = { tank, levelPct, mode: "SLOW", s: 1, topY: 1, sensorY: 1.2 };
  let surfaceMesh = null;
  let beam = null;
  const rings = [];

  function disposeGroup() {
    tankGroup.traverse((o) => {
      if (o.geometry) o.geometry.dispose();
    });
    tankGroup.clear();
    rings.length = 0;
    surfaceMesh = null;
    beam = null;
  }

  function build() {
    disposeGroup();
    const t = current.tank;
    const d = dims(t);
    const s = TARGET_SIZE / Math.max(d.L, d.W, d.H * 1.25);
    current.s = s;
    const heightW = maxHeight(t) * s;
    current.topY = heightW;
    current.sensorY = heightW + 0.18;

    for (const g of shapeParts(t, s, 1)) {
      tankGroup.add(new THREE.Mesh(g, shellMat));
      const edges = new THREE.EdgesGeometry(g, 30);
      tankGroup.add(new THREE.LineSegments(edges, edgeMat));
    }
    for (const g of shapeParts(t, s, 0.985)) tankGroup.add(new THREE.Mesh(g, liquidMat));

    const shadow = new THREE.Mesh(new THREE.PlaneGeometry(d.L * s * 1.5, Math.max(d.W * s * 1.8, 1.2)), shadowMat);
    shadow.rotation.x = -Math.PI / 2;
    shadow.position.y = -0.005;
    tankGroup.add(shadow);

    const sensor = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 0.16, 24), new THREE.MeshStandardMaterial({ color: colors.accent, roughness: 0.4 }));
    sensor.position.set(0, heightW + 0.1, 0);
    tankGroup.add(sensor);
    const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.13, 0.06, 24), new THREE.MeshStandardMaterial({ color: 0x8a97a5, roughness: 0.6 }));
    neck.position.set(0, heightW + 0.01, 0);
    tankGroup.add(neck);

    beam = new THREE.Mesh(new THREE.ConeGeometry(1, 1, 32, 1, true), beamMat);
    tankGroup.add(beam);
    for (let i = 0; i < 3; i += 1) {
      const ring = new THREE.Mesh(new THREE.RingGeometry(0.06, 0.075, 40), ringMat.clone());
      ring.rotation.x = -Math.PI / 2;
      ring.userData.phase = i / 3;
      tankGroup.add(ring);
      rings.push(ring);
    }

    controls.target.set(0, heightW * 0.45, 0);
    const dist = 5.2;
    camera.position.set(dist * 0.72, heightW * 0.45 + 2.1, dist * 0.86);
    controls.update();
    applyLevel();
  }

  function applyLevel() {
    const t = current.tank;
    const H = maxHeight(t);
    const hcm = (H * current.levelPct) / 100;
    const y = hcm * current.s;
    clipPlane.constant = y;
    if (surfaceMesh) {
      surfaceMesh.geometry.dispose();
      tankGroup.remove(surfaceMesh);
      surfaceMesh = null;
    }
    if (current.levelPct > 0.3 && current.levelPct < 99.7) {
      surfaceMesh = new THREE.Mesh(surfaceGeometry(t, current.s, hcm), surfaceMat);
      surfaceMesh.position.y = y + 0.002;
      tankGroup.add(surfaceMesh);
    }
    if (beam) {
      const len = Math.max(0.05, current.sensorY - 0.08 - y);
      const radius = Math.min(0.55, len * 0.26);
      beam.geometry.dispose();
      beam.geometry = new THREE.ConeGeometry(radius, len, 32, 1, true);
      beam.position.set(0, current.sensorY - 0.08 - len / 2, 0);
    }
  }

  function setSize() {
    const w = container.clientWidth || 400;
    const hgt = container.clientHeight || 320;
    renderer.setSize(w, hgt, false);
    camera.aspect = w / hgt;
    camera.updateProjectionMatrix();
  }

  let visible = true;
  let running = false;
  const t0 = performance.now();

  function frame() {
    if (!visible || document.hidden) {
      running = false;
      return;
    }
    running = true;
    const t = (performance.now() - t0) / 1000;
    controls.update();
    const hcm = (maxHeight(current.tank) * current.levelPct) / 100;
    const yLevel = hcm * current.s;
    const top = current.sensorY - 0.08;
    const speed = current.mode === "SLOW" ? 0.35 : 1.1;
    for (const ring of rings) {
      const p = (t * speed + ring.userData.phase) % 1;
      ring.position.set(0, top - (top - yLevel) * p, 0);
      const sc = 1 + p * Math.min(6, (top - yLevel) * 3.2);
      ring.scale.set(sc, sc, sc);
      ring.material.opacity = 0.55 * (1 - p);
    }
    renderer.render(scene, camera);
    requestAnimationFrame(frame);
  }

  function kick() {
    if (!running) {
      running = true;
      requestAnimationFrame(frame);
    }
  }

  const ro = new ResizeObserver(() => {
    setSize();
    renderer.render(scene, camera);
  });
  ro.observe(container);

  if ("IntersectionObserver" in window) {
    new IntersectionObserver((entries) => {
      visible = entries.some((e) => e.isIntersecting);
      if (visible) kick();
    }).observe(container);
  }
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) kick();
  });
  document.addEventListener("themechange", () => {
    liquidMat.color = readColor("--fuel", "#d97706");
    surfaceMat.color = readColor("--fuel-2", "#f59e0b");
    surfaceMat.emissive = readColor("--fuel-2", "#f59e0b");
    edgeMat.color = readColor("--accent", "#0b7a84");
    beamMat.color = readColor("--accent", "#0b7a84");
    for (const r of rings) r.material.color = readColor("--accent", "#0b7a84");
  });

  setSize();
  build();
  kick();

  return {
    setTank(next) {
      current.tank = next;
      build();
      kick();
    },
    setLevel(pct) {
      if (Math.abs(pct - current.levelPct) < 0.001) return;
      current.levelPct = pct;
      applyLevel();
      kick();
    },
    setMode(mode) {
      current.mode = mode;
    },
  };
}
