# How to Publish

Only appointed team members may publish releases.

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

</details>
