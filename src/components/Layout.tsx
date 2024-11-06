import type { Metadata } from "next";
import { Header, Footer } from "./wrapper";
import { ThemeProvider } from "./ThemeProvider";

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
    <div>
      <ThemeProvider>
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="container mx-auto flex-grow px-4 py-8">
            {children}
          </main>
          <Footer />
        </div>
      </ThemeProvider>
    </div>
  );
}
