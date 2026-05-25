/**
 * Migrate color scale keys/refs: s0–s9 (or bare 0–9) → Atlassian 100–1000.
 * Run: node scripts/migrate-color-scale-atlassian.mjs
 */

import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { COLOR_PALETTE_ROOTS } from "./lib/color-hierarchy.mjs";
import {
  normalizeColorScaleRefs,
  renameColorScaleKeys,
} from "./lib/color-scale.mjs";

const setsDir = join(dirname(fileURLToPath(import.meta.url)), "..", "sets");

const corePath = join(setsDir, "core.json");
const core = JSON.parse(readFileSync(corePath, "utf8"));
for (const group of COLOR_PALETTE_ROOTS) {
  if (core[group]) core[group] = renameColorScaleKeys(core[group]);
}
writeFileSync(corePath, `${JSON.stringify(core, null, 2)}\n`);

const setFiles = readdirSync(setsDir).filter(
  (file) => file.endsWith(".json") && !file.startsWith("$"),
);

for (const file of setFiles) {
  const path = join(setsDir, file);
  let data = JSON.parse(readFileSync(path, "utf8"));
  data = normalizeColorScaleRefs(data);
  writeFileSync(path, `${JSON.stringify(data, null, 2)}\n`);
}

console.log(
  `Migrated color steps to Atlassian scale (100–1000) in ${setFiles.join(", ")}`,
);
