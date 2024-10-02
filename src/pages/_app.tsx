import { AppProps } from "next/app"; // Import AppProps from next/app

// pages/_app.js
import "../styles/globals.css"; // Import global CSS
import Script from "next/script"; // For scripts like Google Analytics
import ThemeScript from "../components/ThemeScript";
import Head from "next/head";

// Use AppProps for type definition
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <Head>
          <meta charSet="UTF-8" />
          <meta name="description" content="Next.js description" />
          <meta name="viewport" content="width=device-width" />
          <link rel="icon" type="image/png" href="/favicon.png" />
          <title>{pageProps.title || "My Next.js App"}</title>
          <ThemeScript />
        </Head>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-DD3FHBDSP0"
          strategy="lazyOnload"
        />
        <Script id="google-analytics" strategy="lazyOnload">
          {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-DD3FHBDSP0');
            `}
        </Script>
        <body>
          <Component {...pageProps} />
        </body>
      </html>
    </>
  );
}

export default MyApp;
