# Quick Start

Core-Styles is reusable CSS used by [TACC] and [TACC User Portal].

## Basic Usage

For a static website:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tacc/core-styles@2.25.3/dist/core-styles.base.css" />
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tacc/core-styles@2.25.3/dist/core-styles.cms.css" />
```

For a dynamic web application:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tacc/core-styles@2.25.3/dist/core-styles.base.css" />
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tacc/core-styles@2.25.3/dist/core-styles.portal.css" />
```

For **only** [custom properties](https://developer.mozilla.org/en-US/docs/Web/CSS/--*) e.g. colors, size, spacing, et cetera:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tacc/core-styles@2.25.3/dist/core-styles.settings.css" />
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
