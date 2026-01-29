# Start Here: From Blank Install to Running Site

This guide assumes you already installed Docker + Lando and cloned the repo.
We will get a clean Drupal install running, enable the base modules, and turn on
the HELMbench theme. This is the "blank template" starting point.

## Goals for this phase

- Drupal is installed and you can log in
- Required modules are enabled
- HELMbench theme is active
- Theme assets build successfully

## 1) Start the project containers

From the project root:

```bash
lando start
```

If this is your first run, install PHP dependencies:

```bash
lando composer install
```

## 2) Install Drupal (UI)

1. Run `lando info` and copy the site URL.
2. Open that URL in your browser.
3. Choose **English** and select the **Standard** profile.
4. For database credentials, use the **database** block from `lando info`.
5. Set the site name to **HELMbench**, then create your admin account.

You should now see the Drupal homepage, and you can log in at `/user/login`.

## 3) Enable required modules (command)

Run these commands from the project root:

```bash
lando drush en paragraphs entity_reference_revisions pathauto metatag token admin_toolbar field_group focal_point smart_trim -y
lando drush en media media_library responsive_image -y
```

These match the module list in `GETTING_STARTED.md`.

## 4) Enable the HELMbench theme (UI)

1. Go to **Appearance** (`/admin/appearance`).
2. Find **HELMbench** under "Uninstalled themes".
3. Click **Install and set as default**.

## 5) Build the theme assets (command)

```bash
lando npm --prefix web/themes/custom/helmbench install
lando npm --prefix web/themes/custom/helmbench run build
```

For active development, you can use:

```bash
lando npm --prefix web/themes/custom/helmbench run dev
```

## 6) Quick sanity check

- Visit the homepage while logged in.
- Go to `/admin/appearance` and confirm **HELMbench** is default.
- If styles are not showing, clear caches:

```bash
lando drush cr
```

## Done? Move to the next guide

When everything looks stable, continue to:
`/guides/02-basic-page-and-paragraphs.md`.
