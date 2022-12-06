Make [table]({{path './table' }}) overflow <strong>scrollable</strong>.

For extra customization, see relevant <code>extra…</code> "File" from "Assets" tab.

> **?&#x20DD; Explanation**
>
> A `<table>` can **not** scroll its content. The trick is to [wrap it in a `<div>` and scroll the `<div>`][source-scroll].

> **ⓘ Notice**
>
> This class can **only** be used on a table wrapper. It has **no** affect when used on table directly.

[source-scroll]: https://stackoverflow.com/a/19794391/11817077 "Stack Overflow: Horizontal scroll on overflow of table (answer)"

<script>
/* To open external links in new window */
Array.from(document.links)
  .filter(link => link.hostname != window.location.hostname)
  .forEach(link => link.target = '_blank');
</script>
