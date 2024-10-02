import { atom } from "nanostores";

const getInitialTheme = (): "light" | "dark" => {
  if (typeof window !== "undefined") {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "light" || storedTheme === "dark") {
      return storedTheme;
    }
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    return prefersDark ? "dark" : "light";
  }
  return "light"; // default to light theme on the server
};

export const themeStore = atom<"light" | "dark">(getInitialTheme());

export const setTheme = (newTheme: "light" | "dark") => {
  themeStore.set(newTheme);
  if (typeof window !== "undefined") {
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  }
};
