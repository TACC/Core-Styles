# How to Publish

Only appointed team members may publish releases.

### Automated Release

1. Run the release script:\
    `./bin/release.sh`

### Manual Release

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
