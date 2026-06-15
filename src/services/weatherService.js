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
    `${WEATHER_BASE_URL}?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m,weather_code`
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

weatherCode:
  weatherResponse.data.current.weather_code,
  };
};
export const getWeatherByCoordinates = async (
  latitude,
  longitude
) => {
  const weatherResponse = await axios.get(
    `${WEATHER_BASE_URL}?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m,weather_code`
  );

  return {
    city: "Current Location",
    country: "",
    timezone:
      weatherResponse.data.timezone,

    temperature:
      weatherResponse.data.current.temperature_2m,

    humidity:
      weatherResponse.data.current.relative_humidity_2m,

    feelsLike:
      weatherResponse.data.current.apparent_temperature,

    windSpeed:
  weatherResponse.data.current.wind_speed_10m,

weatherCode:
  weatherResponse.data.current.weather_code,
  };
};
export const getLocationName = async (
  latitude,
  longitude
) => {
  try {
    const response = await axios.get(
      `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
    );

    // Debugging
    console.log(
      response.data.address
    );

    return {
  name:
    response.data.address?.county ||
    response.data.address?.city ||
    response.data.address?.town ||
    response.data.address?.village ||
    "Current Location",

  country:
    response.data.address?.state ||
    response.data.address?.country ||
    "",
};
  } catch (error) {
    console.error(
      "Reverse geocoding failed:",
      error
    );

    return null;
  }
};
export const getForecastByCoordinates =
  async (latitude, longitude) => {
    const response = await axios.get(
      `${WEATHER_BASE_URL}?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min,weather_code&timezone=auto&forecast_days=5`
    );

    console.log(
      "Forecast API Response:",
      response.data
    );

    return response.data.daily;
  };