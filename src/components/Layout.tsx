import type { Metadata } from "next";
import dynamic from "next/dynamic";

const Header = dynamic(() => import("./Header").then((mod) => mod.default));
const Footer = dynamic(() => import("./Footer").then((mod) => mod.default));
const ThemeProvider = dynamic(() => import("./ThemeProvider").then((mod) => mod.ThemeProvider));

export const metadata: Metadata = {
  title: "STEAMer Academy",
  description: "Learn STEAM subjects with STEAMer Academy",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="container mx-auto flex-grow px-4 py-8">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
