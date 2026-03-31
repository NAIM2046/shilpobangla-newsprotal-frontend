// src/components/home/CategoryGridSection.tsx
import { NewsItem } from "@/types/news.type";
import Image from "next/image";
import Link from "next/link";

// =======================
// Types & Props
// ========================

interface CategoryGridProps {
  // ব্যাকএন্ড থেকে আসা categories অবজেক্ট রিসিভ করার জন্য
  categoriesData: Record<string, NewsItem[]>;
}

// ========================
// Reusable Component
// ========================

// প্রতিটি নির্দিষ্ট ক্যাটাগরি ব্লক (১টি বড় + ৪টি ছোট নিউজের লেআউট)
const CategoryBlock = ({
  categoryTitle,
  newsList,
}: {
  categoryTitle: string;
  newsList: NewsItem[];
}) => {
  // যদি কোনো ক্যাটাগরিতে খবর না থাকে, তবে সেটি রেন্ডার হবে না
  if (!newsList || newsList.length === 0) return null;

  const featuredNews = newsList[0]; // ১ম খবরটি বড়
  const gridNews = newsList.slice(1, 5); // বাকি ৪টি খবর ছোট গ্রিডে

  return (
    <div className="w-full flex flex-col mb-6">
      {/* ক্যাটাগরি হেডার (কালো ব্যাকগ্রাউন্ড, সাদা লেখা) */}
      <div className="mb-6 border-b border-[#0f4c81] pb-2">
        <h2 className="text-xl md:text-2xl font-bold text-[#0f4c81] pl-3 border-l-[4px] border-[#0f4c81] leading-none">
          {categoryTitle}
        </h2>
      </div>

      {/* খবরের লেআউট (মাঝখানে ১ পিক্সেলের ফাঁকা জায়গা) */}
      <div className="flex gap-1 h-[250px] md:h-[300px] lg:h-[350px]">
        {/* বাম দিকের বড় খবর (৫০% জায়গা) */}
        {featuredNews && (
          <Link
            href={`/news/${featuredNews.id}`}
            className="relative w-1/2 h-full group overflow-hidden bg-gray-200"
          >
            <Image
              src={featuredNews.image}
              alt={featuredNews.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            <div className="absolute bottom-0 left-0 w-full p-3">
              <h3 className="text-white font-semibold text-sm md:text-base leading-snug group-hover:text-red-400 transition-colors line-clamp-3">
                {featuredNews.title}
              </h3>
            </div>
          </Link>
        )}

        {/* ডান দিকের ছোট খবরের গ্রিড (৫০% জায়গা, ২x২ লেআউট) */}
        {gridNews.length > 0 && (
          <div className="w-1/2 grid grid-cols-2 gap-1 h-full">
            {gridNews.map((news) => (
              <Link
                key={news.id}
                href={`/news/${news.id}`}
                className="relative w-full h-full group overflow-hidden bg-gray-200"
              >
                <Image
                  src={news.image}
                  alt={news.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 w-full p-2">
                  <h3 className="text-white font-medium text-[10px] md:text-[12px] leading-tight group-hover:text-red-400 transition-colors line-clamp-3">
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
  // যদি API থেকে ডেটা না আসে বা null থাকে
  if (!categoriesData || Object.keys(categoriesData).length === 0) {
    return null;
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      {/* মেইন গ্রিড: ডেস্কটপে ২ কলাম (পাশাপাশি ২টা ক্যাটাগরি বসবে) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
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
