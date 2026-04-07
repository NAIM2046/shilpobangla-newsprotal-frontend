// types/news.ts

export interface NewsItem {
  id: string;
  title: string;
  image: string;
  slug: string;
}
interface YoutubeItem {
  id: string;
  title: string;
  slug: string;
  youtubeUrl: string;
  videoId: string;
  thumbnailUrl: string;
}
export type OpinionItem = {
  id: string;
  title: string;
  image: string;
  slug: string;
  author: {
    name: string;
    avatar_url: string | null;
  };
};
export interface HomePageData {
  heroSection: {
    leadNews: NewsItem;
    sideNews: NewsItem[];
    opinions: OpinionItem[];
    youtube: YoutubeItem[];
  };
  topNews: NewsItem[];
  latestNews: NewsItem[];
  popularNews: NewsItem[];
  
 
  gridCategories: {
    [key: string]: NewsItem[];
  };
  
 
  blockCategories: {
    [key: string]: NewsItem[];
  };
  
 
  photoGallery: NewsItem[];
}