/**
 * Storybook Main Configuration
 * Documentation: https://storybook.js.org/docs/configure
 *
 * This file configures Storybook's behavior, addons, and framework settings.
 *
 * TODO: To set up Storybook for Twig, you'll need additional packages:
 *   npm install --save-dev @storybook/html @storybook/addon-essentials
 *   npm install --save-dev twig twigjs-loader  (for Twig compilation)
 *
 * See: https://storybook.js.org/docs/get-started/install
 */

/** @type { import('@storybook/html-vite').StorybookConfig } */
const config = {
  // Where to find story files
  stories: [
    '../components/**/*.stories.@(js|jsx|ts|tsx)',
  ],

  // Addons to enhance Storybook
  addons: [
    // TODO: Uncomment after installing
    // '@storybook/addon-essentials',  // Core addons (controls, actions, docs, etc.)
    // '@storybook/addon-a11y',        // Accessibility testing
  ],

  // Framework configuration
  framework: {
    // TODO: Choose your framework - for Twig/HTML components use:
    // name: '@storybook/html-vite',
    // options: {},
  },

  // Static files to serve (images, fonts, etc.)
  staticDirs: [
    // '../dist',  // Your compiled assets
  ],

  // TODO: You may need custom webpack/vite config for Twig compilation
  // See Storybook docs for framework-specific configuration
};

export default config;
