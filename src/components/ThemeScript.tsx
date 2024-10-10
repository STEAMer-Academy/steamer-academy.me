import { useEffect } from "react";

const ThemeScript = () => {
  useEffect(() => {
    // Function to apply the theme based on saved preferences or defaults
    const applyTheme = () => {
      // Check for saved theme in localStorage
      const savedTheme = localStorage.getItem("theme");
      const preferredTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";

      // Determine the theme to use
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

    applyTheme(); // Call the function to apply the theme

    // Optional: Add event listener to handle theme changes in real-time
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = (e: MediaQueryListEvent) => {
      // Use 'e' to check the new preference
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

    mediaQuery.addEventListener("change", handleChange, { passive: true });

    return () => {
      mediaQuery.removeEventListener("change", handleChange); // Clean up listener on unmount
    };
  }, []); // Run this effect only once when the component mounts

  return null; // No visual component, just runs the script
};

export default ThemeScript;
