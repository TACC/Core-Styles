#!/bin/bash

# Fix Relative Imports Script
# Fixes broken relative imports in component files that were moved to subdirectories
# The files moved one level deeper, so relative imports need an extra "../"

set -e  # Exit on any error

echo "🔧 Fixing relative imports in moved component files..."

# Change to project root, then to components directory
cd "$(dirname "$0")/.."
cd "src/lib/_imports/tacc/components"

# Find all component directories dynamically
# This covers all components, including those worked on independently of the refactor script
echo "📁 Discovering all component directories..."

# Function to fix relative imports in a component directory
fix_component_imports() {
    local component=$1
    echo "🔄 Fixing imports in $component..."

    # Fix imports that reference ../tools/ (should be ../../tools/) - both quote types
    find "$component" -name "*.postcss" -type f -exec sed -i '' 's|['\''"]../tools/|"../../tools/|g' {} \;

    # Fix component-to-component imports that reference ./c-component/ (should be ../c-component/) - both quote types
    find "$component" -name "*.postcss" -type f -exec sed -i '' 's|['\''"]\./c-|"../c-|g' {} \;

    # Fix component variant imports that reference ../component-name.* or ../component-name--* (should be ./component-name.* or ./component-name--*)
    # This handles any variant file belonging to the same component (selectors, structure, skin, variants, etc.)
    find "$component" -name "*.postcss" -type f -exec sed -i '' "s|['\''\"]\.\./${component}[\.-]|\"\./${component}.|g" {} \;
    find "$component" -name "*.postcss" -type f -exec sed -i '' "s|['\''\"]\.\./${component}--|\"\./${component}--|g" {} \;

    echo "  ✅ Fixed imports in $component"
}

# Fix imports for all component directories found
for component_dir in */; do
    # Remove trailing slash to get component name
    component="${component_dir%/}"

    # Skip non-directories and common non-component items
    if [[ -d "$component" && "$component" != ".DS_Store" && "$component" != "README.css" && "$component" != "config.yml" && "$component" != "demo.postcss" ]]; then
        fix_component_imports "$component"
    fi
done

# Fix asset paths in config.yml files
echo "🔧 Fixing asset paths in config.yml files..."

# We're already in the components directory from the previous section
# No need to cd again

# For each component subdirectory, fix asset paths in all config.yml files
for component_dir in */; do
    component="${component_dir%/}"
    
    # Skip non-directories and common non-component items
    if [[ -d "$component" && "$component" != ".DS_Store" && "$component" != "README.css" && "$component" != "config.yml" && "$component" != "demo.postcss" ]]; then
        echo "  🔄 Fixing asset paths for $component..."
        
        # Go back to project root to find all config.yml files
        cd "../../../../.."
        
        # Fix basic component.css pattern
        find . -name "config.yml" -type f -exec sed -i '' "s|../../assets/components/${component}\.css|../../assets/tacc/components/${component}/${component}.css|g" {} \;
        
        # Fix variant component--variant.css pattern
        find . -name "config.yml" -type f -exec sed -i '' "s|../../assets/components/${component}--\([^.]*\)\.css|../../assets/tacc/components/${component}/${component}--\1.css|g" {} \;
        
        # Go back to components directory for next iteration
        cd "src/lib/_imports/tacc/components"
    fi
done

# Go back to project root
cd "../../../../.."

echo "✅ Fixed asset paths in config.yml files"

echo "✅ All relative imports and asset paths have been fixed!"
echo ""
echo "You can now run 'npm run build' to verify the build works correctly."
