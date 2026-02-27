# Contoh Implementasi Behavior Section - Real Examples

**Last Updated**: February 26, 2026  
**Version**: 1.0

---

## Contoh 1: Button Component Behavior

### Implementation Reference
Berdasarkan pola di `Header-Desktop.md` dan `Pagination-Desktop.md`

---

## 3. Behavior

### Interaction States Overview

| Element | State | Trigger | Behavior | Visual Feedback |
|---------|-------|---------|----------|-----------------|
| **Button Primary** | Default | Page load | Standard button state | Background --base/primary/primary-6, cursor pointer |
| **Button Primary** | Hover | Mouse over | Element ready for interaction | Background lightens to --base/primary/primary-5, subtle scale 1.02x |
| **Button Primary** | Active | Click/Press | User activating action | Background darken to --base/primary/primary-7, inset shadow |
| **Button Primary** | Focus | Tab key | Keyboard focus indicator | Border ring 2px --base/primary/primary-4 |
| **Button Primary** | Disabled | Condition met | Cannot be interacted | Opacity 0.5, cursor not-allowed, pointer-events none |
| **Button Primary** | Loading | Async action | Processing state | Spinner icon, button disabled, aria-busy true |

#### ✅ **DO:**
- Apply smooth CSS transitions (200-300ms) untuk semua state changes, gunakan `transition: all 200ms ease` pada button element
- Use design tokens untuk semua colors: `background-color: var(--base-primary-6)` bukan `#0f8696`
- Maintain consistent padding (16px horizontal, 12px vertical) across all button variants dan states menggunakan `padding: 12px 16px`
- Provide visible focus ring untuk keyboard navigation, minimal 2px dengan primary color token untuk a11y
- Add aria-label dan aria-busy untuk loading state: `aria-busy="true" aria-label="Processing your request"`

#### ❌ **DON'T:**
- Use opacity changes saja untuk disabled state tanpa color modification (tidak distinct enough, user confusion)
- Hardcode color values seperti `#0F8696` atau `rgba(15,134,150,1)` - always use CSS custom properties
- Skip focus state styling untuk keyboard users (WCAG violation, excludes keyboard-only users)
- Create animations > 500ms untuk button interactions (terasa sluggish dan frustrating)
- Change button dimensions saat state changes - triggers layout shift dan poor UX


### Hover State
When user mouse over button, memberikan visual feedback bahwa element interactive.

**Trigger Condition**: `@media (hover: hover)` untuk device yang support hover (desktop)

```css
/* CSS Implementation Reference */
button:hover {
  background-color: var(--base-primary-5);
  transform: scale(1.02);
  transition: all 200ms ease;
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
}
```

#### ✅ **DO:**
- Use subtle scale up (1.02x) untuk depth perception, bukan dramatic 1.1x scaling
- Add soft box-shadow (0 2px 8px) untuk lift effect, coordinate dengan z-index layering
- Maintain all text styling - font-size, font-weight, letter-spacing tidak berubah
- Combine color + transform untuk stronger feedback, lebih engaging daripada color-only
- Only apply hover state on devices yang support hover (use CSS `@media (hover: hover)`)

#### ❌ **DON'T:**
- Apply opacity change tunggal (terasa terlalu subtle, user tidak sure perubahan terjadi)
- Use fast animation (100ms) yang terasa jittery - gunakan 200-300ms untuk natural feel
- Change text color dramatically (bisa jadi unreadable atau harsh)
- Add large shadow (> 12px blur) yang membuat button terlihat floating away unnaturally
- Forget to set cursor: pointer (biar user tahu element itu clickable)


### Active/Pressed State
State saat user sedang click button atau dalam keyboard activation.

```css
/* CSS Implementation Reference */
button:active {
  background-color: var(--base-primary-7);
  box-shadow: inset 0 2px 4px rgba(0,0,0,0.2);
  transform: scale(0.98);
  transition: all 100ms ease-in;
}
```

#### ✅ **DO:**
- Use inset box-shadow (inset 0 2px 4px) untuk "pressed in" visual effect
- Scale down slightly (0.98x) untuk tactile pressed feedback
- Darken background ke --base/primary/primary-7 untuk strong visual indication
- Use shorter transition time (100ms) pada release untuk snappy response
- Maintain active state selama user terus press (mousedown)`

#### ❌ **DON'T:**
- Make active state identical dengan hover state (user cannot distinguish)
- Use outset shadow saat active (looks like unpressed, opposite intent)
- Remove active state styling - user need confirmation action registered
- Apply scale yang terlalu dramatic (0.9x) - looks broken


### Focus State
Keyboard user navigating dengan Tab key. Critical untuk accessibility.

```css
/* CSS Implementation Reference */
button:focus-visible {
  outline: 2px solid var(--base-primary-4);
  outline-offset: 2px;
  border-radius: 4px;
}
```

#### ✅ **DO:**
- Use :focus-visible pseudoclass (tidak :focus) - hanya apply ring saat keyboard navigation
- Set outline 2px dengan primary color token untuk strong visibility
- Add outline-offset 2px untuk visual separation dari button border
- Maintain high contrast (WCAG AA: 3:1 minimum, AAA: 4.5:1 preferred)
- Test focus state dengan Tab key pada actual keyboard navigation

#### ❌ **DON'T:**
- Use :focus tanpa :focus-visible (akan show ring bahkan saat mouse click, ugly)
- Set outline-offset negative atau 0 (terlihat cramped)
- Use thin outline (1px) yang terlalu subtle untuk visibility
- Combine outline dengan box-shadow yang bisa overlap dan terlihat messy
- Forget testing dengan actual keyboard navigation


### Disabled State
Button locked dan tidak dapat di-interact. Harus jelas visual indication.

```css
/* CSS Implementation Reference */
button:disabled {
  background-color: var(--base-dark-5);
  color: var(--text-base-disabled);
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}
```

#### ✅ **DO:**
- Use combination opacity 0.5 + distinct color token (--base-dark-5) untuk double indication
- Set cursor: not-allowed untuk clarity bahwa tidak interactive
- Set pointer-events: none + disabled attribute untuk prevent any interaction
- Show tooltip saat hover (if HTML title atau aria-label): "Save is unavailable until form is valid"
- Use aria-disabled untuk screen readers jika element tidak actual `<button disabled>`

#### ❌ **DON'T:**
- Use hanya opacity change tanpa color modification (too subtle, user confusion)
- Forget setting cursor: not-allowed (user frustrated clicking non-responsive button)
- Remove disabled button dari DOM (breaks accessibility, should show why unavailable)
- Apply opacity 0.3 (terlalu transparent, bisa disappear pada backgrounds)
- Keep hover state styling pada disabled button (conflicting signals)


### Loading State
Async action dalam progress. Show spinner + disable interaction.

```jsx
/* JSX/React Implementation Reference */
<button disabled aria-busy="true" aria-label="Saving changes...">
  <span className="spinner" aria-hidden="true"></span>
  Saving...
</button>
```

```css
@keyframes spinner-rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

button[aria-busy="true"] {
  opacity: 0.8;
  cursor: wait;
  pointer-events: none;
}

.spinner {
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid var(--base-primary-3);
  border-top-color: var(--text-base-default);
  border-radius: 50%;
  animation: spinner-rotate 1s linear infinite;
  margin-right: 8px;
}
```

#### ✅ **DO:**
- Show animated spinner icon (16px) + meaningful text: "Saving...", "Processing...", "Loading..."
- Disable button dengan disabled attribute untuk prevent double-click submissions
- Use aria-busy="true" + aria-label="Saving changes..." untuk screen readers
- Spinner animation 1s (not too fast, tidak dizzy)
- Keep button width/height consistent (no layout shift saat show spinner)

#### ❌ **DON'T:**
- Use only opacity change without spinner (ambiguous state, user tidak sure if something happening)
- Forget disabling button (leads to duplicate submissions, major bug)
- Use fast spinner (200-500ms rotation feels dizzying)
- Hide original text sepenuhnya (user need context, pero hanya show spinner)
- Change button size/width saat loading (triggers layout reflow)


---

## Contoh 2: Input Field Component Behavior

### Implementation Reference

---

## 3. Behavior

### Interaction States Overview

| State | Trigger | Behavior | Visual Feedback |
|-------|---------|----------|-----------------|
| **Default (Empty)** | Page load | Field kosong, tidak focused | Border --base-dark-4, light background |
| **Focused** | Click atau Tab | Ready untuk input | Border highlight --base/primary/primary-6, cursor in field |
| **Filled** | User typing | Data dalam field | Border --base/primary/primary-6, text displayed |
| **Hover** | Mouse over | Interactive element | Border color lighten, background subtle change |
| **Error** | Validation failed | Invalid input | Border color red --semantic/error/red-6, error message |
| **Success** | Valid input | Confirmation | Border color green --semantic/success/green-6, checkmark |
| **Disabled** | Condition met | Cannot edit | Background gray, opacity 0.5, cursor not-allowed |

#### ✅ **DO:**
- Apply distinct border colors per state menggunakan design tokens (focus: primary-6, error: red-6, success: green-6)
- Show error message immediately below field saat validation fail, use aria-describedby untuk a11y
- Use smooth focus transition (150ms) untuk border + background color changes
- Maintain consistent height 40px, padding 12px, font-size 14px across all input variants
- Provide placeholder text di inside field (tidak floating label), max 1 baris untuk clarity

#### ❌ **DON'T:**
- Use hanya color change untuk indicate invalid (not accessible, red-color-blind users cannot distinguish)
- Show error message di separate container januh dari field (might miss)
- Apply shadow changes saat focus (can be distracting, focus state harus subtle)
- Make placeholder text disappear saat user type (user forget input requirement)
- Use text-only error message without icon (icon provides visual reinforcement)


### Focus State
Keyboard atau mouse click activates input, ready untuk user typing.

```css
input:focus {
  border-color: var(--base-primary-6);
  background-color: var(--background-input-focus);
  box-shadow: 0 0 0 3px var(--base-primary-1);
  outline: none;
}
```

#### ✅ **DO:**
- Change border color ke primary-6, add subtle focus ring box-shadow (0 0 0 3px primary-1)
- Maintain background color consistency (slight light blue/primary accent)
- Show cursor blinking inside field (default HTML behavior)
- Apply outline: none jika using box-shadow focus indication (avoid double outline)
- Provide aria-label jika input tidak punya associated label element

#### ❌ **DON'T:**
- Change input height saat focus (layout shift, jarring)
- Use only outline (bukan good untuk dark mode, use box-shadow instead)
- Apply large box-shadow (blur > 8px) yang bulky
- Remove placeholder text saat focus (user forget field requirement)


### Error State
Validation failed, show error dengan icon dan message.

```jsx
<div className="input-wrapper">
  <input type="email" value={userInput} aria-invalid="true" aria-describedby="email-error" />
  <span className="error-icon" aria-hidden="true">⚠️</span>
  <span id="email-error" className="error-message">Please enter a valid email address</span>
</div>
```

```css
input[aria-invalid="true"] {
  border-color: var(--semantic-error-red-6);
  background-color: var(--background-error-light);
}

.error-message {
  color: var(--semantic-error-red-6);
  font-size: 12px;
  margin-top: 4px;
  display: block;
}
```

#### ✅ **DO:**
- Use aria-invalid="true" + aria-describedby="error-id" untuk accessibility
- Show warning icon (⚠️) next to field untuk visual reinforcement
- Display error message di bawah field dalam --semantic/error/red-6 color
- Include specific error reason: "Email must include @domain.com" (bukan generic "Invalid input")
- Maintain error state sampai user corrects input dan re-validates

#### ❌ **DON'T:**
- Use only red border (red-color-blind users cannot distinguish)
- Show generic error: "Field is required" (tidak helpful)
- Remove error state saat user start typing (show warning tapi update on blur)
- Apply error animation yang distracting (keep simple border change)
- Stack multiple error messages (confusing, show priority/first issue only)


### Success State
Valid input atau successful action, show positive feedback.

```jsx
<div className="input-wrapper">
  <input type="email" value="valid@email.com" aria-label="Email confirmed" />
  <span className="success-icon" aria-hidden="true">✓</span>
</div>
```

```css
input.success {
  border-color: var(--semantic-success-green-6);
  background-color: var(--background-success-light);
}

.success-icon {
  color: var(--semantic-success-green-6);
  font-size: 16px;
}
```

#### ✅ **DO:**
- Show checkmark icon (✓) inside field right-aligned
- Use green color token (--semantic/success/green-6)
- Show optional success message: "Email verified ✓" (bisa subtle)
- Auto-hide success state after 2-3 seconds atau saat user move to next field
- Apply smooth fade-out animation saat auto-hiding

#### ❌ **DON'T:**
- Keep success state permanently (should disappear, not permanent state)
- Use success state untuk every keystroke (confusing, only on blur validation)
- Play success sound automatically (annoying, user tidak expect)
- Change input disabled saat success (user should still able to modify)


### Disabled State
Input locked dan tidak editable.

```css
input:disabled {
  background-color: var(--background-disabled);
  border-color: var(--base-dark-4);
  color: var(--text-base-disabled);
  opacity: 0.6;
  cursor: not-allowed;
  pointer-events: none;
}
```

#### ✅ **DO:**
- Use cursor: not-allowed untuk indicate tidak editable
- Apply opacity 0.6 + distinct background color
- Maintain aria-disabled="true" jika using custom input element
- Show reason dalam placeholder atau adjacent text: "(Added by administrator)"
- Keep disabled input visible dalam form (accessibility, transparent why unavailable)

#### ❌ **DON'T:**
- Hide disabled input (remove from form visibility entirely)
- Use hanya opacity change (70% opacity unclear)
- Forget showing reason kenapa disabled (user confusion)
- Use cursor: default (misleading, suggest editable)

---

## Contoh 3: Dropdown/Select Component Behavior

### Implementation Reference

---

## 3. Behavior

### Closed State
Dropdown dalam default state, menu tersembunyi.

#### ✅ **DO:**
- Display selected value prominent (font-weight 500) atau placeholder jika nothing selected
- Show chevron-down icon right-aligned (24px), indicate expandable state
- Use full trigger width clickable (min 200px), tidak hanya icon
- Apply hover state: background color lighten
- Support click anywhere dalam trigger area untuk open

#### ❌ **DON'T:**
- Make hanya icon clickable (user clicking text won't open, frustrating)
- Show blur/loading state saat options loading (show loading spinner instead)
- Remove hover indication (user unsure if clickable)


### Open State
Dropdown menu visible dengan options displayed.

```jsx
<div className="dropdown" role="listbox" open>
  <button className="dropdown-trigger" aria-expanded="true" aria-label="Select option">
    Current Option
    <span className="chevron">▼</span>
  </button>
  <ul className="dropdown-menu" role="listbox">
    <li role="option" aria-selected="true">Option 1</li>
    <li role="option">Option 2</li>
    <li role="option">Option 3</li>
  </ul>
</div>
```

```css
.dropdown-menu {
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  right: 0;
  max-height: 300px;
  overflow-y: auto;
  background: var(--background-surface);
  border: 1px solid var(--base-dark-4);
  border-radius: 4px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  z-index: 1000;
  animation: slideDown 200ms ease;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

#### ✅ **DO:**
- Position below trigger by default dengan 4px gap
- Reposition above trigger jika insufficient space below (use viewport detection)
- Apply max-height 300px dengan overflow-y: auto untuk many options
- Show first option highlighted sebagai keyboard navigation hint
- Use z-index 1000+ untuk ensure above all page content
- Support keyboard: Arrow Up/Down navigate, Enter select, Escape close

#### ❌ **DON'T:**
- Position fixed dengan hardcoded top/left (responsive break)
- Allow dropdown overflow viewport without scroll (user cannot reach bottom options)
- Use animation > 300ms (feels sluggish)
- Forget keyboard support (accessibility issue for keyboard-only users)
- Overlap dropdown dengan other page content tanpa proper z-index


### Hover State (on Option)
Mouse over specific option, indicate selectable.

#### ✅ **DO:**
- Change background ke --base/primary/primary-2
- Maintain text color contrast untuk readability
- Apply transition 150ms untuk smooth effect
- Use cursor: pointer
- Update aria-label untuk screen readers dengan current highlighted option

#### ❌ **DON'T:**
- Change text color dramatically (hard to read)
- Use animations > 200ms pada hover (feels slow)
- Apply same style untuk hover dan selected (not distinguishable)
- Skip updating aria-label untuk screen reader users


### Selected State
Option dipilih dan active.

#### ✅ **DO:**
- Show checkmark icon inside option left-aligned (visual reinforcement)
- Use background color distinct dari hover state
- Display selected option dalam trigger text area after close
- Support multi-select dengan multiple checkmarks jika applicable
- Update aria-selected="true" untuk accessibility

#### ❌ **DON'T:**
- Hide selected option saat close (user confused about current value)
- Use same styling untuk hover dan selected (ambiguous)
- Allow unselecting required field without fallback


### Loading State
Options sedang loading, show spinner.

#### ✅ **DO:**
- Show spinner animation di dalam menu area (center position)
- Display "Loading options..." text beneath spinner
- Disable user selection during load (pointer-events: none)
- Auto-close dropdown jika loading fails after 5 seconds warning

#### ❌ **DON'T:**
- Show blank menu during load (confusing if options exist)
- Keep dropdown open indefinitely saat load failed
- Use fast spinner animation (dizzying)


---

## Checklist Implementasi

Setiap state dan interaction HARUS memiliki:

- [ ] Visual feedback yang clear dan distinct
- [ ] Design tokens digunakan (bukan hardcoded colors)
- [ ] Accessibility attributes (aria-*, role, etc)
- [ ] Keyboard navigation support
- [ ] Smooth transitions (150-300ms)
- [ ] Edge cases documented (disabled, loading, error)
- [ ] CSS variables atau equivalent untuk maintainability
- [ ] Tested pada light + dark theme jika applicable
- [ ] Screen reader tested dengan NVDA/JAWS
- [ ] Mobile/touch tested jika applicable

---

## Notes Tambahan

1. **CSS Transition Timing**:
   - State changes: 200ms
   - Hover effects: 150ms
   - Animations: 300ms max
   - Loading spinners: 1s rotation

2. **Color Token Pattern**:
   - Default: `--base-dark-5`
   - Hover: `--base-primary-5`
   - Active: `--base-primary-6`
   - Disabled: `--base-dark-4` + opacity 0.5
   - Error: `--semantic-error-red-6`
   - Success: `--semantic-success-green-6`

3. **Accessibility Must-Haves**:
   - aria-label, aria-described-by
   - Role attributes (button, listbox, option, etc)
   - Keyboard navigation support
   - Focus visible indicator 2px minimum
   - Color tidak hanya differentiator (use icon + color)

4. **Testing Untuk Behavior**:
   - Visual testing (all states screenshot)
   - Keyboard navigation testing (Tab, Arrow keys, Enter, Escape)
   - Screen reader testing (NVDA, JAWS, VoiceOver)
   - Viewport testing (desktop, tablet, mobile)
   - Animation smoothness pada low-end devices
