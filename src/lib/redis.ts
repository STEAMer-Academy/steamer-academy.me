import { Redis } from "@upstash/redis";
import { LRUCache } from "lru-cache";
import { db } from "@/lib/db"; // Import your database connection
import { blogs, categories } from "@/lib/schema"; // Import Drizzle schemas

export interface Blog {
  name: string;
  description: string;
  rawUrl: string;
  image: string;
}

export type BlogCategory =
  | "engineeringMds"
  | "englishMds"
  | "mathMds"
  | "scienceMds"
  | "technologyMds";

export type BlogData = Record<BlogCategory, Blog[]>;

export const redis = new Redis({
  url: process.env.REDIS_URL!,
  token: process.env.REDIS_TOKEN!,
});

// LRU Cache: 30-minute expiration
export const cache = new LRUCache<string, BlogData | string>({
  max: 100,
  ttl: 1000 * 60 * 30, // 30 minutes
});

// Fetch all blogs, implementing the caching strategy
export async function fetchAllBlogs(): Promise<BlogData> {
  const cachedBlogs = cache.get("allBlogs");
  if (cachedBlogs && typeof cachedBlogs !== "string") {
    return cachedBlogs;
  }

  // Check Redis cache (1-hour expiration)
  const redisBlogs = await redis.get<BlogData>("allBlogs");
  if (redisBlogs) {
    cache.set("allBlogs", redisBlogs);
    return redisBlogs;
  }

  // Fetch from PostgreSQL
  const blogsFromPg = await fetchBlogsFromDB();

  // Cache in Redis with 1-hour TTL
  await redis.set("allBlogs", blogsFromPg, { ex: 60 * 60 }); // 1 hour

  // Cache in LRU with 30-minute TTL
  cache.set("allBlogs", blogsFromPg);

  return blogsFromPg;
}

// Fetch blog metadata by slug
export async function fetchBlogMetadata(slug: string): Promise<Blog | null> {
  const allBlogs = await fetchAllBlogs();

  for (const category in allBlogs) {
    const blogs = allBlogs[category as BlogCategory];
    if (blogs) {
      const blog = blogs.find((b) => b.name === slug);
      if (blog) {
        return blog;
      }
    }
  }

  return null;
}

// Fetch blog content by slug
export async function fetchBlogContent(slug: string): Promise<string | null> {
  const cachedContent = cache.get(`blog_${slug}`);
  if (cachedContent && typeof cachedContent === "string") {
    return cachedContent;
  }

  const allBlogs = await fetchAllBlogs();

  for (const category in allBlogs) {
    const blogs = allBlogs[category as BlogCategory];
    if (blogs) {
      const blog = blogs.find((b) => b.name === slug);
      if (blog) {
        const content = await fetch(blog.rawUrl).then((res) => res.text());
        cache.set(`blog_${slug}`, content);
        return content;
      }
    }
  }

  return null;
}

// Fetch blogs from PostgreSQL
async function fetchBlogsFromDB(): Promise<BlogData> {
  const categoriesFromDB = await db.select().from(categories);
  const blogsFromDB = await db.select().from(blogs);

  const categorizedBlogs: BlogData = categoriesFromDB.reduce(
    (acc, category) => {
      acc[category.name as BlogCategory] = blogsFromDB
        .filter((blog) => blog.categoryId === category.id)
        .map((blog) => ({
          name: blog.name,
          description: blog.description,
          rawUrl: blog.rawUrl,
          image: blog.image,
        }));
      return acc;
    },
    {} as BlogData,
  );

  return categorizedBlogs;
}
