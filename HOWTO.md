# Core Styles - How To

- [Use **All** of Core Styles](#use-all-of-core-styles)
- [Use **Some** of Core Styles](#use-some-of-core-styles)
- [(Auxiliary) Core Styles in **React**](#auxiliary-core-styles-in-react)
- [(Internal) Style Guide](#internal-style-guide)

## Use **All** of [Core Styles]

> This method expects no other website theme is present. If you must build atop an exisitng theme, then [Use **Some** of Core Styles](#use-some-of-core-styles).

Load stylesheets (as needed) in this order. The Core Styles "Base" is required. A Core-Styles' "Project" is recommended.[^3]

0. [Foundation](#0-foundation)
1. [**Base**](#1-base)
2. [Project](#2-project)
3. [Cosmetic](#3-cosmetic)

### 0. Foundation

__Optional.__

__If__ you want your project to use a [reset, normalize, or reboot][foundation], __then__ load it first. _Please report any compatibility issues.[^1][^2]_

__If__ your project uses a full library (e.g. Bootstrap, Ant), __then__ load that library first. _Compatibility not yet guaranteed beyond [our Bootstrap support](./docs/bootstrap.md)._

- [Bootstrap](#0-foundation-bootstrap)
- [Other](#0-foundation-other)

#### 0. Foundation: Bootstrap

Load Bootstrap and `core-styles.bootstrap.css` from a [CDN] in CSS:

```css
@import url("https://cdn.jsdelivr.net/npm/bootstrap@4/dist/css/bootstrap.min.css") layer(foundation);
@import url("https://cdn.jsdelivr.net/npm/@tacc/core-styles@v2/dist/core-styles.bootstrap.css") layer(foundation);
```

<sup>The use of `layer` avoids specificity conflicts [^spec-doc][^spec-art].</sup>

#### 0. Foundation: Other

We are also considering support for Ant or ShadCN.

### 1. Base

Load **first** `core-styles.base.css` **then** any one of these relevant project-type CSS from [CDN] —

| stylesheet | purpose |
| - | - |
| `core-styles.cms.css` | marketing or branding sites |
| `core-styles.header.css` | Core-CMS & Core-Portal |
| `core-styles.docs.css` | documentation sites |
| `core-styles.portal.css` | portals (i.e. web apps) |

— in CSS:

```css
@import url("https://cdn.jsdelivr.net/npm/@tacc/core-styles@v2/dist/core-styles.base.css") layer(base);
@import url("https://cdn.jsdelivr.net/npm/@tacc/core-styles@v2/dist/core-styles.______.css") layer(base);
```

<sup>Replace `______` with `cms`, `docs`, `portal`, etc.</sup>

### 2. Project

Load global stylesheet(s) specific to your project.

- Either in HTML:

    ```html
    <link rel="stylesheet" href="..." />
    ```

- Or in CSS:

    ```css
    @import url("...") layer(project);
    ```

    <sup>The use of `layer` avoids specificity conflicts [^spec-doc][^spec-art].</sup>

[^spec-doc]: See [developer documentation for specificity](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Cascade/Specificity).
[^spec-art]: See [educational illustration on specificity](https://stuffandnonsense.co.uk/specisithity).

### 3. Cosmetic

__Optional__

Load stylesheet(s) for variant style of your project.

- Either in HTML:

    ```html
    <link rel="stylesheet" href="/your/project/stylesheet.css" />
    ```

- Or in CSS:

    ```css
    @import url("/your/project/stylesheet.css") layer(cosmetic);
    ```

## Use **Some** of [Core Styles]

- [For a Portal Application](#for-a-portal-application)
- [For a CMS or Documentation Site](#for-a-cms-or-documentation-site)

### For a Portal Application

See https://github.com/TACC/tup-ui/blob/9402505/apps/tup-ui/src/styles/README.md#use-core-styles.

### For a CMS or Documentation Site

> This method is meant to add support for Core Styles patterns atop an existing theme. If you expect Core Styles to be your theme, then follow [Use **All** of Core Styles](#use-all-of-core-styles) instead.

To use only what you need of [Core Styles]:

1. [Load Settings](#load-settings).*
2. Load stylesheets as necessary:
    - [Load a Core Styles Pattern](#load-a-core-styles-pattern)
    - [Extend a Core Styles Pattern](#extend-a-core-styles-pattern)


<sub>* This lets Core Styles patterns access [custom properties](https://developer.mozilla.org/en-US/docs/Web/CSS/--*) they assume exist.</sub>

### Load Settings

Load `core-styles.settings.css` from a [CDN].

- Either in HTML:

    ```html
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tacc/core-styles@v2/dist/core-styles.settings.css" />
    ```

- Or in CSS:

    ```css
    @import url("https://cdn.jsdelivr.net/npm/@tacc/core-styles@v2/dist/core-styles.settings.css");
    ```

### Load a [Core Styles] Pattern

To use a pattern as is.

- Either in HTML:

    ```html
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tacc/core-styles@v2/dist/components/c-message.css" />
    ```

- Or in CSS:

    ```css
    @import url("https://cdn.jsdelivr.net/npm/@tacc/core-styles@v2/dist/core-styles.settings.css");
    ```

### Extend a [Core Styles] Pattern

To use a pattern but also change it to fit a unique requirement of your site.

- Either in HTML:

    ```html
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tacc/core-styles@v2/dist/components/c-message.css" />
    <style>
      .c-message--scope-section {
        margin-bottom: 1em;
      }
    </style>
    ```

- Or in CSS:

    ```css
    @import url("https://cdn.jsdelivr.net/npm/@tacc/core-styles@v2/dist/core-styles.settings.css");

    .c-message--scope-section {
      margin-bottom: 1em;
    }
    ```

## (Auxiliary) Core Styles in [React]

See [how Core Styles can be used in React with CSS Modules](https://github.com/TACC/tup-ui/blob/9402505/apps/tup-ui/src/styles/README.md#use-core-styles).

## (Internal) Style Guide

To _author_ CSS like is done for [Core Styles], follow TACC's [CSS Style Guide].

[core styles]: https://github.com/TACC/Core-Styles
[css style guide]: https://tacc-main.atlassian.net/wiki/x/7Bdv
[foundation]: https://css-tricks.com/reboot-resets-reasoning/
[react]: https://react.dev/

[cdn]: We prefer [JSDeliver], because it allows the same syntax for tag, branch, and commit **and** because its parsing of [Semver] lets you use `@v2` to get the latest release within version 2.

[semver]: https://semver.org/

[jsdeliver]: https://www.jsdelivr.com/package/npm/@tacc/core-styles?tab=files&path=dist

[^1]: Core-Styles testing with a [reset, normalize, or reboot][foundation] has only been atop Bootstrap 4's `reboot.scss`.
[^2]: Report as [issues in Github](https://github.com/TACC/Core-Styles/issues).
[^3]: Stylesheet load order and naming comes from [MCSS](https://tacc-main.atlassian.net/wiki/x/hRlv).
