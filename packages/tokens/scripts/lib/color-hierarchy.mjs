/**
 * Atlassian-style primitive color groups in core.
 * Used by color-scale ref normalization.
 */
export const COLOR_PALETTE_ROOTS = [
  "brand",
  "neutral",
  "green",
  "teal",
  "lime",
  "yellow",
  "blue",
];

export const COLOR_PALETTE_ROOTS_RE = COLOR_PALETTE_ROOTS.join("|");

/** Legacy → Atlassian hierarchy ref mapping (longest match first). */
export const LEGACY_COLOR_REF_REPLACEMENTS = [
  ["brColors.", "brand."],
  ["dfColors.onyx.", "neutral.light."],
  ["dfColors.dark.", "neutral.dark."],
  ["dfColors.green.", "green."],
  ["dfColors.teal.", "teal."],
  ["dfColors.lime.", "lime."],
  ["dfColors.yellow.", "yellow."],
  ["dfColors.blue.", "blue."],
];

export function migrateColorHierarchyRefs(value) {
  if (typeof value !== "string") return value;
  let next = value;
  for (const [from, to] of LEGACY_COLOR_REF_REPLACEMENTS) {
    next = next.replaceAll(from, to);
  }
  return next;
}

export function migrateColorHierarchyRefsDeep(value) {
  if (typeof value === "string") return migrateColorHierarchyRefs(value);
  if (Array.isArray(value)) return value.map(migrateColorHierarchyRefsDeep);
  if (value && typeof value === "object") {
    const next = {};
    for (const [key, entry] of Object.entries(value)) {
      next[key] = migrateColorHierarchyRefsDeep(entry);
    }
    return next;
  }
  return value;
}

export function restructureCoreColors(core) {
  const { brColors, dfColors, ...rest } = core;
  if (!brColors || !dfColors) {
    throw new Error("Expected brColors and dfColors in core.json before migration");
  }

  const { dark, onyx, green, teal, lime, yellow, blue } = dfColors;

  return {
    ...rest,
    brand: brColors,
    neutral: { light: onyx, dark },
    green,
    teal,
    lime,
    yellow,
    blue,
  };
}
