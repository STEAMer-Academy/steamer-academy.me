"use client";

import { useEffect } from "react";
const ThemeScript = () => {
  useEffect(() => {
    const applyTheme = () => {
      const savedTheme = localStorage.getItem("theme");
      const preferredTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";

      const currentTheme = savedTheme || preferredTheme;

      // Apply the theme to the document
      if (currentTheme === "light") {
        document.documentElement.classList.remove("dark");
      } else {
        document.documentElement.classList.add("dark");
      }

      // Save the theme to localStorage
      window.localStorage.setItem("theme", currentTheme);
    };

    applyTheme();

    // Add event listener to handle theme changes in real-time
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        // If the user prefers dark mode
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        // If the user prefers light mode
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange); // Clean up listener on unmount
    };
  }, []);

  return null;
};

export default ThemeScript;
