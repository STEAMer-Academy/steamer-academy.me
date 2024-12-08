"use client";

import { useEffect } from "react";
import { useStore } from "@nanostores/react";
import { themeStore, setTheme } from "../stores/themeStore";
import { Button } from "@/components/wrapper";
import { Moon02Icon, Sun03Icon as Sun } from "hugeicons-react";

export default function ThemeToggle() {
  const $theme = useStore(themeStore);

  useEffect(() => {
    // This effect will run on the client-side
    const theme = localStorage.getItem("theme") as "light" | "dark" | null;
    if (theme) {
      setTheme(theme);
    }
  }, []);

  const toggleTheme = () => {
    setTheme($theme === "light" ? "dark" : "light");
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      aria-label="Switch themes"
    >
      {$theme === "dark" ? (
        <Moon02Icon className="size-[1.2rem]" />
      ) : (
        <Sun className="size-[1.2rem]" />
      )}
    </Button>
  );
}
