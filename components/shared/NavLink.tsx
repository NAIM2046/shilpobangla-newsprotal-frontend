// src/components/shared/NavLink.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { Category } from "@/data/categories";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

interface NavLinkProps {
  category: Category;
}

const NavLink: React.FC<NavLinkProps> = ({ category }) => {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const hasChildren = category.children && category.children.length > 0;

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setIsOpen(false), 220);
  };

  const linkBase =
    "relative px-3 py-1 text-[15px]  tracking-wide whitespace-nowrap text-white hover:text-white transition-colors duration-150 after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:h-[2px] after:w-0 after:bg-[#C0392B] after:transition-all after:duration-200 hover:after:w-4/5";

  if (!hasChildren) {
    return (
      <Link href={`/category/${category.slug}`} className={linkBase}>
        {category.name}
      </Link>
    );
  }

  return (
    <div
      className="relative inline-block z-50"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Parent button */}
      <button className={`flex items-center gap-1 ${linkBase}`}>
        {category.name}
        <ChevronDown
          size={13}
          className={`mt-px text-white transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 pt-2.5 z-[999]">
          {/* Invisible bridge so mouse doesn't leave the zone */}
          <div className="absolute -top-2.5 left-0 right-0 h-2.5" />
          <div className="bg-[#12111f] text-white min-w-[210px] rounded-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.4)] py-1.5 border border-white/10 overflow-hidden">
            {/* Red top accent */}
            <div className="h-[2px] bg-gradient-to-r from-[#C0392B] to-transparent mx-3 mb-1.5 rounded-full" />
            {category.children!.map((child) => (
              <Link
                key={child.id}
                href={`/category/${child.slug}`}
                className="flex items-center gap-2 px-4 py-2 text-[13px] font-semibold text-white hover:text-white hover:bg-white/10 transition-all duration-150 whitespace-nowrap group"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-white/40 group-hover:bg-white group-hover:scale-125 transition-all flex-shrink-0" />
                {child.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default NavLink;
