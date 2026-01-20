# Views Templates

Override Drupal Views templates here.

## Your Views (from context.md)

### Runs View (`/results`)
- Displays benchmark results as a sortable table
- Fields: Model Name, Creator, Score (with color indicator), Date, Cost
- Exposed filters: Creator (checkboxes), Date Range
- Exposed sorts: Score, Date, Cost

## Naming Convention

Views templates follow this pattern:
```
views-view.html.twig                           # All views
views-view--runs.html.twig                     # Runs view specifically
views-view-table.html.twig                     # Table display style
views-view-table--runs.html.twig               # Table for runs view
views-view-fields.html.twig                    # Individual row (unformatted)
views-view-field.html.twig                     # Individual field
```

## Key Templates to Override

### views-view--runs.html.twig
The overall view wrapper with exposed filters, header, content, pager.

### views-view-table--runs.html.twig
The table structure with headers and rows.

## Score Color Indicator

From your context:
- Green: score > 80
- Yellow: score 50-80
- Red: score < 50

Implement this in your Views field template or via preprocess:

```twig
{# In a views field template or via preprocess #}
{% set score = row._entity.field_score.value %}
{% set score_class = score > 80 ? 'score--high' : (score >= 50 ? 'score--medium' : 'score--low') %}
<span class="score {{ score_class }}">{{ score }}</span>
```

Or use Views Conditional Formatting or a custom field formatter.

## Exposed Filters Styling

The exposed filters form can be themed via:
- `views-exposed-form.html.twig`
- `views-exposed-form--runs.html.twig`

```twig
{# views-exposed-form--runs.html.twig #}
{% include '@helmbench/03-organisms/results-filters/results-filters.twig' with {
  form: form,
} %}
```
