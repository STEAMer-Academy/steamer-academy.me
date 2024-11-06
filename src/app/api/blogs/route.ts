import { NextResponse } from "next/server";
import { redis, cache, BlogData, BlogCategory } from "@/lib/redis";
import { Ratelimit } from "@upstash/ratelimit";
import { headers } from "next/headers";

// Create a new ratelimiter, that allows 5 requests per day
const ratelimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(5, "1 d"),
});

export async function GET(): Promise<
  NextResponse<BlogData | { error: string }>
> {
  const ip = (await headers()).get("x-forwarded-for") ?? "127.0.0.1";
  const { success } = await ratelimit.limit(ip);

  if (!success) {
    return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 });
  }

  const categories: BlogCategory[] = [
    "engineeringMds",
    "englishMds",
    "mathMds",
    "scienceMds",
    "technologyMds",
  ];
  const blogs: Partial<BlogData> = {};

  if (cache.has("allBlogs")) {
    const cachedBlogs = cache.get("allBlogs");
    if (cachedBlogs && typeof cachedBlogs !== "string") {
      return NextResponse.json(cachedBlogs);
    }
  }

  for (const category of categories) {
    const data = await redis.get<BlogData[BlogCategory]>(category);
    if (data) {
      blogs[category] = data;
    }
  }

  const typedBlogs = blogs as BlogData;
  cache.set("allBlogs", typedBlogs);

  return NextResponse.json(typedBlogs);
}

export const revalidate = 7200;
