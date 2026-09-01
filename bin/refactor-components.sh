#!/bin/bash

# TACC Components Refactoring Script
# Refactors remaining flat components to subdirectory structure
# Based on pattern from commit be1f77e

set -e  # Exit on any error

echo "🚀 Starting TACC Components Refactoring..."

# Change to components directory
cd "src/lib/_imports/tacc/components"

# Define components to refactor (excluding already refactored ones)
declare -a COMPONENTS=(
    "c-callout"
    "c-content-block"
    "c-hero-banner" 
    "c-image-map"
    "c-island"
    "c-message"
    "c-nav"
    "c-page"
    "c-pill"
    "c-recognition"
    "c-see-all-link"
    "c-show-more"
    "c-tag"
    "c-update"
    "cortal-icon"
)

# Function to refactor a single component
refactor_component() {
    local component=$1
    echo "📁 Refactoring $component..."

    # Create subdirectory if it doesn't exist
    mkdir -p "$component"

    # Move main postcss file
    if [ -f "${component}.postcss" ]; then
        git mv "${component}.postcss" "${component}/${component}.postcss"
        echo "  ✅ Moved ${component}.postcss"
    fi

    # Move variant files of pattern ${component}.*.postcss
    for variant_file in ${component}.*.postcss; do
        if [ -f "$variant_file" ] && [ "$variant_file" != "${component}.postcss" ]; then
            git mv "$variant_file" "${component}/$variant_file"
            echo "  ✅ Moved $variant_file"
        fi
    done

    # Move variant files of -- pattern (--compact, --expanded, etc.)
    for variant_file in ${component}--*.postcss; do
        if [ -f "$variant_file" ]; then
            git mv "$variant_file" "${component}/$variant_file"
            echo "  ✅ Moved $variant_file"
        fi
    done
}

# Function to update import paths
update_imports() {
    local component=$1
    echo "🔄 Updating import paths for $component..."

    cd ../../../../..  # Go back to project root

    # Update main component imports
    find src -name "*.postcss" -type f -exec sed -i '' "s|components/${component}\.postcss|components/${component}/${component}.postcss|g" {} \;

    # Update all variant imports with pattern ${component}.*.postcss
    find src -name "*.postcss" -type f -exec sed -i '' "s|components/${component}\.[^/]*\.postcss|components/${component}/&|g" {} \;

    # Update variant imports with -- pattern (--compact, --expanded, etc.)
    find src -name "*.postcss" -type f -exec sed -i '' "s|components/${component}--\([^/]*\)\.postcss|components/${component}/${component}--\1.postcss|g" {} \;

    cd src/lib/_imports/tacc/components  # Go back to components directory

    echo "  ✅ Updated import paths for $component"
}

# Function to update or create config.yml
update_config() {
    local component=$1

    if [ -f "${component}/config.yml" ]; then
        echo "📝 Updating config.yml for $component..."

        # Check if context: already exists
        if grep -q "^context:" "${component}/config.yml"; then
            # Check if subdir already exists under context
            if ! grep -q "subdir:" "${component}/config.yml"; then
                # Add subdir property after context:
                sed -i '' '/^context:/a\
  subdir: "tacc/components/'$component'"\n' "${component}/config.yml"
                echo "  ✅ Added subdir to existing context in config.yml"
            else
                echo "  ℹ️  subdir already exists in config.yml"
            fi
        else
            # Add context: section with subdir at the end of the file
            echo "context:" >> "${component}/config.yml"
            echo "  subdir: \"tacc/components/$component\"" >> "${component}/config.yml"
            echo "  ✅ Added context section with subdir to config.yml"
        fi
    else
        echo "📝 Creating config.yml for $component..."
        # Create new config.yml with context and subdir
        cat > "${component}/config.yml" << EOF
context:
  subdir: "tacc/components/$component"
EOF
        echo "  ✅ Created config.yml with context and subdir"
    fi
}

# Main refactoring loop
for component in "${COMPONENTS[@]}"; do
    echo ""
    echo "🔧 Processing $component..."

    # Check if already refactored (directory exists and main file is inside)
    if [ -d "$component" ] && [ -f "${component}/${component}.postcss" ]; then
        echo "  ℹ️  $component files already moved, checking config.yml..."
        # Still run config update in case context/subdir is missing
        update_config "$component"
        echo "  ✅ $component config check complete!"
    else
        # Full refactoring needed
        refactor_component "$component"
        update_imports "$component"
        update_config "$component"
        echo "  ✅ $component refactoring complete!"
    fi
done

echo ""
echo "🎉 All components refactored successfully!"
echo ""
echo "📊 Summary:"
git status --porcelain | grep -E "(renamed|modified)" | wc -l | xargs echo "  Files changed:"
echo ""
echo "🔍 Review changes with: git status"
echo "💾 Commit changes with: git commit -m 'refactor(components): move remaining components to subdirectories'"
