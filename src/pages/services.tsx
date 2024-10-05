import Head from "next/head";
import Layout from "../components/Layout";
import PageServices from "../components/Services";

export default function Services() {
  return (
    <>
      <Head>
        <title>STEAMer Academy | Services</title>
        <meta
          name="description"
          content="STEAMer Academy - Igniting passion for Science, Technology, Engineering, Arts, and Math"
        />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Layout>
        <PageServices />
      </Layout>
    </>
  );
}
