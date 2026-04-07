import { MetadataRoute } from 'next';
import { getNewsForSitemap } from '@/actions/news.actions'; 

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://dailyshilpobangla.com';

  const allNews = await getNewsForSitemap();

  const newsUrls = allNews.map((news: any) => ({
    url: `${baseUrl}/news/${news.slug}`,
    lastModified: new Date(news.updatedAt || news.publishedAt),
    changeFrequency: 'hourly' as const,
    priority: 0.8,
  }));

  const staticUrls = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'always' as const,
      priority: 1.0,
    },
    {
        url: `${baseUrl}/about`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.5,
    },
  
  ];

  return [...staticUrls, ...newsUrls];
}
