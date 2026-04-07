// src/components/category/NewsGrid.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Loader2, ChevronDown } from "lucide-react";
import { getcategoryNews } from "@/actions/categorynews.actions";

interface NewsGridProps {
  initialNews: any[];
  slug: string;
  initialHasMore: boolean;
}

export default function NewsGrid({
  initialNews,
  slug,
  initialHasMore,
}: NewsGridProps) {
  const [newsList, setNewsList] = useState<any[]>(initialNews);
  const [page, setPage] = useState(2);
  const [hasMore, setHasMore] = useState(initialHasMore);
  const [loading, setLoading] = useState(false);

  const loadMoreNews = async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const data = await getcategoryNews(slug, page);
      if (data && data.newsList) {
        setNewsList((prev) => [...prev, ...data.newsList]);
        setHasMore(data.meta.hasMore);
        setPage((prev) => prev + 1);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Failed to load more news:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Grid header */}
      <div className="flex items-center gap-2.5 mb-4 pb-3 border-b border-[#E8E4DC]">
        <div className="w-1 h-5 bg-[#C0392B] rounded-full" />
        <h2 className="text-sm font-extrabold text-[#0F0E0A] tracking-tight uppercase">
          আরও খবর
        </h2>
      </div>

      {/* News list */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-0">
        {newsList.map((news: any, index: number) => (
          <div
            key={`${news.id}-${index}`}
            className="flex items-center gap-3 border-b border-[#F0EDE7] py-3.5 last:border-0 group"
          >
            {/* Text */}
            <div className="flex-1 min-w-0">
              <Link href={`/news/${news.slug}`}>
                <h3 className="text-sm md:text-[15px] font-semibold text-[#1a1a2e] leading-snug group-hover:text-[#C0392B] transition-colors line-clamp-2">
                  {news.title}
                </h3>
              </Link>
              <span className="text-[11px] text-[#B5AFA5] mt-1 block font-medium">
                {new Date(news.publishedAt).toLocaleDateString("bn-BD")}
              </span>
            </div>

            {/* Thumbnail */}
            <Link
              href={`/news/${news.slug}`}
              className="relative flex-shrink-0 w-[100px] h-[68px] md:w-[120px] md:h-[80px] overflow-hidden rounded-sm bg-[#E8E4DC] group-hover:opacity-90 transition-opacity"
            >
              <Image
                src={news.image || "/placeholder-news.jpg"}
                alt={news.imageAlt || news.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                sizes="120px"
              />
            </Link>
          </div>
        ))}
      </div>

      {/* Load more */}
      {hasMore && (
        <div className="flex justify-center mt-7">
          <button
            onClick={loadMoreNews}
            disabled={loading}
            className={`flex items-center gap-2 px-7 py-2.5 text-sm font-bold rounded-full border transition-all duration-200 ${
              loading
                ? "bg-[#F7F5F0] border-[#E8E4DC] text-[#B5AFA5] cursor-not-allowed"
                : "bg-white border-[#C0392B] text-[#C0392B] hover:bg-[#C0392B] hover:text-white"
            }`}
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                লোড হচ্ছে...
              </>
            ) : (
              <>
                <ChevronDown className="w-4 h-4" />
                আরও দেখুন
              </>
            )}
          </button>
        </div>
      )}
    </>
  );
}
