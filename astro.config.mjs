// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  vite: {
    define: {
      'process.env.SANITY_PROJECT_ID': JSON.stringify(process.env.SANITY_PROJECT_ID || ''),
      'process.env.SANITY_DATASET': JSON.stringify(process.env.SANITY_DATASET || 'production'),
      'process.env.PUBLIC_SANITY_PROJECT_ID': JSON.stringify(process.env.SANITY_PROJECT_ID || ''),
    },
  },
});
