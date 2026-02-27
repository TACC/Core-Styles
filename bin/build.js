#!/usr/bin/env node

/** Build CSS using the Core-Styles API */

const { buildStylesheets } = require('../src/main');
const mininmist = require('minimist');

const ARGS = mininmist( process.argv.slice( 2 ) );
const BUILD_ID = ARGS['build-id'] || '';

/* Theme: (default) */
buildStylesheets('src/lib/_imports/**/*!(fractal.server.refresh).postcss', './dist', {
  baseMirrorDir: 'src/lib/_imports',
  buildId: BUILD_ID
});
