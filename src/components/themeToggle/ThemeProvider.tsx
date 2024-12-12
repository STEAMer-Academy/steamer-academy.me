"use client";

import { useEffect, ReactNode } from "react";
import { useStore } from "@nanostores/react";
import { themeStore } from "@/stores/themeStore";

export function ThemeProvider({ children }: { children: ReactNode }) {
  const $theme = useStore(themeStore);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", $theme === "dark");
  }, [$theme]);

  return <>{children}</>;
}
