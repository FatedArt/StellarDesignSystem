/**
 * Merge sets/*.json → tokens.json (for Style Dictionary build).
 * Run: node scripts/merge-token-sets.mjs
 */

import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const setsDir = join(root, "sets");
const tokensPath = join(root, "tokens.json");

const metadata = JSON.parse(readFileSync(join(setsDir, "$metadata.json"), "utf8"));
const themes = JSON.parse(readFileSync(join(setsDir, "$themes.json"), "utf8"));
const tokenSetOrder = metadata.tokenSetOrder ?? [];

/** Token Studio multi-file uses set-relative refs; Style Dictionary needs `{setName.path}`. */
function prefixSetRefs(value, setName) {
  if (typeof value === "string") {
    return value.replace(
      /\{(?!core\.|semantic\.|typography\.|components\.)([\w.-]+)\./g,
      `{${setName}.$1.`,
    );
  }
  if (Array.isArray(value)) {
    return value.map((item) => prefixSetRefs(item, setName));
  }
  if (value && typeof value === "object") {
    const next = {};
    for (const [key, entry] of Object.entries(value)) {
      next[key] = prefixSetRefs(entry, setName);
    }
    return next;
  }
  return value;
}

const merged = {};
for (const setName of tokenSetOrder) {
  const setTokens = JSON.parse(readFileSync(join(setsDir, `${setName}.json`), "utf8"));
  merged[setName] = prefixSetRefs(setTokens, setName);
}

merged.$themes = themes;
merged.$metadata = metadata;

writeFileSync(tokensPath, `${JSON.stringify(merged, null, 2)}\n`);
console.log(`Merged sets/ → tokens.json (${tokenSetOrder.join(", ")})`);
