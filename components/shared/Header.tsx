// src/components/shared/Header.tsx
"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaFacebookF, FaYoutube, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

// @ts-ignore
import Calendar from "date-bengali-revised";

const socialPlatforms = [
  {
    id: "fb",
    name: "Facebook",
    icon: FaFacebookF,
    color: "bg-[#1877F2]",
    href: "https://facebook.com",
  },
  {
    id: "yt",
    name: "YouTube",
    icon: FaYoutube,
    color: "bg-[#FF0000]",
    href: "https://youtube.com",
  },
  {
    id: "x",
    name: "X (Twitter)",
    icon: FaXTwitter,
    color: "bg-black",
    href: "https://twitter.com",
  },
  {
    id: "in",
    name: "LinkedIn",
    icon: FaLinkedinIn,
    color: "bg-[#0A66C2]",
    href: "https://linkedin.com",
  },
];

const Header = () => {
  const [dates, setDates] = useState({
    bengaliDay: "",
    banglaDate: "",
    hijriDate: "",
  });

  // 🌟 স্ক্রল হাইড/শো করার জন্য নতুন স্টেট
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // তারিখ সেট করার useEffect
  useEffect(() => {
    const today = new Date();

    const bengaliDay = new Intl.DateTimeFormat("bn-BD", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(today);

    const bDate = new Calendar().fromDate(today);
    const banglaDate = bDate.format("D MMMM, Y");

    const hijriDate = new Intl.DateTimeFormat("bn-BD-u-ca-islamic", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(today);

    setDates({ bengaliDay, banglaDate, hijriDate });
  }, []);

  // 🌟 স্ক্রল ইভেন্ট ট্র্যাক করার useEffect
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // যদি নিচের দিকে স্ক্রল করে এবং ৫০ পিক্সেলের বেশি নিচে যায়, তাহলে হাইড করবে
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsVisible(false);
      } else {
        // ওপরের দিকে স্ক্রল করলে আবার শো করবে
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <header
      className={`w-full bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm transition-transform duration-300 ease-in-out ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 py-3 sm:py-4">
          {/* Top Section on Mobile: Logo */}
          <div className="order-1 md:order-2 flex-shrink-0">
            <Link
              href="/"
              className="cursor-pointer text-center group block"
              aria-label="হোমপেজে যান"
            >
              <Image
                src="/logo.png" // আপনার লোগোর পাথ ঠিক আছে কিনা নিশ্চিত করুন
                alt="দৈনিক শিল্পবাংলা লোগো"
                width={260}
                height={80}
                priority
                className="object-contain h-12 sm:h-14 md:h-16 lg:h-[70px] w-auto transition-all"
              />
            </Link>
          </div>

          {/* Middle Section on Mobile: Dates */}
          <div className="order-2 md:order-1 flex-shrink-0 w-full md:w-auto">
            <div className="text-center md:text-left">
              <span className="text-gray-900 font-semibold block text-sm sm:text-base">
                {dates.bengaliDay}
              </span>
              <div className="flex flex-row items-center justify-center md:justify-start gap-1 sm:gap-2 text-xs sm:text-sm font-medium text-gray-600">
                <span className="whitespace-nowrap">{dates.banglaDate}</span>
                <span className="text-gray-400 text-xs">|</span>
                <span className="whitespace-nowrap">{dates.hijriDate}</span>
              </div>
            </div>
          </div>

          {/* Bottom Section on Mobile: Social Icons */}
          <div className="order-3 md:order-3 flex-shrink-0">
            <div className="flex items-center justify-center gap-2 sm:gap-3">
              {socialPlatforms.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.id}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.name}
                    className={`group relative w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 rounded-full flex items-center justify-center transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-lg ${link.color}`}
                  >
                    <Icon
                      size={18}
                      className="relative z-10 text-white transition duration-300 sm:w-5 sm:h-5 md:w-[20px] md:h-[20px]"
                    />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
