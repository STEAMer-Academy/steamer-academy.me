/**
 * Shared blog discovery from the Steamer-Blogs GitHub repo.
 *
 * Uses remark (proper markdown AST parser) for title/description/image extraction.
 * Deterministic: same GitHub content → same output every time.
 */

import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import { visit } from "unist-util-visit";
import type { Heading, Paragraph, Image, Root, Text } from "mdast";
import type { BlogCategory, BlogData } from "../src/lib/redis";

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

function textContent(node: any): string {
  if (node.type === "text") return (node as Text).value;
  if (node.children) return node.children.map(textContent).join("");
  return "";
}

/** Path-based title overrides for files with bad/junk H1 titles. */
const TITLE_OVERRIDES: Record<string, string> = {
  "Engineering/Part 1/Engineering Blog Part. 1.md":
    "Dive into Engineering: A Fun Guide for Engineering 🚀 !",
  "Math/Geometry/Part 1/GEOMETRY.md": "Introduction to Geometry",
  "Math/Geometry/Part 2/trigonometry  (1).md": "Understanding Trigonometry",
  "Science/Biology/Part 1/BIOLOGY.md": "Introduction to Biology",
  "Science/Physics/Part 1/besic of physics.md":
    "Unlocking the Mysteries of the Universe: A Casual Dive into Physics",
  "Science/Physics/Part 2/Physics (1).md": "What are Newton's Laws of Motion",
  "Technology/Part 2/Basic Components Of A Computer And How They Work.md":
    "Basic Components of a Computer and How They Work",
};

/** Path-based description overrides matching the curated data/blogs.json. */
const DESCRIPTION_OVERRIDES: Record<string, string> = {
  "Engineering/Part 1/Engineering Blog Part. 1.md":
    "Engineering is the art of solving problems and making awesome things work. Engineers use science and math to turn ideas into real-life creations. Whether it's designing a new robot or building a bridge, engineers make the impossible possible!",
  "Engineering/Part 2/Engineering Blog Part 2.md":
    "Welcome to our deep dive into pressure—a fundamental concept that influences many aspects of our daily lives and engineering marvels! Whether you're curious about how your tires work or why certain tools are shaped the way they are, this guide covers it all.",
  "English/Part 1/Noun-1.md":
    "Nouns are the fundamental words in any language, serving as the names for people, places, things, and ideas. They are the essential components that form the backbone of sentences.",
  "English/Part 2/Overview of Verb.md":
    "Verbs are the words that show action. They are an essential part of language that help us express action, state, or occurrence.",
  "Math/Algebra/Why X Always Gets the Spotlight🤔.md":
    "Ever wonder why X is always the star of the show in algebra? Let's dig into the mystery of why X became the go-to letter for the unknown.",
  "Math/Geometry/Part 1/GEOMETRY.md":
    "Geometry, the branch of mathematics concerned with the shape of individual objects, spatial relationships among various objects, and the properties of surrounding space.",
  "Math/Geometry/Part 2/trigonometry  (1).md":
    "Trigonometry is a branch of mathematics concerned with relationships between angles and side lengths of triangles. Learn about sin, cos, tan and their values for important angles.",
  "Science/Biology/Part 1/BIOLOGY.md":
    "The word biology is derived from the Greek words meaning life and study, and is defined as the science of life and living organisms. An organism is a living entity consisting of one cell or several cells.",
  "Science/Physics/Part 1/besic of physics.md":
    "Hey there, curious minds! Welcome to the weird and wonderful world of physics—a place where we try to make sense of the universe, from the tiniest particles to the farthest galaxies.",
  "Science/Physics/Part 2/Physics (1).md":
    "Physics is the natural science of matter, involving the study of matter, its fundamental constituents, its motion and behavior through space and time, and the related entities of energy and force.",
  "Technology/Part 1/Part 1.md":
    "A computer is a machine that can be programmed to carry out sequences of arithmetic or logical operations automatically. Learn about types of computers, programming languages, and more.",
  "Technology/Part 2/Basic Components Of A Computer And How They Work.md":
    "A computer is a machine that can be programmed to carry out sequences of arithmetic or logical operations automatically. Learn about hardware, software, CPU, RAM, and storage.",
};

/** Image overrides — for files that have no image in the markdown. */
const IMAGE_OVERRIDES: Record<string, string> = {
  "English/Part 1/Noun-1.md":
    "https://raw.githubusercontent.com/STEAMer-Academy/Steamer-Blogs/refs/heads/main/English/Part%201/Images/image%201.webp",
  "English/Part 2/Overview of Verb.md":
    "https://raw.githubusercontent.com/STEAMer-Academy/Steamer-Blogs/refs/heads/main/English/Part%202/Images/Image%201.webp",
  "Math/Algebra/Why X Always Gets the Spotlight🤔.md":
    "https://raw.githubusercontent.com/STEAMer-Academy/Steamer-Blogs/refs/heads/main/Math/Algebra/Images/Image%201.webp",
  "Technology/Part 2/Basic Components Of A Computer And How They Work.md":
    "https://raw.githubusercontent.com/STEAMer-Academy/Steamer-Blogs/refs/heads/main/Technology/Part%202/images/hardware%20vs%20software.webp",
};

// ── Markdown parsing ───────────────────────────────────────────

const parser = unified().use(remarkParse).use(remarkGfm);

interface ParsedDoc {
  title: string;
  description: string;
  firstImage: string | null;
}

function parseMarkdown(content: string, filePath: string): ParsedDoc {
  const tree = parser.parse(content) as Root;

  const title =
    TITLE_OVERRIDES[filePath] ??
    extractTitleFromAST(tree) ??
    filenameAsTitle(filePath);

  const description =
    DESCRIPTION_OVERRIDES[filePath] ?? extractDescription(tree);

  const firstImage =
    IMAGE_OVERRIDES[filePath] ?? extractFirstImage(tree);

  return { title, description, firstImage };
}

function flattenHeading(heading: Heading): string {
  return heading.children.map(textContent).join("").trim();
}

function extractTitleFromAST(tree: Root): string | null {
  // First pass: look for H1
  let title: string | null = null;
  visit(tree, "heading", (node: Heading) => {
    if (title !== null) return;
    if (node.depth === 1) {
      const text = flattenHeading(node);
      if (text.length > 0 && text.length < 120) title = text;
    }
  });
  if (title) return title;

  // Second pass: look for H2/H3
  visit(tree, "heading", (node: Heading) => {
    if (title !== null) return;
    const text = flattenHeading(node);
    if (text.length > 0 && text.length < 120) title = text;
  });
  if (title) return title;

  // Third pass: look for the first bold-only paragraph in the document.
  // Many blog files use **bold text** as titles instead of markdown headings.
  visit(tree, "paragraph", (node: Paragraph) => {
    if (title !== null) return;

    const hasOnlyBold =
      node.children.length === 1 &&
      node.children[0].type === "strong";
    if (!hasOnlyBold) return;

    const strong = node.children[0] as any;
    const text = strong.children.map(textContent).join("").trim();
    if (text.length > 5 && text.length < 120) title = text;
  });

  return title;
}

function extractDescription(tree: Root): string {
  let description = "";

  // Find the first paragraph that's substantive
  visit(tree, "paragraph", (node: Paragraph) => {
    if (description) return; // already found
    const text = node.children.map(textContent).join("").trim();
    if (text.length > 15) {
      // Skip short captions or image-only paragraphs
      description = text.slice(0, 200).replace(/[*_`]/g, "").trim();
    }
  });

  return description;
}

function extractFirstImage(tree: Root): string | null {
  let imageUrl: string | null = null;

  visit(tree, "image", (node: Image) => {
    if (imageUrl !== null) return;
    const url = (node as Image).url?.trim();
    if (url) imageUrl = url;
  });

  // Also check HTML img tags (remark doesn't parse raw HTML)
  if (!imageUrl) {
    const html = tree as any;
    visit(html, "html", (node: any) => {
      if (imageUrl !== null) return;
      const match = node.value?.match(/<img\s+[^>]*src="([^"]+)"[^>]*\/?>/i);
      if (match) imageUrl = match[1];
    });
  }

  return imageUrl;
}

function filenameAsTitle(filePath: string): string {
  return filePath.split("/").pop()!.replace(/\.md$/, "").replace(/[-_]/g, " ");
}

// ── File listing ───────────────────────────────────────────────

export interface BlogFile {
  filePath: string;
  rawUrl: string;
}

async function listBlogFiles(): Promise<BlogFile[]> {
  const headers: Record<string, string> = {};
  if (process.env.GITHUB_TOKEN)
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;

  const res = await fetch(
    `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/git/trees/${GITHUB_BRANCH}?recursive=1`,
    { headers },
  );

  if (!res.ok)
    throw new Error(`GitHub API ${res.status}: ${await res.text()}`);

  const data: { tree: GitTreeItem[] } = await res.json();
  return data.tree
    .filter(
      (item) =>
        item.type === "blob" &&
        item.path.endsWith(".md") &&
        item.path !== "README.md",
    )
    .map((item) => ({
      filePath: item.path,
      rawUrl: `https://raw.githubusercontent.com/${GITHUB_OWNER}/${GITHUB_REPO}/${GITHUB_BRANCH}/${encodeRepoPath(item.path)}`,
    }));
}

function inferCategory(filePath: string): BlogCategory | null {
  return CATEGORY_DIR_MAP[filePath.split("/")[0]] || null;
}

// ── Image URL resolution ───────────────────────────────────────

function resolveImageUrl(image: string | null, filePath: string): string {
  if (!image) return "";

  if (image.startsWith("http")) return image;

  // Relative path — resolve against file directory
  const parts = filePath.split("/");
  parts.pop(); // remove filename
  const dir = parts.join("/");
  const clean = image.replace(/^\.\//, "");
  return `https://raw.githubusercontent.com/${GITHUB_OWNER}/${GITHUB_REPO}/${GITHUB_BRANCH}/${encodeRepoPath(dir + "/" + clean)}`;
}

// ── Public API ─────────────────────────────────────────────────

export async function discoverBlogs(): Promise<BlogData> {
  const blogData: BlogData = {
    engineeringMds: [],
    englishMds: [],
    mathMds: [],
    scienceMds: [],
    technologyMds: [],
  };

  const files = await listBlogFiles();
  console.log(`Found ${files.length} markdown files`);

  let i = 0;
  for (const file of files) {
    i++;
    const category = inferCategory(file.filePath);
    if (!category) {
      console.warn(`  [${i}/${files.length}] ⚠ Skipping ${file.filePath}`);
      continue;
    }

    const res = await fetch(file.rawUrl);
    if (!res.ok) {
      console.warn(`  [${i}/${files.length}] ⚠ Can't fetch ${file.filePath}`);
      continue;
    }

    const content = await res.text();
    const { title, description, firstImage } = parseMarkdown(
      content,
      file.filePath,
    );

    // Clean up name: strip **, trailing \, trailing ?
    const name = title
      .replace(/\*\*/g, "")
      .replace(/\\+$/, "")
      .replace(/\?+$/, "")
      .trim();

    const image = resolveImageUrl(firstImage, file.filePath);

    blogData[category].push({
      name,
      slug: slugify(name),
      description: description.replace(/\*\*/g, "").replace(/\\+$/, "").trim(),
      rawUrl: file.rawUrl,
      image,
    });

    console.log(`  [${i}/${files.length}] ${name}`);
  }

  return blogData;
}
