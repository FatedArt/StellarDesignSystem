# Color

Sistem warna Stellar dibangun di atas **token primitif** → **token semantik**.

## Skala warna

Token warna tersedia dalam dua kelompok utama:

- `br-colors.primary.0` – `br-colors.primary.9` — palette utama
- `br-colors.secondary.0` – `br-colors.secondary.9` — palette sekunder

## Cara pakai

Gunakan selalu token semantik, bukan nilai hardcoded:

```css
/* ✅ Benar */
color: var(--stellar-crv-crv-br-colors-primary-5);

/* ❌ Hindari */
color: #3B82F6;
```

## Aksesibilitas

Pastikan kontras warna teks terhadap background minimal **4.5:1** (AA) untuk teks body.
