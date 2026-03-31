// @ts-check
import { defineConfig } from 'astro/config';
import node from '@astrojs/node';

export default defineConfig({
  output: 'server',
  adapter: node({ mode: 'standalone' }),
  vite: {
    define: {
      'process.env.SANITY_PROJECT_ID': JSON.stringify(process.env.SANITY_PROJECT_ID || ''),
      'process.env.SANITY_DATASET': JSON.stringify(process.env.SANITY_DATASET || 'production'),
      'process.env.PUBLIC_SANITY_PROJECT_ID': JSON.stringify(process.env.SANITY_PROJECT_ID || ''),
    },
  },
});
