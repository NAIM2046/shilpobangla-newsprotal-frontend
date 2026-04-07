// src/components/home/CategoryBlocksSection.tsx
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { NewsItem } from "@/types/news.type";

interface CategoryBlocksProps {
  categoriesData: {
    [key: string]: NewsItem[];
  };
}

const CategoryBlock = ({
  title,
  newsList,
}: {
  title: string;
  newsList: NewsItem[];
}) => {
  if (!newsList || newsList.length === 0) return null;

  const leadNews = newsList[0];
  const listNews = newsList.slice(1, 3);

  return (
    <div className="bg-white border border-[#E8E4DC] overflow-hidden shadow-sm flex flex-col h-full">
      {/* Category header */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#1a1a2e]">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-4 rounded-full bg-[#C0392B]" />
          <span className="text-white text-sm font-bold tracking-wide">
            {title}
          </span>
        </div>
        <Link
          href={`/category/${title}`}
          className="flex items-center gap-0.5 text-[10px] font-semibold text-white/50 hover:text-white transition-colors"
        >
          আরও
          <ChevronRight className="w-3 h-3" />
        </Link>
      </div>

      <div className="flex flex-col gap-0 flex-grow">
        {/* Lead image */}
        <Link
          href={`/news/${leadNews.slug}`}
          className="relative w-full aspect-[16/9] group overflow-hidden bg-[#1a1a2e] flex-shrink-0"
        >
          <Image
            src={leadNews.image}
            alt={leadNews.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
          <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#C0392B] scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-bottom" />
          <div className="absolute bottom-0 left-0 p-3 w-full">
            <h3 className="text-white font-bold text-sm leading-snug group-hover:text-[#F5C6C0] transition-colors line-clamp-2">
              {leadNews.title}
            </h3>
          </div>
        </Link>

        {/* Small list items */}
        <div className="flex flex-col divide-y divide-[#F0EDE7] px-3 py-1">
          {listNews.map((news) => (
            <Link
              key={news.id}
              href={`/news/${news.slug}`}
              className="flex items-center gap-3 py-2.5 group"
            >
              <div className="relative flex-shrink-0 w-[68px] h-[46px] overflow-hidden rounded-sm bg-[#E8E4DC]">
                <Image
                  src={news.image}
                  alt={news.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="68px"
                />
              </div>
              <h4 className="text-xs font-semibold text-[#1a1a2e] line-clamp-2 leading-snug group-hover:text-[#C0392B] transition-colors flex-1">
                {news.title}
              </h4>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function CategoryBlocksSection({
  categoriesData,
}: CategoryBlocksProps) {
  const categoryNames = Object.keys(categoriesData);
  if (categoryNames.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-5 md:py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
        {categoryNames.map((categoryName) => (
          <CategoryBlock
            key={categoryName}
            title={categoryName}
            newsList={categoriesData[categoryName]}
          />
        ))}
      </div>
    </section>
  );
}
