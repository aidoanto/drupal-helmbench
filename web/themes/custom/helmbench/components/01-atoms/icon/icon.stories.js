/**
 * Icon Component Stories
 *
 * Showcases the icon component with different sizes and use cases.
 * 
 * Note: For these stories to work, you need to:
 * 1. Run `npm run icons:build` to generate the sprite
 * 2. Include the sprite in your Storybook setup (see .storybook/preview.js)
 */

// TODO: When Storybook is configured for Twig, update this to use Twig templates
// For now, this is a placeholder showing the expected structure

export default {
  title: 'Atoms/Icon',
  // TODO: Add parameters for controls, docs, etc. when Storybook is configured
  parameters: {
    docs: {
      description: {
        component: 'Icon component using Lucide icons via SVG sprite. Icons are rendered from a sprite file generated from src/icons/icons.json.',
      },
    },
  },
  argTypes: {
    name: {
      control: 'select',
      options: [
        'chevron-right',
        'chevron-down',
        'menu',
        'x',
        'user',
        'info',
        'arrow-right',
      ],
      description: 'Icon name from Lucide library',
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Icon size',
    },
    class: {
      control: 'text',
      description: 'Additional CSS classes',
    },
    aria_label: {
      control: 'text',
      description: 'Accessible label for screen readers',
    },
  },
};

// TODO: Replace with actual Twig template rendering when Storybook is configured
// Example story structure:
export const Default = {
  args: {
    name: 'chevron-right',
    size: 'md',
  },
};

export const Sizes = {
  render: () => {
    // TODO: Render Twig template with different sizes
    return `
      <div style="display: flex; gap: 1rem; align-items: center;">
        <div>
          <p>Extra Small (xs)</p>
          <!-- Include icon.twig with size: 'xs' -->
        </div>
        <div>
          <p>Small (sm)</p>
          <!-- Include icon.twig with size: 'sm' -->
        </div>
        <div>
          <p>Medium (md)</p>
          <!-- Include icon.twig with size: 'md' -->
        </div>
        <div>
          <p>Large (lg)</p>
          <!-- Include icon.twig with size: 'lg' -->
        </div>
        <div>
          <p>Extra Large (xl)</p>
          <!-- Include icon.twig with size: 'xl' -->
        </div>
      </div>
    `;
  },
};

export const WithColors = {
  render: () => {
    // TODO: Render Twig template with Tailwind color classes
    return `
      <div style="display: flex; gap: 1rem; align-items: center;">
        <div>
          <p>Default (currentColor)</p>
          <!-- Include icon.twig -->
        </div>
        <div>
          <p>Primary</p>
          <!-- Include icon.twig with class: 'text-primary' -->
        </div>
        <div>
          <p>Danger</p>
          <!-- Include icon.twig with class: 'text-danger' -->
        </div>
        <div>
          <p>Success</p>
          <!-- Include icon.twig with class: 'text-success' -->
        </div>
      </div>
    `;
  },
};

export const CommonIcons = {
  render: () => {
    // TODO: Showcase common icons used in the theme
    const icons = [
      'chevron-right',
      'chevron-down',
      'menu',
      'x',
      'user',
      'info',
      'arrow-right',
    ];
    
    return `
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 1rem;">
        ${icons.map(icon => `
          <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
            <!-- Include icon.twig with name: '${icon}' -->
            <p style="font-size: 0.875rem; color: #666;">${icon}</p>
          </div>
        `).join('')}
      </div>
    `;
  },
};

export const Accessible = {
  args: {
    name: 'info',
    size: 'md',
    aria_label: 'Information',
  },
  parameters: {
    docs: {
      description: {
        story: 'Icon with accessible label for screen readers. Use aria_label when the icon conveys meaning, or leave it decorative (default) when it\'s purely visual.',
      },
    },
  },
};
