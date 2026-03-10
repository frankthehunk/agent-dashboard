# Agent Dashboard - Style Guide

## CORE STYLING RULES - DO NOT CHANGE

### Color Palette
```javascript
const COLORS = {
  navy: "#1a2744",      // Header background
  orange: "#d4652f",     // Accent, borders
  cream: "#f5f1e6",     // Text color
  teal: "#2d8a8b",     // Success/active states
  yellow: "#e8b923",     // Warning/idle
  red: "#ef4444",       // Error/inactive
};
```

### Background
- Main background: `#0a0a0f` (near black)
- Card background: `#18181b`
- Border: `1px solid rgba(245, 241, 230, 0.1)`

### Header
- Navy gradient: `linear-gradient(180deg, #1a2744 0%, #0a0a0f 100%)`
- Title: Uppercase, bold, letter-spacing
- Orange status indicator dot with teal glow

### Layout
- Grid: 4-column stats, 4-column agents
- Card border-radius: `12px`
- Padding: `16px` or `24px` for cards
- Gap: `16px` between grid items

### Typography
- Font: `system-ui, sans-serif`
- Headers: uppercase, smaller font-size, muted color
- Body: cream color (`#f5f1e6`)
- Monospace for code: `monospace`

### Components

**StatCard:**
- Black card background
- Colored value text
- Uppercase label

**Agent Card:**
- 4-column grid
- Status color border (2px)
- Avatar (emoji), name, role, status, task

**Commit Item:**
- Flex row
- Monospace SHA in teal badge
- Message with overflow ellipsis

### NEVER CHANGE:
1. The color palette (COLORS object)
2. The background colors
3. The border-radius values
4. The grid layouts
5. The header gradient
6. The status indicator style

### ALWAYS USE:
- `COLORS.navy` for header
- `COLORS.cream` for main text
- `COLORS.teal` for active states
- `COLORS.orange` for accents
- `COLORS.yellow` for idle
- `COLORS.red` for inactive
- `rgba(245, 241, 230, 0.1)` for borders

---

This file defines the visual identity. All updates must preserve these rules.
