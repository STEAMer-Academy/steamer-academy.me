import Head from "next/head";
import Layout from "../components/Layout";
import PageServices from "../components/Services";
import localFont from "next/font/local";

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
      <div className={`${geistSans.variable} ${geistMono.variable}`}>
        <Layout>
          <PageServices />
        </Layout>
      </div>
    </>
  );
}
