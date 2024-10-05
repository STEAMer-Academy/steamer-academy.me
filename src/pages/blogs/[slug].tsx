import React from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import Head from 'next/head';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useStore } from '@nanostores/react';
import { themeStore } from '../../stores/themeStore';
import Layout from '@/components/Layout';

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
        <title>{post.title} - STEAMer Academy</title>
        <meta name="description" content={`Read about ${post.title} in our ${post.category} category.`} />
      </Head>
      <div className={`container mx-auto px-4 max-w-screen-lg py-8 ${
        $theme === 'dark' ? 'bg-[#1a1b26] text-[#a9b1d6]' : 'bg-white text-gray-900'
      }`}>
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <p className="text-xl mb-8">Category: {post.category}</p>
        <div className="prose dark:prose-invert max-w-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
        </div>
      </div>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const response = await fetch(
      "https://api.github.com/repos/STEAMer-Academy/Steamer-Blogs/git/trees/main?recursive=1"
    );
    if (!response.ok) {
      throw new Error(`GitHub API responded with status ${response.status}`);
    }
    const data = await response.json();
    const paths = data.tree
      .filter(
        (item: { path: string }) =>
          item.path.endsWith(".md") &&
          !item.path.includes("README.md") &&
          !item.path.includes("LICENSE")
      )
      .map((item: { path: string }) => ({
        params: { slug: item.path.replace(/\//g, "-").replace(".md", "").toLowerCase() },
      }));

    return { paths, fallback: false };
  } catch (error) {
    console.error("Error in getStaticPaths:", error);
    return { paths: [], fallback: false };
  }
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const slug = params?.slug as string;
    // Split the slug into parts
    const slugParts = slug.split("-");
    
    // Reconstruct the path, handling multi-level directories and spaces
    let githubPath = "";
    let fileName = "";
    for (let i = 0; i < slugParts.length; i++) {
      if (i === slugParts.length - 1) {
        // Last part is the file name
        fileName = slugParts[i];
      } else {
        // Directory names
        githubPath += slugParts[i] + "/";
      }
    }

    // Fetch the contents of the directory
    const dirResponse = await fetch(
      `https://api.github.com/repos/STEAMer-Academy/Steamer-Blogs/${githubPath}`
    );
    if (!dirResponse.ok) {
      throw new Error(`GitHub API responded with status ${dirResponse.status} for directory`);
    }
    const dirContents = await dirResponse.json();
    interface DirItem {
      name : string;
      [key: string]: string;
    }

    // Find the correct file (case-insensitive)
    const file = dirContents.find((item: DirItem) => 
      item.name.toLowerCase() === `${fileName}.md`.toLowerCase()
    );

    if (!file) {
      throw new Error(`File not found: ${fileName}.md`);
    }

    // Fetch the content of the file
    const fileResponse = await fetch(file.download_url);
    if (!fileResponse.ok) {
      throw new Error(`GitHub API responded with status ${fileResponse.status} for file`);
    }
    const content = await fileResponse.text();

    // Extract category and title
    const pathParts = githubPath.split("/").filter(Boolean);
    const category = pathParts[0];
    const title = file.name.replace(".md", "");

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
