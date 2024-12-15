import { Context } from "hono";
import { env } from "hono/adapter";
import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import { blogs, categories } from "../db/schema";
import { Redis } from "@upstash/redis/cloudflare";
import { LRUCache } from "lru-cache";

interface Blog {
  name: string;
  description: string;
  rawUrl: string;
  image: string;
}

type BlogCategory =
  | "engineeringMds"
  | "englishMds"
  | "mathMds"
  | "scienceMds"
  | "technologyMds";

type BlogData = Record<BlogCategory, Blog[]>;

const blogsRoute = async (c: Context) => {
  const allowedOrigins = new Set([
    "https://www.steameracademy.me",
    "http://localhost:3000",
  ]);

  const origin = c.req.header("Origin");

  if (origin && allowedOrigins.has(origin)) {
    c.header("Access-Control-Allow-Origin", origin);
  }

  c.header("Access-Control-Allow-Methods", "POST, OPTIONS");
  c.header("Access-Control-Allow-Headers", "Content-Type");
  c.header("Access-Control-Allow-Credentials", "true");

  // Handle preflight request
  if (c.req.method === "OPTIONS") {
    return c.text("", 204);
  }

  const pool = new Pool({
    connectionString: env<{ DATABASE_URL: string }>(c).DATABASE_URL,
    ssl: { rejectUnauthorized: false },
    max: 3,
  });

  const db = drizzle(pool);

  const redis = new Redis({
    url: env<{ REDIS_URL: string }>(c).REDIS_URL,
    token: env<{ REDIS_TOKEN: string }>(c).REDIS_TOKEN,
  });

  const cache = new LRUCache<string, BlogData | string>({
    max: 100,
    ttl: 1000 * 60 * 30, // 30 minutes
  });

  async function fetchAllBlogs(): Promise<BlogData> {
    const cachedBlogs = cache.get("allBlogs");
    if (cachedBlogs && typeof cachedBlogs !== "string") {
      return cachedBlogs;
    }

    const redisBlogs = await redis.get<BlogData>("allBlogs");
    if (redisBlogs) {
      cache.set("allBlogs", redisBlogs);
      return redisBlogs;
    }

    const blogsFromPg = await fetchBlogsFromDB();

    await redis.set("allBlogs", blogsFromPg, { ex: 60 * 60 }); // 1 hour
    cache.set("allBlogs", blogsFromPg);

    return blogsFromPg;
  }

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

  async function fetchBlogContent(slug: string): Promise<string | null> {
    const allBlogs = await fetchAllBlogs();
    for (const category in allBlogs) {
      const blogs = allBlogs[category as BlogCategory];
      if (blogs) {
        const blog = blogs.find((b) => b.name === slug);
        if (blog) {
          const response = await fetch(blog.rawUrl);
          if (!response.ok) {
            throw new Error("Failed to fetch blog content");
          }
          return response.text();
        }
      }
    }
    return null;
  }

  // Handle different routes
  if (c.req.path === "/blogs") {
    try {
      const allBlogs = await fetchAllBlogs();
      return c.json(allBlogs);
    } catch (error) {
      console.error("Error fetching blogs:", error);
      return c.json({ error: "Failed to fetch blogs" }, 500);
    }
  } else if (c.req.path.startsWith("/blogs/")) {
    const slug = c.req.path.split("/blogs/")[1];
    try {
      const content = await fetchBlogContent(decodeURIComponent(slug));
      if (content) {
        return c.json({ content });
      } else {
        return c.json({ error: "Blog not found" }, 404);
      }
    } catch (error) {
      console.error("Error fetching blog content:", error);
      return c.json({ error: "Failed to fetch blog content" }, 500);
    }
  }

  return c.json({ error: "Not found" }, 404);
};

export default blogsRoute;
