#!/usr/bin/env node

/** Get tag-based description from Git */
function gitDescribe() {
  const { execFileSync } = require('child_process');

  function runGit(args) {
    return execFileSync('git', args, {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore']
    }).trim();
  }

  try { return runGit(['describe', '--tags']); } catch {}
  try { return runGit(['rev-parse', '--short', 'HEAD']); } catch {}
  return undefined;
}

module.exports = gitDescribe;
