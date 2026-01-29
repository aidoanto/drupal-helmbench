# Theme Toggle Component

A button component that toggles between light and dark mode, with support for system preferences.

## Overview

This component provides a dark mode toggle that:

- **Respects system preference**: If the user's OS is set to dark mode, the site starts in dark mode
- **Allows manual override**: Users can click to toggle regardless of system setting
- **Remembers choice**: User preference is saved in localStorage and persists across sessions
- **Prevents flash**: An inline script in `<head>` applies the theme before the page renders

## How It Works

```
Page Load
    │
    ▼
┌─────────────────────────────────────┐
│  Inline script in <head> runs       │
│  (before any CSS or content loads)  │
└─────────────────────────────────────┘
    │
    ▼
┌─────────────────────────────────────┐
│  Check localStorage for 'theme'     │
└─────────────────────────────────────┘
    │
    ├── Found 'dark' ──────────────► Add .dark class to <html>
    │
    ├── Found 'light' ─────────────► Do nothing (light is default)
    │
    └── Not found ─────────────────► Check system preference
                                          │
                                          ├── System prefers dark ──► Add .dark class
                                          │
                                          └── System prefers light ─► Do nothing
```

## Usage

### Basic Usage

```twig
{% include '@helmbench/01-atoms/theme-toggle/theme-toggle.twig' %}
```

### With Additional Classes

```twig
{% include '@helmbench/01-atoms/theme-toggle/theme-toggle.twig' with {
  class: 'ml-4'
} %}
```

### Attaching the Library

The JavaScript must be attached for the toggle to work. Add this to your template:

```twig
{{ attach_library('helmbench/theme-toggle') }}
{% include '@helmbench/01-atoms/theme-toggle/theme-toggle.twig' %}
```

Or attach the library globally in `helmbench.info.yml` if the toggle appears on every page.

## Files

| File                | Purpose                                      |
| ------------------- | -------------------------------------------- |
| `theme-toggle.twig` | Button markup with sun/moon icons            |
| `theme-toggle.js`   | Click handler and system preference listener |
| `_README.md`        | This documentation                           |

## Related Files

| File                              | Purpose                                                  |
| --------------------------------- | -------------------------------------------------------- |
| `templates/layout/html.html.twig` | Contains inline script for initial theme detection       |
| `src/css/main.css`                | Contains `:root` and `.dark` CSS variable definitions    |
| `tailwind.config.js`              | Sets `darkMode: 'class'` to enable class-based dark mode |
| `helmbench.libraries.yml`         | Defines the `theme-toggle` library                       |

## How the Dark Mode System Works

### 1. CSS Variables (main.css)

The theme colors are defined as CSS variables in two places:

```css
:root {
  --bg: 0.96 0.02 79; /* Light mode background */
  --text: 0.15 0.04 79; /* Light mode text */
  /* ... more variables */
}

.dark {
  --bg: 0.15 0.02 79; /* Dark mode background */
  --text: 0.96 0.04 79; /* Dark mode text */
  /* ... more variables */
}
```

### 2. Tailwind Configuration

The `darkMode: 'class'` setting in `tailwind.config.js` tells Tailwind to use a CSS class (`.dark`) to trigger dark mode, rather than the media query.

### 3. Inline Script (html.html.twig)

A small script in `<head>` runs before the page renders:

```javascript
(function () {
  var t = localStorage.getItem("theme");
  var d = window.matchMedia("(prefers-color-scheme: dark)").matches;
  if (t === "dark" || (!t && d)) {
    document.documentElement.classList.add("dark");
  }
})();
```

This prevents the "flash of wrong theme" that would occur if we waited for the main JavaScript to load.

### 4. Toggle Button (this component)

The button toggles the `.dark` class and saves the preference to localStorage.

## Icons

The component uses two icons from Lucide:

- `sun` - Displayed in dark mode (click to switch to light)
- `moon` - Displayed in light mode (click to switch to dark)

Make sure these icons are included in `src/icons/icons.json`.

## Accessibility

- The button has `aria-label="Toggle dark mode"` for screen readers
- Icons are marked `aria-hidden="true"` since they're decorative
- The button has a `title` attribute for tooltip on hover

## Clearing User Preference

To reset to system default (for testing or user request), remove the localStorage item:

```javascript
localStorage.removeItem("theme");
location.reload();
```

## Browser Support

- `localStorage`: All modern browsers
- `prefers-color-scheme`: All modern browsers (Safari 12.1+, Chrome 76+, Firefox 67+)
- `matchMedia`: All modern browsers

## Troubleshooting

### Theme flashes on page load

Make sure the inline script in `html.html.twig` is present and runs before any CSS loads.

### Toggle doesn't work

1. Check browser console for JavaScript errors
2. Verify the library is attached: `{{ attach_library('helmbench/theme-toggle') }}`
3. Ensure `core/drupal` and `core/once` dependencies are available

### System preference changes aren't detected

The listener only applies changes if the user hasn't manually set a preference. Clear localStorage to test:

```javascript
localStorage.removeItem("theme");
```
