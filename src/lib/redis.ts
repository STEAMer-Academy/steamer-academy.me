import { Redis } from '@upstash/redis'
import { LRUCache } from 'lru-cache'

export interface Blog {
  name: string;
  description: string;
  rawUrl: string;
}

export type BlogCategory = 'engineeringMds' | 'englishMds' | 'mathMds' | 'scienceMds' | 'technologyMds';

export type BlogData = Record<BlogCategory, Blog[]>;

export const redis = new Redis({
  url: process.env.REDIS_URL!,
  token: process.env.REDIS_TOKEN!,
})

export const cache = new LRUCache<string, BlogData | string>({
  max: 100,
  ttl: 1000 * 60 * 60 * 2, // 2 hours
})

export async function fetchAllBlogs(): Promise<BlogData> {
  const categories: BlogCategory[] = ['engineeringMds', 'englishMds', 'mathMds', 'scienceMds', 'technologyMds'];
  const blogs: Partial<BlogData> = {};

  const cachedBlogs = cache.get('allBlogs');
  if (cachedBlogs && typeof cachedBlogs !== 'string') {
    return cachedBlogs;
  }

  for (const category of categories) {
    const data = await redis.get<Blog[]>(category);
    if (data) {
      blogs[category] = data;
    }
  }

  const typedBlogs = blogs as BlogData;
  cache.set('allBlogs', typedBlogs);
  return typedBlogs;
}

export async function fetchBlogContent(slug: string): Promise<string | null> {
  const categories: BlogCategory[] = ['engineeringMds', 'englishMds', 'mathMds', 'scienceMds', 'technologyMds'];
  
  const cachedContent = cache.get(`blog_${slug}`);
  if (cachedContent && typeof cachedContent === 'string') {
    return cachedContent;
  }

  const allBlogs = await fetchAllBlogs();

  for (const category of categories) {
    const blogs = allBlogs[category];
    if (blogs) {
      const blog = blogs.find(b => b.name === slug);
      if (blog) {
        const content = await fetch(blog.rawUrl).then(res => res.text());
        cache.set(`blog_${slug}`, content);
        return content;
      }
    }
  }

  return null;
}
