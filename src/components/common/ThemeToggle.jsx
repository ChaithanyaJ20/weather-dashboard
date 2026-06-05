import {
  useTheme,
} from "../../context/ThemeContext";

const ThemeToggle = () => {
  const {
    darkMode,
    toggleTheme,
  } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="
        px-4
        py-2
        rounded-lg
        shadow
      "
    >
      {darkMode
        ? "☀️ Light"
        : "🌙 Dark"}
    </button>
  );
};

export default ThemeToggle;