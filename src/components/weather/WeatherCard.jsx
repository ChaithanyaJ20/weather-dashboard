import {
  useTheme,
} from "../../context/ThemeContext";

const WeatherCard = ({ weather }) => {
  const { darkMode } =
    useTheme();

  return (
    <div
      className={`
        mt-6
        rounded-xl
        shadow-lg
        p-6
        ${
          darkMode
            ? "bg-slate-800 text-white"
            : "bg-white text-black"
        }
      `}
    >
      <h2 className="text-2xl font-bold">
        {weather.city}, {weather.country}
      </h2>

      <div className="mt-4">
        <h1 className="text-6xl font-bold">
          {Math.round(
            weather.temperature
          )}
          °C
        </h1>

        <p className="mt-2">
          Feels Like:{" "}
          {Math.round(
            weather.feelsLike
          )}
          °C
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-6">
        <div
          className={`p-4 rounded-lg ${
            darkMode
              ? "bg-slate-700"
              : "bg-slate-100"
          }`}
        >
          <p>Humidity</p>
          <h3>{weather.humidity}%</h3>
        </div>

        <div
          className={`p-4 rounded-lg ${
            darkMode
              ? "bg-slate-700"
              : "bg-slate-100"
          }`}
        >
          <p>Wind Speed</p>
          <h3>
            {weather.windSpeed} km/h
          </h3>
        </div>

        <div
          className={`p-4 rounded-lg ${
            darkMode
              ? "bg-slate-700"
              : "bg-slate-100"
          }`}
        >
          <p>Country</p>
          <h3>{weather.country}</h3>
        </div>

        <div
          className={`p-4 rounded-lg ${
            darkMode
              ? "bg-slate-700"
              : "bg-slate-100"
          }`}
        >
          <p>Timezone</p>
          <h3>{weather.timezone}</h3>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;