/**
 * Fix Token Studio reference resolution:
 * 1. Rename numeric color scale keys (0-9) → s0-s9 in core
 * 2. Strip same-set prefixes in semantic/components
 * 3. Update cross-set color references
 */

import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..", "sets");

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

function stripSetPrefix(value, setName) {
  if (typeof value === "string") {
    return value.replace(new RegExp(`\\{${setName}\\.`, "g"), "{");
  }
  if (Array.isArray(value)) return value.map((v) => stripSetPrefix(v, setName));
  if (value && typeof value === "object") {
    const next = {};
    for (const [key, entry] of Object.entries(value)) {
      next[key] = stripSetPrefix(entry, setName);
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

for (const file of ["semantic.json", "components.json"]) {
  const path = join(root, file);
  let data = JSON.parse(readFileSync(path, "utf8"));
  const setName = file.replace(".json", "");
  data = stripSetPrefix(data, setName);
  data = updateColorRefs(data);
  writeFileSync(path, `${JSON.stringify(data, null, 2)}\n`);
}

console.log("Fixed color scale keys (s0-s9) and same-set references in semantic/components");
