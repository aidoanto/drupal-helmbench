# Paragraph Types and Styling

This phase adds a second paragraph type and wires the templates so you can
style them cleanly.

We will create:

- **Rich Text** (already created)
- **Media Embed** (new)

## Goals for this phase

- Media Embed paragraph type exists
- Paragraph templates are connected to components
- You can add a media paragraph to a Page

## 1) Create the Media Embed paragraph type (UI)

Go to **Structure → Paragraph types** (`/admin/structure/paragraphs_type`).

Click **Add paragraph type** and create:

- Label: **Media embed**
- Machine name: `media_embed`

Add fields:

1. **Media item** (Media)
   - Machine name: `field_media`
   - Allowed media types: Image, Remote video
   - Required: No (optional for now)
2. **Caption** (Text, plain)
   - Machine name: `field_caption`
   - Optional

## 2) Allow Media Embed on the Page field (UI)

Go to the Page fields:

**Structure → Content types → Page → Manage fields**

Edit **Body components**:

- Allowed paragraph types: **Rich text**, **Media embed**
- Default: **Rich text**

## 3) Create paragraph templates (theme)

In the theme, Drupal looks for templates at:

- `web/themes/custom/helmbench/templates/paragraphs/`

Create one template per paragraph bundle:

- `paragraph--rich-text.html.twig`
- `paragraph--media-embed.html.twig`

These templates should stay **thin** and include your components.

Example (rich text):

```twig
{# templates/paragraphs/paragraph--rich-text.html.twig #}
{% include '@helmbench/02-molecules/rich-text/rich-text.twig' with {
  content: content.field_content
} %}
```

Example (media embed):

```twig
{# templates/paragraphs/paragraph--media-embed.html.twig #}
{% include '@helmbench/02-molecules/media-embed/media-embed.twig' with {
  media: content.field_media,
  caption: content.field_caption
} %}
```

## 4) Create the components (theme)

Add component templates in:

- `web/themes/custom/helmbench/components/02-molecules/`

Example structure:

```
components/02-molecules/rich-text/
  rich-text.twig
components/02-molecules/media-embed/
  media-embed.twig
```

In `rich-text.twig`, you can just render the content:

```twig
<div class="prose max-w-none">
  {{ content }}
</div>
```

In `media-embed.twig`, keep it simple:

```twig
<figure class="space-y-2">
  <div class="rounded-lg overflow-hidden">
    {{ media }}
  </div>
  {% if caption %}
    <figcaption class="text-sm text-slate-600">
      {{ caption }}
    </figcaption>
  {% endif %}
</figure>
```

## 5) Rebuild and clear caches

```bash
lando npm --prefix web/themes/custom/helmbench run build
lando drush cr
```

## 6) Add content and test (UI)

Edit your test Page and add a **Media embed** paragraph.

- Choose an image from the Media Library.
- Add a short caption.

Save and view the page. You should see a styled image with a caption.

## Done? Move to the next guide

Continue to:
`/guides/05-testing-and-next-steps.md`.
