"use client";

import { useState } from "react";
import Link from "next/link";
import { Blog, BlogCategory } from "@/lib/redis";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

interface BlogListProps {
  blogs: Blog[];
  category: BlogCategory;
}

export default function BlogList({ blogs }: BlogListProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 8;
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);
  const totalPages = Math.ceil(blogs.length / blogsPerPage);

  return (
    <div>
      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {currentBlogs.map((blog: Blog) => (
          <Card
            key={blog.name}
            className="transform shadow-lg transition duration-200 ease-in-out hover:scale-105"
          >
            <Link
              href={`/blogs/${encodeURIComponent(blog.name)}`}
              className="block"
            >
              <Image
                src={blog.image}
                alt={`Image for ${blog.name}`}
                width={400}
                height={250}
                className="h-40 w-full rounded-t-lg object-cover"
              />
            </Link>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">
                {blog.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-sm">{blog.description}</p>
              <Link href={`/blogs/${encodeURIComponent(blog.name)}`}>
                <Button className="relative rounded-full border border-slate-600 bg-slate-700 px-8 py-2 text-sm text-white transition duration-200 hover:shadow-2xl hover:shadow-white/[0.1]">
                  <div className="absolute inset-x-0 -top-px mx-auto h-px w-1/2 bg-gradient-to-r from-transparent via-teal-500 to-transparent shadow-2xl" />
                  <span className="relative z-20">Read more</span>
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="mt-4 flex items-center justify-between">
        <Button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <Button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
      {blogs.length > blogsPerPage && (
        <div className="mt-4 text-center">
          <Button variant="outline" onClick={() => setCurrentPage(totalPages)}>
            Show all {blogs.length} blogs
          </Button>
        </div>
      )}
    </div>
  );
}
