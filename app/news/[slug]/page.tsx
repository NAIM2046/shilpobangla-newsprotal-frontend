import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Clock, Eye, Share2, Tag as TagIcon, ChevronRight } from "lucide-react";
type Props = {
  params: Promise<{ slug: string }>;
};
// ==========================================
// 1. Fetch API Data Function
// ==========================================
async function getNewsDetails(slug: string) {
  // আপনার ব্যাকএন্ড URL অনুযায়ী পরিবর্তন করে নেবেন
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/news/details/${slug}`,
    {
      next: { revalidate: 60 }, // প্রতি ৬০ সেকেন্ডে ক্যাশ রিভ্যালিডেট হবে
    },
  );

  if (!res.ok) {
    return null;
  }
  const result = await res.json();
  return result.data; // আপনার sendResponse এর data অবজেক্ট
}

// ==========================================
// 2. Dynamic SEO Metadata Generation
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

  // ডেটাবেসের seoMeta JSON থেকে অথবা ডিফল্ট নিউজ ডেটা থেকে মেটাডেটা তৈরি
  const metaTitle = news.seoMeta?.meta_title || news.title;
  const metaDescription = news.excerpt || "বিস্তারিত জানতে খবরটি পড়ুন";
  const metaImage =
    news.seoMeta?.og_image || news.image || "/default-news-image.jpg";

  return {
    title: metaTitle,
    description: metaDescription,
    keywords: news.seoMeta?.keywords || [],
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      url: `https://yourwebsite.com/${news.slug}`,
      siteName: "Your News Portal Name",
      images: [
        {
          url: metaImage,
          width: 1200,
          height: 630,
          alt: news.imageAlt || news.title,
        },
      ],
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
// 3. Main Page Component
// ==========================================
export default async function NewsDetailsPage({ params }: Props) {
  const { slug } = await params;
  const news = await getNewsDetails(slug);
  console.log("Fetched news details:", news);

  if (!news) {
    return (
      <div className="min-h-screen flex items-center justify-center text-2xl font-semibold text-gray-500">
        খবরটি খুঁজে পাওয়া যায়নি!
      </div>
    );
  }

  // তারিখ ফরম্যাট ফাংশন
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
    return new Date(dateString).toLocaleDateString("bn-BD", options);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* ব্রেডক্রাম্ব */}
      <nav className="flex items-center text-sm text-gray-500 mb-6 font-medium">
        <Link href="/" className="hover:text-blue-600 transition">
          প্রচ্ছদ
        </Link>
        <ChevronRight className="w-4 h-4 mx-2 text-gray-400" />
        <Link
          href={`/category/${news.category?.slug}`}
          className="hover:text-blue-600 transition"
        >
          {news.category?.name}
        </Link>
      </nav>

      {/* মূল গ্রিড লেআউট */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* ==================== বাম পাশ: মূল খবর ==================== */}
        <div className="lg:col-span-8">
          {/* ফ্ল্যাগস (যদি ব্রেকিং বা এক্সক্লুসিভ হয়) */}
          <div className="flex gap-2 mb-3">
            {news.flags?.isBreaking && (
              <span className="bg-red-600 text-white text-xs px-2 py-1 rounded font-bold animate-pulse">
                ব্রেকিং নিউজ
              </span>
            )}
            {news.flags?.isFeatured && (
              <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded font-bold">
                বিশেষ প্রতিবেদন
              </span>
            )}
          </div>

          <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-4 text-gray-900">
            {news.title}
          </h1>

          <div className="flex flex-wrap items-center justify-between border-y border-gray-200 py-3 mb-6 text-sm text-gray-600">
            <div className="flex items-center gap-3 mb-2 sm:mb-0">
              {news.author?.avatar_url && (
                <Image
                  src={news.author.avatar_url}
                  alt={news.author.name}
                  width={30}
                  height={30}
                  className="rounded-full"
                />
              )}
              <span className="font-semibold text-gray-800">
                {news.author?.name}
              </span>
              <span className="hidden sm:inline-block text-gray-300">|</span>
              <span className="flex items-center">
                <Clock className="w-4 h-4 mr-1 text-gray-400" />
                {formatDate(news.publishedAt)}
              </span>
            </div>

            <div className="flex items-center gap-4">
              <span className="flex items-center text-blue-600 font-medium bg-blue-50 px-2 py-1 rounded">
                <Eye className="w-4 h-4 mr-1" />
                {news.engagement?.views || 0} পঠিত
              </span>
              <button className="flex items-center hover:text-blue-600 transition">
                <Share2 className="w-4 h-4 mr-1" />
                শেয়ার
              </button>
            </div>
          </div>
          {news.image && (
            <div
              className="relative w-full mb-8 bg-gray-100 rounded-xl overflow-hidden shadow-sm"
              style={{ minHeight: "500px" }} // 🌟 সরাসরি ইনলাইন স্টাইল দিয়ে হাইট ফিক্স করে দিলাম
            >
              <Image
                src={news.image}
                alt={news.imageAlt || "News Image"}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw"
                priority
              />
            </div>
          )}

          {/* খবরের বিষয়বস্তু */}
          <article
            className="prose prose-lg max-w-none text-gray-800 leading-relaxed 
                       [&>p]:mb-6 [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:mb-4 [&>h2]:mt-8
                       [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:mb-6"
            dangerouslySetInnerHTML={{ __html: news.content }}
          />

          {/* ট্যাগস */}
          {news.tags && news.tags.length > 0 && (
            <div className="mt-10 pt-6 border-t border-gray-200">
              <h3 className="text-sm font-bold text-gray-500 mb-3 flex items-center">
                <TagIcon className="w-4 h-4 mr-1" /> সংশ্লিষ্ট বিষয়:
              </h3>
              <div className="flex items-center flex-wrap gap-2">
                {news.tags.map(
                  (tag: { id: string; name: string; slug: string }) => (
                    <Link
                      key={tag.id}
                      href={`/tags/${tag.slug}`}
                      className="px-4 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-200 transition"
                    >
                      {tag.name}
                    </Link>
                  ),
                )}
              </div>
            </div>
          )}
        </div>

        {/* ==================== ডান পাশ: সর্বশেষ খবর ==================== */}
        <aside className="lg:col-span-4">
          <div className="sticky top-24 border border-gray-100 p-5 rounded-xl bg-white shadow-sm">
            <div className="flex items-center justify-between mb-5 border-b-2 border-red-600 pb-2 inline-block">
              <h2 className="text-xl font-bold text-gray-900">সর্বশেষ খবর</h2>
            </div>

            <div className="flex flex-col gap-5">
              {news.recentNews?.map((item: any) => (
                <Link
                  key={item.id}
                  href={`/news/${item.slug}`}
                  className="group flex gap-4 items-center border-b border-gray-100 pb-4 last:border-0 last:pb-0"
                >
                  <div className="shrink-0 rounded overflow-hidden bg-gray-100">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.title}
                        width={80} // 🌟 সরাসরি width দিয়ে দিলাম
                        height={80} // 🌟 সরাসরি height দিয়ে দিলাম
                        className="object-cover w-20 h-20 group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-20 h-20 flex items-center justify-center text-gray-400 text-xs">
                        No Image
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 text-sm md:text-base group-hover:text-red-600 transition-colors line-clamp-2 leading-snug">
                      {item.title}
                    </h3>
                    <span className="text-xs text-gray-500 mt-2 flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {formatDate(item.publishedAt)}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
