# 03-organisms: Complex Components

Organisms are complex UI sections composed of molecules and/or atoms. They form distinct sections of an interface.

## What Goes Here

- **Header**: Logo + navigation + search
- **Footer**: Links + copyright + social icons
- **Navigation**: Main menu, mobile nav drawer
- **Card Grid**: Multiple cards in a layout
- **Table of Contents**: Auto-generated or manual TOC
- **Results Table**: For the benchmark results view
- **Hero**: Large banner with title/subtitle/background
- **Accordion**: Collapsible content sections

## Example Structure

```
03-organisms/
├── header/
│   ├── header.twig
│   ├── header.stories.js
│   └── header.js           # If JS needed for mobile menu
├── footer/
│   ├── footer.twig
│   └── footer.stories.js
├── navigation/
│   ├── main-nav.twig
│   ├── mobile-nav.twig
│   └── navigation.stories.js
├── card-grid/
│   ├── card-grid.twig
│   └── card-grid.stories.js
├── hero/
│   ├── hero.twig
│   └── hero.stories.js
├── accordion/
│   ├── accordion.twig
│   ├── accordion.js
│   └── accordion.stories.js
└── results-table/
    ├── results-table.twig
    └── results-table.stories.js
```

## Example: card-grid/card-grid.twig

```twig
{#
  Card Grid Component

  Variables:
  - cards: array of card objects
  - columns: number (2, 3, or 4) - default 3
#}
{% set col_class = {
  2: 'grid-cols-1 md:grid-cols-2',
  3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
} %}

<div class="grid {{ col_class[columns|default(3)] }} gap-6">
  {% for card in cards %}
    {% include '@helmbench/02-molecules/card/card.twig' with card only %}
  {% endfor %}
</div>
```

## Tips

- Organisms often need JavaScript for interactivity
- Define JS as separate libraries in `helmbench.libraries.yml`
- Use `attach_library()` in templates when JS is needed
