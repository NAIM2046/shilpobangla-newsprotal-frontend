// src/app/page.tsx
import HeroSection from "@/components/home/HeroSection";
import TopNewsSection from "@/components/home/TopNewsSection";
import CategoryGridSection from "@/components/home/CategoryGridSection";
import PhotoGallerySection from "@/components/home/PhotoGallerySection";
import CategoryBlocksSection from "@/components/home/CategoryBlocksSection";
import { getHomePageData } from "@/actions/home.actions";

// ==========================================
// Main Page Component
// ==========================================
export default async function Home() {
  const homePageData = await getHomePageData();

  if (!homePageData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F7F5F0]">
        <div className="text-center py-20 px-6">
          <div className="w-16 h-px bg-[#C0392B] mx-auto mb-6" />
          <p className="text-lg font-semibold text-[#1a1a2e]">
            ডেটা লোড করতে সমস্যা হয়েছে
          </p>
          <div className="w-16 h-px bg-[#C0392B] mx-auto mt-6" />
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#F7F5F0] pb-12">
      {/* ── হিরো সেকশন ── */}
      <HeroSection heroData={homePageData.heroSection} />

      {/* ── টপ নিউজ সেকশন ── */}
      <TopNewsSection
        topNews={homePageData.topNews}
        latestNews={homePageData.latestNews}
        popularNews={homePageData.popularNews}
      />

      {/* ── ক্যাটাগরি গ্রিড সেকশন ── */}
      <CategoryGridSection categoriesData={homePageData.gridCategories} />

      {/* ── ফটো গ্যালারি সেকশন ── */}
      <PhotoGallerySection photos={homePageData.photoGallery} />

      {/* ── ক্যাটাগরি ব্লক সেকশন ── */}
      <CategoryBlocksSection categoriesData={homePageData.blockCategories} />
    </main>
  );
}
