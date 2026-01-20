# Navigation Templates

Override Drupal's menu and navigation templates here.

## Key Templates to Override

- **menu.html.twig** - Default menu rendering
- **menu--main.html.twig** - Main navigation menu specifically
- **menu-local-tasks.html.twig** - Tabs (View, Edit, etc.)

## Naming Convention

```
menu.html.twig              # All menus
menu--main.html.twig        # Main navigation menu
menu--footer.html.twig      # Footer menu (if you create one)
```

## Your Layouts (from context.md)

### Desktop
- Navigation on left side, left-justified, vertically centered

### Mobile
- Hamburger icon in fixed top bar
- Navigation slides out from right as drawer

## Integration Example

```twig
{# menu--main.html.twig #}
{% import _self as menus %}

{#
  Pass menu items to your navigation organism component.
  The component handles desktop vs mobile rendering.
#}
{% include '@helmbench/03-organisms/navigation/main-nav.twig' with {
  items: items,
  menu_level: 0,
} %}

{# Macro for recursive menu rendering if needed #}
{% macro menu_links(items, attributes, menu_level) %}
  {# ... #}
{% endmacro %}
```

## Mobile Navigation JavaScript

You'll need JS for:
- Toggle mobile menu drawer
- Close menu on link click
- Close menu on outside click
- Handle keyboard navigation (Escape to close)

Define the library in `helmbench.libraries.yml` and attach it:
```twig
{{ attach_library('helmbench/mobile-nav') }}
```
