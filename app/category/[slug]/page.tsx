import Image from "next/image";
import Link from "next/link";

// ==========================================
// ডামি ডেটা (পরে ব্যাকএন্ড থেকে আসবে)
// ==========================================
const mockCategoryData = {
  name: "জাতীয়",
  subCategories: ["রাজধানীর খবর", "জাতীয় সংসদ", "চট্টগ্রামের খবর"],
  leadNews: {
    id: "lead-1",
    slug: "depo-oil-scandal",
    title: "ডিপো থেকে বরাদ্দকৃত তেল বাইরে বিক্রির অভিযোগ, সরবরাহ বন্ধ",
    excerpt:
      "কৃষকদের জন্য বরাদ্দ ৩ হাজার লিটার ডিজেল বাইরে বিক্রি করায় বাগেরহাটের অগ্রণী ট্রেডার্সে তেল প্রদান সাময়িকভাবে বন্ধ করে দিয়েছে...",
    image:
      "https://images.unsplash.com/photo-1550291652-6ea9114a47b1?q=80&w=1470&auto=format&fit=crop",
  },
  newsList: [
    {
      id: "news-1",
      slug: "chittagong-seminar",
      title:
        "ওজিএসবি চট্টগ্রামের সেমিনারে বিশেষজ্ঞদের সতর্কতা/নারীদের অদৃশ্য যন্ত্রণার দুই রোগ, দেরিতে শনাক্তে বাড়ছে উদ্বেগ",
      image:
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1470&auto=format&fit=crop",
    },
    {
      id: "news-2",
      slug: "july-sonod",
      title:
        "একই বিষয়ে দুই প্রস্তাব, জুলাই সনদ নিয়ে সংসদে ভিন্নমত স্পিকার ও মন্ত্রী",
      image:
        "https://images.unsplash.com/photo-1541872703-74c5e44368f9?q=80&w=1469&auto=format&fit=crop",
    },
    {
      id: "news-3",
      slug: "dc-pm-meeting",
      title: "নবনির্বাচিত জেলা প্রশাসকদের সঙ্গে প্রধানমন্ত্রীর বৈঠক",
      image:
        "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1374&auto=format&fit=crop",
    },
    {
      id: "news-4",
      slug: "bgb-oil",
      title:
        "‘তেল নেই’ বলে পাম্প বন্ধ, ভেতরে ৩৪ হাজার লিটার তেল জব্দ করলো বিজিবি",
      image:
        "https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?q=80&w=1470&auto=format&fit=crop",
    },
    {
      id: "news-5",
      slug: "dig-arrest",
      title: "সাবেক ডিআইজি আবদুল জলিল গ্রেপ্তার",
      image:
        "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=1512&auto=format&fit=crop",
    },
    {
      id: "news-6",
      slug: "police-fraud",
      title:
        "পুলিশ ও ঊর্ধ্বতন কর্মকর্তাদের ছবি ব্যবহার করে প্রতারণা, গ্রেপ্তার ১",
      image:
        "https://images.unsplash.com/photo-1555861496-faa3e8e7abea?q=80&w=1470&auto=format&fit=crop",
    },
  ],
};

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const data = mockCategoryData;

  return (
    <div className="bg-[#f4f6f8] min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 bg-white shadow-sm pb-10">
        {/* =================================
            ১. হেডার এবং সাব-ক্যাটাগরি
        ================================= */}
        <div className="pt-6 pb-2 border-b-2 border-gray-300 mb-6">
          <h1 className="text-3xl font-bold text-blue-900 mb-3">{data.name}</h1>
          <div className="flex flex-wrap items-center gap-3 text-sm font-semibold text-gray-700">
            {data.subCategories.map((sub, index) => (
              <div key={index} className="flex items-center gap-3">
                <Link href="#" className="hover:text-red-600 transition-colors">
                  {sub}
                </Link>
                {/* শেষের আইটেমের পর পাইপ (|) চিহ্ন দেখাবে না */}
                {index < data.subCategories.length - 1 && (
                  <span className="text-gray-400">|</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* =================================
            ২. লিড নিউজ (বড় খবর)
        ================================= */}
        {data.leadNews && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-b-2 border-gray-200 pb-6 mb-6">
            <div className="flex flex-col justify-center">
              <Link href={`/news/${data.leadNews.slug}`}>
                <h2 className="text-2xl md:text-3xl font-bold leading-snug mb-3 hover:text-red-600 transition-colors">
                  {data.leadNews.title}
                </h2>
              </Link>
              <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                {data.leadNews.excerpt}
              </p>
            </div>
            <Link
              href={`/news/${data.leadNews.slug}`}
              className="relative w-full h-[250px] md:h-[300px] border border-gray-200 p-1 group overflow-hidden"
            >
              <Image
                src={data.leadNews.image}
                alt={data.leadNews.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </Link>
          </div>
        )}

        {/* =================================
            ৩. খবরের গ্রিড (২ কলাম)
        ================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-0">
          {data.newsList.map((news) => (
            <div
              key={news.id}
              className="flex gap-4 border-b border-gray-200 py-4 group"
            >
              {/* বাম দিকের টেক্সট */}
              <div className="flex-1">
                <Link href={`/news/${news.slug}`}>
                  <h3 className="text-base md:text-lg font-semibold text-gray-800 leading-snug group-hover:text-red-600 transition-colors">
                    {news.title}
                  </h3>
                </Link>
              </div>

              {/* ডান দিকের থাম্বনেইল */}
              <Link
                href={`/news/${news.slug}`}
                className="relative w-[120px] h-[80px] md:w-[140px] md:h-[95px] flex-shrink-0 bg-gray-100"
              >
                <Image
                  src={news.image}
                  alt={news.title}
                  fill
                  className="object-cover"
                />
              </Link>
            </div>
          ))}
        </div>

        {/* =================================
            ৪. 'আরও দেখুন' বাটন
        ================================= */}
        <div className="flex justify-center mt-10">
          <button className="bg-[#1a4b65] text-white px-8 py-2.5 font-bold rounded hover:bg-red-600 transition-colors duration-300">
            আরও দেখুন
          </button>
        </div>
      </div>
    </div>
  );
}
