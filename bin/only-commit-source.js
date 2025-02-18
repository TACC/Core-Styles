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
    const shouldIgnore = (
      /_imports\/[^/]+\/[^/]+\/[^/]+\.css$/.test(relativePath) ||
      filePath.endsWith('fractal.server.refresh.css') ||
      relativePath.includes('_imports/vendors') ||
      filePath.endsWith('README.css')
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
