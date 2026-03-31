// src/components/home/CategoryBlocksSection.tsx
import Image from "next/image";
import Link from "next/link";
import { NewsItem } from "@/types/news.type";

interface CategoryBlocksProps {
  categoriesData: {
    [key: string]: NewsItem[];
  };
}

// একটি নির্দিষ্ট ক্যাটাগরি ব্লকের ডিজাইন (ক্যাম্পাস, স্বাস্থ্য ইত্যাদি)
const CategoryBlock = ({
  title,
  newsList,
}: {
  title: string;
  newsList: NewsItem[];
}) => {
  if (!newsList || newsList.length === 0) return null;

  const leadNews = newsList[0];
  const listNews = newsList.slice(1, 3); // নিচের ২টা ছোট নিউজ

  return (
    <div className="border bg-white flex flex-col h-full">
      {/* ক্যাটাগরি হেডার */}
      <div className="bg-[#111] text-white text-center py-2 font-bold text-lg">
        {title}
      </div>

      <div className="flex flex-col gap-3 p-3 flex-grow">
        {/* বড় লিড নিউজ */}
        <Link
          href={`/news/${leadNews.slug}`}
          className="relative w-full aspect-[4/3] group overflow-hidden bg-gray-200"
        >
          <Image
            src={leadNews.image}
            alt={leadNews.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 p-3 w-full">
            <h3 className="text-white font-medium text-sm leading-snug group-hover:text-red-400 transition-colors line-clamp-2">
              {leadNews.title}
            </h3>
          </div>
        </Link>

        {/* ছোট লিস্ট নিউজ */}
        <div className="flex flex-col gap-3 pt-2">
          {listNews.map((news) => (
            <Link
              key={news.id}
              href={`/news/${news.slug}`}
              className="flex gap-3 group border-t border-gray-100 pt-3"
            >
              <div className="relative w-20 h-14 flex-shrink-0 bg-gray-200">
                <Image
                  src={news.image}
                  alt={news.title}
                  fill
                  className="object-cover"
                />
              </div>
              <h4 className="text-xs md:text-sm font-medium text-gray-800 line-clamp-2 group-hover:text-red-600 transition-colors">
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
  // অবজেক্ট থেকে ক্যাটাগরির নামগুলো বের করে নিচ্ছি
  const categoryNames = Object.keys(categoriesData);

  if (categoryNames.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* 3 Columns Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
