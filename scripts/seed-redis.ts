/**
 * Seeds Upstash Redis with blog metadata discovered from the Steamer-Blogs GitHub repo.
 *
 * Always discovers fresh from GitHub — no local data file needed.
 *
 * Usage:
 *   bun seed
 *
 * Requires REDIS_URL and REDIS_TOKEN in .env.local
 */

import { Redis } from "@upstash/redis";
import type { BlogData } from "../src/lib/redis";
import { discoverBlogs } from "./discover";

const redis = new Redis({
  url: process.env.REDIS_URL!,
  token: process.env.REDIS_TOKEN!,
});

async function seed() {
  console.log("Discovering blogs from GitHub...");
  const blogData = await discoverBlogs();

  const total = Object.values(blogData).reduce(
    (s, blogs) => s + blogs.length,
    0,
  );
  console.log(`Writing ${total} blogs to Redis...`);
  await redis.set("allBlogs", blogData);

  const verify = await redis.get<BlogData>("allBlogs");
  const verified = verify
    ? Object.values(verify).reduce((s, blogs) => s + blogs.length, 0)
    : 0;
  console.log(`✅ Done. ${verified} blogs seeded.`);
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
