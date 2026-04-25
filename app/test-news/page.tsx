import { Metadata } from "next";

export const metadata: Metadata = {
  title: "এটি একটি টেস্ট খবর",
  description: "টেস্ট করার জন্য এই ডেসক্রিপশনটি দেওয়া হলো।",
  openGraph: {
    title: "এটি একটি টেস্ট খবর",
    description: "টেস্ট করার জন্য এই ডেসক্রিপশনটি দেওয়া হলো।",
    images: ["https://dailyshilpobangla.com/logo.png"], // আপনার সাইটের যেকোনো ছোট ইমেজের লিংক দিন
  },
};

export default function TestNews() {
  return <h1>Test Page</h1>;
}
