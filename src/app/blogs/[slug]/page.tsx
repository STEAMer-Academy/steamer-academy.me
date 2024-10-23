import { MDXRemote } from 'next-mdx-remote/rsc'
import { fetchBlogContent } from '@/lib/redis'
import Layout from '@/components/Layout'

export const revalidate = 7200 // Revalidate every 2 hours

interface BlogPostProps {
  params: {
    slug: string;
  };
}

export default async function BlogPost({ params }: BlogPostProps) {
  const content = await fetchBlogContent(decodeURIComponent(params.slug))

  if (!content) {
    return <div>Blog post not found</div>
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <article className="prose lg:prose-xl pt-5">
          <MDXRemote source={content} />
        </article>
      </div>
    </Layout>
  )
}
