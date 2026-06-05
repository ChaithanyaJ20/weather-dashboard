const SearchBar = ({
  city,
  setCity,
  onSearch,
  loading,
}) => {
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onSearch();
    }
  };

  return (
    <div className="mt-6 flex gap-3">
      <input
        type="text"
        value={city}
        onChange={(e) =>
          setCity(e.target.value)
        }
        onKeyDown={handleKeyDown}
        placeholder="Search city..."
        className="
          flex-1
          border
          rounded-lg
          px-4
          py-3
        "
      />

      <button
        onClick={onSearch}
        disabled={loading}
        className="
          bg-blue-600
          text-white
          px-6
          rounded-lg
          disabled:bg-gray-400
        "
      >
        {loading ? "Searching..." : "Search"}
      </button>
    </div>
  );
};

export default SearchBar;