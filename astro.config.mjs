import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import astroBrokenLinksChecker from 'astro-broken-links-checker';

// https://astro.build/config
export default defineConfig({
  site: 'https://taxdebtwealthsuite.com',
  trailingSlash: 'always',
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/404') && !page.includes('/500'),
    }),
    astroBrokenLinksChecker({
      checkExternalLinks: true,
      throwError: false,
    }),
  ],
  output: 'static',
  compressHTML: true,
  vite: {
    plugins: [tailwindcss()],
    build: {
      minify: 'esbuild',
      cssMinify: true,
      sourcemap: false,
    },
  },
});
