# TACC Core Styles

The shared styles for TACC WMA Workspace Portals & Websites


## Known Clients

- [Core CMS], the base CMS code for TACC WMA CMS Websites
- [Core Portal], the base Portal code for TACC WMA CMS Websites
- [TUP UI], the client code for TACC User Portal
- [TACC Docs], the documentation for TACC


## Table of Contents

- [External Project Usage](#external-project-usage)
   - [Load from a Project](#load-from-a-project)
   - [Install into a Project](#install-into-a-project)
- [Local Development Setup](#local-development-setup)
- [Testing](#testing)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [Bootstrap](#bootstrap)


## External Project Usage

### Load from a Project

__See [`HOWTO.md`](HOWTO.md).__

### Install into a Project

#### Install This Package

1. Installwith any package manager e.g.:

    - `npm install @tacc/core-styles`
    - `yarn add @tacc/core-styles`

2. Import stylesheets of either type:
   - pre-compiled, from `/dist`
   - source files, from `/src/lib/_imports`

#### Build from Source

##### Via Your Environment's [PostCSS](https://github.com/postcss/postcss#readme)

Please review [the plugins expected](./src/.postcssrc.base.yml).

##### Via Core-Styles API

###### JavaScript

<details><summary><code>require('core-styles').buildStylesheets</code></summary>

```js
const buildStylesheets = require('core-styles').buildStylesheets;

buildStylesheets(
  // Parse CSS files from which directory (required)
  `path/to/your/css/src`,
  // Output CSS files to which directory (required)
  `path/to/put/css/output`,
  {
    // List of YAML config files (optional)
    // (The first file is merged on top of the base config.)
    // (Each successive file overwrites the file before it.)
    // SEE: https://github.com/postcss/postcss-load-config#postcssrc
    customConfigs: [
      // The "base" config is `/.postcssrc.base.yml`
      `path/to/custom/config/that/extends/base/.postcssrc.yml`,
      `path/to/custom/config/that/extends/above/.postcssrc.yml`,
    ],
    // Print more info from build log (optional, default: false)
    verbose: true,
    // Print version of this software (optional, default: false)
    version: true,
    // Any value to help identify the build (optional, default: app version)
    buildId: process.env.npm_package_version + someUniqueId,
  }
);
```

</details>

###### CLI

<details><summary><code>core-styles</code></summary>

```bash
Usage: core-styles [options] [command]

Options:
  -V, --version      output the version number
  -h, --help         display help for command

Commands:
  build [options]    build stylesheets with TACC standard process:
  - "post-css" plugins
  - custom input path
  - custom output path
  - custom configs
  - prepend build id

  help [command]     display help for command
```

</details>

<details><summary><code>core-styles build</code></summary>

```bash
Usage: core-styles build [options]

build stylesheets with TACC standard process:
- "post-css" plugins
- custom input path
- custom output path
- custom configs
- prepend build id

Options:
  -i, --input <path>               parse source at which path¹
  -o, --output <path>              output CSS files to which path¹
  -v, --verbose                    print more info during build process
  -c, --custom-configs <paths...>  extend base config with YAML files²³
  -b, --build-id <identifier>      any value to identify the build (default: version of app)
  -m, --base-mirror-dir <path>     if input folder structure is mirrored, this path is not⁴
  -h, --help                       display help for command

Notes:
  ¹ Folder structure of "--input-dir" mirrored in "--output-dir" i.e.

    given input
    - "input_dir/x.css"
    - "input_dir/sub_dir_a/y.css"
    - "input_dir"
    - "input_dir/**/*"

    expect output
    - "output_dir/x.css"
    - "output_dir/sub_dir_a/y.css"
    - "output_dir/..." (all files from input not in sub-directories)
    - "output_dir/.../..." (all files from input as nested)

  ² The file formats are like ".postcssrc.yml" from
    https://github.com/postcss/postcss-load-config#postcssrc

  ³ The first file is merged on top of the base config.
    Each successive file overwrites the file before it.

  ⁴ Given '-i "a/b*" -o "x/" -m "a/"' output is "x/b/...".
    Given '-i "a/b*" -o "x/" -m "a/b/"' output is "x/...".
    Given '-i "a/b*" -o "x/" -m "not-a/"' output is "x/abs-path-to-input/...".
```

</details>


## Local Development Setup

### Prequisites for Running

* Nodejs 15.x

### Quick Start

0. _(initially)_ Install dependencies:\
    `npm ci`
1. _(optional)_ Make changes to `/src/lib` files.
    
2. Build the styles*:\
    `npm run build:css`
3. Build and preview the styles*:\
    `npm start`
4. _(to debug)_ Review output in respective `/dist` or `/demo` files.*

<sub>* Stylesheets are built **from** source files **in** `src/lib` directory **to** compiled files **in** `dist` directory.</sub>

### Preview **After** Development

1. Build stylesheets and build static demo:

   ```bash
   npm run build
   ```

2. Run the static demo:

   ```bash
   npx serve demo
   ```

   <sup>Web page will live-reload on demo build, but **not** on change of source files.</sup>

4. Open the web interface.
   The build command will output the URL (and may even open it for you).

### Preview **During** Development

Run each of these commands in its own terminal.

1. Build stylesheets and re-build on change:

   ```bash
   npm run watch
   ```

2. Run the auto-refresh demo:

   ```bash
   npm run start
   ```

<sup>Web page will live-reload **twice** on change of source files. The **second** reload will show changes.</sup>

#### Build Options

##### Regular CSS Build

```bash
npm run build:css
```

##### Custom Build ID

```bash
npm run build:css -- --build-id="..."
```


## Testing

All testing is done manually.


## Deployment

### Production Deployment

The Core Styles are not independently deployed.

_Currently_, the demo is served by [Core CMS] (since [v3.9.0](https://github.com/TACC/Core-CMS/compare/v3.9.0)).

_Later_, the demo may be deployed indpendently and `core-styles.….css` served from a CDN.


## Contributing

To contribute, first read [How to Contirbute][Contributing].


## Bootstrap

Core Styles is an effort to replace Bootstrap. Core Styles is compatible with Bootstrap. [Learn more.][Bootstrap]

<!-- Link Aliases -->

[core portal deployments]: https://github.com/TACC/Core-Portal-Deployments
[camino]: https://github.com/TACC/Camino
[core cms]: https://github.com/TACC/Core-CMS
[core portal]: https://github.com/TACC/Core-Portal
[tup ui]: https://github.com/TACC/tup-ui
[tacc docs]: https://github.com/TACC/TACC-Docs

[Contributing]: ./docs/contributing.md
[Bootstrap]: ./docs/bootstrap.md
