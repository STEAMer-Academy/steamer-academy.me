"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Blog, BlogCategory } from "@/lib/redis";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useQueryState } from "nuqs";

interface BlogListProps {
  blogs: Blog[];
  category: BlogCategory;
}

export default function BlogList({ blogs }: BlogListProps) {
  const [currentPage, setCurrentPage] = useQueryState("currentPage", {
    parse: (value) => parseInt(value || "1", 10),
    serialize: (value) => value.toString(),
  });

  const blogsPerPage = 6;
  const indexOfLastBlog = (currentPage || 1) * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);
  const totalPages = Math.ceil(blogs.length / blogsPerPage);

  useEffect(() => {
    // Prefetch images for the current page
    currentBlogs.forEach((blog) => {
      const img = new window.Image();
      img.src = blog.image;
    });
  }, [currentBlogs]);

  const renderPaginationItems = () => {
    const items = [];
    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= (currentPage || 1) - 1 && i <= (currentPage || 1) + 1)
      ) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink
              onClick={() => setCurrentPage(i)}
              isActive={currentPage === i}
            >
              {i}
            </PaginationLink>
          </PaginationItem>,
        );
      } else if (i === (currentPage || 1) - 2 || i === (currentPage || 1) + 2) {
        items.push(
          <PaginationItem key={i}>
            <PaginationEllipsis />
          </PaginationItem>,
        );
      }
    }
    return items;
  };

  return (
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
              prefetch={true}
            >
              <div className="relative h-48 w-full">
                <Image
                  src={blog.image}
                  alt={`Image for ${blog.name}`}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-300 hover:scale-105"
                  priority={index < 3}
                  loading={index < 3 ? "eager" : "lazy"}
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
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() =>
                setCurrentPage((prev) => Math.max((prev || 1) - 1, 1))
              }
              aria-disabled={currentPage === 1}
            />
          </PaginationItem>
          {renderPaginationItems()}
          <PaginationItem>
            <PaginationNext
              onClick={() =>
                setCurrentPage((prev) => Math.min((prev || 1) + 1, totalPages))
              }
              aria-disabled={currentPage === totalPages}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
