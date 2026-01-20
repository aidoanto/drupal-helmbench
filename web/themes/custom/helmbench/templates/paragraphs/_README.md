# Paragraph Templates

Override Drupal Paragraphs module templates here.

## Your Paragraph Types (from context.md)

1. **rich_text** - CKEditor content
2. **media_embed** - Image/video with caption
3. **card_grid** - Grid of card items
4. **ripped_headline** - Newspaper-style headline
5. **accordion** - Collapsible content sections
6. **icon_block** - Icon + text block
7. **callout** - Warning/Info/Success/Take Home alerts
8. **webform_embed** - Embedded webform
9. **hero** - Hero banner (H1 large or H2 small)
10. **view_embed** - Embedded Views display

## Naming Convention

```
paragraph.html.twig                    # Default for all paragraphs
paragraph--rich-text.html.twig         # Rich text paragraph
paragraph--card-grid.html.twig         # Card grid paragraph
paragraph--callout.html.twig           # Callout paragraph
```

## Template Pattern

Keep paragraph templates thin - they should wire Drupal data to components:

```twig
{# paragraph--callout.html.twig #}
{%
  set classes = [
    'paragraph',
    'paragraph--type--' ~ paragraph.bundle|clean_class,
  ]
%}

{% block paragraph %}
  <div{{ attributes.addClass(classes) }}>
    {% block content %}
      {#
        Include the callout component, mapping paragraph fields to component vars.
        content.field_callout_type, content.field_title, content.field_content
        are Drupal render arrays - render them or extract values as needed.
      #}
      {% include '@helmbench/02-molecules/callout/callout.twig' with {
        type: paragraph.field_callout_type.value,
        title: content.field_title,
        content: content.field_content,
      } %}
    {% endblock %}
  </div>
{% endblock paragraph %}
```

## Accessing Field Values

```twig
{# Render the field (includes label, wrapper, etc.) #}
{{ content.field_name }}

{# Get raw value #}
{{ paragraph.field_name.value }}

{# Get entity reference target #}
{{ paragraph.field_media.entity.field_media_image.entity.uri.value }}

{# Loop through multi-value fields #}
{% for item in paragraph.field_items %}
  {{ item.entity.field_title.value }}
{% endfor %}
```
