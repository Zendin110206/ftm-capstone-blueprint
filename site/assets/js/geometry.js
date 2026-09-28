// Mesin geometri tangki: semua dimensi dalam cm, volume dalam liter (1 L = 1000 cm³).
// Rumus yang dipakai:
// - balok            : V = P × L × h
// - silinder tegak   : V = π r² h
// - silinder tidur   : V = L × [r² acos((r−h)/r) − (r−h) √(2rh − h²)]  (luas segmen lingkaran × panjang)
// - kepala elips     : dua kepala semi-elips (kedalaman a) digabung = elipsoid (a, r, r);
//                      volume terisi setinggi h = π a h² (3r − h) / (3r)
//   (a = r untuk kepala hemisferis, a = D/4 untuk kepala elips 2:1)

export const SPEED_OF_SOUND_FIRMWARE = 1 / 29.1; // cm/µs, konstanta firmware v1 (≈ 343,6 m/s)

export const TANK_TYPES = {
  rect: { label: "Balok", long: "Balok (persegi panjang)" },
  vcyl: { label: "Silinder tegak", long: "Silinder tegak" },
  hcyl: { label: "Silinder tidur", long: "Silinder tidur, ujung datar" },
  hcylEll: { label: "Silinder tidur + kepala elips", long: "Silinder tidur dengan kepala elips 2:1" },
};

export const TANK_PRESETS = [
  {
    id: "day-250",
    name: "Tangki harian balok ±250 L",
    note: "Ukuran tipikal tangki harian di pilot (±240–250 L).",
    tank: { type: "rect", length: 100, width: 50, height: 50 },
  },
  {
    id: "rect-540",
    name: "Tangki balok 540 L (contoh uji)",
    note: "Contoh 150×60×60 cm yang dipakai saat uji perangkat awal.",
    tank: { type: "rect", length: 150, width: 60, height: 60 },
  },
  {
    id: "bulk-4772",
    name: "Tangki bulanan silinder tidur ±4.772 L",
    note: "Ø150 × 270 cm menghasilkan ±4.771 L, mendekati kapasitas tangki bulanan di pilot.",
    tank: { type: "hcyl", diameter: 150, length: 270 },
  },
  {
    id: "ell-2700",
    name: "Silinder tidur + kepala elips ±2.700 L",
    note: "Contoh Ø120 × 200 cm (bagian lurus) + dua kepala elips 2:1.",
    tank: { type: "hcylEll", diameter: 120, length: 200, headDepth: 30 },
  },
  {
    id: "vcyl-1178",
    name: "Silinder tegak ±1.178 L",
    note: "Contoh Ø100 × 150 cm.",
    tank: { type: "vcyl", diameter: 100, height: 150 },
  },
];

export function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function segmentArea(r, h) {
  const hh = clamp(h, 0, 2 * r);
  if (hh <= 0) return 0;
  if (hh >= 2 * r) return Math.PI * r * r;
  const d = r - hh;
  return r * r * Math.acos(d / r) - d * Math.sqrt(Math.max(0, 2 * r * hh - hh * hh));
}

/** Tinggi cairan maksimum (cm) = tinggi dalam tangki. */
export function maxHeight(tank) {
  switch (tank.type) {
    case "rect":
    case "vcyl":
      return tank.height;
    case "hcyl":
    case "hcylEll":
      return tank.diameter;
    default:
      return 0;
  }
}

/** Volume (liter) pada tinggi cairan h (cm) dari dasar dalam tangki. */
export function volumeAt(tank, h) {
  const H = maxHeight(tank);
  const hh = clamp(h, 0, H);
  switch (tank.type) {
    case "rect":
      return (tank.length * tank.width * hh) / 1000;
    case "vcyl": {
      const r = tank.diameter / 2;
      return (Math.PI * r * r * hh) / 1000;
    }
    case "hcyl":
      return (segmentArea(tank.diameter / 2, hh) * tank.length) / 1000;
    case "hcylEll": {
      const r = tank.diameter / 2;
      const a = tank.headDepth ?? tank.diameter / 4;
      const shell = segmentArea(r, hh) * tank.length;
      const heads = (Math.PI * a * hh * hh * (3 * r - hh)) / (3 * r);
      return (shell + heads) / 1000;
    }
    default:
      return 0;
  }
}

export function capacity(tank) {
  return volumeAt(tank, maxHeight(tank));
}

/** Sensitivitas: berapa liter per 1 cm perubahan tinggi pada ketinggian h. */
export function litersPerCm(tank, h) {
  const H = maxHeight(tank);
  const e = Math.min(0.25, H / 400);
  const a = clamp(h - e, 0, H);
  const b = clamp(h + e, 0, H);
  if (b - a <= 0) return 0;
  return (volumeAt(tank, b) - volumeAt(tank, a)) / (b - a);
}

/** Kebalikan: tinggi (cm) untuk volume tertentu (bisection). */
export function heightForVolume(tank, liters) {
  const H = maxHeight(tank);
  const target = clamp(liters, 0, capacity(tank));
  let lo = 0;
  let hi = H;
  for (let i = 0; i < 60; i += 1) {
    const mid = (lo + hi) / 2;
    if (volumeAt(tank, mid) < target) lo = mid;
    else hi = mid;
  }
  return (lo + hi) / 2;
}

/** Kecepatan suara di udara (m/s) sebagai fungsi suhu (°C). */
export function speedOfSound(tempC) {
  return 331.3 + 0.606 * tempC;
}

/** Suhu yang "diasumsikan" konstanta firmware 29,1 µs/cm. */
export function firmwareAssumedTemp() {
  const c = SPEED_OF_SOUND_FIRMWARE * 1e4; // cm/µs → m/s
  return (c - 331.3) / 0.606;
}

/**
 * Simulasi satu pembacaan sensor ultrasonik yang dipasang di atas tangki.
 * mountHeight: jarak sensor ke dasar dalam tangki (cm).
 * Mengembalikan tinggi cairan yang "dihitung" sistem.
 */
export function measuredHeight({
  trueHeight,
  mountHeight,
  airTempC = 20,
  assumedTempC = firmwareAssumedTemp(),
  mountErrorCm = 0,
  tiltDeg = 0,
}) {
  const trueGap = Math.max(0, mountHeight - trueHeight);
  const slant = trueGap / Math.cos((tiltDeg * Math.PI) / 180);
  const gapReported = slant * (speedOfSound(assumedTempC) / speedOfSound(airTempC));
  return mountHeight + mountErrorCm - gapReported;
}

/** Faktor koreksi volume sederhana ke suhu acuan 15 °C (β ≈ 0,00083–0,00095 /°C untuk solar). */
export function volumeAt15C(litersObserved, fuelTempC, beta = 0.00085) {
  return litersObserved * (1 - beta * (fuelTempC - 15));
}

/** Ringkasan teks dimensi. */
export function describeTank(tank) {
  switch (tank.type) {
    case "rect":
      return `${tank.length} × ${tank.width} × ${tank.height} cm`;
    case "vcyl":
      return `Ø${tank.diameter} × tinggi ${tank.height} cm`;
    case "hcyl":
      return `Ø${tank.diameter} × panjang ${tank.length} cm`;
    case "hcylEll":
      return `Ø${tank.diameter} × ${tank.length} cm + kepala ${tank.headDepth ?? tank.diameter / 4} cm`;
    default:
      return "";
  }
}
