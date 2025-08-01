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
    
    # Move selector files if they exist
    if [ -f "${component}.selectors.postcss" ]; then
        git mv "${component}.selectors.postcss" "${component}/${component}.selectors.postcss"
        echo "  ✅ Moved ${component}.selectors.postcss"
    fi
    
    # Move variant files (--compact, --expanded, etc.)
    for variant_file in ${component}--*.postcss; do
        if [ -f "$variant_file" ]; then
            git mv "$variant_file" "${component}/$variant_file"
            echo "  ✅ Moved $variant_file"
        fi
    done
    
    # Move skin/structure files for image-map
    if [ "$component" = "c-image-map" ]; then
        if [ -f "c-image-map.skin.postcss" ]; then
            git mv "c-image-map.skin.postcss" "c-image-map/c-image-map.skin.postcss"
            echo "  ✅ Moved c-image-map.skin.postcss"
        fi
        if [ -f "c-image-map.structure.postcss" ]; then
            git mv "c-image-map.structure.postcss" "c-image-map/c-image-map.structure.postcss"
            echo "  ✅ Moved c-image-map.structure.postcss"
        fi
    fi
}

# Function to update import paths
update_imports() {
    local component=$1
    echo "🔄 Updating import paths for $component..."
    
    cd ../../../../..  # Go back to project root
    
    # Update main component imports
    find src -name "*.postcss" -type f -exec sed -i '' "s|components/${component}\.postcss|components/${component}/${component}.postcss|g" {} \;
    
    # Update selector imports
    find src -name "*.postcss" -type f -exec sed -i '' "s|components/${component}\.selectors\.postcss|components/${component}/${component}.selectors.postcss|g" {} \;
    
    # Update variant imports (--compact, --expanded, etc.)
    find src -name "*.postcss" -type f -exec sed -i '' "s|components/${component}--\([^/]*\)\.postcss|components/${component}/${component}--\1.postcss|g" {} \;
    
    # Special handling for image-map skin/structure files
    if [ "$component" = "c-image-map" ]; then
        find src -name "*.postcss" -type f -exec sed -i '' "s|components/c-image-map\.skin\.postcss|components/c-image-map/c-image-map.skin.postcss|g" {} \;
        find src -name "*.postcss" -type f -exec sed -i '' "s|components/c-image-map\.structure\.postcss|components/c-image-map/c-image-map.structure.postcss|g" {} \;
    fi
    
    cd src/lib/_imports/tacc/components  # Go back to components directory
    
    echo "  ✅ Updated import paths for $component"
}

# Function to update config.yml if it exists
update_config() {
    local component=$1
    if [ -f "${component}/config.yml" ]; then
        echo "📝 Updating config.yml for $component..."
        
        # Check if subdir already exists
        if ! grep -q "subdir:" "${component}/config.yml"; then
            # Add subdir property after context:
            sed -i '' '/^context:/a\
  subdir: "tacc/components/'$component'"' "${component}/config.yml"
            echo "  ✅ Added subdir to config.yml"
        else
            echo "  ℹ️  subdir already exists in config.yml"
        fi
    fi
}

# Main refactoring loop
for component in "${COMPONENTS[@]}"; do
    echo ""
    echo "🔧 Processing $component..."
    
    # Skip if already refactored (directory exists and main file is inside)
    if [ -d "$component" ] && [ -f "${component}/${component}.postcss" ]; then
        echo "  ⏭️  $component already refactored, skipping..."
        continue
    fi
    
    refactor_component "$component"
    update_imports "$component"
    update_config "$component"
    
    echo "  ✅ $component refactoring complete!"
done

echo ""
echo "🎉 All components refactored successfully!"
echo ""
echo "📊 Summary:"
git status --porcelain | grep -E "(renamed|modified)" | wc -l | xargs echo "  Files changed:"
echo ""
echo "🔍 Review changes with: git status"
echo "💾 Commit changes with: git commit -m 'refactor(components): move remaining components to subdirectories'"
