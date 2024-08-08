import React, { createContext, useState } from "react";

interface ThemeContextInterface {
  isDark: boolean;
  toggleThemeHandler: () => void;
}

export const ThemeContext = createContext<ThemeContextInterface>({
  isDark: true,
  toggleThemeHandler: () => {},
});

const ThemeContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [isDark, setIsDark] = useState(true);

  const toggleThemeHandler = () => {
    setIsDark((prev) => !prev);
  };

  const context = {
    isDark,
    toggleThemeHandler,
  };

  return (
    <ThemeContext.Provider value={context}>
      <div className={`${isDark ? "dark" : "light"}`}>{children}</div>
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
