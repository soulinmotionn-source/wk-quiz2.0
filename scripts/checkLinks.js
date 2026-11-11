/**
 * Post-build link checker: every internal link on every prerendered page
 * (and every sitemap URL) must point at a page or file that exists in dist/.
 *
 *   npm run check:links
 */
import fs from 'node:fs';
import path from 'node:path';

const DIST = path.resolve('dist');
if (!fs.existsSync(DIST)) {
  console.error('dist/ not found — run `npm run build` first.');
  process.exit(1);
}

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else out.push(full);
  }
  return out;
}

function exists(urlPath) {
  const clean = decodeURIComponent(urlPath.split('#')[0].split('?')[0]).replace(/\/+$/, '') || '/';
  if (clean === '/') return fs.existsSync(path.join(DIST, 'index.html'));
  const target = path.join(DIST, clean);
  return fs.existsSync(path.join(target, 'index.html')) || (fs.existsSync(target) && fs.statSync(target).isFile());
}

const pages = walk(DIST).filter(f => f.endsWith('index.html') || f.endsWith('404.html'));
const broken = new Map(); // link -> Set(pages)
let checked = 0;

for (const file of pages) {
  const page = '/' + path.relative(DIST, file).replace(/\\/g, '/').replace(/index\.html$/, '');
  const html = fs.readFileSync(file, 'utf8');
  for (const m of html.matchAll(/<a\s[^>]*href="(\/[^"]*)"/g)) {
    const href = m[1].replace(/&amp;/g, '&');
    if (href.startsWith('//') || href.startsWith('/#')) continue;
    checked++;
    if (!exists(href)) {
      if (!broken.has(href)) broken.set(href, new Set());
      broken.get(href).add(page);
    }
  }
}

const sitemap = path.join(DIST, 'sitemap.xml');
if (fs.existsSync(sitemap)) {
  for (const m of fs.readFileSync(sitemap, 'utf8').matchAll(/<loc>https:\/\/wkquiz\.com([^<]*)<\/loc>/g)) {
    checked++;
    if (!exists(m[1] || '/')) {
      if (!broken.has(m[1])) broken.set(m[1], new Set());
      broken.get(m[1]).add('sitemap.xml');
    }
  }
}

if (broken.size > 0) {
  console.error(`✖ ${broken.size} broken internal link(s):`);
  for (const [href, from] of broken) console.error(`  ${href}   ← ${[...from].slice(0, 3).join(', ')}`);
  process.exit(1);
}
console.log(`✔ link check passed: ${checked} internal links across ${pages.length} pages all resolve.`);
