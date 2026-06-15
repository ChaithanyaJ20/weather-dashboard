import { useState } from "react";

const CompareCities = ({
  onCompare,
  loading,
}) => {
  const [city1, setCity1] =
    useState("");

  const [city2, setCity2] =
    useState("");

  const handleCompare = () => {
  if (
    !city1.trim() ||
    !city2.trim()
  )
    return;

  onCompare(city1, city2);

  setCity1("");
  setCity2("");
};

  const handleKeyDown = (
    e
  ) => {
    if (e.key === "Enter") {
      handleCompare();
    }
  };

  return (
    <div className="mt-8">
      <h2
        className="
          text-2xl
          font-bold
          mb-4
        "
      >
        Compare Cities
      </h2>

      <div
        className="
          flex
          flex-col
          md:flex-row
          gap-3
        "
      >
        <input
          type="text"
          placeholder="City 1"
          value={city1}
          onChange={(e) =>
            setCity1(
              e.target.value
            )
          }
          onKeyDown={
            handleKeyDown
          }
          className="
            flex-1
            border
            rounded-lg
            px-4
            py-2
          "
        />

        <input
          type="text"
          placeholder="City 2"
          value={city2}
          onChange={(e) =>
            setCity2(
              e.target.value
            )
          }
          onKeyDown={
            handleKeyDown
          }
          className="
            flex-1
            border
            rounded-lg
            px-4
            py-2
          "
        />

        <button
          onClick={
            handleCompare
          }
          disabled={loading}
          className="
            bg-blue-600
            text-white
            px-5
            py-2
            rounded-lg
            hover:bg-blue-700
            disabled:opacity-50
          "
        >
          {loading
            ? "Comparing..."
            : "Compare"}
        </button>
      </div>
    </div>
  );
};

export default CompareCities;