# Content Width Configuration Guide

This guide explains how to add the width field to your paragraph types to enable variable content widths (regular or wide).

## Overview

The variable width feature allows content editors to choose between two content widths on desktop and tablet devices:

- **Regular (70ch)**: The default, optimal for reading text
- **Wide (90ch)**: Wider option, great for images, videos, and other visual content

On mobile devices, all content is full-width regardless of this setting.

## Adding the Width Field to Paragraph Types

Follow these steps for each paragraph type that should support width options (recommended: Media Embed, Rich Text, Accordion).

### Step 1: Navigate to Paragraph Type Management

1. Log in to your Drupal admin interface
2. Go to **Structure** → **Paragraph types**
3. Find the paragraph type you want to add the width field to (e.g., "Media Embed")
4. Click **Manage fields**

### Step 2: Add the Width Field

1. Click **Add field** button
2. Select **List (text)** as the field type
3. In the "Re-use an existing field" dropdown, if you've already added this to another paragraph type, select **field_width**. Otherwise:
   - Choose **Add a new field**
   - Label: `Width`
   - Machine name: `field_width` (Drupal will suggest this automatically)
4. Click **Save and continue**

### Step 3: Configure Allowed Values

1. In the "Allowed values list" field, enter:
   ```
   regular|Regular
   wide|Wide
   ```
   - `regular` is the machine name (stored in the database)
   - `Regular` is the human-readable label (shown to editors)
2. Click **Save field settings**

### Step 4: Configure Field Settings

1. Set **Default value**: Select `Regular`
2. Set **Required field**: Check this box (ensures every paragraph has a width setting)
3. **Help text** (optional but recommended):
   ```
   Choose the width for this content. Regular (70ch) is best for text, Wide (90ch) is better for images and media. On mobile devices, all content is full-width.
   ```
4. Click **Save settings**

### Step 5: Configure Form Display (Optional)

By default, the field will show as a dropdown. You can customize this:

1. Go to **Structure** → **Paragraph types** → **[Your Type]** → **Manage form display**
2. Find the **Width** field
3. Change the widget if desired:
   - **Select list**: Dropdown (default, good for many options)
   - **Radio buttons**: Better UX when you only have 2-3 options (recommended)
4. Click **Save**

### Step 6: Verify Display Settings

1. Go to **Structure** → **Paragraph types** → **[Your Type]** → **Manage display**
2. Make sure the **Width** field is set to **Hidden**
   - The width field is only used for layout logic in templates
   - It should never be displayed to site visitors
3. Click **Save**

## Recommended Paragraph Types for Width Field

| Paragraph Type | Recommended | Reason                                                 |
| -------------- | ----------- | ------------------------------------------------------ |
| Media Embed    | ✓ Yes       | Images and videos often benefit from wider display     |
| Rich Text      | ✓ Yes       | Occasionally useful for wide tables or special layouts |
| Accordion      | ✓ Yes       | Can help with complex accordion content                |
| Future Gallery | ✓ Yes       | When you add gallery/slideshow types                   |

## Testing the Feature

After adding the field:

1. **Clear Drupal cache**: `drush cr` (or Admin → Configuration → Development → Performance → Clear all caches)
2. **Rebuild CSS**: In your theme folder, run `npm run build`
3. **Create or edit content**:
   - Edit a page with paragraphs
   - Add or edit a paragraph that has the width field
   - You should see the "Width" dropdown or radio buttons
   - Try changing between Regular and Wide
4. **View on different devices**:
   - Desktop: Should see the width difference
   - Tablet: Should see the width difference
   - Mobile: Everything full-width (no difference)

## How It Works (Technical Details)

### CSS Grid Layout

The layout uses CSS Grid with named grid lines:

```css
.content-grid {
  display: grid;
  grid-template-columns:
    [full-start] 1fr
    [wide-start] /* ... */
    [content-start] 70ch
    [content-end] /* ... */
    [wide-end] 1fr
    [full-end];
}
```

- Regular content spans from `content-start` to `content-end` (70ch)
- Wide content spans from `wide-start` to `wide-end` (90ch)

### Template Logic

Each paragraph template reads the `field_width` value and applies a CSS class:

```twig
{% set width = paragraph.field_width.value ?? 'regular' %}
{% set width_class = width == 'wide' ? 'width-wide' : '' %}

<div class="{{ width_class }}">
  {# paragraph content #}
</div>
```

The `??` (null coalescing) operator ensures the field defaults to 'regular' if it doesn't exist, preventing errors.

### Responsive Behavior

The `.content-grid` class and width variations only apply at the `md` breakpoint and above (768px+):

```css
@screen md {
  .content-grid {
    /* ... */
  }
}
```

Below 768px, the grid doesn't apply, so everything naturally flows full-width.

## Troubleshooting

### Width setting doesn't appear when editing

- Clear Drupal cache: `drush cr`
- Verify the field was added successfully in Structure → Paragraph types → [Type] → Manage fields
- Check that the field widget is enabled in Manage form display

### Content doesn't change width on the frontend

- Rebuild theme CSS: `npm run build` (in theme directory)
- Clear Drupal cache again: `drush cr`
- Check browser dev tools for the `.content-grid` and `.width-wide` classes
- Verify you're viewing on desktop (min-width: 768px+)

### Template errors about field_width

- Make sure you're using the `??` operator for the default value
- The templates are already set up to gracefully handle missing fields
- If you see errors, the field might not have been added to that paragraph type yet

## Further Customization

### Adjust the Widths

Edit `web/themes/custom/helmbench/src/css/main.css`:

```css
.content-grid {
  --content-width: 70ch; /* Change regular width here */
  --wide-width: 90ch; /* Change wide width here */
  /* ... */
}
```

After changing, run `npm run build` to rebuild the CSS.

### Add More Width Options

If you want a third option (e.g., "extra-wide"):

1. Update the field's allowed values in Drupal:

   ```
   regular|Regular
   wide|Wide
   extra-wide|Extra Wide
   ```

2. Update the CSS in `main.css`:

   ```css
   .content-grid {
     --content-width: 70ch;
     --wide-width: 90ch;
     --extra-wide-width: 110ch; /* Add this */

     grid-template-columns:
       [full-start] 1fr
       [extra-wide-start] /* add extra-wide columns here */
       [wide-start]; /* ... */
   }

   .content-grid > .width-extra-wide {
     grid-column: extra-wide;
   }
   ```

3. Update paragraph templates to handle the new value:
   ```twig
   {% set width_class = '' %}
   {% if width == 'wide' %}
     {% set width_class = 'width-wide' %}
   {% elseif width == 'extra-wide' %}
     {% set width_class = 'width-extra-wide' %}
   {% endif %}
   ```

## Next Steps

- Try adding the field to your existing paragraph types
- Experiment with different content types in each width
- Consider which paragraph types benefit most from the wide option
- Share the feature with your content editors and gather feedback
