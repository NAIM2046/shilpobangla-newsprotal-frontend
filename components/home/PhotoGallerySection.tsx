// src/components/home/PhotoGallerySection.tsx
import Image from "next/image";
import Link from "next/link";
import { NewsItem } from "@/types/news.type";

interface PhotoGalleryProps {
  photos: NewsItem[];
}

export default function PhotoGallerySection({
  photos = [],
}: PhotoGalleryProps) {
  if (photos.length < 5) return null; // ডিজাইনের জন্য অন্তত ৫টি ছবি দরকার

  const leadPhoto = photos[0];
  const gridPhotos = photos.slice(1, 5);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* কালো হেডার */}
      <div className="mb-6 border-b border-[#0f4c81] pb-2">
        <h2 className="text-xl md:text-2xl font-bold text-[#0f4c81] pl-3 border-l-[4px] border-[#0f4c81] leading-none">
          ফটো গ্যালারি
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-auto lg:h-[400px]">
        {/* বাম দিকের বড় ছবি */}
        <Link
          href={`/photo/${leadPhoto.slug}`}
          className="relative block w-full h-[300px] lg:h-full group overflow-hidden"
        >
          <Image
            src={leadPhoto.image}
            alt={leadPhoto.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 p-4 md:p-6 w-full flex justify-between items-end">
            <h2 className="text-white font-bold text-lg md:text-2xl leading-snug group-hover:text-red-400 transition-colors pr-4">
              {leadPhoto.title}
            </h2>
            {/* ডানদিকের অ্যারো আইকন */}
            <div className="text-white text-3xl font-light">›</div>
          </div>
        </Link>

        {/* ডান দিকের ৪টি ছবির গ্রিড */}
        <div className="grid grid-cols-2 gap-4">
          {gridPhotos.map((photo) => (
            <Link
              key={photo.id}
              href={`/photo/${photo.slug}`}
              className="relative block w-full h-[150px] lg:h-full group overflow-hidden"
            >
              <Image
                src={photo.image}
                alt={photo.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 p-2 w-full">
                <h3 className="text-white font-medium text-xs md:text-sm leading-snug group-hover:text-red-400 transition-colors line-clamp-2">
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
