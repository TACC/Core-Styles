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
2. [**Project**](#2-project)
3. [**Cosmetic**](#3-cosmetic)

### 0. Foundation

__<u>Not</u> necessary.__ (Also, we prefer you use Core-Styles **without** Bootstrap.)

__If__ your project requires Bootstrap (e.g. [Django CMS](https://www.django-cms.org/)), __then__ load Bootstrap 4 first. _[Compatibility](./docs/bootstrap.md) not guaranteed beyond Bootstrap 4._

__If__ you want your project to use a [reset, normalize, or reboot][foundation], __then__ load it first. _Compatibility desired.[^1] Please report any issues.[^2]_

### 1. Base

Load `core-styles.base.css` from a CDN e.g. [JSDeliver].

- Either in HTML:

    ```html
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tacc/core-styles@2.25.3/dist/core-styles.base.css" />
    ```

- Or in CSS:

    ```css
    @import url("https://cdn.jsdelivr.net/npm/@tacc/core-styles@2.25.3/dist/core-styles.base.css"\);
    ```

### 2. Project

Load any one of these relevant project-type CSS from a CDN e.g. [JSDeliver]:

| stylesheet | purpose |
| - | - |
| `core-styles.cms.css` | marketing or branding sites |
| `core-styles.docs.css` | documentation sites |
| `core-styles.portal.css` | portals (i.e. web apps) |

- Either in HTML:

    ```html
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tacc/core-styles@2.25.3/dist/core-styles.______.css" />
    ```

    Replace `______` with `cms` or `docs` or `portal`.

- Or in CSS:

    ```css
    @import url("https://cdn.jsdelivr.net/npm/@tacc/core-styles@2.25.3/dist/core-styles.______.css"\);
    ```

    Replace `______` with `cms` or `docs` or `portal`.

[JSDeliver]: https://www.jsdelivr.com/package/npm/@tacc/core-styles?tab=files&path=dist

### 3. Cosmetic

Load stylesheets from your project.

- Either in HTML:

    ```html
    <link rel="stylesheet" href="/your/project/stylesheet.css" />
    ```

- Or in CSS:

    ```css
    @import url("/your/project/stylesheet.postcss");
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

Load `core-styles.settings.css` from a CDN e.g. [JSDeliver].

- Either in HTML:

    ```html
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tacc/core-styles@2.25.3/dist/core-styles.settings.css" />
    ```

- Or in CSS:

    ```css
    @import url("https://cdn.jsdelivr.net/npm/@tacc/core-styles@2.25.3/dist/core-styles.settings.css"\);
    ```

### Load a [Core Styles] Pattern

To use a pattern as is.

- Either in HTML:

    ```html
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tacc/core-styles@2.25.3/dist/components/c-message.css" />
    ```

- Or in CSS:

    ```css
    @import url("https://cdn.jsdelivr.net/npm/@tacc/core-styles@2.25.3/dist/core-styles.settings.css"\);
    ```

### Extend a [Core Styles] Pattern

To use a pattern but also change it to fit a unique requirement of your site.

- Either in HTML:

    ```html
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tacc/core-styles@2.25.3/dist/components/c-message.css" />
    <style>
      .c-message--scope-section {
        margin-bottom: 1em;
      }
    </style>
    ```

- Or in CSS:

    ```css
    @import url("https://cdn.jsdelivr.net/npm/@tacc/core-styles@2.25.3/dist/core-styles.settings.css"\);

    .c-message--scope-section {
      margin-bottom: 1em;
    }
    ```

## (Auxiliary) Core Styles in [React]

See [how Core Styles can be used in React with CSS Modules](https://github.com/TACC/tup-ui/blob/9402505/apps/tup-ui/src/styles/README.md#use-core-styles).

## (Internal) Style Guide

To _author_ CSS like is done for [Core Styles], follow TACC's [CSS Style Guide].

[core styles]: https://github.com/TACC/Core-Styles
[css style guide]: https://confluence.tacc.utexas.edu/display/~wbomar/Shared+UI+-+CSS+-+Style+Guide
[foundation]: https://css-tricks.com/reboot-resets-reasoning/
[react]: https://react.dev/

[^1]: Core-Styles testing with a [reset, normalize, or reboot][foundation] has onyl been atop Bootstrap 4's `reboot.scss`.
[^2]: If you have access, [report issues in JIRA "WP" Project](https://jira.tacc.utexas.edu/projects/WP/issues). Otherwise, [report issues in Github](https://github.com/TACC/Core-Styles/issues).
[^3]: Stylesheet load order and naming comes from [MCSS](https://confluence.tacc.utexas.edu/x/b53tDg).
