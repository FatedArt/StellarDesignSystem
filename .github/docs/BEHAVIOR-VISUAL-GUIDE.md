# Behavior Section - Visual Structure Guide

**Purpose**: Visual reference untuk struktur Behavior section  
**Last Updated**: February 26, 2026

---

## 📊 Behavior Section Hierarchy

```
## 3. Behavior
│
├─ State/Interaction Overview (TABLE)
│  └─ Semua state ditampilkan dalam table format
│     Columns: State | Trigger | Behavior | Visual Feedback
│
├─ Subsection 1: [State Name]
│  ├─ Description
│  ├─ Optional: Detailed table atau code
│  ├─ ✅ DO: (3-5 items spesifik)
│  └─ ❌ DON'T: (3-5 items spesifik)
│
├─ Subsection 2: [State Name]
│  ├─ Description
│  ├─ Optional: Visual/Table
│  ├─ ✅ DO: (3-5 items)
│  └─ ❌ DON'T: (3-5 items)
│
└─ Subsection N: [Additional States]
   └─ ...continue pattern
```

---

## 🔄 State Machine Diagram

### Button Component States

```
                    ┌─────────────┐
                    │   DEFAULT   │
                    └──────┬──────┘
                           │
           ┌───────────────┼───────────────┐
           ▼               ▼               ▼
      [HOVER]        [ACTIVE]        [FOCUS]
    (mouse over)  (pressing/click) (keyboard Tab)
           │               │               │
           └───────────────┼───────────────┘
                           │
                    ┌─────────────┐
                    │   DISABLED  │
                    └────┬────────┘
                         │
              ┌──────────┴──────────┐
              ▼                     ▼
         [LOADING]            [ERROR]
      (async action)    (validation failed)
           │                     │
           └──────────┬──────────┘
                      ▼
              [SUCCESS] (optional)
```

---

## 📋 Template Breakdown

### For Simple Components (e.g., Status Badge)

```
## 3. Behavior

### Default State
Appearance awal tanpa interaksi.

✅ **DO:**
- Use design token untuk background color
- (2-3 additional guidelines)

❌ **DON'T:**
- Don't hardcode color values
- (2-3 additional guidelines)
```

**Kompleksitas**: 1-2 state subsection  
**Subsection Count**: 1-2

---

### For Medium Components (e.g., Button, Badge dengan states)

```
## 3. Behavior

### State Overview

| State | Trigger | Visual |
|-------|---------|--------|
| Default | Load | Base appearance |
| Hover | Mouse over | Color lighter |
| Active | Click | Color darker |
| Focus | Tab | Outline ring |
| Disabled | Condition | Opacity 0.5 |

### Hover State
Brief description...

✅ **DO:**
- (3-5 specific guidelines)

❌ **DON'T:**
- (3-5 specific guidelines)

### Active State
...

### Focus State
...

### Disabled State
...
```

**Kompleksitas**: 4-5 significant states  
**Subsection Count**: 3-5

---

### For Complex Components (e.g., Input, Dropdown)

```
## 3. Behavior

### State Overview

| State | Trigger | Behavior | Feedback |
|-------|---------|----------|----------|
| Default | Load | Field empty | Border --dark-4 |
| Focused | Click/Tab | Ready input | Border --primary-6 |
| Filled | User type | Data present | Text displayed |
| Hover | Mouse | Interactive | Subtle BG change |
| Error | Validation fail | Invalid input | Red border + message |
| Success | Valid | Confirmed | Green + checkmark |
| Disabled | Condition | Locked | Opacity 0.5 |

### Focused State
User interacting dengan input...

✅ **DO:**
- Apply border color --primary-6
- Show cursor blinking dalam field
- Support aria-label untuk accessibility
- Maintain input height (no growth)
- Apply smooth transition 150ms

❌ **DON'T:**
- Don't change input height (layout shift)
- Don't hide placeholder text (user forget requirement)
- Don't use only outline (low contrast)
- Don't apply shadow saat focus (distracting)
- Don't forget aria-label jika no label

### Error State
...dengan detail explanation, code snippets, accessibility

### Hover State
...

### Filled State
...

### Disabled State
...

### Success State
...optional state
```

**Kompleksitas**: 6-7 significant states  
**Subsection Count**: 5-7

---

## 📐 DO/DON'T Pattern Structure

### Single DO/DON'T item anatomy:

```
✅ DO:
┌────────────────────────────────────────────────────┐
│ [ACTION VERB] [SPECIFIC VALUE/TOKEN]               │
│ [RATIONALE/WHY IN PARENTHESIS]                      │
│ [OPTIONAL: CSS/CODE SNIPPET]                       │
└────────────────────────────────────────────────────┘

Example:
✅ **DO:**
- Apply --base-primary-5 untuk hover background
  (lighter by 1 token level untuk indicate state change)
  CSS: background-color: var(--base-primary-5);
```

```
❌ DON'T:
┌────────────────────────────────────────────────────┐
│ [WHAT TO AVOID] - [CONSEQUENCE/IMPACT]             │
│ [OPTIONAL: WHAT HAPPENS IF DEVELOPER DOES THIS]    │
│ [ALTERNATIVE IF APPLICABLE]                        │
└────────────────────────────────────────────────────┘

Example:
❌ **DON'T:**
- Hardcode color #0F8696 - breaks theming support
  (prevents dark mode implementation, inconsistent)
  Instead: Use CSS variable var(--base-primary-6)
```

---

## 🎯 State Categorization Matrix

### By Component Type

```
BUTTONS
├─ Simple (Status Button)
│  ├─ States: Default, Hover, Active, Disabled
│  └─ Subsections: 1-2
├─ Medium (Primary Button)
│  ├─ States: Default, Hover, Active, Focus, Disabled, Loading
│  └─ Subsections: 4-5
└─ Complex (Button with dropdown)
   ├─ States: ... + Dropdown states
   └─ Subsections: 6+

INPUTS/FORM
├─ Simple (Read-only display)
│  ├─ States: Default
│  └─ Subsections: 0-1
├─ Medium (Text input)
│  ├─ States: Default, Focus, Filled, Error, Disabled
│  └─ Subsections: 3-4
└─ Complex (Autocomplete input)
   ├─ States: ... + Autocomplete states
   └─ Subsections: 5+

NAVIGATION
├─ Simple (Breadcrumb)
│  ├─ States: Default, Hover, Active
│  └─ Subsections: 1-2
├─ Medium (Menu)
│  ├─ States: Default, Hover, Active, Focus, Submenu, Disabled
│  └─ Subsections: 4-5
└─ Complex (Sidebar nav)
   ├─ States: ... + Collapse, Mobile
   └─ Subsections: 6+
```

---

## 🔀 State Progression Patterns

### Linear Progression (Button)
```
DEFAULT → HOVER → ACTIVE → Released
   ↓
FOCUSED (parallel)
   ↓
DISABLED (end state)
```

### Branching Progression (Input)
```
DEFAULT
   ├─→ FOCUSED → FILLED → BLUR
   │     └─→ ERROR (validation fail) → User correct
   │
   ├─→ HOVER (parallel)
   │
   └─→ DISABLED (condition)
```

### Overlay Progression (Modal)
```
CLOSED
   ↓
OPENING (animation) [250-300ms]
   ↓
OPEN (interactive state)
   ├─→ Content modification
   ├─→ Form validation (error/success)
   └─→ CLOSING (animation) [200ms]
   ↓
CLOSED
```

---

## 🎨 Design Token Flow

### Color Progression Per State

```
Interactive State Progression:

BASE COLOR (--base-primary-6)
  ├── DEFAULT
  │   └─ Use base color directly
  │      color: var(--base-primary-6);
  │
  ├── HOVER
  │   └─ Lighten 1 level (--primary-5)
  │      background-color: var(--base-primary-5);
  │
  ├── ACTIVE
  │   └─ Darken 1 level (--primary-7)
  │      background-color: var(--base-primary-7);
  │
  └── FOCUS
      └─ Use tier lower (--primary-4)
         outline: 2px var(--base-primary-4);
```

### Semantic States

```
ERROR STATE
  └─ --semantic-error-red-6 (always)
     border-color: var(--semantic-error-red-6);

SUCCESS STATE
  └─ --semantic-success-green-6 (always)
     border-color: var(--semantic-success-green-6);

DISABLED STATE
  └─ --base-dark-5 (with opacity 0.5)
     background: var(--base-dark-5);
     opacity: 0.5;

FOCUS INDICATOR
  └─ --base-primary-4 (ring)
     outline: 2px var(--base-primary-4);
     outline-offset: 2px;
```

---

## ⏱️ Timing Hierarchy

```
USER PERCEPTION LAYER:
┌─────────────────────────────────┐
│ Instant (0ms)                    │ Keyboard interaction (Tab, Enter)
│ - No perceptible delay           │
└─────────────────────────────────┘

RESPONSIVE LAYER:
┌─────────────────────────────────┐
│ Snappy (100-150ms)               │ Button press feedback
│ - Feels immediate                │ Hover effects
│ - Very reactive                  │
└─────────────────────────────────┘

COMFORTABLE LAYER:
┌─────────────────────────────────┐
│ Normal (200-300ms)               │ State transitions
│ - Most common usage              │ Form validation
│ - Natural feel                   │ Modal appearances
└─────────────────────────────────┘

PERCEIVED LAYER:
┌─────────────────────────────────┐
│ Noticeable (300-500ms)           │ Page transitions
│ - Feels substantial              │ Long animations
│ - Engaging but not slow          │
└─────────────────────────────────┘

AVOID LAYER:
┌─────────────────────────────────┐
│ Slow (> 500ms)                   │ ❌ Sluggish
│ - Feels laggy                    │ ❌ Frustrating
│ - Bad UX                         │ ❌ Buttons seem broken
└─────────────────────────────────┘
```

### Standard Timing Values

```
state-change:           200ms ◄──── MOST COMMON
hover-effect:           150ms
active-press:           100ms
component-enter:        250-300ms
component-exit:         200-250ms
spinner-rotation:       1000ms (1 full rotation)
focus-indicator:        instant (0ms, no animation)
tooltip-delay:          150-200ms
debounce/throttle:      300ms
```

---

## 📊 Quick Reference Table

| Property | Value | Notes |
|----------|-------|-------|
| **State Count** | 3-7 typical | Simple: 2-3, Complex: 6-8 |
| **DO Count** | 3-5 per state | Specific, not generic |
| **DON'T Count** | 3-5 per state | Include consequences |
| **Typography** | Bold section | Format: **Text** |
| **Code Blocks** | With language | ```css / ```jsx / ```html |
| **Transition** | 200ms | Most common default |
| **Focus Ring** | 2px | Minimum for visibility |
| **Subsection Depth** | ### (h3) | Consistent with template |
| **DO/DON'T Level** | #### (h4) | Sub-heading for each |

---

## 🔍 State Definition Checklist

For each state subsection, define:

```
□ State NAME (clear, descriptive)
□ TRIGGER (what causes this state - user action, condition, etc)
□ DESCRIPTION (when/why this state exists, 1-2 sentences)
□ VISUAL FEEDBACK (colors, icons, animations)
□ INTERACTION (clickable? focus-able? keyboard support?)
□ ACCESSIBILITY (aria-*, screen reader behavior)
□ TIMING (transition duration if applicable)
□ CODE EXAMPLE (CSS/HTML if complex)
□ DO GUIDELINES (3-5 specific best practices)
□ DON'T GUIDELINES (3-5 specific anti-patterns)
```

---

## 📐 Common State Combinations

### Button + Loading
```
DEFAULT → LOADING → SUCCESS/ERROR → DEFAULT
Button disable during load
Spinner animation 1s
Show "Saving..." text
24px height maintained
```

### Input + Error + Success
```
EMPTY → FILLED → BLUR
           ├─→ ERROR (valid = false)
           │    └─ Can retry/correct
           └─→ SUCCESS (valid = true)
                └─ Auto fade out after 2s
```

### Modal + Overlay Click
```
CLOSED → OPENING → OPEN → (overlay click)
                    ├─→ Overlay feedback
                    └─→ CLOSING
                    ↓
                 CLOSED
```

---

## 📝 Subsection Template Generator

### For Button-like Components:

```markdown
### [STATE_NAME]
Brief description of when state occurs.

#### ✅ **DO:**
- Use CSS variable `var(--token-name)` for colors
- Apply transition: all 200ms ease for smooth changes
- Maintain consistent padding/sizing (no layout shifts)
- Provide visible feedback for [interaction type]
- [One more specific guidance]

#### ❌ **DON'T:**
- Don't hardcode color values like #HEX
- Don't use opacity alone without color modification
- Don't apply animations > 300ms duration
- Don't skip [required state/behavior]
- [One more anti-pattern]
```

### For Input/Form Components:

```markdown
### [STATE_NAME]
Description about this input state.

[Optional: Code example showing CSS/HTML]

#### ✅ **DO:**
- Use aria-invalid="true" and aria-describedby for errors
- Show specific error reason (not generic message)
- Apply --semantic-error-red-6 for error indication
- [Accessibility/UI specific]
- [One more specific guidance]

#### ❌ **DON'T:**
- Don't use color alone for error (red-color-blind users)
- Don't hide error until user blurs field
- Don't remove placeholder on focus (user forgets requirement)
- [Accessibility anti-pattern]
- [One more anti-pattern]
```

### For Interactive/Navigation:

```markdown
### [STATE_NAME]
When/why this state matters for navigation/interaction.

[Optional: Keyboard support documentation]

#### ✅ **DO:**
- Support keyboard [Arrow/Tab/Enter/Escape] navigation
- Maintain focus indicator visible (min 2px)
- [Semantic HTML/accessibility]
- [One more specific]
- [One more specific]

#### ❌ **DON'T:**
- Don't remove focus styling for any element
- Don't use click-only patterns (keyboard users excluded)
- Don't hide interactive elements from keyboard tab order
- [Accessibility anti-pattern]
- [One more anti-pattern]
```

---

## 🎯 Content Guidelines

### State Description Should Include:

```
✅ When state triggered (user action or system condition)
✅ Why state matters (user goal or feedback purpose)
✅ Visual appearance changes
✅ Interaction behavior changes (if any)
✅ Accessibility implications
✅ Timing/duration (if has animation)

❌ Don't repeat information from "Usage Guidelines" section
❌ Don't explain design theory (keep practical)
❌ Don't document unimplemented features
```

### DO Guideline Should:

```
✅ Be specific (token name, CSS value, timing)
✅ Be actionable (developer can implement directly)
✅ Reference design system (tokens, not values)
✅ Include rationale (why this best practice)
✅ Cover accessibility when relevant

❌ Not be generic ("use good colors")
❌ Not assume developer knowledge
❌ Not reference unavailable resources
```

### DON'T Guideline Should:

```
✅ Explain consequence/impact
✅ Show what happens if developer does this
✅ Reference design system (what to use instead)
✅ Include rationale (why problematic)
✅ Cover accessibility/UX impact

❌ Just say "don't do this"
❌ Lack context or reasoning
❌ Miss user/system impact
```

---

## 🔗 Cross-References

Link to related sections:

```markdown
- **See also**: [Usage Guidelines](#1-usage-guidelines) for spacing/colors
- **Accessibility**: See [Section 6](#6-accessibility) for WCAG requirements
- **Implementation**: See [Section 5](#5-implementation-checklist) for developer tasks
- **Related Component**: [Button-Secondary.md](Button-Secondary.md) for similar states
```

---

## ✨ Examples Summary

| Component | States | Subsections | Complexity |
|---|---|---|---|
| Badge (Status) | 2-3 | 1 | Simple |
| Button | 4-5 | 3-4 | Medium |
| Button (Large) | 5-6 | 4-5 | Medium |
| Input Text | 5-6 | 4-5 | Medium |
| Checkbox/Radio | 3-4 | 2-3 | Simple |
| Dropdown | 5-7 | 5-6 | Complex |
| Modal | 6-7 | 5-6 | Complex |
| Autocomplete | 7-8 | 6-7 | Complex |
| Tabs | 4-5 | 3-4 | Medium |
| Menu | 6-7 | 5-6 | Complex |

---

