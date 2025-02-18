#!/usr/bin/env node

/** Export internal function used by this package to prepare build */

const fs = require('fs');

const BRAND_PATTERN = '___';
const BRAND_LIST = ['v1', 'v2', 'v3', 'ds'];
const MODE = 'light'; // TODO: Support 'dark' mode

const TOKEN_FILE_SRC = `${__dirname}/../lib/tokens.json`;
const TOKEN_FILE_DEST = `${__dirname}/../lib/tokens/${BRAND_PATTERN}.json`;

/**
 * Build a design tokens file per brand
 */
function build() {
  let vars = getJsonFromYaml(TOKEN_FILE_SRC);

  console.log('Creating tokens for ' + BRAND_LIST.join(', '));

  BRAND_LIST.forEach(brand => {
    buildTokenFile(vars, brand);
  });
}

/**
 * Create/Update a tokens file for a specific brand
 * @param {object} vars - The variables from which to get tokens
 * @param {string} brand - The brand of variables to get
 */
function buildTokenFile(vars, brand) {
  const dest = getTokenFileName(brand);
  const tokens = getBrandTokens(vars, brand);

  emptyOrCreateFile(dest);
  writeFile(dest, tokens);
}

/**
 * Get the tokens for a brand
 * @param {object} vars - The variables from which to extra a brand
 * @param {string} brand - The brand to extract
 */
function getBrandTokens(vars, brand) {
  const source = vars[`Primitives/${brand}`];
  const tokens = structuredClone(vars[`Tokens/${MODE}`]);

  BRAND_LIST.forEach(key => {
    if (key !== brand) {
      delete tokens['color'][key];
    }
  });

  return Object.assign(source, tokens);
}

/**
 * Get the name of a token file for a brand
 * @param {string} brand - The brand to extract
 */
function getTokenFileName(brand) {
  return TOKEN_FILE_DEST.replace(BRAND_PATTERN, brand);
}

/**
 * Get JSON from YAML config file
 * @param {string} filePath - YAML config file
 * @return {object} - Config as JSON
 */
function getJsonFromYaml(filePath) {
  const file = fs.readFileSync(filePath, 'utf8');

  return JSON.parse(file);
}

/**
 * If file exists, empty it; otherwise, create it
 * @param {string} [filePath] - The file to empty or create
 * @see https://stackoverflow.com/a/29016268/11817077
 */
function emptyOrCreateFile(filePath) {
  fs.closeSync(fs.openSync(filePath, 'w'));
}

/**
 * Write a file
 * @param {string} dest - Where to write file
 * @param {string} tokens - The tokens to write
 */
function writeFile(dest, tokens) {
  const content = JSON.stringify(tokens);

  fs.writeFileSync(dest, content, 'utf8');
}

/*
  Export
*/
module.exports = build;
