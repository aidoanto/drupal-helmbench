# Layout Templates

Override Drupal's core layout templates here.

## Key Templates to Override

- **html.html.twig** - Outermost HTML wrapper (<html>, <head>, <body>)
- **page.html.twig** - Page structure with regions
- **region.html.twig** - Individual region wrappers

## Naming Convention

Drupal looks for templates with these naming patterns (most specific wins):

```
page.html.twig              # Default for all pages
page--front.html.twig       # Homepage only
page--node.html.twig        # All node pages
page--node--result.html.twig # Result content type pages
```

## Best Practice

Keep these templates thin! They should primarily:
1. Wire Drupal variables to your component templates
2. Include components from `components/04-templates/`

Example:
```twig
{# page.html.twig #}
{% include '@helmbench/04-templates/page-default/page-default.twig' with {
  navigation: page.navigation,
  content: page.content,
  footer: page.footer,
} %}
```
