import { useState } from "react";

import Navbar from "../components/layout/Navbar";
import DashboardContainer from "../components/layout/DashboardContainer";
import SearchBar from "../components/weather/SearchBar";
import WeatherCard from "../components/weather/WeatherCard";

import { getWeatherByCity } from "../services/weatherService";

const HomePage = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

const handleSearch = async () => {
  if (!city.trim()) {
    setError("Please enter a city.");
    return;
  }

  try {
    setLoading(true);
    setError("");

    const data = await getWeatherByCity(city);

    setWeather(data);
  } catch (error) {
    setWeather(null);
    setError(
      "Location not found. Please search for a city."
    );
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar />

      <DashboardContainer>
        <SearchBar
          city={city}
          setCity={setCity}
          onSearch={handleSearch}
          loading={loading}
        />
        {error && (
  <div
    className="
      mt-4
      bg-red-100
      text-red-700
      p-3
      rounded-lg
    "
  >
    {error}
  </div>
)}

        {weather && (
          <WeatherCard weather={weather} />
        )}
      </DashboardContainer>
    </div>
  );
};

export default HomePage;