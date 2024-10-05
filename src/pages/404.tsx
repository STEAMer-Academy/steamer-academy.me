import Head from "next/head";
import Page404 from "../components/NotFound";
import { useState, useEffect } from "react";

export default function Custom404() {

  const [isClient, setIsClient] = useState(false)
 
  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return null
  }

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
