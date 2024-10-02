import Head from "next/head";
import Layout from "../components/Layout";
import PageGallery from "../components/Gallery";

export default function Gallery() {
  return (
    <>
      <Head>
        <title>STEAMer Academy | Gallery</title>
        <meta
          name="description"
          content="STEAMer Academy - Igniting passion for Science, Technology, Engineering, Arts, and Math"
        />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Layout>
        <PageGallery />
      </Layout>
    </>
  );
}
