# Node Templates

Override Drupal node templates here.

## Your Content Types (from context.md)

### Page (`node/page`)
General content pages with paragraphs-based body.

### Result (`node/result`)
Benchmark run summaries - primarily displayed via Views, not individual pages.

## Naming Convention

```
node.html.twig                      # Default for all nodes
node--page.html.twig                # Page content type
node--page--full.html.twig          # Page in full view mode
node--page--teaser.html.twig        # Page in teaser view mode
node--result.html.twig              # Result content type
node--result--teaser.html.twig      # Result teaser (for Views rows)
```

## View Modes

- **full**: Complete node display (default single page view)
- **teaser**: Summary display (in listings, views)
- **search_result**: How node appears in search results

## Template Pattern

```twig
{# node--page--full.html.twig #}
{%
  set classes = [
    'node',
    'node--type-' ~ node.bundle|clean_class,
    node.isPromoted() ? 'node--promoted',
    node.isSticky() ? 'node--sticky',
    not node.isPublished() ? 'node--unpublished',
    view_mode ? 'node--view-mode-' ~ view_mode|clean_class,
  ]
%}

{{ attach_library('classy/node') }}

<article{{ attributes.addClass(classes) }}>
  {# Page title is usually rendered by the page template, not here #}

  {# Featured image #}
  {% if content.field_featured_image|render %}
    <div class="node__featured-image">
      {{ content.field_featured_image }}
    </div>
  {% endif %}

  {# Body paragraphs #}
  <div class="node__content">
    {{ content.field_body_components }}
  </div>
</article>
```

## Accessing Node Data

```twig
{# Node bundle (content type) #}
{{ node.bundle }}  {# 'page', 'result' #}

{# Node title #}
{{ label }}

{# Field values #}
{{ node.field_summary.value }}
{{ content.field_featured_image }}

{# Check if field has value #}
{% if content.field_summary|render %}
  {{ content.field_summary }}
{% endif %}

{# Created/changed dates #}
{{ node.getCreatedTime()|date('F j, Y') }}
```
