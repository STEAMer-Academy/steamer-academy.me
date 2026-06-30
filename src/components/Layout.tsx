import type { Metadata } from "next";
import fs from "fs";
import path from "path";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ThemeProvider } from "./ThemeProvider";

export const metadata: Metadata = {
  title: "STEAMer Academy",
  description: "Learn STEAM subjects with STEAMer Academy",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Pre-load search data for the command palette to avoid client-side fetch
  let searchData: string | null = null;
  try {
    const filePath = path.join(process.cwd(), "public", "searchData.json");
    searchData = fs.readFileSync(filePath, "utf-8");
  } catch {
    // File not available yet (first build), Header will fetch client-side
  }

  return (
    <div>
      <ThemeProvider>
        <div className="flex min-h-screen flex-col">
          <Header searchData={searchData} />
          <main className="container mx-auto grow px-4 py-8">{children}</main>
          <Footer />
        </div>
      </ThemeProvider>
    </div>
  );
}
