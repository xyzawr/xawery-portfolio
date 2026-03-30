import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './src/sanity/index';

const projectId = '8mm5j8t3';
const dataset = 'production';

export default defineConfig({
  name: 'xawery-portfolio',
  title: 'xawery portfolio',
  projectId,
  dataset,
  plugins: [
    structureTool(),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
  },
});
