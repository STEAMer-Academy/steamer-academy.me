import React from "react";
import { GetStaticProps, GetStaticPaths } from "next";
import Head from "next/head";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useStore } from "@nanostores/react";
import { themeStore } from "../../stores/themeStore";
import Layout from "@/components/Layout";
import fs from "fs";
import path from "path";

interface BlogPostProps {
  post: {
    title: string;
    category: string;
    content: string;
  };
}

export default function BlogPost({ post }: BlogPostProps) {
  const $theme = useStore(themeStore);

  return (
    <Layout>
      <Head>
        <title>{post.title} | STEAMer Academy</title>
        <meta
          name="description"
          content={`Read about ${post.title} in our ${post.category} category.`}
        />
      </Head>
      <div
        className={`container mx-auto max-w-screen-lg px-4 py-8 ${
          $theme === "dark"
            ? "bg-[#1a1b26] text-[#a9b1d6]"
            : "bg-white text-gray-900"
        }`}
      >
        <h1 className="mb-4 text-4xl font-bold">{post.title}</h1>
        <p className="mb-8 text-xl">Category: {post.category}</p>
        <div className="prose dark:prose-invert max-w-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {post.content}
          </ReactMarkdown>
        </div>
      </div>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const contentDirectory = path.join(process.cwd(), "src/pages/blogs/content");
  const fileNames = fs.readdirSync(contentDirectory);

  const paths = fileNames.map((fileName) => {
    const slug = fileName
      .replace(/\.md$/, "") // Remove the .md extension
      .replace(/ /g, "-"); // Replace spaces with hyphens
    return {
      params: { slug },
    };
  });

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  const contentDirectory = path.join(process.cwd(), "src/pages/blogs/content");
  const filePath = path.join(contentDirectory, `${slug.replace(/-/g, " ")}.md`); // Replace hyphens back to spaces

  try {
    const content = fs.readFileSync(filePath, "utf-8");
    const title = slug.replace(/-/g, " "); // Convert slug back to title
    const category = "your-category"; // Set your category here, or derive it if needed

    return {
      props: {
        post: {
          title,
          category,
          content,
        },
      },
    };
  } catch (error) {
    console.error("Error in getStaticProps:", error);
    return {
      notFound: true,
    };
  }
};
