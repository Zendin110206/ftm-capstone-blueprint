// Diagram arsitektur (SVG), stepper "satu hari di STO", dan Gantt roadmap.
import { ARCH, DAY_STEPS, ROADMAP } from "./content.js";
import { h, s, clear } from "./ui.js";

// ------------------------------------------------------------ arsitektur --
const EDGE_COLORS = { data: "--accent", local: "--violet", risk: "--bad", "": "--line-strong" };

function anchor(a, b) {
  const ax = a.x + a.w / 2;
  const bx = b.x + b.w / 2;
  if (b.x >= a.x + a.w - 4) return { x1: a.x + a.w, y1: a.y + a.h / 2, x2: b.x, y2: b.y + b.h / 2, dir: "h" };
  if (a.x >= b.x + b.w - 4) return { x1: a.x, y1: a.y + a.h / 2, x2: b.x + b.w, y2: b.y + b.h / 2, dir: "h" };
  if (b.y >= a.y + a.h) return { x1: ax, y1: a.y + a.h, x2: bx, y2: b.y, dir: "v" };
  return { x1: ax, y1: a.y, x2: bx, y2: b.y + b.h, dir: "v" };
}

function edgePath({ x1, y1, x2, y2, dir }) {
  if (dir === "h") {
    const mx = (x1 + x2) / 2;
    return `M${x1},${y1} C${mx},${y1} ${mx},${y2} ${x2},${y2}`;
  }
  const my = (y1 + y2) / 2;
  return `M${x1},${y1} C${x1},${my} ${x2},${my} ${x2},${y2}`;
}

function wrapText(text, maxChars) {
  const words = text.split(" ");
  const lines = [];
  let line = "";
  for (const w of words) {
    if ((line + " " + w).trim().length > maxChars && line) {
      lines.push(line);
      line = w;
    } else line = (line + " " + w).trim();
  }
  if (line) lines.push(line);
  return lines;
}

export function initArchitecture({ svg, list, scroll, modeGroup, listToggle }) {
  let mode = "tobe";

  function drawSvg() {
    const data = ARCH[mode];
    clear(svg);
    const maxY = Math.max(...data.nodes.map((n) => n.y + n.h)) + 30;
    const W = 1180;
    svg.setAttribute("viewBox", `0 0 ${W} ${maxY}`);
    svg.setAttribute("aria-label", mode === "tobe" ? "Diagram arsitektur usulan FTM 2.0" : "Diagram arsitektur FTM v1 saat ini");

    const defs = s("defs");
    for (const [k, v] of Object.entries(EDGE_COLORS)) {
      defs.append(
        s(
          "marker",
          { id: `arrow-${k || "plain"}`, viewBox: "0 0 10 10", refX: 9, refY: 5, markerWidth: 7, markerHeight: 7, orient: "auto-start-reverse" },
          s("path", { d: "M0,0 L10,5 L0,10 z", style: `fill: var(${v})` }),
        ),
      );
    }
    svg.append(defs);

    for (const lane of ARCH.lanes) {
      svg.append(s("rect", { class: "lane-bg", x: lane.x, y: 6, width: lane.w, height: maxY - 12, rx: 14 }));
      svg.append(s("text", { class: "lane-label", x: lane.x + 14, y: 24 }, lane.label));
    }

    const byId = Object.fromEntries(data.nodes.map((n) => [n.id, n]));
    for (const e of data.edges) {
      const a = byId[e.a];
      const b = byId[e.b];
      if (!a || !b) continue;
      const geo = anchor(a, b);
      const kind = e.k || "";
      svg.append(s("path", { class: `aedge${kind ? ` is-${kind}` : ""}`, d: edgePath(geo), "marker-end": `url(#arrow-${kind || "plain"})` }));
      if (e.l) {
        const lx = (geo.x1 + geo.x2) / 2;
        const ly = (geo.y1 + geo.y2) / 2 - 6;
        svg.append(s("text", { class: "elabel", x: lx, y: ly, "text-anchor": "middle" }, e.l));
      }
    }

    for (const n of data.nodes) {
      const cls = ["anode", n.isNew ? "is-new" : "", n.risk ? "is-risk" : "", n.opt ? "is-opt" : ""].filter(Boolean).join(" ");
      const g = s("g", { class: cls, "data-item": n.id, tabindex: "0", role: "button", "aria-label": `${n.t}: ${n.s}` });
      g.append(s("rect", { x: n.x, y: n.y, width: n.w, height: n.h, rx: 10 }));
      g.append(s("text", { class: "t", x: n.x + 12, y: n.y + 21 }, n.t));
      const maxChars = Math.floor((n.w - 24) / 5.6);
      wrapText(n.s, maxChars)
        .slice(0, 3)
        .forEach((line, i) => g.append(s("text", { class: "s", x: n.x + 12, y: n.y + 38 + i * 13 }, line)));
      const flag = n.risk ? ["titik lemah", "--bad"] : n.isNew ? ["baru", "--accent"] : n.opt ? ["opsional", "--muted"] : null;
      if (flag) g.append(s("text", { class: "flag", x: n.x + n.w - 10, y: n.y + 16, "text-anchor": "end", style: `fill: var(${flag[1]})` }, flag[0]));
      svg.append(g);
    }
  }

  function drawList() {
    const data = ARCH[mode];
    clear(list);
    for (const lane of ARCH.lanes) {
      const nodes = data.nodes.filter((n) => n.lane === lane.id);
      if (!nodes.length) continue;
      const ul = h("ul", { class: "rowlist" });
      for (const n of nodes) {
        const tag = n.risk ? h("span", { class: "badge badge--bad", text: "titik lemah" }) : n.isNew ? h("span", { class: "badge badge--accent", text: "baru" }) : n.opt ? h("span", { class: "badge", text: "opsional" }) : null;
        ul.append(
          h(
            "li",
            {},
            h(
              "button",
              { class: "row row--noicon", type: "button", "data-item": n.id },
              h("span", { class: "row-body" }, h("span", { class: "row-title" }, n.t, " ", tag), h("span", { class: "row-text", text: n.s })),
              h("span", { class: "row-chev", "aria-hidden": "true", text: "›" }),
            ),
          ),
        );
      }
      list.append(h("div", { class: "lane" }, h("h4", { text: lane.label }), ul));
    }
  }

  function render() {
    drawSvg();
    drawList();
  }

  modeGroup.addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-mode]");
    if (!btn) return;
    mode = btn.dataset.mode;
    modeGroup.querySelectorAll("button").forEach((b) => b.setAttribute("aria-pressed", String(b === btn)));
    render();
  });
  const applyView = () => {
    scroll.hidden = listToggle.checked;
    list.hidden = !listToggle.checked;
  };
  listToggle.addEventListener("change", applyView);
  if (scroll.clientWidth && scroll.clientWidth < 640) listToggle.checked = true;
  applyView();
  render();
}

// ---------------------------------------------------------------- stepper --
const LANE_LABELS = [
  ["context", "Konteks daya", "PLN/genset"],
  ["node", "Node FTM", "ukur & putuskan"],
  ["server", "Server FTM", "simpan & analisis"],
  ["user", "Petugas", "Telegram/dashboard"],
];
const MODE_CLASS = { SLOW: "badge--ok", FAST: "badge--fuel", EVENT: "badge--bad", BUFFER: "badge--info" };

export function initDayStepper(root) {
  let idx = 0;
  const listBox = h("div", { class: "step-list", role: "tablist", "aria-label": "Langkah satu hari" });
  const view = h("div", { class: "step-view", role: "tabpanel", "aria-live": "polite" });
  root.append(listBox, view);
  const buttons = DAY_STEPS.map((stp, i) => {
    const b = h(
      "button",
      { class: "step-btn", type: "button", role: "tab", "aria-selected": "false" },
      h("span", { class: "t", text: stp.time }),
      h("span", {}, h("b", { text: stp.title }), h("small", { text: `mode ${stp.mode}` })),
    );
    b.addEventListener("click", () => go(i));
    listBox.append(b);
    return b;
  });

  function go(i) {
    idx = (i + DAY_STEPS.length) % DAY_STEPS.length;
    const stp = DAY_STEPS[idx];
    buttons.forEach((b, j) => {
      b.setAttribute("aria-selected", String(j === idx));
      if (j === idx) b.setAttribute("aria-current", "step");
      else b.removeAttribute("aria-current");
    });
    const prev = h("button", { class: "btn btn--sm", type: "button", text: "← Sebelumnya", onclick: () => go(idx - 1) });
    const next = h("button", { class: "btn btn--sm btn--primary", type: "button", text: "Berikutnya →", onclick: () => go(idx + 1) });
    clear(view).append(
      h("div", { class: "step-meta" }, h("span", { class: "mono", text: stp.time }), h("span", { class: `badge ${MODE_CLASS[stp.mode]}`, text: `mode ${stp.mode}` })),
      h("h3", { text: stp.title }),
      h(
        "div",
        { class: "lanes-mini" },
        ...LANE_LABELS.map(([id, t, sub]) => h("div", { class: `lane-mini${stp.lanes.includes(id) ? " is-active" : ""}` }, h("b", { text: t }), h("span", { text: sub }))),
      ),
      h("p", { text: stp.text }),
      h("div", { class: "step-nav" }, prev, h("span", { class: "note", text: `${idx + 1} / ${DAY_STEPS.length}` }), next),
    );
  }
  go(0);
}

// ------------------------------------------------------------------ gantt --
export function initGantt(root) {
  const months = ROADMAP.months;
  const cols = months.length;
  clear(root);
  root.style.gridTemplateColumns = `200px repeat(${cols}, minmax(62px, 1fr))`;
  root.append(h("div", { class: "gh", style: { gridRow: "1", gridColumn: "1" }, text: "Pekerjaan" }));
  months.forEach((m, i) => root.append(h("div", { class: "gh", style: { gridRow: "1", gridColumn: String(i + 2) }, text: m })));

  ROADMAP.rows.forEach((row, r) => {
    const gridRow = String(r + 2);
    root.append(
      h(
        "button",
        { class: "rl", type: "button", "data-item": row.id, style: { gridRow, gridColumn: "1" } },
        h("span", { text: row.label }),
        h("small", { text: row.who }),
      ),
    );
    for (let c = 0; c < cols; c += 1) root.append(h("div", { class: "cell", style: { gridRow, gridColumn: String(c + 2) } }));
    for (const b of row.bars) {
      root.append(
        h("button", {
          class: `bar ${b.c}`,
          type: "button",
          "data-item": row.id,
          title: b.t,
          style: { gridRow, gridColumn: `${b.s + 2} / ${b.e + 2}` },
          text: b.t,
        }),
      );
    }
    for (const m of row.ms || []) {
      const col = Math.floor(m.at);
      const frac = m.at - col;
      root.append(
        h("button", {
          class: "ms",
          type: "button",
          "data-item": row.id,
          title: m.t,
          "aria-label": `Milestone: ${m.t}`,
          style: { gridRow, gridColumn: String(col + 2), marginLeft: `calc(${(frac * 100).toFixed(1)}% - 7px)` },
        }),
      );
    }
  });
}
