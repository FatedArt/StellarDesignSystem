# Design Tokens

Design tokens adalah satu sumber kebenaran untuk semua nilai desain (warna, spacing, tipografi, dll.) yang dipakai di Figma dan code.

## Alur token

```
Figma (Tokens Studio plugin)
  ↓ sync (folder: packages/tokens/sets)
packages/tokens/sets/*.json (Git)
  ↓ merge + Style Dictionary build
packages/tokens/dist/tokens.css
packages/tokens/dist/tokens.js
  ↓ import
Komponen React + halaman produk
```

## Tier token

| Tier | Set | Contoh | Keterangan |
|---|---|---|---|
| Core | `core` | `core.brColors.primary.s6` | Nilai mentah — jangan dipakai langsung di komponen |
| Semantik | `semantic` | `semantic.color.action.primary` | Makna UI — dipakai lintas komponen |
| Typography | `typography` | `typography.crv.body-medium.small` | Style teks siap pakai |
| Komponen | `components` | `components.button.variant.primary.background.default` | Spesifik per komponen |

## Urutan aktif set (Tokens Studio)

```
core → semantic → typography → components
```

## Token sets aktif (sidebar Token Studio)

Setelah Pull dari GitHub, sidebar harus menampilkan **4 set flat**:

```
core → semantic → typography → components
```

| Set | File | Isi |
|---|---|---|
| `core` | `sets/core.json` | Spacing, radius, warna primitif, font scale |
| `semantic` | `sets/semantic.json` | Warna aksi, teks, background, border |
| `typography` | `sets/typography.json` | Composite text styles |
| `components` | `sets/components.json` | Token Button, InputField, HeaderFooter |

## Pakai di CSS

Komponen UI membaca dari layer **components**:

```css
background: var(--stellar-components-button-variant-primary-background-default);
color: var(--stellar-components-button-variant-primary-color-default);
padding: var(--stellar-components-button-size-md-padding-y)
  var(--stellar-components-button-size-md-padding-x);
```

## Update token dari Figma

1. Buka **Tokens Studio** di Figma
2. Sync ke folder `packages/tokens/sets` di GitHub → buat PR
3. Review oleh design lead + engineer
4. Merge → CI otomatis build → CSS/JS ter-update
