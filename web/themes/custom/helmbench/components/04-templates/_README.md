# 04-templates: Page Layout Components

Templates are page-level layout wrappers that define the overall structure and regions of a page.

## What Goes Here

- **Page layouts**: Different page structures (1-column, 2-column, 3-column)
- **Content wrappers**: Main content area containers
- **Region layouts**: How regions are arranged on the page

## Example Structure

```
04-templates/
├── page-default/
│   ├── page-default.twig
│   └── page-default.stories.js
├── page-with-sidebar/
│   ├── page-with-sidebar.twig
│   └── page-with-sidebar.stories.js
└── page-full-width/
    ├── page-full-width.twig
    └── page-full-width.stories.js
```

## Example: page-default/page-default.twig

```twig
{#
  Default Page Template

  Variables:
  - navigation: HTML for navigation region
  - content: HTML for main content
  - table_of_contents: HTML for TOC region (optional)
  - footer: HTML for footer region
#}
<div class="page-layout">
  {# Desktop: 3-column layout with nav | content | toc #}
  <div class="hidden lg:flex min-h-screen">
    <aside class="w-64 flex-shrink-0">
      {{ navigation }}
    </aside>

    <main class="flex-1 max-w-4xl mx-auto px-8 py-12">
      {{ content }}
    </main>

    {% if table_of_contents %}
      <aside class="w-64 flex-shrink-0">
        {{ table_of_contents }}
      </aside>
    {% endif %}
  </div>

  {# Mobile: Stacked with fixed header #}
  <div class="lg:hidden">
    {# Mobile header would go here #}
    <main class="px-4 py-6">
      {{ content }}
    </main>
  </div>

  <footer>
    {{ footer }}
  </footer>
</div>
```

## Integration with Drupal

These templates are used by your `templates/layout/page.html.twig` override:

```twig
{# templates/layout/page.html.twig #}
{% include '@helmbench/04-templates/page-default/page-default.twig' with {
  navigation: page.navigation,
  content: page.content,
  table_of_contents: page.table_of_contents,
  footer: page.footer,
} %}
```
