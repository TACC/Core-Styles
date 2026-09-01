# How to Publish

Only appointed team members may publish releases.

Releases are automated via [release-please](https://github.com/googleapis/release-please): every push to `main` opens or updates a standing "release PR" with the next version and changelog, computed from [conventional commits](.gitmessage). A [`build-dist-for-release`](.github/workflows/build-dist-for-release.yml) workflow keeps that PR's `dist/` in sync automatically.

1. Review and merge the open release-please PR (titled `chore(main): release vN.N.N`) when you're ready to publish.
1. Merging creates the GitHub release and tag, which triggers [`npm-publish`](.github/workflows/npm-publish.yml) to publish to npm via OIDC.

<sub>One-time setup: a `RELEASE_PLEASE_TOKEN` repo secret (a PAT with `contents: write` + `pull-requests: write` on this repo) must exist — release-please's default `GITHUB_TOKEN` can't trigger the follow-on workflows above.</sub>

### Manual Release (legacy fallback)

<details>
<summary>Instructions</summary>

Use only if release-please is broken. Prefer fixing release-please over relying on this long-term.

#### Automated Release Script

1. Run the release script:\
    `./bin/release.sh`

#### Manual Release Steps

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
