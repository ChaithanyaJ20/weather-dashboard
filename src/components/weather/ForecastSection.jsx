import {
  useTheme,
} from "../../context/ThemeContext";

const ForecastSection = ({
  forecast,
}) => {
  console.log(
    "Forecast Prop:",
    forecast
  );

  const { darkMode } =
    useTheme();

  if (!forecast)
    return null;

  return (
    <div className="mt-8">
      <h2
        className={`
          text-2xl
          font-bold
          mb-4
          ${
            darkMode
              ? "text-white"
              : "text-black"
          }
        `}
      >
        5-Day Forecast
      </h2>

      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-5
          gap-4
        "
      >
        {forecast.time.map(
          (day, index) => (
            <div
              key={day}
              className={`
                rounded-xl
                shadow-md
                p-4
                text-center
                transition
                hover:scale-105

                ${
                  darkMode
                    ? `
                      bg-slate-800
                      text-white
                    `
                    : `
                      bg-white
                      text-black
                    `
                }
              `}
            >
              <p className="font-bold">
                {new Date(
                  day
                ).toLocaleDateString(
                  "en-US",
                  {
                    weekday:
                      "short",
                  }
                )}
              </p>

              <p className="mt-3">
                High:{" "}
                {
                  forecast
                    .temperature_2m_max[
                    index
                  ]
                }
                °C
              </p>

              <p>
                Low:{" "}
                {
                  forecast
                    .temperature_2m_min[
                    index
                  ]
                }
                °C
              </p>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default ForecastSection;