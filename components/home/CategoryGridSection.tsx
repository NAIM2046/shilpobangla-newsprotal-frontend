// src/components/home/CategoryGridSection.tsx
import { NewsItem } from "@/types/news.type";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface CategoryGridProps {
  categoriesData: Record<string, NewsItem[]>;
}

// ========================
// CategoryBlock
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
  const gridNews = newsList.slice(1, 5);

  return (
    <div className="w-full flex flex-col">
      {/* Section header */}
      <div className="flex items-center justify-between mb-3 pb-2.5 border-b border-[#E8E4DC]">
        <div className="flex items-center gap-2.5">
          <div className="w-1 h-5 bg-[#C0392B] rounded-full" />
          <h2 className="text-base md:text-lg font-extrabold text-[#0F0E0A] tracking-tight leading-none">
            {categoryTitle}
          </h2>
        </div>
        <Link
          href={`/category/${categoryTitle}`}
          className="flex items-center gap-0.5 text-[11px] font-semibold text-[#C0392B] hover:text-[#96281B] transition-colors"
        >
          আরও
          <ChevronRight className="w-3 h-3" />
        </Link>
      </div>

      {/* News layout */}
      <div className="flex gap-1 h-[220px] sm:h-[260px] md:h-[280px] lg:h-[300px]">
        {/* Left: featured (50%) */}
        {featuredNews && (
          <Link
            href={`/news/${featuredNews.slug}`}
            className="relative w-1/2 h-full group overflow-hidden bg-[#1a1a2e] flex-shrink-0"
          >
            <Image
              src={featuredNews.image}
              alt={featuredNews.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
            {/* Left red bar */}
            <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#C0392B] scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-bottom" />
            <div className="absolute bottom-0 left-0 w-full p-2.5 md:p-3">
              <h3 className="text-white font-bold text-xs md:text-sm leading-snug group-hover:text-[#F5C6C0] transition-colors line-clamp-3">
                {featuredNews.title}
              </h3>
            </div>
          </Link>
        )}

        {/* Right: 2x2 grid (50%) */}
        {gridNews.length > 0 && (
          <div className="w-1/2 grid grid-cols-2 gap-1 h-full">
            {gridNews.map((news) => (
              <Link
                key={news.id}
                href={`/news/${news.slug}`}
                className="relative w-full h-full group overflow-hidden bg-[#1a1a2e]"
              >
                <Image
                  src={news.image}
                  alt={news.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  sizes="(max-width: 768px) 25vw, 12vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-[#C0392B] scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-bottom" />
                <div className="absolute bottom-0 left-0 w-full p-1.5 md:p-2">
                  <h3 className="text-white font-semibold text-[9px] md:text-[11px] leading-tight group-hover:text-[#F5C6C0] transition-colors line-clamp-3">
                    {news.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// ========================
// Main Component
// ========================
export default function CategoryGridSection({
  categoriesData,
}: CategoryGridProps) {
  if (!categoriesData || Object.keys(categoriesData).length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-5 md:py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6 md:gap-y-8">
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
