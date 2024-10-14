import { ReactNode } from "react";
import type { Metadata, Viewport } from "next";
import { Partytown } from "@builder.io/partytown/react";
import localFont from "next/font/local";
import "./globals.css";
import dynamic from "next/dynamic";
import Script from "next/script";


const GoogleAnalytics = dynamic(() => import("@/components/GoogleAnalytics"), {
	ssr: false,
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
  applicationName: "STEAMer Academy Next. js App",
  referrer: "origin-when-cross-origin",
  keywords: ['Next.js', 'React', 'JavaScript','Tailwindcss', 'TypeScript', 'Shadcn UI', 'Aceternity UI', 'Bun'],
  authors: [{ name: 'Muntasir', url: 'https://muntasirmahmud.me' }],
  creator: 'Muntasir Mahmud',
  publisher: 'Muntasir Mahmud',
  formatDetection: {
    email: true,
    address: false,
    telephone: true,
  },
  metadataBase: new URL('https://www.steameracademy.me'),
  robots: {
    index: true,
    follow: true,
  },
  appleWebApp: {
    statusBarStyle: "black-translucent",
    title: "STEAMer Academy",
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
	return (
		<html lang="en">
			<head>
				<Partytown debug={true} forward={["dataLayer.push"]} />
				<GoogleAnalytics />
				<Script id="next-pwa">
					{` 
          if ('serviceWorker' in navigator) navigator.serviceWorker.register('/sw.js')
          else console.warning("Ups, your navigator doesn't support service worker, offline feature wont work, update your browser or chose other modern browser")
        `}
				</Script>
			</head>
			<body
				className={`${geistSans.variable} ${geistMono.variable} text-center antialiased`}
			>
				{children}
			</body>
		</html>
	);
}
