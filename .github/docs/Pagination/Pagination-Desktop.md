# Pagination Desktop (212:5640, 212:5639)

**Design System**: Stellar Design System v1.0  
**Component ID**: 212:5640 (Default), 212:5639 (All Records)  
**Platform**: Desktop (≥1024px)

---

## 1. Usage Guidelines

### Mandatory Implementation Rules
- Gunakan untuk navigasi antar halaman pada tabel, list, atau grid data
- Selalu tampilkan "Showing X-Y of Z" text untuk user context tentang posisi dalam dataset
- Button navigasi (Previous/Next) HARUS di-disable saat di halaman pertama/terakhir
- Current page HARUS highlighted dengan background color token primary
- Layout HORIZONTAL pada desktop (single-line layout)
- Selalu resolve values dari design tokens, tidak hardcode

### Spacing & Measurements
| Property | Value |
|----------|-------|
| **Height** | 32px |
| **Width** | 780px (full content width) |
| **Gap Between Items** | 8px (sm token) |
| **Padding** | None (flex container) |
| **Page Number Button** | 32px × 32px |
| **Icon Button** | 32px × 32px |

### Typography Standards
| Element | Style |
|---------|-------|
| **"Showing" Label** | crv/body-regular/small (14px, weight 400, line-height 18px) |
| **Record Count Text** | crv/body-regular/small (14px, weight 400, line-height 18px) |
| **Page Numbers** | Nunito Sans Regular (12px, weight 400, line-height 16px) |

### Color Palette
| Element | Token | Fallback |
|---------|-------|----------|
| **Active Page BG** | `--base/primary/primary-6` | #0f8696 |
| **Inactive Button BG** | `--transparant/neutral/646464---10` | rgba(92,95,102,0.1) |
| **Button Border** | `--base/dark/dark-4` | #373a40 |
| **Text Primary** | `--text/base-default` | #f8f9fa |
| **Text Secondary** | `--base/onyx/onyx-2` | #e9ecef |

### Komponen Internal
1. **Record Dropdown** - "Showing [10▼]" dengan dropdown untuk select records per page
2. **Range Text** - "1-10 of 1000" atau "1-10 of all records" (variant dependent)
3. **Navigation Buttons** - Previous/Next double chevron buttons
4. **Page Numbers** - Numbered buttons untuk direct page navigation
5. **Ellipsis** - Dots (...) untuk skip multiple pages

---

## 2. When to Use & When NOT to Use

### ✅ **USE WHEN:**
- Displaying paginated data dalam tabel, list, atau grid (data > 1 page)
- Dataset size > 50 records yang memerlukan pagination
- User perlu control jumlah records per halaman (Default variant)
- User perlu see all records option (All Records variant)
- Desktop viewport width ≥ 1024px
- Content area memiliki height constraints

### ❌ **DO NOT USE WHEN:**
- Dataset < 50 records (tampilkan semua dalam satu halaman)
- Virtual scrolling/infinite scroll pattern preferred
- Mobile viewport < 1024px (gunakan Pagination-Mobile variant)
- Internal navigation (gunakan breadcrumb/stepper)
- Modal dialogs (use custom pagination)

### ⚠️ **DO NOT MIX:**
- Desktop + Mobile variant dalam same viewport (choose one)
- Default + All Records variant tanpa consistency
- Manual page manipulation dengan automatic pagination
- Date-based pagination dengan numeric pagination

---

## 3. Behavior

### Record Dropdown States
| State | Behavior | Visual Feedback |
|---|---|---|
| **Default** | Showing "10" records | No dropdown open |
| **Focus** | Dropdown expanded | Chevron rotate, options list show |
| **Select** | User select new record count | Update "Showing X" value, reload data, go to page 1 |
| **Disabled** | Only 1 record atau < selected amount | Dropdown disabled, cursor not-allowed |

#### ✅ **DO:**
- Show common options: 10, 25, 50, 100, All
- Reset to page 1 saat changing record count
- Persist user's record count preference (localStorage/session)
- Disable dropdown jika total records < smallest option
- Show visual indication saat loading new data

#### ❌ **DON'T:**
- Keep user di halaman lama saat record count changed (must reset to page 1)
- Allow record count > total dataset size
- Show arbitrary page numbers setelah changing record count
- Forget persisting preference across sessions
- Keep dropdown open saat selecting option

---

### Page Navigation Buttons
| Element | Interaction | Behavior | Visual Feedback |
|---|---|---|---|
| **Previous (Double Chevron)** | Click | Navigate ke page - 2 atau first page | Button disabled jika halaman 1-2 |
| **Previous (Single Chevron)** | Click | Navigate ke page - 1 | Button disabled jika halaman 1 |
| **Next (Single Chevron)** | Click | Navigate ke page + 1 | Button disabled jika last page |
| **Next (Double Chevron)** | Click | Navigate ke last page | Button disabled jika last page atau page-1 |

#### ✅ **DO:**
- Disable button visually saat at boundary (opacity 0.5, cursor not-allowed)
- Provide smooth scroll to table top saat page change
- Show loading state pada table saat data fetching
- Maintain scroll position context jika content large
- Update URL dengan page number (for bookmarking/sharing)

#### ❌ **DON'T:**
- Keep button enabled but non-functional (always disable when can't navigate)
- Sudden layout jumps saat page change
- Forget to disable buttons at boundaries
- Scroll user far down saat page navigate
- Hide pagination buttons saat loading

---

### Page Number Buttons
| Element | Interaction | Behavior | Visual Feedback |
|---|---|---|---|
| **Current Page** | Display only | Highlighted dengan primary color | Background #0f8696, text white |
| **Other Page** | Click | Navigate ke page number | Gray background, text secondary |
| **Ellipsis (...)** | Hover | Show all skipped page numbers (tooltip) | Tooltip appear |
| **Ellipsis (...)** | Not clickable | Indicate gap between page ranges | No interaction |

#### ✅ **DO:**
- Highlight current page dengan primary background color
- Show page range intelligently: 1, 2, 3, ..., X-1, X (current), X+1, ..., N-1, N
- Add hover state pada non-current page buttons (opacity change)
- Use ellipsis untuk skip > 3 consecutive pages
- Show clear visual distinction between current/inactive pages

#### ❌ **DON'T:**
- Show all page numbers jika > 20 pages (overwhelm user)
- Highlight multiple pages simultaneously
- Hide current page number
- Use confusing ellipsis behavior (must be clear skipped pages shown on hover)
- Make ellipsis clickable (informational only)

---

### Range Text Display
| Variant | Text Format | Example |
|---------|-----------|---------|
| **Default** | "1-X of YYYY" | "1-10 of 1000" |
| **All Records** | "1-X of all records" | "1-10 of all records" |

#### ✅ **DO:**
- Update range text saat page change (1-10, 11-20, 21-30, etc.)
- Use proper language untuk "of" context (Indonesia: "dari")
- Calculate range dynamically berdasarkan current page + record count
- Show visual indication jika all records displayed

#### ❌ **DON'T:**
- Hardcode range text values
- Show incorrect range pada page change
- Use ambiguous wording ("items" vs "records")
- Forget updating range saat record count dropdown changed

---

### Loading & Error States
| State | Behavior |
|---|---|
| **Data Loading** | Show skeleton/loading state pada table, pagination buttons disabled, text grayed |
| **No Results** | Show "0 of 0" range, all pagination buttons disabled, message display |
| **API Error** | Show error notification, allow retry, pagination buttons disabled |
| **Offline** | Show offline indicator, pagination disabled temporarily |

#### ✅ **DO:**
- Disable pagination buttons saat data loading
- Show loading indicator di table content area (not in pagination itself)
- Display error message contextually (notification above table)
- Provide retry mechanism jika fetch failed
- Gracefully handle empty state (0 records)

#### ❌ **DON'T:**
- Show loading spinner dalam pagination component
- Leave buttons enabled saat loading (appear functional but non-responsive)
- Hide pagination entirely saat loading (keep structure for layout stability)
- Forget showing 0 result state clearly
- Allow multiple simultaneous pagination requests

---

### Responsive Breakpoint Transitions
| Breakpoint | Action |
|---|---|
| **≥ 1024px** | Use Desktop variant (horizontal layout) |
| **768px - 1023px** | Stay on Desktop variant atau prepare transition |
| **< 768px** | SWITCH to Mobile variant (vertical layout) |

#### ✅ **DO:**
- Smooth transition antara desktop/mobile layouts
- Preserve user's current page saat resize
- Test extensively di breakpoint zones
- Update pagination layout without reloading data

#### ❌ **DON'T:**
- Abrupt layout jumps saat breakpoint cross
- Reset current page saat responsive change
- Lose user context during resize
- Break navigation during transition

---

### Edge Cases
| Case | Expected Behavior |
|---|---|
| **Last Page Partial** | If page 5 has 7 records (not full 10) | Show "41-47 of 47" |
| **Single Page** | Total records ≤ record count | Hide pagination buttons, show "1-X of X" |
| **Very Large Dataset** | 1M+ records | Use efficient page number calculation |
| **No Records** | Empty dataset | Show "0 of 0", disable all buttons |

#### ✅ **DO:**
- Handle partial last page correctly
- Hide pagination if only 1 page available
- Optimize for large datasets (don't load all page numbers)
- Show proper 0 state messaging
- Test dengan various dataset sizes

#### ❌ **DON'T:**
- Show incorrect range untuk partial last page
- Keep pagination visible dengan no pages
- Load all 1M page numbers (crash browser)
- Confuse user saat verylarge or empty datasets

---

## Asset Requirements
- Icons: Chevron Left (24px), Chevron Right (24px), Double Chevron Left (24px), Double Chevron Right (24px), Chevron Down (24px)
- Design tokens: Primary color, neutral transparent color, text colors

---

## Implementation Checklist
- [ ] Use design tokens untuk all colors (tidak hardcode)
- [ ] Disable buttons at boundaries (previous at page 1, next at last page)
- [ ] Current page highlighted dengan primary background
- [ ] Range text updates dinamically saat page/record count change
- [ ] Record dropdown triggers data reload dan reset to page 1
- [ ] Ellipsis shows tooltip pada hover (skipped pages)
- [ ] Loading state disables pagination buttons
- [ ] Error handling dengan retry mechanism
- [ ] URL updates dengan page number (for bookmarking)
- [ ] Responsive behavior tested di breakpoints
- [ ] ARIA labels untuk buttons dan current page
- [ ] Testing: various dataset sizes, edge cases, loading states

---

## Accessibility
- All buttons must have descriptive `aria-label` (e.g., "Go to page 2", "Next page")
- Current page button must have `aria-current="page"`
- Disabled buttons must have `disabled` attribute + visual styling
- Pagination must be keyboard navigable (Tab, Enter)
- Focus should remain visible on all interactive elements
- Screen readers must announce "Page X of Y" context

---

**Last Updated**: February 2026  
**Status**: Production Ready  
**Accessibility**: WCAG 2.1 Level AA (separate a11y documentation)
