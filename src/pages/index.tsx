import Head from "next/head";
import Layout from "../components/Layout";
import PageHome from "../components/Home";

export default function Home() {
  return (
    <>
      <Head>
        <title>STEAMer Academy</title>
        <meta
          name="description"
          content="STEAMer Academy - Igniting passion for Science, Technology, Engineering, Arts, and Math"
        />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Layout>
        <PageHome />
      </Layout>
    </>
  );
}
