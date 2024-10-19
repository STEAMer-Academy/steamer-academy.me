import { Redis } from '@upstash/redis'
import { LRUCache } from 'lru-cache'

export const redis = new Redis({
  url: process.env.REDIS_URL!,
  token: process.env.REDIS_TOKEN!,
})

export const cache = new LRUCache<string, object>({
  max: 100,
  ttl: 1000 * 60 * 60, // 1 hour
})
