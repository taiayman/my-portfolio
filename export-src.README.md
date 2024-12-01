# Source Code Export Script

This script exports all source code files from the `src` directory into a single markdown file.

## Usage

1. Open your terminal in the project directory
2. Run the command:

```bash
node export-src.js
```

## Output

The script will create a `src.txt` file in your project root containing:
- All `.tsx`, `.ts`, `.css`, and `.json` files from the `src` directory
- Files are sorted alphabetically
- Each file is formatted in a markdown code block with proper syntax highlighting
- Includes file paths and timestamps

## Features

- Exports TypeScript/TSX files
- Exports CSS files
- Exports JSON files
- Normalizes line endings
- Sorts files alphabetically
- Proper markdown formatting
- Timestamps for tracking when the export was made 