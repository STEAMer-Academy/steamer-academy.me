"use client";

import { useState, useEffect } from "react";
import { BlogData, BlogCategory } from "@/lib/blogs-query";
import { BlogList } from "@/components/wrappers/pages/Blogs";
import { motion } from "motion/react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/components/wrappers/ui";

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
          <Select
            value={selectedCategory}
            onValueChange={(value) =>
              setSelectedCategory(value as BlogCategory)
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {capitalizeFirstLetter(category.replace("Mds", ""))}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ) : (
          <Tabs
            value={selectedCategory}
            onValueChange={(value) =>
              setSelectedCategory(value as BlogCategory)
            }
          >
            <TabsList className="grid w-full grid-cols-5">
              {categories.map((category) => (
                <TabsTrigger key={category} value={category}>
                  {capitalizeFirstLetter(category.replace("Mds", ""))}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        )}
      </div>

      <motion.div
        key={selectedCategory}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <BlogList
          blogs={blogs[selectedCategory] || []}
          category={selectedCategory}
        />
      </motion.div>
    </div>
  );
}
