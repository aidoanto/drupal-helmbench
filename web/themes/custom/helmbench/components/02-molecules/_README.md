# 02-molecules: Grouped Atoms

Molecules are simple groups of atoms that function together as a unit.

## What Goes Here

- **Card**: Image + title + summary + link
- **Callout/Alert**: Icon + message + optional action
- **Form Row**: Label + input + validation message
- **Media Object**: Image + text side by side
- **Search Form**: Input + button combined

## Example Structure

```
02-molecules/
├── card/
│   ├── card.twig
│   ├── card.stories.js
│   └── _README.md
├── callout/
│   ├── callout.twig
│   └── callout.stories.js
├── form-row/
│   ├── form-row.twig
│   └── form-row.stories.js
└── media-object/
    ├── media-object.twig
    └── media-object.stories.js
```

## Example: card/card.twig

```twig
{#
  Card Component

  Variables:
  - title: string (required)
  - summary: string (optional)
  - url: string (required) - Link destination
  - image: object (optional) - { src, alt }
  - attributes: Attribute object
#}
<article class="card" {{ attributes }}>
  {% if image %}
    <div class="card__image">
      <img src="{{ image.src }}" alt="{{ image.alt }}" loading="lazy">
    </div>
  {% endif %}

  <div class="card__content">
    <h3 class="card__title">
      <a href="{{ url }}">{{ title }}</a>
    </h3>

    {% if summary %}
      <p class="card__summary">{{ summary }}</p>
    {% endif %}
  </div>
</article>
```

## Key Principles

- Molecules should be reusable across different contexts
- Keep them focused on one purpose
- Include atoms via Twig `include` when practical
