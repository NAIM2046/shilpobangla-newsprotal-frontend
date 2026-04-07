// src/components/news/NewsActions.tsx (Client Component)
"use client";

import { useState, useEffect } from "react";
import { Share2, Printer, Copy, Check } from "lucide-react";
import { FaFacebook } from "react-icons/fa6";
import { BsTwitterX } from "react-icons/bs";
import { LiaLinkedin } from "react-icons/lia";

interface NewsActionsProps {
  title: string;
  slug: string;
  excerpt: string;
  variant?: "default" | "horizontal";
}

export function NewsActions({
  title,
  slug,
  excerpt,
  variant = "default",
}: NewsActionsProps) {
  const [copied, setCopied] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [currentUrl, setCurrentUrl] = useState("");

  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, []);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title, text: excerpt, url: currentUrl });
      } catch (err) {
        console.error("Error sharing:", err);
      }
    } else {
      setShowShareMenu(!showShareMenu);
    }
  };

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(currentUrl)}`,
    linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(currentUrl)}&title=${encodeURIComponent(title)}&summary=${encodeURIComponent(excerpt)}`,
  };

  // Shared base for icon buttons
  const base =
    "relative w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-full border transition-all duration-200 group";

  if (variant === "horizontal") {
    return (
      <div className="flex items-center gap-1.5 print:hidden">
        {/* Facebook */}
        <a
          href={shareLinks.facebook}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Facebook এ শেয়ার করুন"
          className={`${base} border-[#E8E4DC] bg-white text-[#7A7465] hover:bg-[#1877F2] hover:border-[#1877F2] hover:text-white hover:scale-105`}
        >
          <FaFacebook className="w-3.5 h-3.5" />
        </a>

        {/* Twitter / X */}
        <a
          href={shareLinks.twitter}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Twitter এ শেয়ার করুন"
          className={`${base} border-[#E8E4DC] bg-white text-[#7A7465] hover:bg-[#0F0E0A] hover:border-[#0F0E0A] hover:text-white hover:scale-105`}
        >
          <BsTwitterX className="w-3.5 h-3.5" />
        </a>

        {/* LinkedIn */}
        <a
          href={shareLinks.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn এ শেয়ার করুন"
          className={`${base} border-[#E8E4DC] bg-white text-[#7A7465] hover:bg-[#0A66C2] hover:border-[#0A66C2] hover:text-white hover:scale-105`}
        >
          <LiaLinkedin className="w-4 h-4" />
        </a>

        {/* Copy link */}
        <button
          onClick={handleCopyLink}
          aria-label="লিংক কপি করুন"
          className={`${base} border-[#E8E4DC] bg-white text-[#7A7465] hover:bg-[#16A34A] hover:border-[#16A34A] hover:text-white hover:scale-105 ${
            copied ? "bg-[#16A34A] border-[#16A34A] text-white scale-105" : ""
          }`}
        >
          {copied ? (
            <Check className="w-3.5 h-3.5" />
          ) : (
            <Copy className="w-3.5 h-3.5" />
          )}
          {/* Tooltip */}
          <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 bg-[#0F0E0A] text-white text-[10px] px-2 py-0.5 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-150">
            {copied ? "কপি হয়েছে!" : "লিংক কপি"}
          </span>
        </button>

        {/* Print */}
        <button
          onClick={handlePrint}
          aria-label="প্রিন্ট করুন"
          className={`${base} border-[#E8E4DC] bg-white text-[#7A7465] hover:bg-[#1a1a2e] hover:border-[#1a1a2e] hover:text-white hover:scale-105`}
        >
          <Printer className="w-3.5 h-3.5" />
        </button>
      </div>
    );
  }

  // ── Default variant ──
  return (
    <div className="relative print:hidden">
      <div className="flex items-center gap-1.5">
        {/* Share */}
        <button
          onClick={handleShare}
          aria-label="শেয়ার করুন"
          className={`${base} border-[#E8E4DC] bg-white text-[#7A7465] hover:bg-[#C0392B] hover:border-[#C0392B] hover:text-white hover:scale-105`}
        >
          <Share2 className="w-3.5 h-3.5" />
        </button>

        {/* Copy link */}
        <button
          onClick={handleCopyLink}
          aria-label="লিংক কপি করুন"
          className={`${base} border-[#E8E4DC] bg-white text-[#7A7465] hover:bg-[#16A34A] hover:border-[#16A34A] hover:text-white hover:scale-105 ${
            copied ? "bg-[#16A34A] border-[#16A34A] text-white" : ""
          }`}
        >
          {copied ? (
            <Check className="w-3.5 h-3.5" />
          ) : (
            <Copy className="w-3.5 h-3.5" />
          )}
        </button>

        {/* Print */}
        <button
          onClick={handlePrint}
          aria-label="প্রিন্ট করুন"
          className={`${base} border-[#E8E4DC] bg-white text-[#7A7465] hover:bg-[#1a1a2e] hover:border-[#1a1a2e] hover:text-white hover:scale-105`}
        >
          <Printer className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* ── Share Menu Dropdown ── */}
      {showShareMenu && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setShowShareMenu(false)}
          />
          <div className="absolute top-full right-0 mt-2 bg-white rounded-xl shadow-[0_8px_32px_0_rgba(26,26,46,0.14)] border border-[#E8E4DC] p-1.5 z-50 min-w-[180px]">
            {/* Triangle pointer */}
            <div className="absolute -top-1.5 right-3 w-3 h-3 bg-white border-l border-t border-[#E8E4DC] rotate-45" />

            <a
              href={shareLinks.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-3 py-2 text-sm text-[#2C2C2C] hover:bg-[#F7F5F0] rounded-lg transition-colors"
              onClick={() => setShowShareMenu(false)}
            >
              <span className="w-7 h-7 rounded-full bg-[#1877F2]/10 flex items-center justify-center flex-shrink-0">
                <FaFacebook className="w-3.5 h-3.5 text-[#1877F2]" />
              </span>
              <span className="font-medium">Facebook</span>
            </a>

            <a
              href={shareLinks.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-3 py-2 text-sm text-[#2C2C2C] hover:bg-[#F7F5F0] rounded-lg transition-colors"
              onClick={() => setShowShareMenu(false)}
            >
              <span className="w-7 h-7 rounded-full bg-[#0F0E0A]/10 flex items-center justify-center flex-shrink-0">
                <BsTwitterX className="w-3.5 h-3.5 text-[#0F0E0A]" />
              </span>
              <span className="font-medium">Twitter / X</span>
            </a>

            <a
              href={shareLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-3 py-2 text-sm text-[#2C2C2C] hover:bg-[#F7F5F0] rounded-lg transition-colors"
              onClick={() => setShowShareMenu(false)}
            >
              <span className="w-7 h-7 rounded-full bg-[#0A66C2]/10 flex items-center justify-center flex-shrink-0">
                <LiaLinkedin className="w-4 h-4 text-[#0A66C2]" />
              </span>
              <span className="font-medium">LinkedIn</span>
            </a>
          </div>
        </>
      )}
    </div>
  );
}
