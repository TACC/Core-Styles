# How to Publish

Only appointed team members may publish releases.

Publishing to npm happens automatically via the [`npm-publish`](.github/workflows/npm-publish.yml) GitHub Actions workflow, which runs whenever a GitHub release is created. It authenticates to npm via [Trusted Publishing (OIDC)](https://docs.npmjs.com/trusted-publishers), so no npm token or local `npm login`/`npm publish` step is needed.

<sub>One-time setup: an npm org admin must register this repo + workflow as a Trusted Publisher on the `@tacc/core-styles` package settings page on npmjs.com.</sub>

### Automated Release (Bash Scripts)

1. Run the release script:\
    `./bin/release.sh`

### Manual Release Steps

<details>
<summary>Instructions</summary>

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
1. Create release and tag on GitHub.\
    <sub>This triggers the `npm-publish` GitHub Actions workflow, which publishes to npm.</sub>

</details>
