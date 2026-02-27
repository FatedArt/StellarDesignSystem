# Header Desktop (32:5011)

**Design System**: Stellar Design System v1.0  
**Component ID**: 32:5011  
**Platform**: Desktop (≥1024px)

---

## 1. Usage Guidelines

### Mandatory Implementation Rules
- Gunakan sebagai top navigation wrapper untuk aplikasi dashboard/analytics
- HARUS `position: sticky; top: 0` dengan z-index 100, selalu visible saat scroll
- Content di bawah header harus scrollable tanpa mengganggu header positioning
- Never modify header width dari full-width default (1712px)
- Selalu resolve warna menggunakan CSS custom properties (design tokens), bukan hardcode hex values

### Spacing & Measurements
| Property | Value |
|----------|-------|
| **Height** | 61px |
| **Width** | 1712px (full-width) |
| **Padding Horizontal** | 24px (2xl token) |
| **Padding Vertical** | 8px (sm token) |
| **Gap Between Items** | 20px (xl token) |
| **Border** | Bottom 1px solid |

### Typography Standards
| Element | Style |
|---------|-------|
| **User Name** | crv/body-semibold/small (14px, weight 600) |
| **User Role** | crv/body-regular/xsmall (12px, weight 400) |
| **Search Placeholder** | crv/body-regular/medium (16px, weight 400) |

### Color Palette
| Element | Token | Fallback |
|---------|-------|----------|
| **Background** | `--semantic/dark/dark-7` | #1a1b1e |
| **Border** | `--border/base-default` | #373a40 |
| **Text Primary** | `--text/base-default` | #f8f9fa |
| **Search BG** | `--background/transparant-default` | rgba(92,95,102,0.1) |

### Komponen Internal
1. **Logo** (149.643px × 31px) - IntelliBroń branding
2. **Search Field** (320px) - Placeholder "Placeholder", icon search 16px, backdrop-blur 2.5px
3. **Bell Icon** (24px) - System/Bell Ringing icon untuk notifications
4. **Divider** (1px vertical line) - Onyx-7 color
5. **Avatar + User Info** - Avatar 36px circular, name + role label

---

## 2. When to Use & When NOT to Use

### ✅ **USE WHEN:**
- Building main dashboard atau analytics page (viewport ≥ 1024px)
- User perlu akses ke: branding, workspace selector, search/filter, notifications, profile secara instant
- Layout memerlukan persistent top navigation sticky
- Aplikasi memiliki multi-workspace feature ("All Companies" dropdown)
- User harus notified tentang real-time alerts via bell icon
- Content area memiliki scroll depth yang significant

### ❌ **DO NOT USE WHEN:**
- Building modal dialog atau overlay
- Halaman login/auth (gunakan minimal header)
- Public landing pages
- Viewport < 1024px (gunakan Mobile Header variant)
- Component testing/storybook (gunakan mocked structure)

### ⚠️ **DO NOT MIX:**
- Desktop header + Mobile footer (harus matched pair)
- Header dari different design system versions
- Hardcoded colors selain design tokens

---

## 3. Behavior

### Interaction States

| Element | Interaction | Behavior | Visual Feedback |
|---------|---|---|---|
| **Logo** | Click | Navigate ke dashboard home | No visual change (external action) |
| **"All Companies" Dropdown** | Click/Hover | Expand/collapse company selector | Arrow rotate, panel open below header |
| **Search Field** | Focus | Input aktif, keyboard ready | Border highlight, backdrop-blur intensify |
| **Bell Icon** | Click | Open notification panel/drawer | Panel slide in from right |
| **Bell Icon** | Notification Active | Visual indicator on icon | Badge/dot dengan notification color token | Click
| **Avatar** | Click | Open user menu (Logout, Settings, etc.) | Menu panel appear below avatar |

#### ✅ **DO:**
- Provide visual feedback (opacity, scale, color change) pada setiap interactive element
- Show tooltip saat hover untuk clarity (e.g., "Notifications", "Profile Menu")
- Maintain z-index layering yang konsisten (header > panels > dropdowns)
- Use smooth transitions (200-300ms) untuk state changes
- Disable interactive elements saat loading (disabled state styling)

#### ❌ **DON'T:**
- Hide header elements tanpa proper feedback
- Change header height atau structure saat interaksi
- Use animations > 500ms (slow/annoying user experience)
- Overlap header panels dengan content area tanpa z-index protection
- Break sticky positioning dengan position changes

---

### Scroll Behavior
- Header tetap sticky saat page scroll
- No hide/show animation (always visible)
- Shadow effect optional tapi recommended untuk depth indication
- Content scrolls behind header (z-index handling)

#### ✅ **DO:**
- Maintain sticky positioning saat user scroll down/up
- Add subtle shadow (0 2px 8px rgba(0,0,0,0.1)) untuk depth layering
- Keep z-index ≥ 100 untuk header tetap on top
- Allow content slide behind header naturally

#### ❌ **DON'T:**
- Hide header saat scroll (breaks sticky requirement)
- Translate header pada scroll events
- Change header height/padding saat scroll
- Use transform yang affects z-index stacking context
- Slide header out of viewport

---

### Edge Cases
| Case | Expected Behavior |
|---|---|
| **Very Long Company Name** | Text truncate dengan ellipsis, full name pada tooltip hover |
| **Very Long User Name** | Text truncate atau wrap ke 1 line max dengan ellipsis |
| **No Notifications** | Bell icon outline only, no badge |
| **Offline Network** | Header visible, search/notification disabled, no alerts |

#### ✅ **DO:**
- Truncate long names dengan ellipsis (`text-overflow: ellipsis`)
- Show full text dalam tooltip pada hover
- Gracefully degrade functionality saat offline
- Maintain layout integrity saat content changes
- Handle missing data dengan fallback values

#### ❌ **DON'T:**
- Let long text overflow dan break layout
- Hide elements jika data missing (show placeholders)
- Disable header entirely saat offline (keep navigation functional)
- Change component size/padding based on content length
- Surprise user dengan sudden layout shifts

---

## Asset Requirements
- Logo IntelliBroń (vector SVG)
- User Avatar (36px × 36px, circular, border-radius 64px)
- Icons: Bell Ringing (24px), Search (16px)
- Divider line (1px × full height)

---

## Implementation Checklist
- [ ] Use design tokens untuk colors (tidak hardcode)
- [ ] Sticky positioning dengan z-index 100
- [ ] Avatar dengan border-radius 64px dan background fallback #d9d9d9
- [ ] Search field dengan backdrop-blur 2.5px
- [ ] Divider 1px dengan token color
- [ ] All interactive elements have hover states
- [ ] Responsive text truncation untuk panjang names
- [ ] ARIA labels untuk accessibility
- [ ] Testing: scroll behavior, sticky positioning, shadow layering

---

**Last Updated**: February 2026  
**Status**: Production Ready  
**Accessibility**: WCAG 2.1 Level AA (separate a11y documentation)
