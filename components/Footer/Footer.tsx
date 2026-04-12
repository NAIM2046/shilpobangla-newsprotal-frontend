// src/components/shared/Footer.tsx
import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FaFacebookF,
  FaYoutube,
  FaInstagram,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { MdLocationOn, MdPhone, MdEmail } from "react-icons/md";

const quickLinks = [
  { name: "সারাদেশ", href: "/category/সারাদেশ" },
  { name: "রাজনীতি", href: "/category/রাজনীতি" },
  { name: "বাণিজ্য", href: "/category/বাণিজ্য" },
  { name: "খেলা", href: "/category/খেলা" },
  { name: "বিনোদন", href: "/category/বিনোদন" },
  { name: "প্রযুক্তি", href: "/category/প্রযুক্তি" },
];

const importantLinks = [
  { name: "যোগাযোগ", href: "/contact" },
  { name: "গোপনীয়তা নীতি", href: "/privacy-policy" },
  { name: "শর্তাবলী", href: "/terms-and-conditions" },
  { name: "বিজ্ঞাপন", href: "/advertise" },
];

const socialPlatforms = [
  {
    id: "fb",
    name: "Facebook",
    icon: FaFacebookF,
    bg: "bg-[#1877F2]",
    href: "https://web.facebook.com/DoinikShilpoBangla",
  },
  {
    id: "yt",
    name: "YouTube",
    icon: FaYoutube,
    bg: "bg-[#FF0000]",
    href: "https://www.youtube.com/@ShilpaBangla",
  },
  {
    id: "x",
    name: "X",
    icon: FaXTwitter,
    bg: "bg-[#0F0E0A]",
    href: "https://twitter.com",
  },
  {
    id: "ig",
    name: "Instagram",
    icon: FaInstagram,
    bg: "bg-[#E1306C]",
    href: "https://www.instagram.com/p/DTms6IQk3VQ/",
  },
];

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-center gap-2.5 mb-6">
    <div className="w-[3px] h-5 bg-[#C0392B] rounded-full flex-shrink-0" />
    <h3 className="text-base font-bold text-gray-900 tracking-wide">{children}</h3>
  </div>
);

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#E5E2E0] print:hidden">
      {/* ── Top accent ── */}
      <div className="h-[3px] w-full bg-gradient-to-r from-transparent via-[#C0392B] to-transparent opacity-80" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          
          {/* ── Col 1: Logo + about + social ── */}
          <div className="space-y-6">
            <Link href="/" className="inline-block">
              <Image
                src="/logo.png"
                alt="দৈনিক শিল্পবাংলা লোগো"
                width={200}
                height={60}
                className="object-contain h-auto w-auto drop-shadow-sm"
              />
            </Link>

            <p className="text-gray-700 text-sm leading-relaxed">
              দৈনিক শিল্পবাংলা একটি নির্ভরযোগ্য ডিজিটাল নিউজ আউটলেট। সত্য ও
              ন্যায়ের পথে থেকে দেশ ও বিদেশের গুরুত্বপূর্ণ সংবাদ পরিবেশন করাই
              আমাদের লক্ষ্য।
            </p>

            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">
                আমাদের অনুসরণ করুন
              </p>
              <div className="flex items-center gap-3">
                {socialPlatforms.map((p) => {
                  const Icon = p.icon;
                  return (
                    <a
                      key={p.id}
                      href={p.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={p.name}
                      className={`w-9 h-9 rounded-full flex items-center justify-center text-white ${p.bg} hover:-translate-y-1 hover:shadow-md transition-all duration-300`}
                    >
                      <Icon size={15} />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ── Col 2: Quick links ── */}
          <div>
            <SectionTitle>দ্রুত লিংক</SectionTitle>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="flex items-center gap-2 text-sm text-gray-700 font-medium hover:text-[#C0392B] transition-colors duration-200 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-400 group-hover:bg-[#C0392B] transition-colors flex-shrink-0" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Col 3: Contact ── */}
          <div>
            <SectionTitle>যোগাযোগ</SectionTitle>
            <div className="space-y-5">
              <div className="flex items-start gap-3">
                <MdLocationOn className="w-5 h-5 text-[#C0392B] mt-0.5 flex-shrink-0" />
                <p className="text-gray-700 text-sm leading-relaxed">
                  আশুলিয়া, সাভার, ঢাকা-১৩৪৪
                </p>
              </div>

              {/* Newsroom */}
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2.5">
                  নিউজরুম
                </p>
                <div className="space-y-2.5">
                  <div className="flex items-center gap-3">
                    <MdPhone className="w-4 h-4 text-[#C0392B] flex-shrink-0" />
                    <a
                      href="tel:+8801339540317"
                      className="text-gray-700 text-sm hover:text-[#C0392B] transition-colors font-medium"
                    >
                      01339-540317
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <MdEmail className="w-4 h-4 text-[#C0392B] flex-shrink-0" />
                    <a
                      href="mailto:doinikshilpobangla@gmail.com"
                      className="text-gray-700 text-sm hover:text-[#C0392B] transition-colors font-medium"
                    >
                      doinikshilpobangla@gmail.com
                    </a>
                  </div>
                </div>
              </div>

              {/* Marketing */}
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2.5">
                  বিজ্ঞাপন ও মার্কেটিং
                </p>
                <div className="space-y-2.5">
                  <div className="flex items-center gap-3">
                    <MdPhone className="w-4 h-4 text-[#C0392B] flex-shrink-0" />
                    <a
                      href="tel:+8801339540317"
                      className="text-gray-700 text-sm hover:text-[#C0392B] transition-colors font-medium"
                    >
                      +8801339540317
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <MdEmail className="w-4 h-4 text-[#C0392B] flex-shrink-0" />
                    <a
                      href="mailto:support@dailyshilpobangla.com"
                      className="text-gray-700 text-sm hover:text-[#C0392B] transition-colors font-medium"
                    >
                      support@dailyshilpobangla.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── Col 4: Important links + newsletter ── */}
          <div>
            <SectionTitle>গুরুত্বপূর্ণ লিংক</SectionTitle>
            <ul className="space-y-3 mb-8">
              {importantLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="flex items-center gap-2 text-sm text-gray-700 font-medium hover:text-[#C0392B] transition-colors duration-200 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-400 group-hover:bg-[#C0392B] transition-colors flex-shrink-0" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Newsletter */}
            <div className="bg-white/40 p-4 rounded-xl border border-white/60 shadow-sm">
              <p className="text-xs font-bold text-gray-800 uppercase tracking-widest mb-3">
                নিউজলেটার
              </p>
              <div className="flex flex-col gap-2.5">
                <input
                  type="email"
                  placeholder="আপনার ইমেইল"
                  className="px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#C0392B] focus:ring-1 focus:ring-[#C0392B] transition-all"
                />
                <button className="px-4 py-2.5 bg-[#C0392B] hover:bg-[#A93226] text-white text-sm font-semibold rounded-lg shadow-sm transition-colors duration-300">
                  সাবস্ক্রাইব
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="mt-14 pt-6 border-t border-gray-400/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 text-sm text-center md:text-left font-medium">
            © {currentYear} দৈনিক শিল্পবাংলা। সকল অধিকার সংরক্ষিত।
          </p>
          <p className="text-gray-500 text-sm text-center md:text-right">
            Developed by{" "}
            <a
              href="https://www.nexovatelabs.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#C0392B] font-bold hover:text-gray-900 transition-colors duration-300"
            >
              Nexovatelabs
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;