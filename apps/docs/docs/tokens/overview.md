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

| Tier | Contoh | Keterangan |
|---|---|---|
| Primitif | `brColors.primary.5` | Nilai mentah, jangan pakai langsung di komponen |
| Semantik | `color.action.primary` | (coming soon) Nilai bermakna, pakai di komponen |
| Komponen | `button.background.default` | (coming soon) Spesifik per komponen |

## Update token dari Figma

1. Buka **Tokens Studio** di Figma
2. Sync ke GitHub → buat PR
3. Review oleh design lead + engineer
4. Merge → CI otomatis build → CSS/JS ter-update

## Token sets aktif

| Set | Isi |
|---|---|
| `main` | Spacing, warna primitif |
| `Typhography` | Tipografi (font, size, weight, line-height) |
