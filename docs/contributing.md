# Contributing

## Linting and Formatting

Not standardized. Read [(internal) Formatting & Linting](https://confluence.tacc.utexas.edu/x/HoBGCw).

## Best Practices

- [Sign your commits.](https://help.github.com/en/github/authenticating-to-github/managing-commit-signature-verification)
- [Learn Markdown.](https://bitbucket.org/tutorials/markdowndemo)

## Development Workflow

We use a modifed version of [GitFlow](https://datasift.github.io/gitflow/IntroducingGitFlow.html).

- "feature branches" have a specific prefix:
  - `feat/` for features and updates
  - `fix/` for bugfixes and hotfixes
  - `refactor/` for large internal changes
  - `style/` for code style changes (white-space, formatting, etc.)
  - `chore/` for no-op changes
  - `docs/` for documentation
  - `perf/` for performance improvements
  - `test/` for test case updates
  - or other "types" from [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/#summary)
- "develop" branch is usually `main`,\
    <sup>but can exist as a long-lived multi-feature branch prefixed with `dev/`</sup>
- "release branches" (as needed) are prefixed with `release/`
- "hotfix branches" are prefixed `fix/`
- "master branch" is always `main`

## Release Workflow

Only appointed team members may release versions.

### Automated Release (Bash Scripts)

1. (one time) Login to npm via:\
    `npm login`
2. Run the release preparation script:\
    `./bin/release-prepare.sh`
3. Create and merge the PR.
4. Run the release publish script:\
    `./bin/release-publish.sh vN.N.N`\
    (where `N.N.N` is the version tag)

### Manual Release Steps

<details>
<summary>Instructions</summary>

1. (one time) Login to npm via:\
    `npm login`
1. Create new branch for version bump.
1. Verify build is up-to-date:\
    `npm run build:css`\
    <sub>Commit substantial unexpected changes via independent PR.</sub>
1. Update version via:\
    `npm version vN.N.N`\
    (where `N.N.N` is the version tag)
1. Build with new version:\
    `npm run build:css`
1. Commit, push, PR, review, merge.
1. Publish to NPM via:\
    `npm publish --access public`\
    <sub>Project build will automatically occur before publish.</sub>
1. Create release and tag on GitHub.
1. Fetch the latest tags.\
    `git fetch --tags`
1. Check whether tag is annotated.\
    `git describe --always`\
    (expect `vN.N.N` i.e. the version tag)
1. **If** tag is **not** annotated, **then**:
    1. Annotate Github's tag:\
        `bin/annotate-tag.sh vN.N.N`\
        (where `N.N.N` is the version tag)
    1. Overwrite remote tag with annotated one:\
        `git push --tags --force`

</details>
