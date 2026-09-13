import fs from 'node:fs';
import path from 'node:path';

const isPost = process.argv.includes('--post');

if (isPost) {
  // Post-build check: explicitly ensure no conflicting _redirects file exists in dist
  const distRedirects = path.join('dist', '_redirects');
  if (fs.existsSync(distRedirects)) {
    fs.unlinkSync(distRedirects);
    console.log('🧹 Removed conflicting dist/_redirects.');
  }
} else {
  // Pre-build: completely purge dist to avoid stale cache leakage
  if (fs.existsSync('dist')) {
    fs.rmSync('dist', { recursive: true, force: true });
    console.log('🧹 Cleaned dist directory before build.');
  }
}
