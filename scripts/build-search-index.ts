/**
 * Builds search index from blog data + static pages.
 * No manual searchData.json maintenance needed.
 *
 * Reads data/blogs.json for blog entries, defines static pages inline,
 * creates MiniSearch index, and writes both searchData.json and searchIndex.json.
 *
 * Usage:
 *   bun run scripts/build-search-index.ts
 *
 * Called before next build via the "build" script in package.json.
 */

import { readFileSync, writeFileSync, existsSync } from "fs";
import MiniSearch from "minisearch";

interface SearchItem {
  id: string;
  title: string;
  content: string;
  url: string;
}

// ── Static page entries ────────────────────────────────────────

const staticPages: SearchItem[] = [
  {
    id: "home",
    title: "Home",
    content:
      "Welcome to STEAMer Academy, where we inspire young minds through Science, Technology, Engineering, Arts, and Mathematics.",
    url: "/",
  },
  {
    id: "about",
    title: "About Us",
    content:
      "STEAMer Academy is dedicated to providing innovative education in STEAM fields for children and young adults.",
    url: "/about",
  },
  {
    id: "english-club",
    title: "English Club",
    content:
      "Join our English Club to improve your language skills through interactive sessions and fun activities.",
    url: "/services/english-club",
  },
  {
    id: "code-club",
    title: "Code Club",
    content:
      "Join our Code Club to learn programming and computer science through hands-on projects and fun activities.",
    url: "/services/code-club",
  },
  {
    id: "blogs",
    title: "Blogs",
    content:
      "Read our blog posts to stay updated on the latest news, events, and activities at STEAMer Academy.",
    url: "/blogs",
  },
  {
    id: "gallery",
    title: "Gallery",
    content:
      "Explore our gallery to see photos and videos of our students engaging in various STEAM activities.",
    url: "/gallery",
  },
  {
    id: "contact",
    title: "Contact Us",
    content:
      "Get in touch with us to learn more about our programs and how to enroll your child in our classes.",
    url: "/contact",
  },
];

// ── Blog entries from data/blogs.json ──────────────────────────

function loadBlogEntries(): SearchItem[] {
  const path = "data/blogs.json";
  if (!existsSync(path)) {
    console.warn("⚠ data/blogs.json not found — skipping blog entries");
    return [];
  }

  const raw = readFileSync(path, "utf-8");
  const blogData: Record<string, Array<{ name: string; description: string; slug: string }>> =
    JSON.parse(raw);

  const entries: SearchItem[] = [];
  let index = 0;

  for (const category of Object.values(blogData)) {
    if (!Array.isArray(category)) continue;
    for (const blog of category) {
      entries.push({
        id: `blog-${index++}`,
        title: blog.name,
        content: blog.description,
        url: `/blogs/${blog.slug}`,
      });
    }
  }

  return entries;
}

// ── Build & write indexes ──────────────────────────────────────

const searchData: SearchItem[] = [...staticPages, ...loadBlogEntries()];

const miniSearch = new MiniSearch({
  fields: ["title", "content"],
  storeFields: ["id", "title", "content", "url"],
  idField: "url",
  searchOptions: {
    boost: { title: 2 },
    fuzzy: 0.2,
    prefix: true,
  },
});

miniSearch.addAll(searchData);

writeFileSync("public/searchData.json", JSON.stringify(searchData, null, 2));
writeFileSync("public/searchIndex.json", JSON.stringify(miniSearch));

const blogCount = searchData.length - staticPages.length;
console.log(
  `✅ Search index built: ${searchData.length} items (${staticPages.length} static + ${blogCount} blogs), ${(JSON.stringify(miniSearch).length / 1024).toFixed(1)}KB`,
);
