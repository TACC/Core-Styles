# Quick Start

Core-Styles is reusable CSS used by [TACC] and [TACC User Portal].

## Basic Usage

If you must use Bootstrap, load Core-Styles' Bootstrap after it:

```css
@import url("https://cdn.jsdelivr.net/npm/bootstrap@4/dist/css/bootstrap.min.css") layer(foundation);
@import url("https://cdn.jsdelivr.net/npm/@tacc/core-styles@v2/dist/core-styles.bootstrap.css") layer(foundation);
```

If you are styling a static website, add:

```css
@import url("https://cdn.jsdelivr.net/npm/@tacc/core-styles@v2/dist/core-styles.base.css") layer(base);
@import url("https://cdn.jsdelivr.net/npm/@tacc/core-styles@v2/dist/core-styles.cms.css") layer(base);
```

If you are styling a dynamic web application, add:

```css
@import url("https://cdn.jsdelivr.net/npm/@tacc/core-styles@v2/dist/core-styles.base.css") layer(base);
@import url("https://cdn.jsdelivr.net/npm/@tacc/core-styles@v2/dist/core-styles.portal.css") layer(base);
```

If you **only** want [custom properties](https://developer.mozilla.org/en-US/docs/Web/CSS/--*) (colors, size, spacing, etc.), then **only** load:

```css
@import url("https://cdn.jsdelivr.net/npm/@tacc/core-styles@v2/dist/core-styles.settings.css") layer(base);
```

> [!TIP]
> For UI patterns and demos, see https://cep.tacc.utexas.edu/static/ui/.

> [!NOTE]
> For a more-detailed walkthrough and options, see [HOWTO.md](HOWTO.md).

> [!IMPORTANT]
> Core-Styles can [co-exist](docs/bootstrap.md) with Bootstrap 4.

## Advanced Usage

[Install into a project via Node.](README.md#b-install-into-a-project)

[Node.js]: https://nodejs.org/
[TACC]: https://www.tacc.utexas.edu/
[TACC User Portal]: https://tacc.utexas.edu/portal
