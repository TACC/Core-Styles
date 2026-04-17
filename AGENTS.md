# AGENTS.md

- [Architecture](#architecture)

## Architecture

This is a **Node/PostCSS** styles project. Build outputs are generated artifacts.

### Build

- If local `npm` is unavailable, use containerized Node:
  ```sh
  docker run --rm -v "$(pwd):/code" -w /code node:20 sh -lc "npm ci && npm run build:css"
  ```

- Use `npm start` only for demo preview;
  it is not a replacement for a full CSS build.

- To change `dist/` files:
    1. Update relevant source file(s) under `src/lib/_imports/...`
    2. Run the build command to regenerate the `dist/` files.
