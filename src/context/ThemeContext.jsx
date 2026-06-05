import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const ThemeContext =
  createContext();

export const ThemeProvider = ({
  children,
}) => {
  const [darkMode, setDarkMode] =
    useState(false);

  useEffect(() => {
    const savedTheme =
      JSON.parse(
        localStorage.getItem(
          "darkMode"
        )
      );

    if (savedTheme !== null) {
      setDarkMode(savedTheme);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !darkMode;

    setDarkMode(newTheme);

    localStorage.setItem(
      "darkMode",
      JSON.stringify(newTheme)
    );
  };

  return (
    <ThemeContext.Provider
      value={{
        darkMode,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () =>
  useContext(ThemeContext);