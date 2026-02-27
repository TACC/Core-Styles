Navigation links that flow inline on narrow screens.

> **ⓘ Notice**
>
> To enforce appropriate semantic HTML, a `<nav>` is required.

> **⚠️ Important**
>
> - For __list__ navigation, use `<ul>` or `<ol>` (with `<li>` children).\
> _Inside this kind of nav, whitespace in client client will __not__ render._
> - For __non__-list navigation, i.e. direct `<a>` children (no `<li>`), add class `c-nav--no-list`.\
> _Inside this kind of nav, whitespace in client client __will__ render.*_
>
> <small>* To remove whitespace with CSS would break or complicate font-size cascade.</small>

| Class                   | Description
| - | - |
| `.c-nav`                | changes from list to cloud on narrow screens
| `.c-nav--boxed`         | adds box around nav
| `.c-nav--piped`         | adds pipes (" \| ") between links
| `.c-nav--no-list`       | shows as cloud of links on all screen sizes

Variants:

| Class                   | Description
| - | - |
| __`.c-nav--piped`__     |
| `.c-nav--piped--after`  | adds pipes (" \| ") _after_ links __(default)__
| `.c-nav--plain--before` | adds pipes (" \| ") _before_ links
