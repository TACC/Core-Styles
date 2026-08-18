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

## Vocab

- Use the word "deleted", not "removed".

## Commits

- **Format:** `.gitmessage` (fallback: `~/.gitmessage`)

## Pull Requests

- **Title:** `.gitmessage` (fallback: `~/.gitmessage`)
- **Description:** `.github/PULL_REQUEST_TEMPLATE.md` (fallback: `~/.github/PULL_REQUEST_TEMPLATE.md`)
  - Be concise: plain language, simple sentences, present lists as bullets not prose.
  - When summarizing changeset, say what changed and (only if omitting it would leave a reviewer confused or suspicious) why, never how.
  - If listing a file change, then only describe change at a high level.
  - In "Changes" section, group into as few bullets as the logical changes require (never one per file) and default to zero explanation per bullet (e.g. `**added** logos`). Leave the detail for the code diff itself — a bullet is not the place to restate what the diff already shows.
  - Name files/identifiers by their bare name (`x-button.css`), not their full repo path, unless the bare name is ambiguous.
  - Describe even the "what" at the highest level that's still meaningful — prefer a general noun ("shared rules") to an enumeration of the specifics behind it ("the padding/min-width/max-width block"); the diff has the specifics.
  - When several similarly-patterned names are affected the same way (e.g. a rename applied to 3 things), give one example plus `…` instead of listing all of them.
  - In "Overview" section, match the template's example length (1 sentence) and density — not just its stated max (1–3), and not a single sentence stitched together from several clauses.
  - In "Testing" section, one action per numbered step, matching the template's own example exactly — don't combine "do X, then do Y" into one step. Prefer a step that compares directly against a running reference (e.g. production) over one that re-narrates internal verification work already done elsewhere in the description.
  - When updating, first re-read the current description, because it may have been edited.
  - In "Related" section, links to PRs should instead just be raw URLs (because GitHub will auto-create rich links).
  - If responding to a PR comment as the user instead of a bot, then quote and sign your entire reply.
