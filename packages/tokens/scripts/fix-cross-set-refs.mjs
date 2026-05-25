/**
 * Normalize Token Studio multi-file references so they render without "red dots":
 * 1. Rename numeric color scale keys (0-9) → s0-s9 in core
 * 2. Strip ALL set-name prefixes ({core.*, semantic.*, typography.*, components.*})
 *    from references in every set. Token Studio resolves cross-set refs by path
 *    alone; the merge step re-adds `{setName.path}` prefixes for Style Dictionary.
 * 3. Update legacy numeric color refs to the s0-s9 form.
 */

import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..", "sets");

const SET_NAMES = ["core", "semantic", "typography", "components"];
const STRIP_PREFIX_RE = new RegExp(`\\{(${SET_NAMES.join("|")})\\.`, "g");

function renameColorScaleKeys(obj) {
  if (!obj || typeof obj !== "object" || Array.isArray(obj)) return obj;
  const next = {};
  for (const [key, value] of Object.entries(obj)) {
    const newKey = /^[0-9]$/.test(key) ? `s${key}` : key;
    next[newKey] =
      value && typeof value === "object" && "value" in value && "type" in value
        ? value
        : renameColorScaleKeys(value);
  }
  return next;
}

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

function updateColorRefs(value) {
  if (typeof value === "string") {
    return value.replace(
      /((?:brColors|dfColors)(?:\.[\w-]+)*\.)([0-9])(?=\})/g,
      "$1s$2",
    );
  }
  if (Array.isArray(value)) return value.map(updateColorRefs);
  if (value && typeof value === "object") {
    const next = {};
    for (const [key, entry] of Object.entries(value)) {
      next[key] = updateColorRefs(entry);
    }
    return next;
  }
  return value;
}

const corePath = join(root, "core.json");
const core = JSON.parse(readFileSync(corePath, "utf8"));
core.brColors = renameColorScaleKeys(core.brColors);
core.dfColors = renameColorScaleKeys(core.dfColors);
writeFileSync(corePath, `${JSON.stringify(core, null, 2)}\n`);

const setFiles = readdirSync(root).filter(
  (file) => file.endsWith(".json") && !file.startsWith("$"),
);

for (const file of setFiles) {
  const path = join(root, file);
  let data = JSON.parse(readFileSync(path, "utf8"));
  data = stripAllSetPrefixes(data);
  data = updateColorRefs(data);
  writeFileSync(path, `${JSON.stringify(data, null, 2)}\n`);
}

console.log(
  `Normalized refs in ${setFiles.join(", ")} (stripped set prefixes, fixed s0-s9 keys)`,
);
