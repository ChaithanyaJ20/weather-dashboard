import {
  useTheme,
} from "../../context/ThemeContext";

const RecentSearches = ({
  searches,
  onSearchClick,
  onClear,
}) => {
  const { darkMode } =
    useTheme();

  if (searches.length === 0) {
    return null;
  }

  return (
    <div className="mt-6">
      <div
  className="
    flex
    justify-between
    items-center
    mb-2
  "
>
  <h2
    className="
      text-xl
      font-bold
    "
  >
    Recent Searches
  </h2>

  {searches.length > 0 && (
    <button
      onClick={onClear}
      className="
        text-red-500
        text-sm
        hover:underline
      "
    >
      Clear
    </button>
  )}
</div>

      <div className="flex flex-wrap gap-3">
        {searches.map((city, index) => (
          <button
            key={index}
            onClick={() =>
              onSearchClick(city)
            }
            className={`
              px-4
              py-2
              rounded-full
              shadow-sm
              border
              transition

              ${
                darkMode
                  ? `
                    bg-slate-700
                    text-white
                    border-slate-600
                    hover:bg-slate-600
                  `
                  : `
                    bg-white
                    text-black
                    hover:bg-blue-50
                  `
              }
            `}
          >
            {city}
          </button>
        ))}
      </div>
    </div>
  );
};

export default RecentSearches;