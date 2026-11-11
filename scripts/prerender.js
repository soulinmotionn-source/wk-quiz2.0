/**
 * Static prerender (runs after `vite build`).
 *
 * Renders every route of the real React app to HTML so crawlers and social
 * scrapers see full content, unique titles, canonical URLs and structured data
 * without executing JavaScript. The browser then hydrates the same markup.
 *
 * Also writes dist/sitemap.xml and dist/404.html (a real HTTP 404 page).
 */
import fs from 'node:fs';
import path from 'node:path';
import { createServer } from 'vite';

const SITE = 'https://wkquiz.com';
const DIST = path.resolve('dist');
const DEFAULT_OG_IMAGE = `${SITE}/og-image.jpg`;

const esc = s => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const withSite = t => (t.includes('WKQuiz') ? t : `${t} | WKQuiz.com`);
const clamp = (text, max = 158) => {
  const t = text.replace(/\s+/g, ' ').trim();
  if (t.length <= max) return t;
  const cut = t.slice(0, max - 1);
  return `${cut.slice(0, cut.lastIndexOf(' ')).replace(/[,;:.\-–—]+$/, '')}…`;
};
const canonical = p => `${SITE}${p === '/' ? '/' : p.replace(/\/+$/, '')}`;

function headTags(seo, routePath) {
  const title = withSite(seo.title);
  const desc = clamp(seo.description);
  const url = canonical(routePath);
  const image = seo.image || DEFAULT_OG_IMAGE;
  const tags = [
    `<meta name="description" content="${esc(desc)}" />`,
    `<meta name="robots" content="${seo.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large'}" />`
  ];
  if (!seo.noindex) tags.push(`<link rel="canonical" href="${esc(url)}" />`);
  tags.push(
    `<meta property="og:type" content="${seo.type || 'website'}" />`,
    `<meta property="og:site_name" content="WKQuiz.com" />`,
    `<meta property="og:title" content="${esc(title)}" />`,
    `<meta property="og:description" content="${esc(desc)}" />`,
    `<meta property="og:url" content="${esc(url)}" />`,
    `<meta property="og:image" content="${esc(image)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(title)}" />`,
    `<meta name="twitter:description" content="${esc(desc)}" />`,
    `<meta name="twitter:image" content="${esc(image)}" />`
  );
  if (seo.schema) {
    const json = JSON.stringify(seo.schema).replace(/</g, '\\u003c');
    tags.push(`<script id="wkquiz-schema-jsonld" type="application/ld+json">${json}</script>`);
  }
  return { title, tags: tags.join('\n    ') };
}

function buildPage(template, { html, seo, routePath }) {
  const { title, tags } = headTags(seo, routePath);
  return template
    .replace(/<title>[\s\S]*?<\/title>/, () => `<title>${esc(title)}</title>`)
    .replace('<!--app-head-->', () => tags)
    .replace('<div id="root"></div>', () => `<div id="root">${html}</div>`);
}

function writeRoute(routePath, content) {
  const file = routePath === '/' ? path.join(DIST, 'index.html') : path.join(DIST, routePath, 'index.html');
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content, 'utf8');
}

function sitemapXml(routes) {
  const lastmod = new Date().toISOString().slice(0, 10);
  const urls = routes
    .map(
      r =>
        `  <url>\n    <loc>${canonical(r.path)}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${r.changefreq}</changefreq>\n    <priority>${r.priority}</priority>\n  </url>`
    )
    .join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

async function main() {
  const templatePath = path.join(DIST, 'index.html');
  if (!fs.existsSync(templatePath)) throw new Error('dist/index.html missing — run `vite build` first.');
  const template = fs.readFileSync(templatePath, 'utf8');
  if (!template.includes('<!--app-head-->')) throw new Error('index.html is missing the <!--app-head--> placeholder.');

  const vite = await createServer({
    server: { middlewareMode: true },
    appType: 'custom',
    logLevel: 'error',
    optimizeDeps: { noDiscovery: true, include: [] }
  });

  try {
    const mod = await vite.ssrLoadModule('/src/entry-server.tsx');
    const routes = mod.getRoutes();

    for (const route of routes) {
      const { html, seo } = await mod.render(route.path);
      if (!seo) throw new Error(`No SEOHead rendered for ${route.path}`);
      writeRoute(route.path, buildPage(template, { html, seo, routePath: route.path }));
    }

    // Legacy URLs: static redirect page (meta refresh + canonical to the new URL); the SPA also redirects.
    for (const [from, to] of Object.entries(mod.REDIRECTS)) {
      const page = template.replace(
        '<!--app-head-->',
        () =>
          `<meta name="robots" content="noindex, follow" />\n    <link rel="canonical" href="${canonical(to)}" />\n    <meta http-equiv="refresh" content="0; url=${to}" />`
      );
      writeRoute(from, page);
    }

    // Real 404 page (served with HTTP 404 by Cloudflare for unknown URLs)
    const notFound = await mod.render('/page-not-found');
    fs.writeFileSync(
      path.join(DIST, '404.html'),
      buildPage(template, { html: notFound.html, seo: { ...notFound.seo, noindex: true }, routePath: '/404' }),
      'utf8'
    );

    fs.writeFileSync(path.join(DIST, 'sitemap.xml'), sitemapXml(routes), 'utf8');
    console.log(`[prerender] ${routes.length} routes rendered, plus 404.html, redirects and sitemap.xml`);
  } finally {
    await vite.close();
  }
}

main().catch(err => {
  console.error('[prerender] failed:', err);
  process.exit(1);
});
