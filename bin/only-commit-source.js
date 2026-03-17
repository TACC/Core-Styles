#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

function findBuiltFiles( dir ) {
  let builtFiles = [];
  const files = fs.readdirSync( dir );

  for ( const file of files ) {
    const filePath = path.join( dir, file );
    const relativePath = path.relative( path.join( __dirname, '../'), filePath );
    const isDirectory = fs.statSync( filePath ).isDirectory();

    if ( isDirectory ) {
      builtFiles.push(...findBuiltFiles( filePath ));
      continue;
    }

    const isProbablyBuilt = filePath.endsWith('.css');
    const basename = path.basename( filePath, '.css' );

    // `.css` files exactly 2 directories below `_imports/` are source files
    // in the reorganized third-party library structure (e.g. Bootstrap 4/5).
    // They use `.css` extension by convention and are not build artifacts.
    const isLibrarySource = /_imports\/[^/]+\/[^/]+\/[^/]+\.css$/.test( relativePath );

    // `core-styles.*.css` files are consumer-facing entry points in `_imports/`;
    // they aggregate @imports for a client library and must be published.
    const isEntryPoint = /_imports\/core-styles\.[^/]+\.css$/.test( relativePath );

    // Files whose name starts with `demo` / `example`, or contains `.demo`,
    // are Fractal-only demo helpers and are never compiled into the package.
    const isDemoOrExample = /(?:^demo(?:[.-]|$)|\.demo(?:[.-]|$)|^example(?:[.-]|$))/.test( basename );

    // `_imports/vendors/` exists on epic/v3 but is removed on epic/v3--reorg;
    // this rule becomes a no-op once the reorg merges in.
    const isVendored = relativePath.includes( '_imports/vendors' );

    const shouldIgnore = (
      isLibrarySource ||
      filePath.endsWith('fractality.server.refresh.css') ||
      isVendored ||
      filePath.endsWith('README.css') ||
      isEntryPoint ||
      isDemoOrExample
    );

    if ( isProbablyBuilt && ! shouldIgnore ) {
      builtFiles.push( relativePath );
    }
  }

  return builtFiles;
}

const sourceDir = path.join( __dirname, '../', 'src');
const sourceFiles = findBuiltFiles( sourceDir );

if ( sourceFiles.length > 0 ) {
  console.error(
    `Found ${sourceFiles.length} dist files in source. Remove to permit publish:`
  );
  sourceFiles.forEach( file =>
    console.error(`- ${file}`)
  );

  process.exit(1);
} else {
  console.log(
    'No dist files found in source. Ready to publish.'
  );
}
