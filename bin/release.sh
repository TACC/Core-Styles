#!/bin/bash
set -e  # Exit on any error

# Source shared functions
source "$(dirname "$0")/release-functions.sh"

# Check required commands
if ! command_exists npm; then
    echo "Error: npm is required but not installed"
    exit 1
fi
if ! command_exists git; then
    echo "Error: git is required but not installed"
    exit 1
fi

# Ensure working directory is clean
if [ -n "$(git status --porcelain)" ]; then
    echo "Error: Working directory has unexpected changes. Please commit or stash changes."
    exit 1
fi

# Get current version and prompt for new version
current_version=$(npm pkg get version | tr -d '"')
read -r -p "Enter version number (current: $current_version, format: N.N.N): " version
version="${version#v}"
version_tag="v$version"
version_number="$version"

# Name the branch
branch_name="release/$version_tag"

# Check if branch exists and handle accordingly
if git rev-parse --verify "$branch_name" >/dev/null 2>&1 || \
   git rev-parse --verify "origin/$branch_name" >/dev/null 2>&1; then
    echo "Branch '$branch_name' already exists."
    if confirm "Would you like to use the existing branch?"; then
        git checkout "$branch_name"
        git pull origin "$branch_name" 2>/dev/null || true
    else
        echo "Release cancelled."
        exit 0
    fi
else
    git checkout -b "$branch_name"
fi

# Confirm with user
echo "This script will:"
echo "1. Build CSS"
echo "2. Update version"
echo "3. Create release commit"
echo "4. Open a PR and auto-merge it"
echo "5. Create a GitHub release (which triggers npm publish via GitHub Actions)"
if ! confirm "Do you want to proceed?"; then
    echo "Release cancelled."
    exit 0
fi

# Build CSS
echo "Building CSS..."
npm run build:css

# Check for substantial changes
if [ -n "$(git status --porcelain | grep -v '^.. dist/')" ]; then
    echo "Warning: Unexpected changes detected in build:"
    git status --porcelain | grep -v '^.. dist/'
    echo "Please review changes and create an independent PR if necessary."
    if ! confirm "Continue anyway?"; then
        exit 1
    fi
fi

# Update version
echo "Updating version..."
npm version "$version_tag" --no-git-tag-version

# Build again with new version
echo "Building with new version..."
npm run build:css

# Commit and push
git add .
git commit -m "ci: $version_tag"
git push origin "$branch_name"

# Open PR, auto-merge, wait
if command_exists gh; then
    echo "Creating PR..."
    gh pr create \
        --title "ci: $version_tag" \
        --body "## Overview

Prepare for $version_tag release." \
        --base main \
        --head "$branch_name"
    echo "Enabling auto-merge..."
    gh pr merge "$branch_name" --auto --squash
    echo "Waiting for PR to merge..."
    while [ "$(gh pr view "$branch_name" --json state --jq '.state')" != "MERGED" ]; do
        sleep 5
    done
    echo "PR merged."
else
    echo "gh CLI not found. Please create and merge PR for $branch_name manually."
    read -rp "Press Enter once the PR is merged..."
fi

# Switch to main
git checkout main
git pull origin main

# Create GitHub release
if command_exists gh; then
    echo "Creating GitHub release..."
    release_args=(--generate-notes)
    if [[ "$version_number" =~ -rc[0-9]+$ ]]; then
        release_args+=(--prerelease)
    fi
    if ! gh release create "$version_tag" "${release_args[@]}"; then
        echo "gh failed. Please create a release manually:"
        echo "Visit: https://github.com/TACC/Core-Styles/releases/new?tag=${version_tag}"
        read -rp "Press Enter once you've created the release..."
    fi
else
    echo "gh CLI not found. Please create a release manually:"
    echo "Visit: https://github.com/TACC/Core-Styles/releases/new?tag=${version_tag}"
    read -rp "Press Enter once you've created the release..."
fi

echo "Release complete! npm publish will run via GitHub Actions now that the release was created."
