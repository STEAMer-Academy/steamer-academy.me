// pages/_app.tsx
import { AppProps } from "next/app";
import "../styles/globals.css"; // Import global CSS
import { GoogleAnalytics } from "@next/third-parties/google"; // For scripts like Google Analytics
import ThemeScript from "../components/ThemeScript";
import Head from "next/head";
import { useEffect, useState } from "react";

function MyApp({ Component, pageProps }: AppProps) {
  const title = pageProps.title || "My Next.js App"; // Ensure consistent title
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Set client-side rendering flag
  }, []);

  if (!isClient) return null; 
  return (
    <>
      <Head>
        <title>{title}</title>
        {/* Include any additional meta tags or links here */}
        <meta name="viewport" content="width=device-width" />
      </Head>
      <ThemeScript /> {/* Make sure ThemeScript is here */}
      <Component {...pageProps} />
      {/* Google Analytics */}
      <GoogleAnalytics gaId="G-DD3FHBDSP0" />
    </>
  );
}

export default MyApp;
