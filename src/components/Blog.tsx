import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from 'framer-motion';
import React from 'react';
import '../styles/globals.css';

interface BlogPost {
  title: string;
  date: string;
  excerpt: string;
  category: string;
  slug: string;
}

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    const fetchedPosts: BlogPost[] = [
      { title: "Welcome to a amazing world of mathematics", date: "2023-08-05", excerpt: "Discover the beauty of numbers and patterns...", category: "Math", slug: "welcome-to-mathematics" },
      { title: "Computers and Programming", date: "2023-08-07", excerpt: "Explore the fascinating world of coding...", category: "Technology", slug: "computers-and-programming" },
      { title: "What is a noun? A Cornerstone of Language", date: "2023-08-10", excerpt: "Understand the building blocks of sentences...", category: "English", slug: "what-is-a-noun" },
      { title: "Dive into Engineering: A Fun Guide for Beginners", date: "2023-08-15", excerpt: "Start your journey into the world of engineering...", category: "Engineering", slug: "dive-into-engineering" },
      { title: "Problem-Solution Text", date: "2023-08-20", excerpt: "Learn how to structure your writing to solve problems...", category: "English", slug: "problem-solution-text" },
    ];
    setPosts(fetchedPosts);
  }, []);

  const categories = Array.from(new Set(posts.map(post => post.category)));

  const filteredPosts = selectedCategory
    ? posts.filter(post => post.category === selectedCategory)
    : posts;

  return (
    <div className="container mx-auto px-4 max-w-screen-lg space-y-8">
      {/* Title Section */}
      <h1 className="text-4xl font-bold mb-8 text-center">Blog</h1>

      {/* Category Filter Section */}
      <div className="flex flex-wrap gap-4 justify-center mb-8">
        <button
          onClick={() => setSelectedCategory(null)}
          className={`px-4 py-2 rounded ${!selectedCategory ? 'bg-primary text-primary-foreground' : 'bg-secondary'}`}
        >
          All
        </button>
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded ${selectedCategory === category ? 'bg-primary text-primary-foreground' : 'bg-secondary'}`}
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
            <a href={`/blog/${post.slug}`}>
              <Card className="hover:shadow-lg transition-shadow duration-200">
                <CardHeader>
                  <CardTitle>{post.title}</CardTitle>
                  <CardDescription>{post.date}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>{post.excerpt}</p>
                </CardContent>
              </Card>
            </a>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

