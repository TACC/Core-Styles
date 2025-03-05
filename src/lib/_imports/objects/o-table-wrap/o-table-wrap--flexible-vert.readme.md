Make [table]({{path './table' }}) width able to <strong>stretch</strong> <em>but <strong>not</strong> shrink</em>.

> **?&#x20DD; Explanation**
>
> A `<table>` can **not** be a flex item. The trick is to [wrap it in a `<div>`][source-flex].

> **ⓘ Notice**
>
> This class can **only** be used on a table wrapper. It has **no** affect when used on table directly.

[source-flex]: https://stackoverflow.com/a/41421700/11817077 "Stack Overflow: Why does flex-box work with a div, but not a table?"

<script src="{{path '/assets/scripts/open-ext-links-in-new-window.js'}}" />
