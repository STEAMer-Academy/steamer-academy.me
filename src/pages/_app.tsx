import { AppProps } from "next/app"; 
import "../styles/globals.css"; // Import global CSS
import { GoogleAnalytics } from "@next/third-parties/google"; // For scripts like Google Analytics
import ThemeScript from "../components/ThemeScript";
import Head from "next/head";
import { useEffect,useState } from 'react';

function MyApp({ Component, pageProps }: AppProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Render nothing until the component has mounted to prevent hydration mismatch
  if (!isClient) return null;
  return (
    <>
      <html lang="en">
        <Head>
          <meta charSet="UTF-8" />
          <meta name="description" content="Next.js description" />
          <meta name="viewport" content="width=device-width" />
          <link rel="icon" type="image/png" href="/favicon.png" />
          <title>{pageProps.title || "My Next.js App"}</title>
          <ThemeScript />
        </Head>
        {/* Google Analytics */}
        <GoogleAnalytics gaId="G-DD3FHBDSP0" />
        <body>
          <Component {...pageProps} />
        </body>
      </html>
    </>
  );
}

export default MyApp;
