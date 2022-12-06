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

<script>
/* To open external links in new window */
Array.from(document.links)
  .filter(link => link.hostname != window.location.hostname)
  .forEach(link => link.target = '_blank');
</script>
