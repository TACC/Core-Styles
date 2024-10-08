#!/usr/bin/env node

/** Export internal function used by this package to configure build */

const fs = require('fs');
const merge = require('merge-lite');
const yaml = require('js-yaml');

const BASE_CONFIG_FILE = `${__dirname}/../.postcssrc.base.yml`;
const NEW_CONFIG_FILE = `${__dirname}/../.postcssrc.yml`;

/**
 * Save base config as auto-loaded file (also can overwrite with custom values)
 * @param {array.string} [customConfigFiles=[]] - List of YAML config file paths
 * (The first file is merged on top of the base config.)
 * (Each successive file overwrites the file before it.)
 * @param {string} [cssVersion] - A versioning identifier for this build
 * @see https://github.com/postcss/postcss-load-config#postcssrc
 */
function config(customConfigFiles = [], cssVersion) {
  // Prepare data
  const configFiles = [BASE_CONFIG_FILE, ...customConfigFiles];
  const configObjects = [];
  let newJson;

  // Initialize final config file
  emptyOrCreateFile(NEW_CONFIG_FILE);

  // Manipulate final config
  configFiles.forEach((nextFile) => {
    const testJson = getConfigObject(nextFile);

    // The 'postcss-import-url' should be moved to front of config
    if (testJson.plugins && 'postcss-import-url' in testJson.plugins) {

      configObjects.unshift({
        'plugins': {
          'postcss-import-url': testJson.plugins['postcss-import-url']
        }
      });
    }
  });

  // Merge configs in order
  configFiles.forEach((nextFile) => {
    newJson = getConfigObject(nextFile);

    // The 'postcss-import-url' would have been moved to front of config
    if (newJson.plugins && 'postcss-import-url' in newJson.plugins) {

      delete newJson.plugins['postcss-import-url'];
    }

    configObjects.push(newJson);
  });
  const mergedJson = merge(...configObjects);

  // Update version property
  const updatedJson = updateVersion(mergedJson, cssVersion);
  const configYaml = yaml.dump(updatedJson);

  // Write final config file
  fs.writeFileSync(NEW_CONFIG_FILE, configYaml, 'utf8');
}

/**
 * Update the value for the CSS version in given config data
 * @param {object} config - The config data in which to update the version
 * @param {string} version - The version identifier
 * @return {object} - Updated config
 */
function updateVersion(config, version) {
  console.log(`Tagging CSS version as ${version}`);

  config['plugins']['postcss-banner']['banner'] = version;

  return config;
}

/**
 * Get JSON from YAML config file
 * @param {string} filePath - YAML config file
 * @return {object} - Config as JSON
 */
function getConfigObject(filePath) {
  const config = fs.readFileSync(filePath, 'utf8');
  const json = yaml.load(config);

  return json;
}

/**
 * If file exists, empty it; otherwise, create it
 * @param {string} [filePath] - The file to empty or create
 * @see https://stackoverflow.com/a/29016268/11817077
 */
function emptyOrCreateFile(filePath) {
  fs.closeSync(fs.openSync(filePath, 'w'));
}

/*
  Export
*/
module.exports = config;
