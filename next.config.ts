import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**', // এর মানে হলো unsplash-এর যেকোনো ছবি অ্যালাও করা হলো
      },
      {
        protocol: 'https',
        hostname: 'knyskcdddvrvxjskdrpq.storage.supabase.co',
        port: '',
        pathname: '/**', // এর মানে হলো এই ডোমেইনের যেকোনো ফোল্ডারের ছবি অ্যালাউড
      },
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
        port: '',
        pathname: '/**', // এর মানে হলো এই ডোমেইনের যেকোনো ফোল্ডারের ছবি অ্যালাউড
      },

    ],
  },
};

export default nextConfig;
