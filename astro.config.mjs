import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://taxdebtwealthsuite.com',
  trailingSlash: 'ignore',
  integrations: [sitemap()],
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
