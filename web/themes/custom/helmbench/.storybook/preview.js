/**
 * Storybook Preview Configuration
 * Documentation: https://storybook.js.org/docs/configure/story-rendering
 *
 * This file controls how stories are rendered in the Storybook UI.
 * Add global decorators, parameters, and styles here.
 */

// Import your compiled CSS so stories are styled
// TODO: Uncomment after running 'npm run build'
// import '../dist/css/main.css';

/** @type { import('@storybook/html').Preview } */
const preview = {
  parameters: {
    // Controls addon configuration
    controls: {
      // Show color picker for color props
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    // Viewport addon - test responsive breakpoints
    viewport: {
      viewports: {
        mobile: {
          name: 'Mobile',
          styles: {
            width: '375px',
            height: '667px',
          },
        },
        tablet: {
          name: 'Tablet',
          styles: {
            width: '768px',
            height: '1024px',
          },
        },
        desktop: {
          name: 'Desktop',
          styles: {
            width: '1024px',
            height: '768px',
          },
        },
        wide: {
          name: 'Wide',
          styles: {
            width: '1440px',
            height: '900px',
          },
        },
      },
    },

    // Backgrounds addon - test on different backgrounds
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'dark', value: '#1a1a1a' },
        { name: 'gray', value: '#f5f5f5' },
      ],
    },
  },

  // Global decorators - wrap all stories
  decorators: [
    // TODO: Add decorators to wrap stories in common markup
    // (Story) => `<div class="container-content">${Story()}</div>`,
  ],
};

export default preview;
