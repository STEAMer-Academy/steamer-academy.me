import { MDXRemote } from 'next-mdx-remote/rsc'
import { redis, cache } from '@/lib/redis'

export const revalidate = 3600 // Revalidate every hour

type Blog = {
  name: string
  rawUrl: string
}

async function getBlogContent(slug: string) {
  const categories = ['engineeringMds', 'englishMds', 'mathMds', 'scienceMds', 'techMds']
  
  for (const category of categories) {
    if (cache.has(category)) {
      const blogs = cache.get(category) as Blog[]
      const blog = blogs.find(b => b.name === slug)
      if (blog) {
        return fetch(blog.rawUrl).then(res => res.text())
      }
    } else {
      const data = await redis.get(category) as Blog[]
      if (data) {
        cache.set(category, data)
        const blog = data.find(b => b.name === slug)
        if (blog) {
          return fetch(blog.rawUrl).then(res => res.text())
        }
      }
    }
  }

  return null
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const content = await getBlogContent(decodeURIComponent(params.slug))

  if (!content) {
    return <div>Blog post not found</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <article className="prose lg:prose-xl">
        <MDXRemote source={content} />
      </article>
    </div>
  )
}
