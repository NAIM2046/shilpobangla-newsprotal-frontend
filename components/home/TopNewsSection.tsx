// src/components/home/TopNewsSection.tsx
import Image from "next/image";
import Link from "next/link";
import AdBanner, { AdData } from "@/components/shared/AdBanner";
import { NewsItem } from "@/types/news.type";

// ========================
// ডামি বিজ্ঞাপন ডেটা (ওপরের এবং নিচের ব্যানার)
// ========================
const mockTopAd: AdData = {
  isActive: true,
  adType: "IMAGE",
  imageUrl:
    "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?q=80&w=1471&auto=format&fit=crop",
  targetUrl: "#",
};

const mockBottomAd: AdData = {
  isActive: true,
  adType: "IMAGE",
  imageUrl:
    "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1470&auto=format&fit=crop",
  targetUrl: "#",
};

// ========================
// Reusable Components
// ========================

// ছবির ওপর টেক্সটসহ কার্ড (টপ নিউজের জন্য)
const TopNewsCard = ({ news }: { news: NewsItem }) => (
  <Link
    href={`/news/${news.slug}`} // 🌟 id এর বদলে slug
    className="block relative w-full aspect-[4/3] group overflow-hidden bg-gray-200"
  >
    <Image
      src={news.image}
      alt={news.title}
      fill
      className="object-cover transition-transform duration-500 group-hover:scale-105"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
    <div className="absolute bottom-0 left-0 p-3 w-full">
      <h2 className="text-white font-medium text-xs md:text-sm leading-snug group-hover:text-red-400 transition-colors line-clamp-2">
        {news.title}
      </h2>
    </div>
  </Link>
);

// সাইডবারের ছোট লিস্ট আইটেম (থাম্বনেইল + টেক্সট)
const SidebarListItem = ({ news }: { news: NewsItem }) => (
  <Link
    href={`/news/${news.slug}`} // 🌟 id এর বদলে slug
    className="flex items-center gap-3 group border-b border-gray-100 last:border-0 pb-2 last:pb-0"
  >
    <div className="relative w-12 h-8 flex-shrink-0 bg-gray-200 overflow-hidden">
      <Image src={news.image} alt={news.title} fill className="object-cover" />
    </div>
    <h3 className="text-[11px] md:text-xs font-medium text-gray-700 line-clamp-2 group-hover:text-red-600 transition-colors">
      {news.title}
    </h3>
  </Link>
);

// ========================
// Props Interface (🌟 আপডেট করা হলো)
// ========================
interface TopNewsProps {
  topNews: NewsItem[];
  latestNews: NewsItem[];
  popularNews: NewsItem[];
  topAdData?: AdData | null;
  bottomAdData?: AdData | null;
}

// ========================
// Main Component
// ========================

export default function TopNewsSection({
  topNews = [],
  latestNews = [],
  popularNews = [],
  topAdData,
  bottomAdData,
}: TopNewsProps) {
  // সেফটি চেক: যদি কোনো ডেটাই না থাকে, তাহলে সেকশনটি রেন্ডার হবে না
  if (!topNews.length && !latestNews.length && !popularNews.length) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* 🌟 ১. টপ নিউজের ওপরের বিজ্ঞাপন (Top Banner Ad) */}
      <div className="mb-6">
        <AdBanner variant="HOME_BANNER_WIDE" adData={topAdData || mockTopAd} />
      </div>

      {/* ২. ফুল উইডথ কালো হেডার */}
      <div className="mb-6 border-b border-[#0f4c81] pb-2">
        <h2 className="text-xl md:text-2xl font-bold text-[#0f4c81] pl-3 border-l-[4px] border-[#0f4c81] leading-none">
          টপ নিউজ
        </h2>
      </div>

      {/* ৩. মেইন গ্রিড লেআউট */}
      <div className="mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          {/* বাম দিকের ৪ কলাম: ৮টি কার্ডের গ্রিড */}
          <div className="lg:col-span-4 grid grid-cols-2 md:grid-cols-4 gap-4">
            {topNews.map((news) => (
              <TopNewsCard key={news.id} news={news} />
            ))}
          </div>

          {/* ডান দিকের ১ কলাম: সাইডবার (সর্বশেষ ও জনপ্রিয়) */}
          <div className="lg:col-span-1 flex flex-col gap-6">
            {/* সর্বশেষ খবর */}
            {latestNews.length > 0 && (
              <div className="border border-gray-200 bg-white">
                <div className="bg-[#1e1e1e] text-white text-center py-2 text-sm font-bold">
                  সর্বশেষ
                </div>
                <div className="flex flex-col p-3 gap-3">
                  {latestNews.map((news) => (
                    <SidebarListItem key={`latest-${news.id}`} news={news} />
                  ))}
                </div>
              </div>
            )}

            {/* জনপ্রিয় খবর */}
            {popularNews.length > 0 && (
              <div className="border border-gray-200 bg-white">
                <div className="bg-[#1e1e1e] text-white text-center py-2 text-sm font-bold">
                  জনপ্রিয়
                </div>
                <div className="flex flex-col p-3 gap-3">
                  {popularNews.map((news) => (
                    <SidebarListItem key={`popular-${news.id}`} news={news} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 🌟 ৪. টপ নিউজের নিচের বিজ্ঞাপন (Bottom Banner Ad) */}
      <div>
        <AdBanner
          variant="HOME_BANNER_WIDE"
          adData={bottomAdData || mockBottomAd}
        />
      </div>
    </section>
  );
}
