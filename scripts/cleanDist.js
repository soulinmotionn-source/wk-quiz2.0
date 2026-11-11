import fs from 'node:fs';
import path from 'node:path';

const isPost = process.argv.includes('--post');

if (isPost) {
  // Post-build check: a catch-all SPA rule (/* /index.html 200) would hide real 404s and the
  // prerendered pages, so remove the file only if it contains one. Specific redirects are kept.
  const distRedirects = path.join('dist', '_redirects');
  const catchAll = /^\s*\/\*\s/m;
  if (fs.existsSync(distRedirects) && catchAll.test(fs.readFileSync(distRedirects, 'utf8'))) {
    fs.unlinkSync(distRedirects);
    console.log('🧹 Removed conflicting catch-all dist/_redirects.');
  }
} else {
  // Pre-build: completely purge dist to avoid stale cache leakage
  if (fs.existsSync('dist')) {
    fs.rmSync('dist', { recursive: true, force: true });
    console.log('🧹 Cleaned dist directory before build.');
  }
}
