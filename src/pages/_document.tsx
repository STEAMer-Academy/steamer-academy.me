// pages/_document.tsx
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="icon" href="/favicon.png" />
        <link rel="manifest" href="/manifest.json" />
        {/* Include any other meta tags you need here */}
        <meta charSet="UTF-8" />
        <meta name="description" content="Next.js description" />
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
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
