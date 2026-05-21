# Stellar Design System

Sistem desain untuk produk Stellar — token, komponen React, dan dokumentasi dalam satu monorepo.

## Struktur repo

```
StellarDesignSystem/
├── packages/
│   ├── tokens/     # Design tokens (Tokens Studio → Style Dictionary → CSS/JS)
│   ├── ui/         # Komponen React
│   └── icons/      # Icon set
├── apps/
│   ├── storybook/  # Preview komponen live (Storybook 8)
│   └── docs/       # Guidelines & dokumentasi (Docusaurus)
├── .github/
│   └── workflows/  # CI build + deploy
└── README.md
```

## Quick start

### Prasyarat

- Node.js ≥ 20
- pnpm ≥ 9 (`npm i -g pnpm`)

### Install

```bash
git clone https://github.com/FatedArt/StellarDesignSystem.git
cd StellarDesignSystem
pnpm install
```

### Build tokens

```bash
pnpm tokens:build
```

### Jalankan Storybook

```bash
pnpm storybook
# → http://localhost:6006
```

### Jalankan Docs

```bash
pnpm docs
# → http://localhost:3000
```

## Alur kerja token (Figma → code)

```
Figma (Tokens Studio plugin)
  ↓  sync to GitHub
packages/tokens/tokens.json
  ↓  Style Dictionary build
packages/tokens/dist/tokens.css  +  tokens.js
  ↓  import
packages/ui  →  apps/storybook  →  produk
```

## Packages

| Package | Keterangan |
|---|---|
| `@stellar/tokens` | CSS variables + JS dari Figma tokens |
| `@stellar/ui` | Komponen React + TypeScript |
| `@stellar/icons` | Icon sebagai komponen React |

## CI/CD

| Workflow | Trigger | Output |
|---|---|---|
| `ci.yml` | Setiap PR | Lint + build semua packages |
| `deploy-storybook.yml` | Push ke `main` (ui/storybook berubah) | Chromatic deployment |
| `deploy-docs.yml` | Push ke `main` (docs/tokens berubah) | Vercel deployment |

## Contributing

Lihat [CONTRIBUTING.md](apps/docs/docs/contributing.md) untuk panduan lengkap.

## Links

- [Storybook](https://stellar-storybook.vercel.app)
- [Docs](https://stellar-ds.vercel.app)
- [Figma Library](#) _(link Figma DS Anda)_
