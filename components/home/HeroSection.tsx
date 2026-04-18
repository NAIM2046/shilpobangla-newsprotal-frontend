import Image from "next/image";
import Link from "next/link";
import { PlayCircle, ChevronRight, User } from "lucide-react";
import { NewsItem, OpinionItem } from "@/types/news.type";

// ==========================================
// ImageOverlayCard — refined editorial card
// ==========================================
const ImageOverlayCard = ({
  news,
  isLead = false,
  priority = false,
}: {
  news: NewsItem;
  isLead?: boolean;
  priority?: boolean;
}) => {
  if (!news) return null;

  return (
    <Link
      href={`/news/${news.slug}`}
      className="block relative w-full h-full group overflow-hidden bg-[#1a1a2e]"
    >
      <Image
        src={news.image}
        alt={news.title}
        fill
        priority={priority}
        className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
        sizes={
          isLead
            ? "(max-width: 768px) 100vw, 50vw"
            : "(max-width: 768px) 100vw, 25vw"
        }
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

      {/* Hover shimmer on left edge */}
      <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#C0392B] scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-bottom" />

      <div className="absolute bottom-0 left-0 p-3 md:p-4 w-full">
        <h2
          className={`text-white font-bold leading-snug transition-colors duration-200 ${
            isLead
              ? "text-xl md:text-2xl lg:text-3xl group-hover:text-[#F5C6C0]"
              : "text-sm md:text-[15px] group-hover:text-[#F5C6C0]"
          }`}
        >
          {news.title}
        </h2>
      </div>
    </Link>
  );
};

// ==========================================
// Types & Main Component
// ==========================================
interface HeroSectionProps {
  heroData?: {
    leadNews: NewsItem;
    sideNews: NewsItem[];
    opinions: OpinionItem[];
    youtube: {
      id: string;
      title: string;
      slug: string;
      youtubeUrl: string;
      videoId: string;
      thumbnailUrl: string;
    }[];
  };
}

// Panel header
const PanelHeader = ({
  label,
  dark = false,
}: {
  label: string;
  dark?: boolean;
}) => (
  <div
    className={`flex items-center justify-between px-4 py-2.5 ${
      dark ? "bg-[#1a1a2e]" : "bg-[#C0392B]"
    }`}
  >
    <div className="flex items-center gap-2">
      <span className="w-1.5 h-4 rounded-full bg-white/60" />
      <span className="text-white text-sm font-bold tracking-wide">
        {label}
      </span>
    </div>
    <ChevronRight className="w-4 h-4 text-white/50" />
  </div>
);

export default function HeroSection({ heroData }: HeroSectionProps) {
  if (!heroData) return null;

  const { leadNews, sideNews, opinions, youtube } = heroData;

  const topLeftNews = sideNews[0];
  const topRightNews = sideNews[1];
  const bottomCenterNews1 = sideNews[2];
  const bottomCenterNews2 = sideNews[3];

  return (
    <section className="max-w-[1280px] mx-auto px-0 sm:px-4 md:px-6 lg:px-8 py-0 sm:py-5 md:py-6">
      <div className="flex flex-col gap-0 sm:gap-3 md:gap-4">
        {/* ── Mobile lead image (full bleed) ── */}
        <div className="block md:hidden">
          {leadNews && (
            <div className="h-[220px] w-full">
              <ImageOverlayCard news={leadNews} isLead priority />
            </div>
          )}
        </div>

        {/* ── Mobile: text news list below lead ── */}
        <div className="block md:hidden bg-white">
          <Link
            href={`/news/${leadNews?.slug}`}
            className="block px-3 py-3 border-b-2 border-[#C0392B]"
          >
            <h2 className="text-base font-extrabold text-[#0F0E0A] leading-snug">
              {leadNews?.title}
            </h2>
          </Link>

          {[topLeftNews, topRightNews, bottomCenterNews1, bottomCenterNews2]
            .filter(Boolean)
            .map((item) => (
              <Link
                key={item!.id}
                href={`/news/${item!.slug}`}
                className="flex items-center gap-3 px-3 py-2.5 border-b border-[#F0EDE7] group hover:bg-[#F7F5F0] transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-[#1a1a2e] line-clamp-2 leading-snug group-hover:text-[#C0392B] transition-colors">
                    {item!.title}
                  </h3>
                </div>
                <div className="flex-shrink-0 relative w-[72px] h-[50px] overflow-hidden rounded-sm bg-[#E8E4DC]">
                  <Image
                    src={item!.image}
                    alt={item!.title}
                    fill
                    className="object-cover"
                    sizes="72px"
                  />
                </div>
              </Link>
            ))}
        </div>

        {/* ── Desktop: 4-col image grid (TOP ROW) ── */}
        <div className="hidden md:grid md:grid-cols-4 gap-3 md:gap-4">
          <div className="h-[320px] lg:h-[360px]">
            {topLeftNews && <ImageOverlayCard news={topLeftNews} />}
          </div>
          <div className="h-[320px] lg:h-[360px] md:col-span-2">
            {leadNews && <ImageOverlayCard news={leadNews} isLead priority />}
          </div>
          <div className="h-[320px] lg:h-[360px]">
            {topRightNews && <ImageOverlayCard news={topRightNews} />}
          </div>
        </div>

        {/* ════════════════════════════════
            BOTTOM ROW
        ════════════════════════════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          {/* ── 1. YouTube panel ── */}
          <div className="bg-white border border-[#E8E4DC] overflow-hidden flex flex-col shadow-sm">
            <PanelHeader label="YouTube" />
            <div className="flex flex-col flex-grow divide-y divide-[#F0EDE7]">
              {youtube?.map((item) => (
                <Link
                  key={item.id}
                  href={item.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 p-2.5 sm:p-3 group hover:bg-[#F7F5F0] transition-colors duration-150"
                >
                  <div className="relative flex-shrink-0 overflow-hidden rounded-sm">
                    <Image
                      src={item.thumbnailUrl}
                      alt={item.title}
                      width={68}
                      height={44}
                      className="object-cover w-[60px] h-[40px] sm:w-[72px] sm:h-[46px]"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/10 transition-colors">
                      <PlayCircle className="w-4 h-4 text-white drop-shadow" />
                    </div>
                  </div>
                  <h3 className="text-[11px] sm:text-xs font-semibold text-[#1a1a2e] line-clamp-2 group-hover:text-[#C0392B] transition-colors leading-snug">
                    {item.title}
                  </h3>
                </Link>
              ))}
            </div>
          </div>

          {/* ── 2. Bottom-center left ── */}
          <div className="hidden lg:block lg:h-full min-h-[220px]">
            {bottomCenterNews1 && <ImageOverlayCard news={bottomCenterNews1} />}
          </div>

          {/* ── 3. Bottom-center right ── */}
          <div className="hidden lg:block lg:h-full min-h-[220px]">
            {bottomCenterNews2 && <ImageOverlayCard news={bottomCenterNews2} />}
          </div>

          {/* ── 4. Opinion panel — author avatar + name + title ── */}
          <div className="bg-white border border-[#E8E4DC] overflow-hidden flex flex-col shadow-sm">
            <PanelHeader label="মতামত" dark />
            <div className="flex flex-col flex-grow divide-y divide-[#F0EDE7]">
              {opinions?.map((item) => (
                <Link
                  key={item.id}
                  href={`/opinion/${item.slug}`}
                  className="flex items-start gap-3 p-3 sm:p-4 group hover:bg-[#F7F5F0] transition-colors duration-150"
                >
                  {/* Avatar + author name stacked */}
                  <div className="flex-shrink-0 flex flex-col items-center gap-1.5 w-14">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden ring-2 ring-[#E8E4DC] ring-offset-1 bg-[#F0EDE7]">
                      {item.author?.avatar_url ? (
                        <Image
                          src={item.author.avatar_url}
                          alt={item.author.name}
                          width={56}
                          height={56}
                          className="object-cover w-full h-full"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-[#1a1a2e]">
                          <User className="w-5 h-5 text-white/60" />
                        </div>
                      )}
                    </div>
                    <span className="text-[10px] font-semibold text-[#7A7465] text-center leading-tight line-clamp-2">
                      {item.author?.name}
                    </span>
                  </div>

                  {/* Opinion title */}
                  <h3 className="flex-1 text-xs sm:text-sm font-bold text-[#1a1a2e] group-hover:text-[#C0392B] transition-colors line-clamp-4 leading-snug pt-1">
                    {item.title}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
