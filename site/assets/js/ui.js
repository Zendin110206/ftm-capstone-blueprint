// Helper DOM, format angka, dan grafik SVG kecil (tanpa library).

const SVG_NS = "http://www.w3.org/2000/svg";

export function h(tag, attrs = {}, ...children) {
  const node = document.createElement(tag);
  applyAttrs(node, attrs);
  appendChildren(node, children);
  return node;
}

export function s(tag, attrs = {}, ...children) {
  const node = document.createElementNS(SVG_NS, tag);
  applyAttrs(node, attrs);
  appendChildren(node, children);
  return node;
}

function applyAttrs(node, attrs) {
  for (const [key, value] of Object.entries(attrs || {})) {
    if (value === null || value === undefined || value === false) continue;
    if (key === "class") node.setAttribute("class", value);
    else if (key === "html") node.innerHTML = value;
    else if (key === "text") node.textContent = value;
    else if (key === "style" && typeof value === "object") Object.assign(node.style, value);
    else if (key.startsWith("on") && typeof value === "function") node.addEventListener(key.slice(2), value);
    else if (key === "dataset" && typeof value === "object") Object.assign(node.dataset, value);
    else node.setAttribute(key, value === true ? "" : String(value));
  }
}

function appendChildren(node, children) {
  for (const child of children.flat()) {
    if (child === null || child === undefined || child === false) continue;
    node.append(child instanceof Node ? child : document.createTextNode(String(child)));
  }
}

export function clear(node) {
  while (node.firstChild) node.removeChild(node.firstChild);
  return node;
}

const nfCache = new Map();

export function fmt(value, digits = 0) {
  if (!Number.isFinite(value)) return "–";
  const key = digits;
  if (!nfCache.has(key)) {
    nfCache.set(
      key,
      new Intl.NumberFormat("id-ID", {
        minimumFractionDigits: digits,
        maximumFractionDigits: digits,
      }),
    );
  }
  return nfCache.get(key).format(value);
}

export function fmtCompact(value) {
  if (!Number.isFinite(value)) return "–";
  const abs = Math.abs(value);
  if (abs >= 1e9) return `${fmt(value / 1e9, 2)} M`;
  if (abs >= 1e6) return `${fmt(value / 1e6, 2)} jt`;
  if (abs >= 1e4) return `${fmt(value / 1e3, 1)} rb`;
  return fmt(value, abs < 10 ? 1 : 0);
}

export function fmtBytes(bytes) {
  if (!Number.isFinite(bytes)) return "–";
  if (bytes >= 1024 ** 3) return `${fmt(bytes / 1024 ** 3, 2)} GB`;
  if (bytes >= 1024 ** 2) return `${fmt(bytes / 1024 ** 2, 2)} MB`;
  if (bytes >= 1024) return `${fmt(bytes / 1024, 1)} KB`;
  return `${fmt(bytes, 0)} B`;
}

export function fmtEnergy(joules) {
  if (!Number.isFinite(joules)) return "–";
  const mWh = joules / 3.6;
  if (mWh >= 1000) return `${fmt(mWh / 1000, 2)} Wh`;
  if (mWh >= 10) return `${fmt(mWh, 0)} mWh`;
  return `${fmt(mWh, 1)} mWh`;
}

export function fmtDuration(seconds) {
  if (!Number.isFinite(seconds)) return "tidak terdeteksi";
  if (seconds < 1) return "< 1 dtk";
  if (seconds < 90) return `${fmt(seconds, 0)} dtk`;
  if (seconds < 5400) return `${fmt(seconds / 60, 1)} mnt`;
  return `${fmt(seconds / 3600, 1)} jam`;
}

export function debounce(fn, wait = 120) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), wait);
  };
}

export function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function cssVar(name) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

/**
 * Grafik garis SVG sederhana.
 * series: [{ points: [[x, y], ...], color, width, dash, step, dots, label }]
 */
export function lineChart(svg, { series, xMin, xMax, yMin, yMax, xTicks = [], yTicks = [], xFmt, yFmt, height = 240, bands = [] }) {
  clear(svg);
  // Digambar selebar wadahnya (skala 1:1) agar teks tidak gepeng di layar sempit.
  const W = Math.max(280, Math.round(svg.parentElement?.clientWidth || svg.clientWidth || 720));
  const H = height;
  const pad = { l: 56, r: 12, t: 14, b: 28 };
  svg.setAttribute("viewBox", `0 0 ${W} ${H}`);
  svg.removeAttribute("preserveAspectRatio");
  if (W < 460) xTicks = xTicks.filter((_, i) => i % 2 === 0);
  const x = (v) => pad.l + ((v - xMin) / (xMax - xMin || 1)) * (W - pad.l - pad.r);
  const y = (v) => H - pad.b - ((v - yMin) / (yMax - yMin || 1)) * (H - pad.t - pad.b);

  for (const band of bands) {
    svg.append(
      s("rect", {
        x: x(band.from),
        y: pad.t,
        width: Math.max(1, x(band.to) - x(band.from)),
        height: H - pad.t - pad.b,
        fill: band.color,
        opacity: band.opacity ?? 0.14,
      }),
    );
    if (band.label) {
      svg.append(s("text", { x: x(band.from) + 4, y: pad.t + 12, "font-size": 10 }, band.label));
    }
  }

  for (const t of yTicks) {
    svg.append(s("line", { class: "grid-line", x1: pad.l, x2: W - pad.r, y1: y(t), y2: y(t) }));
    svg.append(s("text", { x: pad.l - 6, y: y(t) + 4, "text-anchor": "end" }, yFmt ? yFmt(t) : String(t)));
  }
  for (const t of xTicks) {
    svg.append(s("text", { x: x(t), y: H - 8, "text-anchor": "middle" }, xFmt ? xFmt(t) : String(t)));
  }
  svg.append(s("line", { class: "axis", x1: pad.l, x2: W - pad.r, y1: H - pad.b, y2: H - pad.b }));

  for (const serie of series) {
    if (!serie.points.length) continue;
    let d = "";
    serie.points.forEach(([px, py], i) => {
      const X = x(px).toFixed(1);
      const Y = y(py).toFixed(1);
      if (i === 0) d += `M${X},${Y}`;
      else if (serie.step) {
        const prevY = y(serie.points[i - 1][1]).toFixed(1);
        d += `L${X},${prevY}L${X},${Y}`;
      } else d += `L${X},${Y}`;
    });
    if (serie.stepToEnd && serie.points.length) {
      d += `L${x(xMax).toFixed(1)},${y(serie.points[serie.points.length - 1][1]).toFixed(1)}`;
    }
    svg.append(
      s("path", {
        d,
        fill: "none",
        stroke: serie.color,
        "stroke-width": serie.width ?? 2,
        "stroke-dasharray": serie.dash || null,
        "vector-effect": "non-scaling-stroke",
        "stroke-linejoin": "round",
      }),
    );
    if (serie.dots) {
      const maxDots = 400;
      const stepEvery = Math.max(1, Math.ceil(serie.points.length / maxDots));
      serie.points.forEach(([px, py], i) => {
        if (i % stepEvery !== 0) return;
        svg.append(s("circle", { cx: x(px), cy: y(py), r: serie.dotR ?? 2.4, fill: serie.color }));
      });
    }
  }
  return { x, y };
}

export function barH(container, rows, { max, fmtValue, colorFor } = {}) {
  clear(container);
  const top = max ?? Math.max(...rows.map((r) => r.value), 1);
  for (const row of rows) {
    const pct = Math.max(0, Math.min(100, (row.value / top) * 100));
    container.append(
      h(
        "div",
        { class: "field" },
        h("div", { class: "field-row" }, h("span", { text: row.label }), h("output", { text: fmtValue ? fmtValue(row.value) : fmt(row.value, 1) })),
        h("div", { class: "meter" }, h("i", { style: { width: `${pct}%`, background: colorFor ? colorFor(row) : null } })),
      ),
    );
  }
}

/** Panggil fn saat lebar elemen berubah berarti (untuk menggambar ulang grafik). */
export function onWidthChange(node, fn) {
  if (!("ResizeObserver" in window) || !node) return;
  let width = node.clientWidth;
  const handler = debounce(() => {
    if (Math.abs(node.clientWidth - width) < 8) return;
    width = node.clientWidth;
    fn();
  }, 150);
  new ResizeObserver(handler).observe(node);
}

export function onVisible(node, callback, rootMargin = "200px") {
  if (!("IntersectionObserver" in window)) {
    callback();
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      if (entries.some((e) => e.isIntersecting)) {
        io.disconnect();
        callback();
      }
    },
    { rootMargin },
  );
  io.observe(node);
}

export function safeStorage() {
  return {
    get(key) {
      try {
        return window.localStorage.getItem(key);
      } catch {
        return null;
      }
    },
    set(key, value) {
      try {
        window.localStorage.setItem(key, value);
      } catch {
        /* abaikan: storage tidak tersedia */
      }
    },
  };
}
