# How to Publish

## Automated Release

1. Review the open release PR:
   - Title: `chore(main): release vN.N.N`
   - Branch: `release/vN.N.N`
2. Merge when you're ready to publish.

<details>
<summary>Explanation</summary>

Every push to `main` opens or updates a standing "release PR" with the next version and changelog, computed from [conventional commits](.gitmessage). Merging creates the GitHub release and tag, which triggers publish to NPM.

</details>

<details>
<summary>Release Candidate</summary>

1. Before merging a PR to `main`, add this line to its merge commit message:\
    `Release-As: N.N.N-rcN`
2. Merge the release PR it opens (proposes that `-rc` version).
3. Confirm the `npm-publish` workflow succeeds with the `rc` npm tag.

</details>

## Legacy Fallback Manual Release

> [!WARNING]
> Use only if [Automated Release] is broken. Prefer fixing [Automated Release] over this.

<details>
<summary>Instructions</summary>

[Automated Release]: #automated-release

#### _either_ Automated Release Script

1. Run the release script:\
    `./bin/release.sh`

#### _or_ Manual Release Steps

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
    <sub>This triggers the `npm-publish` GitHub Actions workflow, which publishes to NPM.</sub>

</details>
