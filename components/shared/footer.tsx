// src/components/shared/Footer.tsx
import React from "react";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="w-full bg-[#f4f4f5] border-t border-gray-200 py-12 mt-10">
      <div className="max-w-7xl mx-auto px-4 xl:px-0 flex flex-col md:flex-row justify-between items-start gap-10">
        {/* 🌟 Left Section: Logo and Address */}
        <div className="max-w-sm">
          {/* Logo */}
          <Link href="/" className="inline-block mb-4">
            <Image
              src="/logo.png" // আপনার পাবলিক ফোল্ডারের লোগো
              alt="শিল্পবাংলা লোগো"
              width={220}
              height={60}
              className="object-contain h-auto w-auto"
            />
          </Link>

          {/* Description & Address */}
          <div className="text-gray-800 text-sm leading-relaxed space-y-3 font-medium">
            <p>Doinikshilpobangla.com is a digital news outlet.</p>
            <p>
              Location: Lorem ipsum dolor sit amet, consectetur adipiscing elit,
              sed do. <br />
              ঢাকা ১০০০, বাংলাদেশ
            </p>
          </div>
        </div>

        {/* 🌟 Right Section: Contact Information */}
        <div className="flex flex-col gap-8 md:min-w-[300px]">
          {/* নিউজকক্ষ (Newsroom) */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-2 font-bangla">
              নিউজকক্ষ
            </h3>
            <div className="text-gray-800 font-medium space-y-1">
              <p>+৮৮০ ১৯xxxxxxxx</p>
              <p>+৮৮০ ১৯xxxxxxxx</p>
              <a
                href="mailto:newsdesk@doinikshilpo.com"
                className="hover:text-red-600 transition-colors inline-block mt-1"
              >
                newsdesk@doinikshilpo.com
              </a>
            </div>
          </div>

          {/* মার্কেটিং ও সেলস (Marketing & Sales) */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-2 font-bangla">
              মার্কেটিং ও সেলস
            </h3>
            <div className="text-gray-800 font-medium space-y-1">
              <p>+৮৮০ ১৯xxxxxxxx</p>
              <a
                href="mailto:marketing@doinikshilpo.com"
                className="hover:text-red-600 transition-colors"
              >
                marketing@doinikshilpo.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
