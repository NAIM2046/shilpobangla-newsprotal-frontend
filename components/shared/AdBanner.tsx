// src/components/shared/AdBanner.tsx
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

// 🌟 ১. বিজ্ঞাপনের বিভিন্ন ভেরিয়েন্ট বা লেআউট
export type AdVariant =
  | "HERO_RIGHT_TALL" // হিরো সেকশনের লম্বা ব্যানার
  | "HOME_BANNER_WIDE" // হোমপেজের মাঝের বড় ব্যানার
  | "SIDEBAR_SQUARE" // সাইডবারের ছোট স্কয়ার
  | "CATEGORY_STRIP"; // ক্যাটাগরি ব্লকের নিচে চিকন

// 🌟 ২. API থেকে আসা বিজ্ঞাপনের ডেটার টাইপ
export interface AdData {
  isActive: boolean;
  adType: "IMAGE" | "SCRIPT";
  imageUrl?: string;
  targetUrl?: string;
  scriptCode?: string;
}

// 🌟 ৩. কম্পোনেন্টের প্রপস
interface AdBannerProps {
  variant: AdVariant;
  adData?: AdData | null; // API থেকে ডেটা আসবে
  className?: string; // কাস্টম স্টাইলের জন্য
}

export default function AdBanner({
  variant,
  adData,
  className,
}: AdBannerProps) {
  // ১. যদি ডেটা না থাকে বা অ্যাডমিন প্যানেল থেকে অ্যাড বন্ধ (isActive: false) থাকে
  if (!adData || !adData.isActive) {
    return null; // কিছুই দেখাবে না, জায়গাটা ফাঁকা হয়ে যাবে!
  }

  // 🌟 ভেরিয়েন্ট অনুযায়ী আকার এবং অ্যাসপেক্ট রেশিও (Responsive classes সহ)
  const variantStyles: Record<AdVariant, string> = {
    HERO_RIGHT_TALL: "w-full h-[250px] md:h-[300px] lg:h-[350px] aspect-[2/3]",
    HOME_BANNER_WIDE:
      "w-full aspect-[8/1] md:aspect-[4/1] h-[100px] md:h-[150px]",
    SIDEBAR_SQUARE: "w-[300px] h-[250px] aspect-square mx-auto",
    CATEGORY_STRIP: "w-full aspect-[8/1] h-[60px] md:h-[90px]",
  };

  // ২. 🌟 যদি লোকাল অ্যাড (IMAGE) হয়
  if (adData.adType === "IMAGE" && adData.imageUrl) {
    const AdImage = (
      <div
        className={cn(
          "relative bg-slate-50 border border-slate-200 overflow-hidden flex items-center justify-center transition-all",
          variantStyles[variant],
          className,
        )}
      >
        <Image
          src={adData.imageUrl}
          alt="Advertisement"
          fill
          className="object-cover"
          // 🌟 sizes যুক্ত করা হলো যাতে পারফরম্যান্স ওয়ার্নিং না আসে
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/* 'বিজ্ঞাপন' লেখা ব্যাজ */}
        <div className="absolute top-0 right-0 bg-white/90 px-2 py-0.5 text-[10px] font-medium text-slate-500 rounded-bl border-l border-b border-slate-200 z-10">
          বিজ্ঞাপন
        </div>
      </div>
    );

    return adData.targetUrl ? (
      <Link
        href={adData.targetUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full"
      >
        {AdImage}
      </Link>
    ) : (
      AdImage
    );
  }

  // ৩. 🌟 যদি গুগল অ্যাডসেন্স (SCRIPT) হয়
  if (adData.adType === "SCRIPT" && adData.scriptCode) {
    return (
      <div
        className={cn(
          "w-full overflow-hidden flex justify-center items-center bg-slate-50 border border-slate-200 relative",
          variantStyles[variant],
          className,
        )}
      >
        {/* স্ক্রিপ্ট অ্যাডের ক্ষেত্রেও 'বিজ্ঞাপন' ব্যাজটি রাখছি যাতে প্রফেশনাল লাগে */}
        <div className="absolute top-0 right-0 bg-white/90 px-2 py-0.5 text-[10px] font-medium text-slate-500 rounded-bl border-l border-b border-slate-200 z-10">
          বিজ্ঞাপন
        </div>

        {/* React এ সরাসরি HTML/Script রেন্ডার করার নিয়ম */}
        <div
          className="w-full h-full flex items-center justify-center"
          dangerouslySetInnerHTML={{ __html: adData.scriptCode }}
        />
      </div>
    );
  }

  // কোনো কন্ডিশন ম্যাচ না করলে (ফেলসেফ)
  return null;
}
