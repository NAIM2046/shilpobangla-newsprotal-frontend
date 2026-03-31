import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#000000", // ন্যাভিগেশন বার এবং সেকশন হেডারের জন্য
        accent: "#DC2626", // লাল রঙের ট্যাগ বা ব্রেকিং নিউজের জন্য
        surface: "#F9FAFB", // সাইটের হালকা ব্যাকগ্রাউন্ড
      },
      container: {
        center: true,
        padding: "1rem",
        screens: {
          "2xl": "1280px", 
        },
      },
      fontFamily: {
      serif: ['var(--font-noto-serif-bengali)', 'serif'],
      // আগে যদি bangla নামে কিছু থাকে, সেটাও পরিবর্তন করতে পারেন
      bangla: ['var(--font-noto-serif-bengali)', 'sans-serif'],
    },
    },
  },
  plugins: [],
};
export default config;