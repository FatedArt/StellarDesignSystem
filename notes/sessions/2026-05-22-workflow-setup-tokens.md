# Sesi 2026-05-22 — Workflow, Storybook, Chromatic & Migrasi Token

> Ringkasan percakapan setup Stellar Design System.  
> Branch kerja utama saat sesi berakhir: **`development`**

---

## Metadata

| | |
|---|---|
| **Repo** | https://github.com/FatedArt/StellarDesignSystem |
| **Lokasi lokal** | `~/Projects/StellarDesignSystem` |
| **Package manager** | pnpm 9 (via Corepack) |
| **Sync Tokens Studio** | GitHub → `development` → `packages/tokens/tokens.json` |

---

## 1. Setup awal monorepo

### Backlog awal (status akhir sesi)

| Item | Status |
|------|--------|
| `pnpm install` + `pnpm tokens:build` | Selesai (lokal) |
| GitHub Secret `CHROMATIC_PROJECT_TOKEN` | Ditambahkan user |
| Secret Vercel (`VERCEL_*`) | Belum (opsional untuk docs deploy) |
| Link Figma di Button story | Ada placeholder; perlu URL asli dari Figma |
| `tsconfig.build.json` UI | Sudah ada |
| Komponen Input, Header/Footer | Sudah ditambahkan |
| Docs elevation / accessibility | Dihapus dari sidebar sementara (file belum ada) |
| Pilot squad | Belum (proses organisasi) |

### Install pnpm

```bash
corepack enable
corepack prepare pnpm@9.0.0 --activate
cd ~/Projects/StellarDesignSystem
pnpm install
pnpm tokens:build
```

Warning `deprecated subdependencies` (glob, uuid) → **bukan error fatal**.

---

## 2. Storybook vs Chromatic

| Tool | Fungsi |
|------|--------|
| **Storybook** | Develop & preview komponen lokal (`localhost:6006`) |
| **Chromatic** | Hosting + visual regression di CI (bandingkan screenshot) |

### Jalankan Storybook lokal

```bash
cd ~/Projects/StellarDesignSystem
pnpm storybook
# buka http://localhost:6006
```

Root script sudah ada `prestorybook` → otomatis `tokens:build` dulu.

### Publish ke Chromatic (manual)

```bash
cd ~/Projects/StellarDesignSystem
pnpm tokens:build
cd apps/storybook
pnpm exec chromatic --project-token=TOKEN_ANDA --storybook-base-dir apps/storybook
```

**Catatan:** Butuh script `build-storybook` di `apps/storybook/package.json` (sudah ditambahkan).

### Workflow tim (disarankan)

1. Develop di Storybook lokal
2. Push ke GitHub → buat PR ke `main`
3. CI/Chromatic jalan otomatis di PR (workflow sudah ada trigger `pull_request`)
4. Review visual di Chromatic → merge

---

## 3. Error Storybook yang pernah muncul & perbaikan

### `Failed to fetch preview.ts`

**Penyebab:** `tokens.css` belum ada (build token gagal / belum dijalankan).

**Perbaikan:**
- Perbaiki referensi di `tokens.json` untuk Style Dictionary
- `pnpm tokens:build`
- Alias Vite ke source `@fatedart/ui` di `.storybook/main.ts`

### `ReferenceError: React is not defined` (Chromatic)

**Penyebab:** Story `AllSizes` pakai JSX di `render()` tanpa `import React`.

**Perbaikan:** Tambah `import React from "react"` di `Button.stories.tsx` (dan pola serupa untuk story custom lain).

### Path Git / `main.ts` tidak ditemukan (Chromatic)

**Penyebab:** Monorepo; Chromatic perlu `--storybook-base-dir apps/storybook`.

---

## 4. Token: dari mana CSS mengambil warna?

**Alur resmi:**

```
Figma (Tokens Studio) → tokens.json (Git) → Style Dictionary → tokens.css → komponen CSS
```

- **Bukan** hardcode langsung dari Figma Variables saat runtime di code.
- **Bukan** HEX mentah di production — pakai `var(--stellar-crv-...)`.

### Migrasi struktur: `main` → `crv` (2026-05-22)

**Masalah:** Path terlalu dalam (`main/crv/fontSizes/...`).

**Solusi:** Edit `packages/tokens/tokens.json`:
- Token set `main` di-rename menjadi **`crv`**
- Isi `main.crv.*` di-flatten ke `crv.*`
- Referensi `{main....}` → `{crv....}`
- CSS: `--stellar-main-*` → `--stellar-crv-*`

**Penting:** Perubahan harus **commit + push** ke branch yang dipakai Tokens Studio (`development`). Pull saja tidak cukup kalau GitHub belum ter-update.

Setelah Pull di Figma → **Export to Figma → Variables** (Variables tidak auto-update dari Pull).

### Bug rename CSS sementara

Replace `--stellar-main-` → `--stellar-crv-` sempat menghasilkan `--stellar-crv-crv-*` (karena `main-crv`). Sudah diperbaiki ke `--stellar-crv-br-colors-*`.

---

## 5. Tokens Studio — tips operasional

### Local document vs GitHub sync

| Mode | Kapan |
|------|-------|
| **Local document** | Bebas tambah set/token lewat UI (`+ New Set`) |
| **GitHub sync** | Struktur mengikuti `tokens.json` di repo; tambah set via JSON + Pull |

**Keduanya tidak bisa aktif bersamaan di satu file** dengan nyaman — gunakan bergantian.

### Dulu maintenance terasa sulit

- Token apply kadang jadi **HEX** di panel Fill, bukan variable path.
- Sekarang (2023–2024+): export ke **Figma Variables** → tampil `crv/brColors/...` seperti local variable.

### Inspect token per layer (lambat)

Kurangi dengan:
- Token semantik, bukan primitif langsung di komponen
- Satu token padding (bukan 4 sisi terpisah jika nilai sama)
- Bulk remap saat rename/hapus token

### Hapus folder `main` di UI

**Delete group** = hapus semua isi.  
**Benar:** edit JSON / rename set, jangan Delete parent.

---

## 6. Penamaan design system (referensi Atlassian)

### 3 lapisan token

1. **Primitif** — `crv/brColors/primary/6` (jangan dipakai langsung di komponen produk)
2. **Semantik** — `color.background.brand.bold` (untuk UI sehari-hari)
3. **Komponen** — hanya jika benar-benar unik

### Komponen (code / Figma)

- Nama: `Button`, `InputField`, `AppHeader` (PascalCase)
- Props: `appearance`, `size`, `isDisabled`, `isLoading`
- Storybook: `Components/Button`, `Components/Input Field`

---

## 7. Komponen yang ditambahkan di sesi

| Komponen | Lokasi code | Storybook |
|----------|-------------|-----------|
| InputField | `packages/ui/src/components/InputField/` | `Components/Input Field` |
| Header, Footer, Mobile* | `packages/ui/src/components/HeaderFooter/` | `Components/HeaderFooter` |
| Button (diperbarui) | variants: primary, secondary, outline, tonal, text, destruction | `Components/Button` |

Figma Input Field:  
https://www.figma.com/design/iFjIDFJF5bYC7uyHJAY7Ae/Analyst-CRV---Stellar-Design-System-1.0?node-id=178-46032

---

## 8. Git & GitHub

### Kenapa `git remote add` error?

`origin` sudah ada → langsung `git push -u origin <branch>`.

### Push migrasi token ke `development`

Commit utama:
- `103fa28` — refactor tokens + komponen baru
- `b9431ac` — merge ke development
- `a95f741` — fix CI (docs build, CSS vars, static assets)

### PR (Pull Request)

Permintaan merge branch fitur → `main`, dengan review + CI sebelum merge.

---

## 9. CI gagal & perbaikan (`a95f741`)

**Penyebab:** Build **Docusaurus** gagal, bukan token.

| Masalah | Fix |
|---------|-----|
| Sidebar kategori Patterns kosong | Hapus dari `sidebars.ts` |
| Link ke halaman foundation yang belum ada | Hapus dari sidebar |
| Folder `static/` tidak ada | Tambah logo + favicon SVG |
| Docs tanpa dependency tokens | Tambah `@fatedart/tokens` |
| Broken link `/` | `src/pages/index.tsx` redirect ke docs |
| CSS `--stellar-crv-crv-*` | Perbaiki ke `--stellar-crv-*` |

Workflow CI (`.github/workflows/ci.yml`):
1. `pnpm install --frozen-lockfile`
2. `pnpm tokens:build`
3. Build UI, Storybook, Docs

---

## 10. Perintah cepat (cheat sheet)

```bash
# Setup
corepack enable && corepack prepare pnpm@9.0.0 --activate
pnpm install && pnpm tokens:build

# Develop
pnpm storybook          # http://localhost:6006
pnpm docs               # Docusaurus dev

# Build seperti CI
pnpm tokens:build
pnpm --filter @fatedart/ui run build
pnpm --filter @fatedart/storybook run build
pnpm --filter @fatedart/docs run build

# Sync Git (branch development)
git pull origin development
git push origin development
```

---

## 11. Langkah lanjutan (belum selesai)

- [ ] Merge `development` → `main` (supaya CI main hijau)
- [ ] Isi URL Figma asli di stories (Button, dll.)
- [ ] Export Variables ulang di Figma setelah struktur `crv`
- [ ] Tambah secret Vercel jika mau auto-deploy docs
- [ ] Rename set `Typhography` → `typography` (typo)
- [ ] Tambah lapisan token **semantik** di `tokens.json`
- [ ] Buat `foundations/elevation.md` & `accessibility.md`
- [ ] Pisahkan `HeaderFooter` → `AppHeader` + `AppFooter` (nama komponen)

---

## 12. File penting di repo

| Path | Isi |
|------|-----|
| `CONTEXT.md` | Konteks proyek persisten (update via agent) |
| `notes/` | Ringkasan sesi (folder ini) |
| `packages/tokens/tokens.json` | Sumber token Tokens Studio |
| `packages/tokens/dist/tokens.css` | Output CSS variables |
| `.github/workflows/ci.yml` | Pipeline CI |
| `.github/workflows/deploy-storybook.yml` | Deploy Chromatic |
| `apps/storybook/stories/` | Stories komponen |

---

*Terakhir diperbarui: 22 Mei 2026*
