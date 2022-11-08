This allows us to satisfy clients who strongly prefer [standard CMS links]¹ are underlined.

> **⚠️ Warning**
>
> Do **not** add to `<body>` tag, otherwise header may adversely inherit styles.

**Instructions**

1. Add `s-links-irregular` class to an ancestor element.

**Examples**

```
<main class="s-links-irregular">
    ... <a href="...">Click me</a> ...
</main>
```

```
<section class="some-unique-content s-links-irregular">
    ... <a href="...">Click me</a> ...
</section>
```

---

<small>¹ The [standard CMS links] do meet “WCAG 2.0 Level AA” link contrast.</small>

[standard CMS links]: /components/detail/links.cms
