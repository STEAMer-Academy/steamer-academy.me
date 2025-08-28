import { ReactNode } from "react";
import type { Metadata, Viewport } from "next";
// @ts-ignore
import { Partytown } from "@builder.io/partytown/react";
import { Poppins, Fira_Code } from "next/font/google";
import "./globals.css";
import WebVitals from "@/components/web-vitals";
import CookieConsent from "@/components/CookieConsent";
import { Toaster } from "@/components/ui/sonner";
import Script from "next/script";
import { ClerkProvider } from "@clerk/nextjs";
import { dark, shadesOfPurple } from "@clerk/themes";
import DatadogInit from "@/components/Datadog";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const firaCode = Fira_Code({
  variable: "--font-fira-code",
  subsets: ["latin"],
});

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
  metadataBase: new URL("https://steamer-academy.vercel.app"),
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
    url: "https://steamer-academy.vercel.app/",
    type: "website",
    siteName: "STEAMer Academy",
    images: "https://steamer-academy.vercel.app/link-preview-images/home.webp",
  },
  twitter: {
    site: "https://steamer-academy.vercel.app/",
    creator: "Muntasir Mahmud",
    title: "STEAMer Academy",
    images: "https://steamer-academy.vercel.app/link-preview-images/home.webp",
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

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <Partytown debug={true} forward={["dataLayer.push"]} />
      </head>
      <body className={`${poppins.variable} ${firaCode.variable} antialiased`}>
        <Toaster richColors closeButton position="top-center" />
        <ClerkProvider appearance={{ baseTheme: [dark, shadesOfPurple] }}>
          <CookieConsent />
          <WebVitals />
          <Script id="clarity-script" strategy="afterInteractive">
            {`
              (function(c,l,a,r,i,t,y){
                  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "${process.env.NEXT_PUBLIC_CLARITY_ID}");
            `}
          </Script>
          <DatadogInit />
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}
