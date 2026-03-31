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
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 250);
  };

  // 🔹 No children
  if (!hasChildren) {
    return (
      <Link
        href={`/category/${category.slug}`}
        className="px-3 py-1 font-bangla text-sm md:text-base whitespace-nowrap hover:text-gray-300 transition"
      >
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
      {/* Parent */}
      <button className="flex items-center gap-1.5 px-3 py-1 font-bangla text-sm md:text-base font-medium hover:text-gray-300 transition">
        {category.name}
        <ChevronDown
          size={14}
          className={`transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 pt-2 z-[999]">
          <div className="bg-gray-950 text-white min-w-[220px] rounded-lg shadow-2xl py-2 border border-gray-800 animate-in fade-in zoom-in-95 duration-200">
            {category.children!.map((child) => (
              <Link
                key={child.id}
                href={`/category/${child.slug}`}
                className="block px-4 py-2.5 text-sm font-bangla hover:bg-gray-800 transition whitespace-nowrap"
              >
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
