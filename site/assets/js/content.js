// =============================================================================
// Semua isi (teks, alasan, sumber, perbandingan) untuk Cetak Biru FTM 2.0.
// Aturan isi: bahasa Indonesia sederhana, istilah dijelaskan langsung di tempat,
// netral, tanpa kredensial / IP internal / data pribadi / nama staf lapangan.
// =============================================================================

export const META = {
  version: "1.0",
  updated: "28 September 2026",
  repoCommit: "4bda023 (2 Agustus 2026)",
};

// ------------------------------------------------------------------ helpers --
const p = (t) => `<p>${t}</p>`;
const ul = (items) => `<ul>${items.map((i) => `<li>${i}</li>`).join("")}</ul>`;
const ol = (items) => `<ol>${items.map((i) => `<li>${i}</li>`).join("")}</ol>`;
const sec = (title, body) => `<h3>${title}</h3>${body}`;
const table = (head, rows) =>
  `<div class="table-wrap"><table class="table-compact"><thead><tr>${head
    .map((x) => `<th>${x}</th>`)
    .join("")}</tr></thead><tbody>${rows
    .map((r) => `<tr>${r.map((c) => `<td>${c}</td>`).join("")}</tr>`)
    .join("")}</tbody></table></div>`;
const xref = (id, label) => `<button type="button" class="xref" data-item="${id}">${label}</button>`;
const GH = "https://github.com/Zendin110206/solar-tank-monitoring-system/blob/main/";

// ------------------------------------------------------------------ sumber --
export const REFS = {
  "R-REPO": {
    t: "Repositori FTM v1 — Zendin110206/solar-tank-monitoring-system (commit 4bda023, 2 Agustus 2026)",
    k: "Repo",
    u: "https://github.com/Zendin110206/solar-tank-monitoring-system",
  },
  "R-FW": {
    t: "Firmware v1: firmware/templates/solartank-esp8266-ultrasonic-v1/solar_tank_firmware.ino",
    k: "Repo",
    u: `${GH}firmware/templates/solartank-esp8266-ultrasonic-v1/solar_tank_firmware.ino`,
  },
  "R-NORM": {
    t: "src/features/monitoring/lib/normalize-reading.ts (fallback jarak 0 cm, baris 109–111)",
    k: "Repo",
    u: `${GH}src/features/monitoring/lib/normalize-reading.ts`,
  },
  "R-DEVREQ": {
    t: "src/features/monitoring/lib/device-request.ts (rumus konsumsi, baris 286–313)",
    k: "Repo",
    u: `${GH}src/features/monitoring/lib/device-request.ts`,
  },
  "R-HELP": {
    t: "src/features/helpdesk/components/helpdesk-widget.tsx (polling 5 detik, baris 32 & 118)",
    k: "Repo",
    u: `${GH}src/features/helpdesk/components/helpdesk-widget.tsx`,
  },
  "R-REFRESH": {
    t: "src/features/monitoring/components/live-refresh-control.tsx (refresh 20 detik, berhenti saat tab tidak aktif)",
    k: "Repo",
    u: `${GH}src/features/monitoring/components/live-refresh-control.tsx`,
  },
  "R-STATUS": {
    t: "src/features/monitoring/lib/status.ts (ambang runtime <13 / <16 / ≤24 jam)",
    k: "Repo",
    u: `${GH}src/features/monitoring/lib/status.ts`,
  },
  "R-NEXTCFG": {
    t: "next.config.ts (header keamanan dasar, belum ada CSP/HSTS)",
    k: "Repo",
    u: `${GH}next.config.ts`,
  },
  "R-TRUTH": {
    t: "docs/current-operational-truth.md (status operasional terverifikasi)",
    k: "Repo",
    u: `${GH}docs/current-operational-truth.md`,
  },
  "R-PROFILE": {
    t: "README profil GitHub Zendin110206 (snapshot pilot 20 September 2026)",
    k: "Repo",
    u: "https://github.com/Zendin110206",
  },
  "R-CHAT": {
    t: "Arsip chat grup proyek FTM (Telegram), 26 Juni–17 September 2026 — arsip internal, tidak dipublikasikan",
    k: "Internal",
  },
  "R-CSV": {
    t: "Ekspor CSV reading tangki uji (7 Juli 2026), 5.314 baris — arsip internal",
    k: "Internal",
  },
  "R-KP": {
    t: "Laporan Kerja Praktik final (disetujui), Agustus 2026 — dokumen akademik internal",
    k: "Internal",
  },
  "R-SIDANG": {
    t: "Materi sidang Kerja Praktik (10 Agustus 2026) — dokumen internal",
    k: "Internal",
  },
  "R-DOSEN": {
    t: "Arahan dosen pembimbing tentang fokus TA (15 September 2026) — komunikasi internal",
    k: "Internal",
  },
  "R-AIDOCS": {
    t: "Tiga dokumen konsep berbantuan AI: Concept Brief (11 Sep), Arsitektur Telemetri Adaptif & Event-Aware Telemetry (14 Sep 2026)",
    k: "Internal",
  },
  "R-FOTO": {
    t: "Dokumentasi foto & video kegiatan KP (ruang catu daya, genset, tangki, RTU)",
    k: "Internal",
  },
  "R-OBS": {
    t: "Catatan observasi hari ke-1/ke-2 & materi catu daya (PLN → ATS → MDP → SDP → rectifier → baterai)",
    k: "Internal",
  },
  "L-OPI": {
    t: "K. J. Opieliński & T. Świetlik (2025). Application of the Akaike Information Criterion to Ultrasonic Measurement of Liquid Volume in a Cylindrical Tank. Sensors 25(23):7191. doi:10.3390/s25237191",
    k: "Paper",
    u: "https://pmc.ncbi.nlm.nih.gov/articles/PMC12694024/",
  },
  "L-KUMAR": {
    t: "S. Kumar et al. (2026). An integrated IoT-enabled fuel monitoring system: design, implementation and analysis. Sensor Review. doi:10.1108/SR-12-2025-1058",
    k: "Paper",
    u: "https://doi.org/10.1108/SR-12-2025-1058",
  },
  "L-SUGESTI": {
    t: "E. S. Sugesti et al. (2024). Automated Monitoring System for Rainwater Harvesting Tank at Telkom University. Journal of Sustainability Perspectives 4(2):157–169. doi:10.14710/jsp.2024.24800",
    k: "Paper",
    u: "https://ejournal2.undip.ac.id/index.php/jsp/article/view/24800",
  },
  "L-SOD": {
    t: "M. Miśkowicz (2006). Send-On-Delta Concept: An Event-Based Data Reporting Strategy. Sensors 6(1):49–63. doi:10.3390/s6010049",
    k: "Paper",
    u: "https://pmc.ncbi.nlm.nih.gov/articles/PMC3865911/",
  },
  "L-TLSENERGY": {
    t: "P. N. Bideh, J. Sönnerup & M. Hell (2020). Energy consumption for securing lightweight IoT protocols. Proc. IoT 2020 (ACM). doi:10.1145/3410992.3411008",
    k: "Paper",
    u: "https://portal.research.lu.se/en/publications/energy-consumption-for-securing-lightweight-iot-protocols/",
  },
  "L-LPWAN": {
    t: "R. K. Singh et al. (2020). Energy Consumption Analysis of LPWAN Technologies and Lifetime Estimation for IoT Application. Sensors 20(17):4794. doi:10.3390/s20174794",
    k: "Paper",
    u: "https://pmc.ncbi.nlm.nih.gov/articles/PMC7506725/",
  },
  "L-KALMAN": {
    t: "R. E. Kalman (1960). A New Approach to Linear Filtering and Prediction Problems. Journal of Basic Engineering 82(1):35–45.",
    k: "Paper",
  },
  "L-CUSUM": {
    t: "E. S. Page (1954). Continuous Inspection Schemes. Biometrika 41(1/2):100–115. (dasar metode CUSUM untuk deteksi perubahan)",
    k: "Paper",
  },
  "L-ASTROM": {
    t: "K. J. Åström & B. Bernhardsson (2002). Comparison of Riemann and Lebesgue sampling for first order stochastic systems. Proc. 41st IEEE CDC.",
    k: "Paper",
  },
  "L-KINSLER": {
    t: "L. E. Kinsler et al. (2000). Fundamentals of Acoustics, 4th ed. Wiley. (kecepatan suara di udara ≈ 331,3 + 0,606·T m/s)",
    k: "Buku",
  },
  "L-THEFT": {
    t: "IoT Enabled Fuel Level Monitoring and Automatic Fuel Theft Detection System (IEEE Xplore, doc. 9984515)",
    k: "Paper",
    u: "https://ieeexplore.ieee.org/document/9984515/",
  },
  "L-SMARTFUEL": {
    t: "Smart Fuel Monitoring System For Diesel Generator (IEEE Xplore, doc. 10717583)",
    k: "Paper",
    u: "https://ieeexplore.ieee.org/document/10717583/",
  },
  "S-ISO12917": {
    t: "ISO 12917-1 — Petroleum and liquid petroleum products: Calibration of horizontal cylindrical tanks, Part 1: Manual methods",
    k: "Standar",
  },
  "S-ASTM1250": {
    t: "ASTM D1250 / API MPMS Chapter 11.1 — faktor koreksi volume minyak terhadap suhu dan tekanan",
    k: "Standar",
    u: "https://store.astm.org/d1250-19.html",
  },
  "S-NIST82": {
    t: "NIST SP 800-82 Rev. 3 (2023). Guide to Operational Technology (OT) Security",
    k: "Standar",
    u: "https://csrc.nist.gov/pubs/sp/800/82/r3/final",
  },
  "S-MODBUS": {
    t: "Modbus Organization. MODBUS Application Protocol Specification V1.1b3",
    k: "Standar",
    u: "https://modbus.org/docs/Modbus_Application_Protocol_V1_1b3.pdf",
  },
  "S-MQTT": {
    t: "OASIS. MQTT Version 5.0 (2019)",
    k: "Standar",
    u: "https://docs.oasis-open.org/mqtt/mqtt/v5.0/mqtt-v5.0.html",
  },
  "S-COAP": { t: "RFC 7252 — The Constrained Application Protocol (CoAP)", k: "Standar", u: "https://www.rfc-editor.org/rfc/rfc7252" },
  "S-CBOR": { t: "RFC 8949 — Concise Binary Object Representation (CBOR)", k: "Standar", u: "https://www.rfc-editor.org/rfc/rfc8949" },
  "S-TLS13": { t: "RFC 8446 — The Transport Layer Security (TLS) Protocol Version 1.3", k: "Standar", u: "https://www.rfc-editor.org/rfc/rfc8446" },
  "D-ESP8266LP": {
    t: "Espressif. ESP8266 Low-Power Solutions (modem-sleep ±15 mA, light-sleep ±0,9 mA, deep-sleep ±20 µA)",
    k: "Dokumentasi",
    u: "https://www.espressif.com/sites/default/files/documentation/9b-esp8266-low_power_solutions__en.pdf",
  },
  "D-ESP32C3": {
    t: "Espressif. ESP32-C3 Series Datasheet (deep-sleep ±5 µA pada chip)",
    k: "Dokumentasi",
    u: "https://www.espressif.com/sites/default/files/documentation/esp32-c3_datasheet_en.pdf",
  },
  "D-A02": {
    t: "DFRobot. A02YYUW Waterproof Ultrasonic Sensor (3–450 cm, blind zone 3 cm, IP67, UART)",
    k: "Dokumentasi",
    u: "https://wiki.dfrobot.com/_A02YYUW_Waterproof_Ultrasonic_Sensor_SKU_SEN0311",
  },
  "D-A121": {
    t: "Acconeer. XM125 / A121 60 GHz pulsed coherent radar (aplikasi referensi tank level)",
    k: "Dokumentasi",
    u: "https://developer.acconeer.com/home/a121-docs-software/xm125-xe125/",
  },
  "D-EWT": {
    t: "ESPHome. ESP Web Tools — instal firmware ESP8266/ESP32 langsung dari browser (Web Serial)",
    k: "Dokumentasi",
    u: "https://esphome.github.io/esp-web-tools/",
  },
  "D-IMPROV": { t: "Improv Wi-Fi — standar terbuka untuk mengatur Wi-Fi perangkat lewat serial/BLE", k: "Dokumentasi", u: "https://www.improv-wifi.com/" },
  "D-TGB2B": {
    t: "Telegram. Bot-to-bot communication (opt-in; hanya mention/reply antar bot)",
    k: "Dokumentasi",
    u: "https://core.telegram.org/api/bots/bot-to-bot",
  },
  "D-VERCELPRICE": {
    t: "Vercel. Fluid compute pricing — Active CPU, Provisioned Memory, Invocations",
    k: "Dokumentasi",
    u: "https://vercel.com/docs/functions/usage-and-pricing",
  },
  "D-VERCELFAIR": {
    t: "Vercel. Fair use guidelines — jatah Hobby: 1 jt invocations, 4 jam Active CPU, 360 GB-jam memori per bulan",
    k: "Dokumentasi",
    u: "https://vercel.com/docs/limits/fair-use-guidelines",
  },
  "D-VERCELBUN": { t: "Vercel changelog — Bun runtime tersedia di Vercel Functions", k: "Dokumentasi", u: "https://vercel.com/changelog/bun-1-4-is-now-available-in-vercel-functions" },
  "D-VERCELWS": { t: "Vercel changelog — dukungan WebSocket (public beta)", k: "Dokumentasi", u: "https://vercel.com/changelog/websocket-support-is-now-in-public-beta" },
  "D-AIVEN": {
    t: "Aiven. MySQL free tier (1 CPU, 1 GB RAM, 1 GB storage, satu node)",
    k: "Dokumentasi",
    u: "https://aiven.io/docs/products/mysql/concepts/mysql-free-tier",
  },
  "D-ANTARES": {
    t: "Telkom Indonesia. Antares (platform IoT) & Telkom LoRaWAN",
    k: "Artikel",
    u: "https://www.telkom.co.id/sites/news-resources/en_US/news/antares-and-everynet-collaboration-strengthens-indonesia's-iot-ecosystem-1775",
  },
  "D-HOMER": {
    t: "HOMER Energy. Generator fuel curve: F = F0·Y_rated + F1·P_gen",
    k: "Dokumentasi",
    u: "https://homerenergy.com/products/grid/docs/latest/generator_fuel_curve_intercept_coefficient.html",
  },
  "D-NEUTRIUM": {
    t: "Neutrium. Volume and wetted area of partially filled horizontal vessels (kepala hemisferis, elips, torisferis)",
    k: "Artikel",
    u: "https://neutrium.net/articles/equipment/volume-and-wetted-area-of-partially-filled-horizontal-vessels/",
  },
  "D-NODEMCU": {
    t: "Forum Arduino — modifikasi arus rendah NodeMCU (regulator AMS1117 ±5 mA, chip USB >10 mA saat tidur) — sumber komunitas",
    k: "Artikel",
    u: "https://forum.arduino.cc/t/nodemcu-12e-and-esp8266-low-current-mods-to-use-lipo-battery/628437",
  },
  "D-FUELTEK": {
    t: "Fueltek — Equations of diesel (koefisien muai volume solar ≈ 9,5 × 10⁻⁴ per °C) — sumber industri",
    k: "Artikel",
    u: "https://www.fueltek.co.uk/equations-of-diesel-you-must-know/",
  },
  "D-GHG": {
    t: "UK Government — Greenhouse gas reporting: conversion factors (faktor emisi bahan bakar diesel)",
    k: "Dokumentasi",
    u: "https://www.gov.uk/government/collections/government-conversion-factors-for-company-reporting",
  },
  "D-HONO": { t: "Hono — web framework kecil yang berjalan di Node, Bun, Deno, Cloudflare, Vercel", k: "Dokumentasi", u: "https://hono.dev" },
  "D-DRIZZLE": { t: "Drizzle ORM — ORM TypeScript untuk PostgreSQL/MySQL/SQLite", k: "Dokumentasi", u: "https://orm.drizzle.team" },
  "D-TIMESCALE": { t: "TimescaleDB — ekstensi time-series PostgreSQL (hypertable, continuous aggregate, retensi)", k: "Dokumentasi", u: "https://docs.timescale.com" },
  "D-NEXT": { t: "Next.js — framework React", k: "Dokumentasi", u: "https://nextjs.org" },
  "D-SVELTE": { t: "Svelte / SvelteKit", k: "Dokumentasi", u: "https://svelte.dev" },
  "D-BUN": { t: "Bun — runtime + package manager + test runner JavaScript", k: "Dokumentasi", u: "https://bun.sh" },
  "D-ELYSIA": { t: "ElysiaJS — web framework yang dioptimalkan untuk Bun", k: "Dokumentasi", u: "https://elysiajs.com" },
  "D-NEST": { t: "NestJS — framework Node modular (dipakai CoE BHT)", k: "Dokumentasi", u: "https://nestjs.com" },
  "D-BETTERAUTH": { t: "Better Auth — library autentikasi TypeScript (dipakai CoE BHT)", k: "Dokumentasi", u: "https://www.better-auth.com" },
  "D-BIOME": { t: "Biome — formatter + linter satu alat", k: "Dokumentasi", u: "https://biomejs.dev" },
  "D-PIO": { t: "PlatformIO — build system firmware embedded (bisa di CI)", k: "Dokumentasi", u: "https://platformio.org" },
  "D-ARCHIFY": { t: "tt-a1i/archify — agent skill pembuat diagram arsitektur HTML interaktif", k: "Repo", u: "https://github.com/tt-a1i/archify" },
  "D-PZN": { t: "Programmer Zaman Now — Tech Stack 2026 (YouTube)", k: "Video", u: "https://www.youtube.com/watch?v=H9n2eYPX4wg" },
  "D-BHT": { t: "Pengalaman CoE BHT (repo lokal): NestJS + Next.js terpisah, Drizzle, PostgreSQL, Better Auth, Infisical, Podman + Caddy", k: "Internal" },
};

// ----------------------------------------------------------- 1. masalah --
export const PROBLEMS = [
  {
    id: "p-manual",
    icon: "ruler",
    title: "Level solar dicek manual",
    short: "Petugas mendatangi tangki, membuka tutup, mengukur dengan tongkat ukur (dipstick), lalu mencatat.",
    detail:
      sec(
        "Apa yang terjadi",
        p(
          "Sebelum FTM, cara utama mengetahui sisa solar adalah pemeriksaan langsung oleh security atau teknisi: datang ke lokasi tangki, membaca indikator atau mencelupkan tongkat ukur (<i>dipstick</i>, batang bergaris untuk membaca tinggi cairan), lalu mencatat di buku atau laporan.",
        ),
      ) +
      sec(
        "Kenapa ini masalah",
        ul([
          "Makan waktu dan tidak <i>real-time</i> (tidak langsung terlihat saat itu juga dari jauh).",
          "Hasilnya subjektif: membaca garis tongkat ukur, salah tulis, atau lupa mencatat.",
          "Saat pemadaman panjang (momen paling kritis), petugas justru paling sibuk.",
          "Tidak ada data yang bisa dianalisis: berapa liter per pemadaman, apakah ada kehilangan tidak wajar, kapan terakhir diisi.",
        ]),
      ) +
      sec(
        "Yang diubah FTM",
        p(
          "Sensor ultrasonik membaca jarak ke permukaan solar, mikrokontroler mengubahnya jadi tinggi cairan lalu liter, dan hasilnya tampil di dashboard. Pemeriksaan fisik tetap perlu (kebocoran, air di dasar tangki, kebersihan), tetapi <b>pengukuran rutin</b> tidak lagi bergantung pada orang.",
        ),
      ),
    refs: ["R-KP", "R-OBS", "R-FOTO"],
  },
  {
    id: "p-safety",
    icon: "alert",
    title: "Sebagian tangki berbahaya dijangkau",
    short: "Ada tangki yang tinggi, menggantung, atau harus dipanjat lewat tangga. Permukaannya bisa licin terkena solar.",
    detail:
      sec(
        "Apa yang terjadi",
        p(
          "Posisi tangki di tiap STO berbeda: ada yang di lantai, ada yang tinggi atau menggantung sehingga petugas harus memanjat tangga untuk melihat isi. Tetesan solar membuat pijakan licin.",
        ),
      ) +
      sec(
        "Kenapa ini penting",
        p(
          "Risiko jatuh dari ketinggian termasuk risiko kerja yang serius. Setiap pemeriksaan rutin yang bisa diganti sensor berarti satu paparan risiko yang hilang.",
        ),
      ) +
      sec(
        "Catatan jujur",
        p(
          "Pemasangan sensor sendiri juga kerja di ketinggian, tetapi <b>hanya sekali</b> dan bisa dilakukan dengan prosedur yang benar (APD, izin kerja, pendamping). Perawatan sensor tetap perlu dijadwalkan.",
        ),
      ),
    refs: ["R-KP", "R-FOTO"],
  },
  {
    id: "p-workload",
    icon: "user",
    title: "Tugas tambahan tanpa kompensasi",
    short: "Tugas utama security adalah pengamanan. Mengukur solar jadi pekerjaan tambahan yang tidak menambah gaji.",
    detail:
      sec(
        "Apa yang terjadi",
        p(
          "Pengecekan tangki dibebankan ke security sebagai tugas tambahan. Pekerjaan ini tidak menambah kompensasi, padahal memakan waktu dan berisiko.",
        ),
      ) +
      sec(
        "Dampak",
        ul([
          "Motivasi dan konsistensi pencatatan menurun, sehingga data manual makin tidak bisa diandalkan.",
          "Fokus pengamanan bisa terganggu.",
        ]),
      ) +
      sec(
        "Arah solusi",
        p(
          "Otomasi menggeser peran manusia dari <b>mengukur</b> menjadi <b>menindaklanjuti</b>. Petugas cukup bertindak saat sistem memberi tahu sesuatu yang penting: level rendah, penurunan tidak wajar, atau sensor mati.",
        ),
      ),
    refs: ["R-KP"],
  },
  {
    id: "p-nohistory",
    icon: "chart",
    title: "Tidak ada histori yang bisa dianalisis",
    short: "Tanpa data berkala, pertanyaan seperti “berapa liter habis per pemadaman?” tidak bisa dijawab.",
    detail:
      sec(
        "Pertanyaan yang tidak bisa dijawab tanpa data",
        ul([
          "Berapa liter solar terpakai per jam genset menyala di STO ini?",
          "Apakah ada penurunan saat genset <b>tidak</b> menyala (indikasi bocor atau pencurian)?",
          "Kapan terakhir diisi, berapa liter, dan apakah sesuai nota pengiriman?",
          "Berapa kali PLN padam bulan ini dan berapa lama?",
        ]),
      ) +
      sec(
        "Kenapa penting untuk jangka panjang",
        p(
          "Data historis mendukung perencanaan anggaran BBM, audit, dan evaluasi kondisi genset. Nilai ini dibahas di " +
            xref("d-longterm", "Nilai jangka panjang untuk Telkom") +
            ".",
        ),
      ),
    refs: ["R-KP", "L-KUMAR"],
  },
  {
    id: "p-visibility",
    icon: "grid",
    title: "Tidak bisa melihat banyak STO sekaligus",
    short: "Target awal 5 STO, akhirnya 29 STO se-District. Laporan manual tersebar dan tidak serentak.",
    detail:
      sec(
        "Konteks",
        p(
          "Arah dari pembimbing lapangan: tahap awal 5 STO di wilayah Pasuruan, target akhir 29 STO di seluruh District Sidoarjo, lalu bila memungkinkan diintegrasikan dengan sistem RTU yang sudah ada.",
        ),
      ) +
      sec(
        "Kenapa manual tidak bisa diskalakan",
        p(
          "Semakin banyak lokasi, semakin mahal koordinasi manual. Satu dashboard dengan status per lokasi (hijau/kuning/merah, online/offline) memungkinkan satu orang memantau puluhan tangki.",
        ),
      ),
    refs: ["R-CHAT", "R-REPO"],
  },
  {
    id: "p-refill",
    icon: "truck",
    title: "Pengisian ulang tidak berbasis data",
    short: "Di lapangan, tangki sering sudah diisi lagi meski status masih hijau/kuning. Aman, tetapi logistiknya tidak terencana.",
    detail:
      sec(
        "Realitas lapangan",
        p(
          "Petugas berpengalaman biasanya mengisi ulang sebelum level kritis, kadang saat status masih hijau atau kuning. Ini <b>bukan kesalahan</b>: prinsipnya ketersediaan 99,99% lebih penting daripada hemat pengiriman.",
        ),
      ) +
      sec(
        "Di mana data membantu",
        ul([
          "Menjadwalkan pengisian beberapa STO sekaligus dalam satu rute.",
          "Mencocokkan liter yang dikirim dengan kenaikan volume yang terukur (rekonsiliasi).",
          "Menyiapkan cadangan saat ada peringatan cuaca atau pemadaman terjadwal.",
        ]),
      ) +
      sec(
        "Konsekuensi untuk desain",
        p(
          "Karena petugas sudah tahu kapan harus mengisi, fitur <b>prediksi kapan isi ulang</b> bernilai rendah. Yang lebih bernilai adalah deteksi kejadian (refill, penurunan tidak wajar) dan jejak audit. Lihat " +
            xref("d-ml", "Perlu machine learning?") +
            ".",
        ),
      ),
    refs: ["R-KP", "R-CHAT"],
  },
  {
    id: "p-events",
    icon: "bolt",
    title: "Solar hanya berubah saat kejadian tertentu",
    short: "Genset menyala saat PLN padam atau uji rutin. Di luar itu, level hampir datar. Data 15–20 detik sekali kebanyakan berulang.",
    detail:
      sec(
        "Alur daya di STO",
        p(
          "Normalnya perangkat dicatu PLN lewat <b>ATS</b> (Automatic Transfer Switch, saklar otomatis pemindah sumber listrik), panel <b>MDP/SDP</b> (panel distribusi utama/cabang), lalu <b>rectifier</b> (pengubah AC ke DC −48 V) yang juga mengisi <b>baterai</b>. Saat PLN padam, baterai langsung menanggung beban. Genset (<b>DEG</b>, diesel engine generator) menyala dalam hitungan detik, ATS memindahkan sumber, dan barulah solar terpakai.",
        ),
      ) +
      sec(
        "Kapan level solar berubah",
        ul([
          "<b>Turun</b>: genset menyala (pemadaman, uji genset/ATS rutin), atau ada kebocoran/pencurian.",
          "<b>Naik</b>: pengisian dari truk, atau transfer dari tangki bulanan ke tangki harian lewat pompa.",
          "<b>Datar</b>: hampir sepanjang waktu.",
        ]),
      ) +
      sec(
        "Implikasi",
        p(
          "Inilah dasar pilar 2 TA: kirim <b>jarang</b> saat datar, kirim <b>cepat</b> saat ada kejadian. Coba simulasinya di " +
            xref("c-statemachine", "mesin status telemetri adaptif") +
            ".",
        ),
      ),
    refs: ["R-OBS", "R-CHAT", "R-FOTO"],
  },
  {
    id: "p-history",
    icon: "history",
    title: "Upaya sebelumnya pernah berhenti",
    short: "2020 berhenti karena biaya platform berbayar. 2024–25 terhambat integrasi RTU dan keamanan intranet. 2026 dibangun ulang.",
    detail:
      sec(
        "Riwayat singkat",
        table(
          ["Periode", "Pendekatan", "Kenapa berhenti / terhambat"],
          [
            ["±2020", "ESP8266 + ultrasonik, platform IoT berbayar", "Biaya langganan bulanan"],
            [
              "2024–2025",
              "Sistem web (FastAPI, MySQL, HTML), backup ke Drive, percobaan mode RTU via Modbus",
              "Frame Modbus menggabung semua perangkat; jalur publik → intranet dinilai berisiko",
            ],
            ["Jun 2026 →", "FTM v1: Next.js + MySQL cloud + Telegram, dibangun ulang dalam ±2–3 minggu", "Masih berjalan; kuota gratis mulai menipis (Agustus)"],
          ],
        ),
      ) +
      sec(
        "Pelajaran",
        p(
          "Keberlanjutan (biaya, kepemilikan akun, keamanan, kemudahan dirawat) sama pentingnya dengan teknologinya. TA harus menjawab ini secara terukur, bukan hanya menambah fitur.",
        ),
      ),
    refs: ["R-CHAT", "R-KP"],
  },
];

// ------------------------------------------------------ 2. fitur FTM v1 --
export const V1_FEATURES = [
  {
    id: "v1-ingest",
    title: "API ingest berkunci per perangkat",
    short: "Perangkat mengirim HTTPS POST ke /api/ingest dengan identitas dan kunci. Kunci disimpan dalam bentuk hash.",
    detail:
      p(
        "Setiap perangkat punya <code>X-Device-Id</code> dan <code>X-Api-Key</code>. Server memvalidasi, menormalkan data (menyamakan format), lalu menyimpan. Ada <i>rate limit</i> (pembatas laju permintaan) 120 permintaan per 60 detik.",
      ) + p("Keterbatasan: TLS di perangkat belum memverifikasi sertifikat. Lihat " + xref("f-tls", "temuan TLS") + "."),
    refs: ["R-REPO", "R-FW"],
  },
  {
    id: "v1-rollup",
    title: "Snapshot terbaru + rollup 5 menit",
    short: "Dashboard membaca data terakhir per perangkat. Histori diringkas per 5 menit (rata-rata, min, maks, jumlah).",
    detail:
      p(
        "Ide penghematannya: data mentah ±20 detik diringkas menjadi satu baris per 5 menit. Pada snapshot 2 Agustus 2026: 239.945 sampel dalam 16.195 baris rollup, atau rata-rata 14,82 sampel per baris. Di chat disebut hemat ±60% storage per bulan.",
      ) +
      p(
        "Catatan: rollup menghemat <b>storage</b>, tetapi tidak mengurangi jumlah <b>request</b> dari perangkat. Bedanya dijelaskan di " +
          xref("i-servergate", "usulan blok di server") +
          ".",
      ),
    refs: ["R-REPO", "R-TRUTH", "R-CHAT"],
  },
  {
    id: "v1-provision",
    title: "Pengajuan → persetujuan → paket firmware",
    short: "User mengajukan perangkat, admin menyetujui, sistem membuat kunci + ZIP firmware terenkripsi yang diunduh lewat tautan email.",
    detail:
      p(
        "Perangkat baru aktif setelah <i>ping</i> valid pertama. Ini mencegah perangkat asing langsung masuk registry. Kapasitas dihitung dari dimensi, konsumsi dari beban/kVA/cos φ.",
      ) + p("Kelemahan: tetap harus compile di Arduino IDE. Usulan perbaikannya ada di " + xref("d-installer", "instalasi tanpa compile") + "."),
    refs: ["R-REPO", "R-CHAT"],
  },
  {
    id: "v1-telegram",
    title: "Bot Telegram + helpdesk",
    short: "Notifikasi admin per topik (akun baru, perangkat baru, live chat), perintah /help /status /dashboard, balas chat lewat /reply.",
    detail: p("Bot sudah live sejak 13 Juli 2026. Perintah diuji agar tidak membocorkan data sensitif. Notifikasi level/anomali tangki belum menjadi fitur inti."),
    refs: ["R-CHAT", "R-REPO"],
  },
  {
    id: "v1-auth",
    title: "Akun, peran, OTP, CAPTCHA",
    short: "Registrasi, verifikasi email, reset password, admin dengan OTP, Cloudflare Turnstile, Argon2id.",
    detail: p("Peran masih user/admin. Untuk skala nasional perlu peran per wilayah (misalnya viewer, operator, admin area)."),
    refs: ["R-REPO"],
  },
  {
    id: "v1-ops",
    title: "Operasional: CSV, backup, health",
    short: "Ekspor CSV per tangki, skrip backup MySQL, /api/health dan /api/ready, reset reading per STO.",
    detail: p("Backup berupa file teks biasa (tidak terenkripsi). Perlu enkripsi dan uji restore berkala."),
    refs: ["R-REPO", "R-CHAT"],
  },
  {
    id: "v1-region",
    title: "Taksonomi Regional/Wilayah/Area/STO",
    short: "Filter TREG 1–7, wilayah (misalnya TIF 3), area, STO. Disiapkan untuk skala nasional.",
    detail: p("Ditambahkan 14 Juli 2026. Fondasi ini dipertahankan di FTM 2.0."),
    refs: ["R-CHAT", "R-REPO"],
  },
  {
    id: "v1-quality",
    title: "CI + 160 tes otomatis",
    short: "Typecheck, lint, 160 tes, dan build produksi lolos (16 Juli 2026). Branch main dilindungi PR.",
    detail: p("Modal yang baik untuk rebuild: logika domain (volume, status, normalisasi) sudah punya tes yang bisa dijadikan acuan perilaku."),
    refs: ["R-REPO", "R-PROFILE"],
  },
];

// ------------------------------------------------------------ timeline --
export const TIMELINE = [
  { id: "tl-0623", date: "23 Jun 2026", title: "FTM v1 mulai dibangun", text: "Commit pertama; arah: web + database cloud gratis dulu.", key: false, refs: ["R-REPO"] },
  { id: "tl-0628", date: "28 Jun", title: "Target skala ditetapkan", text: "5 STO dulu → 29 STO se-District → integrasi RTU bila memungkinkan.", key: true, refs: ["R-CHAT"] },
  { id: "tl-0701", date: "1 Jul", title: "Sensor nyata pertama kirim data", text: "Data tidak lagi dummy; muncul isu offset leher tangki.", key: false, refs: ["R-CHAT"] },
  { id: "tl-0706", date: "5–6 Jul", title: "Provisioning ujung-ke-ujung lolos", text: "Ajukan → setujui → email firmware → compile → monitoring.", key: false, refs: ["R-CHAT"] },
  { id: "tl-0707", date: "7–8 Jul", title: "Telegram & rollup 5 menit", text: "Topik notifikasi + helpdesk; storage hemat ±60%.", key: false, refs: ["R-CHAT"] },
  { id: "tl-0709", date: "9–10 Jul", title: "Sensor aktif di lokasi", text: "Sensor pertama (9 Jul) dan kedua (10 Jul) terpasang.", key: true, refs: ["R-CHAT"] },
  { id: "tl-0714", date: "12–16 Jul", title: "Rebrand FTM & siap nasional", text: "Nama FTM, bot live, kolom Regional/Wilayah, 160 tes lolos.", key: false, refs: ["R-CHAT", "R-PROFILE"] },
  { id: "tl-0723", date: "23 Jul", title: "STO ketiga online", text: "Dua alat sempat rusak; komponen regulator diambil dari alat rusak.", key: false, refs: ["R-CHAT"] },
  { id: "tl-0802", date: "2 Agu", title: "Snapshot terverifikasi", text: "6 lokasi · 6 perangkat · 247.639 sampel · 23.889 baris.", key: true, refs: ["R-TRUTH", "R-PROFILE"] },
  { id: "tl-0810", date: "10 Agu", title: "Sidang KP", text: "341.043 sampel dalam 30.188 baris dilaporkan.", key: false, refs: ["R-SIDANG"] },
  { id: "tl-0824", date: "24 Agu", title: "Kuota Vercel mulai habis", text: "Perangkat kirim ±15 detik sekali → perlu efisiensi.", key: true, refs: ["R-CHAT"] },
  { id: "tl-0902", date: "2–10 Sep", title: "STO keempat & tangki bulanan online", text: "Tangki bulanan ±4.772 L sempat tertunda karena belum ada stop kontak.", key: false, refs: ["R-CHAT"] },
  { id: "tl-0914", date: "14 Sep", title: "Diskusi telemetri adaptif", text: "Konteks PLN/genset, risiko intranet, opsi relay sensing.", key: true, refs: ["R-CHAT", "R-AIDOCS"] },
  { id: "tl-0915", date: "15 Sep", title: "Topik TA disepakati", text: "Akurasi multi-tangki · transmisi hemat energi · kajian efektif-efisien.", key: true, refs: ["R-DOSEN"] },
  { id: "tl-0920", date: "20 Sep", title: "8 perangkat online (klaim README)", text: "Perlu diverifikasi langsung ke database sebelum dikutip di proposal.", key: false, refs: ["R-PROFILE"] },
];

// ------------------------------------------------ 3. masalah dari chat --
export const ISSUE_CATEGORIES = {
  biaya: { label: "Biaya & kuota cloud", badge: "badge--bad" },
  energi: { label: "Energi & transmisi", badge: "badge--fuel" },
  akurasi: { label: "Akurasi & kualitas data", badge: "badge--info" },
  hardware: { label: "Hardware & catu daya", badge: "badge--warn" },
  integrasi: { label: "RTU, intranet & konteks", badge: "badge--violet" },
  keamanan: { label: "Keamanan", badge: "badge--bad" },
  ux: { label: "UX & operasional", badge: "badge--accent" },
  kolaborasi: { label: "Kolaborasi & maintainability", badge: "" },
  arah: { label: "Arah & skala", badge: "badge--ok" },
};

const issue = (id, date, cat, pillars, title, summary, what, why, fix, refs = ["R-CHAT"]) => ({
  id,
  date,
  cat,
  pillars,
  title,
  summary,
  detail: sec("Apa yang terjadi", p(what)) + sec("Kenapa penting", p(why)) + sec("Arah solusi untuk TA", p(fix)),
  refs,
});

export const ISSUES = [
  issue(
    "i-deploy",
    "27 Jun–6 Jul",
    "arah",
    [3],
    "Jalur deploy: Vercel + MySQL cloud dulu, server lokal nanti",
    "Disepakati memakai layanan gratis untuk 5–10 perangkat; reverse proxy baru dipikirkan saat pindah ke server sendiri.",
    "Tim membandingkan Cloudflare Tunnel, Caddy/NGINX, dan Vercel. Keputusan sementara: Vercel + Aiven MySQL (gratis). <i>Reverse proxy</i> (server perantara yang meneruskan permintaan ke aplikasi di belakangnya) belum perlu karena Vercel sudah menyediakan TLS.",
    "Keputusan ini membuat pilot cepat jalan tanpa biaya. Konsekuensinya, FTM bergantung pada kuota gratis yang kemudian mulai habis (24 Agustus).",
    "Kajian pilar 3 membandingkan biaya dan risiko: tetap serverless dengan telemetri hemat, VPS kecil, atau server internal. Lihat " + xref("sim-cloud", "kalkulator kuota cloud") + ".",
  ),
  issue(
    "i-rtu-old",
    "28 Jun",
    "integrasi",
    [3],
    "Mode RTU lama terhambat frame Modbus & risiko intranet",
    "Versi 2024–25 menarik data dari database lewat NodeMCU lalu meneruskan ke Arduino Mega via Modbus. Semua perangkat tergabung dalam satu frame.",
    "Engineer yang membangun versi sebelumnya menjelaskan: data sudah bisa sampai ke RTU, tetapi protokol Modbus mengirim semua data perangkat dalam satu paket frame. Membuka jalur dari internet publik ke RTU di intranet lewat reverse proxy juga dinilai membuka peluang serangan siber.",
    "Integrasi RTU bernilai tinggi karena memakai sistem monitoring internal yang sudah ada. Namun jalur <b>internet → intranet</b> adalah garis merah keamanan.",
    "Balik arahnya: sensor lokal langsung memberi sinyal ke RTU (analog 4–20 mA atau Modbus RTU), <b>tanpa</b> internet. Lihat " + xref("d-rtu", "Perlu RTU?") + ".",
  ),
  issue(
    "i-rtu-port",
    "28 Jun",
    "integrasi",
    [1, 3],
    "RTU sudah punya port “Fuel Level” tetapi nilainya 0",
    "Notifikasi bot monitoring internal menunjukkan port analog “Fuel Level Tank Ultrasonic” (satuan liter) terbaca 0.",
    "Di RTU salah satu STO sudah ada port analog berlabel level BBM tangki utama, tetapi nilainya 0. Artinya slot integrasi sudah pernah disiapkan, namun belum terisi sensor.",
    "Ini bukti ada kebutuhan resmi di sistem internal. Kalau FTM bisa mengisi slot ini secara lokal, datanya masuk ke alur monitoring yang sudah dipakai NOC tanpa membuka akses dari internet.",
    "Eksperimen opsional: node FTM mengeluarkan 4–20 mA atau berperan sebagai Modbus slave ke PLC/RTU uji di laboratorium. Lihat " + xref("f2-rtuout", "fitur keluaran lokal RTU") + ".",
  ),
  issue(
    "i-scale",
    "28 Jun",
    "arah",
    [3],
    "Target: 5 STO → 29 STO → integrasi RTU",
    "Pembimbing lapangan menetapkan tahapan skala dan harapan integrasi dengan sistem yang sudah ada.",
    "Tahap awal 5 STO di wilayah Pasuruan, target akhir 29 STO di seluruh District Sidoarjo, lalu integrasi ke sistem RTU bila memungkinkan.",
    "Angka ini dasar perhitungan skala: kuota cloud, biaya perangkat, dan beban kerja admin harus dihitung untuk 29 STO, bukan hanya 5.",
    "Semua kalkulator di halaman ini bisa diatur ke 29 STO atau skala nasional (ratusan STO).",
  ),
  issue(
    "i-offset",
    "1 & 14 Jul",
    "akurasi",
    [1],
    "Offset leher tangki & istilah “jarak sensor” membingungkan",
    "Sensor terbaca 25 cm karena jarak sudah dikurangi tinggi tutup/leher tangki (dimisalkan 6 cm). Label kemudian diganti menjadi “tinggi ruang kosong”.",
    "Sensor dipasang di atas mulut tangki, jadi jarak yang dibaca termasuk tinggi leher. Firmware menguranginya dengan angka asumsi. Di dashboard istilah “jarak sensor” disalahpahami, sehingga diganti menjadi “tinggi ruang kosong” (ullage, ruang udara di atas cairan).",
    "Salah memasukkan tinggi pemasangan beberapa sentimeter langsung menggeser seluruh pembacaan. Di tangki silinder Ø150 cm, 1 cm di tengah tangki ≈ 40 liter.",
    "Wizard kalibrasi dengan titik referensi (dipstick atau pengisian yang diketahui literannya) menggantikan angka asumsi. Lihat " + xref("c-kalibrasi", "metode kalibrasi") + ".",
  ),
  issue(
    "i-autoprov",
    "1–5 Jul",
    "arah",
    [3],
    "Auto-provision dari payload vs pengajuan resmi",
    "Ide awal: perangkat mengirim konfigurasi dan langsung terdaftar. Diputuskan: pengajuan → persetujuan admin → kunci per perangkat.",
    "Muncul usulan agar perangkat baru cukup mengirim dimensi tangki, GPS, dan lainnya, lalu otomatis terdaftar. Tim memilih model hybrid: data dikirim, tetapi harus disetujui admin sebelum aktif.",
    "Tanpa kontrol, salah ketik firmware atau perangkat asing bisa merusak registry.",
    "Pertahankan prinsip persetujuan, tetapi sederhanakan pemasangan: firmware tunggal + klaim perangkat dengan kode sekali pakai. Lihat " + xref("d-installer", "instalasi tanpa compile") + ".",
  ),
  issue(
    "i-git",
    "1–13 Jul",
    "kolaborasi",
    [3],
    "Kolaborasi Git: identitas commit, push ke main, history rewrite",
    "Commit tercatat atas nama orang lain, sempat push langsung ke main, branch protection menolak, history sempat ditulis ulang.",
    "Beberapa kolaborator baru mengenal Git. Terjadi identitas commit keliru, push langsung ke main, dan konflik. Tim membuat prompt/aturan kerja untuk AI agent dan mewajibkan PR.",
    "Proyek yang akan dilanjutkan orang lain butuh alur kerja yang aman. Kode yang dihasilkan AI juga cenderung panjang dan sulit direview.",
    "FTM 2.0: monorepo yang lebih kecil, aturan commit (Conventional Commits), PR template, CI wajib, dan dokumen <i>CONTRIBUTING</i> yang ramah pemula.",
  ),
  issue(
    "i-secrets",
    "1, 7, 8 Jul",
    "keamanan",
    [3],
    "Kredensial dibagikan lewat chat",
    "Detail akses database, email kantor, token bot, dan file konfigurasi lingkungan pernah dikirim sebagai teks di grup.",
    "Untuk mempercepat kerja, beberapa rahasia dikirim sebagai teks biasa di grup Telegram. Nilainya sengaja <b>tidak</b> ditulis ulang di halaman ini.",
    "Siapa pun yang pernah atau akan punya akses ke riwayat chat bisa memakai rahasia itu. Ini risiko nyata untuk sistem yang dipakai operasional.",
    "Rotasi (ganti) semua rahasia yang pernah terkirim, pakai secret manager atau environment variable per orang, dan jadikan aturan: rahasia tidak pernah lewat chat. Lihat " + xref("f-secrets", "temuan kredensial") + ".",
  ),
  issue(
    "i-gap",
    "5 Jul",
    "akurasi",
    [1, 3],
    "Grafik tetap tersambung saat perangkat mati",
    "Perangkat mati pukul 02–05, tetapi grafik terlihat seolah tetap online.",
    "Grafik menarik garis lurus di antara titik data terakhir sebelum mati dan titik pertama setelah hidup, sehingga jeda 3 jam tidak terlihat.",
    "Ini soal <i>missing value</i> (data kosong). Garis palsu bisa menyembunyikan kejadian penting, misalnya pemadaman panjang yang justru mematikan sensor.",
    "Deteksi jeda (lebih dari 2× interval yang diharapkan), putus garisnya, beri penanda kualitas, dan kirim ulang data yang tersimpan di perangkat (<i>store-and-forward</i>).",
  ),
  issue(
    "i-compile",
    "5–6 Jul",
    "ux",
    [3],
    "Firmware dikirim sebagai ZIP untuk di-compile manual",
    "User harus membuka Arduino IDE, memasang library, lalu compile. Sempat muncul ide aplikasi .exe sekali klik.",
    "Paket firmware berisi kode dan konfigurasi per perangkat, dikirim lewat tautan email. Pengguna lapangan tetap harus compile dan upload sendiri. Risikonya bentrok versi library.",
    "Teknisi lapangan bukan programmer. Setiap langkah manual menambah peluang gagal dan memperlambat perluasan ke 29 STO.",
    "Satu firmware dibangun otomatis oleh CI, diinstal dari browser (ESP Web Tools), lalu Wi-Fi dan konfigurasi diatur saat runtime. Lihat " + xref("d-installer", "detailnya") + ".",
  ),
  issue(
    "i-formula",
    "5 & 15 Jul",
    "akurasi",
    [1],
    "Konsumsi per jam diganti rumus beban, kVA, dan cos φ",
    "Input kapasitas dan konsumsi manual dihapus, diganti rumus dari beban lokasi, kapasitas mesin (kVA), dan cos φ.",
    "Tujuannya baik: mengurangi isian manual. Namun setelah ditelusuri di kode, kapasitas mesin ternyata saling coret dalam rumus dan tidak ada komponen konsumsi saat beban rendah.",
    "Estimasi runtime (berapa jam genset bisa menyala dengan sisa solar) adalah angka yang dibaca pengambil keputusan. Rumus yang bias membuat status ‘kritis’ tidak tepat.",
    "Gunakan kurva bahan bakar genset (model HOMER) lalu kalibrasi dengan laju konsumsi nyata dari episode genset menyala. Lihat " + xref("f-formula", "temuan rumus") + ".",
  ),
  issue(
    "i-ups",
    "6 Jul",
    "hardware",
    [3],
    "Server lokal tanpa UPS",
    "Rencana server di PC kantor, tetapi UPS lama rusak. Kalau listrik padam, server mati (data tidak hilang, hanya layanan down).",
    "Muncul rencana memindahkan server ke PC lokal. Pembimbing lapangan menilai jalan yang ada sekarang cukup dulu karena permintaan data tidak terus-menerus dan selalu ada petugas standby.",
    "Ironis: saat PLN padam (momen paling penting), server lokal tanpa UPS justru ikut mati.",
    "Kajian pilar 3: bandingkan cloud vs server lokal dengan catu daya cadangan (misalnya dari DC −48 V STO lewat konverter terisolasi) dari sisi ketersediaan (<i>availability</i>).",
  ),
  issue(
    "i-crud",
    "6 Jul",
    "ux",
    [3],
    "Admin belum bisa menghapus perangkat",
    "Menu hapus belum ada, sehingga data uji harus dibersihkan langsung dari database. Fitur hapus kemudian ditambahkan.",
    "Perangkat uji menumpuk dan harus dibersihkan manual. Fitur hapus dengan konfirmasi kemudian ditambahkan.",
    "Operasi rutin yang harus lewat database langsung itu berisiko salah hapus.",
    "FTM 2.0: siklus hidup perangkat lengkap (aktif, nonaktif, pensiun, ganti sensor) dengan jejak audit, bukan hapus permanen.",
  ),
  issue(
    "i-rollup",
    "8 Jul",
    "biaya",
    [2, 3],
    "Rollup 5 menit menghemat ±60% storage",
    "Data mentah ±20 detik diringkas per 5 menit agar muat di database 1 GB.",
    "Analisis database menunjukkan penghematan sekitar 60% per bulan bila yang disimpan hanya ringkasan 5 menit. Dengan sumber daya yang ada, database diperkirakan cukup untuk menambah 28 perangkat.",
    "Ini langkah efisiensi pertama yang tepat, tetapi hanya di sisi penyimpanan.",
    "Pilar 2 menurunkan jumlah data <b>sejak dari perangkat</b>, sehingga request, bandwidth, energi, dan storage ikut turun.",
  ),
  issue(
    "i-vercelteam",
    "11 Jul & 24 Agu",
    "kolaborasi",
    [3],
    "Akses Vercel tim butuh plan Pro; akun masih pribadi",
    "Kolaborator tidak bisa mengubah environment variable. Muncul rencana memindahkan Vercel/Aiven ke akun kantor.",
    "Fitur kolaborasi tim di Vercel memerlukan plan berbayar. Semua sumber daya masih atas nama akun pribadi mahasiswa.",
    "Sistem operasional tidak boleh bergantung pada akun pribadi orang yang akan lulus.",
    "Rencana kepemilikan: akun organisasi/kantor, dokumen serah terima, dan infrastruktur yang bisa dipindah (Docker Compose) bila kelak di-host internal.",
  ),
  issue(
    "i-tgonboard",
    "12–13 Jul",
    "ux",
    [3],
    "Setelah binding Telegram, user bingung harus apa",
    "Diusulkan pesan sambutan dan daftar perintah otomatis setelah akun terhubung.",
    "Setelah akun web terhubung ke bot, tidak ada petunjuk lanjutan. Pesan sukses dan /help kemudian diperjelas.",
    "Notifikasi hanya berguna jika penerima tahu cara bertindak.",
    "Notifikasi FTM 2.0 menyertakan konteks + tindakan (misalnya “Refill terdeteksi +180 L — cocokkan dengan nota?”) dan tombol inline.",
  ),
  issue(
    "i-llm",
    "14 Jul",
    "ux",
    [3],
    "Ide asisten LLM di live chat, terganjal biaya",
    "Muncul usulan bot AI untuk menjawab pertanyaan teknis. Pilihan yang dibahas: API berbayar, layanan gratis terbatas, atau model lokal.",
    "Asisten AI di helpdesk diusulkan untuk menjawab pertanyaan umum, sedangkan pertanyaan teknis berat tetap dijawab admin. Diskusi berhenti karena biaya.",
    "Chatbot terdengar menarik, tetapi harus menjawab dari data yang benar, tidak mengarang, dan ada biayanya.",
    "Masuk kategori <i>Could</i>, bukan inti TA. Kalau dibuat: RAG atas SOP + query data read-only, dengan sumber yang ditampilkan. Lihat " + xref("d-chatbot", "Perlu chatbot AI?") + ".",
  ),
  issue(
    "i-hwbroken",
    "14 & 28 Jul",
    "hardware",
    [2, 3],
    "Alat di dua STO rusak; komponen regulator diambil dari alat rusak",
    "Pemasangan tertunda karena alat rusak dan pengganti belum datang.",
    "Dua perangkat rusak dan harus menunggu pembelian pengganti. Komponen regulator tegangan diambil dari perangkat rusak lain untuk menghidupkan satu lokasi.",
    "Keandalan perangkat keras (catu daya, regulator, enclosure) menentukan apakah data tersedia. Perangkat yang dicatu adaptor AC juga ikut mati saat PLN padam.",
    "Rancang catu daya yang lebih tahan: sumber DC stabil (misalnya dari −48 V lewat DC-DC terisolasi) atau AC + baterai cadangan, perlindungan lonjakan, dan pencatatan tegangan yang benar-benar diukur.",
  ),
  issue(
    "i-mobile",
    "15 Jul",
    "ux",
    [3],
    "Tidak bisa menyetujui perangkat lewat HP",
    "Area daftar tidak bisa di-scroll karena terkunci oleh footer. Diperbaiki di hari yang sama.",
    "Di halaman tinjau perangkat, area yang bisa di-scroll terkunci dengan layar utama sehingga tombol setuju tidak terjangkau di ponsel.",
    "Admin lapangan kebanyakan memakai ponsel.",
    "FTM 2.0: desain <i>mobile-first</i> dan uji otomatis tampilan ponsel (Playwright).",
  ),
  issue(
    "i-bloat",
    "14 Jul & 24 Agu",
    "kolaborasi",
    [3],
    "Kode makin besar dan sulit direview",
    "Muncul keinginan refactor dan memisahkan frontend–backend karena kode sulit dirawat.",
    "Kode yang banyak ditulis bersama AI terasa terlalu besar untuk direview manusia. Muncul usulan memisahkan web dan server.",
    "Kode yang tidak bisa dipahami tim tidak bisa dirawat setelah pembuatnya pergi.",
    "Rebuild dengan batas modul yang jelas. Pemisahan <b>deployable</b> (web dan API) tidak harus berarti repo terpisah. Lihat " + xref("d-repo", "monorepo vs repo terpisah") + ".",
  ),
  issue(
    "i-quota",
    "24 Agu",
    "biaya",
    [2, 3],
    "Kuota Vercel mulai habis karena perangkat kirim ±15 detik sekali",
    "Storage database masih aman (±400 MB, bertambah ±40 MB/bulan), tetapi kuota komputasi serverless menipis.",
    "Muncul peringatan penggunaan Vercel mendekati batas. Dugaan penyebab: setiap perangkat mengirim data kira-kira tiap 15 detik, sehingga fungsi server hampir selalu bekerja. Storage Aiven masih longgar.",
    "Kuota gratis Vercel Hobby per bulan: 1 juta <i>invocations</i> (pemanggilan fungsi), 4 jam Active CPU, 360 GB-jam memori. Delapan perangkat × 15 detik saja ≈ 1,38 juta request per bulan, belum termasuk browser yang polling.",
    "Hitung ulang di " + xref("sim-cloud", "kalkulator kuota") + ". Solusinya ada di sisi perangkat (pilar 2) dan sisi browser (polling helpdesk).",
    ["R-CHAT", "D-VERCELFAIR", "D-VERCELPRICE"],
  ),
  issue(
    "i-servergate",
    "24 Agu",
    "energi",
    [2],
    "Usulan “blok di server” hanya hemat penulisan database",
    "Ide: server mengabaikan data selama X menit setelah data terakhir disimpan. Masalahnya, request tetap masuk.",
    "Diusulkan pengecekan timestamp di backend: setelah menyimpan data perangkat A, server tidak menyimpan data berikutnya selama X menit, dan X bisa diatur dari frontend. Sudah disadari bahwa perangkat tetap “menembak” server sehingga server tetap harus hidup.",
    "Cara ini mengurangi tulisan ke database, tetapi <b>tidak</b> mengurangi request, bandwidth, CPU fungsi, maupun energi radio perangkat. Kuota Vercel justru dihitung dari request dan waktu fungsi berjalan.",
    "Penghematan harus dimulai di perangkat: perangkat memutuskan kapan perlu mengirim, dan server mengembalikan <i>policy</i> (aturan kirim). Lihat " + xref("c-policy", "policy-in-response") + ".",
  ),
  issue(
    "i-nooutlet",
    "8 Sep",
    "hardware",
    [2],
    "Sensor tangki bulanan tertunda karena belum ada stop kontak",
    "Sensor sudah jadi dan siap dipasang, tetapi kabel listrik ke arah tangki belum ada. Baru online 10 September.",
    "Perangkat untuk tangki bulanan (silinder ±4.772 L) sudah siap, tetapi di dekat tangki tidak ada stop kontak sehingga perangkat belum bisa dinyalakan.",
    "Ini alasan paling konkret kenapa <b>hemat energi</b> penting: kalau node bisa hidup berbulan-bulan dari baterai atau panel surya kecil, tangki yang jauh dari listrik tetap bisa dipantau.",
    "Pilar 2: node deep-sleep + radio hemat (Wi-Fi on-demand, atau LoRa ke gateway di gedung). Hitung umur baterainya di " + xref("sim-telemetry", "simulator telemetri") + ".",
  ),
  issue(
    "i-flat",
    "14 Sep",
    "energi",
    [2],
    "Data kebanyakan garis lurus; level hanya berubah saat ada kejadian",
    "Muncul ide telemetri yang “peka konteks”: kirim saat PLN padam atau refill, bukan terus-menerus.",
    "Pengamatan dari grafik: level datar hampir sepanjang waktu. Muncul ide agar perangkat punya konteks lingkungan, misalnya tahu kapan PLN padam atau ada pengisian.",
    "Mengirim angka yang sama ribuan kali per hari membuang request, energi, dan storage. Namun perangkat tidak boleh ketinggalan kejadian penting.",
    "Inilah inti pilar 2: send-on-delta + mesin status adaptif + konteks daya lokal. Lihat " + xref("c-statemachine", "mesin status") + ".",
  ),
  issue(
    "i-context",
    "14 Sep",
    "integrasi",
    [2, 3],
    "Dari mana perangkat tahu PLN padam atau genset menyala?",
    "Opsi yang dibahas: baca pesan bot monitoring internal, relay sensing PLN, restart perangkat sebagai indikator, atau ESP32 dengan RS-485 ke RTU. Koneksi ke intranet dikhawatirkan kena patroli keamanan siber.",
    "Pesan otomatis bot monitoring internal berasal dari server intranet yang mengambil data RTU. Untuk membacanya, perlu akun terdaftar atau injeksi ke sistem itu. Keduanya dinilai berisiko. Opsi yang dinilai paling masuk akal: tambah rangkaian relay untuk mendeteksi catuan PLN. Karena sensor saat ini dicatu AC, restart perangkat juga bisa menjadi indikator. ESP32 dengan 2 serial untuk RS-485 masih dalam riset.",
    "Konteks daya membuat data bermakna: solar turun saat genset menyala itu normal, tetapi turun saat genset mati patut dicurigai.",
    "Pilihan utama: sensing lokal non-intrusif (optocoupler/relay pada catuan PLN, atau sensor getaran/arus genset) dengan izin teknisi. Pesan bot hanya konteks tambahan jika ada akses resmi. Lihat " + xref("d-telegram", "peran Telegram") + ".",
    ["R-CHAT", "D-TGB2B", "S-NIST82"],
  ),
  issue(
    "i-interval",
    "24 Agu vs 14 Sep",
    "akurasi",
    [2],
    "Interval kirim: 15 detik atau 20 menit?",
    "Di Agustus disebut ±15 detik. Pada 14 September disebut sudah 20 menit. Tangkapan layar awal September masih menunjukkan pembaruan dalam hitungan detik.",
    "Ada ketidakcocokan informasi tentang interval pengiriman di lapangan. Kemungkinan: sebagian perangkat sudah diubah, ada penyaringan di server, atau salah sebut satuan.",
    "Eksperimen pilar 2 butuh baseline (kondisi awal pembanding) yang pasti. Tanpa itu, angka penghematan tidak bisa dipercaya.",
    "Langkah pertama TA: tarik log request per perangkat (timestamp masuk) selama 7 hari dan tetapkan baseline resmi.",
  ),
  issue(
    "i-worth",
    "14 Sep",
    "arah",
    [3],
    "Pandangan lapangan: untuk Telkom, adaptif belum tentu wajib",
    "Menurut engineer lapangan, masalah server bisa diselesaikan dengan menambah limit atau pindah ke intranet. Adaptif sangat berguna untuk riset TA.",
    "Engineer lapangan berpendapat bahwa untuk sistem Telkom, penghematan ini tidak wajib karena urusan server bisa diputuskan manajemen (tambah limit atau akuisisi ke intranet). Namun ia menawarkan membantu membuat alat untuk kebutuhan riset.",
    "Pandangan ini jujur dan perlu dihormati. Nilai TA harus dibuktikan dengan angka: pada skala berapa, di kondisi apa (misalnya tangki tanpa listrik), dan berapa biaya yang dihemat.",
    "Framing TA: bukan “Telkom wajib memakai ini”, tetapi “ini bukti terukur kapan dan seberapa besar pendekatan hemat energi layak dipakai”.",
  ),
  issue(
    "i-support",
    "14 Sep",
    "arah",
    [2],
    "Tawaran bantuan desain PCB & simulator 2–4 perangkat",
    "Engineer lapangan menawarkan desain PCB dan menyarankan simulator 2–4 perangkat untuk TA. Tim memilih membuat sendiri dan berkonsultasi bila buntu.",
    "Ada tawaran desain layout PCB (papan sirkuit cetak) dan vendor cetak PCB di Bandung. Tim ingin tetap mengerjakan sendiri agar bisa menjelaskan saat ditanya penguji.",
    "Dukungan lapangan menurunkan risiko hardware, sedangkan mengerjakan sendiri menjaga orisinalitas dan pemahaman.",
    "Bagi jelas di dokumen TA mana kontribusi tim dan mana dukungan pihak lain. PCB custom juga memperbaiki masalah arus tidur board pengembangan.",
  ),
];

// ------------------------------------------------- 4. audit kode v1 --
const finding = (id, sev, area, title, evidence, impact, fix, pillar, refs) => ({
  id,
  sev,
  area,
  title,
  evidence,
  pillar,
  detail:
    sec("Bukti", p(evidence)) +
    sec("Dampak", p(impact)) +
    sec("Perbaikan yang diusulkan", p(fix)),
  refs,
});

export const FINDINGS = [
  finding(
    "f-tls",
    "tinggi",
    "Firmware",
    "HTTPS tanpa verifikasi sertifikat (setInsecure)",
    "Firmware memanggil <code>client.setInsecure()</code> (baris 540). Versi prototipe sebelumnya justru sudah memakai <i>trust anchor</i> (sertifikat akar yang dipercaya).",
    "Koneksi terenkripsi, tetapi perangkat tidak memastikan lawan bicaranya server asli. Serangan <i>man-in-the-middle</i> (penyadap di tengah jalur) bisa mencuri kunci perangkat atau mengirim data palsu.",
    "Pasang sertifikat akar (root CA) di firmware atau pakai ESP32 dengan bundle sertifikat, plus prosedur rotasi. Ukur dampaknya ke energi di eksperimen E4.",
    2,
    ["R-FW", "S-TLS13"],
  ),
  finding(
    "f-ota",
    "tinggi",
    "Firmware",
    "OTA tanpa password secara default",
    "<code>SOLARTANK_OTA_PASSWORD</code> default kosong; password hanya dipasang bila diisi (baris 39–40, 658–659).",
    "Siapa pun di jaringan Wi-Fi yang sama bisa menimpa firmware lewat <i>OTA</i> (Over-The-Air, pembaruan lewat jaringan).",
    "Wajibkan password, lalu naikkan ke firmware bertanda tangan digital (ESP32 secure boot + signed OTA).",
    3,
    ["R-FW"],
  ),
  finding(
    "f-secrets",
    "tinggi",
    "Operasional",
    "Rahasia pernah tersebar di chat",
    "Detail akses database, akun email kantor, token bot, dan file konfigurasi lingkungan pernah dikirim sebagai teks di grup (1, 7, 8 Juli 2026).",
    "Rahasia yang pernah bocor harus dianggap sudah diketahui pihak lain.",
    "Rotasi semua rahasia, aktifkan 2FA, dan pakai akun per orang. Simpan rahasia di secret manager (misalnya Infisical seperti di CoE BHT, atau environment Vercel), bukan di chat.",
    3,
    ["R-CHAT", "D-BHT"],
  ),
  finding(
    "f-zero",
    "tinggi",
    "Backend",
    "Jarak kosong dianggap 0 cm, sehingga tangki terbaca penuh",
    "<code>normalize-reading.ts</code> baris 109–111: jika payload tidak membawa <code>distance_cm</code>, nilai diganti 0 cm dengan peringatan.",
    "Jarak 0 cm berarti permukaan cairan menempel di sensor, jadi tangki terbaca <b>penuh</b>. Kerusakan sensor bisa tampil sebagai tangki penuh, arah kesalahan yang paling berbahaya.",
    "Tolak atau tandai pembacaan sebagai tidak valid (<i>quality flag</i>), jangan diganti angka. Tampilkan “data tidak tersedia”.",
    1,
    ["R-NORM"],
  ),
  finding(
    "f-edge",
    "sedang",
    "Data",
    "Pembacaan di batas sensor tersimpan sebagai data valid",
    "Pada CSV tangki uji 7 Juli (5.314 baris): 267 baris bernilai 0 cm dan 22 baris 60 cm (tepat di batas), serta 55,8% nilai volume berurutan identik.",
    "Nilai batas biasanya tanda gema gagal atau terlalu dekat (<i>blind zone</i>, zona buta sensor). Rata-rata 5 menit yang memuat nilai ini jadi bias.",
    "Validasi rentang (zona buta, jarak maksimum, dimensi tangki), median-of-N dengan minimal 3 gema valid, dan tandai kualitas per pembacaan.",
    1,
    ["R-CSV"],
  ),
  finding(
    "f-minvalid",
    "sedang",
    "Firmware",
    "Satu gema valid dari lima sudah dianggap cukup",
    "<code>ULTRA_SAMPLES = 5</code>, <code>ULTRA_MIN_VALID_SAMPLES = 1</code> (baris 102–103).",
    "Pembacaan yang hanya didukung satu gema mudah terkena pantulan dinding atau riak.",
    "Minimal 3 dari 5–9 sampel valid, ambil median, buang outlier dengan <i>MAD</i> (median absolute deviation), laporkan jumlah sampel valid ke server.",
    1,
    ["R-FW", "L-OPI"],
  ),
  finding(
    "f-sound",
    "sedang",
    "Firmware",
    "Kecepatan suara dianggap konstan (±20 °C)",
    "<code>cm = (durationUs / 2) / 29.1</code> (baris 295) setara kecepatan suara ±343,6 m/s, yaitu udara bersuhu ±20 °C.",
    "Kecepatan suara naik ±0,17% per °C. Udara di atas cairan dalam tangki yang terkena panas bisa 30–45 °C, sehingga ruang kosong terbaca lebih pendek dan level terlihat lebih tinggi. Contoh: selisih 15 °C pada ruang kosong 100 cm ≈ 2,6 cm, setara ±100 L di tangki silinder Ø150 × 270 cm saat setengah penuh.",
    "Tambahkan sensor suhu murah (misalnya DS18B20) di dekat sensor dan hitung <code>c = 331,3 + 0,606·T</code>. Uji di eksperimen E2.",
    1,
    ["R-FW", "L-KINSLER"],
  ),
  finding(
    "f-radio",
    "sedang",
    "Firmware",
    "Wi-Fi selalu menyala + TLS baru setiap kirim",
    "<code>WiFi.setSleepMode(WIFI_NONE_SLEEP)</code> (baris 640) dan <code>http.setReuse(false)</code> (baris 494): radio tidak pernah tidur dan setiap POST membuka koneksi TLS baru.",
    "Radio aktif terus menarik puluhan mA sepanjang hari. <i>Handshake</i> TLS (salam pembuka enkripsi) diulang ribuan kali per hari dan memakan waktu, byte, serta energi.",
    "Modem-sleep/light-sleep saat terhubung, pakai ulang sesi TLS, atau deep-sleep dengan Wi-Fi on-demand. Kirim secukupnya dengan policy adaptif.",
    2,
    ["R-FW", "D-ESP8266LP", "L-TLSENERGY"],
  ),
  finding(
    "f-payload",
    "sedang",
    "Protokol",
    "Payload ±1,5 KB penuh field ganda",
    "Satu pesan membawa <code>distance</code>, <code>distance_cm</code>, <code>dist</code>, <code>dist_cm</code> (nilai sama), <code>rssi</code> dan <code>wifi_rssi</code>, blok <code>tank</code> dan <code>raw</code>, serta konfigurasi tangki lengkap <b>di setiap</b> pesan.",
    "Byte terbuang di setiap pengiriman: bandwidth, waktu radio, dan energi.",
    "Skema ringkas (±100 byte JSON atau ±60 byte CBOR). Konfigurasi hanya dikirim saat berubah (pakai nomor versi/hash). Lihat perbandingan byte di bagian pilar 2.",
    2,
    ["R-FW", "S-CBOR"],
  ),
  finding(
    "f-fixed",
    "sedang",
    "Firmware",
    "Interval kirim tetap, tidak peka kejadian",
    "<code>if (hasMeasurement && nowMs - lastPostMs >= POST_EVERY_MS)</code> (baris 684); interval berasal dari profil hardware (20 detik).",
    "Perangkat mengirim hal yang sama saat datar dan belum tentu cukup cepat saat ada kejadian.",
    "Mesin status SLOW/FAST/EVENT/BUFFER + <i>send-on-delta</i> (kirim bila berubah melewati ambang). Lihat " + xref("c-statemachine", "detail") + ".",
    2,
    ["R-FW", "L-SOD"],
  ),
  finding(
    "f-formula",
    "sedang",
    "Backend",
    "Rumus konsumsi: kapasitas mesin saling coret",
    "<code>engineKw = kVA_mesin × cosφ</code>, <code>rasio = beban_kW / engineKw</code>, <code>konsumsi = kVA_mesin × rasio × 0,21</code>. Secara aljabar hasilnya <b>0,21 × beban_kW / cosφ</b>: kapasitas mesin hilang dari rumus.",
    "(1) Solar dibakar untuk daya nyata (kW), bukan daya semu (kVA), sehingga membagi dengan cos φ menaikkan estimasi ±25% saat cos φ = 0,8. (2) Tidak ada komponen konsumsi tanpa beban, padahal genset berbeban rendah boros per kWh. Estimasi runtime dan status ‘kritis’ jadi tidak akurat.",
    "Kurva bahan bakar linear ala HOMER: <code>F = F0·Y_rated + F1·P</code> (L/jam). Isi F0 dan F1 dari datasheet genset, lalu kalibrasi dengan laju turun solar yang terukur saat genset menyala.",
    1,
    ["R-DEVREQ", "D-HOMER"],
  ),
  finding(
    "f-helpdesk",
    "sedang",
    "Web",
    "Widget helpdesk polling tiap 5 detik walau panel tertutup",
    "<code>POLL_INTERVAL_MS = 5000</code>; <code>setInterval</code> berjalan selama ada token sesi, tanpa cek panel terbuka atau tab terlihat (baris 32, 113–123). Dashboard (20 detik) sudah berhenti saat tab tidak aktif.",
    "Satu browser dengan sesi chat bisa menghasilkan ±17 ribu request per hari. Ini ikut menghabiskan kuota Vercel.",
    "Polling hanya saat panel terbuka dan tab terlihat, dengan backoff (jeda makin lama). Idealnya SSE (<i>Server-Sent Events</i>, server mendorong pesan ke browser) atau WebSocket.",
    3,
    ["R-HELP", "R-REFRESH", "D-VERCELWS"],
  ),
  finding(
    "f-token",
    "sedang",
    "Web",
    "Token sesi helpdesk di localStorage dan query string",
    "Token disimpan di <code>localStorage</code> dan dikirim sebagai parameter URL <code>?sessionToken=</code> (baris 68, 99–103).",
    "URL bisa tercatat di log server/proxy. localStorage bisa dibaca skrip bila ada celah XSS.",
    "Pakai cookie HttpOnly atau header Authorization dan perpendek umur token.",
    3,
    ["R-HELP"],
  ),
  finding(
    "f-csp",
    "rendah",
    "Web",
    "Belum ada Content-Security-Policy & HSTS",
    "<code>next.config.ts</code> sudah mengirim nosniff, X-Frame-Options, Referrer-Policy, Permissions-Policy, tetapi belum CSP dan HSTS.",
    "CSP (daftar sumber skrip yang diizinkan) adalah lapisan pertahanan penting terhadap XSS.",
    "Tambahkan CSP ketat (dengan nonce) dan HSTS.",
    3,
    ["R-NEXTCFG"],
  ),
  finding(
    "f-battery",
    "rendah",
    "Firmware",
    "Tegangan baterai adalah angka tetap 3,70 V",
    "<code>readBatteryVoltage()</code> mengembalikan <code>3.70f</code> (baris 257).",
    "Dashboard seolah punya data kesehatan catu daya, padahal tidak.",
    "Ukur sungguhan (ADC + pembagi tegangan, atau INA219/INA226) atau hapus field itu. Pada node baterai, data ini wajib.",
    2,
    ["R-FW"],
  ),
  finding(
    "f-thresholds",
    "rendah",
    "Backend",
    "Ambang runtime tidak konsisten",
    "Status runtime di kode memakai &lt;13 jam kritis, &lt;16 peringatan, ≤24 terbatas, sementara halaman detail menampilkan kelas yang berbeda.",
    "Pengguna melihat label berbeda untuk kondisi yang sama.",
    "Satu sumber konfigurasi ambang (per site bila perlu) yang dipakai backend, UI, dan notifikasi.",
    3,
    ["R-STATUS"],
  ),
  finding(
    "f-localapi",
    "rendah",
    "Firmware",
    "Halaman status lokal perangkat terbuka tanpa login",
    "Firmware menyalakan web server di port 80 (<code>/</code> dan <code>/api</code>) yang menampilkan ID perangkat, kode site, IP, dan volume.",
    "Kebocoran informasi di jaringan lokal (risiko rendah, tetapi tidak perlu).",
    "Matikan di mode produksi, atau lindungi dengan token dan hanya aktif saat mode servis.",
    3,
    ["R-FW"],
  ),
  finding(
    "f-backup",
    "rendah",
    "Operasional",
    "Backup berupa file teks biasa",
    "Skrip backup MySQL menghasilkan file dump/CSV yang diarahkan ke folder sinkronisasi Drive.",
    "Bila akun penyimpanan bocor, seluruh data ikut bocor.",
    "Enkripsi backup (misalnya age/GPG), batasi akses, dan uji restore berkala.",
    3,
    ["R-REPO"],
  ),
];

// -------------------------------------------------- konsep (pilar) --
export const CONCEPTS = [
  {
    id: "c-errorbudget",
    kicker: "Pilar 1 · Akurasi",
    title: "Anggaran error: dari mana saja salah hitung liter?",
    detail:
      p("Akurasi volume tidak hanya soal sensor. Error datang dari beberapa sumber sekaligus:") +
      table(
        ["Sumber", "Contoh besar kesalahan", "Cara menekan"],
        [
          ["Model geometri salah", "Kepala elips dianggap datar: selisih bisa &gt;10% kapasitas", "Pustaka geometri + tabel kalibrasi"],
          ["Tinggi pemasangan/offset", "1 cm salah = 1 cm level di semua pembacaan", "Kalibrasi titik referensi"],
          ["Suhu udara (kecepatan suara)", "±0,17% jarak per °C", "Sensor suhu + kompensasi"],
          ["Zona buta & pantulan dinding", "Nilai melompat ke batas (0/60 cm)", "Validasi rentang, sensor berkas sempit"],
          ["Riak, busa, getaran genset", "Noise beberapa mm–cm", "Median + filter Kalman"],
          ["Kemiringan sensor/tangki", "Jalur miring memanjangkan jarak", "Pemasangan tegak lurus, koreksi"],
          ["Muai solar", "±0,08–0,1% volume per °C", "Laporkan juga volume setara 15 °C"],
        ],
      ) +
      p("Simulasikan sendiri di " + xref("sim-accuracy", "kalkulator akurasi") + "."),
    refs: ["L-OPI", "L-KINSLER", "S-ASTM1250", "D-NEUTRIUM", "L-KALMAN"],
  },
  {
    id: "c-kalibrasi",
    kicker: "Pilar 1 · Akurasi",
    title: "Metode kalibrasi yang realistis di lapangan",
    detail:
      sec(
        "Tiga sumber kebenaran (ground truth)",
        ol([
          "<b>Dipstick/tongkat ukur</b>: ambil 3–5 titik saat level berbeda, bandingkan dengan pembacaan sensor, lalu koreksi offset.",
          "<b>Pengisian yang diketahui literannya</b>: setiap refill disertai nota liter dari pemasok. Kenaikan volume terukur harus mendekati nota. Satu refill = satu titik uji gratis.",
          "<b>Tabel kalibrasi (strapping table)</b>: pasangan tinggi → volume untuk tangki yang bentuknya tidak ideal, mengacu praktik ISO 12917-1. Di lab bisa dibuat dengan mengisi air bertahap memakai gelas ukur atau flow meter.",
        ]),
      ) +
      sec("Hasil yang dilaporkan", ul(["MAE (rata-rata selisih absolut) dalam liter dan % kapasitas", "Error maksimum", "Repeatability (simpangan baku pembacaan berulang)", "Drift (pergeseran) selama 4–8 minggu"])) +
      sec("Kenapa aman diuji dengan air dulu", p("Sensor ultrasonik mengukur jarak di <b>udara</b> di atas cairan, jadi jenis cairan hampir tidak berpengaruh. Uji geometri bisa memakai air di lab (aman), lalu divalidasi di tangki solar. Pengecualian: sensor radar sensitif terhadap jenis cairan (solar memantulkan gelombang radar jauh lebih lemah daripada air).")),
    refs: ["S-ISO12917", "L-SUGESTI", "D-A121"],
  },
  {
    id: "c-filter",
    kicker: "Pilar 1 · Kualitas data",
    title: "Filter dan penanda kualitas data",
    detail:
      ol([
        "<b>Di perangkat</b>: ambil 5–9 gema, buang yang di luar rentang fisik, ambil median, kirim juga jumlah sampel valid.",
        "<b>Di server</b>: cek plausibilitas (misalnya penurunan &gt; X L/menit saat genset mati → tandai), lalu filter Kalman (penaksir yang menggabungkan model perubahan dan pengukuran bernoise).",
        "<b>Penanda kualitas</b>: <code>ok</code>, <code>edge</code> (di batas sensor), <code>stuck</code> (nilai sama terlalu lama), <code>gap</code> (data hilang), <code>suspect</code> (tidak masuk akal).",
        "<b>Grafik jujur</b>: garis diputus saat ada jeda, titik meragukan diberi warna lain.",
      ]) + p("Ini bagian “menangani missing value”: bukan mengarang data, tetapi menandai dan menjelaskan kekosongannya."),
    refs: ["L-KALMAN", "R-CSV"],
  },
  {
    id: "c-statemachine",
    kicker: "Pilar 2 · Transmisi",
    title: "Mesin status telemetri adaptif (SLOW / FAST / EVENT / BUFFER)",
    detail:
      table(
        ["Mode", "Kapan", "Perilaku (contoh awal, akan diuji)"],
        [
          ["SLOW", "Genset mati, level stabil", "Ukur tiap 1–5 menit, kirim <i>heartbeat</i> (tanda masih hidup) tiap 30–60 menit"],
          ["FAST", "Genset menyala atau level turun konsisten", "Ukur tiap 10–30 detik, kirim tiap 1–2 menit"],
          ["EVENT", "Refill, penurunan tak wajar, boot/restart, sensor error", "Kirim segera, lalu <i>burst</i> (sering) beberapa menit"],
          ["BUFFER", "Internet putus", "Simpan di flash, kirim sekaligus (batch) saat pulih"],
        ],
      ) +
      p("Keputusan <b>kapan mengirim</b> diambil di perangkat karena perangkatlah yang pertama tahu ada perubahan. Server tetap memegang kendali lewat " + xref("c-policy", "policy") + ".") +
      p("Dasar ilmiahnya: <i>send-on-delta</i> (Miśkowicz, 2006) dan <i>Lebesgue sampling</i> (Åström & Bernhardsson, 2002). Sampling berbasis perubahan lebih efisien daripada sampling periodik untuk sinyal yang jarang berubah."),
    refs: ["L-SOD", "L-ASTROM", "R-AIDOCS"],
  },
  {
    id: "c-policy",
    kicker: "Pilar 2 · Transmisi",
    title: "Policy-in-response: server mengatur perangkat tanpa broker",
    detail:
      p("Masalah HTTP satu arah: server tidak bisa ‘membangunkan’ perangkat. Solusinya sederhana: setiap kali perangkat mengirim, <b>balasan server berisi aturan terbaru</b>.") +
      `<pre class="tree">POST /v2/ingest   →  { "v":3.2, "q":"ok", "m":"SLOW", ... }
200 OK            ←  { "policy": { "rev": 7, "slowHeartbeatMin": 60,
                        "fastSendSec": 90, "deltaL": 5, "burstMin": 5 } }</pre>` +
      p("Kelebihan: tetap jalan di Vercel (tidak perlu broker MQTT), aturan bisa diubah dari dashboard tanpa compile ulang. Kekurangan: perubahan baru berlaku saat perangkat mengirim berikutnya (paling lambat 1 heartbeat). Bila perlu perintah instan, gunakan MQTT sebagai eksperimen pembanding."),
    refs: ["R-AIDOCS", "S-MQTT"],
  },
  {
    id: "c-energymodel",
    kicker: "Pilar 2 · Energi",
    title: "Ke mana energi perangkat habis?",
    detail:
      p("Energi = tegangan × arus × waktu. Untuk node IoT, yang paling boros biasanya <b>berapa lama radio menyala</b>, bukan jumlah angka yang dikirim.") +
      table(
        ["Kondisi", "Arus tipikal", "Sumber"],
        [
          ["ESP8266 Wi-Fi aktif (TX)", "±50–170 mA (puncak lebih tinggi)", "Espressif"],
          ["ESP8266 modem-sleep (tetap terhubung)", "±15 mA", "Espressif Low-Power"],
          ["ESP8266 light-sleep", "±0,9 mA", "Espressif Low-Power"],
          ["ESP8266 deep-sleep (chip)", "±20 µA", "Espressif Low-Power"],
          ["ESP32-C3 deep-sleep (chip)", "±5 µA", "Datasheet ESP32-C3"],
          ["Board NodeMCU saat tidur", "beberapa mA (regulator + chip USB)", "Forum komunitas"],
        ],
      ) +
      p("Implikasinya: mengurangi jumlah pesan saja tidak cukup kalau radio tetap menyala terus. Penghematan besar datang dari <b>radio tidur + kirim seperlunya</b>, dan untuk baterai dari board tanpa komponen boros (modul langsung atau PCB custom).") +
      p("Semua angka di simulator adalah <b>asumsi awal</b> dan wajib diganti hasil ukur (eksperimen E4 dengan INA226 atau Power Profiler)."),
    refs: ["D-ESP8266LP", "D-ESP32C3", "D-NODEMCU", "L-TLSENERGY", "L-LPWAN"],
  },
  {
    id: "c-radio",
    kicker: "Pilar 2 · Radio",
    title: "Pilihan jalur komunikasi: Wi-Fi, LoRa, NB-IoT, atau lokal ke RTU",
    detail:
      table(
        ["Jalur", "Kelebihan", "Kekurangan", "Cocok untuk"],
        [
          ["Wi-Fi (sekarang)", "Sudah ada, murah, langsung ke internet", "Boros bila selalu menyala; jangkauan pendek; bergantung AP", "Tangki dekat gedung STO"],
          ["LoRa P2P / LoRaWAN", "Sangat hemat, jangkauan ratusan m–km", "Butuh gateway; payload kecil; aturan duty cycle", "Tangki jauh / tanpa listrik (dengan gateway di gedung atau jaringan Telkom LoRaWAN)"],
          ["NB-IoT / LTE-M", "Tanpa gateway sendiri, mode hemat PSM", "Biaya SIM, sinyal dalam ruang, modem lebih mahal", "Lokasi tanpa Wi-Fi"],
          ["RS-485 / 4–20 mA ke RTU", "Tanpa internet, masuk sistem internal", "Butuh izin & teknisi; kabel", "Integrasi NOC internal"],
        ],
      ) +
      p("Untuk TA: Wi-Fi tetap jalur utama, ditambah <b>satu</b> jalur pembanding (LoRa paling relevan dengan jurusan Telekomunikasi) bila anggaran memungkinkan. Menariknya, ekosistem Telkom sendiri punya platform IoT Antares dan jaringan LoRaWAN."),
    refs: ["L-LPWAN", "D-ANTARES", "S-MODBUS"],
  },
  {
    id: "c-cloudmodel",
    kicker: "Pilar 3 · Biaya",
    title: "Kenapa kuota serverless cepat habis?",
    detail:
      p("Vercel Hobby memberi jatah bulanan: <b>1 juta invocations</b>, <b>4 jam Active CPU</b>, <b>360 GB-jam Provisioned Memory</b>. Memori dihitung selama permintaan sedang diproses, termasuk saat menunggu database.") +
      ul([
        "Invocations = jumlah request (perangkat + browser).",
        "Active CPU = waktu CPU benar-benar bekerja (tidak dihitung saat menunggu I/O).",
        "GB-jam = ukuran memori instance × lama permintaan berjalan. Makin jauh jarak ke database, makin lama menunggu, makin besar tagihannya.",
      ]) +
      p("Contoh kasar: 8 perangkat × 15 detik ≈ 1,38 juta request/bulan, melewati jatah. Dengan telemetri adaptif (±60 pesan per perangkat per hari) ≈ 14 ribu request/bulan, atau ±1,4% jatah. Hitung di " + xref("sim-cloud", "kalkulator") + "."),
    refs: ["D-VERCELFAIR", "D-VERCELPRICE", "R-HELP"],
  },
];

// ------------------------------------------------ 7. keputusan besar --
const decision = (id, q, verdict, vlabel, short, body, refs, related = []) => ({ id, q, verdict, vlabel, short, detail: body, refs, related });

export const DECISIONS = [
  decision(
    "d-rtu",
    "Apakah RTU dibutuhkan dan bernilai?",
    "cond",
    "Ya, sebagai jalur lokal (fase lanjut)",
    "Bernilai tinggi untuk skala nasional, tetapi lewat sinyal lokal (4–20 mA/Modbus), bukan membuka intranet. Untuk TA: testbed laboratorium.",
    sec(
      "Dua arti “integrasi RTU”",
      ol([
        "<b>FTM membaca sinyal RTU</b> (status PLN OFF / genset ON) sebagai konteks. Lebih aman diambil langsung dari sumber sinyal yang sama lewat kontak kering (<i>dry contact</i>, saklar tanpa tegangan) atau optocoupler, dengan izin teknisi.",
        "<b>RTU menerima level solar dari FTM</b> agar tampil di sistem monitoring internal (port “Fuel Level” yang sekarang bernilai 0). Node FTM cukup mengeluarkan 4–20 mA (arus standar industri, 4 mA = kosong, 20 mA = penuh) atau menjadi <i>Modbus slave</i> (perangkat yang ditanya dan menjawab) di jalur RS-485.",
      ]),
    ) +
      sec(
        "Kenapa bernilai",
        p(
          "RTU (Remote Terminal Unit, kotak pengumpul sinyal di STO) sudah terpasang dan terhubung ke sistem monitoring internal. Jika level solar masuk lewat jalur ini, NOC melihatnya di alat yang sudah dipakai sehari-hari. Ini jalan paling realistis menuju skala nasional.",
        ),
      ) +
      sec(
        "Kenapa bukan inti kelulusan",
        ul([
          "Butuh izin resmi dan teknisi, di luar kendali mahasiswa.",
          "Jalur internet → intranet adalah garis merah keamanan (pedoman keamanan OT seperti NIST SP 800-82 menekankan segmentasi jaringan).",
          "Riwayat 2024–25 menunjukkan integrasi bisa macet di birokrasi dan keamanan.",
        ]),
      ) +
      sec(
        "Bentuk di TA",
        p("Testbed di Bandung: node FTM → 4–20 mA/Modbus → PLC atau simulator Modbus. Ukur keakuratan konversi dan latensi. Hasilnya menjadi proposal integrasi yang bisa diajukan ke tim internal."),
      ) +
      table(
        ["Opsi", "Butuh internet?", "Risiko keamanan", "Effort"],
        [
          ["Reverse proxy publik → RTU intranet", "Ya", "Tinggi (dihindari)", "Sedang"],
          ["Baca pesan bot monitoring internal", "Ya", "Sedang (butuh akun/izin)", "Rendah–sedang"],
          ["Sinyal lokal node → RTU (4–20 mA/Modbus)", "Tidak", "Rendah", "Sedang (hardware)"],
          ["Kontak kering status genset → node", "Tidak", "Rendah (dengan izin)", "Rendah"],
        ],
      ),
    ["S-NIST82", "S-MODBUS", "R-CHAT"],
    ["i-rtu-old", "i-rtu-port", "f2-rtuout"],
  ),
  decision(
    "d-ml",
    "Perlu machine learning untuk prediksi kapan isi ulang atau berapa lama bertahan?",
    "later",
    "Belum sebagai inti",
    "Mulai dengan statistik + signal processing yang bisa dijelaskan. ML masuk setelah data ≥ 6–12 bulan dan ada label kejadian.",
    sec(
      "Membedah setiap ide",
      table(
        ["Ide", "Butuh ML?", "Pendekatan yang lebih jujur"],
        [
          ["Prediksi kapan harus isi ulang", "Tidak", "Kapan solar habis ditentukan kapan PLN padam, sesuatu yang di luar kendali. Petugas juga sudah mengisi sebelum kritis."],
          ["Berapa jam genset bisa bertahan", "Tidak", "Sisa liter ÷ laju konsumsi. Laju diukur dari episode genset menyala (regresi sederhana per site)."],
          ["“Kuat berapa kali pemadaman lagi?”", "Tidak", "Sisa liter ÷ median liter per pemadaman di site itu, bisa dengan simulasi Monte Carlo dari histori pemadaman."],
          ["Deteksi anomali (bocor/pencurian)", "Nanti", "Awali dengan aturan + CUSUM (deteksi perubahan kumulatif) pada residu, lalu ML bila kejadian berlabel cukup."],
          ["Deteksi sensor rusak/macet", "Tidak", "Aturan: nilai identik terlalu lama, lompatan ke batas, variansi nol."],
          ["Membersihkan noise", "Tidak", "Filter Kalman (klasik, sangat ‘telekomunikasi’)."],
          ["Keputusan interval kirim & tanda curiga yang bisa dijelaskan", "Opsional", "Logika fuzzy: aturan linguistik (misalnya JIKA level turun cepat DAN genset mati MAKA curigai) ringan di mikrokontroler dan mudah dijelaskan. Bisa diuji sebagai varian di E5."],
        ],
      ),
    ) +
      sec(
        "Missing value",
        p("Ya, wajib ditangani. Caranya bukan mengisi data palsu: tandai jeda, jangan interpolasi melewati refill, dan kirim ulang data yang tertahan di perangkat."),
      ) +
      sec(
        "Nilai untuk CV",
        p("Pemilihan metode yang tepat dan bisa dipertanggungjawabkan (serta berani bilang “ML tidak perlu di sini”) justru dihargai di wawancara Data Science. Model yang dilatih pada 3 kejadian hanya akan jadi pertanyaan jebakan."),
      ),
    ["L-CUSUM", "L-KALMAN", "L-THEFT"],
    ["p-refill", "c-filter", "f2-anomaly"],
  ),
  decision(
    "d-notify",
    "Apakah cukup notifikasi sederhana “di bawah X%”?",
    "yes",
    "Ya untuk MVP, tambah yang berbasis kejadian",
    "Notifikasi ambang tetap perlu, tetapi yang paling bernilai: refill terdeteksi (berapa liter), penurunan tak wajar, dan perangkat mati.",
    sec(
      "Notifikasi yang disarankan",
      table(
        ["Jenis", "Contoh isi", "Anti-spam"],
        [
          ["Ambang level", "Level 28% (±1.340 L), estimasi 14 jam genset", "Histeresis (baru pulih jika &gt; ambang + 5%)"],
          ["Refill terdeteksi", "+180 L pukul 10.12 — cocokkan dengan nota?", "Satu pesan per kejadian"],
          ["Penurunan tak wajar", "Turun 12 L saat genset mati (01.00–04.00)", "Konfirmasi 2 pembacaan"],
          ["Genset menyala", "Konsumsi 6,1 L/jam; sisa ±32 jam", "Ringkas tiap 30 menit"],
          ["Perangkat offline / sensor macet", "Tidak ada data 2× interval", "Cooldown 1 jam"],
          ["Ringkasan harian", "Status semua STO pukul 07.00", "Satu pesan"],
        ],
      ),
    ) +
      p("Kuncinya: pesan harus berisi <b>konteks + tindakan</b>, bukan sekadar angka. Petugas berpengalaman sudah tahu kapan mengisi. Yang mereka butuhkan adalah kejadian yang tidak mereka lihat."),
    ["R-CHAT"],
    ["f2-notify", "i-tgonboard"],
  ),
  decision(
    "d-chatbot",
    "Perlu chatbot AI untuk menjawab pertanyaan teknis?",
    "later",
    "Opsional (Could)",
    "Bukan inti TA. Kalau dibuat: RAG atas SOP + query data read-only, jawaban wajib menampilkan sumber.",
    sec(
      "Pertimbangan",
      ul([
        "Tiga pilar dosen (akurasi, transmisi hemat energi, kajian efektif-efisien) tidak membutuhkan chatbot.",
        "Risiko halusinasi (AI mengarang jawaban) berbahaya untuk angka operasional seperti sisa solar.",
        "Ada biaya dan privasi: data internal dikirim ke layanan AI pihak ketiga.",
        "Kamu sudah punya proyek RAG; nilai tambah CV dari chatbot lagi relatif kecil dibanding hasil eksperimen energi/akurasi.",
      ]),
    ) +
      sec(
        "Jika tetap dibuat (setelah inti selesai)",
        ol([
          "Mulai dari perintah deterministik di Telegram: <code>/status STO</code>, <code>/runtime</code>, <code>/refill</code>. Tanpa AI, tanpa halusinasi.",
          "Tambahkan asisten yang hanya menjawab dari SOP/manual (RAG) dan memanggil fungsi baca-saja untuk angka.",
          "Tampilkan sumber dan waktu data di setiap jawaban, catat pertanyaan yang gagal.",
        ]),
      ),
    ["R-CHAT"],
    ["i-llm"],
  ),
  decision(
    "d-installer",
    "Bisakah pemasangan IoT dibuat semudah isi form lalu unduh?",
    "yes",
    "Ya, dan bisa lebih baik: tanpa compile",
    "Satu firmware dibangun otomatis, diinstal dari browser, lalu konfigurasi tangki dikirim server saat perangkat diklaim.",
    sec(
      "Alur usulan",
      ol([
        "Teknisi mengisi form lokasi & dimensi tangki di web (sudah ada di v1).",
        "Admin menyetujui, sistem membuat <b>kode klaim sekali pakai</b> (bukan mengirim kunci lewat email).",
        "Teknisi membuka halaman installer di Chrome/Edge, colok USB, klik Install. <b>ESP Web Tools</b> memasang firmware lewat Web Serial.",
        "Wi-Fi diatur lewat <b>Improv</b> (standar terbuka untuk setting Wi-Fi via serial/BLE), lalu masukkan kode klaim.",
        "Perangkat terdaftar, server mengirim konfigurasi tangki, lalu wizard kalibrasi berjalan.",
      ]),
    ) +
      table(
        ["", "v1 (ZIP + Arduino IDE)", "Usulan (web installer)"],
        [
          ["Compile", "Di laptop teknisi", "Sekali di CI (otomatis)"],
          ["Bentrok library", "Mungkin", "Tidak ada"],
          ["Rahasia di email", "Kunci ada di paket", "Kode klaim sekali pakai"],
          ["Ubah dimensi tangki", "Compile ulang", "Ubah di dashboard"],
          ["Batasan", "–", "Web Serial tidak tersedia di iOS"],
        ],
      ),
    ["D-EWT", "D-IMPROV", "D-PIO"],
    ["i-compile", "f2-installer"],
  ),
  decision(
    "d-telegram",
    "Apa peran Telegram (termasuk pesan bot monitoring internal)?",
    "cond",
    "Kanal notifikasi, bukan sumber kebenaran",
    "Telegram tetap untuk notifikasi & perintah. Membaca pesan bot lain butuh akses resmi. Bot-to-bot Telegram pun hanya untuk mention/reply.",
    sec(
      "Fakta teknis",
      ul([
        "Secara default bot Telegram <b>tidak bisa melihat</b> pesan dari bot lain.",
        "Fitur bot-to-bot (opt-in) hanya mengirim pesan yang me-<i>mention</i> bot tujuan atau membalas pesannya, dan salah satu bot harus mengaktifkan mode tersebut.",
        "Jadi “listener” pesan bot monitoring internal butuh akun/akses resmi. Format pesan juga bisa berubah sewaktu-waktu sehingga regex rapuh.",
      ]),
    ) +
      sec(
        "Rekomendasi",
        p("Konteks PLN/genset diambil secara <b>lokal</b> (relay/optocoupler, sensor getaran/arus). Pesan bot internal hanya menjadi data pembanding (<i>cross-check</i>) bila ada izin. Telegram FTM fokus pada notifikasi yang bisa ditindaklanjuti."),
      ),
    ["D-TGB2B", "R-CHAT"],
    ["i-context", "f2-context"],
  ),
  decision(
    "d-mqtt",
    "HTTP atau MQTT?",
    "cond",
    "HTTP + policy untuk produksi, MQTT sebagai pembanding",
    "Vercel tidak bisa menjadi broker MQTT. HTTP adaptif paling sederhana. MQTT diuji di eksperimen karena bisa kirim perintah instan.",
    table(
      ["Aspek", "HTTPS POST (adaptif)", "MQTT over TLS"],
      [
        ["Server", "Vercel/Hono biasa", "Broker (Mosquitto/EMQX) di VPS atau layanan terkelola"],
        ["Perintah ke perangkat", "Lewat balasan (tertunda sampai kirim berikutnya)", "Instan (subscribe topik)"],
        ["Biaya koneksi", "Handshake tiap sesi (bisa dipakai ulang)", "Koneksi persisten + keep-alive"],
        ["Energi", "Bagus bila jarang kirim + radio tidur", "Bagus bila sering kirim; boros bila koneksi harus dijaga saat tidur"],
        ["Kerumitan", "Rendah", "Sedang (broker, ACL, sertifikat)"],
      ],
    ) + p("Riset energi pada ESP32 menunjukkan TLS/DTLS dan pola koneksi sangat menentukan konsumsi. Karena itu keputusan diambil dari hasil ukur, bukan asumsi."),
    ["S-MQTT", "S-COAP", "L-TLSENERGY"],
    ["c-policy", "e4"],
  ),
  decision(
    "d-lpwan",
    "Perlu LoRa atau NB-IoT?",
    "later",
    "Sebagai varian eksperimen",
    "Relevan untuk tangki tanpa listrik/Wi-Fi (kasus tangki bulanan). Sangat selaras dengan jurusan Telekomunikasi: link budget, duty cycle, energi per bit.",
    p("Kasus nyata 8 September (tangki bulanan belum ada stop kontak) menunjukkan ada tangki yang sulit dijangkau listrik dan Wi-Fi. LoRa ke gateway di gedung STO atau jaringan LoRaWAN Telkom (Antares) bisa jadi solusi hemat energi.") +
      p("Untuk TA, cukup satu jalur LPWAN (<i>Low Power Wide Area Network</i>) sebagai pembanding: ukur energi per pesan, packet delivery ratio, dan jangkauan di lingkungan STO."),
    ["L-LPWAN", "D-ANTARES"],
    ["c-radio", "i-nooutlet"],
  ),
  decision(
    "d-bandung",
    "Bisakah direplikasi di Bandung padahal lapangan di Pasuruan?",
    "yes",
    "Ya: testbed lab + data lapangan jarak jauh",
    "Uji geometri/energi/transmisi di lab Bandung. Perangkat Pasuruan tetap mengirim ke cloud. Tangki genset kampus bisa jadi uji nyata bila diizinkan.",
    ol([
      "<b>Testbed air</b>: tiga model tangki kecil (balok, silinder tidur + kepala, silinder tegak), gelas ukur/flow meter sebagai acuan. Aman dan murah.",
      "<b>Bangku energi</b>: INA226 atau Power Profiler untuk mengukur energi per pesan dan per hari.",
      "<b>Data lapangan</b>: perangkat di Pasuruan tetap mengirim ke cloud, sehingga tim di Bandung bisa menganalisis dari jauh.",
      "<b>Tangki solar kampus</b>: dengan izin bagian fasilitas, satu node non-intrusif bisa memberi data diesel nyata.",
      "<b>Sinergi riset</b>: pembimbing punya publikasi monitoring tangki air hujan TelU berbasis ultrasonik. Metode kalibrasinya bisa diadaptasi.",
    ]),
    ["L-SUGESTI"],
    ["e1", "e4"],
  ),
  decision(
    "d-longterm",
    "Apa nilai jangka panjang untuk Telkom (termasuk keuangan)?",
    "yes",
    "Ada, dan terbesar di data",
    "Data level + kejadian bisa menjadi analitik biaya BBM, audit pengisian, benchmark genset, statistik pemadaman, dan pelaporan emisi.",
    table(
      ["Analitik", "Pertanyaan yang dijawab", "Nilai"],
      [
        ["Konsumsi per jam genset per site", "Genset mana paling boros?", "Prioritas perawatan"],
        ["Rekonsiliasi refill vs nota", "Apakah liter yang dibayar = liter yang masuk?", "Deteksi kehilangan"],
        ["Penurunan saat genset mati", "Ada bocor/pencurian?", "Pencegahan kerugian"],
        ["Statistik pemadaman dari episode genset", "Berapa kali & berapa lama PLN padam per site?", "Data negosiasi/eskalasi ke PLN"],
        ["Perencanaan rute pengisian", "STO mana diisi bersamaan?", "Hemat logistik"],
        ["Emisi CO₂e dari solar terbakar", "Berapa emisi genset per bulan?", "Pelaporan keberlanjutan (±2,5–2,7 kg CO₂e per liter, tergantung campuran)"],
      ],
    ) + p("Literatur industri telekomunikasi juga menyoroti pencurian dan salah kelola BBM di site. Nilai ini baru nyata bila datanya akurat (pilar 1) dan berkelanjutan biayanya (pilar 2–3)."),
    ["L-KUMAR", "L-THEFT", "D-GHG"],
    ["p-nohistory", "f2-report"],
  ),
  decision(
    "d-need",
    "Sebenarnya Telkom butuh atau tidak?",
    "cond",
    "Butuh visibilitas, adaptif perlu dibuktikan",
    "FTM v1 sudah menjawab kebutuhan visibilitas. TA harus membuktikan dengan angka kapan efisiensi layak (skala, tanpa listrik, biaya).",
    p("Pandangan lapangan yang jujur: server bisa saja ditambah limitnya atau dipindah ke intranet. Maka TA tidak boleh mengklaim “Telkom wajib memakai ini”.") +
      ul([
        "Tunjukkan kurva biaya/energi terhadap jumlah STO (5 → 29 → ratusan).",
        "Tunjukkan kasus tangki tanpa stop kontak yang hanya bisa dipantau oleh node hemat energi.",
        "Tunjukkan akurasi yang terukur, agar data layak untuk keputusan dan audit.",
        "Tawarkan desain yang bisa di-<i>host</i> internal (Docker Compose), sehingga keputusan ada di tangan Telkom.",
      ]),
    ["R-CHAT"],
    ["i-worth"],
  ),
  decision(
    "d-rebuild",
    "Rebuild dari nol?",
    "cond",
    "Ya untuk kode, tidak untuk operasi",
    "Bangun FTM 2.0 bersih, tetapi v1 tetap melayani lapangan. Pindahkan perangkat bertahap (shadow mode).",
    ol([
      "<b>Jangan matikan v1</b>: pengguna lapangan sudah memakainya.",
      "Ambil pelajaran & tes perilaku v1 (volume, status, normalisasi), bukan menyalin kode.",
      "FTM 2.0 menerima data paralel dari 1–2 perangkat uji (<i>shadow mode</i>, berjalan diam-diam untuk dibandingkan).",
      "Migrasi data histori v1 ke skema baru dengan skrip.",
      "Pindahkan STO satu per satu setelah hasilnya setara atau lebih baik.",
    ]),
    ["R-REPO"],
    ["i-bloat", "d-repo"],
  ),
  decision(
    "d-repo",
    "Monorepo atau BE & FE terpisah seperti CoE BHT?",
    "yes",
    "Monorepo, dua aplikasi terpisah",
    "Satu repo berisi apps/web, apps/api, packages/core, firmware, experiments. Deploy terpisah, kode domain dipakai bersama.",
    sec(
      "Tiga istilah yang sering tertukar",
      table(
        ["Istilah", "Arti", "Contoh"],
        [
          ["Monolith", "Satu aplikasi berisi UI + API", "FTM v1 (Next.js melayani halaman & API)"],
          ["Monorepo", "Satu repositori berisi beberapa aplikasi/paket", "Usulan FTM 2.0"],
          ["Polyrepo", "Satu repositori per aplikasi", "CoE BHT (web, server, RAG terpisah)"],
        ],
      ),
    ) +
      sec(
        "Kenapa monorepo untuk tim 2 orang",
        ul([
          "Rumus volume, skema validasi, dan tipe data dipakai bersama API, web, dan tes. Cukup satu sumber.",
          "Satu PR bisa mengubah API + web secara konsisten.",
          "Tetap terpisah saat deploy: web ke Vercel, API ke Vercel/VPS.",
          "CoE BHT memakai polyrepo karena timnya besar dengan peran berbeda. Konteksnya tidak sama.",
        ]),
      ),
    ["D-BHT", "D-PZN"],
    ["stack-repo"],
  ),
  decision(
    "d-archify",
    "Perlu memakai archify?",
    "later",
    "Opsional untuk dokumentasi",
    "Archify adalah skill AI agent untuk membuat diagram arsitektur/alur HTML interaktif. Cocok untuk proposal dan slide, bukan fondasi website.",
    p("Archify mengubah deskripsi menjadi diagram arsitektur, workflow, sequence, data-flow, dan lifecycle yang bisa diekspor. Diagram di halaman ini dibuat langsung agar menyatu dengan penjelasan yang bisa diklik.") +
      p("Saran: gunakan archify nanti untuk diagram proposal TA dan slide sidang (misalnya sequence diagram mesin status). Pasang hanya setelah kamu setuju, karena ia menambah skill ke agent secara global."),
    ["D-ARCHIFY"],
    [],
  ),
  decision(
    "d-major",
    "Apakah ini sejalan dengan Teknik Telekomunikasi dan arah karier?",
    "yes",
    "Sangat sejalan",
    "Signal processing, protokol, radio, energi per bit, catu daya telekomunikasi, dan OSS/NMS semuanya ada di proyek ini.",
    table(
      ["Materi kuliah/bidang", "Di mana muncul di TA"],
      [
        ["Pengolahan sinyal (DSP)", "Deteksi gema ultrasonik, median/MAD, filter Kalman"],
        ["Sistem komunikasi & jaringan data", "HTTP/TLS/MQTT/CoAP, overhead protokol, byte per pesan"],
        ["Propagasi & radio", "Wi-Fi vs LoRa vs NB-IoT, link budget, RSSI"],
        ["Probabilitas & statistik", "Error budget, MAE, CUSUM, Monte Carlo pemadaman"],
        ["Elektronika & catu daya", "DC −48 V, DC-DC terisolasi, arus tidur, baterai"],
        ["Infrastruktur telekomunikasi (CME)", "Genset, ATS, rectifier, RTU, availability 99,99%"],
        ["Data & ML", "Pipeline time-series, kualitas data, analitik konsumsi"],
      ],
    ),
    [],
    ["career"],
  ),
];

// ------------------------------------------------------- 8. fitur 2.0 --
const feat = (id, prio, pillar, name, why, detail, refs = []) => ({ id, prio, pillar, name, why, detail, refs });

export const FEATURES = [
  feat("f2-geometry", "Must", 1, "Pustaka geometri multi-tangki", "Balok, silinder tegak, silinder tidur, kepala elips/hemisferis, tabel kalibrasi.", p("Satu modul TypeScript bersama (dipakai API, web, tes) dan versi C++ di firmware. Setiap bentuk diuji dengan volume acuan.") + p("Rumus lengkapnya dipakai langsung oleh visual 3D di bagian atas halaman ini."), ["D-NEUTRIUM", "S-ISO12917"]),
  feat("f2-calib", "Must", 1, "Wizard kalibrasi di lapangan", "Titik referensi dipstick/refill → offset & tabel koreksi per tangki.", p("Teknisi memasukkan pembacaan dipstick 3–5 kali pada level berbeda. Sistem menghitung offset dan menilai kecocokan (MAE). Refill dengan nota menjadi titik uji tambahan otomatis."), ["S-ISO12917"]),
  feat("f2-tempcomp", "Must", 1, "Kompensasi suhu + filter + penanda kualitas", "DS18B20 di dekat sensor; median/MAD; Kalman; flag ok/edge/stuck/gap/suspect.", p("Menjawab temuan " + xref("f-sound", "kecepatan suara konstan") + " dan " + xref("f-edge", "nilai batas") + "."), ["L-KINSLER", "L-KALMAN"]),
  feat("f2-fsm", "Must", 2, "Firmware v2: mesin status adaptif", "SLOW/FAST/EVENT/BUFFER dengan send-on-delta.", p("Inti pilar 2. Semua parameter (ambang delta, heartbeat, burst) diatur dari server lewat policy."), ["L-SOD"]),
  feat("f2-buffer", "Must", 2, "Store-and-forward + batch + anti-duplikat", "Data disimpan saat internet putus, dikirim sekaligus, dengan kunci idempoten.", p("Setiap pembacaan punya nomor urut. Server menolak duplikat (idempoten: kiriman ulang tidak dihitung dua kali). Kejadian saat offline tidak hilang.")),
  feat("f2-payload", "Must", 2, "Payload ringkas + versi konfigurasi", "±100 B JSON / ±60 B CBOR; konfigurasi hanya dikirim saat berubah.", p("Mengganti payload ±1,5 KB berisi field ganda. Lihat " + xref("f-payload", "temuan payload") + "."), ["S-CBOR"]),
  feat("f2-events", "Must", 1, "Deteksi kejadian di server", "Refill, konsumsi genset, penurunan tak wajar, sensor macet, offline.", p("Aturan + CUSUM pada perubahan volume. Setiap kejadian disimpan sebagai entitas (bukan hanya angka) sehingga bisa diaudit dan dilaporkan."), ["L-CUSUM"]),
  feat("f2-notify", "Must", 3, "Notifikasi Telegram berbasis kejadian", "Pesan berkonteks + tindakan, dengan histeresis dan cooldown.", p("Lihat " + xref("d-notify", "jenis notifikasi") + ".")),
  feat("f2-energylab", "Must", 2, "Instrumen ukur energi & dashboard eksperimen", "INA226/Power Profiler, log mWh per mode, perbandingan strategi.", p("Tanpa pengukuran, klaim “hemat energi” tidak bisa dipertahankan di sidang. Log energi disimpan berdampingan dengan log pesan."), ["D-ESP8266LP", "D-ESP32C3"]),
  feat("f2-security", "Must", 3, "Keamanan dasar", "TLS terverifikasi, OTA bertanda tangan, rahasia terkelola, rotasi kredensial, CSP.", p("Menutup temuan " + xref("f-tls", "TLS") + ", " + xref("f-ota", "OTA") + ", " + xref("f-secrets", "rahasia") + "."), ["S-TLS13", "S-NIST82"]),
  feat("f2-runtime", "Should", 1, "Estimasi runtime dari laju konsumsi nyata", "Burn-rate per site dari episode genset menyala + rentang ketidakpastian.", p("Menggantikan rumus v1. Juga menjawab “masih kuat berapa kali pemadaman lagi?” dari histori per site."), ["D-HOMER"]),
  feat("f2-context", "Should", 2, "Input konteks daya lokal", "Optocoupler/relay catuan PLN, sensor getaran/arus genset, atau kontak kering (dengan izin).", p("Membuat mode FAST menyala tepat saat genset bekerja tanpa menunggu level turun, dan memberi makna pada penurunan level.")),
  feat("f2-installer", "Should", 3, "Web installer + klaim perangkat", "ESP Web Tools + Improv; tanpa compile; kode klaim sekali pakai.", p("Lihat " + xref("d-installer", "alur lengkap") + "."), ["D-EWT", "D-IMPROV"]),
  feat("f2-report", "Should", 3, "Laporan bulanan & rekonsiliasi refill", "Konsumsi, jam genset, refill vs nota, ekspor PDF/CSV.", p("Nilai bisnis paling cepat terasa bagi manajemen. Lihat " + xref("d-longterm", "nilai jangka panjang") + ".")),
  feat("f2-honestui", "Should", 3, "Grafik jujur + realtime hemat", "Jeda terlihat, kualitas diberi warna, SSE/polling hanya saat terlihat.", p("Menutup temuan " + xref("f-helpdesk", "polling 5 detik") + " dan isu " + xref("i-gap", "grafik menyambung") + ".")),
  feat("f2-usage", "Should", 3, "Monitor kuota & biaya", "Request, CPU, memori, storage per bulan + proyeksi habis.", p("Supaya kejadian 24 Agustus tidak terulang tanpa peringatan.")),
  feat("f2-lpwan", "Could", 2, "Jalur LoRa/NB-IoT untuk tangki tanpa listrik/Wi-Fi", "Node baterai + gateway di gedung STO atau LoRaWAN operator.", p("Varian eksperimen pilar 2. Lihat " + xref("d-lpwan", "pertimbangan") + "."), ["L-LPWAN", "D-ANTARES"]),
  feat("f2-fuzzy", "Could", 2, "Kebijakan kirim berbasis logika fuzzy (varian riset)", "Interval kirim ditentukan aturan fuzzy yang bisa dijelaskan, dibanding aturan ambang biasa.", p("Masukan: laju perubahan level, status genset, tegangan catu, kualitas sinyal. Keluaran: interval kirim dan tingkat kecurigaan. Kelebihannya transparan (setiap keputusan bisa ditelusuri ke aturan) dan ringan untuk mikrokontroler. Dibandingkan dengan strategi D di eksperimen E5."), ["L-SOD"]),
  feat("f2-rtuout", "Could", 3, "Keluaran lokal ke RTU (4–20 mA / Modbus RTU)", "Testbed dengan PLC/simulator Modbus; tanpa jalur internet → intranet.", p("Lihat " + xref("d-rtu", "Perlu RTU?") + "."), ["S-MODBUS", "S-NIST82"]),
  feat("f2-assistant", "Could", 3, "Asisten tanya-jawab (RAG + query read-only)", "Hanya dari SOP & data; jawaban bersumber.", p("Lihat " + xref("d-chatbot", "pertimbangan chatbot") + ".")),
  feat("f2-anomaly", "Could", 3, "Deteksi anomali berbasis ML", "Setelah data ≥ 6–12 bulan dan kejadian berlabel cukup.", p("Isolation forest atau model residu. Dibandingkan dengan baseline CUSUM, bukan menggantikan tanpa bukti."), ["L-CUSUM"]),
  feat("f2-esg", "Could", 3, "Ringkasan emisi CO₂e", "Liter solar terbakar × faktor emisi resmi perusahaan.", p("Nilai pelaporan keberlanjutan. Pakai faktor emisi yang ditetapkan perusahaan."), ["D-GHG"]),
  feat("f2-radar", "Could", 1, "Sensor radar 60 GHz sebagai pembanding", "Akurasi milimeter, tetapi pantulan dari solar lebih lemah daripada air.", p("Menambah dimensi RF yang kuat untuk profil telekomunikasi. Uji di E3."), ["D-A121"]),
  feat("w-control", "Won't", 3, "Kontrol otomatis genset/katup/pompa", "Safety-critical; di luar kewenangan dan scope TA.", p("FTM tetap sistem pemantauan dan pendukung keputusan.")),
  feat("w-intranet", "Won't", 3, "Koneksi langsung ke intranet/sistem internal tanpa izin", "Risiko keamanan & kebijakan perusahaan.", p("Semua integrasi internal lewat jalur resmi.")),
  feat("w-mobile", "Won't", 3, "Aplikasi mobile native", "Web responsif + Telegram sudah cukup untuk pengguna lapangan.", p("Hemat waktu untuk hal yang dinilai di TA.")),
];

// --------------------------------------------------------- 9. stack --
export const STACK_ROWS = [
  {
    id: "stack-repo",
    layer: "Struktur repo",
    v1: "Satu repo, satu aplikasi (monolith Next.js)",
    bht: "Polyrepo: web, server, RAG terpisah",
    pzn: "—",
    rec: "Monorepo: apps/web, apps/api, packages/core, firmware, experiments",
    detail: p("Lihat " + xref("d-repo", "penjelasan monorepo vs polyrepo") + ". Pakai workspace pnpm atau Bun agar paket bersama mudah dipakai."),
    refs: ["D-BHT"],
  },
  {
    id: "stack-lang",
    layer: "Bahasa",
    v1: "TypeScript + C++ (Arduino)",
    bht: "TypeScript + Python (worker)",
    pzn: "TypeScript",
    rec: "TypeScript (web/API) · C++ PlatformIO (firmware) · Python (analisis eksperimen)",
    detail: p("Python dipakai untuk notebook analisis hasil eksperimen (grafik, statistik), sesuai kekuatan Data Science kamu. Aplikasi tetap TypeScript agar tim cukup menguasai satu bahasa untuk web/API."),
    refs: [],
  },
  {
    id: "stack-runtime",
    layer: "Runtime",
    v1: "Node.js (Vercel)",
    bht: "Node.js 24 LTS",
    pzn: "Bun",
    rec: "Node.js LTS untuk produksi; Bun opsional untuk install/test",
    detail: p("Bun cepat dan kini didukung sebagai runtime di Vercel Functions. Untuk sistem operasional yang dirawat orang lain, Node LTS adalah pilihan paling aman karena ekosistem dan dukungannya paling luas. Karena Hono berjalan di keduanya, pindah runtime nanti murah."),
    refs: ["D-BUN", "D-VERCELBUN"],
  },
  {
    id: "stack-api",
    layer: "Framework API",
    v1: "Next.js route handlers",
    bht: "NestJS (modular monolith)",
    pzn: "ElysiaJS",
    rec: "Hono",
    detail:
      table(
        ["Pilihan", "Kelebihan", "Kekurangan"],
        [
          ["Hono", "Sangat ringan, portabel (Node/Bun/Vercel/Cloudflare), cocok untuk endpoint ingest", "Struktur harus didisiplinkan sendiri"],
          ["ElysiaJS", "Cepat di Bun, tipe end-to-end", "Paling optimal di Bun; ekosistem lebih kecil"],
          ["NestJS", "Struktur jelas, cocok tim besar (pengalaman BHT)", "Berat untuk API kecil, cold start lebih lama"],
          ["Next.js API", "Satu app dengan UI (v1)", "Ingest dan UI berbagi kuota & siklus deploy"],
        ],
      ),
    refs: ["D-HONO", "D-ELYSIA", "D-NEST"],
  },
  {
    id: "stack-web",
    layer: "Web dashboard",
    v1: "Next.js 16 + React 19",
    bht: "Next.js (repo sendiri)",
    pzn: "Svelte",
    rec: "Next.js (SvelteKit bila tim ingin lebih ringan)",
    detail: p("Next.js paling dekat dengan skill kamu dan pasar kerja (Indonesia & Jepang) paling luas. SvelteKit menghasilkan bundle lebih kecil dan kodenya ringkas, tetapi ada biaya belajar. Keduanya bisa di-deploy ke Vercel."),
    refs: ["D-NEXT", "D-SVELTE"],
  },
  {
    id: "stack-db",
    layer: "Database & ORM",
    v1: "MySQL (Aiven free) + SQL manual (mysql2)",
    bht: "PostgreSQL (Neon) + Drizzle",
    pzn: "Drizzle",
    rec: "PostgreSQL + Drizzle; TimescaleDB bila self-host",
    detail: p("Drizzle memberi tipe data aman tanpa menyembunyikan SQL. PostgreSQL + TimescaleDB menyediakan <i>continuous aggregate</i> (rollup otomatis) dan retensi, fitur yang di v1 dibuat manual. Bila Telkom mensyaratkan MySQL, Drizzle juga mendukung MySQL."),
    refs: ["D-DRIZZLE", "D-TIMESCALE", "D-AIVEN"],
  },
  {
    id: "stack-telemetry",
    layer: "Protokol telemetri",
    v1: "HTTPS POST tetap 15–20 detik, JSON ±1,5 KB",
    bht: "—",
    pzn: "—",
    rec: "HTTPS + policy-in-response (default); MQTT/LoRa sebagai pembanding eksperimen",
    detail: p("Lihat " + xref("d-mqtt", "HTTP vs MQTT") + " dan " + xref("c-policy", "policy-in-response") + "."),
    refs: ["S-MQTT"],
  },
  {
    id: "stack-fw",
    layer: "Firmware",
    v1: "Arduino IDE, ESP8266, template ZIP",
    bht: "—",
    pzn: "—",
    rec: "ESP32-C3/S3 + PlatformIO + CI build + ESP Web Tools",
    detail: p("ESP32 memberi RAM lebih besar untuk TLS, akselerasi kripto, secure boot, BLE untuk provisioning, dan lebih dari satu UART (dibutuhkan RS-485 ke RTU). PlatformIO memungkinkan build otomatis di CI."),
    refs: ["D-PIO", "D-ESP32C3", "D-EWT"],
  },
  {
    id: "stack-auth",
    layer: "Autentikasi",
    v1: "Custom (Argon2id, OTP, Turnstile)",
    bht: "Better Auth",
    pzn: "—",
    rec: "Better Auth (atau pertahankan desain v1 yang sudah teruji)",
    detail: p("Jangan menulis ulang kriptografi dari nol. Better Auth sudah kamu kenal dari BHT. Alternatifnya, bawa desain v1 yang sudah punya tes."),
    refs: ["D-BETTERAUTH"],
  },
  {
    id: "stack-quality",
    layer: "Kualitas kode",
    v1: "ESLint + Vitest (160 tes) + CI",
    bht: "ESLint/Prettier, Jest, Testcontainers, commitlint",
    pzn: "Bun test/linter",
    rec: "Biome + Vitest + Playwright + CI + Conventional Commits",
    detail: p("Biome menggabungkan format dan lint dalam satu alat yang cepat. Playwright menguji tampilan ponsel, mencegah bug seperti tombol setuju yang tak terjangkau."),
    refs: ["D-BIOME"],
  },
  {
    id: "stack-secrets",
    layer: "Rahasia & konfigurasi",
    v1: ".env (pernah tersebar di chat)",
    bht: "Infisical self-hosted",
    pzn: "—",
    rec: "Environment Vercel + secret manager + rotasi berkala",
    detail: p("Aturan tim: rahasia tidak pernah dikirim lewat chat. Gunakan akun per orang."),
    refs: ["D-BHT"],
  },
  {
    id: "stack-deploy",
    layer: "Deploy",
    v1: "Vercel + Aiven (gratis)",
    bht: "Podman + Caddy + Cloudflare Tunnel",
    pzn: "—",
    rec: "Web di Vercel · API di Vercel/VPS · Docker Compose siap untuk server internal",
    detail: p("Dengan telemetri adaptif, API ingest muat di kuota gratis untuk puluhan STO. Untuk ratusan STO atau kebijakan data internal, stack yang sama dijalankan via Docker Compose di server Telkom."),
    refs: ["D-VERCELFAIR"],
  },
];

// --------------------------------------------------- 10. eksperimen --
const exp = (id, code, pillar, name, hypothesis, setup, metrics, success, refs = []) => ({
  id,
  code,
  pillar,
  name,
  hypothesis,
  detail: sec("Hipotesis", p(hypothesis)) + sec("Rancangan & alat", p(setup)) + sec("Metrik", p(metrics)) + sec("Kriteria berhasil (usulan, disepakati dengan pembimbing)", p(success)),
  refs,
});

export const EXPERIMENTS = [
  exp(
    "e1",
    "E1",
    1,
    "Akurasi geometri & kalibrasi multi-tangki",
    "Pustaka geometri + kalibrasi titik referensi menurunkan error volume dibanding pendekatan v1 pada tiga model tangki.",
    "Testbed air: balok, silinder tidur berkepala, silinder tegak. Isi bertahap 20 level dengan gelas ukur/flow meter sebagai acuan. Bandingkan v1 (tanpa kalibrasi) dan v2.",
    "MAE (L dan % kapasitas), error maksimum, repeatability.",
    "MAE ≤ 1–2% kapasitas pada semua model; v2 lebih baik secara signifikan daripada v1 (uji statistik berpasangan).",
    ["S-ISO12917", "D-NEUTRIUM"],
  ),
  exp(
    "e2",
    "E2",
    1,
    "Kompensasi suhu udara",
    "Kompensasi kecepatan suara berbasis sensor suhu menghapus sebagian besar bias akibat panas.",
    "Panaskan ruang udara tangki uji (lampu/pemanas terkontrol, 20→45 °C), level tetap. Catat jarak dengan dan tanpa kompensasi.",
    "Bias (cm & L) per °C, sebelum vs sesudah.",
    "Bias setelah kompensasi &lt; 0,3 cm pada rentang 20–45 °C.",
    ["L-KINSLER"],
  ),
  exp(
    "e3",
    "E3",
    1,
    "Perbandingan sensor",
    "Sensor tahan air berkas sempit memberi pembacaan lebih stabil daripada HC-SR04; radar 60 GHz lebih presisi tetapi sensitif pada jenis cairan.",
    "HC-SR04 vs A02YYUW (vs radar A121 bila tersedia) pada air dan sampel solar kecil (prosedur aman). Uji di dekat dinding, riak, dan uap.",
    "Simpangan baku, persentase gema gagal, error vs acuan, arus rata-rata sensor.",
    "Sensor terpilih punya gema gagal &lt; 1% dan simpangan baku &lt; 0,3 cm.",
    ["D-A02", "D-A121", "L-OPI"],
  ),
  exp(
    "e4",
    "E4",
    2,
    "Energi per pesan & per hari",
    "Radio tidur + koneksi dipakai ulang/kirim seperlunya menurunkan energi harian secara drastis dibanding Wi-Fi selalu menyala + TLS baru tiap kirim.",
    "INA226 (atau Power Profiler) pada 3,3 V. Skenario: v1 (NONE_SLEEP + TLS baru), modem-sleep + TLS dipakai ulang, deep-sleep + Wi-Fi on-demand, MQTT, dan LoRa (opsional).",
    "mJ per pesan, mWh per hari, durasi radio aktif, estimasi umur baterai 18650.",
    "Konfigurasi terpilih ≥ 80–90% lebih hemat daripada v1 pada skenario hari normal.",
    ["L-TLSENERGY", "L-LPWAN", "D-ESP8266LP"],
  ),
  exp(
    "e5",
    "E5",
    2,
    "Strategi transmisi vs kehilangan informasi",
    "Telemetri adaptif mengurangi pesan &gt; 95% tanpa kehilangan kejadian penting.",
    "Replay data nyata v1 (CSV/DB) + kejadian sintetis (refill, genset, bocor) + uji langsung 7 hari. Strategi: tetap 20 dtk, tetap 20 mnt, send-on-delta, adaptif berbasis aturan, dan (opsional) adaptif berbasis logika fuzzy.",
    "Pesan/hari, byte/hari, energi/hari, latensi deteksi refill & genset, RMSE rekonstruksi volume, kejadian terlewat.",
    "Tidak ada refill/genset terlewat; latensi refill ≤ 2 menit; RMSE ≤ error sensor.",
    ["L-SOD", "L-ASTROM"],
  ),
  exp(
    "e6",
    "E6",
    2,
    "Ketahanan: internet putus & listrik padam",
    "Store-and-forward + catu cadangan menjaga data dan kejadian tetap utuh.",
    "Putus Wi-Fi 1–6 jam dan cabut catu utama saat skenario genset. Bandingkan v1 dan v2.",
    "Data hilang (%), duplikat (%), waktu pemulihan, kejadian terlewat.",
    "Data hilang 0% untuk putus ≤ 24 jam (sesuai kapasitas buffer); duplikat 0%.",
    [],
  ),
  exp(
    "e7",
    "E7",
    3,
    "Biaya cloud & skalabilitas",
    "Dengan telemetri adaptif, 29 STO muat di kuota gratis; ratusan STO tetap murah atau bisa self-host.",
    "Load test simulasi 5/29/100/1.000 perangkat terhadap API. Ukur invocations, CPU, memori, pertumbuhan storage.",
    "% kuota per bulan, biaya per perangkat per bulan, p95 latensi API.",
    "29 STO &lt; 20% kuota gratis; biaya marginal per perangkat terdokumentasi.",
    ["D-VERCELFAIR", "D-VERCELPRICE"],
  ),
  exp(
    "e8",
    "E8",
    3,
    "Uji lapangan & evaluasi pengguna",
    "FTM 2.0 memberi data yang cocok dengan pemeriksaan manual dan nota refill, serta dinilai membantu petugas.",
    "1–3 STO selama 4–8 minggu, berjalan paralel dengan v1 (shadow mode). Pencatatan dipstick berkala dan nota refill. Kuesioner singkat (misalnya SUS) ke admin/petugas.",
    "Selisih vs dipstick, selisih refill vs nota, uptime, jumlah notifikasi berguna vs spam, skor kegunaan.",
    "Selisih refill ≤ 2–3%; uptime ≥ 99%; notifikasi palsu &lt; 1 per site per minggu.",
    [],
  ),
];

// ------------------------------------------------------- 11. roadmap --
export const ROADMAP = {
  months: ["Okt 26", "Nov", "Des", "Jan 27", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu"],
  rows: [
    { id: "rm-study", label: "Studi & izin", who: "Bersama", bars: [{ s: 0, e: 2, c: "pw", t: "Literatur, baseline 7 hari, izin data & lapangan" }] },
    { id: "rm-proposal", label: "Proposal TA", who: "Bersama", bars: [{ s: 1, e: 3, c: "pw", t: "Proposal + seminar" }], ms: [{ at: 2.8, t: "Seminar proposal (target)" }] },
    { id: "rm-testbed", label: "Testbed & perangkat", who: "Anggota 2 (lead)", bars: [{ s: 1, e: 4, c: "p1", t: "3 tangki uji, bangku energi, pengadaan" }] },
    { id: "rm-fw", label: "Firmware v2", who: "Anggota 1 (lead)", bars: [{ s: 2, e: 6, c: "p2", t: "Mesin status, buffer, OTA aman, payload ringkas" }] },
    { id: "rm-core", label: "API, DB & geometri", who: "Anggota 1", bars: [{ s: 2, e: 5, c: "p3", t: "Monorepo, ingest+policy, skema, geometri" }] },
    { id: "rm-web", label: "Dashboard & notifikasi", who: "Anggota 2", bars: [{ s: 3, e: 6, c: "p3", t: "Grafik jujur, kejadian, Telegram" }], ms: [{ at: 5.9, t: "Prototype freeze" }] },
    { id: "rm-exp", label: "Eksperimen lab E1–E7", who: "Bersama", bars: [{ s: 4, e: 7, c: "p1", t: "Akurasi, energi, transmisi, biaya" }] },
    { id: "rm-field", label: "Uji lapangan E8", who: "Bersama + lapangan", bars: [{ s: 6, e: 8, c: "pf", t: "1–3 STO, shadow mode" }] },
    { id: "rm-write", label: "Buku TA & paper", who: "Bersama", bars: [{ s: 7, e: 10, c: "pw", t: "Analisis, penulisan, paper konferensi" }], ms: [{ at: 9.5, t: "Sidang (target)" }] },
    { id: "rm-handover", label: "Serah terima", who: "Bersama", bars: [{ s: 9, e: 11, c: "pf", t: "Dokumen, akun organisasi, pelatihan" }] },
  ],
};

// ------------------------------------------------------- 12. karier --
export const CAREER = {
  roles: [
    {
      id: "role-iot",
      name: "IoT / Embedded Engineer",
      proof: "Firmware ESP32 adaptif, pengukuran energi, OTA aman, PCB/enclosure.",
      detail: p("Bukti kuat: angka energi terukur (mWh/hari) dan keandalan (data hilang 0% saat internet putus). Ini jarang dimiliki lulusan baru."),
    },
    {
      id: "role-telco",
      name: "Telecom Infrastructure / Power (CME) Engineer",
      proof: "Pemahaman catu daya STO, genset, ATS, RTU, availability 99,99%.",
      detail: p("Kamu bisa menjelaskan hubungan level BBM dengan ketersediaan layanan, sesuatu yang dicari unit infrastruktur operator."),
    },
    {
      id: "role-oss",
      name: "Network Operations / OSS Automation",
      proof: "Integrasi RTU/Modbus, notifikasi kejadian, pemantauan multi-site.",
      detail: p("OSS (Operations Support System) adalah dunia NOC. Testbed Modbus + desain integrasi aman adalah bukti yang relevan."),
    },
    {
      id: "role-data",
      name: "Data Engineer (time-series)",
      proof: "Pipeline ingest, kualitas data, rollup/retensi, PostgreSQL/Timescale.",
      detail: p("Menangani data sensor yang tidak sempurna (gap, outlier, duplikat) adalah keterampilan inti Data Engineer."),
    },
    {
      id: "role-ds",
      name: "Data Scientist / Applied ML",
      proof: "Eksperimen terkontrol, error budget, CUSUM/Kalman, analisis Pareto energi–informasi.",
      detail: p("Cerita wawancara yang kuat: “saya memilih metode statistik yang bisa dijelaskan dan membuktikannya dengan eksperimen, bukan memaksakan ML.”"),
    },
    {
      id: "role-research",
      name: "Riset / S2",
      proof: "Energy–information trade-off pada event-triggered telemetry; radar vs ultrasonik untuk cairan ber-εr rendah.",
      detail: p("Dua topik ini layak jadi paper konferensi dan bahan motivasi S2 (termasuk lab IoT/sensor network di Jepang)."),
    },
  ],
  bullets: [
    "Designed an event-aware IoT telemetry policy for diesel tanks at telecom sites that cut uplink messages by [X]% and device energy by [Y]% while detecting every refill within [Z] s (validated on [N] field devices).",
    "Built a multi-geometry volume engine with field calibration, reducing volume error from [A]% to [B]% of capacity across rectangular, horizontal-cylinder, and dished-head tanks.",
    "Measured per-message energy for HTTPS, MQTT, and LoRa on ESP32 using an INA226 bench and chose the architecture with a weighted multi-criteria analysis (cost, security, scalability).",
    "Led a 2-person capstone team; migrated a live 8-site pilot to a new monorepo (Hono, Next.js, PostgreSQL) with zero-downtime shadow deployment.",
  ],
  talking: [
    "Masalah nyata: petugas memanjat tangki; data mayoritas datar; kuota cloud habis.",
    "Keputusan berbasis angka: kenapa HTTP adaptif, bukan “pakai MQTT karena keren”.",
    "Batas yang jujur: kenapa ML belum dipakai, kenapa tidak menyentuh intranet.",
    "Dampak: berapa request, energi, dan error yang turun, plus pembuktiannya.",
  ],
};

// ---------------------------------------------------- 13. risiko --
export const RISKS = [
  { id: "rk-permit", risk: "Izin data/lapangan terlambat", impact: "Tinggi", mitigation: "Testbed Bandung + replay data yang sudah ada; lapangan sebagai validasi akhir." },
  { id: "rk-safety", risk: "Keselamatan di area BBM & genset", impact: "Tinggi", mitigation: "Tidak menyentuh panel/genset tanpa teknisi berwenang; sensing non-intrusif; APD; uji solar hanya sampel kecil." },
  { id: "rk-scope", risk: "Scope melebar (chatbot, ML, RTU sekaligus)", impact: "Tinggi", mitigation: "Kunci MoSCoW; Must dulu; fitur Could hanya setelah prototype freeze." },
  { id: "rk-hw", risk: "Hardware rusak/terlambat", impact: "Sedang", mitigation: "Beli cadangan 2×; modul umum; PCB sederhana; catatan BOM." },
  { id: "rk-baseline", risk: "Baseline v1 tidak jelas (15 dtk vs 20 mnt)", impact: "Sedang", mitigation: "Ambil log request 7 hari sebelum eksperimen." },
  { id: "rk-quota", risk: "Kuota cloud habis saat eksperimen", impact: "Sedang", mitigation: "Proyek cloud terpisah untuk eksperimen; monitor kuota; server lokal cadangan." },
  { id: "rk-security", risk: "Kebocoran kredensial lama", impact: "Tinggi", mitigation: "Rotasi semua rahasia sebelum TA dimulai; secret manager." },
  { id: "rk-team", risk: "Beban tidak seimbang di tim 2 orang", impact: "Sedang", mitigation: "Lead per pilar + review silang mingguan + papan tugas." },
  { id: "rk-ownership", risk: "Sistem bergantung akun pribadi", impact: "Sedang", mitigation: "Pindah ke akun organisasi; dokumen serah terima." },
  { id: "rk-claims", risk: "Klaim berlebihan di CV/sidang", impact: "Sedang", mitigation: "Semua angka dari eksperimen; bedakan pilot vs produksi; kontribusi tim dicatat." },
];

// ------------------------------------------ 14. evaluasi dokumen AI --
export const CRITIQUE = [
  { v: "ok", point: "Penghematan harus dimulai dari perangkat; “blok di server” tidak mengurangi request.", note: "Tepat dan sesuai cara kerja tagihan serverless." },
  { v: "ok", point: "Membedakan interval kirim perangkat dan interval refresh dashboard.", note: "Tepat. Dua hal ini sering tertukar." },
  { v: "ok", point: "Mesin status SLOW/FAST/EVENT/BUFFER + policy dari server.", note: "Desain standar yang bisa diuji. Dipakai di cetak biru ini." },
  { v: "ok", point: "ML tidak dipaksakan; mulai rules + statistik.", note: "Sejalan dengan kondisi data." },
  { v: "ok", point: "Bot monitoring internal hanya konteks; perlu izin; hindari intranet.", note: "Sejalan dengan kekhawatiran keamanan dari lapangan." },
  { v: "warn", point: "Pilar akurasi multi-tangki hampir tidak dibahas.", note: "Padahal ini pilar pertama arahan dosen (15 Sep). Perlu geometri, kalibrasi, suhu, kualitas data." },
  { v: "warn", point: "“Hemat energi” diartikan hemat request/DB, dan disarankan “ESP tetap hidup”.", note: "Radio yang selalu menyala justru sumber boros terbesar. Perlu ukur mWh dan pakai mode tidur." },
  { v: "warn", point: "Tidak membahas tangki tanpa listrik/Wi-Fi dan alternatif radio.", note: "Kasus tangki bulanan (8 Sep) membutuhkan node baterai / LPWAN." },
  { v: "warn", point: "Catu daya node & keandalan hardware belum dibahas.", note: "Alat rusak dan sensor ikut mati saat PLN padam adalah masalah nyata." },
  { v: "warn", point: "Belum membedakan tangki harian dan tangki bulanan.", note: "Pompa transfer bisa membuat pola naik-turun yang mirip refill (perlu dikonfirmasi di lapangan)." },
  { v: "warn", point: "Eksperimen belum punya instrumen, ground truth, dan kriteria numerik.", note: "Ditambahkan di bagian Eksperimen (E1–E8)." },
  { v: "bad", point: "Referensi “S. Zafar et al., Sensor Review 2026”.", note: "Yang ditemukan: S. Kumar et al. (2026), judul “An integrated IoT-enabled fuel monitoring system: design, implementation and analysis”, doi 10.1108/SR-12-2025-1058. Periksa ulang sebelum dikutip." },
  { v: "warn", point: "“Bot-to-Bot mode” Telegram sebagai jalan membaca pesan bot internal.", note: "Dokumen resmi: hanya untuk mention/reply antar bot yang opt-in; tidak bisa membaca pasif." },
];

// ------------------------------------------------- 6. arsitektur --
// Koordinat dalam viewBox 1180 × 620. Lane: x-range.
export const ARCH = {
  lanes: [
    { id: "edge", label: "Lapangan (STO)", x: 10, w: 300 },
    { id: "link", label: "Jalur data", x: 320, w: 200 },
    { id: "cloud", label: "Server & data", x: 530, w: 360 },
    { id: "user", label: "Pengguna", x: 900, w: 270 },
  ],
  asis: {
    nodes: [
      { id: "a-sensor", lane: "edge", x: 30, y: 60, w: 260, h: 58, t: "HC-SR04 (ultrasonik)", s: "Tanpa kompensasi suhu, 1/5 gema cukup", risk: true },
      { id: "a-mcu", lane: "edge", x: 30, y: 150, w: 260, h: 64, t: "NodeMCU ESP8266", s: "Wi-Fi selalu on · interval tetap · TLS tak diverifikasi", risk: true },
      { id: "a-power", lane: "edge", x: 30, y: 246, w: 260, h: 58, t: "Adaptor AC 5 V", s: "Ikut padam saat PLN padam", risk: true },
      { id: "a-rtu", lane: "edge", x: 30, y: 400, w: 260, h: 64, t: "RTU (PLC) di STO", s: "Port “Fuel Level” = 0 · terpisah dari FTM", opt: true },
      { id: "a-wifi", lane: "link", x: 336, y: 150, w: 170, h: 64, t: "Wi-Fi STO → Internet", s: "HTTPS POST ±1,5 KB tiap 15–20 dtk" },
      { id: "a-intranet", lane: "link", x: 336, y: 400, w: 170, h: 64, t: "Intranet", s: "Monitoring internal", opt: true },
      { id: "a-next", lane: "cloud", x: 550, y: 130, w: 320, h: 70, t: "Next.js di Vercel (UI + API)", s: "Ingest, validasi, auth, provisioning, helpdesk" },
      { id: "a-db", lane: "cloud", x: 550, y: 240, w: 320, h: 60, t: "Aiven MySQL (free)", s: "Snapshot terbaru + rollup 5 menit" },
      { id: "a-mail", lane: "cloud", x: 550, y: 330, w: 150, h: 52, t: "SMTP email", s: "Link paket firmware" },
      { id: "a-tg", lane: "cloud", x: 720, y: 330, w: 150, h: 52, t: "Bot Telegram", s: "Admin & helpdesk" },
      { id: "a-nms", lane: "cloud", x: 550, y: 400, w: 320, h: 64, t: "Sistem monitoring internal + bot notifikasi", s: "PLN OFF / Genset ON dari RTU", opt: true },
      { id: "a-browser", lane: "user", x: 920, y: 110, w: 230, h: 70, t: "Browser dashboard", s: "Refresh 20 dtk · helpdesk polling 5 dtk", risk: true },
      { id: "a-admin", lane: "user", x: 920, y: 220, w: 230, h: 58, t: "Admin (Telegram)", s: "Setujui akun/perangkat" },
      { id: "a-tech", lane: "user", x: 920, y: 310, w: 230, h: 64, t: "Teknisi lapangan", s: "Compile ZIP firmware di Arduino IDE", risk: true },
      { id: "a-noc", lane: "user", x: 920, y: 400, w: 230, h: 64, t: "NOC / petugas", s: "Melihat notifikasi internal", opt: true },
    ],
    edges: [
      { a: "a-sensor", b: "a-mcu", k: "data" },
      { a: "a-power", b: "a-mcu", k: "" },
      { a: "a-mcu", b: "a-wifi", k: "data", l: "HTTPS" },
      { a: "a-wifi", b: "a-next", k: "data", l: "±5.760 req/hari/alat" },
      { a: "a-next", b: "a-db", k: "data" },
      { a: "a-next", b: "a-mail", k: "" },
      { a: "a-next", b: "a-tg", k: "" },
      { a: "a-next", b: "a-browser", k: "data" },
      { a: "a-tg", b: "a-admin", k: "" },
      { a: "a-mail", b: "a-tech", k: "" },
      { a: "a-rtu", b: "a-intranet", k: "local" },
      { a: "a-intranet", b: "a-nms", k: "local" },
      { a: "a-nms", b: "a-noc", k: "local" },
    ],
  },
  tobe: {
    nodes: [
      { id: "t-sensor", lane: "edge", x: 30, y: 30, w: 260, h: 58, t: "Sensor level + suhu", s: "Ultrasonik tahan air (radar opsional) + DS18B20", isNew: true },
      { id: "t-context", lane: "edge", x: 30, y: 104, w: 260, h: 58, t: "Konteks daya lokal", s: "Optocoupler PLN · getaran/arus genset", isNew: true },
      { id: "t-mcu", lane: "edge", x: 30, y: 178, w: 260, h: 74, t: "Node ESP32 firmware v2", s: "Mesin status · buffer · TLS terverifikasi · OTA bertanda tangan", isNew: true },
      { id: "t-power", lane: "edge", x: 30, y: 268, w: 260, h: 58, t: "Catu daya tahan padam", s: "DC dari −48 V (terisolasi) / AC + baterai / surya", isNew: true },
      { id: "t-rtuout", lane: "edge", x: 30, y: 400, w: 260, h: 64, t: "Keluaran lokal ke RTU", s: "4–20 mA / Modbus RTU (opsional, berizin)", opt: true },
      { id: "t-wifi", lane: "link", x: 336, y: 150, w: 170, h: 64, t: "Wi-Fi (default)", s: "Kirim seperlunya, payload ±100 B" },
      { id: "t-lora", lane: "link", x: 336, y: 250, w: 170, h: 64, t: "LoRa / NB-IoT", s: "Tangki tanpa Wi-Fi/listrik", opt: true },
      { id: "t-intranet", lane: "link", x: 336, y: 400, w: 170, h: 64, t: "Jalur internal", s: "Tanpa jembatan dari internet", opt: true },
      { id: "t-api", lane: "cloud", x: 550, y: 40, w: 320, h: 64, t: "API ingest (Hono)", s: "Validasi · idempoten · balas policy", isNew: true },
      { id: "t-core", lane: "cloud", x: 550, y: 124, w: 320, h: 74, t: "Inti domain (packages/core)", s: "Geometri · kalibrasi · kualitas · deteksi kejadian · runtime", isNew: true },
      { id: "t-db", lane: "cloud", x: 550, y: 218, w: 320, h: 60, t: "PostgreSQL (+Timescale)", s: "Raw pendek · rollup otomatis · events · audit", isNew: true },
      { id: "t-notif", lane: "cloud", x: 550, y: 298, w: 150, h: 58, t: "Notifier", s: "Telegram berbasis kejadian", isNew: true },
      { id: "t-report", lane: "cloud", x: 720, y: 298, w: 150, h: 58, t: "Laporan", s: "Konsumsi · refill · emisi", isNew: true },
      { id: "t-nms", lane: "cloud", x: 550, y: 400, w: 320, h: 64, t: "Sistem monitoring internal", s: "Menerima level via RTU (bila disetujui)", opt: true },
      { id: "t-web", lane: "user", x: 920, y: 40, w: 230, h: 70, t: "Dashboard web (Next.js)", s: "SSE · grafik jujur · mobile-first", isNew: true },
      { id: "t-tg", lane: "user", x: 920, y: 130, w: 230, h: 58, t: "Telegram petugas & admin", s: "Konteks + tindakan", isNew: true },
      { id: "t-installer", lane: "user", x: 920, y: 208, w: 230, h: 64, t: "Web installer", s: "ESP Web Tools + klaim perangkat", isNew: true },
      { id: "t-assist", lane: "user", x: 920, y: 292, w: 230, h: 58, t: "Asisten (opsional)", s: "RAG SOP + query read-only", opt: true },
      { id: "t-noc", lane: "user", x: 920, y: 400, w: 230, h: 64, t: "NOC / petugas", s: "Level BBM ikut tampil di alat internal", opt: true },
    ],
    edges: [
      { a: "t-sensor", b: "t-mcu", k: "data" },
      { a: "t-context", b: "t-mcu", k: "" },
      { a: "t-power", b: "t-mcu", k: "" },
      { a: "t-mcu", b: "t-wifi", k: "data", l: "event/heartbeat" },
      { a: "t-mcu", b: "t-lora", k: "" },
      { a: "t-mcu", b: "t-rtuout", k: "local" },
      { a: "t-wifi", b: "t-api", k: "data", l: "±60 pesan/hari/alat" },
      { a: "t-lora", b: "t-api", k: "" },
      { a: "t-api", b: "t-core", k: "data" },
      { a: "t-core", b: "t-db", k: "data" },
      { a: "t-core", b: "t-notif", k: "" },
      { a: "t-core", b: "t-report", k: "" },
      { a: "t-db", b: "t-web", k: "data" },
      { a: "t-notif", b: "t-tg", k: "" },
      { a: "t-installer", b: "t-api", k: "" },
      { a: "t-rtuout", b: "t-intranet", k: "local" },
      { a: "t-intranet", b: "t-nms", k: "local" },
      { a: "t-nms", b: "t-noc", k: "local" },
      { a: "t-assist", b: "t-db", k: "" },
    ],
  },
};

const node = (id, kicker, title, body, refs = []) => ({ id, kicker, title, detail: body, refs });

export const ARCH_ITEMS = [
  node("a-sensor", "AS-IS · Lapangan", "HC-SR04", p("Sensor ultrasonik murah (±5 V, rentang ±2–400 cm). Tidak tahan air/uap, berkas lebar sehingga bisa memantul dari dinding leher tangki. Firmware menerima pembacaan bila 1 dari 5 gema valid.") + p("Lihat " + xref("f-minvalid", "temuan sampel valid") + " dan " + xref("e3", "eksperimen sensor") + "."), ["R-FW"]),
  node("a-mcu", "AS-IS · Lapangan", "NodeMCU ESP8266", p("Board pengembangan ESP8266 dengan chip USB dan regulator. Wi-Fi tidak pernah tidur, TLS dibuka ulang di setiap kirim tanpa verifikasi sertifikat, interval kirim tetap.") + p("Lihat " + xref("f-radio", "temuan radio") + ", " + xref("f-tls", "TLS") + ", " + xref("f-fixed", "interval tetap") + "."), ["R-FW"]),
  node("a-power", "AS-IS · Lapangan", "Catu daya AC", p("Perangkat dicatu adaptor AC. Saat PLN padam, perangkat ikut mati sampai genset mengambil alih, justru di momen paling penting. Pengembang lapangan bahkan mengusulkan memakai restart perangkat sebagai tanda pemadaman."), ["R-CHAT"]),
  node("a-rtu", "AS-IS · Lapangan", "RTU yang sudah ada", p("PLC industri di STO yang sudah membaca status seperti PLN OFF dan genset ON, lalu melaporkannya ke sistem monitoring internal. Sudah ada port analog “Fuel Level” yang nilainya 0.") + p("Lihat " + xref("d-rtu", "Perlu RTU?") + "."), ["R-CHAT", "R-FOTO"]),
  node("a-wifi", "AS-IS · Jalur", "Wi-Fi STO → internet", p("Setiap pesan: TLS handshake baru + header HTTP + JSON ±1,5 KB. Dengan interval 15 detik: ±5.760 request per perangkat per hari."), ["R-FW"]),
  node("a-intranet", "AS-IS · Jalur", "Intranet", p("Jaringan internal. Menjembatani internet publik ke sini (misalnya lewat reverse proxy) dinilai berisiko oleh tim lapangan."), ["R-CHAT", "S-NIST82"]),
  node("a-next", "AS-IS · Server", "Next.js monolith di Vercel", p("Satu aplikasi melayani halaman web dan API ingest. Praktis untuk mulai, tetapi ingest perangkat dan trafik browser berbagi kuota yang sama."), ["R-REPO", "D-VERCELFAIR"]),
  node("a-db", "AS-IS · Server", "Aiven MySQL free", p("1 CPU, 1 GB RAM, 1 GB storage. Storage masih longgar (±400 MB per 24 Agustus). Rollup 5 menit dibuat manual di kode."), ["D-AIVEN", "R-CHAT"]),
  node("a-mail", "AS-IS · Server", "Email SMTP", p("Mengirim tautan unduh paket firmware terenkripsi dan verifikasi akun."), ["R-REPO"]),
  node("a-tg", "AS-IS · Server", "Bot Telegram", p("Topik notifikasi admin, perintah dasar, dan balasan helpdesk. Belum mengirim notifikasi kejadian tangki."), ["R-CHAT"]),
  node("a-nms", "AS-IS · Server", "Monitoring internal", p("Sistem internal berbasis intranet yang datanya berasal dari RTU di setiap lokasi, dengan bot notifikasi otomatis. FTM tidak terhubung ke sini."), ["R-CHAT"]),
  node("a-browser", "AS-IS · Pengguna", "Browser dashboard", p("Refresh tiap 20 detik (berhenti saat tab tidak aktif, sudah baik). Widget helpdesk polling tiap 5 detik selama ada sesi chat, walau panel tertutup."), ["R-REFRESH", "R-HELP"]),
  node("a-admin", "AS-IS · Pengguna", "Admin", p("Menyetujui akun dan perangkat lewat dashboard, menerima notifikasi di Telegram."), ["R-REPO"]),
  node("a-tech", "AS-IS · Pengguna", "Teknisi lapangan", p("Menerima paket firmware, lalu compile dan upload di Arduino IDE."), ["R-CHAT"]),
  node("a-noc", "AS-IS · Pengguna", "NOC / petugas", p("Memantau notifikasi sistem internal. Belum melihat level solar di sana."), ["R-CHAT"]),
  node("t-sensor", "TO-BE · Lapangan", "Sensor level + suhu", p("Ultrasonik tahan air dengan zona buta kecil (contoh A02YYUW, 3–450 cm, IP67) + DS18B20 untuk kompensasi suhu. Radar 60 GHz diuji sebagai pembanding.") + p("Sensor dimatikan (power-gating) di antara pengukuran untuk hemat energi."), ["D-A02", "D-A121"]),
  node("t-context", "TO-BE · Lapangan", "Konteks daya lokal", p("Sinyal ‘genset menyala’ atau ‘PLN hilang’ diambil secara lokal dan non-intrusif: optocoupler pada catuan PLN yang disiapkan teknisi, sensor getaran di rangka genset, atau kontak kering dari sistem yang ada (dengan izin).") + p("Tanpa konteks ini, mode FAST baru aktif setelah level terlihat turun (masih bisa, hanya lebih lambat)."), []),
  node("t-mcu", "TO-BE · Lapangan", "Node ESP32 firmware v2", p("ESP32-C3/S3: RAM cukup untuk TLS, kripto hardware, secure boot, BLE untuk provisioning, UART tambahan untuk RS-485. Firmware menjalankan " + xref("c-statemachine", "mesin status") + ", buffer flash, dan menerima " + xref("c-policy", "policy") + "."), ["D-ESP32C3"]),
  node("t-power", "TO-BE · Lapangan", "Catu daya tahan padam", p("Pilihan: (1) DC dari rak −48 V STO lewat konverter DC-DC terisolasi (tidak pernah padam, perlu teknisi); (2) adaptor AC + baterai/superkapasitor kecil; (3) baterai + panel surya kecil untuk tangki jauh dari listrik.") + p("Tegangan catu diukur sungguhan dan dikirim sebagai data kesehatan."), []),
  node("t-rtuout", "TO-BE · Lapangan", "Keluaran lokal ke RTU", p("Node mengeluarkan 4–20 mA sebanding level, atau menjadi Modbus slave. RTU membacanya seperti sensor industri biasa. Jalur ini tidak menyentuh internet sama sekali."), ["S-MODBUS"]),
  node("t-wifi", "TO-BE · Jalur", "Wi-Fi hemat", p("Radio tidur di antara pengiriman. Pesan ringkas, sesi TLS dipakai ulang bila memungkinkan, dan data dikirim batch saat pulih dari gangguan."), ["D-ESP8266LP"]),
  node("t-lora", "TO-BE · Jalur", "LoRa / NB-IoT", p("Untuk tangki tanpa Wi-Fi atau listrik. Gateway LoRa diletakkan di gedung STO (tercatu), atau memakai jaringan LoRaWAN operator (ekosistem Antares)."), ["L-LPWAN", "D-ANTARES"]),
  node("t-intranet", "TO-BE · Jalur", "Jalur internal", p("Hanya lewat RTU yang sudah ada. Tidak ada jembatan dari internet publik."), ["S-NIST82"]),
  node("t-api", "TO-BE · Server", "API ingest (Hono)", p("Endpoint kecil dan cepat: autentikasi perangkat, validasi skema (Zod), idempoten (kiriman ulang tidak dobel), lalu mengembalikan policy. Bisa di Vercel (hemat karena request sedikit) atau VPS/server internal."), ["D-HONO"]),
  node("t-core", "TO-BE · Server", "Inti domain bersama", p("Paket TypeScript yang dipakai API, web, dan tes: geometri tangki, kalibrasi, penanda kualitas, deteksi kejadian (aturan + CUSUM), estimasi runtime."), ["L-CUSUM"]),
  node("t-db", "TO-BE · Server", "PostgreSQL (+TimescaleDB)", p("Tabel pembacaan mentah dengan retensi pendek, rollup otomatis (continuous aggregate), tabel kejadian, tabel audit. Di hosting gratis bisa PostgreSQL biasa; Timescale penuh saat self-host."), ["D-TIMESCALE", "D-DRIZZLE"]),
  node("t-notif", "TO-BE · Server", "Notifier", p("Mengubah kejadian menjadi pesan yang bisa ditindaklanjuti, dengan histeresis, cooldown, dan eskalasi."), []),
  node("t-report", "TO-BE · Server", "Laporan", p("Konsumsi per site, jam genset, rekonsiliasi refill vs nota, statistik pemadaman, emisi. Ekspor PDF/CSV."), []),
  node("t-nms", "TO-BE · Server", "Monitoring internal", p("Bila disetujui, level solar tampil di alat monitoring yang sudah dipakai NOC melalui RTU."), []),
  node("t-web", "TO-BE · Pengguna", "Dashboard web", p("Next.js dengan SSE untuk pembaruan (server yang mendorong, bukan browser yang terus bertanya), grafik yang jujur tentang jeda dan kualitas, dan desain mobile-first."), ["D-NEXT"]),
  node("t-tg", "TO-BE · Pengguna", "Telegram", p("Notifikasi berkonteks dan perintah deterministik (<code>/status</code>, <code>/runtime</code>, <code>/refill</code>)."), []),
  node("t-installer", "TO-BE · Pengguna", "Web installer", p("Pasang firmware dari browser, atur Wi-Fi lewat Improv, klaim perangkat dengan kode sekali pakai."), ["D-EWT", "D-IMPROV"]),
  node("t-assist", "TO-BE · Pengguna", "Asisten (opsional)", p("Hanya setelah inti selesai. Menjawab dari SOP dan data read-only, dengan sumber."), []),
  node("t-noc", "TO-BE · Pengguna", "NOC / petugas", p("Level BBM ikut tampil di alat internal (jalur RTU), selain di dashboard FTM."), []),
];

// ------------------------------------------- satu hari di STO (stepper) --
export const DAY_STEPS = [
  { time: "00:00", title: "Malam normal", lanes: ["node"], mode: "SLOW", text: "Node bangun tiap 5 menit, mengukur, lalu tidur lagi. Level tidak berubah melewati ambang, jadi tidak ada yang dikirim. Tiap 60 menit ada heartbeat ±100 byte." },
  { time: "02:10", title: "Penurunan saat genset mati", lanes: ["node", "server", "user"], mode: "EVENT", text: "Level turun 8 L dalam 20 menit, padahal konteks daya menunjukkan genset mati. Node langsung mengirim, server menandai ‘penurunan tak wajar’, dan petugas menerima Telegram untuk dicek." },
  { time: "09:00", title: "Uji genset rutin 15 menit", lanes: ["context", "node"], mode: "FAST", text: "Sensor getaran/arus mendeteksi genset menyala. Node pindah ke FAST: ukur tiap 20 detik, kirim tiap 90 detik agar laju konsumsi terekam." },
  { time: "09:16", title: "Genset berhenti", lanes: ["node", "server"], mode: "SLOW", text: "Kembali ke SLOW. Server menyimpan episode ‘genset 15 menit, 1,6 L’ dan memperbarui laju konsumsi site ini." },
  { time: "10:05", title: "Truk mengisi solar", lanes: ["node", "server", "user"], mode: "EVENT", text: "Level naik cepat. Node mengirim segera + burst 5 menit. Server mencatat ‘refill +180 L’, Telegram meminta konfirmasi nota." },
  { time: "13:30", title: "PLN padam 2 jam", lanes: ["context", "node", "server", "user"], mode: "FAST", text: "Konteks PLN hilang, genset menyala. FAST aktif. Server menghitung sisa runtime dari laju nyata dan memberi ringkasan tiap 30 menit." },
  { time: "14:10", title: "Internet STO putus 40 menit", lanes: ["node"], mode: "BUFFER", text: "Pengiriman gagal. Node menyimpan pembacaan di flash dengan nomor urut, lalu mengirim sekaligus saat internet pulih. Tidak ada data hilang atau ganda." },
  { time: "15:32", title: "PLN kembali", lanes: ["node", "server"], mode: "SLOW", text: "Genset cooldown lalu berhenti. Server menutup episode pemadaman (durasi, liter terpakai) sebagai data statistik pemadaman." },
];

// --------------------------------------------------- matriks keputusan --
export const MATRIX = {
  criteria: [
    { id: "timely", label: "Kejadian tertangkap tepat waktu", w: 25 },
    { id: "energy", label: "Hemat energi perangkat", w: 20 },
    { id: "cost", label: "Hemat kuota/biaya cloud", w: 15 },
    { id: "risk", label: "Risiko keamanan & izin rendah", w: 15 },
    { id: "effort", label: "Mudah dibangun tim 2 orang", w: 10 },
    { id: "scale", label: "Skalabilitas (29 STO → nasional)", w: 15 },
  ],
  alternatives: [
    { id: "m-a", name: "v1 apa adanya (HTTP tiap 15–20 dtk)", s: { timely: 5, energy: 1, cost: 1, risk: 4, effort: 5, scale: 1 }, why: "Tepat waktu karena selalu mengirim, tetapi boros energi dan kuota. Tidak bisa berskala di hosting gratis." },
    { id: "m-b", name: "Blok di server (timestamp gate)", s: { timely: 4, energy: 1, cost: 2, risk: 4, effort: 5, scale: 2 }, why: "Hanya mengurangi tulisan database. Request, CPU, dan energi radio tetap sama." },
    { id: "m-c", name: "Interval tetap panjang (20–60 mnt)", s: { timely: 2, energy: 3, cost: 5, risk: 4, effort: 5, scale: 4 }, why: "Hemat dan mudah, tetapi refill dan penurunan bisa terlambat puluhan menit. Energi hanya hemat bila radio ikut tidur." },
    { id: "m-d", name: "Adaptif event-aware HTTP + konteks lokal (usulan)", s: { timely: 5, energy: 4, cost: 5, risk: 4, effort: 3, scale: 5 }, why: "Menggabungkan tepat waktu dan hemat. Butuh firmware baru dan desain konteks, sehingga effort sedang." },
    { id: "m-e", name: "MQTT persisten (broker sendiri)", s: { timely: 5, energy: 3, cost: 4, risk: 3, effort: 2, scale: 4 }, why: "Perintah instan ke perangkat, tetapi perlu broker di luar Vercel, sertifikat, ACL, dan koneksi yang dijaga." },
    { id: "m-f", name: "LoRa/LoRaWAN + gateway", s: { timely: 4, energy: 5, cost: 5, risk: 4, effort: 2, scale: 4 }, why: "Paling hemat energi dan cocok untuk tangki tanpa Wi-Fi, tetapi butuh gateway/jaringan dan payload kecil." },
    { id: "m-g", name: "Keluaran lokal ke RTU (4–20 mA/Modbus)", s: { timely: 4, energy: 3, cost: 5, risk: 3, effort: 2, scale: 5 }, why: "Memanfaatkan jaringan RTU nasional tanpa cloud, tetapi bergantung izin dan teknisi." },
  ],
};

// ----------------------------------------------------- registry drawer --
export function buildRegistry() {
  const reg = new Map();
  const put = (id, item) => reg.set(id, { id, ...item });

  for (const x of PROBLEMS) put(x.id, { kicker: "Masalah", title: x.title, detail: x.detail, refs: x.refs, section: "masalah" });
  for (const x of V1_FEATURES) put(x.id, { kicker: "FTM v1 · yang sudah ada", title: x.title, detail: p(x.short) + x.detail, refs: x.refs, section: "v1" });
  for (const x of TIMELINE)
    put(x.id, { kicker: `Linimasa · ${x.date}`, title: x.title, detail: p(x.text), refs: x.refs, section: "v1" });
  for (const x of ISSUES)
    put(x.id, {
      kicker: `Chat lapangan · ${x.date}`,
      title: x.title,
      badges: [
        { t: ISSUE_CATEGORIES[x.cat].label, c: ISSUE_CATEGORIES[x.cat].badge },
        ...x.pillars.map((n) => ({ t: `Pilar ${n}`, c: "badge--accent" })),
      ],
      detail: p(`<b>Ringkas:</b> ${x.summary}`) + x.detail,
      refs: x.refs,
      section: "chat",
    });
  const sevBadge = { tinggi: "badge--bad", sedang: "badge--warn", rendah: "badge--info", info: "" };
  for (const x of FINDINGS)
    put(x.id, {
      kicker: `Audit kode v1 · ${x.area}`,
      title: x.title,
      badges: [
        { t: `Tingkat ${x.sev}`, c: sevBadge[x.sev] },
        { t: `Pilar ${x.pillar}`, c: "badge--accent" },
      ],
      detail: x.detail,
      refs: x.refs,
      section: "audit",
    });
  for (const x of CONCEPTS) put(x.id, { kicker: x.kicker, title: x.title, detail: x.detail, refs: x.refs, section: "pilar" });
  const vClass = { yes: "badge--ok", cond: "badge--warn", later: "badge--info", no: "badge--bad" };
  for (const x of DECISIONS)
    put(x.id, {
      kicker: "Keputusan penting",
      title: x.q,
      badges: [{ t: x.vlabel, c: vClass[x.verdict] }],
      detail: p(`<b>Jawaban singkat:</b> ${x.short}`) + x.detail,
      refs: x.refs,
      related: x.related,
      section: "keputusan",
    });
  const prioClass = { Must: "badge--bad", Should: "badge--warn", Could: "badge--info", "Won't": "" };
  for (const x of FEATURES)
    put(x.id, {
      kicker: "Fitur FTM 2.0",
      title: x.name,
      badges: [
        { t: x.prio, c: prioClass[x.prio] },
        { t: `Pilar ${x.pillar}`, c: "badge--accent" },
      ],
      detail: p(x.why) + x.detail,
      refs: x.refs,
      section: "fitur",
    });
  for (const x of STACK_ROWS)
    put(x.id, {
      kicker: "Stack · " + x.layer,
      title: x.rec,
      detail:
        table(
          ["FTM v1", "CoE BHT", "Video PZN", "Rekomendasi"],
          [[x.v1, x.bht, x.pzn, `<b>${x.rec}</b>`]],
        ) + x.detail,
      refs: x.refs,
      section: "stack",
    });
  for (const x of EXPERIMENTS)
    put(x.id, { kicker: `Eksperimen ${x.code} · Pilar ${x.pillar}`, title: x.name, detail: x.detail, refs: x.refs, section: "eksperimen" });
  for (const x of CAREER.roles) put(x.id, { kicker: "Karier", title: x.name, detail: p(`<b>Bukti dari TA:</b> ${x.proof}`) + x.detail, section: "karier" });
  for (const x of ARCH_ITEMS) put(x.id, { kicker: x.kicker, title: x.title, detail: x.detail, refs: x.refs, section: "arsitektur" });
  for (const x of MATRIX.alternatives)
    put(x.id, {
      kicker: "Matriks keputusan",
      title: x.name,
      detail:
        p(x.why) +
        table(
          ["Kriteria", "Skor (1–5)"],
          MATRIX.criteria.map((c) => [c.label, String(x.s[c.id])]),
        ) +
        p("<i>Skor adalah penilaian awal berdasarkan literatur dan kondisi lapangan, dan harus diperbarui dengan hasil eksperimen E4–E7.</i>"),
      section: "pilar",
    });
  for (const row of ROADMAP.rows)
    put(row.id, {
      kicker: "Roadmap",
      title: row.label,
      detail: p(`<b>Penanggung jawab:</b> ${row.who}`) + ul(row.bars.map((b) => `${ROADMAP.months[b.s]} – ${ROADMAP.months[Math.min(b.e, ROADMAP.months.length) - 1]}: ${b.t}`)) + (row.ms ? ul(row.ms.map((m) => `◆ ${m.t}`)) : ""),
      section: "roadmap",
    });

  // item sintetis untuk xref ke simulator & karier
  put("sim-accuracy", { kicker: "Simulator", title: "Kalkulator akurasi volume", detail: p("Buka bagian Pilar 1 lalu coba ubah suhu, offset, dan kemiringan.") + `<p><a class="btn btn--sm" href="#pilar" data-close-drawer data-tab="p1">Ke kalkulator akurasi →</a></p>`, section: "pilar" });
  put("sim-telemetry", { kicker: "Simulator", title: "Simulator telemetri 24 jam", detail: p("Buka bagian Pilar 2 untuk membandingkan strategi kirim, energi, dan umur baterai.") + `<p><a class="btn btn--sm" href="#pilar" data-close-drawer data-tab="p2">Ke simulator telemetri →</a></p>`, section: "pilar" });
  put("sim-cloud", { kicker: "Simulator", title: "Kalkulator kuota cloud", detail: p("Buka bagian Pilar 3 untuk menghitung invocations, CPU, dan memori terhadap jatah Vercel Hobby.") + `<p><a class="btn btn--sm" href="#pilar" data-close-drawer data-tab="p3">Ke kalkulator kuota →</a></p>`, section: "pilar" });
  put("career", { kicker: "Karier", title: "Nilai untuk CV & karier", detail: p("Lihat bagian Karier untuk pemetaan peran dan contoh bullet CV.") + `<p><a class="btn btn--sm" href="#karier" data-close-drawer>Ke bagian karier →</a></p>`, section: "karier" });

  return reg;
}
