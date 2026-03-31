// src/components/shared/LiveUpdate.tsx
import Link from "next/link";
import { Zap } from "lucide-react";
import { getLiveUpdates } from "@/actions/live-update.actions";

const LiveUpdate = async () => {
  // 🌟 ব্যাকএন্ড থেকে ডাইনামিক ডেটা নিয়ে আসছি
  const updates = await getLiveUpdates();
  console.log("Fetched live updates:", updates); // ডিবাগিং এর জন্য কনসোল লগ

  // যদি কোনো কারণে ডেটা না থাকে, তাহলে কম্পোনেন্ট রেন্ডার হবে না
  if (!updates || updates.length === 0) return null;

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto sm:px-4 md:px-6 lg:px-8">
        <div className="flex items-center h-10 md:h-12">
          {/* 🌟 Left Badge: সর্বশেষ */}
          <div className="flex items-center justify-center bg-red-600 text-white px-3 md:px-5 h-full relative z-10 shrink-0">
            <Zap size={16} className="mr-1.5 animate-pulse hidden md:block" />
            <span className="font-bangla font-semibold text-sm md:text-base tracking-wide whitespace-nowrap">
              সর্বশেষ
            </span>
            {/* একটু স্টাইলের জন্য ডানপাশে একটি অ্যারো শেইপ */}
            <div className="absolute top-0 -right-3 w-0 h-0 border-t-[20px] md:border-t-[24px] border-t-transparent border-b-[20px] md:border-b-[24px] border-b-transparent border-l-[12px] border-l-red-600"></div>
          </div>

          {/* 🌟 Scrolling News Text */}
          <div className="flex-1 overflow-hidden relative h-full flex items-center bg-gray-50 ml-3 md:ml-4">
            <div className="flex whitespace-nowrap animate-marquee">
              {/* 🔹 প্রথম সেট নিউজ */}
              {updates.map((news, index) => (
                <div key={news.id} className="flex items-center">
                  <Link
                    // 🌟 slug এর বদলে link ব্যবহার করা হলো, null থাকলে '#' এ যাবে
                    href={news.link || "#"}
                    className="font-bangla text-sm md:text-base text-gray-800 hover:text-red-600 transition-colors"
                  >
                    {news.title}
                  </Link>
                  {/* দুটি নিউজের মাঝখানে একটি ডট বা সেপারেটর */}
                  {index !== updates.length - 1 && (
                    <span className="mx-4 md:mx-6 text-red-500 font-bold">
                      ▪
                    </span>
                  )}
                </div>
              ))}

              {/* 🔹 স্ক্রলিং গ্যাপ কমানোর জন্য ডেটাগুলো আরেকবার রিপিট করা হলো (Continuous Effect) */}
              <span className="mx-4 md:mx-6 text-red-500 font-bold">▪</span>

              {updates.map((news, index) => (
                <div key={`repeat-${news.id}`} className="flex items-center">
                  <Link
                    href={news.link || "#"}
                    className="font-bangla text-sm md:text-base text-gray-800 hover:text-red-600 transition-colors"
                  >
                    {news.title}
                  </Link>
                  {index !== updates.length - 1 && (
                    <span className="mx-4 md:mx-6 text-red-500 font-bold">
                      ▪
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveUpdate;
