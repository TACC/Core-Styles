#!/usr/bin/env node

/** Get tag-based description from Git */
function gitDescribe() {
  const { execSync } = require('child_process');

  try {
    return execSync(
      'git describe --tags 2>/dev/null || git rev-parse --short HEAD',
      { encoding: 'utf8' }
    ).trim();
  } catch (error) {
    console.error('Error running `git describe`:', error.message);
    return undefined;
  }
}

module.exports = gitDescribe;
