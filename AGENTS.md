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

- To regenerate `dist/` files:
    1. Update relevant source file(s) under `src/lib/_imports/...`
    2. Run the build command to regenerate the `dist/` files.

- Before creating or updating a PR, review changed files and remove unexpected diff files.

### Dependencies

- When updating dependencies, use `npm` commands (e.g. `uninstall`/`install`); do not hand-edit lockfile entries.

## Commits

- **Format:** `.gitmessage` (fallback: `~/.gitmessage`)

## Pull Requests

- **Title:** `.gitmessage` (fallback: `~/.gitmessage`)
- **Description:** `.github/PULL_REQUEST_TEMPLATE.md` (fallback: `~/.github/PULL_REQUEST_TEMPLATE.md`)
  - Be concise: plain language, simple sentences, present lists as bullets not prose.
  - When summarizing changeset, say what changed and (only if it matters) why, never how.
  - If listing a file change, then only describe change at a high level.
  - In "Changes" section, group into as few bullets as the logical changes require (never one per file) and default to zero explanation per bullet (e.g. `**added** logos`).
  - In "Overview" section, match the template's example length (1 sentence), not its stated max (1–3).
  - When updating, first re-read the current description, because it may have been edited.
  - In "Related" section, links to PRs should instead just be raw URLs (because GitHub will auto-create rich links).
  - If responding to a PR comment as the user instead of a bot, then quote and sign your entire reply.
