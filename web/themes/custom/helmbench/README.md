# HELMbench Theme

Custom Drupal 11 theme for HELMbench - Harm-reduction Evaluation for LLMs & Mental-health.

## Quick Start

```bash
# Navigate to theme directory
cd web/themes/custom/helmbench

# Install npm dependencies
npm install

# Build CSS (compile Tailwind)
npm run build

# Or watch for changes during development
npm run dev
```

## Directory Structure

```
helmbench/
├── .storybook/           # Storybook configuration
├── components/           # Reusable UI components (atomic design)
│   ├── 00-base/         # Foundation: tokens, typography, variables
│   ├── 01-atoms/        # Basic elements: buttons, links, badges
│   ├── 02-molecules/    # Grouped atoms: cards, callouts, form rows
│   ├── 03-organisms/    # Complex sections: header, footer, nav, card-grid
│   ├── 04-templates/    # Page layout wrappers
│   └── 05-pages/        # Page-specific components (use sparingly)
├── dist/                 # Compiled CSS/JS output
├── src/                  # Source files
│   ├── css/             # Tailwind entry point
│   └── js/              # JavaScript source
├── templates/            # Drupal template overrides
│   ├── layout/          # html.html.twig, page.html.twig
│   ├── navigation/      # Menu templates
│   ├── node/            # Node templates
│   ├── paragraphs/      # Paragraph type templates
│   └── views/           # Views templates
├── helmbench.info.yml    # Theme metadata
├── helmbench.libraries.yml # Asset libraries
├── helmbench.breakpoints.yml # Responsive breakpoints
├── helmbench.theme       # PHP preprocess functions
├── package.json          # npm configuration
└── tailwind.config.js    # Tailwind CSS configuration
```

## Development Workflow

### 1. Build Components in Isolation

Create components in `components/` with:
- `component-name.twig` - Template
- `component-name.stories.js` - Storybook story (optional)

### 2. Wire Components to Drupal

Create thin template overrides in `templates/` that include your components:

```twig
{# templates/paragraphs/paragraph--callout.html.twig #}
{% include '@helmbench/02-molecules/callout/callout.twig' with {
  type: paragraph.field_type.value,
  title: content.field_title,
  content: content.field_content,
} %}
```

### 3. Add Preprocess Logic as Needed

Use `helmbench.theme` for PHP logic that prepares data for templates.

## NPM Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Watch mode - rebuilds CSS on file changes |
| `npm run build` | Production build - minified CSS |
| `npm run storybook` | Start Storybook dev server (port 6006) |
| `npm run storybook:build` | Build static Storybook |

## Enabling the Theme

1. Install Drupal (if not done): visit `/core/install.php`
2. Go to Appearance (`/admin/appearance`)
3. Find "HELMbench" and click "Install and set as default"
4. Clear caches: `drush cr` or Admin > Configuration > Performance > Clear all caches

## Key Files to Customize

1. **`src/css/main.css`** - Add base styles, component classes, utilities
2. **`tailwind.config.js`** - Define colors, fonts, spacing tokens
3. **`templates/layout/page.html.twig`** - Main page structure
4. **`components/03-organisms/`** - Header, footer, navigation components

## Resources

- [Drupal Theming Guide](https://www.drupal.org/docs/theming-drupal)
- [Twig in Drupal](https://www.drupal.org/docs/theming-drupal/twig-in-drupal)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Storybook Docs](https://storybook.js.org/docs)
