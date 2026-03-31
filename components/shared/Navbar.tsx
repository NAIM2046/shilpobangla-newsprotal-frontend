// src/components/shared/Navbar.tsx
"use client";

import { useState } from "react";
import { Menu, Search } from "lucide-react";
import NavLink from "./NavLink";
import SidebarMenu from "./SidebarMenu";
import { Category } from "@/data/categories";

interface NavbarProps {
  categories: Category[];
}

// 🌟 ১. ডিফল্ট ভ্যালু হিসেবে একটি খালি অ্যারে [] সেট করে দেওয়া হলো
const Navbar = ({ categories = [] }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // 🌟 ২. সেফটি চেক: categories আসলেই Array কি না তা চেক করে slice করা হলো
  const visibleCategories = Array.isArray(categories)
    ? categories.slice(0, 8)
    : [];

  return (
    <>
      <nav className="bg-black text-white sticky top-0 z-50 overflow-visible shadow-lg">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="flex justify-between items-center h-12 md:h-14 overflow-visible">
            <button
              className="md:hidden p-2 hover:text-gray-300 transition"
              onClick={() => setIsMenuOpen(true)}
            >
              <Menu size={24} />
            </button>

            <div className="hidden md:flex items-center justify-center flex-1 space-x-1 lg:space-x-3 overflow-visible">
              {/* 🌟 map চালানোর আগেও visibleCategories নিশ্চিত করা হলো */}
              {visibleCategories.map((category) => (
                <NavLink key={category.id} category={category} />
              ))}
            </div>

            <div className="flex items-center gap-2 md:gap-4">
              <button
                className="p-2 hover:text-gray-300 transition"
                aria-label="Search"
              >
                <Search size={20} />
              </button>

              <button
                className="hidden md:flex items-center gap-2 p-2 hover:text-red-500 transition cursor-pointer"
                onClick={() => setIsMenuOpen(true)}
                title="সব ক্যাটাগরি দেখুন"
              >
                <Menu size={24} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <SidebarMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        categories={Array.isArray(categories) ? categories : []}
      />
    </>
  );
};

export default Navbar;
