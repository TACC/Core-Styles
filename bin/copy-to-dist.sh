#!/bin/bash
set -e  # Exit immediately if a command exits with a non-zero status

SOURCE_ROOT="src/lib/"
DEST_ROOT="dist/"

# To be reused with path appended
source_path="$SOURCE_ROOT"
dest_path="$DEST_ROOT"

# Copy vendor stylesheets (while preserving directory structure)
source_path="${SOURCE_ROOT}_imports/"
echo "Copy vendor stylesheets from '$source_path' to '$DEST_ROOT'"
rsync -av --prune-empty-dirs --include='*/' --include='*/vendor/*.css' --exclude='*' "$source_path" "$DEST_ROOT" \
|| { echo "Error copying"; exit 1; }

echo "Copied vendor stylesheets."

# Copy other files
dirs=("scripts" "fonts" "tokens")
for dir in "${dirs[@]}"; do
    source_path="${SOURCE_ROOT}${dir}/"
    dest_path="${DEST_ROOT}${dir}/"
    echo "Copying $dir from '$source_path' to '$dest_path'."

    # Check for source
    [ -d "$source_path" ] \
    || mkdir -p "$source_path" \
    || { echo "Error recreating '$source_path'"; exit 1; }

    # Remove past output
    rm -rf "${dest_path}" \
    || { echo "Error removing destination"; exit 1; }

    # Copy files
    cp -r "$source_path" "$dest_path" \
    || { echo "Error copying"; exit 1; }

    echo "Copied $dir."
done
