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
  category: string;
  slug: string;
  path: string;
}

export default function Blogs() {
  const $theme = useStore(themeStore);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          "https://api.github.com/repos/STEAMer-Academy/Steamer-Blogs/git/trees/main?recursive=1"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch blog posts");
        }

        const data = await response.json();
        const blogPosts: BlogPost[] = data.tree
          .filter(
            (item: { path: string }) =>
              item.path.endsWith(".md") &&
              !item.path.includes("README.md") &&
              !item.path.includes("LICENSE")
          )
          .map((item: { path: string }) => {
            const pathParts = item.path.split("/");
            return {
              title: pathParts[pathParts.length - 1].replace(".md", ""),
              category: pathParts[0],
              slug: item.path.replace(/\//g, "-").replace(".md", "").toLowerCase(),
              path: item.path,
            };
          });
        setPosts(blogPosts);
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching blog posts:", err);
        setError("Failed to load blog posts. Please try again later.");
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const categories = Array.from(new Set(posts.map((post) => post.category)));

  const filteredPosts = selectedCategory
    ? posts.filter((post) => post.category === selectedCategory)
    : posts;

  return (
    <div>
      <Head>
        <title>Blogs - STEAMer Academy</title>
        <meta
          name="description"
          content="Explore our blog posts on various STEAM topics at STEAMer Academy."
        />
      </Head>

      <div
        className={`container mx-auto px-4 max-w-screen-lg space-y-8 ${
          $theme === "dark" ? "bg-[#1a1b26] text-[#a9b1d6]" : "bg-white text-gray-900"
        }`}
      >
        <h1 className="text-4xl font-bold mb-8 text-center">Blogs</h1>

        {isLoading ? (
          <p className="text-center">Loading blog posts...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <>
            <div className="flex flex-wrap gap-4 justify-center mb-8">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-4 py-2 rounded ${
                  !selectedCategory ? "bg-primary text-primary-foreground" : "bg-secondary"
                }`}
              >
                All
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded ${
                    selectedCategory === category ? "bg-primary text-primary-foreground" : "bg-secondary"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

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
                      className={`hover:shadow-lg transition-shadow duration-200 ${
                        $theme === "dark" ? "bg-gray-800 hover:bg-gray-700" : "bg-white hover:bg-gray-100"
                      }`}
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
                          {post.category}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p
                          className={
                            $theme === "dark" ? "text-gray-300" : "text-gray-700"
                          }
                        >
                          Click to read more...
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
