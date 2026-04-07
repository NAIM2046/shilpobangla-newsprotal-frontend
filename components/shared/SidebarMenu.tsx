// src/components/shared/SidebarMenu.tsx

import React from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { Category } from "@/data/categories";

interface SidebarMenuProps {
  isOpen: boolean;
  onClose: () => void;
  categories: Category[];
}

const SidebarMenu = ({
  isOpen,
  onClose,
  categories = [],
}: SidebarMenuProps) => {
  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/70 backdrop-blur-sm z-[60] transition-opacity duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 left-0 w-[82%] md:w-[340px] h-full z-[70] flex flex-col transform transition-transform duration-300 ease-in-out shadow-2xl ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ background: "#12111f" }}
      >
        {/* Header */}
        <div className="flex justify-between items-center px-5 py-4 border-b border-white/10 flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-[3px] h-5 bg-[#C0392B] rounded-full" />
            <span className="text-base font-bold text-white tracking-wide">
              সব বিভাগ
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-[#C0392B] text-white hover:text-white transition-all duration-200"
          >
            <X size={16} />
          </button>
        </div>

        {/* Thin red line */}
        <div className="h-[2px] bg-gradient-to-r from-[#C0392B] via-[#C0392B]/50 to-transparent flex-shrink-0" />

        {/* Scrollable list */}
        <div className="overflow-y-auto flex-1 py-3 px-3">
          {Array.isArray(categories) &&
            categories.map((category) => {
              const hasChildren =
                category.children && category.children.length > 0;

              return (
                <div key={category.id} className="mb-1">
                  {/* Parent link */}
                  <Link
                    href={`/category/${category.slug}`}
                    className="block py-2.5 px-3 text-sm font-bold text-white hover:text-[#C0392B] hover:bg-white/5 rounded-lg transition-all duration-150"
                    onClick={onClose}
                  >
                    {category.name}
                  </Link>

                  {/* Children — always visible */}
                  {hasChildren && (
                    <div className="ml-4 mt-0.5 mb-2 pl-3 border-l-2 border-white/30 space-y-0.5">
                      {category.children!.map((child) => (
                        <Link
                          key={child.id}
                          href={`/category/${child.slug}`}
                          className="flex items-center gap-2 py-2 px-2 text-sm font-semibold text-white hover:text-[#C0392B] rounded-md hover:bg-white/5 transition-all duration-150 group"
                          onClick={onClose}
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-[#C0392B] group-hover:scale-125 transition-transform flex-shrink-0" />
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
        </div>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-white/10 flex-shrink-0">
          <p className="text-[10px] text-white/60 text-center tracking-widest uppercase">
            দৈনিক শিল্পবাংলা
          </p>
        </div>
      </div>
    </>
  );
};

export default SidebarMenu;
