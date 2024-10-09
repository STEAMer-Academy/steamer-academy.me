import Head from "next/head";
import Layout from "@/components/Layout";
import PageEnglishClub from "@/components/EnglishClub";

export default function About() {
  return (
    <>
      <Head>
        <title>STEAMer Academy | About</title>
        <meta
          name="description"
          content="STEAMer Academy - Igniting passion for Science, Technology, Engineering, Arts, and Math"
        />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Layout>
        <PageEnglishClub />
      </Layout>
    </>
  );
}
