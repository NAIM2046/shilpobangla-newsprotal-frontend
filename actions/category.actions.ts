
"use server";

import { Category, categoriesData } from "@/data/categories";

export async function getCategories(): Promise<Category[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`, {
      next: { revalidate: 3600, tags: ['categories'] }, 
    });

    if (!res.ok) {
      throw new Error("Failed to fetch categories");
    }

    // 🌟 API থেকে আসা পুরো রেসপন্সটা রিসিভ করলাম
      const responseBody = await res.json();
      //console.log("Raw response from backend:", responseBody); // ডিবাগিং এর জন্য কনসোল লগ
    
    // 🌟 চেক করছি responseBody তে success: true আছে কি না এবং data একটি Array কি না
    if (responseBody.success && Array.isArray(responseBody.data)) {
      return responseBody.data; // শুধু data অ্যারেটি রিটার্ন করছি
    }

    // যদি ডেটা ঠিকমতো না আসে, তাহলে ডামি ডেটা পাঠাবে
    return categoriesData; 
    
  } catch (error) {
    console.error("Error fetching categories from backend:", error);
    return categoriesData; 
  }
}