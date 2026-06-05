import {
  useTheme,
} from "../../context/ThemeContext";

const Navbar = () => {
  const { darkMode } =
    useTheme();

  return (
    <nav
      className={`
        px-6 py-4 shadow-md
        ${
          darkMode
            ? "bg-black text-white"
            : "bg-slate-900 text-white"
        }
      `}
    >
      <h1 className="text-2xl font-bold">
        Weather Dashboard
      </h1>
    </nav>
  );
};

export default Navbar;