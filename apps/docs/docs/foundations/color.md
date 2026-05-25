# Color

Sistem warna Stellar dibangun di atas **token primitif** → **token semantik**.

## Skala warna

Token warna tersedia dalam dua kelompok utama:

- `br-colors.primary.0` – `br-colors.primary.9` — palette utama
- `br-colors.secondary.0` – `br-colors.secondary.9` — palette sekunder

## Cara pakai

Gunakan token **semantic** atau **components**, bukan nilai hardcoded:

```css
/* ✅ Benar — semantic */
color: var(--stellar-semantic-color-action-primary);

/* ✅ Benar — component */
background: var(--stellar-components-button-variant-primary-background-default);

/* ❌ Hindari */
color: #14ACC1;
```

## Aksesibilitas

Pastikan kontras warna teks terhadap background minimal **4.5:1** (AA) untuk teks body.
