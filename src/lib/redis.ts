import { Redis } from "@upstash/redis";
import { LRUCache } from "lru-cache";

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

export const cache = new LRUCache<string, BlogData | string>({
  max: 100,
  ttl: 1000 * 60 * 60 * 2, // 2 hours
});

export async function fetchAllBlogs(): Promise<BlogData> {
  const cachedBlogs = cache.get("allBlogs");
  if (cachedBlogs && typeof cachedBlogs !== "string") {
    return cachedBlogs;
  }

  const redisBlogs = await redis.get<BlogData>("allBlogs");
  if (redisBlogs) {
    cache.set("allBlogs", redisBlogs);
    return redisBlogs;
  }

  // If not in cache or Redis, return an empty object
  // In a real-world scenario, you might want to fetch from a database here
  return {} as BlogData;
}

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
