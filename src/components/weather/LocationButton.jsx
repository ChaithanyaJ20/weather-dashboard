const LocationButton = ({
  onLocationClick,
}) => {
  return (
    <button
      onClick={onLocationClick}
      className="
        mt-4
        bg-green-600
        text-white
        px-5
        py-3
        rounded-lg
        hover:bg-green-700
      "
    >
      📍 Use My Location
    </button>
  );
};

export default LocationButton;