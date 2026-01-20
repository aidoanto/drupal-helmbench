# 01-atoms: Basic UI Elements

Atoms are the smallest, most fundamental building blocks. They can't be broken down further without losing meaning.

## What Goes Here

- **Buttons**: `.button`, `.button--primary`, `.button--secondary`
- **Links**: Styled links, link variants
- **Form elements**: Inputs, labels, checkboxes, radios
- **Icons**: SVG icons or icon components
- **Badges/Tags**: Status indicators, labels
- **Typography elements**: Headings (as components), blockquotes

## Example Structure

```
01-atoms/
├── button/
│   ├── button.twig           # Template
│   ├── button.stories.js     # Storybook story
│   └── _README.md            # Component docs
├── icon/
│   ├── icon.twig
│   └── icon.stories.js
└── badge/
    ├── badge.twig
    └── badge.stories.js
```

## Example: button/button.twig

```twig
{#
  Button Component

  Variables:
  - text: string (required) - Button label
  - url: string (optional) - Makes it a link
  - variant: string (optional) - 'primary' | 'secondary' | 'outline'
  - size: string (optional) - 'sm' | 'md' | 'lg'
  - attributes: Attribute object for additional HTML attributes
#}
{% set classes = [
  'btn',
  variant ? 'btn--' ~ variant,
  size ? 'btn--' ~ size,
] | filter(v => v) | join(' ') %}

{% if url %}
  <a href="{{ url }}" class="{{ classes }}" {{ attributes }}>
    {{ text }}
  </a>
{% else %}
  <button class="{{ classes }}" {{ attributes }}>
    {{ text }}
  </button>
{% endif %}
```

## Naming Convention

- Use lowercase, hyphenated names: `button`, `form-input`, `icon`
- Variants use BEM: `button--primary`, `icon--large`
