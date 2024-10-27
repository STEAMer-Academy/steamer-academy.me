import { MDXRemote } from "next-mdx-remote/rsc";
import { fetchBlogContent, fetchBlogMetadata } from "@/lib/redis";
import Layout from "@/components/Layout";
import { Metadata } from "next";

export const revalidate = 7200; // Revalidate every 2 hours

interface BlogPostProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({
  params,
}: BlogPostProps): Promise<Metadata> {
  const metadata = await fetchBlogMetadata(decodeURIComponent(params.slug));

  if (!metadata) {
    return {};
  }

  return {
    title: metadata.name,
    description: metadata.description,
    openGraph: {
      title: metadata.name,
      description: metadata.description,
      images: [metadata.image],
    },
    twitter: {
      card: "summary_large_image",
      title: metadata.name,
      description: metadata.description,
      images: [metadata.image],
    },
  };
}

export default async function BlogPost({ params }: BlogPostProps) {
  const content = await fetchBlogContent(decodeURIComponent(params.slug));

  if (!content) {
    return <div>Blog post not found</div>;
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <article className="prose prose-invert lg:prose-xl max-w-none">
          <MDXRemote source={content} />
        </article>
      </div>
    </Layout>
  );
}
