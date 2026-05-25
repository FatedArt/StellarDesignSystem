# Design Tokens

Design tokens adalah satu sumber kebenaran untuk semua nilai desain (warna, spacing, tipografi, dll.) yang dipakai di Figma dan code.

## Alur token

```
Figma (Tokens Studio plugin)
  ↓ sync
packages/tokens/tokens.json (Git)
  ↓ Style Dictionary build
packages/tokens/dist/tokens.css
packages/tokens/dist/tokens.js
  ↓ import
Komponen React + halaman produk
```

## Tier token

| Tier | Set | Contoh | Keterangan |
|---|---|---|---|
| Core | `core` | `core.brColors.primary.6` | Nilai mentah — jangan dipakai langsung di komponen |
| Semantik | `semantic` | `semantic.color.action.primary` | Makna UI — dipakai lintas komponen |
| Typography | `typography` | `typography.crv.body-medium.small` | Style teks siap pakai |
| Komponen | `components` | `components.button.variant.primary.background.default` | Spesifik per komponen |

## Urutan aktif set (Tokens Studio)

```
core → semantic → typography → components
```

## Token sets aktif

| Set | Isi |
|---|---|
| `core` | Spacing, radius, warna primitif, font scale (dulu `crv`) |
| `semantic` | Warna aksi, teks, background, border |
| `typography` | Composite text styles (dulu `Typhography`) |
| `components` | Token Button, InputField, HeaderFooter |

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
2. Sync ke GitHub → buat PR
3. Review oleh design lead + engineer
4. Merge → CI otomatis build → CSS/JS ter-update
