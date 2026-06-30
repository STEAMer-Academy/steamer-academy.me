import { Redis } from "@upstash/redis";
import { LRUCache } from "lru-cache";

export interface Blog {
  name: string;
  slug: string;
  description: string;
  rawUrl: string;
  image: string;
}

export type BlogCategory =
  "engineeringMds" | "englishMds" | "mathMds" | "scienceMds" | "technologyMds";

export type BlogData = Record<BlogCategory, Blog[]>;

const redis = new Redis({
  url: process.env.REDIS_URL!,
  token: process.env.REDIS_TOKEN!,
});

const cache = new LRUCache<string, BlogData | string>({
  max: 100,
  ttl: 1000 * 60 * 60 * 2, // 2 hours
});

export async function fetchAllBlogs(): Promise<BlogData> {
  const cachedBlogs = cache.get("allBlogs");
  if (cachedBlogs && typeof cachedBlogs === "object") {
    return cachedBlogs;
  }

  const redisBlogs = await redis.get<BlogData>("allBlogs");
  if (redisBlogs && typeof redisBlogs === "object") {
    cache.set("allBlogs", redisBlogs);
    return redisBlogs;
  }

  // Provide a default object with all categories as empty arrays
  return {
    engineeringMds: [],
    englishMds: [],
    mathMds: [],
    scienceMds: [],
    technologyMds: [],
  };
}
export async function fetchBlogMetadata(slug: string): Promise<Blog | null> {
  const allBlogs = await fetchAllBlogs();

  // Build a flat map by slug for O(1) lookup
  const blogMap = new Map<string, Blog>();
  for (const category of Object.values(allBlogs)) {
    for (const blog of category) {
      blogMap.set(blog.slug, blog);
    }
  }

  return blogMap.get(slug) ?? null;
}

export async function fetchBlogContent(slug: string): Promise<string | null> {
  const cachedContent = cache.get(`blog_${slug}`);
  if (cachedContent && typeof cachedContent === "string") {
    return cachedContent;
  }

  const allBlogs = await fetchAllBlogs();

  // Build a flat map by slug for O(1) lookup
  const blogMap = new Map<string, Blog>();
  for (const category of Object.values(allBlogs)) {
    for (const blog of category) {
      blogMap.set(blog.slug, blog);
    }
  }

  const blog = blogMap.get(slug);
  if (!blog) {
    return null;
  }

  const content = await fetch(blog.rawUrl).then((res) => res.text());
  cache.set(`blog_${slug}`, content);
  return content;
}
