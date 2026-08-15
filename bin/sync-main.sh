#!/bin/bash
set -e  # Exit on any error

# Sync `main` into the current branch.
#
# For a branch that (unlike main) does not commit `dist/`, merging main
# always throws up a "modify/delete" conflict for every dist/ file main
# touched — main modified it, this branch has no such path to modify.
# There's nothing to decide there: this branch's policy is to not track
# dist/, so the resolution is always to keep it deleted. This script
# automates exactly that, and only that — any other conflict (a real
# content conflict in a source file) is left for a human.
#
# NOT handled: if main adds a brand-new source file and this branch uses
# a different extension convention (e.g. epic/v3's `.postcss` vs main's
# `.css`), the merge adds it clean (no conflict), so it isn't caught
# here — check `git status` after running for any file that needs a
# manual rename.

branch_name="$(git rev-parse --abbrev-ref HEAD)"

# Refuse to run on a branch that actually commits dist/ — the
# auto-resolution below would incorrectly delete/untrack it there.
if ! git check-ignore -q dist; then
    echo "Error: dist/ is not gitignored on '$branch_name'."
    echo "This script is only for branches (like epic/v3) that don't commit dist/."
    exit 1
fi

if [ -n "$(git status --porcelain)" ]; then
    echo "Error: Working directory has unexpected changes. Please commit or stash changes."
    exit 1
fi

echo "Fetching origin/main..."
git fetch origin main

echo "Merging origin/main into $branch_name..."
if ! git merge origin/main --no-edit; then
    conflicts="$(git diff --name-only --diff-filter=U)"

    # Anything under dist/ that's "deleted by us, modified by them" is the
    # expected, mechanical conflict; anything else needs a human.
    other_conflicts="$(comm -23 <(echo "$conflicts" | sort) <(git status --porcelain | awk '$1 == "DU" && $2 ~ /^dist\// {print $2}' | sort))"

    if [ -n "$other_conflicts" ]; then
        echo "Error: conflict(s) outside dist/ need manual resolution:"
        echo "$other_conflicts" | sed 's/^/  /'
        exit 1
    fi

    dist_conflicts="$(git status --porcelain | awk '$1 == "DU" && $2 ~ /^dist\// {print $2}')"
    if [ -n "$dist_conflicts" ]; then
        echo "Auto-resolving dist/ modify/delete conflict(s) (keeping deleted, per this branch's dist/ policy):"
        echo "$dist_conflicts" | sed 's/^/  /'
        echo "$dist_conflicts" | xargs git rm -q --
    fi

    remaining="$(git diff --name-only --diff-filter=U)"
    if [ -n "$remaining" ]; then
        echo "Error: unexpected remaining conflict(s) after auto-resolution:"
        echo "$remaining" | sed 's/^/  /'
        exit 1
    fi

    git commit --no-edit
fi

echo "Rebuilding dist/ from merged source..."
npm run build:css

# The merge may have re-added some dist/ paths as tracked (main commits
# dist/, this branch doesn't); untrack anything that slipped through.
tracked_dist="$(git ls-files dist/)"
if [ -n "$tracked_dist" ]; then
    echo "Untracking dist/ file(s) the merge re-added as tracked:"
    echo "$tracked_dist" | sed 's/^/  /'
    echo "$tracked_dist" | xargs git rm -r --cached -f -q --
fi

git add -A
if [ -n "$(git status --porcelain)" ]; then
    git commit -m "chore: sync main into $branch_name"
    echo "Done — sync committed."
else
    echo "Done — already in sync, nothing to commit."
fi
