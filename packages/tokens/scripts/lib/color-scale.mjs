/** Atlassian-style color ramp: index 0–9 → 100–1000 (light → dark). */

import { COLOR_PALETTE_ROOTS_RE } from "./color-hierarchy.mjs";

export const ATLASSIAN_BY_INDEX = {
  0: "100",
  1: "200",
  2: "300",
  3: "400",
  4: "500",
  5: "600",
  6: "700",
  7: "800",
  8: "900",
  9: "1000",
};

const LEGACY_KEY_RE = /^s?([0-9])$/;

export function isLegacyColorStepKey(key) {
  return LEGACY_KEY_RE.test(key);
}

export function toAtlassianStepKey(key) {
  const match = key.match(LEGACY_KEY_RE);
  if (!match) return key;
  return ATLASSIAN_BY_INDEX[Number(match[1])];
}

/** Normalize legacy step refs on color palettes → 100–1000. */
export function normalizeColorScaleRefs(value) {
  if (typeof value === "string") {
    return value.replace(
      new RegExp(
        `((?:${COLOR_PALETTE_ROOTS_RE})(?:\\.[\\w-]+)*\\.)(s?)([0-9])(?=\\})`,
        "g",
      ),
      (_, prefix, _sPrefix, digit) => `${prefix}${ATLASSIAN_BY_INDEX[Number(digit)]}`,
    );
  }
  if (Array.isArray(value)) return value.map(normalizeColorScaleRefs);
  if (value && typeof value === "object") {
    const next = {};
    for (const [key, entry] of Object.entries(value)) {
      next[key] = normalizeColorScaleRefs(entry);
    }
    return next;
  }
  return value;
}

export function renameColorScaleKeys(obj) {
  if (!obj || typeof obj !== "object" || Array.isArray(obj)) return obj;
  const next = {};
  for (const [key, value] of Object.entries(obj)) {
    const newKey = isLegacyColorStepKey(key) ? toAtlassianStepKey(key) : key;
    next[newKey] =
      value && typeof value === "object" && "value" in value && "type" in value
        ? value
        : renameColorScaleKeys(value);
  }
  return next;
}
