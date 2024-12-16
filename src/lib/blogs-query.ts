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

const API_URL = "https://api.steameracademy.me";

const cache = new LRUCache<string, BlogData | string>({
  max: 100,
  ttl: 1000 * 60 * 60 * 1, // 1 hours
});

export async function fetchAllBlogs(): Promise<BlogData> {
  const cachedBlogs = cache.get("allBlogs");
  if (cachedBlogs && typeof cachedBlogs === "object") {
    return cachedBlogs;
  }
  try {
    const response = await fetch(`${API_URL}/blogs`, {
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error(
        `HTTP error! status: ${response.status}. Error: ${response.statusText}`,
      );
    }
    const data = await response.json(); // Parse JSON only once
    cache.set("allBlogs", data);
    return data; // Return the parsed JSON
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return {} as BlogData; // Return an empty object instead of throwing
  }
}

export async function fetchBlogMetadata(slug: string): Promise<Blog | null> {
  try {
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
  } catch (error) {
    console.error("Error fetching blog metadata:", error);
    return null;
  }
}

export async function fetchBlogContent(slug: string): Promise<string | null> {
  const cachedContent = cache.get(`blog_${slug}`);
  if (cachedContent && typeof cachedContent === "string") {
    return cachedContent;
  }

  try {
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
  } catch (error) {
    console.error("Error fetching blog content:", error);
    return null;
  }
}
