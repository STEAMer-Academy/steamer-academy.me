"use client";

import { useEffect } from "react";
import { BlogData, BlogCategory } from "@/lib/redis";
import { BlogList } from "@/components/wrapper";
import { motion } from "framer-motion";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQueryState } from "nuqs";

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

  const [selectedCategory, setSelectedCategory] = useQueryState<BlogCategory>(
    "category",
    {
      parse: (value) =>
        categories.includes(value as BlogCategory)
          ? (value as BlogCategory)
          : categories[0],
      serialize: (value) => value,
    },
  );

  const [isMobile, setIsMobile] = useQueryState("isMobile", {
    parse: (value) => value === "true",
    serialize: (value) => value.toString(),
  });

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, [setIsMobile]);

  const currentCategory = selectedCategory || categories[0];

  return (
    <div className="space-y-8">
      <div className="relative">
        {isMobile ? (
          <Select
            value={currentCategory}
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
            value={currentCategory}
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
        key={currentCategory}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <BlogList blogs={blogs[currentCategory]} category={currentCategory} />
      </motion.div>
    </div>
  );
}
