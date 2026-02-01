/** @type {import('tailwindcss').Config} */

/**
 * Tailwind CSS Configuration
 * Documentation: https://tailwindcss.com/docs/configuration
 *
 * This config determines which files Tailwind scans for classes,
 * and customizes the design system (colors, spacing, breakpoints, etc.)
 */
module.exports = {
  // Use the `.dark` class on a parent element (usually `<html>`)
  // to enable dark-mode variants and swap CSS variables.
  darkMode: 'class',

  // Content paths - Tailwind scans these files for class names to include
  content: [
    // Twig templates in the theme
    './templates/**/*.twig',
    './components/**/*.twig',
    // Any JS files that might contain class names
    './src/**/*.js',
    './components/**/*.js',
    // Storybook stories
    './components/**/*.stories.js',
  ],
  plugins: [
    // TODO: Add Tailwind plugins as needed
    require('@tailwindcss/typography'), // For prose styling
    // require('@tailwindcss/forms'),       // For better form defaults
    // require('@tailwindcss/aspect-ratio'), // For aspect ratio utilities
  ],

  theme: {
    // Breakpoints - align with helmbench.breakpoints.yml
    screens: {
      'sm': '640px',
      'md': '768px',      // tablet
      'lg': '1024px',     // desktop
      'xl': '1440px',     // wide
    },

    extend: {
      
      // Typography Plugin Customization
      // All typography styling is centralized here via the prose class.
      // Apply prose to content areas: <article class="prose">...</article>
      typography: (theme) => ({
        DEFAULT: {
          css: {
            // Colors - use our custom color system
            '--tw-prose-body': 'oklch(var(--text))',
            '--tw-prose-headings': 'oklch(var(--secondary))',
            '--tw-prose-links': 'oklch(var(--primary))',
            '--tw-prose-bold': 'oklch(var(--text))',
            '--tw-prose-counters': 'oklch(var(--text-muted))',
            '--tw-prose-bullets': 'oklch(var(--text-muted))',
            '--tw-prose-quotes': 'oklch(var(--text))',
            '--tw-prose-code': 'oklch(var(--secondary))',
            '--tw-prose-hr': 'oklch(var(--border))',
            '--tw-prose-th-borders': 'oklch(var(--border))',
            '--tw-prose-td-borders': 'oklch(var(--border-muted))',
            
            // Dark mode color variants (when using dark:prose-invert)
            '--tw-prose-invert-body': 'oklch(var(--text))',
            '--tw-prose-invert-headings': 'oklch(var(--secondary))',
            '--tw-prose-invert-links': 'oklch(var(--primary))',
            '--tw-prose-invert-bold': 'oklch(var(--text))',
            '--tw-prose-invert-counters': 'oklch(var(--text-muted))',
            '--tw-prose-invert-bullets': 'oklch(var(--text-muted))',
            '--tw-prose-invert-quotes': 'oklch(var(--text))',
            '--tw-prose-invert-code': 'oklch(var(--secondary))',
            '--tw-prose-invert-hr': 'oklch(var(--border))',
            '--tw-prose-invert-th-borders': 'oklch(var(--border))',
            '--tw-prose-invert-td-borders': 'oklch(var(--border-muted))',

            // Typography details
            // Use our custom font families
            'h1, h2, h3': {
              fontFamily: theme('fontFamily.headings').join(', '),
            },
            code: {
              fontFamily: theme('fontFamily.mono').join(', '),
            },
            
            // Links - already colored via prose variables above
            a: {
              textDecoration: 'underline',
              textUnderlineOffset: '2px',
              fontWeight: '500',
            },
          },
        },
      }),

      // Colors
      //
      // These map to CSS variables defined in `src/css/main.css` under `:root` and `.dark`.
      // The variables store only OKLCH components (e.g. `--bg: 0.96 0.02 79`), which allows
      // Tailwind's opacity modifiers to work: `bg-bg/80` becomes `oklch(0.96 0.02 79 / 0.8)`.
      // The `<alpha-value>` is a special Tailwind placeholder that gets replaced with the opacity.
      colors: {
        // Background roles
        'bg': 'oklch(var(--bg) / <alpha-value>)',
        'bg-deep': 'oklch(var(--bg-deep) / <alpha-value>)',
        'bg-shallow': 'oklch(var(--bg-shallow) / <alpha-value>)',
        'bg-alternate': 'oklch(var(--bg-alternate) / <alpha-value>)',

        // Backwards-compatible aliases (if you used these earlier)
        'bg-dark': 'oklch(var(--bg-deep) / <alpha-value>)',
        'bg-light': 'oklch(var(--bg-shallow) / <alpha-value>)',

        // Text roles
        'text': 'oklch(var(--text) / <alpha-value>)',
        'text-muted': 'oklch(var(--text-muted) / <alpha-value>)',

        // UI roles
        'highlight': 'oklch(var(--highlight) / <alpha-value>)',
        'border': 'oklch(var(--border) / <alpha-value>)',
        'border-muted': 'oklch(var(--border-muted) / <alpha-value>)',

        // Semantic roles
        'primary': 'oklch(var(--primary) / <alpha-value>)',
        'secondary': 'oklch(var(--secondary) / <alpha-value>)',
        'danger': 'oklch(var(--danger) / <alpha-value>)',
        'warning': 'oklch(var(--warning) / <alpha-value>)',
        'success': 'oklch(var(--success) / <alpha-value>)',
        'info': 'oklch(var(--info) / <alpha-value>)',
      },

      // Typography
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'serif': ['Georgia', 'serif'],
        'headings': ['"Archivo Narrow"', 'system-ui', 'sans-serif'],
        'mono': ['"IBM Plex Mono"', '"JetBrains Mono"', 'monospace'],
      },

      // Spacing (if you need custom values beyond Tailwind defaults)
      // spacing: {
      //   '18': '4.5rem',
      //   '112': '28rem',
      // },

      // Border radius
      // borderRadius: {
      //   'xl': '1rem',
      // },
    },
  }
}