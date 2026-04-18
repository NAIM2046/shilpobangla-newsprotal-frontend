// src/components/home/CategoryDualSection.tsx
import { NewsItem } from "@/types/news.type";
import Image from "next/image";
import Link from "next/link";

interface CategoryDualProps {
  categoriesData: Record<string, NewsItem[]>;
}

// ==========================================
// Reusable Components
// ==========================================

const CategoryHeader = ({ title }: { title: string }) => (
  <div className="flex items-center gap-2 border-b-2 border-gray-200 pb-2 mb-4">
    <div className="w-1.5 h-5 md:h-6 bg-[#1E3A8A]" />
    <h2 className="text-[#1E3A8A] text-lg md:text-xl font-bold tracking-tight">
      {title}
    </h2>
  </div>
);

// Large Featured News for Left Category (with image and excerpt)
const LargeFeaturedNews = ({ news }: { news: NewsItem }) => (
  <div className="flex flex-col gap-3 group cursor-pointer">
    <Link
      href={`/news/${news.slug}`}
      className="relative w-full aspect-[16/9] overflow-hidden bg-gray-100 rounded-sm"
    >
      <Image
        src={news.image}
        alt={news.title}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-105"
        sizes="(max-width: 500px) 100vw, 60vw"
        priority
      />
    </Link>
    <Link href={`/news/${news.slug}`}>
      <h3 className="text-gray-900 font-bold text-lg md:text-xl lg:text-2xl leading-tight group-hover:text-[#1E3A8A] transition-colors line-clamp-3">
        {news.title}
      </h3>
    </Link>
  </div>
);

// List News with Image on LEFT (for left category right column)
const ListNewsWithImageLeft = ({ news }: { news: NewsItem }) => (
  <Link
    href={`/news/${news.slug}`}
    className="flex items-start gap-3 group border-b border-gray-100 pb-3 last:border-0 hover:bg-gray-50/50 transition-colors p-2 -m-2 rounded-lg"
  >
    <div className="relative w-[90px] md:w-[100px] aspect-[4/3] flex-shrink-0 overflow-hidden bg-gray-100 rounded-md">
      <Image
        src={news.image}
        alt={news.title}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-105"
        sizes="100px"
      />
    </div>
    <div className="flex-1">
      <h3 className="text-gray-800 font-semibold text-sm md:text-base leading-tight group-hover:text-[#1E3A8A] transition-colors line-clamp-3">
        {news.title}
      </h3>
    </div>
  </Link>
);

// List News with Image on RIGHT (for right category — matches the design in the screenshot)
const ListNewsWithImageRight = ({ news }: { news: NewsItem }) => (
  <Link
    href={`/news/${news.slug}`}
    className="flex items-start gap-3 group border-b border-gray-100 pb-3 last:border-0 hover:bg-gray-50/50 transition-colors p-2 -m-2 rounded-lg"
  >
    <div className="flex-1">
      <h3 className="text-gray-800 font-semibold text-sm md:text-base leading-tight group-hover:text-[#1E3A8A] transition-colors line-clamp-3">
        {news.title}
      </h3>
    </div>
    <div className="relative w-[80px] md:w-[90px] aspect-[4/3] flex-shrink-0 overflow-hidden bg-gray-100 rounded-md">
      <Image
        src={news.image}
        alt={news.title}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-105"
        sizes="90px"
      />
    </div>
  </Link>
);

// ==========================================
// Main Component Layout
// ==========================================

export default function CategoryDualSection({
  categoriesData,
}: CategoryDualProps) {
  if (!categoriesData || Object.keys(categoriesData).length === 0) return null;

  const entries = Object.entries(categoriesData);

  // Group categories in pairs (2 categories per row)
  const pairedCategories = [];
  for (let i = 0; i < entries.length; i += 2) {
    pairedCategories.push({
      left: entries[i], // Takes 2/3 space (large)
      right: entries[i + 1], // Takes 1/3 space (small)
    });
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 ">
      <div className="flex flex-col gap-10 md:gap-12">
        {pairedCategories.map((pair, index) => {
          // Left Category Data (Large - takes more space)
          const [leftTitle, leftNews] = pair.left;
          const leftFeatured = leftNews[0];
          const leftList = leftNews.slice(1, 5);

          // Right Category Data (Small - takes less space)
          const hasRight = pair.right;
          const rightTitle = hasRight ? pair.right[0] : null;
          const rightNews = hasRight ? pair.right[1] : [];
          // Right category: show up to 4 items, all with image on right
          const rightItems = rightNews?.slice(0, 4) || [];

          return (
            <div
              key={index}
              className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8"
            >
              {/* ============================================
                 LEFT CATEGORY - Takes 8 columns (2/3 of the row)
              ============================================ */}
              <div className="lg:col-span-8">
                <CategoryHeader title={leftTitle} />

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-4">
                  {/* Left side: Large Featured News */}
                  {leftFeatured && (
                    <div className="md:col-span-2">
                      <LargeFeaturedNews news={leftFeatured} />
                    </div>
                  )}

                  {/* Right side: List of news with images on left */}
                  {leftList.length > 0 && (
                    <div className="md:col-span-2">
                      <div className="flex flex-col gap-3">
                        {leftList.map((news) => (
                          <ListNewsWithImageLeft key={news.id} news={news} />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* ============================================
                 RIGHT CATEGORY - Takes 4 columns (1/3 of the row)
                 Each item: text on left, thumbnail on right
              ============================================ */}
              {hasRight && (
                <div className="lg:col-span-4">
                  <CategoryHeader title={rightTitle!} />

                  <div className="mt-4 flex flex-col">
                    {rightItems.map((news) => (
                      <ListNewsWithImageRight key={news.id} news={news} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
