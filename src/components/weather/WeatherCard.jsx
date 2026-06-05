const WeatherCard = ({ weather }) => {
  return (
    <div className="mt-6 bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold">
        {weather.city}, {weather.country}
      </h2>

      <div className="mt-4">
        <h1 className="text-6xl font-bold">
          {Math.round(weather.temperature)}°C
        </h1>

        <p className="mt-2">
          Feels Like: {Math.round(weather.feelsLike)}°C
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-6">
        <div className="bg-slate-100 p-4 rounded-lg">
          <p>Humidity</p>
          <h3>{weather.humidity}%</h3>
        </div>

        <div className="bg-slate-100 p-4 rounded-lg">
          <p>Wind Speed</p>
          <h3>{weather.windSpeed} km/h</h3>
        </div>

        <div className="bg-slate-100 p-4 rounded-lg">
          <p>Country</p>
          <h3>{weather.country}</h3>
        </div>

        <div className="bg-slate-100 p-4 rounded-lg">
          <p>Timezone</p>
          <h3>{weather.timezone}</h3>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;