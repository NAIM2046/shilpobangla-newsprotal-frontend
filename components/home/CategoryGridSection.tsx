// src/components/home/CategoryGridSection.tsx
import { NewsItem } from "@/types/news.type";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface CategoryGridProps {
  categoriesData: Record<string, NewsItem[]>;
}

// ========================
// CategoryBlock Component
// ========================
const CategoryBlock = ({
  categoryTitle,
  newsList,
}: {
  categoryTitle: string;
  newsList: NewsItem[];
}) => {
  if (!newsList || newsList.length === 0) return null;

  const featuredNews = newsList[0];
  const listNews = newsList.slice(1, 4);

  return (
    <div className="w-full flex flex-col">
      {/* 🌟 Header Section (Responsive Title) */}
      <div className="flex items-end justify-between mb-4 pb-2 border-b-2 border-gray-200/80">
        <div className="flex items-center gap-2.5">
          <div className="w-1.5 h-5 sm:h-6 bg-[#0C4A6E]" />
          <h2 className="text-lg sm:text-xl font-bold text-[#0F0E0A] tracking-tight leading-none">
            {categoryTitle}
          </h2>
        </div>
        <Link
          href={`/category/${categoryTitle}`}
          className="flex items-center gap-1 text-xs sm:text-sm font-semibold text-[#0C4A6E] hover:text-[#073655] transition-colors"
        >
          আরও
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>

      {/* 🌟 Content Layout (Mobile: Column, Desktop: Row) */}
      <div className="flex flex-col md:flex-row gap-6 lg:gap-8">
        {/* =======================================
            বাম অংশ (Featured News) - ডেস্কটপে ৬০%
        ======================================= */}
        {featuredNews && (
          <div className="w-full md:w-3/5 lg:w-[55%] flex flex-col gap-3">
            <Link
              href={`/news/${featuredNews.slug}`}
              className="relative w-full aspect-video sm:aspect-[5/3] group overflow-hidden bg-gray-100 rounded-sm"
            >
              <Image
                src={featuredNews.image}
                alt={featuredNews.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 60vw"
                priority
              />
            </Link>

            <Link href={`/news/${featuredNews.slug}`} className="group mt-1">
              <h3 className="text-[#0F0E0A] font-bold text-base sm:text-lg md:text-xl leading-snug group-hover:text-[#0C4A6E] transition-colors line-clamp-3">
                {featuredNews.title}
              </h3>
            </Link>
          </div>
        )}

        {/* =======================================
            ডান অংশ (List News) - ডেস্কটপে ৪০%
        ======================================= */}
        {listNews.length > 0 && (
          <div className="w-full md:w-2/5 lg:w-[45%] flex flex-col gap-4 sm:gap-5">
            {listNews.map((news) => (
              <div
                key={news.id}
                className="border-b border-gray-200/60 pb-4 last:border-b-0 last:pb-0"
              >
                <Link
                  href={`/news/${news.slug}`}
                  className="flex items-start justify-between gap-3 sm:gap-4 group"
                >
                  {/* Title (Flex-1 ensures it takes available space) */}
                  <h3 className="flex-1 text-[#0F0E0A] font-semibold text-sm sm:text-base leading-tight group-hover:text-[#0C4A6E] transition-colors line-clamp-3">
                    {news.title}
                  </h3>

                  {/* Thumbnail Image (Fixed aspect ratio, prevents shrinking) */}
                  <div className="relative w-[100px] sm:w-[120px] aspect-[4/3] flex-shrink-0 overflow-hidden bg-gray-100 rounded-sm">
                    <Image
                      src={news.image}
                      alt={news.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 640px) 100px, 120px"
                    />
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// ========================
// Main Component Wrapper
// ========================
export default function CategoryGridSection({
  categoriesData,
}: CategoryGridProps) {
  if (!categoriesData || Object.keys(categoriesData).length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* প্রতিটি ক্যাটাগরি একটির নিচে একটি বসবে (ফুল উইথ) */}
      <div className="flex flex-col gap-10 md:gap-14">
        {Object.entries(categoriesData).map(([categoryTitle, newsList]) => (
          <CategoryBlock
            key={categoryTitle}
            categoryTitle={categoryTitle}
            newsList={newsList}
          />
        ))}
      </div>
    </section>
  );
}
