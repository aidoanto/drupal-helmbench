## Context on HELMbench = Harm-reduction Evaluation for LLMs & Mental-health

### The Need for a Standard of Safety

People in emotional distress are increasingly turning to Large Language Models (LLMs) for support. Whether out of curiosity, a lack of accessible alternatives, or a desire for anonymity, individuals – particularly young people – are engaging with general-purpose LLM-based chatbots to discuss their mental health and wellbeing. This is happening now, on a massive scale, often with systems that were never designed for such sensitive interactions. It creates a significant and often invisible risk.

The core problem is that these LLMs are not equipped with sophisticated guardrails for mental health conversations: they can fail to recognise the severity of a crisis, offer simplistic or even harmful advice, or validate a user's distorted negative thoughts. While leading AI labs report using techniques to train models to behave safely, there isn't currently a shared, transparent benchmark to consistently evaluate the performance of these models regarding mental health safety. Without a common benchmark, it will be harder for developers to build truly responsible tools, or for users to distinguish safe applications from unsafe ones.

Given this reality, It is a way to measure an LLM's potential risk to a person in distress. HELMbench is designed to:

- outline what key safety evaluations of LLMs could look like
- be a practical tool for resesarchers, organisations and users to ascertain whether models meet those capabilities or not,
- enable comparisons between LLMs and humans on said benchmarks.

## About me

I am a new developer. I have completed intermediate courses on Python, CSS, and HTML. However, I am new to developing for the web, new to contemporary frontend development, and new to putting a lot of these learnings into action practically.

I work as a digital producer at Lifeline Australia. I have a new personal project doing some AI research (see above) and I want to publish it online.

At work, we use Drupal 11 with a custom Drupal theme, so I'd like to make this personal project professional in ways that will be helpful and educational but simple in other ways since it's just a personal project.

I have worked with Drupal as we created the site at work to some extent but am not an expert. This is the plan I've created so far:

## Tech stack

### Backend

- Drupal 11

### Frontend

- **Theme**: Custom 'helmbench' theme
- **Styling**: Tailwind CSS
- **Templating**: Twig
- **JavaScript**: Minimal (only where UX needs it)
- **Component workflow**: Storybook (build and document Twig components outside Drupal)
- **Base theme / framework**: No Emulsify (keep tooling simpler for now)

#### Theme structure (vendor-inspired)

Goal: keep the theme understandable and scalable, borrowing the vendor’s best ideas (atomic/component organization + clear template overrides) without adopting Emulsify itself.

- **`components/`**: UI pieces built as reusable Twig components (atomic-ish hierarchy)
  - `00-base/` (reset, typography primitives, global tokens/variables)
  - `01-atoms/` (buttons, links, badges, icons)
  - `02-molecules/` (card, callout, form-row)
  - `03-organisms/` (header, footer, nav, TOC, card-grid)
  - `04-templates/` (page-level layout wrappers)
  - `05-pages/` (rare; page-specific one-offs)
- **`templates/`**: Drupal template overrides grouped by concern (keep these thin)
  - `templates/layout/`, `templates/navigation/`, `templates/paragraphs/`, `templates/views/`, etc.
  - Prefer `templates/*` files to mostly “wire data” and include component templates from `components/*`
- **`storybook/`**: Stories live next to components, so each component has:
  - **template** (Twig)
  - **styles** (Tailwind classes in markup, plus any small CSS when needed)
  - **stories** (example data for variants/states)
- **`.storybook/`**: Storybook configuration at the theme root (mirrors vendor layout)
- **`src/` + `dist/` (or `build/`)**: keep front-end source separate from compiled assets
  - `src/`: any theme JS + Tailwind entrypoint(s)
  - `dist/`/`build/`: compiled CSS/JS referenced by `{theme}.libraries.yml`

### Contrib Modules (install)

- **paragraphs**: paragraph-based page building
- **entity_reference_revisions**: required for Paragraphs reference fields
- **webform**: contact form
- **pathauto**: automatic URL aliases
- **metatag**: SEO meta tags
- **token**: dependency for Pathauto patterns
- **admin_toolbar**: improved admin UX
- **field_group**: organize fields on edit forms
- **focal_point**: better image cropping editor
- **smart_trim**: nicer trimming for teasers/summaries

### Core Modules (enable)

- **views_ui** (Views is core; enable UI)
- **media** and **media_library**
- **ckeditor5**
- **responsive_image**
- **breakpoint** (used by Responsive Image mappings)

## Content Types

### Page (General Content)

**Bundle:** `node/page`

**Fields:**

- **Title**: Text (required)
- **Summary**: Text (plain, optional) — used for teasers
- **Featured image**: Media reference → Image (optional)
- **Body components**: Entity reference revisions → Paragraphs (unlimited)

**URL aliases:** Pathauto pattern like `/[node:title]`

### Result (Benchmark Run Summary)

**Bundle:** `node/result`

**Important behavior (MVP):**

- Results are **shown on the Runs listing** (`/results`) via Views.
- We do **not** need a polished public node page for results yet.
  - Easiest MVP: leave canonical pages accessible but **don’t link to them** anywhere.
  - If you want to strictly prevent access: add **Rabbit Hole** and deny/redirect canonical pages for this content type.

**Fields (start simple; manual entry):**

- **Title**: Text (required). Suggested format: `[Model Name] — [YYYY-MM-DD]`
- **Model name**: Text (required)
- **Creator**: Entity reference → Taxonomy term (Model Creators, required)
- **Date of run**: Date (required)
- **Score (0–100)**: Integer (required; min 0 max 100)
- **Run summary**: Long text (formatted or plain; required) — human-written summary only
- **Cost of run (USD)**: Decimal (scale 2, optional) — display formatted with `$` prefix
- **Token cost in (USD per 1M)**: Decimal (scale 6, optional) — `$` prefix + `per 1M tokens` suffix
- **Token cost out (USD per 1M)**: Decimal (scale 6, optional) — `$` prefix + `per 1M tokens` suffix

## Taxonomies

### Model Creators

**Machine name:** `model_creators`

**Description:** Organizations that create LLM models

**Terms:** Add as needed over time (no predefined list for MVP)

## Regions

- **Main Content** - Primary content area
- **Footer** - Site footer
- **Navigation** - Main site navigation menu
- **Table of Contents** - Auto-generated TOC for current page

## Layouts

### Common for All Layouts

- **Main content** in center column
- **Footer** at bottom of page, below content

### Desktop Layout

- **Navigation menu** on left side of page, left-justified, vertically centered
- **Table of contents** on right side, right-justified, vertically centered
- **Main content** in center column with appropriate max-width

### Mobile Layout

- **Top Bar** (fixed/sticky)
  - **Left/Center**: Current H2 title + Chevron (tap to toggle TOC dropdown)
  - **Right**: Hamburger menu icon (tap to slide out main navigation)
- **Navigation drawer**: Slides out from right (or covers screen), containing main menu items
- **Footer**: at bottom

## Paragraph Types

All paragraph bundles should have clear machine names and Twig templates like `paragraph--{bundle}.html.twig`.

### Rich Text (`rich_text`)

- **Content**: Long text (formatted; CKEditor5 “Basic HTML”)

### Media Embed (`media_embed`)

- **Media item**: Media reference (Image or Remote Video)
- **Caption**: Text (optional)

### Card Grid (`card_grid`)

- **Cards**: Entity reference revisions → Card (`card`) (0–8)

Card (`card`) fields:

- **Title**: Text (required)
- **Summary**: Text (plain, optional)
- **Link**: Link (required)
- **Image**: Media reference → Image (optional)

### Newspaper Ripped Headline (`ripped_headline`)

- **Headline text**: Text (required)
- **Logo**: Media reference → Image (optional)
- **Background texture**: Media reference → Image (required) — the ripped newspaper PNG

### Accordion (`accordion`)

- **Items**: Entity reference revisions → Accordion item (`accordion_item`) (unlimited)

Accordion item (`accordion_item`) fields:

- **Title**: Text (required)
- **Content**: Long text (formatted)

### Icon Block (`icon_block`)

- **Icon**: Media reference → Image (optional) OR text class name (pick one approach)
- **Text**: Text (required)

### Callout (`callout`)

- **Type**: List (Warning / Info / Success / Take Home)
- **Title**: Text (optional)
- **Content**: Long text (formatted)

### Webform Embed (`webform_embed`)

- **Webform**: Webform reference (required)

### Hero (`hero`)

- **Title**: Text (required)
- **Subtitle**: Text (optional)
- **Background image**: Media reference → Image (required)
- **Size**: List (H1/page-top large, H2/section small)

### View Embed (`view_embed`)

- **View**: View reference (select view + display)

## Views

### Runs View

**Machine name:** `runs`

**Purpose:** Display benchmark results listing

**Display type (recommended):** Table with sortable columns (clearer for “results” data)

**Base:** Content (Result content type)

**Fields to Display:**

- **Model Name** (sortable)
- **Creator** (taxonomy term, sortable, with logo/icon if available)
- **Score** (sortable, with colored indicator: green for >80, yellow for 50-80, red for <50)
- **Date of Run** (sortable, format: "M d, Y")
- **Cost of Run** (sortable, format: "$X.XX")

**Exposed Filters:**

- **Creator** (checkboxes, multiple selection, none selected by default shows all)
- **Date Range** (optional, for filtering by date)

**Sort Options (exposed):**

- Score (High to Low / Low to High)
- Date (Newest First / Oldest First)
- Cost (High to Low / Low to High)

**Default Sort:** Date of Run, DESC (newest first)

**Pager:** 20 items per page

**No Results Behavior:** Display message "No benchmark results found matching your filters."

**Path:** `/results`

**Menu:** Add to Main Navigation menu

## Media Types

### Image

- Local images (JPEG, PNG, WebP)
- Require **alt text**

### Remote Video

- Use core Media “Remote video” (oEmbed) for YouTube/Vimeo URLs

## Responsive Images (core `responsive_image`)

This requires defining theme breakpoints (in `{theme}.breakpoints.yml`) and then creating image styles + responsive image styles.

### Default theme breakpoints (suggested)

- **mobile**: 0–767px
- **tablet**: 768–1023px
- **desktop**: 1024–1439px
- **wide**: 1440px+

### Image styles (suggested defaults)

- **hero_large**: 1920×800 (scale and crop) + focal point
- **hero_small**: 1920×500 (scale and crop) + focal point
- **card_image**: 600×400 (scale and crop) + focal point
- **thumbnail**: 400×300 (scale and crop) + focal point
- **content_large**: width 1200 (scale)

### Responsive image styles (mappings)

- **Hero Large**
  - wide/desktop → `hero_large`
  - tablet → derived 1024×427 (either separate style or use `hero_large` with responsive sizing)
  - mobile → derived 768×320
- **Hero Small**
  - wide/desktop → `hero_small`
  - tablet → derived 1024×267
  - mobile → derived 768×200
- **Card Image**
  - desktop → `card_image`
  - tablet/mobile → let browser downscale, or create smaller derivatives later if needed

## Text Formats & CKEditor5

### Basic HTML (default)

- Enable headings **H2–H6** (reserve H1 for page title)
- Allow tables, blockquotes, inline code + code blocks
- Provide a “Styles” dropdown for link-as-button classes (theme-provided), e.g. `.button`, `.button--primary`

### Full HTML (admin only; optional)

- Keep available only for Administrator if you later need richer embeds

## Navigation

### Main menu (`main`)

- **Home** (“HELMbench”) → `/`
- **About me** → `/about`
- **Results** → `/results` (Runs view)

## Users & Permissions

- **Public site**: anonymous users can view published Pages and the Results listing.
- **Admin**: just you (Administrator role).
- **Registration**: disabled (no public accounts).
