/**
 * Migrate color hierarchy: brColors/dfColors → brand/neutral + flat palettes.
 * Run: node scripts/migrate-color-hierarchy-atlassian.mjs
 */

import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import {
  migrateColorHierarchyRefsDeep,
  restructureCoreColors,
} from "./lib/color-hierarchy.mjs";

const setsDir = join(dirname(fileURLToPath(import.meta.url)), "..", "sets");

const corePath = join(setsDir, "core.json");
const core = JSON.parse(readFileSync(corePath, "utf8"));
writeFileSync(corePath, `${JSON.stringify(restructureCoreColors(core), null, 2)}\n`);

const setFiles = readdirSync(setsDir).filter(
  (file) => file.endsWith(".json") && !file.startsWith("$"),
);

for (const file of setFiles) {
  if (file === "core.json") continue;
  const path = join(setsDir, file);
  let data = JSON.parse(readFileSync(path, "utf8"));
  data = migrateColorHierarchyRefsDeep(data);
  writeFileSync(path, `${JSON.stringify(data, null, 2)}\n`);
}

console.log(
  "Migrated color hierarchy: brand, neutral.light/dark, green, teal, lime, yellow, blue",
);
