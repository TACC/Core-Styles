# Core-Styles v3 — Work Plan

## Branch / PR Map

```
main ◄── epic/v3                          PR #454  (last to merge)
              ▲
              ├── epic/v3--reorg           PR #455  (merge second)
              └── epic/v3--gh-345-…figma  PR #456  (merge third)
```

| PR | Title | Branch → Base | Link |
|----|-------|---------------|------|
| #454 | refactor: v3 | `epic/v3` → `main` | https://github.com/TACC/Core-Styles/pull/454 |
| #455 | refactor(v3): reorganize styles per client library | `epic/v3--reorg` → `epic/v3` | https://github.com/TACC/Core-Styles/pull/455 |
| #456 | feat(v3): use re-brand colors from figma | `epic/v3--gh-345-tokens-from-figma` → `epic/v3` | https://github.com/TACC/Core-Styles/pull/456 |

---

## Execution Order

```
Step 1 → Complete PR #455  (finish TACC sub-lib reorg + QoL + UX grouping)
           → merge epic/v3--reorg into epic/v3

Step 2 → Complete PR #456  (un-pause tokens, verify build integration)
           → merge epic/v3--gh-345-tokens-from-figma into epic/v3

Step 3 → Complete PR #454  (finalize description, verify full build)
           → merge epic/v3 into main
```

Steps 1 and 2 touch different files and can run in parallel if desired.
Step 3 must come last.

---

## PR #455 — Reorganize Styles per Client Library

**Branch:** `epic/v3--reorg`  **Base:** `epic/v3`

### What it does

Moves every pattern into a per-library subdirectory that mirrors the client
library's own organization. Each pattern gets its own named folder containing
its source, template, config, and demo styles — co-located.

**Reference: a finished item** (`tacc/components/c-button/`):

```
tacc/components/c-button/
  c-button.postcss         ← source (moved inside the subdir, not flat)
  c-button--cms.postcss    ← variant source (also inside subdir)
  c-button.hbs             ← Fractal template
  c-button.selectors.postcss
  config.yml               ← includes context.subdir (see below)
  demo.css                 ← demo-context styles
```

`config.yml` for a finished item includes:
```yaml
context:
  subdir: "tacc/components/c-button"
```

The `subdir` value is the path from `src/lib/_imports/` to the pattern folder.

### Done ✅

| Category | Status |
|----------|--------|
| Bootstrap 3 | ✅ fully reorganized |
| Bootstrap 4 | ✅ fully reorganized |
| Bootstrap 5 | ✅ fully reorganized |
| Django CMS variants (`djangocms-*`) | ✅ moved to own dirs |
| Docs libs (`mkdocs`, `pymdownx`, `python-markdown`, `readthedocs`, `tacc-docs`) | ✅ moved |
| TACC / `components/` | ✅ fully reorganized |

### Remaining ❌

#### 1. TACC sub-libraries — per-item reorganization

Six sub-libraries still need each of their patterns to be reorganized.
Apply the same 3-step pattern used for `tacc/components/` to each item in:

| Sub-library | Path |
|-------------|------|
| elements | `src/lib/_imports/tacc/elements/` |
| generics | `src/lib/_imports/tacc/generics/` |
| objects | `src/lib/_imports/tacc/objects/` |
| settings | `src/lib/_imports/tacc/settings/` |
| tools | `src/lib/_imports/tacc/tools/` |
| trumps | `src/lib/_imports/tacc/trumps/` |

**The 3-step pattern per item** (where `{lib}` = e.g. `elements`, `{item}` = e.g. `links`):

**Step A — Move source into subdir**
```
tacc/{lib}/{item}.postcss         → tacc/{lib}/{item}/{item}.postcss
tacc/{lib}/{item}--variant.postcss → tacc/{lib}/{item}/{item}--variant.postcss
tacc/{lib}/{item}.selectors.postcss → tacc/{lib}/{item}/{item}.selectors.postcss
```
(All `.postcss` files that belong to this item move together.)

**Step B — Add `context.subdir` to the item's `config.yml`**
```yaml
context:
  subdir: "tacc/{lib}/{item}"
```
If the item does not yet have a `config.yml`, create one with at minimum:
```yaml
context:
  subdir: "tacc/{lib}/{item}"
```

**Step C — Remove the `(CMS|…)` prefix from the Fractal label**

In `config.yml` or variant `label:` fields:
```yaml
# Before:
label: (CMS) Links
# After:
label: Links
```

> **Note:** Some patterns have multiple `.postcss` files (e.g. `root.postcss`,
> `root--cms.postcss`, `root--portal.postcss`). All variants belong inside the
> same subdir alongside the main file. The subdir name should be the
> "base name" without the variant suffix (e.g. `root/`).

> **Note:** Some items (e.g. `_elements.config.yml`, `demo.postcss`,
> `README.css`, `selectors.*.postcss`) are infrastructure files, not patterns.
> Do not create subdirs for them.

#### 2. Quality-of-life — absolute imports

- **Support absolute imports:** Update the PostCSS config / build tooling so
  `@import` paths can be written relative to `src/lib/_imports/` (or repo root)
  rather than relative to the current file.
- **Use absolute imports:** Once supported, rewrite all relative `@import`
  paths across all `.postcss` source files to use absolute paths.

  This makes future reorganization much safer (no broken relative paths).

#### 3. UX — Fractal sidebar grouping

Group related libraries in the Fractal demo sidebar:

| Current labels | Target group label |
|----------------|-------------------|
| Bootstrap 3, Bootstrap 4, Bootstrap 5 | **Bootstrap** |
| Django CMS Blog, Django CMS Forms, Django CMS Picture | **Django CMS** |
| MkDocs, PyMdown, Python-Markdown, ReadTheDocs, TACC Docs | **Styles for Docs** |

This is configured in `fractality.config.js` and/or the relevant `config.yml`
files.

### Testing

1. `npm start` — launch the Fractal dev server
2. Open every pattern in the sidebar — confirm all render correctly
3. Verify sidebar organization mirrors the client library's own docs:
   - [Bootstrap 3](https://getbootstrap.com/docs/3.4/)
   - [Bootstrap 4](https://getbootstrap.com/docs/4.6/)
   - [Bootstrap 5](https://getbootstrap.com/docs/5.3/)
   - [TACC v2 reference](https://github.com/TACC/Core-Styles/tree/v2.39.0/src/lib/_imports)
4. No regressions — styles should look identical to before the reorg

---

## PR #456 — Use Re-brand Colors from Figma

**Branch:** `epic/v3--gh-345-tokens-from-figma`  **Base:** `epic/v3`  
**Label:** paused  **Completes:** [issue #457](https://github.com/TACC/Core-Styles/issues/457)

### What it does

Adds CSS custom-property design tokens from TACC's Figma re-brand. All token
files live under `src/v3/variables/`.

**New files:**
```
src/v3/variables/tokens/
  primitives-designsafe.css    ← concrete color values for DesignSafe
  primitives-tacc-cms.css      ← concrete color values for TACC CMS
  primitives-tacc-portal.css   ← concrete color values for TACC Portal
  tokens-dark.css              ← semantic aliases (dark theme)
  tokens-light.css             ← semantic aliases (light theme)
src/v3/variables/
  designsafe.dark.css / designsafe.light.css
  tacc-cms.dark.css / tacc-cms.light.css
  tacc-portal.dark.css / tacc-portal.light.css
```

**Token structure (two layers):**
- **Primitives** — concrete values per product  
  e.g. `--color-traffic-red-normal: #e03535`
- **Semantics** — intent-to-primitive aliases  
  e.g. `--color-danger-normal: var(--color-traffic-red-normal)`

### Remaining ❌

1. **Confirm token values** — verify the manually-entered Figma values are
   current against the latest Figma re-brand spec.
2. **Verify build integration** — confirm the token files are imported by the
   main build entry points in `epic/v3` (they currently live under `src/v3/`,
   which may or may not be included in the main build yet).
3. **Fill in the Testing section** of the PR description (currently `1. …`).
4. **Remove the `paused` label** and mark as ready for review.

### Testing

- Build the full stylesheet (`npm run build`) and confirm no errors.
- Open a pattern in Fractal that uses a semantic color variable (e.g. a danger
  state) and confirm the re-brand color is applied.

---

## PR #454 — Refactor: v3 (Epic / Umbrella)

**Branch:** `epic/v3`  **Base:** `main`

### What it does

This is the base branch all other v3 work merges into. Key changes already in place:

| Change | Detail |
|--------|--------|
| `.css` → `.postcss` | All source files renamed; built `.css` output is never confused with source |
| No committed `/dist` | Build output is generated-only; never committed |
| `bin/build-each.js` | Builds individual stylesheets in place |
| `bin/only-commit-source.js` | Lint guard: errors if compiled `.css` is found inside `src/` |
| CI lint workflow | Enforces the above on every push |
| `3.0.0-alpha.0` | Version bump |

**Backwards-compatibility:**
- Styles: ✅ backwards-compatible
- Directory structure of `/dist`: ❌ breaking change
- Source file extensions (`.postcss`): ❌ breaking change

### Remaining ❌

1. **Wait for #455 and #456** to be merged into `epic/v3`.
2. **Sync** `epic/v3` with `main` one final time before merging.
3. **Fill in** the PR description's `Changes`, `Testing`, and `UI` sections.
4. **Verify full build** passes: `npm run build && npm run lint`.
5. **Remove draft status** and request review.

### Testing

```sh
npm run lint       # must pass (no compiled .css in src/)
npm run build      # must complete without errors
npm start          # demo server must start and show all patterns
```

---

## Notes

### The `.css` vs `.postcss` distinction

On `epic/v3` and all its child branches, the rule is:

- **Source** files use `.postcss`
- **Built output** files use `.css`
- The `only-commit-source.js` guard allows `.css` files that are **3+ levels**
  deep inside `_imports/` (e.g. `bootstrap5/utilities/link.css`) — these are
  treated as built-in-place outputs
- A `.css` file at a shallower depth (e.g. `tools/x-pill.css`) will trip the
  guard and must be renamed to `.postcss`

New features merged from `main` into `epic/v3` may bring in `.css` source
files that still need renaming. Check with `npm run lint` after any merge.

### Ghost directories on `epic/v3--reorg`

`src/lib/_imports/objects/o-offset-content/` has a `config.yml`, `.hbs`, and
`readme.md` (added by a recent main merge) but no `.postcss` source. The
source lives at `tacc/objects/o-offset-content.postcss`. This directory is a
leftover from the pre-reorg state and should be cleaned up as part of the
objects reorganization in PR #455.
