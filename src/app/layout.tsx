import { ReactNode } from "react";
import type { Metadata, Viewport } from "next";
import { Partytown } from "@builder.io/partytown/react";
import localFont from "next/font/local";
import "./globals.css";
import WebVitals from "@/components/web-vitals";
import CookieConsent from "@/components/CookieConsent";
import { Toaster } from "@/components/wrapper";
import Script from "next/script";
import { ClerkProvider } from "@clerk/nextjs";
import { dark, shadesOfPurple } from "@clerk/themes";
import { Client } from "appwrite";
import { CSPostHogProvider } from "@/components/providers";

export const metadata: Metadata = {
  title: "STEAMer Academy",
  description: "STEAMer Academy Main Home Page",
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
  manifest: "/manifest.json",
  generator: "Next.js",
  applicationName: "STEAMer Academy Website",
  referrer: "origin-when-cross-origin",
  keywords: [
    "Next.js",
    "React",
    "JavaScript",
    "Tailwindcss",
    "TypeScript",
    "Shadcn UI",
    "Aceternity UI",
    "Bun",
  ],
  authors: [{ name: "Muntasir", url: "https://muntasirmahmud.me" }],
  creator: "Muntasir Mahmud",
  publisher: "Muntasir Mahmud",
  formatDetection: {
    email: true,
    address: false,
    telephone: true,
  },
  metadataBase: new URL("https://www.steameracademy.me"),
  robots: {
    index: true,
    follow: true,
  },
  appleWebApp: {
    statusBarStyle: "black-translucent",
    title: "STEAMer Academy",
  },
  openGraph: {
    title: "STEAMer Academy",
    description:
      "STEAMer Academy offers comprehensive education in Science, Technology, Engineering, Arts, and Mathematics.",
    url: "https://www.steameracademy.me/",
    type: "website",
    siteName: "STEAMer Academy",
    images: "https://www.steameracademy.me/link-preview-images/home.webp",
  },
  twitter: {
    site: "https://www.steameracademy.me/",
    creator: "Muntasir Mahmud",
    title: "STEAMer Academy",
    images: "https://www.steameracademy.me/link-preview-images/home.webp",
    description:
      "STEAMer Academy offers comprehensive education in Science, Technology, Engineering, Arts, and Mathematics.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#c0caf5" },
    { media: "(prefers-color-scheme: dark)", color: "#1f2335" },
  ],
};

const geistSans = localFont({
  src: "../app/fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../app/fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({ children }: { children: ReactNode }) {
  const client = new Client();
  client.setProject("673c5fd400094149bd29");

  return (
    <html lang="en">
      <head>
        <Partytown debug={true} forward={["dataLayer.push"]} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ClerkProvider appearance={{ baseTheme: [dark, shadesOfPurple] }}>
          <CSPostHogProvider>
            <CookieConsent />
            <WebVitals />
            <Toaster />
            <Script id="clarity-script" strategy="afterInteractive">
              {`
              (function(c,l,a,r,i,t,y){
                  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "${process.env.NEXT_PUBLIC_CLARITY_ID}");
            `}
            </Script>
            {children}
          </CSPostHogProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
