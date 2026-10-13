/**
 * Download self-hosted Inter font files (woff2) into public/fonts/.
 *
 * Binary font files are intentionally NOT committed to the repo (GitHub's
 * file API mangles binary uploads). Instead, this script fetches them at
 * build time so the production bundle always serves same-origin fonts.
 *
 * Runs as the first step of `npm run build`. If the download fails after
 * retries, the build continues and the site falls back to system fonts.
 */
import { mkdirSync, existsSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const FONTS_DIR = join(__dirname, '..', 'public', 'fonts');

const FONTS = [
  {
    name: 'inter-latin.woff2',
    url: 'https://fonts.gstatic.com/s/inter/v20/UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa1ZL7.woff2',
    expectedBytes: 48256
  },
  {
    name: 'inter-latin-ext.woff2',
    url: 'https://fonts.gstatic.com/s/inter/v20/UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa25L7SUc.woff2',
    expectedBytes: 85068
  }
];

const MAX_RETRIES = 3;

async function downloadWithRetry(font) {
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      const res = await fetch(font.url, { redirect: 'follow' });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const buf = Buffer.from(await res.arrayBuffer());
      if (buf.length < 10000) throw new Error(`suspiciously small (${buf.length} bytes)`);
      // woff2 magic bytes: 'wOF2'
      if (buf.subarray(0, 4).toString('ascii') !== 'wOF2') {
        throw new Error('not a woff2 file (bad magic bytes)');
      }
      writeFileSync(join(FONTS_DIR, font.name), buf);
      console.log(`[downloadFonts] ${font.name}: ${buf.length} bytes OK`);
      return true;
    } catch (err) {
      console.warn(`[downloadFonts] attempt ${attempt}/${MAX_RETRIES} for ${font.name} failed: ${err.message}`);
      if (attempt < MAX_RETRIES) await new Promise(r => setTimeout(r, 1500 * attempt));
    }
  }
  return false;
}

mkdirSync(FONTS_DIR, { recursive: true });

let failed = [];
for (const font of FONTS) {
  const dest = join(FONTS_DIR, font.name);
  if (existsSync(dest)) {
    console.log(`[downloadFonts] ${font.name}: already present, skipping`);
    continue;
  }
  const ok = await downloadWithRetry(font);
  if (!ok) failed.push(font.name);
}

if (failed.length > 0) {
  console.warn(
    `[downloadFonts] WARNING: could not download ${failed.join(', ')}. ` +
    `Build continues; site will fall back to system fonts.`
  );
} else {
  console.log('[downloadFonts] all fonts ready');
}
