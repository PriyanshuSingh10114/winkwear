import React, { createContext, useContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    // 1. Check user preference stored in localStorage
    const savedTheme = localStorage.getItem("winkwear-theme");
    if (savedTheme === "light" || savedTheme === "dark") {
      return savedTheme;
    }
    // 2. Fallback to system preference if user hasn't explicitly set one
    if (
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: light)").matches
    ) {
      return "light";
    }
    // 3. Default to Dark Mode as the core brand experience
    return "dark";
  });

  useEffect(() => {
    // Apply data-theme attribute on root <html> element for CSS variable cascading
    document.documentElement.setAttribute("data-theme", theme);
    document.documentElement.classList.toggle("light-mode", theme === "light");
    document.documentElement.classList.toggle("dark-mode", theme === "dark");
    try {
      localStorage.setItem("winkwear-theme", theme);
    } catch (e) {
      console.warn("Unable to persist theme to localStorage:", e);
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const setExplicitTheme = (newTheme) => {
    if (newTheme === "light" || newTheme === "dark") {
      setTheme(newTheme);
    }
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        isDark: theme === "dark",
        isLight: theme === "light",
        toggleTheme,
        setTheme: setExplicitTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export default ThemeProvider;
