import { NextResponse } from 'next/server'
import { redis, cache } from '@/lib/redis'

export async function GET() {
  const categories = ['engineeringMds', 'englishMds', 'mathMds', 'scienceMds', 'techMds']
  const blogs: Record<string, unknown> = {}

  for (const category of categories) {
    if (cache.has(category)) {
      blogs[category] = cache.get(category)
    } else {
      const data = await redis.get(category)
      if (data) {
        blogs[category] = data
        cache.set(category, data)
      }
    }
  }

  return NextResponse.json(blogs)
}
