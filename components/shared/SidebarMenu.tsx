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

// 🌟 ডিফল্ট ভ্যালু হিসেবে [] দেওয়া হলো
const SidebarMenu = ({
  isOpen,
  onClose,
  categories = [],
}: SidebarMenuProps) => {
  return (
    <>
      <div
        className={`fixed inset-0 bg-black/60 z-[60] transition-opacity duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={onClose}
      />

      <div
        className={`fixed top-0 left-0 w-[80%] md:w-[350px] h-full bg-black text-white z-[70] transform transition-transform duration-300 ease-in-out flex flex-col shadow-2xl ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-5 border-b border-gray-800 bg-gray-900/50">
          <span className="text-xl font-bold font-bangla text-white">
            সব ক্যাটাগরি
          </span>
          <button
            onClick={onClose}
            className="p-2 hover:bg-red-600 hover:text-white bg-gray-800 rounded-full transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <div className="overflow-y-auto flex-1 py-5 px-5 space-y-4 custom-scrollbar">
          {/* 🌟 Array.isArray চেক করে map চালানো হলো */}
          {Array.isArray(categories) &&
            categories.map((category) => (
              <div key={category.id}>
                <Link
                  href={`/category/${category.slug}`}
                  className="block py-2.5 px-3 font-bangla text-lg font-medium hover:text-white text-gray-200 hover:bg-gray-800 rounded-md transition-all border-b border-gray-800/50 last:border-0"
                  onClick={onClose}
                >
                  {category.name}
                </Link>

                {category.children && (
                  <div className="pl-6 mt-2 space-y-1.5 border-l-2 border-gray-800 ml-2">
                    {category.children.map((child) => (
                      <Link
                        key={child.id}
                        href={`/category/${child.slug}`}
                        className="block py-1.5 px-3 text-sm font-bangla text-gray-400 hover:text-red-400 transition-colors"
                        onClick={onClose}
                      >
                        {child.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default SidebarMenu;
