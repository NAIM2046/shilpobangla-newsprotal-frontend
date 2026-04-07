// src/app/news/[slug]/page.tsx (Server Component)
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Tag as TagIcon,
  ChevronRight,
  Eye,
  Clock,
  User,
  Calendar,
} from "lucide-react";
import { getNewsDetails } from "@/actions/news.actions";
import { NewsActions } from "@/components/news/NewsActions";

type Props = {
  params: Promise<{ slug: string }>;
};

// ==========================================
// 1. Fetch API Data Function & SEO
// ==========================================
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const news = await getNewsDetails(slug);

  if (!news) {
    return {
      title: "খবর পাওয়া যায়নি",
      description: "আপনি যে খবরটি খুঁজছেন তা পাওয়া যায়নি।",
    };
  }

  const metaTitle = news.seoMeta?.meta_title || news.title;
  const metaDescription = news.excerpt || "বিস্তারিত জানতে খবরটি পড়ুন";
  const metaImage =
    news.seoMeta?.og_image || news.image || "/default-news-image.jpg";

  return {
    title: metaTitle,
    description: metaDescription,
    keywords: news.seoMeta?.keywords || [],
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      url: `https://dailyshilpobangla.com/news/${news.slug}`,
      siteName: "দৈনিক শিল্পবাংলা",
      images: [
        {
          url: metaImage,
          width: 1200,
          height: 630,
          alt: news.imageAlt || news.title,
        },
      ],
      locale: "bn_BD",
      type: "article",
      publishedTime: news.publishedAt,
      authors: [news.author?.name],
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description: metaDescription,
      images: [metaImage],
    },
  };
}

// ==========================================
// 2. Main Page Component
// ==========================================
export default async function NewsDetailsPage({ params }: Props) {
  const { slug } = await params;
  const news = await getNewsDetails(slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: news.title,
    image: [
      news.image || "https://dailyshilpobangla.com/default-news-image.jpg",
    ],
    datePublished: news.publishedAt,
    dateModified: news.updatedAt || news.publishedAt,
    author: [
      {
        "@type": "Person",
        name: news.author?.name || "দৈনিক শিল্পবাংলা ডেস্ক",
        url: "https://dailyshilpobangla.com",
      },
    ],
    publisher: {
      "@type": "Organization",
      name: "Daily Shilpobangla",
      logo: {
        "@type": "ImageObject",
        url: "https://dailyshilpobangla.com/logo.png", // এখানে আপনার আসল লোগোর লিংক দিন
      },
    },
    description: news.excerpt || news.title,
  };

  if (!news) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F7F5F0]">
        <div className="text-center py-20 px-6">
          <div className="w-16 h-px bg-[#1a1a2e] mx-auto mb-6" />
          <p className="text-xl font-semibold text-[#1a1a2e] tracking-wide">
            খবরটি খুঁজে পাওয়া যায়নি!
          </p>
          <div className="w-16 h-px bg-[#1a1a2e] mx-auto mt-6" />
        </div>
      </div>
    );
  }

  // Format date function
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("bn-BD", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-[#F7F5F0]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* ── Top accent bar ── */}
      {/* <div className="h-1 w-full bg-gradient-to-r from-[#C0392B] via-[#E74C3C] to-[#C0392B]" /> */}

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* ==================== Main News Content ==================== */}
        <div className=" bg-white shadow-sm rounded-xl overflow-hidden border border-[#f8f7f4]">
          <div className="max-w-4xl mx-auto px-5 sm:px-8 lg:px-12 py-8 sm:py-10 lg:py-14">
            {/* ── Breadcrumb ── */}
            <nav className="flex items-center text-xs text-[#7A7465] mb-8 overflow-x-auto whitespace-nowrap pb-1 font-medium tracking-wider uppercase">
              <Link
                href="/"
                className="hover:text-[#C0392B] transition-colors duration-200"
              >
                হোম
              </Link>
              <ChevronRight className="w-3 h-3 mx-1.5 text-[#B5AFA5] flex-shrink-0" />
              <Link
                href={`/category/${news.category?.slug}`}
                className="hover:text-[#C0392B] transition-colors duration-200 text-[#C0392B]"
              >
                {news.category?.name}
              </Link>
            </nav>

            {/* ── Category pill ── */}
            {news.category?.name && (
              <div className="mb-4">
                <span className="inline-flex items-center gap-1.5 bg-[#C0392B] text-white text-[10px] sm:text-xs font-bold px-3 py-1 rounded-full tracking-widest uppercase">
                  {news.category.name}
                </span>
              </div>
            )}

            {/* ── News Title ── */}
            <h1
              className="text-2xl sm:text-3xl lg:text-[2rem] font-extrabold leading-[1.35] mb-5 text-[#0F0E0A] tracking-tight"
              style={{
                fontFamily: "'Hind Siliguri', 'SolaimanLipi', sans-serif",
              }}
            >
              {news.title}
            </h1>

            {/* ── Decorative rule ── */}
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px flex-1 bg-gradient-to-r from-[#C0392B] to-transparent" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#C0392B]" />
            </div>

            {/* ── Meta Info ── */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#E8E4DC] pb-5 mb-7">
              <div className="flex items-start sm:items-center gap-3">
                {/* Avatar */}
                <div className="shrink-0 mt-0.5 sm:mt-0 ring-2 ring-[#E8E4DC] ring-offset-2 ring-offset-white rounded-full">
                  {news.author?.avatar_url ? (
                    <Image
                      src={news.author.avatar_url}
                      alt={news.author.name}
                      width={44}
                      height={44}
                      className="w-10 h-10 sm:w-11 sm:h-11 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 sm:w-11 sm:h-11 bg-gradient-to-br from-[#1a1a2e] to-[#16213e] rounded-full flex items-center justify-center text-white shadow-md">
                      <User className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                  )}
                </div>

                {/* Author & date */}
                <div className="flex-1 min-w-0">
                  <span className="font-bold text-[#1a1a2e] text-sm sm:text-base block truncate">
                    {news.author?.name || "দৈনিক শিল্পবাংলা ডেস্ক"}
                  </span>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] sm:text-xs text-[#7A7465] mt-1">
                    <div className="flex items-center gap-1 whitespace-nowrap">
                      <Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#C0392B]" />
                      <span>{formatDate(news.publishedAt)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Share Buttons */}
              <NewsActions
                title={news.title}
                slug={news.slug}
                excerpt={news.excerpt || ""}
                variant="horizontal"
              />
            </div>

            {/* ── Featured Image ── */}
            {news.image && (
              <div className="relative w-full mb-7 rounded-xl overflow-hidden bg-[#E8E4DC] shadow-[0_4px_24px_0_rgba(26,26,46,0.10)]">
                <Image
                  src={news.image}
                  alt={news.imageAlt || news.title}
                  width={900}
                  height={500}
                  className="w-full h-auto object-cover"
                  priority
                />
                {news.imageAlt && (
                  <p className="text-[11px] text-[#7A7465] mt-2 mb-1 text-center italic px-4">
                    {news.imageAlt}
                  </p>
                )}
              </div>
            )}

            {/* ── Lead / Excerpt ── */}
            {news.excerpt && (
              <div className="relative bg-[#F7F5F0] border-l-[3px] border-[#C0392B] px-5 sm:px-7 py-4 sm:py-5 mb-7 rounded-r-xl">
                {/* decorative quote mark */}
                <span className="absolute -top-3 left-4 text-5xl leading-none text-[#C0392B] opacity-20 font-serif select-none">
                  &ldquo;
                </span>
                <p className="text-base sm:text-lg font-semibold text-[#1a1a2e] leading-relaxed relative z-10">
                  {news.excerpt}
                </p>
              </div>
            )}

            {/* ── News Body ── */}
            <article
              className="prose prose-sm sm:prose-base lg:prose-lg max-w-none w-full overflow-hidden
               [&_*]:!max-w-full [&_*]:!whitespace-normal [&_img]:max-w-full [&_img]:h-auto

               [&_*:not(a)]:!text-[#2C2C2C] [&_*]:!bg-transparent

               prose-headings:font-extrabold prose-headings:!text-[#0F0E0A] prose-headings:tracking-tight
               prose-h2:border-b prose-h2:border-[#E8E4DC] prose-h2:pb-2
               prose-p:!text-[#2C2C2C] prose-p:leading-[1.85]

               [&_a]:!text-[#C0392B] [&_a]:!underline [&_a]:underline-offset-2 hover:[&_a]:!text-[#96281B]

               prose-strong:!text-[#0F0E0A] prose-strong:font-bold
               prose-blockquote:border-l-[3px] prose-blockquote:border-[#C0392B] prose-blockquote:bg-[#F7F5F0] prose-blockquote:rounded-r-lg prose-blockquote:not-italic
               prose-img:rounded-xl prose-img:shadow-[0_4px_24px_0_rgba(26,26,46,0.10)]"
              dangerouslySetInnerHTML={{
                __html: news.content.replace(/&nbsp;/g, " "),
              }}
            />

            {/* ── Tags ── */}
            {news.tags && news.tags.length > 0 && (
              <div className="mt-10 pt-6 border-t border-[#E8E4DC]">
                <h3 className="text-xs font-bold text-[#7A7465] mb-3 flex items-center gap-2 uppercase tracking-widest">
                  <TagIcon className="w-3.5 h-3.5 text-[#C0392B]" />
                  সংশ্লিষ্ট বিষয়
                </h3>
                <div className="flex flex-wrap gap-2">
                  {news.tags.map(
                    (tag: { id: string; name: string; slug: string }) => (
                      <Link
                        key={tag.id}
                        href={`/tags/${tag.slug}`}
                        className="px-3 py-1.5 bg-[#F7F5F0] border border-[#E0DBD0] text-[#4A4237] rounded-full text-xs sm:text-sm font-medium hover:bg-[#C0392B] hover:text-white hover:border-[#C0392B] transition-all duration-200"
                      >
                        #{tag.name}
                      </Link>
                    ),
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ==================== Recent News Section ==================== */}
        {news.recentNews && news.recentNews.length > 0 && (
          <div className="mt-12 print:hidden">
            {/* Section header */}
            <div className="flex items-center justify-between mb-7">
              <div className="flex items-center gap-3">
                <div className="w-1 h-7 bg-[#C0392B] rounded-full" />
                <h2 className="text-xl sm:text-2xl font-extrabold text-[#0F0E0A] tracking-tight">
                  সর্বশেষ খবর
                </h2>
              </div>
              <Link
                href="/latest-news"
                className="group text-xs sm:text-sm text-[#C0392B] hover:text-[#96281B] font-semibold flex items-center gap-1 border border-[#C0392B] hover:bg-[#C0392B] hover:text-white px-3 py-1.5 rounded-full transition-all duration-200"
              >
                আরও দেখুন
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {news.recentNews.slice(0, 6).map((item: any, index: number) => (
                <Link
                  key={item.id}
                  href={`/news/${item.slug}`}
                  className="group bg-white rounded-xl overflow-hidden border border-[#E8E4DC] shadow-sm hover:shadow-[0_8px_32px_0_rgba(192,57,43,0.10)] hover:border-[#C0392B]/30 transition-all duration-300"
                >
                  {/* Image */}
                  <div className="relative w-full aspect-video overflow-hidden bg-[#E8E4DC]">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover group-hover:scale-[1.04] transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[#B5AFA5] text-sm font-medium">
                        ছবি নেই
                      </div>
                    )}
                    {/* index badge */}
                    <div className="absolute top-3 left-3 w-7 h-7 rounded-full bg-[#C0392B] text-white text-xs font-bold flex items-center justify-center shadow-md">
                      {index + 1}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4 sm:p-5">
                    <h3 className="font-bold text-[#0F0E0A] text-sm sm:text-base group-hover:text-[#C0392B] transition-colors duration-200 line-clamp-2 leading-snug mb-2">
                      {item.title}
                    </h3>
                    {item.excerpt && (
                      <p className="text-[#7A7465] text-xs sm:text-sm line-clamp-2 leading-relaxed mb-3">
                        {item.excerpt}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ── Bottom accent bar ── */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-[#E8E4DC] to-transparent mt-12" />
    </div>
  );
}
