import type { Metadata } from "next";
// 🌟 Noto_Serif_Bengali ইম্পোর্ট করুন
import { Geist, Geist_Mono, Noto_Serif_Bengali } from "next/font/google";
import "./globals.css";

import Header from "@/components/shared/Header";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/footer";
import LiveUpdate from "@/components/shared/LiveUpdate";
import { getCategories } from "@/actions/category.actions";

// ... অন্যান্য ফন্ট

// 🌟 নিউজ পোর্টালের জন্য প্রফেশনাল ফন্ট সেটআপ
const notoSerifBengali = Noto_Serif_Bengali({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["bengali"],
  variable: "--font-noto-serif-bengali",
});

export const metadata: Metadata = {
  title: "দৈনিক শিল্পবাংলা | সত্যের পথে- জনতার সাথে",
  description: "সর্বশেষ বাংলা খবর, রাজনীতি, অর্থনীতি, এবং বিনোদন সংবাদ।",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const categories = await getCategories();

  return (
    <html
      lang="bn"
      // 🌟 এখানে notoSerifBengali.variable যুক্ত করুন
      className={`${notoSerifBengali.variable} h-full antialiased`}
    >
      {/* 🌟 ফন্ট ফ্যামিলি অ্যাপ্লাই করার জন্য font-noto (বা আপনার tailwind config অনুযায়ী) দিন */}
      <body className="min-h-full flex flex-col font-serif bg-surface text-gray-900">
        <div className="relative z-[50]">
          <Header />
        </div>

        <div className="sticky top-0 z-[9999]">
          <Navbar categories={categories} />
        </div>

        <div className="relative z-[40]">
          <LiveUpdate />
        </div>

        <main className="flex-grow relative z-10">{children}</main>

        <Footer />
      </body>
    </html>
  );
}
