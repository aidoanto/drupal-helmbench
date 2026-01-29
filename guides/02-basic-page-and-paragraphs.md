# Basic Page Content Type + First Paragraph

This phase creates the simplest content model: a **Page** that contains
Paragraphs. We'll start with one paragraph type: **Rich Text**.

## Goals for this phase

- The Page content type has a Paragraphs field
- You can add a "Rich Text" paragraph to a Page
- You can create and view a simple page

## 1) Prepare the Page content type (UI)

Drupal ships with a **Page** content type. We will add a Paragraphs field to it.

Go to: **Structure → Content types → Page → Manage fields**
(`/admin/structure/types/manage/page/fields`)

Add these fields (if they do not exist already):

1. **Summary** (Text, plain)
   - Machine name: `field_summary`
   - Optional
2. **Featured image** (Media)
   - Media type: Image
   - Machine name: `field_featured_image`
   - Optional
3. **Body components** (Entity reference revisions)
   - Machine name: `field_body_components`
   - Reference type: Paragraph
   - Number of values: Unlimited

If the default **Body** field exists, you can keep it but hide it from the form:

- Go to **Manage form display**
- Drag **Body** to **Disabled**

That keeps things clean for now.

## 2) Create the "Rich Text" paragraph type (UI)

Go to **Structure → Paragraph types** (`/admin/structure/paragraphs_type`) and
click **Add paragraph type**.

Create:

- Label: **Rich text**
- Machine name: `rich_text`

Then add a field:

- **Content** (Long text, formatted)
- Machine name: `field_content`
- Text format: **Basic HTML**

## 3) Attach paragraph types to the Page field (UI)

Go back to the Page field settings:

**Structure → Content types → Page → Manage fields → Body components**

Set:

- Allowed paragraph types: **Rich text** (for now)
- Default paragraph type: **Rich text**

## 4) Create a test page (UI)

Go to **Content → Add content → Page** and fill:

- **Title**: "Welcome"
- **Body components**: add a Rich text paragraph
  - Add a short H2 heading and a paragraph or two

Save and view the page.

## 5) Quick check

- The page displays your Rich text content
- You can edit the page and add another Rich text paragraph

If the page looks unstyled, do not worry yet. We will add styling later.

## Done? Move to the next guide

Continue to:
`/guides/03-theme-tokens-and-base-styles.md`.
