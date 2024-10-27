"use client";

import { useState, useEffect } from "react";
import { BlogData, BlogCategory } from "@/lib/redis";
import BlogList from "./BlogList";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export default function BlogTabs({ blogs }: { blogs: BlogData }) {
  const categories: BlogCategory[] = [
    "engineeringMds",
    "englishMds",
    "mathMds",
    "scienceMds",
    "technologyMds",
  ];
  const [selectedCategory, setSelectedCategory] = useState<BlogCategory>(
    categories[0],
  );
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className="space-y-8">
      <div className="relative">
        {isMobile ? (
          <select
            value={selectedCategory}
            onChange={(e) =>
              setSelectedCategory(e.target.value as BlogCategory)
            }
            className="w-full rounded-lg border border-gray-700 bg-gray-800 p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Select blog category"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {capitalizeFirstLetter(category.replace("Mds", ""))}
              </option>
            ))}
          </select>
        ) : (
          <nav
            className="flex space-x-1 rounded-lg bg-gray-800 p-1"
            role="tablist"
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={cn(
                  "flex-1 rounded-md px-4 py-2 text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500",
                  selectedCategory === category
                    ? "bg-blue-600 text-white"
                    : "text-gray-400 hover:text-white",
                )}
                role="tab"
                aria-selected={selectedCategory === category}
                aria-controls={`tabpanel-${category}`}
              >
                {capitalizeFirstLetter(category.replace("Mds", ""))}
              </button>
            ))}
          </nav>
        )}
      </div>

      <motion.div
        key={selectedCategory}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        id={`tabpanel-${selectedCategory}`}
        role="tabpanel"
        aria-labelledby={`tab-${selectedCategory}`}
      >
        <BlogList blogs={blogs[selectedCategory]} category={selectedCategory} />
      </motion.div>
    </div>
  );
}
