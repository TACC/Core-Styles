#!/usr/bin/env node

/** Create CSS version based on available data */

const package = require(process.env.npm_package_json || '../package.json');

/**
 * Create version from available data
 * @param {string} [buildId] - Any value to identify the build
 */
function create(buildId) {
  const appName = package.name;
  const appVersion = buildId || gitDescribeTag() || package.version + '+';
  const appLicense = package.license;
  const appWebsite = package.homepage.replace('https://', '');

  return `${appName} ${appVersion} | ${appLicense} | ${appWebsite}`;
}

/** Get tag-based description from Git */
function gitDescribeTag() {
  const { execSync } = require('child_process');

  let gitDescribe = undefined;

  try {
    gitDescribe = execSync('git describe --tags', { encoding: 'utf8' }).trim();
    console.log('Output from `git describe`:', gitDescribe);
  } catch (error) {
    console.error('Error running `git describe`:', error.message);
  }

  return gitDescribe;
}

/*
  Export
*/
module.exports = create;
