Make [table]({{path './table' }}) behave like a flex item, for a specific CEPv2 Portal use case.

> **?&#x20DD; Explanation**
>
> A `<table>` can **not** be a flex item. The trick is to [wrap the table in a `<div>`][source].

> **ⓘ Notice**
>
> This class can **only** be used on a table wrapper.

> **⚠️ Important**
>
> This class was used by CEPv2 Portal for a specific use case. It is not generic. Use or reference [`.o-flexible-table-wrap`]({{path './o-flexible-table-wrap' }}) for generic use cases.

[source]: https://stackoverflow.com/a/41421700/11817077 "Stack Overflow: Why does flex-box work with a div, but not a table?"

<script src="{{path '/assets/scripts/open-ext-links-in-new-window.js'}}" />
