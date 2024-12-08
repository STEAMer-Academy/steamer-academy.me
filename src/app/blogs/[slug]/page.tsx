import { MDXRemote } from "next-mdx-remote/rsc";
import { fetchBlogContent, fetchBlogMetadata } from "@/lib/redis";
import { Layout } from "@/components/wrapper";
import { Metadata } from "next";
import { TracingBeam } from "@/components/ui/tracing-beam";

export const revalidate = 7200;

interface BlogPostProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: BlogPostProps): Promise<Metadata> {
  const { slug } = await params;
  const metadata = await fetchBlogMetadata(decodeURIComponent(slug));

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
      siteName: metadata.name,
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
  const { slug } = await params;
  const content = await fetchBlogContent(decodeURIComponent(slug));

  if (!content) {
    return <div>Blog post not found</div>;
  }

  return (
    <Layout>
      <div className="container mx-auto mt-8 px-4 py-8">
        <TracingBeam>
          <article className="prose prose-invert lg:prose-xl mt-8 max-w-none">
            <MDXRemote source={content} />
          </article>
        </TracingBeam>
      </div>
    </Layout>
  );
}
