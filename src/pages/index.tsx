import Head from "next/head";
import Layout from "../components/Layout";
import localFont from "next/font/local";
import Loading from "../components/Loading";
import { Suspense, lazy } from "react";

const PageHome = lazy(() => import("../components/Home"));

export const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

export const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function Home() {
  return (
    <>
      <Head>
        <title>STEAMer Academy | Home</title>
        <meta
          name="description"
          content="STEAMer Academy - Igniting passion for Science, Technology, Engineering, Arts, and Math"
        />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <div className={`${geistSans.variable} ${geistMono.variable}`}>
        <Layout>
          <Suspense fallback={<Loading />}>
            <PageHome />
          </Suspense>
        </Layout>
      </div>
    </>
  );
}
