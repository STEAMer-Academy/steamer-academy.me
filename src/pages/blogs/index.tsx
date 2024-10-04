import Head from "next/head";
import Layout from "@/components/Layout";
import PageBlog from "@/components/Blog";

export default function Blog() {
  return (
    <>
      <Head>
        <title>STEAMer Academy | Blogs</title>
        <meta
          name="description"
          content="STEAMer Academy - Igniting passion for Science, Technology, Engineering, Arts, and Math"
        />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Layout>
        <PageBlog />
      </Layout>
    </>
  );
}
