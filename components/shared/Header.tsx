"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaFacebookF, FaYoutube, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

// @ts-expect-error - no types available
import Calendar from "date-bengali-revised";

/* ---------------- Social Links ---------------- */

const socialPlatforms = [
  {
    id: "fb",
    name: "Facebook",
    icon: FaFacebookF,
    bg: "bg-[#1877F2]",
    shadow: "hover:shadow-[0_4px_14px_0_rgba(24,119,242,0.5)]",
    href: "https://web.facebook.com/DoinikShilpoBangla",
  },
  {
    id: "yt",
    name: "YouTube",
    icon: FaYoutube,
    bg: "bg-[#FF0000]",
    shadow: "hover:shadow-[0_4px_14px_0_rgba(255,0,0,0.5)]",
    href: "https://www.youtube.com/@ShilpaBangla",
  },
  {
    id: "x",
    name: "X",
    icon: FaXTwitter,
    bg: "bg-[#0F0E0A]",
    shadow: "hover:shadow-[0_4px_14px_0_rgba(15,14,10,0.4)]",
    href: "https://twitter.com",
  },
  {
    id: "instagram",
    name: "Instagram",
    icon: FaInstagram,
    bg: "bg-[#E1306C]",
    shadow: "hover:shadow-[0_4px_14px_0_rgba(225,48,108,0.5)]",
    href: "https://www.instagram.com/dailyshilpobangla",
  },
];

/* ---------------- Hijri Months ---------------- */

const hijriMonthsBn = [
  "মুহাররম",
  "সফর",
  "রবিউল আউয়াল",
  "রবিউস সানি",
  "জমাদিউল আউয়াল",
  "জমাদিউস সানি",
  "রজব",
  "শাবান",
  "রমজান",
  "শাওয়াল",
  "জিলকদ",
  "জিলহজ",
];

/* ---------------- Date Function (NO STATE NEEDED) ---------------- */

const getDates = () => {
  const today = new Date();

  const bengaliDay = new Intl.DateTimeFormat("bn-BD", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(today);

  const bDate = new Calendar().fromDate(today);
  const banglaDate = bDate.format("D MMMM, Y");

  const formatter = new Intl.DateTimeFormat("en-TN-u-ca-islamic", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  });

  const parts = formatter.formatToParts(today);

  const day = parts.find((p) => p.type === "day")?.value;
  const month = Number(parts.find((p) => p.type === "month")?.value);
  const year = parts.find((p) => p.type === "year")?.value;

  const toBanglaNumber = (num: string | number) =>
  num.toString().replace(/\d/g, (d) => "০১২৩৪৫৬৭৮৯"[Number(d)]);
  const hijriDate = `${toBanglaNumber(day!)} ${
  hijriMonthsBn[month - 1]
} ${toBanglaNumber(year!)} হিজরি`;
  return { bengaliDay, banglaDate, hijriDate };
};

/* ---------------- Component ---------------- */

const Header = () => {
  const dates = getDates();

  const [isVisible, setIsVisible] = useState(true);

  /* -------- Scroll Hide/Show (Optimized) -------- */

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;

          if (currentScrollY > lastScrollY && currentScrollY > 50) {
            setIsVisible(false);
          } else {
            setIsVisible(true);
          }

          lastScrollY = currentScrollY;
          ticking = false;
        });

        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ---------------- UI ---------------- */

  return (
    <header
      className={`w-full bg-white border-b border-[#E8E4DC] sticky top-0 z-50 shadow-[0_1px_16px_0_rgba(26,26,46,0.07)] transition-transform duration-300 ease-in-out print:hidden ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-2 md:gap-0 py-3 md:py-0 md:h-[88px]">

          {/* LEFT - DATE */}
          <div className="order-2 md:order-1 text-center md:text-left space-y-0.5">
            <p className="text-[#1a1a2e] font-bold text-xs sm:text-sm">
              {dates.bengaliDay}
            </p>

            <div className="flex items-center justify-center md:justify-start gap-1.5 text-[10px] sm:text-xs text-[#7A7465] font-medium">
              <span>{dates.banglaDate}</span>

              <span className="text-[#C0392B] text-[7px]">◆</span>

              <span>{dates.hijriDate}</span>
            </div>
          </div>

          {/* CENTER - LOGO */}
          <div className="order-1 md:order-2 md:absolute md:left-1/2 md:-translate-x-1/2">
            <Link href="/">
              <Image
                src="/logo.png"
                alt="logo"
                width={290}
                height={95}
                priority
                className="object-contain h-16 md:h-[72px] lg:h-[80px] w-auto"
              />
            </Link>
          </div>

          {/* RIGHT - SOCIAL */}
          <div className="order-3 flex gap-2 sm:gap-2.5">
            {socialPlatforms.map((item) => {
              const Icon = item.icon;

              return (
                <a
                  key={item.id}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.name}
                  className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-white transition-all duration-200 hover:scale-110 hover:-translate-y-0.5 ${item.bg}`}
                >
                  <Icon size={16} />
                </a>
              );
            })}
          </div>

        </div>
      </div>

      {/* Bottom line (UNCHANGED UI) */}
      <div className="h-[2px] bg-gradient-to-r from-transparent via-[#C0392B] to-transparent opacity-60" />
    </header>
  );
};

export default Header;