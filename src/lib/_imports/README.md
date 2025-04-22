# TACC Core Styles - Library - Imports

Styles here should be isolated UI patterns and be imported by other stylesheets.

## Rules

1. Files **must** be [organized appropriately](#directory-organization).
2. Files **must** be [documented appropriately](#documentation-format).
3. Files **must** follow the [style guide][tacc-style-guide].

## Directory Organization

These directories are based on [ITCSS][tacc-itcss].

[tacc-itcss]: https://tacc-main.atlassian.net/wiki/x/QQhv

## Documentation Format

See [Fractal: User Guide: Components][fractal-docs-guide]. (What we call "Patterns", Fractal calls "Components".)

### Overview

1. The `./*/README.md` files describe the type of patterns in its folders.
2. Underscore-prefixed files and folders are documentation templates.
3. Nested folders named after patterns have their docs, templates, and config.
4. Old-style pattern docs are `/* ... Styleguide ... */` and `.html` files.

## Style Guide

See [TACC: CSS Style Guide][tacc-style-guide].

### Object-Oriented Styles

- Pattern developers should understand [container vs. content][tacc-oocss].
- Most styles will be _only **or** mostly_ for [structure][tacc-oocss].
- Some styles may be for [skin][tacc-oocss].

[tacc-oocss]: https://tacc-main.atlassian.net/wiki/x/7Atv 'TACC: Object-Oriented CSS'
[tacc-style-guide]: https://tacc-main.atlassian.net/wiki/x/7Bdv 'TACC: CSS Style Guide'
[fractal-docs-guide]: https://fractal.build/guide/components/#what-defines-a-component 'Fractal: User Guide: Components'
