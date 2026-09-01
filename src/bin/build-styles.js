#!/usr/bin/env node

/** Export internal function used by this package to build styles */

const path = require('path');
const cmd = require('node-cmd');

// SEE: https://stackoverflow.com/a/63530170
process.env.FORCE_COLOR = true;

/**
 * Build stylesheets from source CSS
 * @param {string} input - Parse CSS files from which path
 * @param {string} output - Output CSS files to which path
 * @param {object} [opts={}] - Options
 * @param {string} [opts.baseMirrorDir] - Path to NOT add when mirroring
 * @param {string} [opts.fileExt] - Custom file extension for output files
 * @param {string} [opts.configDir] - Custom config directory
 * @param {boolean} [opts.verbose=false] - To print more info from build log
 */
function build(input, output, opts = {}) {
  // Get data
  const outDir = output || path.dirname(input);
  const configDir = opts.configDir || `${__dirname}/../`;
  const verbose = opts.verbose === true ? '--verbose' : '';
  const base = opts.baseMirrorDir ? `--base "${opts.baseMirrorDir}"` : '';
  const ext = opts.fileExt ? `--ext "${opts.fileExt}"` : '';

  // Build command
  const command = `postcss "${input}" --dir "${outDir}" ${verbose} --config "${configDir}" ${base} ${ext}`;

  const outDirLog = output ? ` to ${output}` : ``;
  console.log(`Building stylesheet(s)`, outDirLog);
  if (opts.verbose) console.log('>', command);

  // Run command
  cmd.runSync(command);
}

/*
  Export
*/
module.exports = build;
