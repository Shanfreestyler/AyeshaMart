import { MetadataRoute } from 'next';
import { cattleData } from '@/lib/mockData/cattleData';
import { sellers } from '@/lib/mockData/sellers';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://qurbanihub.com'; // Assuming this is the production URL

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `${baseUrl}/browse`, lastModified: new Date(), changeFrequency: 'hourly', priority: 0.9 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
  ];

  // Dynamic cattle pages
  const cattlePages: MetadataRoute.Sitemap = cattleData.map((cattle) => ({
    url: `${baseUrl}/cattle/${cattle.id}`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 0.8,
  }));

  // Dynamic seller pages
  const sellerPages: MetadataRoute.Sitemap = sellers.map((seller) => ({
    url: `${baseUrl}/seller/${seller.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  return [...staticPages, ...cattlePages, ...sellerPages];
}

