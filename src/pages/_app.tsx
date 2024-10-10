// pages/_app.tsx
import { AppProps } from "next/app";
import "../styles/globals.css"; // Import global CSS
import { GoogleAnalytics } from "@next/third-parties/google"; // For scripts like Google Analytics
import ThemeScript from "../components/ThemeScript";
import Head from "next/head";
import { Partytown } from "@builder.io/partytown/react";

function MyApp({ Component, pageProps }: AppProps) {
  const title = pageProps.title || "My Next.js App"; // Ensure consistent title
  return (
    <>
      <Head>
        <title>{title}</title>
        {/* Include any additional meta tags or links here */}
        <Partytown debug={true} forward={["dataLayer.push"]} />
        <meta name="viewport" content="width=device-width" />
      </Head>
      <ThemeScript />
      <Component {...pageProps} />
      {/* Google Analytics */}
      <script type="text/partytown">
        <GoogleAnalytics gaId="G-DD3FHBDSP0" />
      </script>
    </>
  );
}

export default MyApp;
