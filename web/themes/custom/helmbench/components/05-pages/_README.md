# 05-pages: Page-Specific Components

This directory is for rare, page-specific components that don't fit elsewhere. Use sparingly!

## What Goes Here

- Components that are truly unique to one page
- Complex page-specific layouts that go beyond template wrappers
- One-off marketing pages or landing pages

## Guidelines

- **Avoid using this directory if possible** - most components should be reusable
- Ask: "Could this be an organism or template instead?"
- If a pattern appears twice, refactor it into 03-organisms

## Example Structure

```
05-pages/
├── homepage/
│   ├── homepage-hero.twig      # Special hero just for homepage
│   └── homepage.stories.js
└── results-page/
    ├── results-filters.twig    # Complex filter UI for results
    └── results-page.stories.js
```

## When to Use

- Landing page with unique, one-off design
- Special promotional page
- Complex page that combines many organisms in a specific way

## Better Alternatives

Instead of creating page-specific components, consider:

1. **Make the organism more flexible** with variants/options
2. **Use composition** in templates to arrange organisms differently
3. **Create a new organism** if the pattern might be reused
