import fs from 'fs';
import path from 'path';

const distDir = path.join(process.cwd(), 'dist');
const sitemapSource = path.join(distDir, 'sitemap-0.xml');
const sitemapTarget = path.join(distDir, 'sitemap.xml');

if (fs.existsSync(sitemapSource)) {
  fs.copyFileSync(sitemapSource, sitemapTarget);
  console.log('Successfully copied sitemap-0.xml to sitemap.xml');
} else {
  console.error('sitemap-0.xml not found in dist/');
}

