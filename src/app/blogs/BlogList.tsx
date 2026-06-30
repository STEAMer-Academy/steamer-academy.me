"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Blog, BlogCategory } from "@/lib/redis";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { LazyMotion, domAnimation, m } from "framer-motion";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const EMPTY_BLOGS: Blog[] = [];

interface BlogListProps {
  blogs: Blog[];
  category: BlogCategory;
}

function PaginationItems({
  totalPages,
  currentPage,
  onPageChange,
}: {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  return (
    <>
      {pages.map((pageNum) => {
        if (
          pageNum === 1 ||
          pageNum === totalPages ||
          (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
        ) {
          return (
            <PaginationItem key={`page-${pageNum}`}>
              <PaginationLink
                onClick={() => onPageChange(pageNum)}
                isActive={currentPage === pageNum}
              >
                {pageNum}
              </PaginationLink>
            </PaginationItem>
          );
        } else if (pageNum === currentPage - 2 || pageNum === currentPage + 2) {
          return (
            <PaginationItem key={`ellipsis-${pageNum}`}>
              <PaginationEllipsis />
            </PaginationItem>
          );
        }
        return null;
      })}
    </>
  );
}

export default function BlogList({ blogs = EMPTY_BLOGS }: BlogListProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 6;
  const indexOfLastBlog = currentPage * blogsPerPage;
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

  return (
    <LazyMotion features={domAnimation}>
      <div className="space-y-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {currentBlogs.map((blog: Blog, index) => (
            <m.div
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
                    <div className="absolute inset-x-0 -top-px mx-auto h-px w-1/2 bg-linear-to-r from-transparent via-teal-500 to-transparent shadow-2xl" />
                    <span className="relative z-20">Read More</span>
                  </Button>
                </div>
              </Link>
            </m.div>
          ))}
        </div>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                // @ts-expect-error - Component prop type mismatch
                disabled={currentPage === 1}
              />
            </PaginationItem>
            <PaginationItems
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
            />
            <PaginationItem>
              <PaginationNext
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                // @ts-expect-error - Component prop type mismatch
                disabled={currentPage === totalPages}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </LazyMotion>
  );
}
