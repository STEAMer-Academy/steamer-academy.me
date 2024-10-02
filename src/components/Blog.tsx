import React, { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { useStore } from "@nanostores/react";
import { themeStore } from "../stores/themeStore";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { motion } from "framer-motion";

interface BlogPost {
  title: string;
  date: string;
  excerpt: string;
  category: string;
  slug: string;
}

export default function Blog() {
  const $theme = useStore(themeStore);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    const fetchedPosts: BlogPost[] = [
      {
        title: "Welcome to a amazing world of mathematics",
        date: "2023-08-05",
        excerpt: "Discover the beauty of numbers and patterns...",
        category: "Math",
        slug: "welcome-to-mathematics",
      },
      {
        title: "Computers and Programming",
        date: "2023-08-07",
        excerpt: "Explore the fascinating world of coding...",
        category: "Technology",
        slug: "computers-and-programming",
      },
      {
        title: "What is a noun? A Cornerstone of Language",
        date: "2023-08-10",
        excerpt: "Understand the building blocks of sentences...",
        category: "English",
        slug: "what-is-a-noun",
      },
      {
        title: "Dive into Engineering: A Fun Guide for Beginners",
        date: "2023-08-15",
        excerpt: "Start your journey into the world of engineering...",
        category: "Engineering",
        slug: "dive-into-engineering",
      },
      {
        title: "Problem-Solution Text",
        date: "2023-08-20",
        excerpt: "Learn how to structure your writing to solve problems...",
        category: "English",
        slug: "problem-solution-text",
      },
    ];
    setPosts(fetchedPosts);
  }, []);

  const categories = Array.from(new Set(posts.map((post) => post.category)));

  const filteredPosts = selectedCategory
    ? posts.filter((post) => post.category === selectedCategory)
    : posts;

  return (
    <div>
      <Head>
        <meta
          name="description"
          content="Explore our blog posts on various STEAM topics at STEAMer Academy."
        />
      </Head>

      <div
        className={`container mx-auto px-4 max-w-screen-lg space-y-8 ${$theme === "dark" ? "bg-[#1a1b26] text-[#a9b1d6]" : "bg-white text-gray-900"}`}
      >
        {/* Title Section */}
        <h1 className="text-4xl font-bold mb-8 text-center">Blogs</h1>

        {/* Category Filter Section */}
        <div className="flex flex-wrap gap-4 justify-center mb-8">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-4 py-2 rounded ${!selectedCategory ? "bg-primary text-primary-foreground" : "bg-secondary"}`}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded ${selectedCategory === category ? "bg-primary text-primary-foreground" : "bg-secondary"}`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {filteredPosts.map((post, index) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={`/blogs/${post.slug}`} passHref>
                <Card
                  className={`hover:shadow-lg transition-shadow duration-200 ${$theme === "dark" ? "bg-gray-800 hover:bg-gray-700" : "bg-white hover:bg-gray-100"}`}
                >
                  <CardHeader>
                    <CardTitle
                      className={
                        $theme === "dark" ? "text-white" : "text-gray-900"
                      }
                    >
                      {post.title}
                    </CardTitle>
                    <CardDescription
                      className={
                        $theme === "dark" ? "text-gray-400" : "text-gray-600"
                      }
                    >
                      {post.date}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p
                      className={
                        $theme === "dark" ? "text-gray-300" : "text-gray-700"
                      }
                    >
                      {post.excerpt}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
