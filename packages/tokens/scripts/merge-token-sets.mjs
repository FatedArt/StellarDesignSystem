/**
 * Merge sets/*.json → tokens.json (for Style Dictionary build).
 *
 * Token Studio multi-file uses references WITHOUT a set-name prefix
 * (e.g. {brColors.primary.s6}), and resolves them by token path alone.
 * Style Dictionary works on a single flat tree, so we need to (a) nest
 * each set under its name and (b) prefix every reference with the
 * **owning** set's name so Style Dictionary can resolve cross-set refs.
 *
 * Run: node scripts/merge-token-sets.mjs
 */

import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const setsDir = join(root, "sets");
const tokensPath = join(root, "tokens.json");

const metadata = JSON.parse(readFileSync(join(setsDir, "$metadata.json"), "utf8"));
const themes = JSON.parse(readFileSync(join(setsDir, "$themes.json"), "utf8"));
const tokenSetOrder = metadata.tokenSetOrder ?? [];

const setData = {};
for (const setName of tokenSetOrder) {
  setData[setName] = JSON.parse(
    readFileSync(join(setsDir, `${setName}.json`), "utf8"),
  );
}

const SET_NAMES = new Set(tokenSetOrder);

/** Map each top-level token group to the set that owns it. */
const keyToSet = {};
for (const setName of tokenSetOrder) {
  for (const topKey of Object.keys(setData[setName])) {
    if (!keyToSet[topKey]) keyToSet[topKey] = setName;
  }
}

const REF_RE = /\{([^}]+)\}/g;

function prefixRefs(value) {
  if (typeof value === "string") {
    return value.replace(REF_RE, (match, refBody) => {
      const firstSegment = refBody.split(".")[0];
      if (SET_NAMES.has(firstSegment)) return match;
      const owningSet = keyToSet[firstSegment];
      if (!owningSet) return match;
      return `{${owningSet}.${refBody}}`;
    });
  }
  if (Array.isArray(value)) return value.map(prefixRefs);
  if (value && typeof value === "object") {
    const next = {};
    for (const [key, entry] of Object.entries(value)) {
      next[key] = prefixRefs(entry);
    }
    return next;
  }
  return value;
}

const merged = {};
for (const setName of tokenSetOrder) {
  merged[setName] = prefixRefs(setData[setName]);
}

merged.$themes = themes;
merged.$metadata = metadata;

writeFileSync(tokensPath, `${JSON.stringify(merged, null, 2)}\n`);
console.log(`Merged sets/ → tokens.json (${tokenSetOrder.join(", ")})`);
