// Kontrol visual tangki di hero. Perhitungan memakai geometry.js; renderer 3D dimuat
// terpisah, sehingga halaman tetap berfungsi (versi 2D) bila WebGL/CDN tidak tersedia.
import { TANK_PRESETS, TANK_TYPES, volumeAt, capacity, maxHeight, litersPerCm, describeTank } from "./geometry.js";
import { fmt, prefersReducedMotion } from "./ui.js";

const NECK_CM = 8; // asumsi tinggi leher/tutup di atas dinding dalam tangki

export function initTank() {
  const stage = document.getElementById("tank-stage");
  const fallback = document.getElementById("tank-fallback");
  const hint = document.getElementById("stage-hint");
  const select = document.getElementById("tank-shape");
  const slider = document.getElementById("tank-level");
  const out = document.getElementById("tank-level-out");
  const gensetBtn = document.getElementById("tank-genset");
  const refillBtn = document.getElementById("tank-refill");
  const cap = document.getElementById("viewer-cap");
  const pill = document.getElementById("mode-pill");
  const roVol = document.getElementById("ro-vol");
  const roCap = document.getElementById("ro-cap");
  const roGap = document.getElementById("ro-gap");
  const roLpc = document.getElementById("ro-lpc");

  for (const p of TANK_PRESETS) select.append(new Option(p.name, p.id));
  select.value = "bulk-4772";

  const state = {
    preset: TANK_PRESETS.find((p) => p.id === select.value),
    levelPct: Number(slider.value),
    genset: false,
    refillTarget: null,
    mode: "SLOW",
  };
  let renderer = null;

  // versi 2D (tampil hanya bila 3D tidak tersedia)
  fallback.innerHTML = `
    <svg width="260" height="170" viewBox="0 0 260 170" role="img" aria-label="Ilustrasi tangki">
      <defs><clipPath id="tank-clip"><rect x="20" y="40" width="220" height="112" rx="40"/></clipPath></defs>
      <g clip-path="url(#tank-clip)"><rect id="fb-liquid" x="20" y="100" width="220" height="60" fill="#d08a2a" fill-opacity=".85"/></g>
      <rect x="20" y="40" width="220" height="112" rx="40" fill="none" stroke="currentColor" stroke-opacity=".45" stroke-width="2"/>
      <rect x="119" y="22" width="22" height="18" rx="3" fill="currentColor" fill-opacity=".55"/>
    </svg>`;
  const fbLiquid = fallback.querySelector("#fb-liquid");
  hint.hidden = true;

  function drawFallback() {
    const top = 40;
    const bottom = 152;
    const y = bottom - ((bottom - top) * state.levelPct) / 100;
    fbLiquid.setAttribute("y", y.toFixed(1));
    fbLiquid.setAttribute("height", (bottom - y + 2).toFixed(1));
  }

  const MODE_TEXT = {
    SLOW: "Mode kirim: SLOW (heartbeat)",
    FAST: "Mode kirim: FAST (genset menyala)",
    EVENT: "Mode kirim: EVENT (isi ulang)",
  };

  function update() {
    const tank = state.preset.tank;
    const H = maxHeight(tank);
    const hcm = (H * state.levelPct) / 100;
    const vol = volumeAt(tank, hcm);
    const capL = capacity(tank);
    slider.value = String(state.levelPct);
    out.textContent = `${fmt(hcm, 1)} cm · ${fmt(state.levelPct, 0)}% tinggi`;
    cap.textContent = `${TANK_TYPES[tank.type].long} · ${describeTank(tank)}`;
    roVol.textContent = `${fmt(vol, 0)} L (${fmt((vol / capL) * 100, 0)}%)`;
    roCap.textContent = `${fmt(capL, 0)} L`;
    roGap.textContent = `${fmt(H - hcm + NECK_CM, 1)} cm`;
    roLpc.textContent = `${fmt(litersPerCm(tank, hcm), 1)} L`;
    pill.classList.toggle("is-fast", state.mode === "FAST");
    pill.classList.toggle("is-event", state.mode === "EVENT");
    pill.lastElementChild.textContent = MODE_TEXT[state.mode];
    drawFallback();
    renderer?.setLevel(state.levelPct);
    renderer?.setMode(state.mode);
  }

  select.addEventListener("change", () => {
    state.preset = TANK_PRESETS.find((p) => p.id === select.value);
    renderer?.setTank(state.preset.tank);
    update();
  });
  slider.addEventListener("input", () => {
    state.levelPct = Number(slider.value);
    state.refillTarget = null;
    update();
  });
  gensetBtn.addEventListener("click", () => {
    state.genset = !state.genset;
    gensetBtn.setAttribute("aria-pressed", String(state.genset));
    gensetBtn.textContent = state.genset ? "Hentikan genset" : "Simulasi genset menyala";
    tick.start();
  });
  refillBtn.addEventListener("click", () => {
    state.refillTarget = 94;
    tick.start();
  });

  // animasi dipercepat: genset menurunkan level, isi ulang menaikkan level
  const tick = (() => {
    let raf = 0;
    let last = 0;
    const step = (t) => {
      const dt = Math.min(0.1, (t - (last || t)) / 1000);
      last = t;
      let active = false;
      if (state.refillTarget !== null) {
        state.levelPct = Math.min(state.refillTarget, state.levelPct + dt * 22);
        state.mode = "EVENT";
        active = true;
        if (state.levelPct >= state.refillTarget - 0.01) state.refillTarget = null;
      } else if (state.genset) {
        state.levelPct = Math.max(4, state.levelPct - dt * 2.2);
        state.mode = "FAST";
        active = true;
        if (state.levelPct <= 4) {
          state.genset = false;
          gensetBtn.setAttribute("aria-pressed", "false");
          gensetBtn.textContent = "Simulasi genset menyala";
        }
      } else {
        state.mode = "SLOW";
      }
      update();
      if (active) raf = requestAnimationFrame(step);
      else {
        raf = 0;
        last = 0;
      }
    };
    return {
      start() {
        if (!raf) raf = requestAnimationFrame(step);
      },
    };
  })();

  update();

  const canWebGL = (() => {
    try {
      const c = document.createElement("canvas");
      return !!(c.getContext("webgl2") || c.getContext("webgl"));
    } catch {
      return false;
    }
  })();
  if (!canWebGL) return;
  import("./tank3d.js")
    .then((m) => {
      renderer = m.createTankRenderer(stage, {
        tank: state.preset.tank,
        levelPct: state.levelPct,
        reducedMotion: prefersReducedMotion(),
      });
      fallback.hidden = true;
      hint.hidden = false;
      update();
    })
    .catch((err) => {
      console.warn("Three.js tidak tersedia, memakai tampilan 2D.", err);
    });
}
