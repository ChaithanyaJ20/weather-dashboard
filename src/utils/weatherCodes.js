export const getWeatherCondition = (
  code
) => {
  if (code === 0) {
    return {
      icon: "☀️",
      label: "Sunny",
    };
  }

  if (
    [1, 2, 3].includes(code)
  ) {
    return {
      icon: "☁️",
      label: "Cloudy",
    };
  }

  if (
    [
      51,
      53,
      55,
      61,
      63,
      65,
      80,
      81,
      82,
    ].includes(code)
  ) {
    return {
      icon: "🌧️",
      label: "Rainy",
    };
  }

  if (
    [
      95,
      96,
      99,
    ].includes(code)
  ) {
    return {
      icon: "⛈️",
      label: "Thunderstorm",
    };
  }

  return {
    icon: "🌤️",
    label: "Weather",
  };
};