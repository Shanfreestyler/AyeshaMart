import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/api/', // Block API routes if any are added later
    },
    sitemap: 'https://qurbanihub.com/sitemap.xml',
  };
}
