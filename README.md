# TACC Core Styles

The shared styles for TACC WMA Workspace Portals & Websites


## Known Clients

- [Core CMS], the base CMS code for TACC WMA CMS Websites
- [Core CMS Custom] (as of [#293](https://github.com/TACC/Core-CMS-Custom/pull/293))
- [Core Portal], the base Portal code for TACC WMA CMS Websites
- [Core Components], the UI components for [Core Portal] and [TUP UI]
- [TUP UI], the client code for TACC User Portal
- [TACC Docs], the documentation for TACC
    - and, indirectly, [DesignSafe User Guide]
- [Tapis Authenticator], the web server for Tapis v3 auth
- [Hazmapper], a TACC application for geospatial data
- [DesignSafe Portal], the DesignSafe-CI Portal code


## Table of Contents

- [External Project Usage](#external-project-usage)
   - [A. Load from a Project](#a-load-from-a-project)
   - [B. Install into a Project](#b-install-into-a-project)
- [Local Development Setup](#local-development-setup)
- [Testing](#testing)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [Publishing](#publishing)
- [Bootstrap](#bootstrap)


## External Project Usage

### A. Load from a Project

> [!NOTE]
> This is likely the easier and simpler solution. Try this first.

See [`QUICKSTART.md`](QUICKSTART.md).

### B. Install into a Project

#### Install This Package

1. Install with any package manager e.g.:

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

### Prerequisites for Running

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

To contribute, first read [How to Contribute][Contributing].


## Publishing

We manually release versions of Core-Styles. [Read more.][Publishing]


## Bootstrap

Core Styles **had been** an effort to replace Bootstrap. Core Styles is **compatible** with Bootstrap. Core Styles **skins** only some Bootstrap components. [Learn more.][Bootstrap]

<!-- Link Aliases -->

[core portal deployments]: https://github.com/TACC/Core-Portal-Deployments
[camino]: https://github.com/TACC/Camino
[core cms]: https://github.com/TACC/Core-CMS
[core cms custom]: https://github.com/TACC/Core-CMS-Custom
[core portal]: https://github.com/TACC/Core-Portal
[core components]: https://github.com/TACC/Core-Components
[tup ui]: https://github.com/TACC/tup-ui
[tacc docs]: https://github.com/TACC/TACC-Docs
[designsafe user guide]: https://github.com/DesignSafe-CI/DS-User-Guide
[designsafe portal]: https://github.com/DesignSafe-CI/portal
[tapis authenticator]: https://github.com/tapis-project/authenticator
[hazmapper]: https://github.com/TACC-Cloud/hazmapper

[Contributing]: ./CONTRIBUTING.md
[Publishing]: ./PUBLISHING.md
[Bootstrap]: ./docs/bootstrap.md
