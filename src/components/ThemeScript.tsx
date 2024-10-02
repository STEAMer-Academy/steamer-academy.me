import { useEffect } from "react";

const ThemeScript = () => {
  useEffect(() => {
    const theme = (() => {
      if (typeof localStorage !== "undefined") {
        return localStorage.getItem("theme") || "light"; // Default to 'light' if theme is null
      }
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        return "dark";
      }
      return "light";
    })();

    if (theme === "light") {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
    window.localStorage.setItem("theme", theme);
  }, []);

  return null; // No visual component, just runs the script
};

export default ThemeScript;
