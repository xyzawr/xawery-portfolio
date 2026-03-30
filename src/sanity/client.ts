import { createClient } from '@sanity/client';

const projectId = import.meta.env.SANITY_PROJECT_ID || '';
const dataset = import.meta.env.SANITY_DATASET || 'production';

// Only create a real client if projectId is configured
export const sanityClient = projectId
  ? createClient({
      projectId,
      dataset,
      useCdn: true,
      apiVersion: '2024-01-01',
    })
  : createClient({
      projectId: 'placeholder',
      dataset,
      useCdn: true,
      apiVersion: '2024-01-01',
    });

export function imageUrl(source: { asset?: { _ref?: string } } | null | undefined): string {
  if (!source?.asset?._ref) return '';
  const ref = source.asset._ref;
  // ref format: image-{id}-{dimensions}-{format}
  const parts = ref.replace('image-', '').split('-');
  const format = parts[parts.length - 1];
  const dimensions = parts[parts.length - 2];
  const id = parts.slice(0, parts.length - 2).join('-');
  return `https://cdn.sanity.io/images/${projectId}/${dataset}/${id}-${dimensions}.${format}`;
}
