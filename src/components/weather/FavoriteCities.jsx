const FavoriteCities = ({
  favorites,
  onCityClick,
  onRemove,
  selectedCity,
}) => {
  if (
    favorites.length === 0
  )
    return null;

  return (
    <div className="mt-6">
      <h2
        className="
          text-xl
          font-bold
          mb-3
        "
      >
        ⭐ Favorite Cities
      </h2>

      <div
        className="
          flex
          flex-wrap
          gap-2
        "
      >
        {favorites.map((city) => (
          <div
            key={city}
            className={`
              flex
              items-center
              gap-2
              ${
                selectedCity?.toLowerCase() ===
                city.toLowerCase()
                  ? "bg-orange-600"
                  : "bg-yellow-500"
              }
              text-white
              px-3
              py-2
              rounded-full
            `}
          >
            <button
              onClick={() =>
                onCityClick(city)
              }
            >
              {city}
            </button>

            <button
              onClick={() =>
                onRemove(city)
              }
              className="
                font-bold
              "
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoriteCities;