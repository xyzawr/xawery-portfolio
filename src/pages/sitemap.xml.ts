import type { APIRoute } from 'astro';
import { sanityClient } from '../sanity/client';

const BASE = 'https://xawery.com';

const staticPages = [
  { url: '/', priority: '1.0', changefreq: 'monthly' },
  { url: '/work', priority: '0.9', changefreq: 'weekly' },
  { url: '/photography', priority: '0.8', changefreq: 'weekly' },
  { url: '/about', priority: '0.7', changefreq: 'monthly' },
  { url: '/contact', priority: '0.6', changefreq: 'yearly' },
];

export const GET: APIRoute = async () => {
  let projectSlugs: string[] = [];
  let tripSlugs: string[] = [];

  try {
    const projectId = import.meta.env.SANITY_PROJECT_ID;
    if (projectId) {
      [projectSlugs, tripSlugs] = await Promise.all([
        sanityClient.fetch<string[]>(`*[_type == "project"]{ "slug": slug.current }.slug`),
        sanityClient.fetch<string[]>(`*[_type == "trip"]{ "slug": slug.current }.slug`),
      ]);
    }
  } catch { /* fall through */ }

  const urls = [
    ...staticPages.map(p => `
  <url>
    <loc>${BASE}${p.url}</loc>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`),
    ...projectSlugs.map(s => `
  <url>
    <loc>${BASE}/project/${s}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`),
    ...tripSlugs.map(s => `
  <url>
    <loc>${BASE}/trip/${s}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`),
  ].join('');

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}\n</urlset>`,
    { headers: { 'Content-Type': 'application/xml' } }
  );
};
