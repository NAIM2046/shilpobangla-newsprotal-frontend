// src/actions/news.actions.ts
"use server";

// 🌟 ব্যাকএন্ডের Prisma মডেল অনুযায়ী ইন্টারফেস আপডেট করা হলো
export interface LiveUpdateNews {
  id: string;
  title: string;
  link: string | null; // Prisma তে String? আছে, তাই null হতে পারে
  is_active: boolean;
  is_breaking: boolean;
  expires_at?: string | null;
  created_at?: string;
  updated_at?: string;
}

// 🌟 Fallback ডেটাও নতুন ইন্টারফেস অনুযায়ী সাজানো হলো
const fallbackUpdates: LiveUpdateNews[] = [
  { 
    id: "1", 
    title: "খুলনায় নতুন শিল্পাঞ্চল স্থাপনের ঘোষণা সরকারের, কর্মসংস্থান বাড়বে লাখো মানুষের।", 
    link: "#",
    is_active: true,
    is_breaking: true 
  },
  { 
    id: "2", 
    title: "শেয়ার বাজারে টানা তৃতীয় দিনেও সূচকের পতন, বিনিয়োগকারীদের মধ্যে হতাশা।", 
    link: "#",
    is_active: true,
    is_breaking: true 
  },
  { 
    id: "3", 
    title: "আসছে বাজেটে তথ্যপ্রযুক্তি খাতে বরাদ্দ বাড়ছে ২০% শতাংশ।", 
    link: null, // লিংক null হতে পারে টেস্ট করার জন্য
    is_active: true,
    is_breaking: true 
  },
];

export async function getLiveUpdates(): Promise<LiveUpdateNews[]> {
  // 🌟 আপনার ব্যাকএন্ডের আসল এন্ডপয়েন্টটি এখানে বসাবেন
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/live-updates`;
  
  try {
    const res = await fetch(apiUrl, {
     next: { 
        revalidate: 3600,  
        tags: ['live-updates'] 
      },
    });

    if (!res.ok) {
      console.log("❌ Failed to fetch live updates. Status:", res.status);
      return fallbackUpdates;
    }

    const responseBody = await res.json();
    
    // ব্যাকএন্ড রেসপন্স চেক
    if (responseBody.success && Array.isArray(responseBody.data)) {
      return responseBody.data; 
    }

    return fallbackUpdates;
    
  } catch (error) {
    console.error("❌ Error fetching live updates from backend:", error);
    return fallbackUpdates; 
  }
}
