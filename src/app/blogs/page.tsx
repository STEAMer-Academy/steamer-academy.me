import { Suspense } from "react";
import { fetchAllBlogs, BlogData } from "@/lib/redis";
import BlogTabs from "./BlogTabs";
import Layout from "@/components/Layout";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import Loading from "@/app/loading";

export const revalidate = 7200; // Revalidate every 2 hours
export const runtime = "edge";

export default async function BlogsPage() {
  const blogs: BlogData = await fetchAllBlogs();

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <TypewriterEffectSmooth
          words={[{ text: "Blogs" }]}
          className="mb-8 mt-6 text-center text-4xl font-bold"
        />
        <Suspense fallback={<Loading />}>
          <BlogTabs blogs={blogs} />
        </Suspense>
      </div>
    </Layout>
  );
}
