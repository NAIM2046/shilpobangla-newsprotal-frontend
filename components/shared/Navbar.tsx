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

const Navbar = ({ categories = [] }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const visibleCategories = Array.isArray(categories)
    ? categories.slice(0, 10)
    : [];

  return (
    <>
      <nav className="bg-[#1a1a2e] text-white sticky top-0 z-40 overflow-visible print:hidden border-b border-white/10">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="flex justify-between items-center h-11 md:h-12 overflow-visible">
            {/* Mobile: hamburger */}
            <button
              className="md:hidden p-1.5 rounded-md hover:bg-white/10 transition-colors"
              onClick={() => setIsMenuOpen(true)}
              aria-label="মেনু খুলুন"
            >
              <Menu size={22} />
            </button>

            {/* Desktop: nav links */}
            <div className="hidden md:flex items-center justify-center flex-1 gap-0.5 overflow-visible">
              {visibleCategories.map((category) => (
                <NavLink key={category.id} category={category} />
              ))}
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-1">
              <button
                className="p-2 rounded-md hover:bg-white/10 transition-colors"
                aria-label="অনুসন্ধান"
              >
                <Search size={18} />
              </button>
              <button
                className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold tracking-wide text-white hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                onClick={() => setIsMenuOpen(true)}
                title="সব ক্যাটাগরি"
              >
                <Menu size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom accent */}
        <div className="h-[2px] bg-gradient-to-r from-transparent via-[#C0392B] to-transparent opacity-80" />
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
