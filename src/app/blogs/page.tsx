import { Suspense } from "react";
import { fetchAllBlogs, BlogData } from "@/lib/blogs-query";
import { TypewriterEffectSmooth } from "@/components/wrappers/ui";
import { BlogTabs } from "@/components/wrappers/pages/Blogs";
import { Layout } from "@/components/wrappers/headerAndFooter";
import Loading from "@/app/loading";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "STEAMer Academy | Blogs",
  description: "The Home For All Blogs Made By Our People.",
};

export const revalidate = 7200; // Revalidate every 2 hours

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
