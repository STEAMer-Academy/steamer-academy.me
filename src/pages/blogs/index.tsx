import Head from "next/head";
import Layout from "@/components/Layout";
import React, { useState } from "react";
import Link from "next/link";
import { useStore } from "@nanostores/react";
import { themeStore } from "@/stores/themeStore";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { motion } from "framer-motion";
import fs from "fs";
import path from "path";

interface BlogPost {
  title: string;
  category: string;
  slug: string;
  path: string;
}

interface Props {
  initialPosts: BlogPost[];
}

export default function Blog({ initialPosts }: Props) {
  const $theme = useStore(themeStore);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = Array.from(new Set(initialPosts.map((post) => post.category)));
  const filteredPosts = selectedCategory
    ? initialPosts.filter((post) => post.category === selectedCategory)
    : initialPosts;

  return (
    <>
      <Head>
        <title>STEAMer Academy | Blogs</title>
        <meta
          name="description"
          content="STEAMer Academy - Igniting passion for Science, Technology, Engineering, Arts, and Math"
        />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Layout>
        <div className={`container mx-auto px-4 max-w-screen-lg space-y-8 ${
          $theme === "dark" ? "bg-[#1a1b26] text-[#a9b1d6]" : "bg-white text-gray-900"
        }`}>
          <h1 className="text-4xl font-bold mb-8 text-center">Blogs</h1>

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
                        className={$theme === "dark" ? "text-white" : "text-gray-900"}
                      >
                        {post.title}
                      </CardTitle>
                      <CardDescription
                        className={$theme === "dark" ? "text-gray-400" : "text-gray-600"}
                      >
                        {post.category}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p
                        className={$theme === "dark" ? "text-gray-300" : "text-gray-700"}
                      >
                        Click to read more...
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </Layout>
    </>
  );
}

// Fetching blog posts using getStaticProps
export async function getStaticProps() {
  const contentDirectory = path.join(process.cwd(), 'src/pages/blogs/content');
  const fileNames = fs.readdirSync(contentDirectory);

  const blogPosts: BlogPost[] = fileNames
    .filter((fileName) => fileName.endsWith('.md') && !fileName.includes('README.md') && !fileName.includes('LICENSE'))
    .map((fileName) => {
      const title = fileName.replace('.md', ''); // Get the title by removing .md
      const category = 'your-category'; // Replace with actual logic to determine the category
      const slug = title.replace(/ /g, '-').toLowerCase(); // Convert spaces to hyphens

      return {
        title,
        category,
        slug,
        path: path.join('src/pages/blogs/content', fileName), // Store the original path if needed
      };
    });

  return {
    props: {
      initialPosts: blogPosts,
    },
  };
}

