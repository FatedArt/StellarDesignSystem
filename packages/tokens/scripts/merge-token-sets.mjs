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

const merged = {};
for (const setName of tokenSetOrder) {
  merged[setName] = JSON.parse(readFileSync(join(setsDir, `${setName}.json`), "utf8"));
}

merged.$themes = themes;
merged.$metadata = metadata;

writeFileSync(tokensPath, `${JSON.stringify(merged, null, 2)}\n`);
console.log(`Merged sets/ → tokens.json (${tokenSetOrder.join(", ")})`);
