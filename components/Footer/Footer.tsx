// src/components/shared/Footer.tsx
import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FaFacebookF,
  FaYoutube,
  FaLinkedinIn,
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
  <div className="flex items-center gap-2.5 mb-5">
    <div className="w-[3px] h-5 bg-[#C0392B] rounded-full flex-shrink-0" />
    <h3 className="text-base font-bold text-black tracking-wide">{children}</h3>
  </div>
);

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#9b9491] print:hidden">
      {/* ── Top accent ── */}
      <div className="h-[2px] bg-gradient-to-r from-transparent via-[#C0392B] to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* ── Col 1: Logo + about + social ── */}
          <div className="space-y-5">
            <Link href="/" className="inline-block">
              <Image
                src="/logo.png"
                alt="দৈনিক শিল্পবাংলা লোগো"
                width={200}
                height={60}
                className="object-contain h-auto w-auto"
              />
            </Link>

            <p className="text-black/80 text-sm leading-relaxed">
              দৈনিক শিল্পবাংলা একটি নির্ভরযোগ্য ডিজিটাল নিউজ আউটলেট। সত্য ও
              ন্যায়ের পথে থেকে দেশ ও বিদেশের গুরুত্বপূর্ণ সংবাদ পরিবেশন করাই
              আমাদের লক্ষ্য।
            </p>

            <div>
              <p className="text-xs font-semibold text-black/50 uppercase tracking-widest mb-3">
                আমাদের অনুসরণ করুন
              </p>
              <div className="flex items-center gap-2">
                {socialPlatforms.map((p) => {
                  const Icon = p.icon;
                  return (
                    <a
                      key={p.id}
                      href={p.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={p.name}
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${p.bg} hover:scale-110 hover:shadow-lg transition-all duration-200`}
                    >
                      <Icon size={13} />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ── Col 2: Quick links ── */}
          <div>
            <SectionTitle>দ্রুত লিংক</SectionTitle>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="flex items-center gap-2 text-sm text-black font-medium hover:text-[#C0392B] transition-colors duration-150 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-black/30 group-hover:bg-[#C0392B] transition-colors flex-shrink-0" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Col 3: Contact ── */}
          <div>
            <SectionTitle>যোগাযোগ</SectionTitle>
            <div className="space-y-4">
              <div className="flex items-start gap-2.5">
                <MdLocationOn className="w-4 h-4 text-[#C0392B] mt-0.5 flex-shrink-0" />
                <p className="text-black text-sm leading-relaxed">
                  আশুলিয়া, সাভার , ঢাকা-১৩৪৪
                </p>
              </div>

              {/* Newsroom */}
              <div>
                <p className="text-xs font-bold text-black/50 uppercase tracking-widest mb-2">
                  নিউজরুম
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2.5">
                    <MdPhone className="w-4 h-4 text-[#C0392B] flex-shrink-0" />
                    <a
                      href="tel:+8801339540317"
                      className="text-black text-sm hover:text-[#C0392B] transition-colors"
                    >
                      01339-540317
                    </a>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <MdEmail className="w-4 h-4 text-[#C0392B] flex-shrink-0" />
                    <a
                      href="mailto:doinikshilpobangla@gmail.com"
                      className="text-black text-sm hover:text-[#C0392B] transition-colors"
                    >
                      doinikshilpobangla@gmail.com
                    </a>
                  </div>
                </div>
              </div>

              {/* Marketing */}
              <div>
                <p className="text-xs font-bold text-black/50 uppercase tracking-widest mb-2">
                  বিজ্ঞাপন ও মার্কেটিং
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2.5">
                    <MdPhone className="w-4 h-4 text-[#C0392B] flex-shrink-0" />
                    <a
                      href="tel:+8801339540317"
                      className="text-black text-sm hover:text-[#C0392B] transition-colors"
                    >
                      +8801339540317
                    </a>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <MdEmail className="w-4 h-4 text-[#C0392B] flex-shrink-0" />
                    <a
                      href="mailto:doinikshilpobangla@gmail.com"
                      className="text-black text-sm hover:text-[#C0392B] transition-colors"
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
            <ul className="space-y-2.5 mb-7">
              {importantLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="flex items-center gap-2 text-sm text-black font-medium hover:text-[#C0392B] transition-colors duration-150 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-black/30 group-hover:bg-[#C0392B] transition-colors flex-shrink-0" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Newsletter */}
            <div>
              <p className="text-xs font-bold text-black/50 uppercase tracking-widest mb-3">
                নিউজলেটার
              </p>
              <div className="flex flex-col gap-2">
                <input
                  type="email"
                  placeholder="আপনার ইমেইল"
                  className="px-3.5 py-2.5 bg-black/10 border border-black/20 rounded-lg text-sm text-black placeholder-black/40 focus:outline-none focus:border-[#C0392B] transition-colors"
                />
                <button className="px-4 py-2.5 bg-[#C0392B] hover:bg-[#a93226] text-white text-sm font-semibold rounded-lg transition-colors duration-200">
                  সাবস্ক্রাইব
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="mt-12 pt-5 border-t border-black/20 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-black/60 text-xs text-center sm:text-left">
            © {currentYear} দৈনিক শিল্পবাংলা। সকল অধিকার সংরক্ষিত।
          </p>
          <p className="text-black/40 text-xs">Designed with ❤ in Bangladesh</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
