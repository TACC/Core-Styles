#!/usr/bin/env node

/** Build one stylesheet via the Core-Styles API */

const { buildStylesheets } = require('../src/main');

const inputs = process.argv.slice( 2 );

/* Theme: (default) */
inputs.forEach( input => {
    buildStylesheets( input, undefined, './dist');
});
