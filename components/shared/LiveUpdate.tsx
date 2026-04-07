// src/components/shared/LiveUpdate.tsx
import Link from "next/link";
import { Zap } from "lucide-react";
import { getLiveUpdates } from "@/actions/live-update.actions";

const LiveUpdate = async () => {
  const updates = await getLiveUpdates();
  console.log("Fetched live updates:", updates);

  if (!updates || updates.length === 0) return null;

  return (
    <div className="border-b border-[#E8E4DC] bg-white print:hidden">
      <div className="max-w-7xl mx-auto sm:px-4 md:px-4 lg:px-4">
        <div className="flex items-center h-10 md:h-11">
          {/* ── Badge ── */}
          <div className="relative flex items-center justify-center bg-[#C0392B] text-white px-3 md:px-5 h-full shrink-0 z-10">
            <Zap
              size={13}
              className="mr-1.5 hidden md:block fill-white text-white animate-pulse"
            />
            <span className="font-semibold text-xs md:text-sm tracking-widest uppercase whitespace-nowrap">
              সর্বশেষ
            </span>
            {/* Arrow chevron */}
            <div
              className="absolute top-0 -right-[11px] w-0 h-0
              border-t-[20px] md:border-t-[22px] border-t-transparent
              border-b-[20px] md:border-b-[22px] border-b-transparent
              border-l-[11px] border-l-[#C0392B]"
            />
          </div>

          {/* ── Scrolling ticker ── */}
          <div className="flex-1 overflow-hidden relative h-full flex items-center ml-4 md:ml-5">
            {/* Left fade mask */}
            <div className="pointer-events-none absolute left-0 top-0 h-full w-8 bg-gradient-to-r from-white to-transparent z-10" />
            {/* Right fade mask */}
            <div className="pointer-events-none absolute right-0 top-0 h-full w-8 bg-gradient-to-l from-white to-transparent z-10" />

            <div className="flex whitespace-nowrap animate-marquee">
              {/* First set */}
              {updates.map((news, index) => (
                <div key={news.id} className="flex items-center">
                  <Link
                    href={news.link || "#"}
                    className="text-sm md:text-[0.8125rem] text-[#2C2C2C] hover:text-[#C0392B] transition-colors duration-200 font-medium"
                  >
                    {news.title}
                  </Link>
                  {index !== updates.length - 1 && (
                    <span className="mx-5 md:mx-7 text-[#C0392B] text-[10px] opacity-60">
                      ◆
                    </span>
                  )}
                </div>
              ))}

              {/* Separator between loops */}
              <span className="mx-5 md:mx-7 text-[#C0392B] text-[10px] opacity-60">
                ◆
              </span>

              {/* Repeated set for seamless loop */}
              {updates.map((news, index) => (
                <div key={`repeat-${news.id}`} className="flex items-center">
                  <Link
                    href={news.link || "#"}
                    className="text-sm md:text-[0.8125rem] text-[#2C2C2C] hover:text-[#C0392B] transition-colors duration-200 font-medium"
                  >
                    {news.title}
                  </Link>
                  {index !== updates.length - 1 && (
                    <span className="mx-5 md:mx-7 text-[#C0392B] text-[10px] opacity-60">
                      ◆
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
