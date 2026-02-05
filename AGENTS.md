# HELMbench - Quick Agent Reference

**HELMbench** is a Drupal 11 website for "Harm-reduction Evaluation for LLMs & Mental-health benchmark". Content-focused site with custom theme, paragraphs, and TOC navigation.

- **Drupal**: 11.x | **PHP**: 8.3 | **CSS**: Tailwind v3.4
- **Local Dev**: Lando (Docker-based)

## Key Directories

```
web/
├── modules/custom/          # Custom modules
├── themes/custom/helmbench/ # Custom theme (work here)
│   ├── components/          # Atomic design (atoms, molecules, organisms)
│   ├── src/                 # Source files (CSS, JS, icons)
│   ├── templates/           # Twig templates
│   ├── dist/                # Compiled output (don't edit)
│   ├── package.json         # Node deps
│   └── tailwind.config.js   # Tailwind config
└── sites/default/           # Drupal settings
```

## Essential Commands

**Lando (from project root):**
```bash
lando start|stop|restart           # Environment control
lando composer install             # PHP deps
lando drush cr                     # Clear cache
lando drush cex|cim                # Config export/import
lando backup|restore|health-check  # Database ops
```

**Theme (Node via Lando):**
```bash
# All npm commands need --prefix web/themes/custom/helmbench
lando npm --prefix web/themes/custom/helmbench install
lando npm --prefix web/themes/custom/helmbench run build    # Production build
lando npm --prefix web/themes/custom/helmbench run dev      # Watch mode (user may be running)
```

## Code Style

- **Indent**: 2 spaces (`.editorconfig`)
- **CSS**: Edit `src/css/main.css` → compiled to `dist/css/main.css`
  - Use `@apply` in `@layer components`
  - OKLCH color format, `.dark` class for dark mode
- **JS**: Use Drupal behaviors with `once()`:
  ```javascript
  Drupal.behaviors.myBehavior = {
    attach: function (context, settings) {
      once('my-once-id', '.selector', context).forEach(function (el) {
        // Code here
      });
    }
  };
  ```
- **Twig**: Use `@helmbench/`, `@atoms/`, `@molecules/`, `@organisms/` namespaces

## Key Config Files

| File | Purpose |
|------|---------|
| `.lando.yml` | Local dev environment |
| `web/themes/custom/helmbench/tailwind.config.js` | Tailwind + design tokens |
| `web/themes/custom/helmbench/helmbench.info.yml` | Theme metadata, regions |
| `web/themes/custom/helmbench/helmbench.libraries.yml` | CSS/JS libraries |

## Theme Regions

- `content` - Main content
- `navigation` - Sidebar nav
- `table_of_contents` - TOC sidebar (desktop)
- `footer` - Footer

## Troubleshooting

| Issue | Fix |
|-------|-----|
| Styles not showing | `lando npm --prefix web/themes/custom/helmbench run build && lando drush cr` |
| DB connection | `lando health-check && lando restart` |
| Changes not reflecting | Edit `src/`, not `dist/`; clear Drupal cache |
