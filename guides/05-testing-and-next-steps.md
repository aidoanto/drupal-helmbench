# Testing and Next Steps

This phase helps you confirm the basics work before you move on to more complex
content (taxonomies, views, results, and model creators).

## Goals for this phase

- Pages with paragraphs render correctly
- Theme build and cache clear steps are repeatable
- You have a simple manual testing checklist

## 1) Quick rebuild checklist

Use this whenever styles are not showing:

```bash
lando npm --prefix web/themes/custom/helmbench run build
lando drush cr
```

## 2) Manual UI checks (beginner-friendly)

Open your test Page and verify:

- Rich text headings look different from body text
- Links are visible and styled
- Media embed shows the image and caption
- Spacing around paragraphs feels consistent

If anything looks wrong:

- Check that you used the correct paragraph template file name
  - `paragraph--rich-text.html.twig`
  - `paragraph--media-embed.html.twig`
- Clear caches again
- Rebuild the theme CSS

## 3) Basic accessibility sanity checks

These are simple, practical checks you can do now:

- Images have alt text
- Headings are in order (start with H2 on pages)
- Links are descriptive (avoid "click here")

## 4) Optional: Create a second test page

Make a new Page with:

- Two Rich text paragraphs
- One Media embed paragraph
- A mix of headings and paragraphs

This gives you a better feel for layout and spacing.

## 5) Next steps (not required yet)

When you are ready, the next big items are:

- Taxonomy: **Model Creators**
- Content type: **Result**
- A **Runs** view at `/results`
- Additional paragraph types (card grid, accordion, hero, etc.)

These are not needed for your current MVP, so it is totally fine to pause here.

## You did the hard part

Getting the first content model and theme styling in place is the toughest step.
From here, everything is mostly repetition and refinement. Nice work.
