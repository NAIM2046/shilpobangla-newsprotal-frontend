"use server"; // 🌟 ঠিক করা হলো

// 🌟 page প্যারামিটার যুক্ত করা হলো, ডিফল্ট ভ্যালু 1 দেওয়া হলো
export async function getcategoryNews(slug: string, page: number = 1) {
  try {
    // 🌟 URL এর শেষে ?page=${page} যুক্ত করা হলো
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/news/category/${slug}?page=${page}`,
      {
        next: { tags: [`category-${slug}-news`] },
      }
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch news details for slug: ${slug}`);
    }

    const responseBody = await res.json();

    if (responseBody.success && responseBody.data) {
      // এটি ব্যাকএন্ডের { category, newsList, meta } রিটার্ন করবে
      return responseBody.data; 
    }

    return null;

  } catch (error) {
    console.error("Error fetching category news from backend:", error);
    return null;
  }
}