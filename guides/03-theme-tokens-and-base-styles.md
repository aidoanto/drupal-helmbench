# Theme Tokens and Base Styles

This phase creates your **design tokens** (colors, fonts, spacing) and
your **base styles**. We will edit Tailwind config and the main CSS entrypoint.

## Goals for this phase

- Tailwind knows your brand colors and fonts
- Base typography styles are defined
- CSS builds successfully

## 1) Open the key theme files

You will edit these files in the theme:

- `web/themes/custom/helmbench/tailwind.config.js`
- `web/themes/custom/helmbench/src/css/main.css`

If you are new to Tailwind, think of `tailwind.config.js` as your **design token
file**, and `main.css` as your **global base styles**.

## 2) Add your tokens in `tailwind.config.js`

In `theme.extend`, add colors and font families that you want to use
throughout the site.

Example:

```js
// tailwind.config.js
theme: {
  extend: {
    colors: {
      brand: {
        50: "#f5f7ff",
        100: "#e9eeff",
        500: "#4f46e5",
        700: "#3730a3",
        900: "#1e1b4b",
      },
    },
    fontFamily: {
      sans: ["Inter", "system-ui", "sans-serif"],
      serif: ["Source Serif 4", "serif"],
    },
  },
},
```

Keep it simple. You can expand later.

## 3) Add base styles in `src/css/main.css`

Add a small set of global typography rules using Tailwind's `@layer base`.

Example:

```css
@layer base {
  html {
    font-size: 16px;
  }
  body {
    @apply bg-white text-slate-900 font-sans leading-relaxed;
  }
  h1, h2, h3 {
    @apply font-serif font-semibold text-slate-900;
  }
  h1 { @apply text-4xl md:text-5xl; }
  h2 { @apply text-2xl md:text-3xl; }
  h3 { @apply text-xl md:text-2xl; }
  p { @apply text-base md:text-lg; }
  a { @apply text-brand-700 underline underline-offset-2; }
}
```

This gives you readable default text before you style individual components.

## 4) Rebuild the theme CSS

From the project root:

```bash
lando npm --prefix web/themes/custom/helmbench run build
```

If you are actively working, use:

```bash
lando npm --prefix web/themes/custom/helmbench run dev
```

## 5) Quick check

- Refresh your test page.
- Headings should look different from body text.
- Links should be visible and styled.

If nothing changes, clear caches:

```bash
lando drush cr
```

## Done? Move to the next guide

Continue to:
`/guides/04-paragraph-types-and-styling.md`.
