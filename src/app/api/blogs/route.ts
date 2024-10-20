import { NextResponse } from 'next/server'
import { redis, cache, BlogData, BlogCategory } from '@/lib/redis'

export async function GET(): Promise<NextResponse<BlogData>> {
  const categories: BlogCategory[] = ['engineeringMds', 'englishMds', 'mathMds', 'scienceMds', 'technologyMds']
  const blogs: Partial<BlogData> = {}

  if (cache.has('allBlogs')) {
    const cachedBlogs = cache.get('allBlogs')
    if (cachedBlogs && typeof cachedBlogs !== 'string') {
      return NextResponse.json(cachedBlogs)
    }
  }

  for (const category of categories) {
    const data = await redis.get<BlogData[BlogCategory]>(category)
    if (data) {
      blogs[category] = data
    }
  }

  const typedBlogs = blogs as BlogData
  cache.set('allBlogs', typedBlogs)

  return NextResponse.json(typedBlogs)
}

export const revalidate = 7200 
