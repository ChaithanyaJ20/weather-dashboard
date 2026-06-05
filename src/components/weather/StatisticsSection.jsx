import StatisticCard from "./StatisticCard";

const StatisticsSection = ({
  weather,
}) => {
  return (
    <div className="mt-6">
      <h2 className="text-2xl font-bold mb-4">
        Weather Statistics
      </h2>

      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          lg:grid-cols-4
          gap-4
        "
      >
        <StatisticCard
          title="Temperature"
          value={`${Math.round(
            weather.temperature
          )}°C`}
        />

        <StatisticCard
          title="Feels Like"
          value={`${Math.round(
            weather.feelsLike
          )}°C`}
        />

        <StatisticCard
          title="Humidity"
          value={`${weather.humidity}%`}
        />

        <StatisticCard
          title="Wind Speed"
          value={`${weather.windSpeed} km/h`}
        />
      </div>
    </div>
  );
};

export default StatisticsSection;