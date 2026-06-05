import axios from "axios";

const GEO_BASE_URL =
  "https://geocoding-api.open-meteo.com/v1/search";

const WEATHER_BASE_URL =
  "https://api.open-meteo.com/v1/forecast";

export const getWeatherByCity = async (city) => {
  // Step 1: Get coordinates

  const geoResponse = await axios.get(
    `${GEO_BASE_URL}?name=${city}&count=1`
  );

  if (!geoResponse.data.results) {
    throw new Error("City not found");
  }

  const location = geoResponse.data.results[0];

  const {
    latitude,
    longitude,
    country,
    timezone,
    name,
  } = location;

  // Step 2: Get weather

  const weatherResponse = await axios.get(
    `${WEATHER_BASE_URL}?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m`
  );

  return {
    city: name,
    country,
    timezone,

    temperature:
      weatherResponse.data.current.temperature_2m,

    humidity:
      weatherResponse.data.current.relative_humidity_2m,

    feelsLike:
      weatherResponse.data.current.apparent_temperature,

    windSpeed:
      weatherResponse.data.current.wind_speed_10m,
  };
};