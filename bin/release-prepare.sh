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

# Ensure working directory is clean except for CHANGELOG
if [ -n "$(git status --porcelain | grep -v 'CHANGELOG.md')" ]; then
    echo "Error: Working directory has unexpected changes. Please commit or stash changes."
    exit 1
fi

# Get current version and prompt for new version
current_version=$(npm pkg get version | tr -d '"')
read -r -p "Enter version number (current: $current_version, format: N.N.N): " version
version_tag="v$version"

# Name the branch
branch_name="release/$version_tag"

# Check if branch exists and handle accordingly
if git rev-parse --verify "$branch_name" >/dev/null 2>&1 || \
   git rev-parse --verify "origin/$branch_name" >/dev/null 2>&1; then
    echo "Branch '$branch_name' already exists."
    if confirm "Would you like to use the existing branch?"; then
        git checkout "$branch_name"
        git pull origin "$branch_name" 2>/dev/null || true  # Pull if remote exists, ignore if it doesn't
    else
        echo "Release preparation cancelled."
        exit 0
    fi
else
    # Create new branch
    git checkout -b "$branch_name"
fi

# Confirm with user
echo "This script will:"
echo "1. Build CSS"
echo "2. Update version"
echo "3. Create release commit"
echo "4. Push branch to remote"
echo "5. Describe next steps"
if ! confirm "Do you want to proceed?"; then
    echo "Release preparation cancelled."
    exit 0
fi

# Build CSS
echo "Building CSS..."
npm run build:css

# Check for substantial changes
if [ -n "$(git status --porcelain | grep -v 'CHANGELOG.md' | grep -v '^.. dist/')" ]; then
    echo "Warning: Unexpected changes detected in build:"
    git status --porcelain | grep -v 'CHANGELOG.md' | grep -v '^.. dist/'
    echo "Please review changes and create an independent PR if necessary."
    if ! confirm "Continue anyway?"; then
        exit 1
    fi
fi

# Prompt for CHANGELOG update
echo "Please update CHANGELOG.md now."
if ! confirm "Have you updated CHANGELOG.md?"; then
    exit 1
fi

# Update version
echo "Updating version..."
npm version "$version_tag" --no-git-tag-version

# Build again with new version
echo "Building with new version..."
npm run build:css

# Commit changes
git add .
git commit -m "chore: $version_tag"

# Push branch
git push origin "$branch_name"

echo "Branch pushed. Please create and merge PR for $branch_name"
echo -e "After PR is merged, run:\n    ./bin/release-publish.sh $version_tag"
