# FTM 2.0 Capstone Blueprint

**An interactive planning site for an undergraduate capstone on IoT fuel tank management for telecommunication sites: accurate volume estimation across tank geometries, and energy-efficient data transmission.**

[![Checks](https://github.com/Zendin110206/ftm-capstone-blueprint/actions/workflows/checks.yml/badge.svg)](https://github.com/Zendin110206/ftm-capstone-blueprint/actions/workflows/checks.yml)
![Static site](https://img.shields.io/badge/site-static%20HTML%2FCSS%2FJS-0e6f7a)
![Language](https://img.shields.io/badge/content-Bahasa%20Indonesia-b8620a)

> The site content is written in Bahasa Indonesia for the supervisors and field team. This README is in English.

---

## Why this exists

FTM (Fuel Tank Management) started during a practical internship at PT Telkom Infrastruktur Indonesia (TIF/InfraNexia), Pasuruan Area. It replaces manual fuel checks for the backup diesel generators at telecom central offices (STOs). Those checks meant climbing tanks, reading dipsticks, and keeping no usable history. FTM v1 is running as a limited field pilot: an ultrasonic sensor feeds an ESP8266, which sends data through an authenticated API into cloud MySQL, and staff see it on a web dashboard and in Telegram.

The capstone (Tugas Akhir) takes FTM further along three pillars agreed with the supervisors:

1. **Accuracy.** Reliable fuel availability data across tank models: rectangular, vertical cylinder, horizontal cylinder, and dished heads.
2. **Energy-efficient transmission.** A data transmission model that saves device energy, data, and cloud quota without missing important events.
3. **Effectiveness and efficiency.** A multi-criteria evaluation covering cost, security, reliability, and scalability.

This repository holds the **blueprint**: one interactive page that explains the problem, audits the current system, turns the three pillars into measurable research questions, and proposes the architecture, experiments, and roadmap. Almost every card, row, node, and bar opens a detail panel with the reasoning, alternatives, and sources.

## What's inside the page

| Section | What it shows |
| --- | --- |
| Problem | Why manual fuel checks are risky and inefficient, plus an animated power-chain simulation (PLN → ATS → rectifier → battery → genset) |
| FTM v1 | What already works in the field pilot, with a project timeline |
| Field voice | 28 sanitized findings from the project chat, filterable by category and pillar |
| Code audit | 18 evidence-based findings from the FTM v1 repository (file and line), each with impact and fix |
| Three pillars | Accuracy calculator, 24-hour telemetry simulator (messages, bytes, energy, detection latency, battery life), payload anatomy, cloud-quota calculator, weighted decision matrix |
| Architecture | Clickable AS-IS vs TO-BE diagrams and a "day at the STO" walkthrough |
| Decisions | Neutral answers: RTU integration, machine learning, notifications, chatbot, browser-based installer, Telegram, MQTT vs HTTP, LoRa/NB-IoT, long-term value |
| Features, stack, experiments, roadmap | MoSCoW feature catalog, stack comparison, eight experiments with success criteria, 11-month Gantt chart |
| Career, risks, sources | CV mapping, risk register, neutral review of earlier AI-assisted drafts, 70 cited sources |

## Tech

The site is intentionally plain: static HTML, CSS, and vanilla JavaScript modules. There is no build step.

- **Three.js** (loaded from jsDelivr via an import map) renders the interactive tank. If WebGL is unavailable, a 2D fallback is shown.
- Charts, diagrams, and simulators are hand-written SVG and DOM code (`site/assets/js`).
- All text, sources, and comparisons live in one data module (`site/assets/js/content.js`), so updating content never touches layout code.
- Light and dark themes, keyboard navigation, search palette (<kbd>Ctrl</kbd> + <kbd>K</kbd>), deep links to any detail panel (`#item=<id>`), and a layout that works from 360 px phones up to wide desktops.

```text
.
├─ site/                      # the deployable static site (Vercel root directory)
│  ├─ index.html
│  ├─ favicon.svg
│  ├─ vercel.json             # security headers (CSP, HSTS, etc.)
│  └─ assets/
│     ├─ css/styles.css
│     └─ js/
│        ├─ main.js           # rendering, navigation, drawer, search
│        ├─ content.js        # all copy, sources, and comparisons
│        ├─ geometry.js       # tank volume engine (rectangular, cylinders, dished heads)
│        ├─ sims.js           # power, accuracy, telemetry, cloud, matrix simulators
│        ├─ diagrams.js       # architecture SVG, day stepper, Gantt
│        ├─ tank.js           # tank controls + 2D fallback
│        ├─ tank3d.js         # Three.js renderer
│        └─ ui.js             # DOM and chart helpers
├─ scripts/check-content.mjs  # cross-reference, source, and secret checks
└─ .github/workflows/checks.yml
```

## Run locally

Any static file server works. Pick one:

```bash
npx serve site
```

```bash
python -m http.server 5510 --directory site
```

Then open `http://localhost:5510`. ES modules do not load from `file://`, so a server is required.

## Quality checks

```bash
node scripts/check-content.mjs
```

The script fails if any detail link points to a missing item, a cited source is missing, or a file matches a sensitive pattern (tokens, internal IP ranges, chat IDs). The same check runs in GitHub Actions on every push and pull request.

## Deploy (Vercel)

1. Import this repository in Vercel.
2. Set **Root Directory** to `site`, **Framework Preset** to *Other*, and leave the build command empty.
3. Deploy. Headers in `site/vercel.json` apply automatically.

## Scope and data policy

- This is an academic planning document, **not** an official website of PT Telkom Indonesia, PT Telkom Infrastruktur Indonesia, or InfraNexia.
- Field data is anonymized. The page contains no credentials, internal network addresses, site coordinates, or personal data of field staff.
- Energy and cost figures in the simulators are **starting assumptions** from datasheets and literature. The planned experiments (E1–E8) will replace them with measurements.

## Related

- FTM v1 (field pilot): [Zendin110206/solar-tank-monitoring-system](https://github.com/Zendin110206/solar-tank-monitoring-system)

## Author

Muhammad Zaenal Abidin Abdurrahman and team, S1 Telecommunication Engineering, Telkom University.
