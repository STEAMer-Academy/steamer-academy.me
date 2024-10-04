import { AppProps } from "next/app";
import "../styles/globals.css"; // Import global CSS
import { GoogleAnalytics } from "@next/third-parties/google"; // For scripts like Google Analytics
import ThemeScript from "../components/ThemeScript";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <html lang="en">
        <Head>
          <meta charSet="UTF-8" />
          <meta name="description" content="Next.js description" />
          <meta name="viewport" content="width=device-width" />
          <link rel="icon" type="image/png" href="/favicon.png" />
          <link rel="preconnect" href="https://www.google-analytics.com" />
          <link rel="preconnect" href="https://www.googletagmanager.com" />
          <link rel="apple-touch-icon" href="/favicon.png" />
          <meta
            name="theme-color"
            media="(prefers-color-scheme: dark)"
            content="#1f2335"
          />
          <meta
            name="theme-color"
            media="(prefers-color-scheme: light)"
            content="#c0caf5"
          />
          <link rel="manifest" href="/manifest.json" />
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
