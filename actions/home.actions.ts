"use server";

import { HomePageData } from "@/types/news.type";



export async function getHomePageData(): Promise<HomePageData | null> {
  try {
    // 🌟 আপনার ব্যাকএন্ড API রাউট (যেমন: /api/home) থেকে ডেটা ফেচ করা হচ্ছে
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/news/home`, {
      // হোমপেজের ডেটা সাধারণত দ্রুত আপডেট হয়, তাই revalidate টাইম ৬০ সেকেন্ড (১ মিনিট) দেওয়া ভালো
      next: { revalidate: 60, tags: ['homepage'] }, 
    });

    if (!res.ok) {
      throw new Error("Failed to fetch homepage data");
    }

    // 🌟 API থেকে আসা রেসপন্স রিসিভ করা
    const responseBody = await res.json();
    
    
    if (responseBody.success && responseBody.data) {
      return responseBody.data as HomePageData; 
    }

    // যদি ডেটা স্ট্রাকচার না মেলে, তবে null রিটার্ন করবে
    return null;
    
  } catch (error) {
    console.error("Error fetching homepage data from backend:", error);
    // ডেটা ফেচ করতে ব্যর্থ হলে null রিটার্ন করবে, ফ্রন্টএন্ডে এটি হ্যান্ডেল করতে হবে
    return null; 
  }
}