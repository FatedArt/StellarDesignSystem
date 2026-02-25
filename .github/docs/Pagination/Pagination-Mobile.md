# Pagination Mobile (213:6086, 213:6080)

**Design System**: Stellar Design System v1.0  
**Component ID**: 213:6086 (Default), 213:6080 (All Records)  
**Platform**: Mobile (<768px)

---

## 1. Usage Guidelines

### Mandatory Implementation Rules
- Gunakan untuk navigasi antar halaman pada mobile viewport (<768px)
- Layout VERTICAL stacked (Record Pagination + Page Navigation terpisah)
- Mobile-optimized: larger touch targets (min 32px), simplified navigation
- Terbatas page number display (show max 5 page numbers untuk readability)
- Selalu gunakan design tokens untuk styling
- Responsif terhadap landscape orientation

### Spacing & Measurements
| Property | Value |
|----------|-------|
| **Height** | 76px (duas sections) |
| **Width** | 780px (responsive container) |
| **Gap Between Sections** | 12px (md token) |
| **Gap Within Items** | 8px (sm token) |
| **Page Number Button** | 32px × 32px (touch-friendly) |
| **Padding** | None (sections flush) |

### Typography Standards
| Element | Style |
|---------|-------|
| **"Showing" Label** | crv/body-regular/small (14px, weight 400) |
| **Record Count Text** | crv/body-regular/small (14px, weight 400) |
| **Page Numbers** | Nunito Sans Regular (12px, weight 400) |

### Color Palette
| Element | Token | Fallback |
|---------|-------|----------|
| **Active Page BG** | `--base/primary/primary-6` | #0f8696 |
| **Inactive Button BG** | `--transparant/neutral/646464---10` | rgba(92,95,102,0.1) |
| **Button Border** | `--base/dark/dark-4` | #373a40 |
| **Text Primary** | `--text/base-default` | #f8f9fa |

### Komponen Internal
#### **Section 1: Record Pagination**
- "Showing" label (fixed)
- Record dropdown button (32px)
- Range text (1-10 of 1000 atau 1-10 of all records)

#### **Section 2: Page Navigation**
- Previous navigation buttons (chevrons)
- Current page number (highlighted)
- Numbered page buttons (max 5 visible)
- Next navigation buttons

---

## 2. When to Use & When NOT to Use

### ✅ **USE WHEN:**
- Mobile viewport width < 768px
- Displaying paginated data di mobile device
- Limited screen space untuk Pagination layout
- User needs larger touch targets (accessibility)
- Vertical stacked layout preferred untuk mobile UX
- Dataset > 50 records requiring pagination

### ❌ **DO NOT USE WHEN:**
- Desktop viewport ≥ 1024px (use Pagination-Desktop)
- Dataset < 50 records (show all dalam single page)
- Tablet landscape orientation (consider desktop variant)
- Virtual scrolling pattern preferred
- Internal navigation structure (use breadcrumb)

### ⚠️ **DO NOT MIX:**
- Mobile + Desktop variant dalam same component state
- Mobile pagination dengan desktop data loading pattern
- Inconsistent record count options across variants

---

## 3. Behavior

### Record Pagination Section (Line 1)

#### **"Showing" Dropdown States**
| State | Behavior | Visual Feedback |
|---|---|---|
| **Default** | Display selected value (e.g., "10") | Button with chevron, no dropdown |
| **Pressed** | User tap dropdown | Chevron rotate, options modal/popover appear |
| **Selection** | User select new count | Update value, close dropdown, reload data to page 1 |

#### ✅ **DO:**
- Show dropdown options dalam modal/popover (not inline, saves space)
- Vertical list untuk mobile readability
- Large touch targets (min 44x44px for options)
- Persist selection ke localStorage
- Close dropdown after selection automatically
- Common options: 10, 25, 50, All

#### ❌ **DON'T:**
- Show inline dropdown (takes up valuable mobile space)
- Keep dropdown open after selection
- Forget persisting user preference
- Show too many options (max 5-6)
- Force page jump saat record count change (must go to page 1)

---

### Range Text Display
| Variant | Text | Example |
|---------|------|---------|
| **Default** | "1-X of YYYY" stacked | "1-10 of 1000" |
| **All Records** | "1-X of all records" stacked | "1-10 of all records" |

#### ✅ **DO:**
- Display range centered atau right-aligned untuk balance
- Update range dynamically saat page change
- Use readable color contrast untuk text
- Wrap text jika needed (mobile responsive)
- Calculate range dari server (don't hardcode)

#### ❌ **DON'T:**
- Truncate range text dengan ellipsis
- Hardcode values
- Use tiny font sizes (maintain readability)
- Forget updating saat record count change

---

### Page Navigation Section (Line 2)

#### **Navigation Buttons**
| Button | Mobile Behavior | Visual Feedback |
|---|---|---|
| **Previous (Chevrons)** | Go to first page atau skip backwards | Disabled at start, full opacity when enabled |
| **Previous (Chevron)** | Go to previous page | Disabled at page 1 |
| **Current Page** | Display only | Highlighted dengan primary color |
| **Next (Chevron)** | Go to next page | Disabled at last page |
| **Next (Chevrons)** | Go to last page atau skip forward | Disabled at end, full opacity when enabled |

#### ✅ **DO:**
- Disable buttons completely at boundaries (no hover trick)
- Use 32px×32px minimum button size (44px recommended)
- Show visual disabled state (opacity 0.5)
- Provide haptic feedback on button tap (mobile native)
- Use chevron icons consistently
- Update all buttons after page navigation

#### ❌ **DON'T:**
- Keep buttons small (< 32px)
- Use ambiguous disabled state (must be clear)
- Allow navigation beyond boundaries
- Remove disabled state styling
- Forget updating button states after navigation
- Use complex icon styles (keep simple)

---

### Page Number Display
| Display Mode | Behavior | Example |
|---|---|---|
| **Show Max 5 Pages** | Center current page in list | 2, 3, [4], 5, 6 |
| **At Start** | Show first 5 pages | [1], 2, 3, 4, 5 |
| **At End** | Show last 5 pages | N-4, N-3, N-2, N-1, [N] |

#### ✅ **DO:**
- Show max 5 page numbers untuk mobile space
- Center current page dalam visible range
- Highlight current page dengan primary background
- Show page numbers as large buttons (32px)
- Use ellipsis (...) untuk indicate skipped ranges
- Adjust display saat reaching boundaries

#### ❌ **DON'T:**
- Show all page numbers (overwhelm small screen)
- Truncate page numbers dari display
- Use tiny font untuk page numbers
- Forget centering current page
- Make ellipsis clickable

---

### Loading & Error States
| State | Behavior |
|---|---|
| **Data Loading** | Pagination buttons grayed/disabled, loading indicator pada content area |
| **No Results** | Show "0 of 0", disable all buttons, message display |
| **Network Error** | Show error toast/banner, retry button, pagination disabled |
| **Offline** | Show offline state, pagination disabled until connection restored |

#### ✅ **DO:**
- Disable pagination during data fetch
- Show loading state distinctively (not in pagination itself)
- Display error clearly (toast/notification)
- Provide retry mechanism
- Handle 0 result state gracefully
- Restore functionality saat error resolved

#### ❌ **DON'T:**
- Show spinner dalam pagination buttons
- Leave buttons enabled while loading
- Hide entire pagination saat loading (breaks layout)
- Forget showing 0 result state
- Lack retry mechanism saat error

---

### Responsive Behaviors

#### **Portrait to Landscape Rotation**
- Record Pagination: Adjust width untuk fit landscape
- Page Navigation: Reflow buttons, maintain button size
- No data reload atau page reset

#### **Viewport Changes (768px Threshold)**
- < 768px: Use Mobile variant (stacked vertical layout)
- ≥ 768px: Switch to Desktop variant (horizontal layout)
- Preserve current page and record count settings

#### ✅ **DO:**
- Handle orientation changes gracefully
- Preserve pagination state during rotate
- Test landscape layout extensively
- Maintain touch target sizes
- Update z-index untuk any overlays

#### ❌ **DON'T:**
- Break layout saat rotate
- Reset page saat orientation change
- Reduce button sizes untuk landscape
- Use fixed positioning that breaks rotate

---

### Edge Cases
| Case | Expected Behavior |
|---|---|
| **Last Page Partial** | Show "41-47 of 47" (partial range) |
| **Single Page Result** | Hide pagination entirely atau show disabled state |
| **Very Large Dataset** | Paginate page numbers (show 5 of 1000+ pages), limit initial load |
| **No Records** | Show "0 of 0", all buttons disabled |
| **Slow Network** | Show loading state ≥ 2sec, allow cancel |

#### ✅ **DO:**
- Handle partial last page correctly
- Hide pagination jika 1 page atau 0 records
- Paginate page numbers untuk efficiency
- Show timeout indication saat slow network
- Provide clear empty state message
- Test dengan various data sizes

#### ❌ **DON'T:**
- Show incorrect ranges
- Keep pagination visible saat 1 page
- Render 1000s of page buttons
- Assume fast network (handle slow gracefully)
- Confuse user saat edge cases

---

## Asset Requirements
- Icons: Chevron Left (24px), Chevron Right (24px), Double Chevron Left (24px), Double Chevron Right (24px), Chevron Down (24px)
- Design tokens: Primary, neutral transparent, text colors

---

## Implementation Checklist
- [ ] Vertical stacked layout (Record Pagination + Page Navigation sections)
- [ ] Dropdown untuk record count (modal/popover style)
- [ ] Min 32px button size (44px recommended for touch)
- [ ] Current page highlighted correctly
- [ ] Buttons disabled at boundaries
- [ ] Range text updates dynamically
- [ ] Loading/error states handled
- [ ] Landscape rotation handled gracefully
- [ ] Viewport < 768px detection
- [ ] Persist record count preference
- [ ] URL updates dengan current page
- [ ] ARIA labels untuk all buttons
- [ ] Keyboard navigation tested
- [ ] Tested on real mobile devices

---

## Accessibility
- All buttons must have `aria-label` (e.g., "Go to page 3", "Next page")
- Current page button: `aria-current="page"`
- Disabled buttons: `disabled` attribute + visual styling
- Keyboard navigation: Tab between buttons, Enter to activate
- Focus indicator visible on all interactive elements
- Screen readers announce "Page X of Y" context
- Sufficient color contrast: 4.5:1 ratio (WCAG AA)

---

## Mobile-Specific Considerations
- Min touch target: 32px × 32px (44px recommended)
- Use native dropdown component jika available
- Haptic feedback untuk button press
- Safe area consideration (notched phones)
- Landscape orientation support
- Test on real devices (not just emulator)

---

**Last Updated**: February 2026  
**Status**: Production Ready  
**Accessibility**: WCAG 2.1 Level AA (separate a11y documentation)
