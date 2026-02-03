# HELMbench - Getting Started

This document will help you get the HELMbench Drupal site up and running.

## Prerequisites

- Docker Desktop or Docker Engine
- Lando (https://lando.dev)

## 1. Start Lando

From the project root:

```bash
lando start
```

This will spin up PHP, a web server, and a database for you.

## 2. Install PHP Dependencies

If this is your first time running the project, install PHP deps inside Lando:

```bash
lando composer install
```

## 3. Get Database Credentials

Run:

```bash
lando info
```

Look for the **database** section. You will use the host, username, password, and database name from there during Drupal installation.

## 4. Install Drupal

### Open the site

Lando will print a URL like `http://drupal-helmbench.lndo.site`. Open that in your browser.

If the proxy fails to start because port 443 is already in use, restart Docker
Desktop (or your Docker service) and run `lando poweroff` followed by
`lando start`. As a temporary fallback, you can use the `http://localhost:PORT`
URL that `lando info` prints.

### Run the installer
1. Open your Lando URL in your browser
2. Choose language (English)
3. Select "Standard" installation profile
4. Enter the database credentials from `lando info`
5. Configure site:
   - Site name: HELMbench
   - Your email and admin account details
6. Complete installation

## 5. Enable Contrib Modules

After installation, enable the installed contrib modules:

```bash
# Drush is available via Lando:
lando drush en paragraphs entity_reference_revisions pathauto metatag token admin_toolbar field_group focal_point smart_trim -y

# Also enable core modules you'll need:
lando drush en media media_library responsive_image -y
```

Or via Admin UI: `/admin/modules`

## 6. Enable the Theme

1. Go to Appearance (`/admin/appearance`)
2. Find "HELMbench" under Uninstalled themes
3. Click "Install and set as default"

## 7. Build Theme Assets

```bash
# Install npm dependencies
lando npm --prefix web/themes/custom/helmbench install

# Build CSS
lando npm --prefix web/themes/custom/helmbench run build

# For development (watch mode)
lando npm --prefix web/themes/custom/helmbench run dev
```

## 8. Create Content Structure

Based on context.md, you'll need to create:

### Taxonomy
- **Model Creators** (`/admin/structure/taxonomy/add`)
  - Machine name: `model_creators`

### Content Types

#### Page (`/admin/structure/types/add`)
Already exists - customize fields as needed.

#### Result (`/admin/structure/types/add`)
- Machine name: `result`
- Fields to add:
  - `field_model_name` (Text)
  - `field_creator` (Entity reference → Model Creators)
  - `field_date_of_run` (Date)
  - `field_score` (Integer, 0-100)
  - `field_run_summary` (Long text)
  - `field_cost_of_run` (Decimal)
  - `field_token_cost_in` (Decimal)
  - `field_token_cost_out` (Decimal)

### Paragraph Types (`/admin/structure/paragraphs_type`)

Create these paragraph types:
- `rich_text`
- `media_embed`
- `card_grid` (with nested `card` paragraph)
- `ripped_headline`
- `accordion` (with nested `accordion_item` paragraph)
- `icon_block`
- `callout`
- `hero`
- `view_embed`

### Views (`/admin/structure/views`)

Create "Runs" view:
- Path: `/results`
- Content type filter: Result
- Display: Table
- Fields: Model Name, Creator, Score, Date, Cost
- Exposed filters and sorts

## 9. Configure Image Styles

Go to `/admin/config/media/image-styles` and create:
- `hero_large` (1920×800 scale and crop)
- `hero_small` (1920×500 scale and crop)
- `card_image` (600×400 scale and crop)
- `thumbnail` (400×300 scale and crop)
- `content_large` (1200 width scale)

Then create Responsive Image Styles at `/admin/config/media/responsive-image-style`.

## Project Structure

```
drupal-helmbench/
├── composer.json          # PHP dependencies
├── web/                   # Drupal docroot
│   ├── core/             # Drupal core
│   ├── modules/
│   │   └── contrib/      # Contributed modules
│   ├── themes/
│   │   └── custom/
│   │       └── helmbench/ # Your custom theme ← Work here!
│   └── sites/
│       └── default/
│           └── settings.php
└── vendor/               # Composer packages
```

## Helpful Commands

```bash
# Clear all caches
lando drush cr

# Export configuration
lando drush cex

# Import configuration
lando drush cim

# Update database after module updates
lando drush updb

# Watch theme CSS changes
lando npm --prefix web/themes/custom/helmbench run dev
```

## Next Steps

1. Start building components in `web/themes/custom/helmbench/components/`
2. Override templates in `web/themes/custom/helmbench/templates/`
3. Customize styles in `src/css/main.css`
4. See `web/themes/custom/helmbench/README.md` for theme-specific documentation

## Notes

- **Webform module**: Not yet compatible with Drupal 11. Check for updates or use an alternative contact form solution.
- The theme uses Tailwind CSS - run `npm run dev` while developing to see style changes.
