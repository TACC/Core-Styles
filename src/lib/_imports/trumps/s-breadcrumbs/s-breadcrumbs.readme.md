A list of links to ancestor navigation (pages or sections that are a parent, grandparent, et cetera of the current page or section) and the current page or section itself.

- `.s-breadcrumbs`: root class for `<nav>` (major nav) or `<ol>` (other nav)
- `.s-breadcrumbs-via-ul`: alternate root class for `<ul>` (not recommended)

> **ⓘ Notice**
>
> A scope class is used to enforce appropriate semantic HTML.

> **ⓘ Notice**
>
> The markup uses embedded [Breadcrumb microdata](https://schema.org/ListItem).

| Class & Markup | Description | Notes |
| - | - | - |
| `nav.s-breadcrumb ol` | Major navigation |
| `ol.s-breadcrumb` | Other navigation |
| `div.s-breadcrumb ul` | Major navigation (Inaccurate markup) | Use when markup cannot be changed. |

<script src="{{path '/assets/_utils/js/open-ext-links-in-new-window.js'}}" />
