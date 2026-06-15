import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";
import { useTheme }
from "../../context/ThemeContext";

const WeatherTrendChart = ({
  forecast,
}) => {
  const { darkMode } =
    useTheme();

  if (
  !forecast ||
  !forecast.time
)
  return null;
console.log(
  "WeatherTrend Forecast:",
  forecast
);
const chartData =
  forecast.time.map(
    (date, index) => ({
      day: new Date(date)
        .toLocaleDateString(
          "en-US",
          {
            weekday: "short",
          }
        ),

      maxTemp:
        forecast.temperature_2m_max[
          index
        ],

      minTemp:
        forecast.temperature_2m_min[
          index
        ],
    })
  );

  return (
    <div className="mt-8">
      <h2
        className="
          text-2xl
          font-bold
          mb-4
        "
      >
        Temperature Trend
      </h2>

      <div
        className={`
          rounded-xl
          p-4
          shadow-md
          ${
            darkMode
              ? "bg-slate-800"
              : "bg-white"
          }
        `}
      >
        <ResponsiveContainer
          width="100%"
          height={350}
        >
          <LineChart
            data={chartData}
          >
            <CartesianGrid
              strokeDasharray="3 3"
            />

            <XAxis
              dataKey="day"
            />

            <YAxis />
            <Legend />

            <Tooltip
  formatter={(value) => [
    `${value}°C`,
    "Temperature",
  ]}
/>

<Line
  type="monotone"
  dataKey="maxTemp"
  stroke="#ef4444"
  strokeWidth={3}
  activeDot={{ r: 8 }}
  name="Max Temp"
/>

<Line
  type="monotone"
  dataKey="minTemp"
  stroke="#3b82f6"
  strokeWidth={3}
  activeDot={{ r: 8 }}
  name="Min Temp"
/>          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default WeatherTrendChart;