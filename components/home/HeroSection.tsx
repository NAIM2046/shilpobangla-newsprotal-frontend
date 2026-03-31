import Image from "next/image";
import Link from "next/link";
import { PlayCircle } from "lucide-react";
import AdBanner, { AdData } from "@/components/shared/AdBanner";
import { NewsItem } from "@/types/news.type"; // আপনার পাথ অনুযায়ী ঠিক রাখবেন
// VideoItem টাইপটি যদি types এ থাকে তবে ইমপোর্ট করতে পারেন, নাহলে নিচে ইন্টারফেসে ডিফাইন করা আছে

// ==========================================
// ডামি ডেটা
// ==========================================
// 🌟 হার্ডকোডেড ইউটিউব লিস্ট মুছে ফেলা হয়েছে!

const mockHeroAd: AdData = {
  isActive: true,
  adType: "IMAGE",
  imageUrl:
    "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?q=80&w=1471&auto=format&fit=crop",
  targetUrl: "#",
};

// ==========================================
// Reusable Component
// ==========================================

const ImageOverlayCard = ({
  news,
  isLead = false,
}: {
  news: NewsItem;
  isLead?: boolean;
}) => {
  if (!news) return null; // সেফটি চেক

  return (
    <Link
      href={`/news/${news.slug}`} // 🌟 id এর বদলে slug ব্যবহার করা হলো
      className="block relative w-full h-full group overflow-hidden bg-gray-200"
    >
      <Image
        src={news.image}
        alt={news.title}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
      <div className="absolute bottom-0 left-0 p-3 md:p-4 w-full">
        <h2
          className={`text-white font-bold leading-snug group-hover:text-red-400 transition-colors ${
            isLead ? "text-xl md:text-3xl" : "text-sm md:text-base"
          }`}
        >
          {news.title}
        </h2>
      </div>
    </Link>
  );
};

// ==========================================
// Types & Main Component
// ==========================================

interface HeroSectionProps {
  heroData?: {
    leadNews: NewsItem;
    sideNews: NewsItem[];
    opinions: NewsItem[];
    youtube: {
      id: string;
      title: string;
      slug: string;
      youtubeUrl: string;
      videoId: string;
      thumbnailUrl: string; // 🌟 ব্যাকএন্ডের সাথে মিল রেখে thumbnailUrl করা হলো
    }[];
  };
  adData?: AdData | null;
}

export default function HeroSection({ heroData, adData }: HeroSectionProps) {
  // যদি API থেকে ডেটা না আসে তবে সেকশনটি রেন্ডার হবে না
  if (!heroData) return null;

  const { leadNews, sideNews, opinions, youtube } = heroData;

  // sideNews অ্যারে থেকে খবরগুলো আলাদা করে নিচ্ছি
  const topLeftNews = sideNews[0];
  const bottomCenterNews1 = sideNews[1];
  const bottomCenterNews2 = sideNews[2];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex flex-col gap-4">
        {/* =======================
            ১ম সারি (Top Row)
        ======================= */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-auto md:h-[300px] lg:h-[350px]">
          {/* ১. বাম দিকের খবর (1 Col) */}
          <div className="h-[200px] md:h-full">
            {topLeftNews && <ImageOverlayCard news={topLeftNews} />}
          </div>

          {/* ২. মাঝের বড় লিড নিউজ (2 Cols) */}
          <div className="h-[250px] md:h-full md:col-span-2">
            {leadNews && <ImageOverlayCard news={leadNews} isLead={true} />}
          </div>

          {/* ৩. ডান দিকের বিজ্ঞাপন (1 Col) */}
          <div className="hidden md:block h-full w-full">
            <AdBanner variant="HERO_RIGHT_TALL" adData={adData || mockHeroAd} />
          </div>
        </div>

        {/* =======================
            ২য় সারি (Bottom Row)
        ======================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 h-auto lg:h-[280px]">
          {/* ১. ইউটিউব সেকশন (1 Col) */}
          <div className="border bg-white flex flex-col h-full">
            <div className="bg-red-600 text-white text-center py-2 font-bold text-lg">
              Youtube
            </div>
            <div className="flex flex-col justify-between p-3 gap-3 flex-grow overflow-hidden">
              {youtube?.map((item) => (
                <Link
                  key={item.id}
                  href={item.youtubeUrl} // 🌟 id এর বদলে slug করা হলো এস.ই.ও এর জন্য
                  className="flex items-center gap-3 group"
                >
                  <div className="relative w-20 h-12 flex-shrink-0 bg-gray-200">
                    <Image
                      src={item.thumbnailUrl} // 🌟 ব্যাকএন্ডের ফিল্ড thumbnailUrl ব্যবহার করা হলো
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                      <PlayCircle className="w-5 h-5 text-white opacity-80 group-hover:opacity-100" />
                    </div>
                  </div>
                  <h3 className="text-xs font-semibold text-gray-800 line-clamp-2 group-hover:text-red-600 transition-colors">
                    {item.title}
                  </h3>
                </Link>
              ))}
            </div>
          </div>

          {/* ২. মাঝের বাম দিকের খবর (1 Col) */}
          <div className="h-[200px] lg:h-full">
            {bottomCenterNews1 && <ImageOverlayCard news={bottomCenterNews1} />}
          </div>

          {/* ৩. মাঝের ডান দিকের খবর (1 Col) */}
          <div className="h-[200px] lg:h-full">
            {bottomCenterNews2 && <ImageOverlayCard news={bottomCenterNews2} />}
          </div>

          {/* ৪. মতামত সেকশন (1 Col) */}
          <div className="border bg-white flex flex-col h-full">
            <div className="bg-[#1e1e1e] text-white text-center py-2 font-bold text-lg">
              মতামত
            </div>
            <div className="flex flex-col gap-4 p-3 flex-grow overflow-hidden">
              {opinions?.map((item) => (
                <Link
                  key={item.id}
                  href={`/opinion/${item.slug}`}
                  className="flex gap-3 group last:border-0 pb-3 last:pb-0"
                >
                  <div className="relative w-16 h-16 flex-shrink-0 bg-gray-200 rounded-full overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex items-center">
                    <h3 className="text-sm font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-3">
                      {item.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
