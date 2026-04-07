// src/components/home/TopNewsSection.tsx
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { NewsItem } from "@/types/news.type";

// ========================
// TopNewsCard
// ========================
const TopNewsCard = ({ news }: { news: NewsItem }) => (
  <Link
    href={`/news/${news.slug}`}
    className="block relative w-full aspect-[4/3] group overflow-hidden bg-[#1a1a2e]"
  >
    <Image
      src={news.image}
      alt={news.title}
      fill
      className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
      sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
    />
    {/* Gradient */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent" />
    {/* Left red bar on hover */}
    <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#C0392B] scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-bottom" />
    <div className="absolute bottom-0 left-0 p-2.5 w-full">
      <h2 className="text-white font-semibold text-xs md:text-sm leading-snug group-hover:text-[#F5C6C0] transition-colors line-clamp-2">
        {news.title}
      </h2>
    </div>
  </Link>
);

// ========================
// SidebarListItem
// ========================
const SidebarListItem = ({
  news,
  index,
}: {
  news: NewsItem;
  index: number;
}) => (
  <Link
    href={`/news/${news.slug}`}
    className="flex items-center gap-2.5 group py-2 border-b border-[#F0EDE7] last:border-0 last:pb-0"
  >
    {/* Rank number */}
    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#C0392B] text-white text-[10px] font-bold flex items-center justify-center">
      {index + 1}
    </span>
    <div className="flex-shrink-0 overflow-hidden rounded-sm bg-[#E8E4DC]">
      <Image
        src={news.image}
        alt={news.title}
        width={52}
        height={36}
        className="object-cover w-[52px] h-[36px]"
      />
    </div>
    <h3 className="text-[11px] md:text-xs font-semibold text-[#1a1a2e] line-clamp-2 leading-snug group-hover:text-[#C0392B] transition-colors">
      {news.title}
    </h3>
  </Link>
);

// ========================
// SidebarPanel
// ========================
const SidebarPanel = ({
  label,
  news,
  prefix,
}: {
  label: string;
  news: NewsItem[];
  prefix: string;
}) => (
  <div className="border border-[#E8E4DC] bg-white overflow-hidden shadow-sm">
    {/* Header */}
    <div className="flex items-center justify-between px-4 py-2.5 bg-[#1a1a2e]">
      <div className="flex items-center gap-2">
        <span className="w-1.5 h-4 rounded-full bg-[#C0392B]" />
        <span className="text-white text-sm font-bold tracking-wide">
          {label}
        </span>
      </div>
      <ChevronRight className="w-4 h-4 text-white/40" />
    </div>
    {/* Items */}
    <div className="flex flex-col px-3 py-2">
      {news.map((item, i) => (
        <SidebarListItem key={`${prefix}-${item.id}`} news={item} index={i} />
      ))}
    </div>
  </div>
);

// ========================
// Props
// ========================
interface TopNewsProps {
  topNews: NewsItem[];
  latestNews: NewsItem[];
  popularNews: NewsItem[];
}

// ========================
// Main Component
// ========================
export default function TopNewsSection({
  topNews = [],
  latestNews = [],
  popularNews = [],
}: TopNewsProps) {
  if (!topNews.length && !latestNews.length && !popularNews.length) return null;

  return (
    <section className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-6 md:py-8">
      {/* Section header */}
      <div className="flex items-center gap-3 mb-5 pb-3 border-b border-[#E8E4DC]">
        <div className="w-1 h-6 bg-[#C0392B] rounded-full" />
        <h2 className="text-lg md:text-xl font-extrabold text-[#0F0E0A] tracking-tight">
          টপ নিউজ
        </h2>
        <div className="flex-1 h-px bg-gradient-to-r from-[#E8E4DC] to-transparent" />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {/* Left: 4-col news grid */}
        <div className="lg:col-span-4 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {topNews.map((news) => (
            <TopNewsCard key={news.id} news={news} />
          ))}
        </div>

        {/* Right: sidebar panels */}
        <div className="lg:col-span-1 flex flex-col gap-4">
          {latestNews.length > 0 && (
            <SidebarPanel label="সর্বশেষ" news={latestNews} prefix="latest" />
          )}
          {popularNews.length > 0 && (
            <SidebarPanel
              label="জনপ্রিয়"
              news={popularNews}
              prefix="popular"
            />
          )}
        </div>
      </div>
    </section>
  );
}
