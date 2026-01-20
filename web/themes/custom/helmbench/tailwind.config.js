/** @type {import('tailwindcss').Config} */

/**
 * Tailwind CSS Configuration
 * Documentation: https://tailwindcss.com/docs/configuration
 *
 * This config determines which files Tailwind scans for classes,
 * and customizes the design system (colors, spacing, breakpoints, etc.)
 */
module.exports = {
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

  theme: {
    // Breakpoints - align with helmbench.breakpoints.yml
    screens: {
      'sm': '640px',
      'md': '768px',      // tablet
      'lg': '1024px',     // desktop
      'xl': '1440px',     // wide
    },

    extend: {
      // TODO: Add your custom design tokens here

      // Colors
      // colors: {
      //   'primary': '#your-color',
      //   'secondary': '#your-color',
      //   'success': '#22c55e',
      //   'warning': '#eab308',
      //   'error': '#ef4444',
      //   'info': '#3b82f6',
      // },

      // Typography
      // fontFamily: {
      //   'sans': ['Inter', 'system-ui', 'sans-serif'],
      //   'serif': ['Georgia', 'serif'],
      //   'mono': ['JetBrains Mono', 'monospace'],
      // },

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
  },

  plugins: [
    // TODO: Add Tailwind plugins as needed
    // require('@tailwindcss/typography'),  // For prose styling
    // require('@tailwindcss/forms'),       // For better form defaults
    // require('@tailwindcss/aspect-ratio'), // For aspect ratio utilities
  ],
};
