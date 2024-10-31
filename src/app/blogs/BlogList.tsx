"use client";

import { useState } from "react";
import Link from "next/link";
import { Blog, BlogCategory } from "@/lib/redis";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { motion } from "framer-motion";
import Head from "next/head";

interface BlogListProps {
  blogs: Blog[];
  category: BlogCategory;
}

export const prefetchImages = (blogs: Blog[]) => {
  blogs.forEach((blog) => {
    const img = new window.Image();
    img.src = blog.image;
  });
};

export default function BlogList({ blogs }: BlogListProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 6;
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);
  const totalPages = Math.ceil(blogs.length / blogsPerPage);

  return (
    <>
      <Head>
        {/* Preload images dynamically */}
        {blogs.map((blog) => (
          <link key={blog.name} rel="preload" as="image" href={blog.image} />
        ))}
      </Head>
      <div className="space-y-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {currentBlogs.map((blog: Blog, index) => (
            <motion.div
              key={blog.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="overflow-hidden rounded-lg bg-gray-800 shadow-lg transition-all duration-300 hover:shadow-2xl"
            >
              <Link
                href={`/blogs/${encodeURIComponent(blog.name)}`}
                className="block"
              >
                <div className="relative h-48 w-full">
                  <Image
                    src={blog.image}
                    alt={`Image for ${blog.name}`}
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="mb-2 text-xl font-bold text-white">
                    {blog.name}
                  </h3>
                  <p className="mb-4 line-clamp-3 text-sm text-gray-300">
                    {blog.description}
                  </p>
                  <Button className="relative rounded-full border border-slate-600 bg-slate-700 px-8 py-2 text-sm text-white transition duration-200 hover:shadow-2xl hover:shadow-white/[0.1]">
                    <div className="absolute inset-x-0 -top-px mx-auto h-px w-1/2 bg-gradient-to-r from-transparent via-teal-500 to-transparent shadow-2xl" />
                    <span className="relative z-20">Read More</span>
                  </Button>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
        <div className="flex items-center justify-between">
          <Button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            variant="outline"
            className="text-black dark:text-white"
          >
            Previous
          </Button>
          <span className="text-black dark:text-white">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            variant="outline"
            className="text-black dark:text-white"
          >
            Next
          </Button>
        </div>
        {blogs.length > blogsPerPage && (
          <div className="text-center">
            <Button
              variant="outline"
              onClick={() => setCurrentPage(totalPages)}
              className="text-black dark:text-white"
            >
              Show all {blogs.length} blogs
            </Button>
          </div>
        )}
      </div>
    </>
  );
}
