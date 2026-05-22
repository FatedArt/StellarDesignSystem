#!/usr/bin/env node

import fs from "node:fs/promises";
import path from "node:path";

const FIGMA_API_BASE = "https://api.figma.com/v1";
const DEFAULT_OUTPUT = "packages/tokens/tokens.json";

function printHelp() {
  console.log(`
Sync Figma Variables to Tokens Studio JSON.

Usage:
  node scripts/sync-figma-variables-to-tokens.mjs [--output <path>] [--mode <modeName>] [--include-remote]

Required environment variables:
  FIGMA_TOKEN      Personal Access Token (scope: file_variables:read)
  FIGMA_FILE_KEY   Figma file key (from https://www.figma.com/design/<FILE_KEY>/...)

Optional flags:
  --output <path>      Output file path (default: ${DEFAULT_OUTPUT})
  --mode <modeName>    Use a specific mode name for all collections when available
  --include-remote     Include remote variables referenced by this file

Examples:
  FIGMA_TOKEN=xxx FIGMA_FILE_KEY=abc123 node scripts/sync-figma-variables-to-tokens.mjs
  FIGMA_TOKEN=xxx FIGMA_FILE_KEY=abc123 node scripts/sync-figma-variables-to-tokens.mjs --mode Color
`);
}

function parseArgs(argv) {
  const args = {
    output: DEFAULT_OUTPUT,
    mode: undefined,
    includeRemote: false,
    help: false,
  };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--help" || arg === "-h") {
      args.help = true;
    } else if (arg === "--output") {
      args.output = argv[i + 1];
      i += 1;
    } else if (arg === "--mode") {
      args.mode = argv[i + 1];
      i += 1;
    } else if (arg === "--include-remote") {
      args.includeRemote = true;
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }

  return args;
}

function normalizeColorChannel(channel) {
  if (typeof channel !== "number" || Number.isNaN(channel)) return 0;
  return Math.max(0, Math.min(1, channel));
}

function toHex(n) {
  return Math.round(n * 255)
    .toString(16)
    .padStart(2, "0");
}

function figmaColorToCss(value) {
  const r = normalizeColorChannel(value.r);
  const g = normalizeColorChannel(value.g);
  const b = normalizeColorChannel(value.b);
  const a = normalizeColorChannel(value.a ?? 1);

  if (a === 1) {
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
  }

  return `#${toHex(r)}${toHex(g)}${toHex(b)}${toHex(a)}`.toUpperCase();
}

function tokenTypeFromResolvedType(resolvedType) {
  switch (resolvedType) {
    case "COLOR":
      return "color";
    case "FLOAT":
      return "number";
    case "BOOLEAN":
      return "boolean";
    case "STRING":
      return "string";
    default:
      return "string";
  }
}

function parseAliasId(rawValue) {
  if (!rawValue || typeof rawValue !== "object") return null;
  if (rawValue.type === "VARIABLE_ALIAS" && typeof rawValue.id === "string") {
    return rawValue.id;
  }
  if (typeof rawValue.id === "string" && rawValue.id.startsWith("VariableID:")) {
    return rawValue.id;
  }
  return null;
}

function splitTokenPath(name) {
  return name
    .split("/")
    .map((segment) => segment.trim())
    .filter(Boolean);
}

function setNestedToken(target, pathSegments, tokenPayload) {
  let current = target;
  for (let i = 0; i < pathSegments.length; i += 1) {
    const key = pathSegments[i];
    const isLeaf = i === pathSegments.length - 1;
    if (isLeaf) {
      current[key] = tokenPayload;
      return;
    }
    if (!current[key] || typeof current[key] !== "object" || Array.isArray(current[key])) {
      current[key] = {};
    }
    current = current[key];
  }
}

function getCollectionModeMap(collectionsMap) {
  const map = new Map();
  for (const collection of Object.values(collectionsMap)) {
    map.set(collection.id, collection);
  }
  return map;
}

function pickModeId(variable, collection, preferredModeName) {
  const valueModeIds = Object.keys(variable.valuesByMode ?? {});
  if (valueModeIds.length === 0) return null;

  if (preferredModeName && Array.isArray(collection?.modes)) {
    const preferredMode = collection.modes.find(
      (mode) => mode.name.toLowerCase() === preferredModeName.toLowerCase(),
    );
    if (preferredMode && valueModeIds.includes(preferredMode.modeId)) {
      return preferredMode.modeId;
    }
  }

  if (collection?.defaultModeId && valueModeIds.includes(collection.defaultModeId)) {
    return collection.defaultModeId;
  }

  return valueModeIds[0];
}

function toTokenValue(rawValue, variableIdToNamePath) {
  const aliasId = parseAliasId(rawValue);
  if (aliasId) {
    const aliasPath = variableIdToNamePath.get(aliasId);
    if (!aliasPath) return null;
    return `{${aliasPath.join(".")}}`;
  }

  if (rawValue && typeof rawValue === "object" && "r" in rawValue && "g" in rawValue && "b" in rawValue) {
    return figmaColorToCss(rawValue);
  }

  return rawValue;
}

async function fetchFigmaVariables({ token, fileKey }) {
  const endpoint = `${FIGMA_API_BASE}/files/${fileKey}/variables/local`;
  const response = await fetch(endpoint, {
    method: "GET",
    headers: {
      "X-Figma-Token": token,
    },
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(
      `Failed to fetch Figma variables (${response.status} ${response.statusText}). Body: ${errorBody}`,
    );
  }

  return response.json();
}

async function run() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    printHelp();
    return;
  }

  const figmaToken = process.env.FIGMA_TOKEN;
  const figmaFileKey = process.env.FIGMA_FILE_KEY;

  if (!figmaToken || !figmaFileKey) {
    throw new Error("FIGMA_TOKEN and FIGMA_FILE_KEY are required.");
  }

  const data = await fetchFigmaVariables({ token: figmaToken, fileKey: figmaFileKey });
  const variablesMap = data?.meta?.variables;
  const collectionsMap = data?.meta?.variableCollections;

  if (!variablesMap || !collectionsMap) {
    throw new Error("Unexpected Figma API response. Expected meta.variables and meta.variableCollections.");
  }

  const collectionById = getCollectionModeMap(collectionsMap);
  const variableEntries = Object.values(variablesMap).filter((variable) =>
    args.includeRemote ? true : !variable.remote,
  );

  const variableIdToNamePath = new Map(
    variableEntries.map((variable) => [variable.id, splitTokenPath(variable.name)]),
  );

  const result = {};
  let processed = 0;
  let skipped = 0;

  for (const variable of variableEntries) {
    const pathSegments = splitTokenPath(variable.name);
    if (pathSegments.length === 0) {
      skipped += 1;
      continue;
    }

    const collection = collectionById.get(variable.variableCollectionId);
    const modeId = pickModeId(variable, collection, args.mode);
    if (!modeId) {
      skipped += 1;
      continue;
    }

    const rawValue = variable.valuesByMode?.[modeId];
    const tokenValue = toTokenValue(rawValue, variableIdToNamePath);
    if (tokenValue === null || tokenValue === undefined) {
      skipped += 1;
      continue;
    }

    const tokenPayload = {
      value: tokenValue,
      type: tokenTypeFromResolvedType(variable.resolvedType),
    };
    if (typeof variable.description === "string" && variable.description.trim().length > 0) {
      tokenPayload.description = variable.description.trim();
    }

    setNestedToken(result, pathSegments, tokenPayload);
    processed += 1;
  }

  const outputPath = path.resolve(process.cwd(), args.output);
  const outputDir = path.dirname(outputPath);
  await fs.mkdir(outputDir, { recursive: true });
  await fs.writeFile(outputPath, `${JSON.stringify(result, null, 2)}\n`, "utf8");

  console.log(`Synced ${processed} variables to ${path.relative(process.cwd(), outputPath)}.`);
  if (skipped > 0) {
    console.log(`Skipped ${skipped} variables (missing mode/value/alias target).`);
  }
}

run().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
