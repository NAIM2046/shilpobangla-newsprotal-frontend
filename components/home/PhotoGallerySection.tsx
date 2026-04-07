// src/components/home/PhotoGallerySection.tsx
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Images } from "lucide-react";
import { NewsItem } from "@/types/news.type";

interface PhotoGalleryProps {
  photos: NewsItem[];
}

export default function PhotoGallerySection({
  photos = [],
}: PhotoGalleryProps) {
  if (photos.length < 5) return null;

  const leadPhoto = photos[0];
  const gridPhotos = photos.slice(1, 5);

  return (
    <section className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-5 md:py-8">
      {/* Section header */}
      <div className="flex items-center justify-between mb-4 pb-2.5 border-b border-[#E8E4DC]">
        <div className="flex items-center gap-2.5">
          <div className="w-1 h-5 bg-[#C0392B] rounded-full" />
          <Images className="w-4 h-4 text-[#C0392B]" />
          <h2 className="text-base md:text-lg font-extrabold text-[#0F0E0A] tracking-tight leading-none">
            ফটো গ্যালারি
          </h2>
        </div>
        <Link
          href="/photo-gallery"
          className="flex items-center gap-0.5 text-[11px] font-semibold text-[#C0392B] hover:text-[#96281B] transition-colors"
        >
          সব দেখুন
          <ChevronRight className="w-3 h-3" />
        </Link>
      </div>

      {/* Gallery grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-1">
        {/* Lead photo */}
        <Link
          href={`/photo/${leadPhoto.slug}`}
          className="relative block w-full h-[260px] sm:h-[320px] lg:h-[400px] group overflow-hidden bg-[#1a1a2e]"
        >
          <Image
            src={leadPhoto.image}
            alt={leadPhoto.title}
            fill
            priority
            className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent" />

          {/* Left red bar */}
          <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#C0392B] scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-bottom" />

          {/* Photo count badge */}
          <div className="absolute top-3 left-3 flex items-center gap-1 bg-black/50 backdrop-blur-sm px-2 py-1 rounded-full">
            <Images className="w-3 h-3 text-white" />
            <span className="text-white text-[10px] font-bold">
              {photos.length}
            </span>
          </div>

          <div className="absolute bottom-0 left-0 p-4 md:p-5 w-full flex items-end justify-between gap-3">
            <h2 className="text-white font-bold text-base md:text-xl leading-snug group-hover:text-[#F5C6C0] transition-colors line-clamp-2 flex-1">
              {leadPhoto.title}
            </h2>
            <div className="flex-shrink-0 w-8 h-8 rounded-full border border-white/40 flex items-center justify-center group-hover:bg-[#C0392B] group-hover:border-[#C0392B] transition-all duration-200">
              <ChevronRight className="w-4 h-4 text-white" />
            </div>
          </div>
        </Link>

        {/* 2×2 grid */}
        <div className="grid grid-cols-2 gap-1">
          {gridPhotos.map((photo) => (
            <Link
              key={photo.id}
              href={`/photo/${photo.slug}`}
              className="relative block w-full h-[130px] sm:h-[160px] lg:h-[200px] group overflow-hidden bg-[#1a1a2e]"
            >
              <Image
                src={photo.image}
                alt={photo.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-[#C0392B] scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-bottom" />
              <div className="absolute bottom-0 left-0 w-full p-2 md:p-2.5">
                <h3 className="text-white font-semibold text-[10px] md:text-xs leading-snug group-hover:text-[#F5C6C0] transition-colors line-clamp-2">
                  {photo.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
