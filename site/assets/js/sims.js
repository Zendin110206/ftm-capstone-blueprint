// Simulator interaktif. Semua angka energi/biaya adalah ASUMSI AWAL yang dijelaskan di UI
// dan harus diganti hasil ukur eksperimen (E4–E7).
import { h, s, clear, fmt, fmtCompact, fmtBytes, fmtEnergy, fmtDuration, lineChart, barH, cssVar, prefersReducedMotion, onWidthChange } from "./ui.js";
import { TANK_PRESETS, TANK_TYPES, maxHeight, volumeAt, capacity, litersPerCm, measuredHeight, firmwareAssumedTemp, volumeAt15C, describeTank, clamp } from "./geometry.js";
import { MATRIX } from "./content.js";

// ------------------------------------------------------------ util --
function mulberry32(seed) {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function gaussian(rand) {
  let u = 0;
  let v = 0;
  while (u === 0) u = rand();
  while (v === 0) v = rand();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}

function slider({ label, min, max, step, value, unit = "", digits = 0, onInput }) {
  const out = h("output", { text: `${fmt(value, digits)}${unit}` });
  const input = h("input", { type: "range", min, max, step, value, "aria-label": label });
  input.addEventListener("input", () => {
    out.textContent = `${fmt(Number(input.value), digits)}${unit}`;
    onInput(Number(input.value));
  });
  const field = h("label", { class: "field" }, h("span", { class: "field-row" }, h("span", { text: label }), out), input);
  field.set = (v) => {
    input.value = v;
    out.textContent = `${fmt(Number(v), digits)}${unit}`;
  };
  return field;
}

function select({ label, options, value, onChange }) {
  const sel = h("select", { "aria-label": label });
  for (const [v, t] of options) sel.append(new Option(t, v));
  sel.value = value;
  sel.addEventListener("change", () => onChange(sel.value));
  const field = h("label", { class: "field" }, h("span", { text: label }), sel);
  field.select = sel;
  return field;
}

function kpi(k, v, sub = "", cls = "") {
  return h("div", { class: `kpi ${cls}`.trim() }, h("div", { class: "k", text: k }), h("div", { class: "v", text: v }), sub ? h("div", { class: "s", text: sub }) : null);
}

function clockLabel(sec) {
  const s = Math.max(0, Math.round(sec));
  const hh = Math.floor(s / 3600);
  const mm = String(Math.floor((s % 3600) / 60)).padStart(2, "0");
  const ss = String(s % 60).padStart(2, "0");
  return hh ? `${hh}:${mm}:${ss}` : `${mm}:${ss}`;
}

function hhmm(sec) {
  const m = Math.floor(sec / 60);
  return `${String(Math.floor(m / 60) % 24).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;
}

// ================================================================ POWER --
export function initPowerSim(root) {
  const btnBox = root.querySelector("#power-buttons");
  const diagram = root.querySelector("#power-diagram");
  const logBox = root.querySelector("#power-log");
  const fuelBar = root.querySelector("#power-fuel");
  const fuelText = root.querySelector("#power-fuel-l");
  const reduced = prefersReducedMotion();

  const W = 128;
  const H = 52;
  const nodes = {
    pln: { x: 16, y: 26, t: "PLN", s: "220/380 V AC" },
    ats: { x: 184, y: 26, t: "ATS / AMF", s: "pemindah sumber" },
    mdp: { x: 352, y: 26, t: "MDP / SDP", s: "panel distribusi" },
    rect: { x: 520, y: 26, t: "Rectifier", s: "AC → DC −48 V" },
    load: { x: 700, y: 26, t: "Perangkat telco", s: "OLT, Metro, dll." },
    batt: { x: 520, y: 146, t: "Baterai", s: "bank −48 V" },
    gen: { x: 184, y: 146, t: "Genset (DEG)", s: "start otomatis" },
    day: { x: 184, y: 262, t: "Tangki harian", s: "dipantau FTM" },
    bulk: { x: 16, y: 262, t: "Tangki bulanan", s: "pompa transfer" },
    ftm: { x: 352, y: 262, t: "Node FTM", s: "mode: SLOW" },
  };
  const wires = {
    plnAts: { d: "M144 52H184" },
    atsMdp: { d: "M312 52H352" },
    mdpRect: { d: "M480 52H520" },
    rectLoad: { d: "M648 52H700", dc: true },
    rectBatt: { d: "M584 78V146", dc: true },
    battLoad: { d: "M648 172H764V78", dc: true },
    genAts: { d: "M248 146V78" },
    dayGen: { d: "M248 262V198", fuel: true },
    bulkDay: { d: "M144 288H184", fuel: true },
    dayFtm: { d: "M312 288H352", data: true },
  };
  const svg = s("svg", { class: "power-svg", viewBox: "0 0 860 330", role: "img", "aria-label": "Diagram rantai daya STO" });
  const wireEls = {};
  for (const [id, w] of Object.entries(wires)) {
    const el = s("path", { d: w.d, class: `wire${w.dc ? " is-dc" : ""}${w.fuel ? " is-fuelpipe" : ""}` });
    if (w.data) el.setAttribute("stroke-dasharray", "4 5");
    wireEls[id] = el;
    svg.append(el);
  }
  const nodeEls = {};
  for (const [id, n] of Object.entries(nodes)) {
    const sub = s("text", { x: n.x + 12, y: n.y + 38, class: "sub" }, n.s);
    const g = s("g", { class: "pnode" }, s("rect", { x: n.x, y: n.y, width: W, height: H, rx: 12 }), s("text", { x: n.x + 12, y: n.y + 21 }, n.t), sub);
    g.sub = sub;
    nodeEls[id] = g;
    svg.append(g);
  }
  diagram.append(svg);

  const state = { pln: true, gen: false, src: "pln", fuel: 180, cap: 250, mode: "SLOW", clock: 0 };
  let timers = [];
  let burnTimer = 0;
  const clearTimers = () => {
    timers.forEach(clearTimeout);
    timers = [];
  };
  const later = (ms, fn) => timers.push(setTimeout(fn, reduced ? 0 : ms));

  function paint() {
    const live = {
      plnAts: state.pln,
      atsMdp: (state.src === "pln" && state.pln) || (state.src === "gen" && state.gen),
      genAts: state.gen && state.src === "gen",
    };
    live.mdpRect = live.atsMdp;
    live.rectLoad = live.atsMdp;
    live.rectBatt = live.atsMdp;
    live.battLoad = !live.atsMdp;
    live.dayGen = state.gen;
    live.bulkDay = !!state.transfer;
    live.dayFtm = true;
    for (const [id, el] of Object.entries(wireEls)) el.classList.toggle("is-live", !!live[id]);
    nodeEls.pln.setAttribute("class", `pnode ${state.pln ? "is-on" : "is-off"}`);
    nodeEls.gen.setAttribute("class", `pnode ${state.gen ? "is-on" : ""}`);
    nodeEls.batt.setAttribute("class", `pnode ${live.battLoad ? "is-fuel" : "is-on"}`);
    nodeEls.batt.sub.textContent = live.battLoad ? "menanggung beban!" : "float/charge ±53 V";
    nodeEls.day.setAttribute("class", `pnode ${state.gen || state.transfer || state.refill ? "is-fuel" : ""}`);
    nodeEls.ftm.setAttribute("class", `pnode ${state.mode === "SLOW" ? "" : "is-fuel"}`);
    nodeEls.ftm.sub.textContent = `mode: ${state.mode}`;
    nodeEls.ats.sub.textContent = state.src === "gen" ? "sumber: genset" : "sumber: PLN";
    fuelBar.style.width = `${(state.fuel / state.cap) * 100}%`;
    fuelText.textContent = `${fmt(state.fuel, 1)} L`;
  }

  function log(text, mode) {
    const entry = h(
      "div",
      { class: "log-item" },
      h("span", { class: "t", text: `T+${clockLabel(state.clock)}` }),
      h("span", {}, h("span", { html: text }), mode ? h("div", { class: "mode-tag" }, h("span", { class: `badge ${mode === "SLOW" ? "badge--ok" : "badge--fuel"}`, text: `FTM: ${mode}` })) : null),
    );
    logBox.prepend(entry);
    while (logBox.children.length > 4) logBox.lastElementChild.remove();
  }

  function startBurn(rateLps) {
    stopBurn();
    burnTimer = setInterval(() => {
      state.fuel = Math.max(5, state.fuel - rateLps);
      state.clock += 60;
      paint();
    }, 180);
  }
  function stopBurn() {
    clearInterval(burnTimer);
    burnTimer = 0;
  }

  const scenarios = {
    normal() {
      clearTimers();
      stopBurn();
      Object.assign(state, { pln: true, gen: false, src: "pln", mode: "SLOW", transfer: false, refill: false, clock: 0 });
      logBox.replaceChildren();
      paint();
      log("Kondisi normal: PLN mencatu lewat ATS, rectifier mengisi baterai. Genset diam, solar tidak berubah.", "SLOW");
    },
    outage() {
      clearTimers();
      stopBurn();
      state.pln = false;
      state.src = "pln";
      state.gen = false;
      state.mode = "FAST";
      paint();
      log("<b>PLN padam.</b> Rectifier kehilangan input. Baterai −48 V langsung menanggung beban tanpa jeda.", "FAST");
      later(1500, () => {
        state.clock += 10;
        state.gen = true;
        paint();
        log("Genset start otomatis. Butuh beberapa detik sampai tegangan & frekuensi stabil.", "FAST");
      });
      later(3000, () => {
        state.clock += 20;
        state.src = "gen";
        paint();
        log("<b>ATS pindah ke genset.</b> Rectifier menyala, baterai diisi ulang. Solar mulai terpakai. FTM mencatat laju konsumsi (FAST).", "FAST");
        startBurn(0.15);
      });
    },
    restore() {
      clearTimers();
      if (!state.gen && state.pln) {
        log("PLN sudah normal. Tidak ada yang perlu dipulihkan.", state.mode);
        return;
      }
      state.pln = true;
      paint();
      log("<b>PLN kembali.</b> ATS menunggu PLN stabil sebelum pindah balik.", "FAST");
      later(1400, () => {
        state.src = "pln";
        paint();
        log("ATS kembali ke PLN. Genset menjalani <i>cooldown</i> (pendinginan tanpa beban).", "FAST");
      });
      later(2800, () => {
        stopBurn();
        state.gen = false;
        state.mode = "SLOW";
        paint();
        log("Genset berhenti. Server menutup episode: durasi pemadaman & liter terpakai menjadi statistik.", "SLOW");
      });
    },
    test() {
      clearTimers();
      stopBurn();
      Object.assign(state, { pln: true, src: "pln", gen: true, mode: "FAST" });
      paint();
      const start = state.fuel;
      log("<b>Uji genset rutin</b> (±15 menit) untuk memastikan siap. PLN tetap normal, tetapi solar tetap terpakai.", "FAST");
      startBurn(0.1);
      later(3200, () => {
        stopBurn();
        state.gen = false;
        state.mode = "SLOW";
        paint();
        log(`Uji selesai. Episode tercatat: ${fmt(start - state.fuel, 1)} L. Data ini ikut menghitung laju konsumsi per site.`, "SLOW");
      });
    },
    refill() {
      clearTimers();
      stopBurn();
      const startFuel = state.fuel;
      const target = Math.min(state.cap * 0.95, state.fuel + 90);
      state.refill = true;
      state.mode = "EVENT";
      paint();
      log("<b>Truk mengisi solar.</b> Level naik cepat: kirim segera + burst 5 menit.", "EVENT");
      const iv = setInterval(() => {
        state.fuel = Math.min(target, state.fuel + 6);
        state.clock += 60;
        paint();
        if (state.fuel >= target) {
          clearInterval(iv);
          state.refill = false;
          state.mode = "SLOW";
          paint();
          log(`Refill terdeteksi <b>+${fmt(target - startFuel, 0)} L</b>. Telegram: “cocokkan dengan nota pengiriman?”`, "SLOW");
        }
      }, reduced ? 1 : 120);
      timers.push(iv);
    },
    transfer() {
      clearTimers();
      stopBurn();
      state.transfer = true;
      state.mode = "EVENT";
      paint();
      log("<b>Pompa transfer</b> mengisi tangki harian dari tangki bulanan. Polanya mirip refill, tetapi bukan pembelian baru. Perlu dibedakan (konfirmasi di lapangan).", "EVENT");
      let n = 0;
      const iv = setInterval(() => {
        state.fuel = Math.min(state.cap * 0.9, state.fuel + 3);
        state.clock += 60;
        n += 1;
        paint();
        if (n >= 10) {
          clearInterval(iv);
          state.transfer = false;
          state.mode = "SLOW";
          paint();
          log("Transfer selesai. Di sistem: kejadian “transfer internal”, bukan “refill”, sehingga tidak diminta nota.", "SLOW");
        }
      }, reduced ? 1 : 160);
      timers.push(iv);
    },
  };

  const buttons = [
    ["normal", "Normal"],
    ["outage", "PLN padam"],
    ["restore", "PLN kembali"],
    ["test", "Uji genset 15 mnt"],
    ["refill", "Isi ulang dari truk"],
    ["transfer", "Pompa transfer"],
  ];
  for (const [id, label] of buttons) {
    btnBox.append(
      h("button", { class: "chip", type: "button", "aria-pressed": "false", onclick: (e) => {
        btnBox.querySelectorAll(".chip").forEach((c) => c.setAttribute("aria-pressed", String(c === e.currentTarget)));
        scenarios[id]();
      } }, label),
    );
  }
  scenarios.normal();
  btnBox.firstElementChild.setAttribute("aria-pressed", "true");
}

// ============================================================= ACCURACY --
export function initAccuracySim(root) {
  const presets = TANK_PRESETS;
  const st = {
    preset: presets.find((p) => p.id === "bulk-4772"),
    levelPct: 45,
    airT: 38,
    comp: false,
    mountErr: 1,
    tilt: 2,
    noise: 0.5,
    fuelT: 32,
  };
  const NECK = 8;
  const fwT = firmwareAssumedTemp();

  const left = h("div", { class: "controls-grid" });
  const right = h("div", {});
  const kpis = h("div", { class: "kpis" });
  const contrib = h("div", { style: { display: "grid", gap: "10px", marginTop: "14px" } });
  const chart = s("svg", { class: "chart", role: "img", "aria-label": "Grafik selisih volume terhadap level" });
  const note = h("p", { class: "note" });

  left.append(
    select({ label: "Model tangki", options: presets.map((p) => [p.id, p.name]), value: st.preset.id, onChange: (v) => ((st.preset = presets.find((p) => p.id === v)), draw()) }),
    slider({ label: "Level sebenarnya", min: 2, max: 98, step: 1, value: st.levelPct, unit: "%", onInput: (v) => ((st.levelPct = v), draw()) }),
    slider({ label: "Suhu udara di ruang kosong", min: 15, max: 55, step: 1, value: st.airT, unit: " °C", onInput: (v) => ((st.airT = v), draw()) }),
    slider({ label: "Salah ukur tinggi pemasangan", min: -5, max: 5, step: 0.5, value: st.mountErr, unit: " cm", digits: 1, onInput: (v) => ((st.mountErr = v), draw()) }),
    slider({ label: "Kemiringan sensor", min: 0, max: 10, step: 0.5, value: st.tilt, unit: "°", digits: 1, onInput: (v) => ((st.tilt = v), draw()) }),
    slider({ label: "Noise sensor (1σ)", min: 0, max: 2, step: 0.1, value: st.noise, unit: " cm", digits: 1, onInput: (v) => ((st.noise = v), draw()) }),
    slider({ label: "Suhu solar (untuk volume 15 °C)", min: 20, max: 45, step: 1, value: st.fuelT, unit: " °C", onInput: (v) => ((st.fuelT = v), draw()) }),
  );
  const compBox = h("input", { type: "checkbox" });
  compBox.addEventListener("change", () => ((st.comp = compBox.checked), draw()));
  left.append(h("label", { class: "check" }, compBox, h("span", { text: "Aktifkan kompensasi suhu (DS18B20, sisa galat ±0,5 °C)" })));

  const chartBox = h("div", { class: "chart-box" }, chart);
  right.append(kpis, h("p", { class: "h-label", text: "Kontribusi tiap sumber error (liter)" }), contrib, h("p", { class: "h-label", text: "Selisih volume di semua level, dengan setelan sekarang" }), chartBox, note);
  root.append(h("div", { class: "sim-grid" }, h("div", {}, left, h("p", { class: "note", style: { marginTop: "14px" }, text: `Konstanta firmware v1 (29,1 µs/cm) setara kecepatan suara pada ±${fmt(fwT, 1)} °C.` })), right));
  onWidthChange(chartBox, () => draw());

  function meas(tank, hTrue, { airT, assumed, mountErr, tilt }) {
    const H = maxHeight(tank);
    const hm = measuredHeight({ trueHeight: hTrue, mountHeight: H + NECK, airTempC: airT, assumedTempC: assumed, mountErrorCm: mountErr, tiltDeg: tilt });
    return clamp(hm, 0, H);
  }

  function draw() {
    const tank = st.preset.tank;
    const H = maxHeight(tank);
    const cap = capacity(tank);
    const hTrue = (H * st.levelPct) / 100;
    const assumed = st.comp ? st.airT - 0.5 : fwT;
    const all = { airT: st.airT, assumed, mountErr: st.mountErr, tilt: st.tilt };
    const vTrue = volumeAt(tank, hTrue);
    const vMeas = volumeAt(tank, meas(tank, hTrue, all));
    const err = vMeas - vTrue;
    const lpc = litersPerCm(tank, hTrue);
    const noiseL = lpc * st.noise;
    const errPct = (Math.abs(err) / cap) * 100;
    const cls = errPct < 1 ? "kpi--ok" : errPct < 3 ? "kpi--warn" : "kpi--bad";

    clear(kpis).append(
      kpi("Volume sebenarnya", `${fmt(vTrue, 0)} L`, `${TANK_TYPES[tank.type].label} · ${describeTank(tank)}`),
      kpi("Volume terbaca", `${fmt(vMeas, 0)} L`, `kapasitas ${fmt(cap, 0)} L`),
      kpi("Selisih", `${err >= 0 ? "+" : ""}${fmt(err, 1)} L`, `${fmt(errPct, 2)}% kapasitas`, cls),
      kpi("Liter per cm di level ini", `${fmt(lpc, 1)} L`, "makin besar, makin sensitif"),
      kpi("Pengaruh noise (±1σ)", `±${fmt(noiseL, 1)} L`, "sebelum difilter"),
      kpi("Volume setara 15 °C", `${fmt(volumeAt15C(vTrue, st.fuelT), 0)} L`, `solar memuai ±0,085%/°C (suhu ${fmt(st.fuelT, 0)} °C)`),
    );

    const zero = { airT: fwT, assumed: fwT, mountErr: 0, tilt: 0 };
    const part = (over) => volumeAt(tank, meas(tank, hTrue, { ...zero, ...over })) - vTrue;
    const rows = [
      { label: st.comp ? "Suhu udara (dengan kompensasi)" : "Suhu udara (tanpa kompensasi)", value: part({ airT: st.airT, assumed }) },
      { label: "Salah ukur tinggi pemasangan", value: part({ mountErr: st.mountErr }) },
      { label: "Kemiringan sensor", value: part({ tilt: st.tilt }) },
      { label: "Noise (±1σ, acak)", value: noiseL },
    ];
    const maxAbs = Math.max(1, ...rows.map((r) => Math.abs(r.value)));
    barH(
      contrib,
      rows.map((r) => ({ ...r, value: Math.abs(r.value), signed: r.value })),
      {
        max: maxAbs,
        fmtValue: (v) => `${fmt(v, 1)} L`,
        colorFor: (r) => (r.label.startsWith("Noise") ? cssVar("--muted") : r.signed >= 0 ? cssVar("--fuel") : cssVar("--info")),
      },
    );

    const pts = [];
    for (let pct = 2; pct <= 98; pct += 2) {
      const ht = (H * pct) / 100;
      pts.push([pct, volumeAt(tank, meas(tank, ht, all)) - volumeAt(tank, ht)]);
    }
    const ys = pts.map((p) => p[1]);
    const lo = Math.min(0, ...ys);
    const hi = Math.max(0, ...ys);
    const pad = Math.max(1, (hi - lo) * 0.15);
    const yMin = Math.floor(lo - pad);
    const yMax = Math.ceil(hi + pad);
    const step = niceStep((yMax - yMin) / 5);
    const yTicks = [];
    for (let v = Math.ceil(yMin / step) * step + 0; v <= yMax; v += step) yTicks.push(v);
    lineChart(chart, {
      series: [
        { points: [[0, 0], [100, 0]], color: cssVar("--line-strong"), width: 1, dash: "4 4" },
        { points: pts, color: cssVar("--fuel"), width: 2.4 },
        { points: [[st.levelPct, err]], color: cssVar("--accent"), width: 0, dots: true, dotR: 5 },
      ],
      xMin: 0,
      xMax: 100,
      yMin,
      yMax,
      xTicks: [0, 25, 50, 75, 100],
      yTicks,
      xFmt: (v) => `${v}%`,
      yFmt: (v) => `${fmt(v, 0)} L`,
      height: 220,
    });
    note.textContent =
      tank.type === "hcyl" || tank.type === "hcylEll"
        ? "Pada tangki silinder tidur, 1 cm di tengah bernilai jauh lebih banyak liter daripada di dasar atau puncak. Karena itu offset pemasangan paling terasa saat tangki setengah penuh, sedangkan error suhu makin besar saat ruang kosong panjang (level rendah)."
        : "Pada tangki balok/silinder tegak, liter per cm konstan. Error suhu tetap sebanding panjang ruang kosong, jadi makin besar saat level rendah.";
  }

  draw();
}

function niceStep(raw) {
  const pow = 10 ** Math.floor(Math.log10(Math.max(raw, 1e-9)));
  const n = raw / pow;
  const base = n <= 1 ? 1 : n <= 2 ? 2 : n <= 5 ? 5 : 10;
  return base * pow;
}

// ============================================================ TELEMETRY --
const HW = {
  v1: { label: "NodeMCU v1 · Wi-Fi selalu nyala", base: 0.08, msgNew: 2.0 * 0.04, msgReuse: 0.4 * 0.04, meas: 0, radio: "wifi" },
  modem: { label: "ESP8266 · modem-sleep (tetap terhubung)", base: 0.02, msgNew: 2.0 * 0.1, msgReuse: 0.4 * 0.1, meas: 0, radio: "wifi" },
  deep: { label: "ESP32-C3 · deep-sleep + Wi-Fi on-demand", base: 25e-6, msgNew: 0.8 * 0.09 + 1.0 * 0.1 + 0.2 * 0.1, msgReuse: 0.8 * 0.09 + 0.3 * 0.1 + 0.2 * 0.1, meas: 0.15 * 0.03, radio: "wifi" },
  lora: { label: "ESP32-C3 + LoRa SX1262 (gateway di STO)", base: 25e-6, msgNew: 0.057 * 0.045 + 0.06 * 0.005 + 0.1 * 0.025, msgReuse: 0.057 * 0.045 + 0.06 * 0.005 + 0.1 * 0.025, meas: 0.15 * 0.03, radio: "lora" },
};
// nilai msg*/meas di atas adalah A·s (ampere-detik); dikali 3,3 V → joule.
const VOLT = 3.3;
const BATTERY_J = 3.0 * 3.7 * 3600 * 0.8; // 18650 3.000 mAh, 80% terpakai

const STRATS = [
  { id: "A", name: "A · Tetap 20 dtk (v1)", fw: "v1" },
  { id: "B", name: "B · Tetap 20 mnt", fw: "v1" },
  { id: "C", name: "C · Send-on-delta + heartbeat 60 mnt", fw: "v2" },
  { id: "D", name: "D · Adaptif event-aware (usulan)", fw: "v2" },
];

const V1_PAYLOAD_BYTES = 1450;
const V2_PAYLOAD_BYTES = 110;
const HTTP_OVERHEAD = 520;
const TLS_FULL = 5200;
const TLS_RESUME = 350;
const LORA_BYTES = 33;

function buildTruth({ cap, events, lpc, rand, noiseCm }) {
  const dt = 10;
  const N = 8640;
  const V = new Float64Array(N);
  const gen = new Uint8Array(N);
  const net = new Uint8Array(N);
  let v = cap * 0.6;
  const burnLps = 9 / 3600;
  const refillL = Math.min(cap * 0.3, Math.max(40, cap * 0.3));
  const leakL = Math.max(6, cap * 0.02);
  const inRange = (t, a, b) => t >= a && t < b;
  for (let i = 0; i < N; i += 1) {
    const t = i * dt;
    let g = 0;
    if (events.test && inRange(t, 9 * 3600, 9 * 3600 + 900)) g = 1;
    if (events.outage && inRange(t, 13.5 * 3600 + 30, 15.5 * 3600 + 120)) g = 1;
    gen[i] = g;
    if (g) v -= burnLps * dt;
    if (events.leak && inRange(t, 2 * 3600 + 600, 2 * 3600 + 1800)) v -= (leakL / 1200) * dt;
    if (events.refill && inRange(t, 10 * 3600 + 300, 10 * 3600 + 900)) v += (refillL / 600) * dt;
    net[i] = events.netdown && inRange(t, 14 * 3600 + 600, 14 * 3600 + 3000) ? 0 : 1;
    V[i] = Math.min(cap, Math.max(0, v));
  }
  const sigmaL = lpc * noiseCm * 0.47; // median dari 7 ping
  const measure = (i) => V[i] + gaussian(rand) * sigmaL;
  return { dt, N, V, gen, net, measure, sigmaL, refillL, leakL };
}

function runStrategy(strat, truth, { deltaL, hw }) {
  const { dt, N, gen, net, measure } = truth;
  const received = []; // [tSampled, value, tArrived]
  let msgs = 0;
  let meas = 0;
  let bytes = 0;
  let energyAs = 0;
  let lost = 0;
  const lora = hw.radio === "lora";
  const perMsg = (fw, batchSize = 1) => {
    if (lora) return LORA_BYTES * batchSize;
    if (fw === "v1") return V1_PAYLOAD_BYTES + HTTP_OVERHEAD + TLS_FULL;
    return V2_PAYLOAD_BYTES * batchSize + HTTP_OVERHEAD + TLS_RESUME;
  };
  const send = (i, value, fw) => {
    msgs += 1;
    bytes += perMsg(fw);
    energyAs += fw === "v1" ? hw.msgNew : hw.msgReuse;
    if (net[i]) received.push([i * dt, value, i * dt]);
    else lost += 1;
  };

  if (strat.id === "A" || strat.id === "B") {
    const every = strat.id === "A" ? 2 : 120;
    for (let i = 0; i < N; i += every) {
      meas += 1;
      send(i, measure(i), "v1");
    }
  } else if (strat.id === "C") {
    let last = null;
    let lastSentT = -Infinity;
    for (let i = 0; i < N; i += 6) {
      meas += 1;
      const m = measure(i);
      const t = i * dt;
      if (last === null || Math.abs(m - last) >= deltaL || t - lastSentT >= 3600) {
        send(i, m, "v2");
        last = m;
        lastSentT = t;
      }
    }
  } else {
    // D: adaptif
    let last = null;
    let lastSentT = -Infinity;
    let burstUntil = -Infinity;
    const buffer = [];
    let nextMeas = 0;
    let prevNet = 1;
    for (let i = 0; i < N; i += 1) {
      const t = i * dt;
      if (net[i] && !prevNet && buffer.length) {
        // pulih: kirim batch
        msgs += 1;
        bytes += perMsg("v2", buffer.length);
        energyAs += hw.msgReuse + (lora ? 0 : 0.02 * buffer.length * 0.1);
        for (const b of buffer) received.push([b[0], b[1], t, b[2]]);
        buffer.length = 0;
      }
      prevNet = net[i];
      if (t < nextMeas) continue;
      const fast = gen[i] || t < burstUntil;
      const measEvery = fast ? 20 : 60;
      const sendEvery = gen[i] ? 120 : t < burstUntil ? 30 : 3600;
      nextMeas = t + measEvery;
      meas += 1;
      const m = measure(i);
      let doSend = false;
      if (last === null) doSend = true;
      else {
        const diff = m - last;
        if (diff >= deltaL) {
          doSend = true;
          burstUntil = t + 300;
        } else if (diff <= -deltaL && !gen[i]) {
          doSend = true;
          burstUntil = t + 300;
        } else if (t - lastSentT >= sendEvery) doSend = true;
        if (gen[i] && lastSentT < 0) doSend = true;
      }
      if (gen[i] && t - lastSentT >= 120) doSend = true;
      if (!doSend) continue;
      last = m;
      lastSentT = t;
      if (net[i]) {
        msgs += 1;
        bytes += perMsg("v2");
        energyAs += hw.msgReuse;
        received.push([t, m, t, gen[i]]);
      } else {
        buffer.push([t, m, gen[i]]);
      }
    }
  }

  energyAs += meas * hw.meas;
  const energyJ = hw.base * VOLT * 86400 + energyAs * VOLT;

  // rekonstruksi server (zero-order hold) — data buffer ikut mengisi histori (tSampled)
  const hist = received.slice().sort((a, b) => a[0] - b[0]);
  let j = -1;
  let se = 0;
  let cnt = 0;
  let maxErr = 0;
  for (let i = 0; i < N; i += 6) {
    const t = i * dt;
    while (j + 1 < hist.length && hist[j + 1][0] <= t) j += 1;
    const est = j >= 0 ? hist[j][1] : truth.V[0];
    const e = est - truth.V[i];
    se += e * e;
    cnt += 1;
    maxErr = Math.max(maxErr, Math.abs(e));
  }
  return { received, msgs, bytes, energyJ, lost, meas, rmse: Math.sqrt(se / cnt), maxErr };
}

function latency(received, { start, predicate }) {
  // waktu dari awal kejadian sampai server MENERIMA data yang menunjukkan kejadian
  let best = Infinity;
  for (const [tS, v, tA, g] of received) {
    if (tS < start) continue;
    if (predicate(v, tS, g)) best = Math.min(best, tA - start);
  }
  return best;
}

export function initTelemetrySim(root) {
  const st = {
    presetId: "day-250",
    hw: "deep",
    events: { leak: true, test: true, refill: true, outage: true, netdown: true },
    deltaMult: 3,
    seed: 7,
    selected: "D",
    noiseCm: 0.3,
  };
  const presetOptions = TANK_PRESETS.filter((p) => ["day-250", "bulk-4772", "ell-2700"].includes(p.id)).map((p) => [p.id, p.name]);
  const eventDefs = [
    ["leak", "Penurunan tak wajar (02:10)"],
    ["test", "Uji genset 15 menit (09:00)"],
    ["refill", "Isi ulang dari truk (10:05)"],
    ["outage", "PLN padam 2 jam (13:30)"],
    ["netdown", "Internet putus 40 menit (14:10)"],
  ];

  const controls = h("div", { class: "controls-grid" });
  controls.append(
    select({ label: "Tangki", options: presetOptions, value: st.presetId, onChange: (v) => ((st.presetId = v), run()) }),
    select({ label: "Profil perangkat & radio (semua strategi)", options: Object.entries(HW).map(([k, v]) => [k, v.label]), value: st.hw, onChange: (v) => ((st.hw = v), run()) }),
    slider({ label: "Ambang kirim (× noise terfilter)", min: 2, max: 8, step: 0.5, value: st.deltaMult, unit: "×", digits: 1, onInput: (v) => ((st.deltaMult = v), run()) }),
    slider({ label: "Noise sensor (1σ)", min: 0.1, max: 1, step: 0.1, value: st.noiseCm, unit: " cm", digits: 1, onInput: (v) => ((st.noiseCm = v), run()) }),
  );
  const evBox = h("div", { class: "check-grid", style: { marginTop: "16px" } });
  for (const [k, label] of eventDefs) {
    const cb = h("input", { type: "checkbox" });
    cb.checked = st.events[k];
    cb.addEventListener("change", () => ((st.events[k] = cb.checked), run()));
    evBox.append(h("label", { class: "check" }, cb, h("span", { text: label })));
  }
  const reseed = h("button", { class: "btn btn--sm", type: "button", text: "Acak ulang noise" });
  reseed.addEventListener("click", () => {
    st.seed += 1;
    run();
  });

  const tableWrap = h("div", { class: "table-wrap", style: { marginTop: "18px" } });
  const insight = h("p", { class: "note", style: { marginTop: "10px" } });
  const chart = s("svg", { class: "chart", role: "img", "aria-label": "Grafik volume 24 jam dan titik yang diterima server" });
  const chartBox = h("div", { class: "chart-box" }, chart);
  const legend = h("div", { class: "legend" });
  const summary = h("div", { class: "kpis", style: { marginTop: "14px" } });
  const assumptions = h(
    "details",
    { style: { marginTop: "14px" } },
    h("summary", { class: "note", text: "Asumsi model (klik untuk melihat)" }),
    h("div", {
      class: "note",
      html:
        "<p>Energi = V·I_dasar·24 jam + Σ energi per pesan + Σ energi per ukur, dengan V = 3,3 V. Arus dasar: NodeMCU Wi-Fi selalu nyala ±80 mA; ESP8266 modem-sleep ±20 mA (chip ±15 mA + board); ESP32-C3 deep-sleep di modul/PCB custom ±25 µA. Pesan Wi-Fi: koneksi ±0,8 dtk @90 mA + TLS (baru ±1 dtk / dipakai ulang ±0,3 dtk) @100 mA + kirim ±0,2 dtk. LoRa: TX ±57 ms @45 mA (SF7, 20 B) + jendela RX. Satu kali ukur: ±0,15 dtk @30 mA.</p><p>Byte per pesan: firmware v1 = payload ±1,45 KB + HTTP ±0,5 KB + TLS penuh ±5,2 KB; firmware v2 = ±110 B + HTTP + TLS resumption ±350 B; LoRa ±33 B. Genset 9 L/jam. Noise terfilter = 0,47σ (median 7 ping). Kejadian dianggap terdeteksi saat server menerima nilai yang bergeser ≥ maks(3σ, 1% kapasitas), atau pesan dengan konteks genset menyala (strategi D).</p><p><b>Semua angka ini asumsi awal dari datasheet dan literatur. Eksperimen E4 dan E5 menggantinya dengan hasil ukur.</b></p>",
    }),
  );

  root.append(
    h("div", {}, controls, evBox, h("div", { style: { marginTop: "12px" } }, reseed)),
    tableWrap,
    insight,
    h("p", { class: "h-label", text: "Volume 24 jam: kebenaran vs yang diterima server (pilih strategi di kepala tabel)" }),
    chartBox,
    legend,
    summary,
    assumptions,
  );

  function run() {
    const preset = TANK_PRESETS.find((p) => p.id === st.presetId);
    const tank = preset.tank;
    const cap = capacity(tank);
    const lpc = litersPerCm(tank, maxHeight(tank) * 0.6);
    const rand = mulberry32(st.seed);
    const truth = buildTruth({ cap, events: st.events, lpc, rand, noiseCm: st.noiseCm });
    const deltaL = Math.max(0.5, st.deltaMult * truth.sigmaL);
    const hw = HW[st.hw];
    const results = STRATS.map((sg) => ({ ...sg, ...runStrategy(sg, truth, { deltaL, hw }) }));

    const vAt = (t) => truth.V[Math.min(truth.N - 1, Math.floor(t / truth.dt))];
    const thr = Math.max(3 * truth.sigmaL, cap * 0.01);
    const evs = [];
    if (st.events.refill) {
      const start = 10 * 3600 + 300;
      const base = vAt(start - 10);
      evs.push({ key: "refill", label: "isi ulang", start, predicate: (v) => v >= base + thr });
    }
    if (st.events.outage) {
      const start = 13.5 * 3600 + 30;
      const base = vAt(start - 10);
      evs.push({ key: "outage", label: "genset menyala (padam)", start, predicate: (v, tS, g) => g === 1 || (tS > start && v <= base - thr) });
    }
    if (st.events.leak) {
      const start = 2 * 3600 + 600;
      const base = vAt(start - 10);
      evs.push({ key: "leak", label: "penurunan tak wajar", start, predicate: (v) => v <= base - thr });
    }
    for (const r of results) {
      r.lat = {};
      for (const e of evs) r.lat[e.key] = latency(r.received, e);
      r.lifeDays = BATTERY_J / r.energyJ;
    }

    const life = (d) => (d > 3650 ? "> 10 tahun" : d >= 60 ? `${fmt(d / 30, 1)} bulan` : d >= 2 ? `${fmt(d, 1)} hari` : `${fmt(d * 24, 0)} jam`);
    const metrics = [
      { label: "Pesan per hari", get: (r) => r.msgs, f: (v) => fmtCompact(v), better: "min" },
      { label: "Byte per hari", get: (r) => r.bytes, f: (v) => fmtBytes(v), better: "min" },
      { label: "Energi per hari", get: (r) => r.energyJ, f: (v) => fmtEnergy(v), better: "min" },
      { label: "Umur baterai 18650 (3.000 mAh)", get: (r) => r.lifeDays, f: life, better: "max" },
      ...evs.map((e) => ({ label: `Waktu deteksi ${e.label}`, get: (r) => r.lat[e.key], f: (v) => fmtDuration(v), better: "min" })),
      { label: "Galat histori (RMSE)", get: (r) => r.rmse, f: (v) => `${fmt(v, 1)} L`, better: "min" },
      { label: "Pesan hilang saat internet putus", get: (r) => r.lost, f: (v) => fmt(v, 0), better: "min" },
    ];

    const table = h("table", { class: "strategy-table table-compact" });
    const headRow = h("tr", {}, h("th", { text: "Metrik" }));
    for (const r of results) {
      const btn = h(
        "button",
        { class: "strat-btn", type: "button", "aria-pressed": String(r.id === st.selected) },
        h("span", { class: "sid", text: r.id }),
        h("span", { text: r.name.replace(/^[A-D] · /, "") }),
      );
      btn.addEventListener("click", () => {
        st.selected = r.id;
        run();
      });
      headRow.append(h("th", { class: `num${r.id === st.selected ? " is-sel" : ""}` }, btn, h("span", { class: "fw", text: r.fw === "v1" ? "firmware v1" : "firmware v2" })));
    }
    const tbody = h("tbody");
    for (const m of metrics) {
      const vals = results.map((r) => m.get(r));
      const finite = vals.filter((v) => Number.isFinite(v));
      const best = finite.length ? (m.better === "min" ? Math.min(...finite) : Math.max(...finite)) : NaN;
      const worst = finite.length ? (m.better === "min" ? Math.max(...finite) : Math.min(...finite)) : NaN;
      const tr = h("tr", {}, h("td", { text: m.label }));
      results.forEach((r, i) => {
        const v = vals[i];
        const tone = !Number.isFinite(v) ? "worst" : best !== worst && v === best ? "best" : best !== worst && v === worst ? "worst" : "";
        const cls = ["num", r.id === st.selected ? "is-sel" : "", tone].filter(Boolean).join(" ");
        tr.append(h("td", { class: cls, text: m.f(v) }));
      });
      tbody.append(tr);
    }
    table.append(h("thead", {}, headRow), tbody);
    clear(tableWrap).append(table);

    const A = results[0];
    const D = results[3];
    const pct = (a, b) => (b > 0 ? (1 - a / b) * 100 : 0);
    insight.textContent = `Hijau = terbaik, merah = terburuk di tiap baris. Strategi D sengaja mengirim lebih rapat saat genset menyala (untuk mengukur laju konsumsi), jadi pesannya bisa lebih banyak dari B atau C. Namun D tetap ±${fmt(pct(D.msgs, A.msgs), 0)}% lebih sedikit dari A, langsung tahu genset menyala lewat konteks daya, dan tidak kehilangan data saat internet putus.`;

    const sel = results.find((r) => r.id === st.selected);
    const truthPts = [];
    for (let i = 0; i < truth.N; i += 6) truthPts.push([(i * truth.dt) / 3600, truth.V[i]]);
    const recv = sel.received
      .slice()
      .sort((a, b) => a[0] - b[0])
      .map(([t, v]) => [t / 3600, v]);
    const vals = truthPts.map((pt) => pt[1]);
    const lo = Math.min(...vals);
    const hi = Math.max(...vals);
    const pad = Math.max(2, (hi - lo) * 0.2);
    const yMin = Math.max(0, lo - pad);
    const yMax = hi + pad;
    const step = niceStep((yMax - yMin) / 5);
    const yTicks = [];
    for (let v = Math.ceil(yMin / step) * step + 0; v <= yMax; v += step) yTicks.push(v);
    const bandDefs = [
      ["leak", 2 + 10 / 60, 2.5, "--bad", "penurunan tak wajar"],
      ["test", 9, 9.25, "--fuel", "uji genset"],
      ["refill", 10 + 5 / 60, 10.25, "--ok", "isi ulang"],
      ["outage", 13.5, 15.53, "--fuel", "PLN padam"],
      ["netdown", 14 + 10 / 60, 14 + 50 / 60, "--info", "internet putus"],
    ].filter(([k]) => st.events[k]);
    lineChart(chart, {
      series: [
        { points: truthPts, color: cssVar("--muted"), width: 1.4 },
        { points: recv, color: cssVar("--accent"), width: 1.8, step: true, stepToEnd: true, dots: recv.length < 400, dotR: 2.4 },
      ],
      xMin: 0,
      xMax: 24,
      yMin,
      yMax,
      xTicks: [0, 3, 6, 9, 12, 15, 18, 21, 24],
      yTicks,
      xFmt: (v) => `${String(v).padStart(2, "0")}:00`,
      yFmt: (v) => `${fmt(v, 0)} L`,
      height: 250,
      bands: bandDefs.map(([, from, to, color]) => ({ from, to, color: cssVar(color), opacity: 0.16 })),
    });
    clear(legend).append(
      h("span", {}, h("i", { style: { background: cssVar("--muted") } }), "volume sebenarnya"),
      h("span", {}, h("i", { style: { background: cssVar("--accent") } }), `diterima server (${sel.id})`),
      ...bandDefs.map(([, , , color, label]) => h("span", {}, h("i", { style: { background: cssVar(color), height: "8px", opacity: "0.5" } }), label)),
    );

    clear(summary).append(
      kpi(`Pesan ${sel.id} vs A`, `−${fmt(pct(sel.msgs, A.msgs), 1)}%`, `${fmtCompact(sel.msgs)} vs ${fmtCompact(A.msgs)} per hari`, sel.id === "A" ? "" : "kpi--ok"),
      kpi(`Byte ${sel.id} vs A`, `−${fmt(pct(sel.bytes, A.bytes), 1)}%`, `${fmtBytes(sel.bytes)} vs ${fmtBytes(A.bytes)}`, sel.id === "A" ? "" : "kpi--ok"),
      kpi(`Energi ${sel.id} vs A`, `−${fmt(pct(sel.energyJ, A.energyJ), 1)}%`, "profil perangkat yang sama", sel.id === "A" ? "" : "kpi--ok"),
      kpi("Request/bulan untuk 8 STO", fmtCompact(sel.msgs * 30 * 8), "jatah Vercel Hobby: 1 juta"),
    );
  }

  run();
  onWidthChange(chartBox, () => run());
}

// ================================================================ CLOUD --
export function initCloudSim(root) {
  const st = { n: 8, perDay: 5760, users: 3, userHours: 6, hdSessions: 2, hdHours: 8, hdMode: "v1", mem: 2, wall: 0.6, cpuMs: 25 };
  const perDayOptions = [
    ["5760", "Tiap 15 dtk (v1, Agustus)"],
    ["4320", "Tiap 20 dtk (profil v1)"],
    ["72", "Tiap 20 mnt"],
    ["60", "Adaptif ±60 pesan/hari (usulan)"],
  ];
  const fields = {};
  const controls = h("div", { class: "controls-grid" });
  const add = (key, el) => {
    fields[key] = el;
    controls.append(el);
  };
  add("n", slider({ label: "Jumlah perangkat/STO", min: 1, max: 300, step: 1, value: st.n, onInput: (v) => ((st.n = v), draw()) }));
  add("perDay", select({ label: "Strategi kirim perangkat", options: perDayOptions, value: String(st.perDay), onChange: (v) => ((st.perDay = Number(v)), draw()) }));
  add("users", slider({ label: "Pengguna dashboard aktif", min: 0, max: 60, step: 1, value: st.users, onInput: (v) => ((st.users = v), draw()) }));
  add("userHours", slider({ label: "Jam dashboard terbuka/hari", min: 0, max: 24, step: 1, value: st.userHours, unit: " jam", onInput: (v) => ((st.userHours = v), draw()) }));
  add("hdSessions", slider({ label: "Browser dengan sesi helpdesk", min: 0, max: 60, step: 1, value: st.hdSessions, onInput: (v) => ((st.hdSessions = v), draw()) }));
  add("hdHours", slider({ label: "Jam browser itu terbuka/hari", min: 0, max: 24, step: 1, value: st.hdHours, unit: " jam", onInput: (v) => ((st.hdHours = v), draw()) }));
  add("hdMode", select({ label: "Polling helpdesk", options: [["v1", "Tiap 5 dtk walau panel tertutup (v1)"], ["v2", "Hanya saat panel dibuka (±10 mnt/hari)"]], value: st.hdMode, onChange: (v) => ((st.hdMode = v), draw()) }));
  add("mem", select({ label: "Memori fungsi (asumsi)", options: [["1", "1 GB"], ["2", "2 GB"], ["4", "4 GB"]], value: String(st.mem), onChange: (v) => ((st.mem = Number(v)), draw()) }));
  add("wall", slider({ label: "Lama per request (termasuk tunggu DB)", min: 0.1, max: 2, step: 0.05, value: st.wall, unit: " dtk", digits: 2, onInput: (v) => ((st.wall = v), draw()) }));
  add("cpuMs", slider({ label: "CPU aktif per request", min: 5, max: 120, step: 5, value: st.cpuMs, unit: " ms", onInput: (v) => ((st.cpuMs = v), draw()) }));

  const presets = h("div", { class: "chips" });
  const presetDefs = [
    ["Agustus (v1, 8 alat)", { n: 8, perDay: 5760, users: 3, userHours: 6, hdSessions: 2, hdHours: 8, hdMode: "v1" }],
    ["29 STO · adaptif", { n: 29, perDay: 60, users: 5, userHours: 6, hdSessions: 2, hdHours: 8, hdMode: "v2" }],
    ["300 STO · adaptif", { n: 300, perDay: 60, users: 20, userHours: 8, hdSessions: 5, hdHours: 8, hdMode: "v2" }],
  ];
  for (const [label, conf] of presetDefs) {
    presets.append(
      h("button", { class: "chip", type: "button", onclick: () => {
        Object.assign(st, conf);
        fields.n.set(st.n);
        fields.perDay.select.value = String(st.perDay);
        fields.users.set(st.users);
        fields.userHours.set(st.userHours);
        fields.hdSessions.set(st.hdSessions);
        fields.hdHours.set(st.hdHours);
        fields.hdMode.select.value = st.hdMode;
        draw();
      } }, label),
    );
  }

  const out = h("div", { class: "kpis" });
  const meters = h("div", { style: { display: "grid", gap: "12px", marginTop: "14px" } });
  const note = h("p", { class: "note", style: { marginTop: "12px" } });
  root.append(presets, h("div", { class: "sim-grid" }, controls, h("div", {}, out, meters, note)));

  function meter(label, value, limit, unit, digits = 0) {
    const pct = (value / limit) * 100;
    const cls = pct > 100 ? "is-over" : pct > 70 ? "is-mid" : "";
    const days = pct > 100 ? Math.floor((limit / value) * 30) : null;
    return h(
      "div",
      { class: "field" },
      h("div", { class: "field-row" }, h("span", { text: label }), h("output", { text: `${fmt(value, digits)} / ${fmt(limit, 0)} ${unit} (${fmt(pct, 0)}%)` })),
      h("div", { class: `meter ${cls}` }, h("i", { style: { width: `${Math.min(100, pct)}%` } })),
      days !== null ? h("span", { class: "note", text: `Habis sekitar hari ke-${days} setiap bulan.` }) : null,
    );
  }

  function draw() {
    const device = st.n * st.perDay * 30;
    const dash = st.users * ((st.userHours * 3600) / 20) * 30;
    const hd = st.hdMode === "v1" ? st.hdSessions * ((st.hdHours * 3600) / 5) * 30 : st.hdSessions * ((10 * 60) / 5) * 30;
    const inv = device + dash + hd;
    const cpuH = (inv * st.cpuMs) / 1000 / 3600;
    const gbh = (inv * st.wall * st.mem) / 3600;
    clear(out).append(
      kpi("Request perangkat/bulan", fmtCompact(device), `${st.n} alat × ${fmtCompact(st.perDay)}/hari`),
      kpi("Request dashboard/bulan", fmtCompact(dash), "refresh 20 dtk saat terlihat"),
      kpi("Request helpdesk/bulan", fmtCompact(hd), st.hdMode === "v1" ? "polling 5 dtk" : "hanya saat dibuka"),
      kpi("Total invocations/bulan", fmtCompact(inv), "jatah Hobby: 1 jt", inv > 1e6 ? "kpi--bad" : inv > 7e5 ? "kpi--warn" : "kpi--ok"),
    );
    clear(meters).append(
      meter("Invocations", inv, 1_000_000, "", 0),
      meter("Active CPU", cpuH, 4, "jam", 2),
      meter("Provisioned Memory", gbh, 360, "GB-jam", 0),
    );
    const costPro = (inv / 1e6) * 0.6 + cpuH * 0.16 + gbh * 0.0133;
    note.innerHTML = `Rumus: GB-jam = request × lama request × memori ÷ 3600 (konservatif, tanpa berbagi instance). Bila di luar jatah, perkiraan biaya pemakaian di plan Pro (tarif Singapura) ±<b>US$${fmt(costPro, 2)}/bulan</b>, belum termasuk biaya plan. <b>Catatan kebijakan:</b> Vercel Hobby ditujukan untuk penggunaan pribadi non-komersial. Untuk sistem operasional perusahaan, pertimbangkan akun organisasi (Pro) atau self-host.`;
  }
  draw();
}

// =============================================================== MATRIX --
export function initMatrix(root, openItem) {
  const weights = Object.fromEntries(MATRIX.criteria.map((c) => [c.id, c.w]));
  const wBox = h("div", { class: "weights" });
  const list = h("div", { class: "rank-list" });
  for (const c of MATRIX.criteria) {
    wBox.append(slider({ label: c.label, min: 0, max: 40, step: 1, value: c.w, unit: "", onInput: (v) => ((weights[c.id] = v), draw()) }));
  }
  root.append(h("div", { class: "sim-grid" }, wBox, h("div", {}, list, h("p", { class: "note", style: { marginTop: "10px" }, text: "Skor 1–5 per kriteria adalah penilaian awal (klik alternatif untuk alasannya). Opsi D, F, dan G tidak saling meniadakan: arsitektur usulan = D sebagai jalur utama, F untuk tangki tanpa Wi-Fi/listrik, G bila integrasi internal disetujui." }))));
  function draw() {
    const total = Object.values(weights).reduce((a, b) => a + b, 0) || 1;
    const scored = MATRIX.alternatives
      .map((a) => ({ a, score: MATRIX.criteria.reduce((acc, c) => acc + weights[c.id] * a.s[c.id], 0) / total }))
      .sort((x, y) => y.score - x.score);
    clear(list);
    scored.forEach(({ a, score }, i) => {
      list.append(
        h(
          "button",
          { class: `rank${i === 0 ? " is-top" : ""}`, type: "button", onclick: () => openItem(a.id) },
          h("span", { class: "pos", text: String(i + 1) }),
          h("span", { class: "name" }, a.name, h("div", { class: "bar" }, h("i", { style: { width: `${(score / 5) * 100}%` } }))),
          h("span", { class: "sc", text: fmt(score, 2) }),
        ),
      );
    });
  }
  draw();
}

// ================================================================== OPS --
export function initOpsSim(root) {
  const st = { sto: 29, checks: 7, minutes: 15, climbPct: 30, keepVisits: 2 };
  const controls = h("div", { class: "controls-grid" });
  controls.append(
    slider({ label: "Jumlah STO", min: 1, max: 100, step: 1, value: st.sto, onInput: (v) => ((st.sto = v), draw()) }),
    slider({ label: "Pengecekan manual per minggu per STO", min: 1, max: 21, step: 1, value: st.checks, onInput: (v) => ((st.checks = v), draw()) }),
    slider({ label: "Menit per pengecekan (jalan, ukur, catat)", min: 5, max: 45, step: 1, value: st.minutes, unit: " mnt", onInput: (v) => ((st.minutes = v), draw()) }),
    slider({ label: "Tangki yang perlu dipanjat", min: 0, max: 100, step: 5, value: st.climbPct, unit: "%", onInput: (v) => ((st.climbPct = v), draw()) }),
    slider({ label: "Inspeksi fisik yang tetap perlu per bulan per STO", min: 0, max: 8, step: 1, value: st.keepVisits, onInput: (v) => ((st.keepVisits = v), draw()) }),
  );
  const out = h("div", { class: "kpis" });
  root.append(h("div", { class: "sim-grid" }, controls, h("div", {}, out, h("p", { class: "note", style: { marginTop: "10px" }, text: "Ilustrasi, bukan klaim. Angka sebenarnya perlu disurvei ke petugas (bagian dari evaluasi E8). FTM tidak menghapus inspeksi fisik, hanya pengukuran rutin." }))));
  function draw() {
    const perMonth = st.checks * 4.33;
    const before = (st.sto * perMonth * st.minutes) / 60;
    const after = (st.sto * st.keepVisits * st.minutes) / 60;
    const climbsAvoided = st.sto * Math.max(0, perMonth - st.keepVisits) * (st.climbPct / 100);
    clear(out).append(
      kpi("Jam kerja cek manual/bulan", `${fmt(before, 0)} jam`, `${fmt(st.sto * perMonth, 0)} kunjungan`),
      kpi("Setelah FTM (inspeksi fisik saja)", `${fmt(after, 0)} jam`, `${fmt(st.sto * st.keepVisits, 0)} kunjungan`),
      kpi("Jam dibebaskan/bulan", `${fmt(before - after, 0)} jam`, "untuk tugas utama petugas", "kpi--ok"),
      kpi("Panjat tangki dihindari/bulan", fmt(climbsAvoided, 0), "paparan risiko jatuh berkurang", "kpi--ok"),
    );
  }
  draw();
}

// ============================================================== PAYLOAD --
function cborEncode(value) {
  const bytes = [];
  const head = (major, n) => {
    if (n < 24) bytes.push((major << 5) | n);
    else if (n < 256) bytes.push((major << 5) | 24, n);
    else if (n < 65536) bytes.push((major << 5) | 25, n >> 8, n & 255);
    else bytes.push((major << 5) | 26, (n >>> 24) & 255, (n >>> 16) & 255, (n >>> 8) & 255, n & 255);
  };
  const enc = (v) => {
    if (typeof v === "number" && Number.isInteger(v)) {
      if (v >= 0) head(0, v);
      else head(1, -1 - v);
    } else if (typeof v === "string") {
      const b = new TextEncoder().encode(v);
      head(3, b.length);
      bytes.push(...b);
    } else if (typeof v === "boolean") bytes.push(v ? 0xf5 : 0xf4);
    else if (Array.isArray(v)) {
      head(4, v.length);
      v.forEach(enc);
    } else if (v && typeof v === "object") {
      const entries = Object.entries(v);
      head(5, entries.length);
      for (const [k, val] of entries) {
        enc(k);
        enc(val);
      }
    } else bytes.push(0xf6);
  };
  enc(value);
  return new Uint8Array(bytes);
}

export function renderPayloadCompare(root) {
  const site = { code: "STO-X", name: "STO Contoh", area: "Area Contoh", regional: "TREG 5", wilayah: "TIF 3", lat: "-7.0000000", lng: "112.0000000" };
  const id = "dev-stox-main";
  const ip = "192.0.2.10";
  const tank = { shape: "horizontal-cylinder", cap: "4771.29", len: "270.00", dia: "150.00", mount: "158.00" };
  const v1 = `{"device":"${id}","device_id":"${id}","device_label":"fuel","expected_report_interval_sec":20,"ts":1790000000,"site_code":"${site.code}","site_name":"${site.name}","area_label":"${site.area}","regional_label":"${site.regional}","wilayah_label":"${site.wilayah}","lat":${site.lat},"lng":${site.lng},"tank_shape":"${tank.shape}","tank_type":"${tank.shape}","capacity_liter":${tank.cap},"length_cm":${tank.len},"diameter_cm":${tank.dia},"sensor_mount_height_cm":${tank.mount},"low_level_percent":30.00,"critical_level_percent":15.00,"consumption_liter_per_hour":9.00,"distance_cm":78.4,"distance":78.4,"dist_cm":78.4,"dist":78.4,"h_cm":79.60,"local_H_cm":79.60,"volume":2560.42,"percent":54,"voltage":3.70,"rssi":-67,"wifi_rssi":-67,"ip":"${ip}","site":{"code":"${site.code}","name":"${site.name}","area_label":"${site.area}","regional_label":"${site.regional}","wilayah_label":"${site.wilayah}","lat":${site.lat},"lng":${site.lng}},"tank":{"shape":"${tank.shape}","type":"${tank.shape}","capacity_liter":${tank.cap},"length_cm":${tank.len},"diameter_cm":${tank.dia},"sensor_mount_height_cm":${tank.mount}},"raw":{"device":"${id}","device_id":"${id}","device_label":"fuel","site_code":"${site.code}","distance_raw_cm":86.4,"distance_cm":78.4,"local_H_cm":79.60,"H_cm":79.60,"local_volume_l":2560.42,"volume":2560.42,"local_percent":54,"percent":54,"wifi_rssi":-67,"ultra_valid_samples":5,"ultra_timeout_samples":0,"ultra_out_of_range_samples":0,"ip":"${ip}"}}`;
  const v2obj = { d: "A7", n: 1842, t: 1790000000, g: 784, q: 0, m: "S", T: 318, b: 4120, r: -67, c: 7 };
  const v2 = JSON.stringify(v2obj);
  const enc = new TextEncoder();
  const b1 = enc.encode(v1).length;
  const b2 = enc.encode(v2).length;
  const b3 = cborEncode(v2obj).length;

  const box = (title, bytes, body, sub) =>
    h(
      "div",
      { class: "panel payload-box" },
      h("div", { class: "panel-title" }, h("h4", { text: title }), h("span", { class: "size", text: fmtBytes(bytes) })),
      h("pre", { text: body }),
      h("p", { class: "note", style: { marginTop: "8px" }, html: sub }),
    );
  root.append(
    box(
      "v1 — JSON lengkap setiap pesan",
      b1,
      v1,
      `Nilai jarak muncul 5× (distance, distance_cm, dist, dist_cm, raw), volume 3×, identitas site & dimensi tangki 2–3×. Contoh nilai sudah disamarkan. Pada 5.760 pesan/hari ≈ <b>${fmtBytes(b1 * 5760)}</b>/hari hanya untuk payload.`,
    ),
    box(
      "v2 — ringkas (konfigurasi dikirim hanya saat berubah)",
      b2,
      JSON.stringify(v2obj, null, 1),
      `Kunci: d=id pendek, n=nomor urut (anti-duplikat), t=waktu, g=ruang kosong (mm), q=kualitas, m=mode, T=suhu (0,1 °C), b=catu (mV), r=RSSI, c=versi konfigurasi. Versi CBOR (biner) = <b>${fmtBytes(b3)}</b>. Pada ±60 pesan/hari ≈ <b>${fmtBytes(b2 * 60)}</b>/hari.`,
    ),
  );
}
