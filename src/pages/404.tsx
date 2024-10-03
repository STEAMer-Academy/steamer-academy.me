import Head from "next/head";
import Page404 from "../components/NotFound";

export default function Custom404() {
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
      <Page404 />
    </>
  );
}
