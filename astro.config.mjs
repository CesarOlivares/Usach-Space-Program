import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import keystatic from '@keystatic/astro';

const isProd = process.env.NODE_ENV === 'production';

// https://astro.build/config
export default defineConfig({
  base: '/Usach-Space-Program',
  integrations: [
    react(),
    ...(isProd ? [] : [keystatic()])
  ],
  output: 'static'
});
