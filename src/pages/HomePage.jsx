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
import FavoriteCities
from "../components/weather/FavoriteCities";
import WeatherTrendChart
from "../components/weather/WeatherTrendChart";
import CompareCities
from "../components/weather/CompareCities";

import ComparisonTable
from "../components/weather/ComparisonTable";
import {
  getWeatherByCity,
  getWeatherByCoordinates,
  getLocationName,
  getForecastByCoordinates,
} from "../services/weatherService";
import LoadingSkeleton
from "../components/common/LoadingSkeleton";
const HomePage = () => {
  const { darkMode } = useTheme();
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [compareLoading,
  setCompareLoading] =
  useState(false);
  const [error, setError] = useState("");
  const [recentSearches, setRecentSearches] =
  useState([]);
  const [favorites, setFavorites] =
  useState([]);
  const [forecast, setForecast] =
  useState(null);
  const [
  comparison,
  setComparison,
] = useState(null);
const [
  compareError,
  setCompareError,
] = useState("");

useEffect(() => {
  console.log(
    "Forecast State Changed:",
    forecast
  );
}, [forecast]);

useEffect(() => {
  const storedSearches =
    JSON.parse(
      localStorage.getItem(
        "recentSearches"
      )
    ) || [];

  setRecentSearches(
    storedSearches
  );

  const storedFavorites =
    JSON.parse(
      localStorage.getItem(
        "favoriteCities"
      )
    ) || [];

  setFavorites(
    storedFavorites
  );
}, []);



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
const handleAddFavorite =
  (cityName) => {
    if (
      favorites.some(
        (city) =>
          city.toLowerCase() ===
          cityName.toLowerCase()
      )
    )
      return;

    const updatedFavorites = [
      ...favorites,
      cityName,
    ];

    setFavorites(
      updatedFavorites
    );

    localStorage.setItem(
      "favoriteCities",
      JSON.stringify(
        updatedFavorites
      )
    );
  };
const handleRemoveFavorite =
  (cityName) => {

    const updated =
      favorites.filter(
        (city) =>
          city !== cityName
      );

    setFavorites(updated);

    localStorage.setItem(
      "favoriteCities",
      JSON.stringify(updated)
    );
};
const handleClearRecentSearches =
  () => {

    setRecentSearches([]);

    localStorage.removeItem(
      "recentSearches"
    );
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
const handleCompare = async (
  city1,
  city2
) => {
  try {
    setCompareLoading(true);
    setCompareError("");
    setError("");

    const cityA =
      await getWeatherByCity(city1);

    const cityB =
      await getWeatherByCity(city2);

    setComparison({
      cityA,
      cityB,
    });
  } catch (error) {
    setCompareError(
      "Unable to compare cities."
    );

  } finally {
    setCompareLoading(false);
  }
};
const isFavorite =
  weather &&
  favorites.some(
    (fav) =>
      fav.toLowerCase() ===
      weather.city.toLowerCase()
  );
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
  onClear={
    handleClearRecentSearches
  }
/>
<FavoriteCities
  favorites={favorites}
  onCityClick={
    handleRecentSearch
  }
  onRemove={
    handleRemoveFavorite
  }
  selectedCity={
    weather?.city
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
{loading && (
  <LoadingSkeleton />
)}
  {weather && (
  <>
    <WeatherCard
  weather={weather}
/>

<div className="mt-3">
  <button
    onClick={() =>
      handleAddFavorite(
        weather.city
      )
    }
    disabled={isFavorite}
    className={`
      px-4
      py-2
      rounded-lg
      text-white

      ${
        isFavorite
          ? "bg-gray-500 cursor-not-allowed"
          : "bg-yellow-500 hover:bg-yellow-600"
      }
    `}
  >
    {isFavorite
      ? "⭐ Already Added"
      : "⭐ Add to Favorites"}
  </button>
</div>

<StatisticsSection
  weather={weather}
/>
    <ForecastSection
      forecast={forecast}
    />
    <WeatherTrendChart
  forecast={forecast}
/>
  </>
)}

<CompareCities
  onCompare={handleCompare}
  loading={compareLoading}
/>
{compareError && (
  <div
    className="
      mt-3
      bg-red-100
      text-red-700
      p-3
      rounded-lg
    "
  >
    {compareError}
  </div>
)}
{comparison && (
  <ComparisonTable
    comparison={comparison}
  />
)}

<footer
  className="
    text-center
    py-6
    mt-10
    text-sm
    opacity-70
  "
>
  © 2026 Chaithanya • Weather Dashboard
</footer>
</DashboardContainer>
    </div>
  );
};

export default HomePage;