import { Suspense } from "react";
import { fetchAllBlogs, BlogData, BlogCategory } from "@/lib/redis";
import BlogList from "./BlogList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Layout from "@/components/Layout";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";

export const revalidate = 7200; // Revalidate every 2 hours

export default async function BlogsPage() {
  const blogs: BlogData = await fetchAllBlogs();
  const categories: BlogCategory[] = [
    "engineeringMds",
    "englishMds",
    "mathMds",
    "scienceMds",
    "technologyMds",
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <TypewriterEffectSmooth
          words={[{ text: "Blogs" }]}
          className="mb-8 mt-6 text-center text-4xl font-bold"
        />
        <Tabs defaultValue={categories[0]} className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            {categories.map((category) => (
              <TabsTrigger
                key={category}
                value={category}
                className="capitalize"
              >
                {category.replace("Mds", "")}
              </TabsTrigger>
            ))}
          </TabsList>
          {categories.map((category) => (
            <TabsContent key={category} value={category}>
              <Suspense fallback={<div>Loading blogs...</div>}>
                <BlogList blogs={blogs[category]} category={category} />
              </Suspense>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </Layout>
  );
}
