// src/components/shared/Header.tsx
"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaFacebookF, FaYoutube, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

// @ts-ignore
import Calendar from "date-bengali-revised";

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
    name: "X (Twitter)",
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

const Header = () => {
  const [dates, setDates] = useState({
    bengaliDay: "",
    banglaDate: "",
    hijriDate: "",
  });

  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

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

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <header
      className={`w-full bg-white border-b border-[#E8E4DC] sticky top-0 z-50 shadow-[0_1px_16px_0_rgba(26,26,46,0.07)] transition-transform duration-300 ease-in-out print:hidden ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-2 md:gap-0 py-3 md:py-0 md:h-[88px]">
          {/* ── Dates (left) ── */}
          <div className="order-2 md:order-1 flex-shrink-0 w-full md:w-auto">
            <div className="text-center md:text-left space-y-0.5">
              <p className="text-[#1a1a2e] font-bold text-xs sm:text-sm leading-tight">
                {dates.bengaliDay}
              </p>
              <div className="flex items-center justify-center md:justify-start gap-1.5 text-[10px] sm:text-xs text-[#7A7465] font-medium">
                <span className="whitespace-nowrap">{dates.banglaDate}</span>
                {dates.banglaDate && dates.hijriDate && (
                  <span className="text-[#C0392B] text-[7px]">◆</span>
                )}
                <span className="whitespace-nowrap">{dates.hijriDate}</span>
              </div>
            </div>
          </div>

          {/* ── Logo (center) — absolutely centered on desktop ── */}
          <div className="order-1 md:order-2 flex-shrink-0 md:absolute md:left-1/2 md:-translate-x-1/2">
            <Link href="/" aria-label="হোমপেজে যান" className="block">
              <Image
                src="/logo.png"
                alt="দৈনিক শিল্পবাংলা লোগো"
                width={290}
                height={95}
                priority
                className="object-contain h-16 sm:h-16 md:h-[72px] lg:h-[80px] w-auto"
              />
            </Link>
          </div>

          {/* ── Social icons (right) ── */}
          <div className="order-3 md:order-3 flex-shrink-0">
            <div className="flex items-center justify-center gap-2 sm:gap-2.5">
              {socialPlatforms.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.id}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.name}
                    className={`
                      w-9 h-9 sm:w-10 sm:h-10
                      rounded-full flex items-center justify-center
                      ${link.bg} text-white
                      transition-all duration-200 ease-in-out
                      hover:scale-110 hover:-translate-y-0.5
                      ${link.shadow}
                      ring-2 ring-white ring-offset-1
                    `}
                  >
                    <Icon size={16} className="sm:w-[17px] sm:h-[17px]" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom accent line ── */}
      <div className="h-[2px] bg-gradient-to-r from-transparent via-[#C0392B] to-transparent opacity-60" />
    </header>
  );
};

export default Header;
