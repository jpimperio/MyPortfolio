---
title: "Styling with Tailwind CSS v4"
date: "2026-06-25"
description: "Exploring the new features in Tailwind CSS v4 and how to use them effectively."
---

## What's New in Tailwind v4

Tailwind CSS v4 introduces a completely revamped engine, CSS-first configuration, and new utility classes.

### CSS-First Configuration

Instead of `tailwind.config.js`, you can now configure everything in your CSS:

```css
@import "tailwindcss";

@theme {
  --color-primary: #8b5cf6;
  --color-surface: #1a1a2e;
}
```

### The `@theme` Directive

Define your design tokens right in CSS:

```css
@theme {
  --font-display: "Inter", sans-serif;
  --color-brand: oklch(0.5 0.2 270);
}
```

### Why This Matters

- **Less config files** — Everything lives in CSS
- **Better performance** — The JIT engine is even faster
- **Native cascade** — CSS custom properties work seamlessly

### Migration Tips

1. Remove `tailwind.config.js`
2. Add `@import "tailwindcss"` to your main CSS
3. Use `@theme` for custom values
4. Replace `@apply` with the new cascade-aware approach

Tailwind v4 makes styling feel even more natural — give it a try!
