// Quality gate for the blueprint site.
// 1. Every cross-reference (data-item) in content and markup points to an existing item.
// 2. Every cited source id exists in REFS.
// 3. No obvious secrets or internal addresses slipped into the published files.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "site");
const { buildRegistry, REFS } = await import(pathToUrl(path.join(root, "assets/js/content.js")));

function pathToUrl(p) {
  return new URL(`file://${p.replace(/\\/g, "/").replace(/^([A-Za-z]):/, "/$1:")}`).href;
}

const registry = buildRegistry();
const problems = [];

for (const [id, item] of registry) {
  for (const m of (item.detail || "").matchAll(/data-item="([^"]+)"/g)) {
    if (!registry.has(m[1])) problems.push(`item ${id} links to missing item "${m[1]}"`);
  }
  for (const rel of item.related || []) {
    if (!registry.has(rel)) problems.push(`item ${id} has missing related item "${rel}"`);
  }
  for (const ref of item.refs || []) {
    if (!REFS[ref]) problems.push(`item ${id} cites missing source "${ref}"`);
  }
}

const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
for (const m of html.matchAll(/data-item="([^"]+)"/g)) {
  if (!registry.has(m[1])) problems.push(`index.html links to missing item "${m[1]}"`);
}

const SECRET_PATTERNS = [
  /AVNS_[A-Za-z0-9_-]{8,}/,
  /gh[pousr]_[A-Za-z0-9]{20,}/,
  /\b\d{8,12}:[A-Za-z0-9_-]{30,}\b/, // Telegram bot token
  /\b10\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/,
  /\b192\.168\.\d{1,3}\.\d{1,3}\b/,
  /-100\d{8,}/, // Telegram group chat id
];

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (/\.(html|js|css|json|svg)$/.test(entry.name)) {
      const text = fs.readFileSync(full, "utf8");
      for (const re of SECRET_PATTERNS) {
        if (re.test(text)) problems.push(`${path.relative(root, full)} matches sensitive pattern ${re}`);
      }
    }
  }
}
walk(root);

console.log(`Registry items: ${registry.size}, sources: ${Object.keys(REFS).length}`);
if (problems.length) {
  console.error(`Found ${problems.length} problem(s):`);
  for (const p of problems) console.error(`  - ${p}`);
  process.exit(1);
}
console.log("All content checks passed.");
