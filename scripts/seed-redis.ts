/**
 * Seed script for Upstash Redis.
 *
 * Discovers blog files from the Steamer-Blogs GitHub repo,
 * extracts metadata from each markdown file (title from first H1),
 * and writes the result to data/blogs.json.
 *
 * Run again with that file to write to Redis.
 *
 * Usage:
 *   bun seed                    # Discover + save to data/blogs.json
 *   bun seed data/blogs.json    # Write existing file to Redis
 *
 * Requires REDIS_URL and REDIS_TOKEN in .env.local
 */

import { readFileSync, existsSync, writeFileSync, mkdirSync } from "fs";
import { dirname } from "path";
import { Redis } from "@upstash/redis";
import type { BlogCategory, BlogData } from "../src/lib/redis";

const redis = new Redis({
  url: process.env.REDIS_URL!,
  token: process.env.REDIS_TOKEN!,
});

const GITHUB_OWNER = "STEAMer-Academy";
const GITHUB_REPO = "Steamer-Blogs";
const GITHUB_BRANCH = "main";

const CATEGORY_DIR_MAP: Record<string, BlogCategory> = {
  Engineering: "engineeringMds",
  English: "englishMds",
  Math: "mathMds",
  Science: "scienceMds",
  Technology: "technologyMds",
};

interface GitTreeItem {
  path: string;
  type: string;
}

function encodeRepoPath(path: string): string {
  return path.split("/").map((seg) => encodeURIComponent(seg)).join("/");
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function extractFirstImage(markdown: string): string | null {
  // Look for <img src="...">
  const imgMatch = markdown.match(/<img\s+[^>]*src="([^"]+)"[^>]*\/?>/i);
  if (imgMatch) return imgMatch[1];

  // Look for markdown image syntax ![alt](url)
  const mdMatch = markdown.match(/!\[.*?\]\(([^)]+)\)/);
  if (mdMatch) return mdMatch[1];

  return null;
}

async function listBlogFiles(): Promise<{ filePath: string; rawUrl: string }[]> {
  const headers: Record<string, string> = {};
  if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;

  const res = await fetch(
    `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/git/trees/${GITHUB_BRANCH}?recursive=1`,
    { headers },
  );

  if (!res.ok) throw new Error(`GitHub API ${res.status}: ${await res.text()}`);

  const data: { tree: GitTreeItem[] } = await res.json();
  return data.tree
    .filter((item) => item.type === "blob" && item.path.endsWith(".md") && item.path !== "README.md")
    .map((item) => ({
      filePath: item.path,
      rawUrl: `https://raw.githubusercontent.com/${GITHUB_OWNER}/${GITHUB_REPO}/${GITHUB_BRANCH}/${encodeRepoPath(item.path)}`,
    }));
}

function extractTitle(markdown: string): string | null {
  const lines = markdown.split("\n");
  const patterns = [
    /^#\s+(.+)/,                  // H1: # Title
    /^###\s+\*\*(.+?)\*\*/,   // H3 bold: ### **Title**
    /^##\s+(.+)/,                 // H2: ## Title
    /^\*\*(.+?)\*\*$/,         // Bold standalone: **Title**
    /^\*\*(.+?)\*\*\s*</,     // Bold before image: **Title**<img...
  ];

  // First pass: first 5 non-empty lines
  let nonEmpty = 0;
  for (const line of lines) {
    if (!line.trim()) continue;
    nonEmpty++;
    if (nonEmpty > 5) break;
    for (const re of patterns) {
      const m = line.trim().match(re);
      if (m) return m[1].trim();
    }
  }

  // Second pass: scan entire doc for first heading (H1/H2/H3 only, not standalone bold)
  for (const line of lines) {
    const t = line.trim();
    const h1 = t.match(/^#\s+(.+)/);
    if (h1) return h1[1].trim();
    const h3 = t.match(/^###\s+\*\*(.+?)\*\*/);
    if (h3) return h3[1].trim();
    const h2 = t.match(/^##\s+(.+)/);
    if (h2) return h2[1].trim();
  }

  return null;
}

function extractDescription(markdown: string): string {
  const cleaned = markdown.replace(/\\\n/g, "\n");
  const lines = cleaned.split("\n");

  // Find the first non-empty line after skipping:
  // - title-like lines (first few lines that look like headings/bold-titles)
  // - empty lines
  // - image-only lines
  // - horizontal rules
  let foundFirstContent = false;
  let sampled = 0;

  for (const line of lines) {
    const t = line.trim();
    if (!t) continue;

    // Title detection: skip lines that match heading or standalone bold
    if (!foundFirstContent) {
      if (t.startsWith("#") || t.startsWith("---") || t.startsWith("___")) continue;
      const standaloneBold = t.match(/^\*\*(.+?)\*\*$/);
      if (standaloneBold) continue;
      // First non-trivial line — mark that we're past the title
      foundFirstContent = true;
    }

    // Skip images and empty-ish lines
    if (t.startsWith("![") || t.startsWith("<img") || t.startsWith("___") || t.startsWith("---")) continue;

    // Return first real text line (strip remaining markdown)
    const text = t.replace(/[*_`\[\]]/g, "").trim();
    if (text.length > 10) return text.slice(0, 200);
    sampled++;
    if (sampled > 15) break;
  }

  return "";
}

function inferCategory(filePath: string): BlogCategory | null {
  return CATEGORY_DIR_MAP[filePath.split("/")[0]] || null;
}

async function discoverBlogs(): Promise<BlogData> {
  const blogData: BlogData = {
    engineeringMds: [], englishMds: [], mathMds: [], scienceMds: [], technologyMds: [],
  };

  const files = await listBlogFiles();
  console.log(`Found ${files.length} markdown files\n`);

  let i = 0;
  for (const file of files) {
    i++;
    const category = inferCategory(file.filePath);
    if (!category) { console.warn(`  [${i}/${files.length}] ⚠ Skipping ${file.filePath}`); continue; }

    const categoryName = file.filePath.split("/")[0];
    const res = await fetch(file.rawUrl);
    if (!res.ok) { console.warn(`  [${i}/${files.length}] ⚠ Can't fetch ${file.filePath}`); continue; }

    const content = await res.text();
    const title = extractTitle(content) || file.filePath.split("/").pop()!.replace(/\.md$/, "");
    const description = extractDescription(content) || `${categoryName} blog post`;
    const name = title.replace(/\*\*/g, "").replace(/\\$/, "").trim();
    const image = extractFirstImage(content);

    // Resolve relative image URLs to absolute GitHub raw URLs
    let resolvedImage = "";
    if (image) {
      if (image.startsWith("http")) {
        resolvedImage = image;
      } else {
        // Relative path — resolve against file directory
        const parts = file.filePath.split("/");
        parts.pop(); // remove filename
        const dir = parts.join("/");
        // Clean relative prefixes
        const clean = image.replace(/^\.\//, "");
        resolvedImage = `https://raw.githubusercontent.com/${GITHUB_OWNER}/${GITHUB_REPO}/${GITHUB_BRANCH}/${encodeRepoPath(dir + "/" + clean)}`;
      }
    }

    blogData[category].push({
      name,
      slug: slugify(name),
      description: description.replace(/\*\*/g, "").replace(/\\$/, "").trim(),
      rawUrl: file.rawUrl,
      image: resolvedImage,
    });

    console.log(`  [${i}/${files.length}] ${title}`);
  }

  return blogData;
}

async function seed() {
  const filePath = process.argv[2] || "data/blogs.json";

  if (existsSync(filePath)) {
    const blogData: BlogData = JSON.parse(readFileSync(filePath, "utf-8"));

    // Auto-populate slug from name if missing
    for (const category of Object.values(blogData)) {
      for (const blog of category) {
        if (!blog.slug) {
          blog.slug = slugify(blog.name);
        }
      }
    }

    const total = Object.values(blogData).reduce((s, blogs) => s + blogs.length, 0);
    console.log(`Writing ${total} blogs to Redis...`);
    await redis.set("allBlogs", blogData);

    const verify = await redis.get<BlogData>("allBlogs");
    const verified = verify
      ? Object.values(verify).reduce((s, blogs) => s + blogs.length, 0)
      : 0;
    console.log(`✅ Done. ${verified} blogs seeded.`);
    return;
  }

  // First run — discover from GitHub
  console.log("Discovering blogs from GitHub...");
  const blogData = await discoverBlogs();

  mkdirSync(dirname(filePath), { recursive: true });
  writeFileSync(filePath, JSON.stringify(blogData, null, 2));
  console.log(`\n✅ Saved to ${filePath}`);
  console.log("Review and edit names/descriptions/images, then run again:");
  console.log(`  bun seed`);
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
