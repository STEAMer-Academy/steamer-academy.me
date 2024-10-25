"use client";

import { useState } from "react";
import Link from "next/link";
import { Blog, BlogCategory } from "@/lib/redis";
import { Button } from "@/components/ui/button";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import Image from "next/image";
import { cn } from "@/lib/utils";
import {
  IconClipboardCopy,
  IconFileBroken,
  IconSignature,
  IconTableColumn,
  IconArrowWaveRightUp,
} from "@tabler/icons-react";

interface BlogListProps {
  blogs: Blog[];
  category: BlogCategory;
}

const icons = [
  IconClipboardCopy,
  IconFileBroken,
  IconSignature,
  IconTableColumn,
  IconArrowWaveRightUp,
];

export default function BlogList({ blogs }: BlogListProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 6;
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);
  const totalPages = Math.ceil(blogs.length / blogsPerPage);

  return (
    <div className="space-y-8">
      <BentoGrid className="max-w-7xl mx-auto">
        {currentBlogs.map((blog: Blog, i) => {
          const Icon = icons[i % icons.length];
          return (
            <BentoGridItem
              key={blog.name}
              title={blog.name}
              description={
                <div>
                  <p className="font-sans font-normal text-neutral-600 text-xs dark:text-neutral-300">
                    {blog.description}
                  </p>
                  <Link
                    href={`/blogs/${encodeURIComponent(blog.name)}`}
                    className="mt-2 inline-block"
                  >
                    <Button className="w-full bg-slate-900 text-white hover:bg-slate-800">
                      Read more
                    </Button>
                  </Link>
                </div>
              }
              header={
                <div className="relative w-full h-40 mb-4">
                  <Image
                    src={blog.image || "/placeholder.svg"}
                    alt={blog.name}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
              }
              icon={<Icon className="h-4 w-4 text-neutral-500" />}
              className={cn(
                i === 3 || i === 4 ? "md:col-span-2" : "",
                "group cursor-pointer"
              )}
            />
          );
        })}
      </BentoGrid>
      <div className="flex items-center justify-between">
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
        <div className="text-center">
          <Button variant="outline" onClick={() => setCurrentPage(totalPages)}>
            Show all {blogs.length} blogs
          </Button>
        </div>
      )}
    </div>
  );
}
