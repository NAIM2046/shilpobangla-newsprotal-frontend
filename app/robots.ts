import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*', 
      allow: '/',     
      disallow: ['/api/'], // শুধু ফ্রন্টএন্ডের API গুলো হাইড রাখলেই হবে
    },
    sitemap: 'https://dailyshilpobangla.com/sitemap.xml', 
  };
}