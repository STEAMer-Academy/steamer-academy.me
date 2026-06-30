import { NextResponse } from "next/server";

export async function GET() {
  const results: Record<string, any> = {};

  // Test Redis connection
  try {
    const { Redis } = await import("@upstash/redis");
    const redis = new Redis({ url: process.env.REDIS_URL!, token: process.env.REDIS_TOKEN! });
    const data = await redis.get("allBlogs");
    results.redis = { ok: true, hasData: !!data };
  } catch (e: any) {
    results.redis = { ok: false, error: e.message };
  }

  // Test fetch to raw.githubusercontent
  try {
    const resp = await fetch(
      "https://raw.githubusercontent.com/STEAMer-Academy/Steamer-Blogs/main/Math/Algebra/Why%20X%20Always%20Gets%20the%20Spotlight%F0%9F%A4%94.md",
    );
    const text = await resp.text();
    results.fetch = { ok: true, length: text.length, status: resp.status };
  } catch (e: any) {
    results.fetch = { ok: false, error: e.message };
  }

  // Test MDX serialization
  try {
    const { serialize } = await import("next-mdx-remote/serialize");
    const result = await serialize("# Hello\nThis is **test**.", {}, true);
    results.mdx = { ok: true, compiledLength: result.compiledSource.length };
  } catch (e: any) {
    results.mdx = { ok: false, error: e.message };
  }

  // Test MDXRemote RSC
  try {
    const { MDXRemote } = await import("next-mdx-remote/rsc");
    const element = await MDXRemote({ source: "# Hello" });
    results.mdxRemote = { ok: true, type: typeof element };
  } catch (e: any) {
    results.mdxRemote = { ok: false, error: e.message };
  }

  return NextResponse.json(results);
}
