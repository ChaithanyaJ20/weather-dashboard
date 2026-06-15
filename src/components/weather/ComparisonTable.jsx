const ComparisonTable = ({
  comparison,
}) => {
  if (!comparison)
    return null;

  const {
    cityA,
    cityB,
  } = comparison;

  return (
    <div className="mt-8">
      <h2
        className="
          text-2xl
          font-bold
          mb-4
        "
      >
        Comparison
      </h2>

      <div className="overflow-x-auto">
        <table
  className="
    w-full
    border
    rounded-lg
    overflow-hidden
    text-center
    border-slate-600
  "
>
          <thead>
            <tr className="border-b border-slate-600">
              <th className="p-2">
                Metric
              </th>

              <th className="p-2">
                {cityA.city}
              </th>

              <th className="p-2">
                {cityB.city}
              </th>
            </tr>
          </thead>

          <tbody>
            <tr className="border-b border-slate-600">
              <td className="p-2">
                Temperature
              </td>

              <td className="p-2">
                {cityA.temperature}°C
              </td>

              <td className="p-2">
                {cityB.temperature}°C
              </td>
            </tr>

            <tr className="border-b border-slate-600">
              <td className="p-2">
                Feels Like
              </td>

              <td className="p-2">
                {cityA.feelsLike}°C
              </td>

              <td className="p-2">
                {cityB.feelsLike}°C
              </td>
            </tr>

            <tr className="border-b border-slate-600">
              <td className="p-2">
                Humidity
              </td>

              <td className="p-2">
                {cityA.humidity}%
              </td>

              <td className="p-2">
                {cityB.humidity}%
              </td>
            </tr>

            <tr className="border-b border-slate-600">
              <td className="p-2">
                Wind Speed
              </td>

              <td className="p-2">
                {cityA.windSpeed}
                km/h
              </td>

              <td className="p-2">
                {cityB.windSpeed}
                km/h
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ComparisonTable;