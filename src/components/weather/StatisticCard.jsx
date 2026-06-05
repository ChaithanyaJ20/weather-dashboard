import {
  useTheme,
} from "../../context/ThemeContext";

const StatisticCard = ({
  title,
  value,
}) => {
  const { darkMode } =
    useTheme();

  return (
    <div
      className={`
        rounded-xl
        shadow-md
        p-6
        text-center
        ${
          darkMode
            ? "bg-slate-800 text-white"
            : "bg-white text-black"
        }
      `}
    >
      <p
        className={
          darkMode
            ? "text-slate-300"
            : "text-gray-500"
        }
      >
        {title}
      </p>

      <h2 className="text-3xl font-bold mt-2">
        {value}
      </h2>
    </div>
  );
};

export default StatisticCard;