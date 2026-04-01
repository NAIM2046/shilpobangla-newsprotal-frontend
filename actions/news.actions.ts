"user server"
export async function getNewsDetails(slug: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/news/details/${slug}`,
      {
        
        next: { tags: [`news-${slug}`] }, 
      }
    );

    if (!res.ok) {
      // res.ok না হলে এরর থ্রো করবে যা ক্যাচ ব্লকে ধরা পড়বে
      throw new Error(`Failed to fetch news details for slug: ${slug}`);
    }

    const responseBody = await res.json();

    // 🌟 ব্যাকএন্ডের রেসপন্স ফরম্যাট চেক করা হচ্ছে (success: true এবং data আছে কি না)
    if (responseBody.success && responseBody.data) {
      return responseBody.data; 
    }

    // যদি সফল না হয় তবে null রিটার্ন করবে
    return null;

  } catch (error) {
    console.error("Error fetching news details from backend:", error);
    // এরর হলে অ্যাপ ক্র্যাশ না করে null পাঠাবে, যাতে UI-তে "News Not Found" বা এরর মেসেজ দেখানো যায়
    return null;
  }
}