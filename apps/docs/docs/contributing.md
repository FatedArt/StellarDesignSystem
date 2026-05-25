# Contributing

Panduan berkontribusi ke Stellar Design System.

## Flow kontribusi

### Menambah / mengubah komponen

1. **Diskusi** — buka issue atau diskusi di Figma dulu
2. **Design** — update komponen di Figma library
3. **Token** — jika butuh token baru, update Tokens Studio → sync Git
4. **Code** — implementasi di `packages/ui/src/components/`
5. **Story** — tambah/update story di `apps/storybook/stories/`
6. **Docs** — update halaman di `apps/docs/docs/components/`
7. **PR** — sertakan screenshot Figma + Storybook

## Git flow (development -> main)

1. Buat branch dari `development`:
   - `feat/nama-perubahan` atau `fix/nama-perubahan`
2. Merge ke `development` untuk validasi integrasi
3. Setelah stabil, buka PR `development` -> `main`
4. `main` dianggap production branch untuk konsumsi developer

### Menambah token baru

1. Definisikan di Tokens Studio plugin Figma
2. Sync ke folder `packages/tokens/sets` di GitHub
3. Buat PR dengan deskripsi: tujuan token + komponen yang akan pakai

## Naming convention

| Hal | Format | Contoh |
|---|---|---|
| Komponen | PascalCase | `Button`, `TextField` |
| Props | camelCase | `variant`, `isLoading` |
| Token | dot-notation | `color.background.primary` |
| File | PascalCase untuk komponen | `Button.tsx`, `Button.module.css` |
| Branch fitur | `feat/nama` / `fix/nama` | `feat/add-badge-component` |
| Branch integrasi | `development` | `development` |
| Branch production | `main` | `main` |

## Reviewer

Setiap PR butuh **minimal 1 approval** dari:
- Design lead — untuk perubahan visual / token
- Engineer — untuk perubahan code / API komponen
