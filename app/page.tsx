// src/app/page.tsx
import HeroSection from "@/components/home/HeroSection";
import TopNewsSection from "@/components/home/TopNewsSection";
import CategoryGridSection from "@/components/home/CategoryGridSection";
import { HomePageData } from "@/types/news.type";
import PhotoGallerySection from "@/components/home/PhotoGallerySection";
import CategoryBlocksSection from "@/components/home/CategoryBlocksSection";
import { getHomePageData } from "@/actions/home.actions";

// ==========================================
// সরাসরি ডামি ডেটা (API Response-এর মতো হুবহু)
// ==========================================
const mockHomePageData: HomePageData = {
  heroSection: {
    leadNews: {
      id: "h1",
      title: "প্রধান উপদেষ্টার সাথে রাজনৈতিক দলের সংলাপ শুরু",
      image:
        "https://images.unsplash.com/photo-1526470608268-f674ce90ebd4?q=80&w=1374&auto=format&fit=crop",
      slug: "political-dialogue-starts",
    },
    sideNews: [
      {
        id: "h2",
        title: "নতুন শিক্ষাক্রমে ফিরছে পরীক্ষা পদ্ধতি",
        image:
          "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1422&auto=format&fit=crop",
        slug: "new-education-system",
      },
      {
        id: "h3",
        title: "শেয়ারবাজারে বড় উত্থান, বিনিয়োগকারীদের স্বস্তি",
        image:
          "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1374&auto=format&fit=crop",
        slug: "stock-market-rise",
      },
      {
        id: "h4",
        title: "শেয়ারবাজারে বড় উত্থান, বিনিয়োগকারীদের স্বস্তি",
        image:
          "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1374&auto=format&fit=crop",
        slug: "stock-market-rise",
      },
    ],
    opinions: [
      {
        id: "o1",
        title: "অর্থনৈতিক সংস্কার: কতদূর এগোলো বাংলাদেশ?",
        image:
          "https://images.unsplash.com/photo-1554284126-aa88f22d8b74?q=80&w=1518&auto=format&fit=crop",
        slug: "economic-reforms",
      },
    ],
  },

  // ৮টি টপ নিউজ
  topNews: [
    {
      id: "t1",
      title: "ভারত-পাকিস্তান যুদ্ধবিরতিতে রাজি: ট্রাম্প",
      image:
        "https://images.unsplash.com/photo-1580128660010-fd027e1e587a?q=80&w=1470&auto=format&fit=crop",
      slug: "india-pak-ceasefire",
    },
    {
      id: "t2",
      title: "দক্ষিণ কোরিয়ার অভিশংসিত প্রেসিডেন্ট ইউন সুক ইয়ল গ্রেফতার",
      image:
        "https://images.unsplash.com/photo-1520697830682-89811ebb5492?q=80&w=1470&auto=format&fit=crop",
      slug: "sk-president-arrested",
    },
    {
      id: "t3",
      title: "বাংলাদেশি চারটি টিভির ইউটিউব চ্যানেল ভারতে ব্লক",
      image:
        "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1374&auto=format&fit=crop",
      slug: "bd-tv-blocked-in-india",
    },
    {
      id: "t4",
      title: "আওয়ামী লীগ নিষিদ্ধের ঘোষণাপত্র না আসায় 'মার্চ টু যমুনা' ঘোষণা",
      image:
        "https://images.unsplash.com/photo-1526470608268-f674ce90ebd4?q=80&w=1374&auto=format&fit=crop",
      slug: "march-to-jamuna",
    },
    {
      id: "t5",
      title: "যুক্তরাষ্ট্র-মেক্সিকো সীমান্তে সেনা মোতায়েনের নির্দেশ ট্রাম্পের",
      image:
        "https://images.unsplash.com/photo-1554284126-aa88f22d8b74?q=80&w=1518&auto=format&fit=crop",
      slug: "us-mexico-border-army",
    },
    {
      id: "t6",
      title: "বাংলাদেশ নিয়ে আমেরিকার সঙ্গে কথা হয়েছে: জয়শঙ্কর",
      image:
        "https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?q=80&w=1447&auto=format&fit=crop",
      slug: "jaishankar-on-bd",
    },
    {
      id: "t7",
      title:
        "ট্রাম্পের কঠোর অভিবাসন নীতি: আশ্রয় আবেদন বাতিল ও সীমান্তে জরুরি অবস্থা",
      image:
        "https://images.unsplash.com/photo-1506869640319-fe1a24fd76dc?q=80&w=1470&auto=format&fit=crop",
      slug: "trump-immigration-policy",
    },
    {
      id: "t8",
      title: "চীনের ওপর ১০ শতাংশ শুল্ক, ৫শ বিলিয়ন ডলারের এআই কোম্পানির ঘোষণা",
      image:
        "https://images.unsplash.com/photo-1542385151-efd9000785a0?q=80&w=1470&auto=format&fit=crop",
      slug: "china-tariff-ai-company",
    },
  ],

  // সাইডবারের সর্বশেষ খবর
  latestNews: [
    {
      id: "l1",
      title: "চট্টগ্রামের ঐতিহাসিক জাহাঙ্গীর মঞ্জিল এক পলকে",
      image:
        "https://images.unsplash.com/photo-1577083551141-888bb1b8bb18?q=80&w=1470&auto=format&fit=crop",
      slug: "chittagong-jahangir-manzil",
    },
    {
      id: "l2",
      title: "আলোকচিত্রের মাধ্যমে সমাজের সব খবর উঠে আসে",
      image:
        "https://images.unsplash.com/photo-1516331138075-f3adc1e149cd?q=80&w=1473&auto=format&fit=crop",
      slug: "photography-news",
    },
    {
      id: "l3",
      title: "র‍্যাবের প্রেস-ব্রিফিংয়ে বলা হয়েছে ৫ দফা দাবি",
      image:
        "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?q=80&w=1470&auto=format&fit=crop",
      slug: "rab-press-briefing",
    },
    {
      id: "l4",
      title: "অন্ধকার থেকে আলোতে ফেরার গল্প",
      image:
        "https://images.unsplash.com/photo-1494832515307-f9d2dc5b4dc1?q=80&w=1470&auto=format&fit=crop",
      slug: "story-of-light",
    },
  ],

  // সাইডবারের জনপ্রিয় খবর
  popularNews: [
    {
      id: "p1",
      title: "শীতের তীব্রতা বাড়তে পারে: আবহাওয়া অফিস",
      image:
        "https://images.unsplash.com/photo-1519817650390-64a93db51149?q=80&w=1470&auto=format&fit=crop",
      slug: "winter-forecast",
    },
    {
      id: "p2",
      title: "যানজট নিরসনে নতুন মেগাপ্রকল্পের অনুমোদন",
      image:
        "https://images.unsplash.com/photo-1554284126-aa88f22d8b74?q=80&w=1518&auto=format&fit=crop",
      slug: "traffic-mega-project",
    },
    {
      id: "p3",
      title: "নতুন বছরে রেমিট্যান্স প্রবাহে রেকর্ড",
      image:
        "https://images.unsplash.com/photo-1526470608268-f674ce90ebd4?q=80&w=1374&auto=format&fit=crop",
      slug: "remittance-record",
    },
    {
      id: "p4",
      title: "স্মার্টফোন রপ্তানিতে বাংলাদেশের নতুন মাইলফলক",
      image:
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1470&auto=format&fit=crop",
      slug: "smartphone-export",
    },
  ],

  // ক্যাটাগরি গ্রিডের ডেটা (যেমন: জাতীয়, সারাদেশ)
  gridCategories: {
    জাতীয়: [
      {
        id: "n1",
        title: "জাতীয় সংসদে বাজেট অধিবেশন শুরু হচ্ছে আজ",
        image:
          "https://images.unsplash.com/photo-1526470608268-f674ce90ebd4?q=80&w=1374&auto=format&fit=crop",
        slug: "budget-session-starts",
      },
      {
        id: "n2",
        title: "নতুন শিক্ষাক্রমে ফিরছে পরীক্ষা পদ্ধতি",
        image:
          "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1422&auto=format&fit=crop",
        slug: "education-exam-returns",
      },
      {
        id: "n3",
        title: "শেয়ারবাজারে বড় উত্থান",
        image:
          "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1374&auto=format&fit=crop",
        slug: "stock-market-up",
      },
      {
        id: "n4",
        title: "শীতের তীব্রতা বাড়তে পারে",
        image:
          "https://images.unsplash.com/photo-1519817650390-64a93db51149?q=80&w=1470&auto=format&fit=crop",
        slug: "winter-alert",
      },
      {
        id: "n5",
        title: "মেগাপ্রকল্পের অনুমোদন",
        image:
          "https://images.unsplash.com/photo-1554284126-aa88f22d8b74?q=80&w=1518&auto=format&fit=crop",
        slug: "mega-project-approved",
      },
    ],
    সারাদেশ: [
      {
        id: "s1",
        title: "বন্যায় ক্ষতিগ্রস্তদের মাঝে ত্রাণ বিতরণ কার্যক্রম শুরু",
        image:
          "https://images.unsplash.com/photo-1580128660010-fd027e1e587a?q=80&w=1470&auto=format&fit=crop",
        slug: "flood-relief-distribution",
      },
      {
        id: "s2",
        title: "চট্টগ্রামে নতুন শিল্পাঞ্চল উদ্বোধন",
        image:
          "https://images.unsplash.com/photo-1520697830682-89811ebb5492?q=80&w=1470&auto=format&fit=crop",
        slug: "chittagong-industrial-zone",
      },
      {
        id: "s3",
        title: "রাজশাহীতে আমের বাম্পার ফলন",
        image:
          "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1374&auto=format&fit=crop",
        slug: "rajshahi-mango-production",
      },
      {
        id: "s4",
        title: "সিলেটে পর্যটকদের ঢল",
        image:
          "https://images.unsplash.com/photo-1526470608268-f674ce90ebd4?q=80&w=1374&auto=format&fit=crop",
        slug: "sylhet-tourists-rush",
      },
      {
        id: "s5",
        title: "খুলনায় নতুন বিদ্যুৎকেন্দ্র চালু",
        image:
          "https://images.unsplash.com/photo-1554284126-aa88f22d8b74?q=80&w=1518&auto=format&fit=crop",
        slug: "khulna-power-plant",
      },
    ],
  },
  blockCategories: {
    ক্যাম্পাস: [
      {
        id: "c1",
        title: "রাবির স্থগিত ভর্তি পরীক্ষার প্রাথমিক আবেদন শুরু",
        image:
          "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1470&auto=format&fit=crop",
        slug: "ru-admission",
      },
      {
        id: "c2",
        title: "ঢাবিকে সর্বজনীন বিশ্ববিদ্যালয়ে পরিণত করতে চাই",
        image:
          "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1470&auto=format&fit=crop",
        slug: "du-universal",
      },
      {
        id: "c3",
        title: "মেসে ছাত্রীর ঝুলন্ত মরদেহ উদ্ধার",
        image:
          "https://images.unsplash.com/photo-1577083551141-888bb1b8bb18?q=80&w=1470&auto=format&fit=crop",
        slug: "student-found-dead",
      },
    ],
    স্বাস্থ্য: [
      {
        id: "h1",
        title: "এইচএমপিভি ভাইরাস: বিমানবন্দরে যাত্রীদের মাস্ক পরার অনুরোধ",
        image:
          "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?q=80&w=1632&auto=format&fit=crop",
        slug: "hmpv-virus-alert",
      },
      {
        id: "h2",
        title: "স্বাস্থ্য অধিদপ্তরের ৭ নির্দেশনা জারি",
        image:
          "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1470&auto=format&fit=crop",
        slug: "health-guidelines",
      },
      {
        id: "h3",
        title: "ডেঙ্গুতে আরও ১ জনের মৃত্যু",
        image:
          "https://images.unsplash.com/photo-1584483760252-c1367f105156?q=80&w=1470&auto=format&fit=crop",
        slug: "dengue-update",
      },
    ],
  },
  photoGallery: [
    {
      id: "pg1",
      title: "রাজনৈতিক দল গঠনে সহায়তা নেওয়া জনগণকে হতাশ করবে",
      image:
        "https://images.unsplash.com/photo-1529107386315-e1c731f2ca75?q=80&w=1470&auto=format&fit=crop",
      slug: "political-party-formation",
    },
    {
      id: "pg2",
      title: "বিএনপির মহাসচিবের নিরপেক্ষ সরকারের দাবি",
      image:
        "https://images.unsplash.com/photo-1555848962-6e79363ec58f?q=80&w=1447&auto=format&fit=crop",
      slug: "bnp-demand",
    },
    {
      id: "pg3",
      title: "ব্যাংক ঋণ সংকট উত্তরণের উপায়",
      image:
        "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1374&auto=format&fit=crop",
      slug: "bank-loan-crisis",
    },
    {
      id: "pg4",
      title: "বিসিএস আবেদনের সময় বাড়ল",
      image:
        "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1470&auto=format&fit=crop",
      slug: "bcs-application-extend",
    },
    {
      id: "pg5",
      title: "অন্তর্বর্তী সরকারের প্রতিনিধি রেখে কমিশন গঠন",
      image:
        "https://images.unsplash.com/photo-1554284126-aa88f22d8b74?q=80&w=1518&auto=format&fit=crop",
      slug: "interim-govt-commission",
    },
  ],
};

// ==========================================
// Main Page Component
// ==========================================
export default async function Home() {
  const homePageData = await getHomePageData();

  if (!homePageData) {
    return <div>Failed to load homepage data</div>;
  }

  return (
    <main className="min-h-screen bg-gray-50 pb-10">
      {/* হিরো সেকশন */}
      <HeroSection heroData={homePageData.heroSection} />

      {/* টপ নিউজ সেকশন */}
      <TopNewsSection
        topNews={homePageData.topNews}
        latestNews={homePageData.latestNews}
        popularNews={homePageData.popularNews}
      />

      {/* ক্যাটাগরি গ্রিড সেকশন */}
      <CategoryGridSection categoriesData={homePageData.gridCategories} />
      {/* ৪. ফটো গ্যালারি সেকশন */}
      <PhotoGallerySection photos={homePageData.photoGallery} />

      {/* ৫. নতুন ক্যাটাগরি ব্লক (ক্যাম্পাস, স্বাস্থ্য) */}
      <CategoryBlocksSection categoriesData={homePageData.blockCategories} />
    </main>
  );
}
