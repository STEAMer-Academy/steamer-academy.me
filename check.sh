#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

# Function to perform the replacement
replace_text() {
  local target="framer-motion"
  local replacement="motion/react"
  local script_name="$(basename "$0")"

  # Find all files, excluding the script itself
  find . -type f -not -name "$script_name" -exec grep -Iq . {} \; -print | while read -r file; do
    if grep -q "$target" "$file"; then
      echo "Updating: $file"
      sed -i "s|$target|$replacement|g" "$file"
    fi
  done
}

# Run the replacement function
replace_text

echo "Replacement completed!"

