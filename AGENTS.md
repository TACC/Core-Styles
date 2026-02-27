# AGENTS.md

## Cursor Cloud specific instructions

This is a pure CSS design system / UI pattern library (`@tacc/core-styles`). No backend, databases, or Docker required.

### Key commands

See `package.json` `scripts` and `README.md` for full details. Quick reference:

| Task | Command |
|---|---|
| Install deps | `npm ci` |
| Build CSS | `npm run build:css` |
| Run tests | `npm test` |
| Dev server (Fractal) | `npm start` |
| Watch + rebuild on change | `npm run watch` |
| Full build (CSS + demo) | `npm run build` |

### Notes

- **No linter configured.** `CONTRIBUTING.md` notes "Not standardized" for linting/formatting.
- **Tests** are CSS build output comparison tests (`bin/test.js`). The "Input Error" message during `npm test` about "valid list of files to parse" is expected and does not indicate failure; check the exit code.
- **Fractal dev server** (`npm start`) runs on port 3000 with BrowserSync on port 3002. It serves a live-reload pattern library for previewing CSS components.
- **Peer dependencies** are listed as `peerDependencies` in `package.json` and are auto-installed by npm 7+. They include PostCSS and its plugins used for building CSS.
