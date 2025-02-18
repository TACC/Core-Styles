#!/bin/bash
set -e  # Exit on any error

# Source shared functions
source "$(dirname "$0")/release-functions.sh"

if [ -z "$1" ]; then
    echo "Usage: $0 <version-tag>"
    echo "Example: $0 v1.2.3"
    exit 1
fi

version_tag=$1

# Check npm login status
if ! npm whoami >/dev/null 2>&1; then
    echo "Error: You are not logged in to npm."
    echo -e "Please login first with:\n    npm login"
    echo -e "\nNote: When running npm login, you'll be prompted to visit a URL in your browser."
    echo "Make sure you're already logged into npmjs.com in your browser before starting."
    exit 1
fi

# Ensure we're on main branch
git checkout main
git pull origin main

# Check if version is already published
if npm view "@tacc/core-styles@${version_tag#v}" >/dev/null 2>&1; then
    echo "Version ${version_tag#v} is already published to npm."
    if confirm "Skip npm publish step?"; then
        echo "Skipping npm publish..."
    else
        echo "Aborting to avoid version conflict."
        exit 1
    fi
else
    # Publish to npm
    echo "Publishing to npm..."
    npm publish --access public
fi

# Create GitHub release
echo "Please create a release on GitHub now."
echo "Visit: https://github.com/TACC/Core-Styles/releases/new"
read -p "Press Enter once you've created the release..."

# Fetch and check tags
echo "Fetching tags..."
git fetch --tags

echo "Checking if tag is annotated..."
if git describe --exact-match "$version_tag" >/dev/null 2>&1; then
    echo "Tag $version_tag is already annotated"
else
    echo "Tag $version_tag is not annotated, annotating..."
    ./bin/annotate-tag.sh "$version_tag"

    echo "Force pushing annotated tag..."
    git push --tags --force
fi

echo "Release process complete!" 