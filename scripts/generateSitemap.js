import fs from 'node:fs';
import path from 'node:path';

const BASE_URL = 'https://wkquiz.com';
const SITEMAP_FILE = path.resolve('public/sitemap.xml');

// Current date formatted as YYYY-MM-DD
const today = new Date().toISOString().slice(0, 10);

// Helper to extract slugs and popularity from TypeScript files
function extractItemsFromTS(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  // Match object blocks in registry or array
  const objects = content.split(/\{\s*id:/).slice(1);
  return objects.map(block => {
    const slugMatch = block.match(/slug:\s*['"]([^'"]+)['"]/);
    const nameMatch = block.match(/name:\s*['"]([^'"]+)['"]/);
    const titleMatch = block.match(/title:\s*['"]([^'"]+)['"]/);
    const popularMatch = block.match(/popular:\s*(true|false)/);
    const featuredMatch = block.match(/featured:\s*(true|false)/);

    return {
      slug: slugMatch ? slugMatch[1] : null,
      name: nameMatch ? nameMatch[1] : (titleMatch ? titleMatch[1] : null),
      popular: popularMatch ? popularMatch[1] === 'true' : false,
      featured: featuredMatch ? featuredMatch[1] === 'true' : false
    };
  }).filter(item => Boolean(item.slug));
}

function generateSitemap() {
  const categoriesTS = path.resolve('src/data/categoryRegistry.ts');
  const quizzesTS = path.resolve('src/data/quizzes.ts');

  const categories = extractItemsFromTS(categoriesTS);
  const quizzes = extractItemsFromTS(quizzesTS);

  const urls = [];

  // 1. Core Primary Pages
  urls.push({
    loc: `${BASE_URL}/`,
    changefreq: 'daily',
    priority: '1.0'
  });
  urls.push({
    loc: `${BASE_URL}/categories`,
    changefreq: 'daily',
    priority: '0.9'
  });
  urls.push({
    loc: `${BASE_URL}/quizzes`,
    changefreq: 'daily',
    priority: '0.9'
  });
  urls.push({
    loc: `${BASE_URL}/daily-quiz`,
    changefreq: 'daily',
    priority: '0.9'
  });
  urls.push({
    loc: `${BASE_URL}/search`,
    changefreq: 'weekly',
    priority: '0.7'
  });

  // 2. All 34 Approved Categories
  for (const cat of categories) {
    urls.push({
      loc: `${BASE_URL}/categories/${cat.slug}`,
      changefreq: 'daily',
      priority: cat.popular ? '0.85' : '0.8'
    });
  }

  // 3. All Curated Standalone Quizzes
  for (const quiz of quizzes) {
    urls.push({
      loc: `${BASE_URL}/quizzes/${quiz.slug}`,
      changefreq: 'weekly',
      priority: quiz.featured || quiz.popular ? '0.85' : '0.8'
    });
  }

  // 4. About & Contact
  urls.push({
    loc: `${BASE_URL}/about`,
    changefreq: 'monthly',
    priority: '0.6'
  });
  urls.push({
    loc: `${BASE_URL}/contact`,
    changefreq: 'monthly',
    priority: '0.6'
  });

  // 5. Legal & Policies
  urls.push({
    loc: `${BASE_URL}/privacy-policy`,
    changefreq: 'monthly',
    priority: '0.4'
  });
  urls.push({
    loc: `${BASE_URL}/terms-and-conditions`,
    changefreq: 'monthly',
    priority: '0.4'
  });
  urls.push({
    loc: `${BASE_URL}/cookie-policy`,
    changefreq: 'monthly',
    priority: '0.4'
  });
  urls.push({
    loc: `${BASE_URL}/disclaimer`,
    changefreq: 'monthly',
    priority: '0.4'
  });

  // Build XML String
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  for (const u of urls) {
    xml += `  <url>\n`;
    xml += `    <loc>${u.loc}</loc>\n`;
    xml += `    <lastmod>${today}</lastmod>\n`;
    xml += `    <changefreq>${u.changefreq}</changefreq>\n`;
    xml += `    <priority>${u.priority}</priority>\n`;
    xml += `  </url>\n`;
  }

  xml += `</urlset>\n`;

  fs.writeFileSync(SITEMAP_FILE, xml, 'utf8');

  console.log(`🗺️  Successfully generated sitemap.xml with ${urls.length} indexable URLs at:`);
  console.log(`   ${SITEMAP_FILE}`);
  console.log(`   - Core Pages: 5`);
  console.log(`   - Categories: ${categories.length}`);
  console.log(`   - Quizzes: ${quizzes.length}`);
  console.log(`   - Info & Legal Pages: 6`);
}

generateSitemap();
