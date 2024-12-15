import type { Metadata } from "next";
import { Header, Footer } from "@/components/wrappers/headerAndFooter";
import { ThemeProvider } from "@/components/themeToggle/ThemeProvider";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "STEAMer Academy",
  description: "Learn STEAM subjects with STEAMer Academy",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <ThemeProvider>
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="container mx-auto grow px-4 py-8">{children}</main>
          <Footer />
        </div>
      </ThemeProvider>
    </div>
  );
}
