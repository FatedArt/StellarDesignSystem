/**
 * Normalize Token Studio multi-file references so they render without "red dots":
 * 1. Rename legacy color scale keys (0–9, s0–s9) → Atlassian 100–1000 in core palettes
 * 2. Strip ALL set-name prefixes ({core.*, semantic.*, typography.*, components.*})
 * 3. Normalize legacy color refs in alias strings to 100–1000
 */

import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { COLOR_PALETTE_ROOTS } from "./lib/color-hierarchy.mjs";
import {
  normalizeColorScaleRefs,
  renameColorScaleKeys,
} from "./lib/color-scale.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..", "sets");

const SET_NAMES = ["core", "semantic", "typography", "components"];
const STRIP_PREFIX_RE = new RegExp(`\\{(${SET_NAMES.join("|")})\\.`, "g");

function stripAllSetPrefixes(value) {
  if (typeof value === "string") {
    return value.replace(STRIP_PREFIX_RE, "{");
  }
  if (Array.isArray(value)) return value.map(stripAllSetPrefixes);
  if (value && typeof value === "object") {
    const next = {};
    for (const [key, entry] of Object.entries(value)) {
      next[key] = stripAllSetPrefixes(entry);
    }
    return next;
  }
  return value;
}

function normalizeCoreColorPalettes(core) {
  for (const group of COLOR_PALETTE_ROOTS) {
    if (!core[group]) continue;
    core[group] = renameColorScaleKeys(core[group]);
  }
  return core;
}

const corePath = join(root, "core.json");
const core = JSON.parse(readFileSync(corePath, "utf8"));
writeFileSync(corePath, `${JSON.stringify(normalizeCoreColorPalettes(core), null, 2)}\n`);

const setFiles = readdirSync(root).filter(
  (file) => file.endsWith(".json") && !file.startsWith("$"),
);

for (const file of setFiles) {
  const path = join(root, file);
  let data = JSON.parse(readFileSync(path, "utf8"));
  data = stripAllSetPrefixes(data);
  data = normalizeColorScaleRefs(data);
  writeFileSync(path, `${JSON.stringify(data, null, 2)}\n`);
}

console.log(
  `Normalized refs in ${setFiles.join(", ")} (stripped set prefixes, Atlassian palettes)`,
);
