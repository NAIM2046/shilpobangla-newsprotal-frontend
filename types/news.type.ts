// types/news.ts

export interface NewsItem {
  id: string;
  title: string;
  image: string;
  slug: string;
}
interface youtubeItem {
  id: string;
  title: string;
  slug: string;
  youtubeUrl: string;
  videoId: string;
  thumbnailUrl: string;
}

export interface HomePageData {
  heroSection: {
    leadNews: NewsItem;
    sideNews: NewsItem[];
    opinions: NewsItem[];
    youtube: youtubeItem[];
  };
  topNews: NewsItem[];
  latestNews: NewsItem[];
  popularNews: NewsItem[];
  
  // 🌟 আগের ডিজাইনের ক্যাটাগরির জন্য (পাশাপাশি লিস্ট)
  gridCategories: {
    [key: string]: NewsItem[];
  };
  
  // 🌟 নতুন ডিজাইনের ক্যাটাগরির জন্য (কালো হেডার, ১টি বড় ও ২টি ছোট খবর)
  blockCategories: {
    [key: string]: NewsItem[];
  };
  
  // 🌟 ফটো গ্যালারির জন্য
  photoGallery: NewsItem[];
}