// src/app/category/[slug]/page.tsx
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import NewsGrid from "@/components/category/NewsGrid";
import { getcategoryNews } from "@/actions/categorynews.actions";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const categoryData = await getcategoryNews(slug, 1);

  if (!categoryData || !categoryData.category) {
    return notFound();
  }

  const { category, newsList, meta } = categoryData;

  const leadNews = newsList.length > 0 ? newsList[0] : null;
  const remainingNews = newsList.length > 1 ? newsList.slice(1) : [];

  return (
    <div className="bg-[#F7F5F0] min-h-screen">
      <div className="max-w-6xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-6 md:py-8">
        {/* ── Category header ── */}
        <div className="bg-white border border-[#E8E4DC] rounded-xl shadow-sm px-5 sm:px-6 pt-5 pb-4 mb-5">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-xs text-[#7A7465] font-medium uppercase tracking-wider mb-3">
            <Link href="/" className="hover:text-[#C0392B] transition-colors">
              হোম
            </Link>
            <ChevronRight className="w-3 h-3 text-[#B5AFA5]" />
            <span className="text-[#C0392B]">{category.name}</span>
          </nav>

          {/* Title */}
          <div className="flex items-center gap-3 mb-3">
            <div className="w-1 h-7 bg-[#C0392B] rounded-full flex-shrink-0" />
            <h1 className="text-2xl md:text-3xl font-extrabold text-[#0F0E0A] tracking-tight leading-none">
              {category.name}
            </h1>
          </div>

          {/* Sub-categories */}
          {category.children && category.children.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 mt-3 pt-3 border-t border-[#F0EDE7]">
              {category.children.map((sub: any) => (
                <Link
                  key={sub.id}
                  href={`/category/${sub.slug}`}
                  className="px-3 py-1 text-xs font-semibold text-[#4A4237] bg-[#F7F5F0] border border-[#E0DBD0] rounded-full hover:bg-[#C0392B] hover:text-white hover:border-[#C0392B] transition-all duration-200"
                >
                  {sub.name}
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* ── Lead news ── */}
        {leadNews ? (
          <div className="bg-white border border-[#E8E4DC] rounded-xl shadow-sm overflow-hidden mb-5">
            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Image */}
              <Link
                href={`/news/${leadNews.slug}`}
                className="relative block w-full h-[220px] sm:h-[280px] md:h-[320px] group overflow-hidden bg-[#1a1a2e]"
              >
                <Image
                  src={leadNews.image || "/placeholder-news.jpg"}
                  alt={leadNews.imageAlt || leadNews.title}
                  fill
                  priority
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent md:bg-none" />
                <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#C0392B] scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-bottom" />
              </Link>

              {/* Text */}
              <div className="flex flex-col justify-center px-5 sm:px-6 py-5 md:py-8">
                {leadNews.category?.name && (
                  <span className="inline-block text-[10px] font-bold uppercase tracking-widest text-[#C0392B] mb-3">
                    {leadNews.category.name}
                  </span>
                )}
                <Link href={`/news/${leadNews.slug}`}>
                  <h2 className="text-xl md:text-2xl lg:text-3xl font-extrabold text-[#0F0E0A] leading-snug hover:text-[#C0392B] transition-colors mb-3">
                    {leadNews.title}
                  </h2>
                </Link>
                {leadNews.excerpt && (
                  <p className="text-[#4A4237] text-sm md:text-base leading-relaxed line-clamp-3">
                    {leadNews.excerpt}
                  </p>
                )}
                <Link
                  href={`/news/${leadNews.slug}`}
                  className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold text-[#C0392B] hover:text-[#96281B] transition-colors"
                >
                  বিস্তারিত পড়ুন
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white border border-[#E8E4DC] rounded-xl py-14 text-center text-[#7A7465] font-medium mb-5">
            এই ক্যাটাগরিতে কোনো খবর পাওয়া যায়নি।
          </div>
        )}

        {/* ── News grid ── */}
        {remainingNews.length > 0 && (
          <div className="bg-white border border-[#E8E4DC] rounded-xl shadow-sm overflow-hidden px-4 sm:px-6 pt-5 pb-6">
            <NewsGrid
              initialNews={remainingNews}
              slug={slug}
              initialHasMore={meta.hasMore}
            />
          </div>
        )}
      </div>
    </div>
  );
}
