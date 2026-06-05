import axios from "axios";

import {
  useState,
  useEffect,
} from "react";

import {
  useTheme,
} from "../context/ThemeContext";
import Navbar from "../components/layout/Navbar";
import DashboardContainer from "../components/layout/DashboardContainer";
import SearchBar from "../components/weather/SearchBar";
import WeatherCard from "../components/weather/WeatherCard";
import LocationButton from "../components/weather/LocationButton";
import RecentSearches from "../components/weather/RecentSearches";
import StatisticsSection from "../components/weather/StatisticsSection";
import ThemeToggle from "../components/common/ThemeToggle";
import ForecastSection from "../components/weather/ForecastSection";

import {
  getWeatherByCity,
  getWeatherByCoordinates,
  getLocationName,
  getForecastByCoordinates,
} from "../services/weatherService";

const HomePage = () => {
  const { darkMode } = useTheme();
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [recentSearches, setRecentSearches] =
  useState([]);
  const [forecast, setForecast] =
  useState(null);

useEffect(() => {
  console.log(
    "Forecast State Changed:",
    forecast
  );
}, [forecast]);





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

console.log(
  "STEP 1 - Weather Loaded"
);

const geoData =
  await axios.get(
    `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`
  );

console.log(
  "STEP 2 - Geo Response",
  geoData.data
);

if (!geoData.data.results) {
  throw new Error(
    "No geocoding results found"
  );
}

const location =
  geoData.data.results[0];

console.log(
  "STEP 3 - Location",
  location
);

const forecastData =
  await getForecastByCoordinates(
    location.latitude,
    location.longitude
  );

console.log(
  "STEP 4 - Forecast Data",
  forecastData
);

setForecast(
  forecastData
);

console.log(
  "STEP 5 - Forecast State Updated"
);

// Save recent searches
const updatedSearches = [
  city,
  ...recentSearches.filter(
    (item) =>
      item.toLowerCase() !==
      city.toLowerCase()
  ),
].slice(0, 5);

setRecentSearches(
  updatedSearches
);

localStorage.setItem(
  "recentSearches",
  JSON.stringify(
    updatedSearches
  )
);


  setCity(""); // clears input box
} catch (error) {
  setWeather(null);

  setError(
    "Location not found. Please search for a city."
  );
} finally {
  setLoading(false);
}
};
const handleRecentSearch =
  async (cityName) => {
    setCity(cityName);

    try {
      setLoading(true);

      const data =
        await getWeatherByCity(
          cityName
        );

      setWeather(data);
    } catch (error) {
      setError(
        "Unable to load weather."
      );
    } finally {
      setLoading(false);
    }
  };
const handleLocationWeather = () => {
  navigator.geolocation.getCurrentPosition(
    async (position) => {
      try {
        setLoading(true);
        setError("");

        const { latitude, longitude } =
          position.coords;

        const weatherData =
          await getWeatherByCoordinates(
            latitude,
            longitude
          );

        const locationData =
          await getLocationName(
            latitude,
            longitude
          );

        // Debugging
        console.log(locationData);

        if (locationData) {
          weatherData.city =
            locationData.name;

          weatherData.country =
            locationData.country;
        } else {
          weatherData.city =
            "Current Location";

          weatherData.country = "";
        }

        setWeather(weatherData);
      } catch (error) {
        setError(
          "Unable to fetch location weather."
        );
      } finally {
        setLoading(false);
      }
    },

    () => {
      setError(
        "Location access denied."
      );
    }
  );
};
  return (
    <div
  className={`min-h-screen ${
    darkMode
      ? "bg-slate-900 text-white"
      : "bg-slate-100 text-black"
  }`}
>
      <Navbar  />

      <DashboardContainer>
         <div className="flex justify-end">
    <ThemeToggle />
  </div>

  <SearchBar
    city={city}
    setCity={setCity}
    onSearch={handleSearch}
    loading={loading}
  />

  <LocationButton
    onLocationClick={handleLocationWeather}
  />
  <RecentSearches
  searches={recentSearches}
  onSearchClick={
    handleRecentSearch
  }
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
  <>
    <WeatherCard weather={weather} />

    <StatisticsSection
      weather={weather}
    />
    <ForecastSection
  forecast={forecast}
/>
  </>
)}
</DashboardContainer>
    </div>
  );
};

export default HomePage;