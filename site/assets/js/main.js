import {
  META,
  REFS,
  PROBLEMS,
  V1_FEATURES,
  TIMELINE,
  ISSUES,
  ISSUE_CATEGORIES,
  FINDINGS,
  CONCEPTS,
  DECISIONS,
  FEATURES,
  STACK_ROWS,
  EXPERIMENTS,
  CAREER,
  RISKS,
  CRITIQUE,
  buildRegistry,
} from "./content.js";
import { h, clear, onVisible, safeStorage } from "./ui.js";

const registry = buildRegistry();
const store = safeStorage();
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

// ----------------------------------------------------------------- ikon --
const ICON_PATHS = {
  ruler: '<path d="M3 17 17 3l4 4L7 21z"/><path d="m7 13 2 2M10 10l2 2M13 7l2 2"/>',
  alert: '<path d="M12 3 2 20h20z"/><path d="M12 10v4M12 17h.01"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6"/>',
  chart: '<path d="M4 19V5M4 19h16"/><path d="m7 15 4-4 3 3 5-6"/>',
  grid: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
  truck: '<path d="M3 6h11v10H3zM14 10h4l3 3v3h-7z"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/>',
  bolt: '<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>',
  history: '<path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5M12 7v5l3 2"/>',
  box: '<path d="M21 8 12 3 3 8v8l9 5 9-5z"/><path d="m3 8 9 5 9-5M12 13v8"/>',
  flask: '<path d="M9 3h6M10 3v6L4 19a2 2 0 0 0 2 3h12a2 2 0 0 0 2-3l-6-10V3"/>',
  cpu: '<rect x="6" y="6" width="12" height="12" rx="2"/><path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4"/>',
  wave: '<path d="M2 12c2-4 4-4 6 0s4 4 6 0 4-4 6 0"/>',
  shield: '<path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6z"/>',
  cloud: '<path d="M7 18h10a4 4 0 0 0 0-8 6 6 0 0 0-11.5 1.5A3.5 3.5 0 0 0 7 18z"/>',
};
const icon = (name) =>
  `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${
    ICON_PATHS[name] || ICON_PATHS.box
  }</svg>`;

const badge = (text, cls = "") => h("span", { class: `badge ${cls}`.trim(), text });
const strip = (html, n = 160) => {
  const t = String(html || "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  return t.length > n ? `${t.slice(0, n).replace(/\s+\S*$/, "")}…` : t;
};

/** Baris daftar yang bisa diklik (pengganti kartu). */
function rowItem({ id, title, text, iconName, iconClass = "", meta = [] }) {
  return h(
    "li",
    {},
    h(
      "button",
      { class: `row${iconName ? "" : " row--noicon"}`, type: "button", "data-item": id },
      iconName ? h("span", { class: `row-icon ${iconClass}`.trim(), html: icon(iconName) }) : null,
      h(
        "span",
        { class: "row-body" },
        meta.length ? h("span", { class: "row-meta" }, ...meta) : null,
        h("span", { class: "row-title", text: title }),
        text ? h("span", { class: "row-text", text }) : null,
      ),
      h("span", { class: "row-chev", "aria-hidden": "true", text: "›" }),
    ),
  );
}

// ----------------------------------------------------------------- tema --
function initTheme() {
  const btn = $("#theme-toggle");
  const root = document.documentElement;
  const current = () => root.getAttribute("data-theme") || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  const paint = () => btn.setAttribute("aria-label", current() === "dark" ? "Ganti ke tema terang" : "Ganti ke tema gelap");
  btn.addEventListener("click", () => {
    const next = current() === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    store.set("ftm-theme", next);
    paint();
    document.dispatchEvent(new CustomEvent("themechange"));
  });
  paint();
}

// ------------------------------------------------------------- navigasi --
function initNav() {
  const sections = $$("section[data-nav]");
  const side = $("#toc-side");
  const sheetList = $("#toc-sheet");
  const sheet = $("#nav-sheet");
  for (const sec of sections) {
    const make = () => h("li", {}, h("a", { href: `#${sec.id}`, "data-sec": sec.id }, h("span", { class: "n", text: sec.dataset.num }), h("span", { text: sec.dataset.nav })));
    side.append(make());
    sheetList.append(make());
  }
  const menuBtn = $("#menu-toggle");
  const closeSheet = () => {
    sheet.hidden = true;
    menuBtn.setAttribute("aria-expanded", "false");
  };
  menuBtn.addEventListener("click", () => {
    const open = sheet.hidden;
    sheet.hidden = !open;
    menuBtn.setAttribute("aria-expanded", String(open));
  });
  sheet.addEventListener("click", (e) => {
    if (e.target.closest("a")) closeSheet();
  });
  document.addEventListener("click", (e) => {
    if (!sheet.hidden && !e.target.closest("#nav-sheet") && !e.target.closest("#menu-toggle")) closeSheet();
  });

  const links = $$("a[data-sec]");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          links.forEach((a) => a.classList.toggle("is-active", a.dataset.sec === entry.target.id));
        }
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    sections.forEach((sec) => io.observe(sec));
  }

  const bar = $("#progress");
  const backTop = $("#back-top");
  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
      backTop.classList.toggle("is-visible", window.scrollY > 900);
      ticking = false;
    });
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  backTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
}

// --------------------------------------------------------------- render --
function renderProblems() {
  const list = $("#problem-list");
  const cls = { alert: "row-icon--bad", truck: "row-icon--fuel", bolt: "row-icon--fuel" };
  for (const p of PROBLEMS) list.append(rowItem({ id: p.id, title: p.title, text: p.short, iconName: p.icon, iconClass: cls[p.icon] || "" }));
}

function renderV1() {
  const list = $("#v1-list");
  const icons = ["cloud", "chart", "box", "wave", "shield", "flask", "grid", "cpu"];
  V1_FEATURES.forEach((f, i) => list.append(rowItem({ id: f.id, title: f.title, text: f.short, iconName: icons[i % icons.length], iconClass: "row-icon--accent" })));
  const tl = $("#timeline");
  for (const t of TIMELINE) {
    tl.append(
      h(
        "li",
        {},
        h("button", { class: `tl-item${t.key ? " is-key" : ""}`, type: "button", "data-item": t.id }, h("span", { class: "d", text: t.date }), h("b", { text: t.title }), h("span", { text: t.text })),
      ),
    );
  }
}

function filterChips(container, entries, initial, onChange) {
  let active = initial;
  for (const [key, label, count] of entries) {
    container.append(h("button", { class: "chip", type: "button", "aria-pressed": String(key === active), "data-key": key }, label, h("span", { class: "count", text: String(count) })));
  }
  container.addEventListener("click", (e) => {
    const chip = e.target.closest(".chip");
    if (!chip) return;
    active = chip.dataset.key;
    $$(".chip", container).forEach((c) => c.setAttribute("aria-pressed", String(c === chip)));
    onChange(active);
  });
}

function renderIssues() {
  const list = $("#issue-list");
  const more = $("#issue-more");
  const LIMIT = 10;
  let active = "all";
  let expanded = false;
  const counts = ISSUES.reduce((acc, i) => ((acc[i.cat] = (acc[i.cat] || 0) + 1), acc), {});
  const entries = [["all", "Semua", ISSUES.length], ...Object.entries(ISSUE_CATEGORIES).filter(([k]) => counts[k]).map(([k, c]) => [k, c.label, counts[k]])];
  const draw = () => {
    clear(list);
    clear(more);
    const items = ISSUES.filter((i) => active === "all" || i.cat === active);
    const shown = expanded || active !== "all" ? items : items.slice(0, LIMIT);
    for (const i of shown) {
      const cat = ISSUE_CATEGORIES[i.cat];
      list.append(
        h(
          "button",
          { class: "issue", type: "button", "data-item": i.id },
          h("span", { class: "d", text: i.date }),
          h("span", {}, h("b", { text: i.title }), h("small", { text: i.summary })),
          h("span", { class: "tags" }, badge(cat.label, cat.badge), ...i.pillars.map((n) => badge(`Pilar ${n}`, "badge--accent"))),
        ),
      );
    }
    if (shown.length < items.length) {
      more.append(h("button", { class: "btn", type: "button", onclick: () => ((expanded = true), draw()) }, `Tampilkan semua ${items.length} catatan`));
    }
  };
  filterChips($("#issue-filters"), entries, active, (k) => {
    active = k;
    draw();
  });
  draw();
}

function renderFindings() {
  const tbody = $("#finding-table tbody");
  const sevClass = { tinggi: "badge--bad", sedang: "badge--warn", rendah: "badge--info" };
  const order = { tinggi: 0, sedang: 1, rendah: 2 };
  const sorted = [...FINDINGS].sort((a, b) => order[a.sev] - order[b.sev]);
  const n = (k) => FINDINGS.filter((f) => f.sev === k).length;
  let active = "all";
  const draw = () => {
    clear(tbody);
    for (const f of sorted) {
      if (active !== "all" && f.sev !== active) continue;
      tbody.append(
        h(
          "tr",
          { class: "is-click", "data-item": f.id, tabindex: "0", role: "button" },
          h("td", {}, badge(f.sev[0].toUpperCase() + f.sev.slice(1), sevClass[f.sev])),
          h("td", {}, h("b", { text: f.title })),
          h("td", { class: "muted", text: f.area }),
          h("td", {}, badge(`Pilar ${f.pillar}`, "badge--accent")),
        ),
      );
    }
  };
  filterChips($("#finding-filters"), [["all", "Semua", FINDINGS.length], ["tinggi", "Tinggi", n("tinggi")], ["sedang", "Sedang", n("sedang")], ["rendah", "Rendah", n("rendah")]], active, (k) => {
    active = k;
    draw();
  });
  draw();
}

function renderConcepts() {
  const byId = Object.fromEntries(CONCEPTS.map((c) => [c.id, c]));
  const put = (sel, ids, iconName, cls) => {
    const list = $(sel);
    for (const id of ids) {
      const item = byId[id] || registry.get(id);
      if (!item) continue;
      list.append(rowItem({ id, title: item.title, text: strip(item.detail, 170), iconName, iconClass: cls }));
    }
  };
  put("#p1-concepts", ["c-errorbudget", "c-kalibrasi", "c-filter"], "ruler", "row-icon--accent");
  put("#p2-concepts", ["c-statemachine", "c-policy", "c-energymodel", "c-radio"], "wave", "row-icon--fuel");
  put("#p3-concepts", ["c-cloudmodel", "d-need", "d-longterm"], "cloud", "row-icon--accent");
}

function renderDecisions() {
  const list = $("#decision-list");
  const vClass = { yes: "verdict--yes", cond: "verdict--cond", later: "verdict--later", no: "verdict--no" };
  for (const d of DECISIONS) {
    list.append(rowItem({ id: d.id, title: d.q, text: d.short, meta: [h("span", { class: `verdict ${vClass[d.verdict]}`, text: d.vlabel })] }));
  }
}

function renderFeatures() {
  const tbody = $("#feature-table tbody");
  const prioClass = { Must: "badge--bad", Should: "badge--warn", Could: "badge--info", "Won't": "" };
  const pillarClass = { 1: "badge--info", 2: "badge--fuel", 3: "badge--violet" };
  let active = "all";
  const draw = () => {
    clear(tbody);
    for (const f of FEATURES) {
      if (active !== "all" && f.prio !== active) continue;
      tbody.append(
        h(
          "tr",
          { class: "is-click", "data-item": f.id, tabindex: "0", role: "button" },
          h("td", {}, h("b", { text: f.name }), h("span", { class: "sub", text: f.why })),
          h("td", {}, badge(f.prio, prioClass[f.prio])),
          h("td", {}, badge(`Pilar ${f.pillar}`, pillarClass[f.pillar])),
        ),
      );
    }
  };
  const keys = ["Must", "Should", "Could", "Won't"];
  filterChips($("#feature-filters"), [["all", "Semua", FEATURES.length], ...keys.map((k) => [k, k, FEATURES.filter((f) => f.prio === k).length])], active, (k) => {
    active = k;
    draw();
  });
  draw();
}

function renderStack() {
  const tbody = $("#stack-table tbody");
  for (const r of STACK_ROWS) {
    tbody.append(
      h(
        "tr",
        { class: "is-click", "data-item": r.id, tabindex: "0", role: "button" },
        h("td", {}, h("b", { text: r.layer })),
        h("td", { class: "muted", text: r.v1 }),
        h("td", { class: "muted", text: r.bht }),
        h("td", { class: "muted", text: r.pzn }),
        h("td", { text: r.rec }),
      ),
    );
  }
}

function renderExperiments() {
  const list = $("#exp-list");
  const pillarClass = { 1: "badge--info", 2: "badge--fuel", 3: "badge--violet" };
  for (const x of EXPERIMENTS) {
    list.append(rowItem({ id: x.id, title: x.name, text: x.hypothesis, meta: [badge(x.code, "badge--accent"), badge(`Pilar ${x.pillar}`, pillarClass[x.pillar])] }));
  }
}

function renderCareer() {
  const list = $("#role-list");
  for (const r of CAREER.roles) list.append(rowItem({ id: r.id, title: r.name, text: r.proof, iconName: "user", iconClass: "row-icon--accent" }));
  const ul = $("#cv-bullets");
  for (const b of CAREER.bullets) ul.append(h("li", { text: b }));
  const ol = $("#talking");
  for (const t of CAREER.talking) ol.append(h("li", { text: t }));
}

function renderRisks() {
  const tbody = $("#risk-table tbody");
  const cls = { Tinggi: "badge--bad", Sedang: "badge--warn", Rendah: "badge--info" };
  for (const r of RISKS) tbody.append(h("tr", {}, h("td", {}, h("b", { text: r.risk })), h("td", {}, badge(r.impact, cls[r.impact])), h("td", { text: r.mitigation })));
}

function renderCritique() {
  const list = $("#critique-list");
  const v = { ok: ["Tepat", "badge--ok"], warn: ["Perlu dilengkapi", "badge--warn"], bad: ["Keliru", "badge--bad"] };
  for (const c of CRITIQUE) list.append(h("div", { class: "crit" }, h("span", {}, badge(v[c.v][0], v[c.v][1])), h("span", {}, h("b", { text: c.point }), h("small", { text: c.note }))));
}

function renderRefs() {
  const list = $("#ref-list");
  const entries = Object.entries(REFS);
  const kinds = Array.from(new Set(entries.map(([, r]) => r.k)));
  let active = "Semua";
  const draw = () => {
    clear(list);
    for (const [id, r] of entries) {
      if (active !== "Semua" && r.k !== active) continue;
      list.append(
        h(
          "li",
          { id: `ref-${id}` },
          h("span", { class: "id", text: id }),
          h("span", {}, r.u ? h("a", { href: r.u, target: "_blank", rel: "noopener", text: r.t }) : h("span", { text: r.t }), h("span", { class: "badge kind", text: r.k })),
        ),
      );
    }
  };
  filterChips($("#ref-filters"), [["Semua", "Semua", entries.length], ...kinds.map((k) => [k, k, entries.filter(([, r]) => r.k === k).length])], active, (k) => {
    active = k;
    draw();
  });
  draw();
}

// --------------------------------------------------------------- drawer --
const drawer = $("#drawer");
const scrim = $("#scrim");
let lastFocus = null;
let prevHash = "";

const escapeHtml = (text) => String(text).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);

function refsHtml(ids = []) {
  const valid = ids.filter((id) => REFS[id]);
  if (!valid.length) return "";
  const items = valid
    .map((id) => {
      const r = REFS[id];
      const title = r.u ? `<a href="${r.u}" target="_blank" rel="noopener">${escapeHtml(r.t)}</a>` : escapeHtml(r.t);
      return `<li><span class="tag">${id}</span>${title} <span class="badge">${escapeHtml(r.k)}</span></li>`;
    })
    .join("");
  return `<h3>Sumber</h3><ul class="src-list">${items}</ul>`;
}

function relatedHtml(ids = []) {
  const valid = ids.filter((id) => registry.has(id));
  if (!valid.length) return "";
  return `<h3>Terkait</h3><div class="related">${valid.map((id) => `<button type="button" data-item="${id}">${escapeHtml(registry.get(id).title)}</button>`).join("")}</div>`;
}

function openItem(id, { updateHash = true } = {}) {
  const item = registry.get(id);
  if (!item) return false;
  if (!drawer.classList.contains("is-open")) {
    lastFocus = document.activeElement;
    prevHash = location.hash.startsWith("#item=") ? "" : location.hash;
  }
  $("#drawer-kicker").textContent = item.kicker || "";
  $("#drawer-title").textContent = item.title || "";
  const badges = clear($("#drawer-badges"));
  for (const b of item.badges || []) badges.append(badge(b.t, b.c));
  const body = $("#drawer-body");
  body.innerHTML = (item.detail || "") + refsHtml(item.refs) + relatedHtml(item.related);
  body.scrollTop = 0;
  drawer.classList.add("is-open");
  drawer.setAttribute("aria-hidden", "false");
  scrim.classList.add("is-open");
  document.body.classList.add("is-locked");
  if (updateHash) history.replaceState(null, "", `#item=${encodeURIComponent(id)}`);
  $("#drawer-close").focus({ preventScroll: true });
  return true;
}

function closeDrawer({ restoreHash = true } = {}) {
  if (!drawer.classList.contains("is-open")) return;
  drawer.classList.remove("is-open");
  drawer.setAttribute("aria-hidden", "true");
  scrim.classList.remove("is-open");
  document.body.classList.remove("is-locked");
  if (restoreHash) history.replaceState(null, "", `${location.pathname}${location.search}${prevHash || ""}`);
  if (lastFocus && document.contains(lastFocus)) lastFocus.focus({ preventScroll: true });
}

function initDrawer() {
  $("#drawer-close").addEventListener("click", () => closeDrawer());
  scrim.addEventListener("click", () => closeDrawer());
  $("#drawer-copy").addEventListener("click", async (e) => {
    const btn = e.currentTarget;
    try {
      await navigator.clipboard.writeText(location.href);
      btn.textContent = "Tersalin";
    } catch {
      btn.textContent = "Salin dari address bar";
    }
    setTimeout(() => (btn.textContent = "Salin tautan"), 1800);
  });
  drawer.addEventListener("keydown", (e) => {
    if (e.key !== "Tab") return;
    const focusables = $$('a[href], button:not([disabled]), input, select, [tabindex]:not([tabindex="-1"])', drawer).filter((el) => el.offsetParent !== null);
    if (!focusables.length) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  });
}

// -------------------------------------------------------------- palette --
const palette = $("#palette");
const paletteInput = $("#palette-input");
const paletteResults = $("#palette-results");
let paletteIndex = [];
let paletteSel = 0;
const norm = (t) => String(t).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");

function buildPaletteIndex() {
  const sections = $$("section[data-nav]").map((sec) => ({
    kind: "section",
    id: sec.id,
    title: sec.dataset.nav,
    kicker: `Bagian ${sec.dataset.num}`,
    hay: norm(`${sec.dataset.nav} ${sec.querySelector("h2")?.textContent || ""}`),
    titleN: norm(sec.dataset.nav),
  }));
  const items = [...registry.values()].map((it) => ({
    kind: "item",
    id: it.id,
    title: it.title,
    kicker: it.kicker || "",
    hay: norm(`${it.title} ${it.kicker || ""} ${strip(it.detail, 4000)}`),
    titleN: norm(it.title),
  }));
  paletteIndex = [...sections, ...items];
}

function searchPalette(q) {
  const tokens = norm(q).split(/\s+/).filter(Boolean);
  if (!tokens.length) return paletteIndex.filter((x) => x.kind === "section");
  const scored = [];
  for (const x of paletteIndex) {
    if (!tokens.every((t) => x.hay.includes(t))) continue;
    let score = x.kind === "section" ? 2 : 0;
    for (const t of tokens) {
      if (x.titleN.includes(t)) score += 5;
      if (x.titleN.startsWith(t)) score += 3;
    }
    scored.push([score, x]);
  }
  return scored.sort((a, b) => b[0] - a[0]).slice(0, 40).map(([, x]) => x);
}

function drawPalette() {
  const results = searchPalette(paletteInput.value);
  clear(paletteResults);
  if (!results.length) {
    paletteResults.append(h("li", {}, h("button", { type: "button", disabled: true }, h("b", { text: "Tidak ditemukan" }), h("small", { text: "Coba kata lain, misalnya energi, RTU, kalibrasi" }))));
    return;
  }
  paletteSel = Math.min(paletteSel, results.length - 1);
  results.forEach((x, i) => {
    paletteResults.append(
      h("li", {}, h("button", { type: "button", role: "option", "aria-selected": String(i === paletteSel), "data-kind": x.kind, "data-id": x.id }, h("b", { text: x.title }), h("small", { text: x.kicker }))),
    );
  });
}

function openPalette() {
  if (!paletteIndex.length) buildPaletteIndex();
  palette.hidden = false;
  paletteInput.value = "";
  paletteSel = 0;
  drawPalette();
  paletteInput.focus();
  document.body.classList.add("is-locked");
}

function closePalette() {
  palette.hidden = true;
  if (!drawer.classList.contains("is-open")) document.body.classList.remove("is-locked");
}

function choosePalette(btn) {
  if (!btn || btn.disabled) return;
  const { kind, id } = btn.dataset;
  closePalette();
  if (kind === "section") document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  else openItem(id);
}

function initPalette() {
  $("#open-search").addEventListener("click", openPalette);
  paletteInput.addEventListener("input", () => {
    paletteSel = 0;
    drawPalette();
  });
  paletteInput.addEventListener("keydown", (e) => {
    const buttons = $$("button[data-id]", paletteResults);
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      if (!buttons.length) return;
      paletteSel = (paletteSel + (e.key === "ArrowDown" ? 1 : -1) + buttons.length) % buttons.length;
      buttons.forEach((b, i) => b.setAttribute("aria-selected", String(i === paletteSel)));
      buttons[paletteSel].scrollIntoView({ block: "nearest" });
    } else if (e.key === "Enter") {
      e.preventDefault();
      choosePalette(buttons[paletteSel]);
    }
  });
  paletteResults.addEventListener("click", (e) => choosePalette(e.target.closest("button[data-id]")));
  palette.addEventListener("click", (e) => {
    if (e.target === palette) closePalette();
  });
}

// ----------------------------------------------------------------- tabs --
const initialised = new Set();
let simsModule = null;
const loadSims = async () => (simsModule ||= await import("./sims.js"));

async function initPillarPanel(tab) {
  if (initialised.has(tab)) return;
  initialised.add(tab);
  try {
    const sims = await loadSims();
    if (tab === "p1") sims.initAccuracySim($("#acc-sim"));
    if (tab === "p2") {
      sims.initTelemetrySim($("#tel-sim"));
      sims.renderPayloadCompare($("#payload-compare"));
    }
    if (tab === "p3") {
      sims.initCloudSim($("#cloud-sim"));
      sims.initMatrix($("#matrix"), (id) => openItem(id));
      sims.initOpsSim($("#ops-sim"));
    }
  } catch (err) {
    initialised.delete(tab);
    console.error("Gagal memuat simulator", err);
  }
}

function selectTab(tab, { focus = false } = {}) {
  for (const t of $$("#pillar-tabs .tab")) {
    const on = t.dataset.tab === tab;
    t.setAttribute("aria-selected", String(on));
    t.tabIndex = on ? 0 : -1;
    $(`#panel-${t.dataset.tab}`).hidden = !on;
    if (on && focus) t.focus();
  }
  initPillarPanel(tab);
}

function initTabs() {
  const list = $("#pillar-tabs");
  list.addEventListener("click", (e) => {
    const t = e.target.closest(".tab");
    if (t) selectTab(t.dataset.tab);
  });
  list.addEventListener("keydown", (e) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    const tabs = $$(".tab", list);
    const idx = tabs.findIndex((t) => t.getAttribute("aria-selected") === "true");
    const next = tabs[(idx + (e.key === "ArrowRight" ? 1 : -1) + tabs.length) % tabs.length];
    selectTab(next.dataset.tab, { focus: true });
  });
  onVisible($("#pilar"), () => initPillarPanel("p1"), "400px");
}

// ------------------------------------------------------- modul lambat --
function once(fn) {
  let done = false;
  return async (...args) => {
    if (done) return;
    done = true;
    try {
      await fn(...args);
    } catch (err) {
      done = false;
      console.error(err);
    }
  };
}

function initLazyModules() {
  let diagrams = null;
  const loadDiagrams = async () => (diagrams ||= await import("./diagrams.js"));
  const ensurePower = once(async () => (await loadSims()).initPowerSim($("#power-sim")));
  const ensureArch = once(async () => {
    const d = await loadDiagrams();
    d.initArchitecture({ svg: $("#arch-svg"), list: $("#arch-list"), scroll: $("#arch-scroll"), modeGroup: $("#arch-mode"), listToggle: $("#arch-listview") });
    d.initDayStepper($("#day-stepper"));
  });
  const ensureGantt = once(async () => (await loadDiagrams()).initGantt($("#gantt")));

  onVisible($("#power-sim"), ensurePower);
  onVisible($("#arsitektur"), ensureArch);
  onVisible($("#roadmap"), ensureGantt);

  // Muat semuanya saat browser senggang, agar tidak ada panel kosong ketika pembaca scroll cepat.
  const idle = window.requestIdleCallback || ((cb) => setTimeout(cb, 1200));
  window.addEventListener("load", () =>
    idle(async () => {
      await ensurePower();
      for (const tab of ["p1", "p2", "p3"]) await initPillarPanel(tab);
      await ensureArch();
      await ensureGantt();
    }),
  );

  import("./tank.js")
    .then((m) => m.initTank())
    .catch((err) => console.error("Visual tangki gagal dimuat", err));
}

// ------------------------------------------------------- event global --
function initGlobalEvents() {
  document.addEventListener("click", (e) => {
    const closer = e.target.closest("[data-close-drawer]");
    if (closer) {
      closeDrawer({ restoreHash: false });
      if (closer.dataset.tab) selectTab(closer.dataset.tab);
      return;
    }
    const jump = e.target.closest("[data-jump-tab]");
    if (jump) {
      selectTab(jump.dataset.jumpTab);
      $("#pilar").scrollIntoView({ behavior: "smooth" });
      return;
    }
    const trigger = e.target.closest("[data-item]");
    if (trigger && !trigger.closest(".palette")) {
      e.preventDefault();
      openItem(trigger.dataset.item);
    }
  });
  document.addEventListener("keydown", (e) => {
    const typing = /^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement?.tagName || "");
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
      e.preventDefault();
      if (palette.hidden) openPalette();
      else closePalette();
      return;
    }
    if (e.key === "/" && !typing && palette.hidden) {
      e.preventDefault();
      openPalette();
      return;
    }
    if (e.key === "Escape") {
      if (!palette.hidden) closePalette();
      else closeDrawer();
      return;
    }
    const el = document.activeElement;
    if ((e.key === "Enter" || e.key === " ") && el?.matches?.("[data-item]:not(button):not(a)")) {
      e.preventDefault();
      openItem(el.dataset.item);
    }
  });
  window.addEventListener("hashchange", () => {
    if (location.hash.startsWith("#item=")) openItem(decodeURIComponent(location.hash.slice(6)), { updateHash: false });
  });
}

// ----------------------------------------------------------------- boot --
function boot() {
  $("#meta-version").textContent = META.version;
  $("#meta-updated").textContent = META.updated;
  initTheme();
  initNav();
  renderProblems();
  renderV1();
  renderIssues();
  renderFindings();
  renderConcepts();
  renderDecisions();
  renderFeatures();
  renderStack();
  renderExperiments();
  renderCareer();
  renderRisks();
  renderCritique();
  renderRefs();
  initDrawer();
  initPalette();
  initTabs();
  initGlobalEvents();
  initLazyModules();
  if (location.hash.startsWith("#item=")) {
    const id = decodeURIComponent(location.hash.slice(6));
    if (!openItem(id, { updateHash: false })) history.replaceState(null, "", location.pathname);
  }
}

boot();
