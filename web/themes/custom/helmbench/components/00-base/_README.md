# 00-base: Foundation Styles

This directory contains the foundational building blocks of your design system.

## What Goes Here

- **CSS Reset/Normalize**: Base browser resets (though Tailwind handles most of this)
- **Typography**: Base font styles, heading scales, body text
- **Colors**: Design tokens / CSS custom properties
- **Spacing**: Spacing scale tokens
- **Global Variables**: CSS custom properties used throughout

## Example Files

```
00-base/
├── _typography.css       # Base typography styles
├── _variables.css        # CSS custom properties / tokens
├── _reset.css           # Any additional resets beyond Tailwind
└── _README.md
```

## Notes

- Most base styles should go in `src/css/main.css` using Tailwind's `@layer base`
- Use this directory for complex base styles that need their own files
- These are NOT components - they're foundational styles
