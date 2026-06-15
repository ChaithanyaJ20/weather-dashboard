const LoadingSkeleton = () => {

  return (
    <div
      className="
        mt-6
        animate-pulse
      "
    >
      <div
        className="
          h-48
          rounded-xl
          bg-slate-700
          mb-4
        "
      />

      <div
        className="
          grid
          grid-cols-4
          gap-4
        "
      >
        {[1,2,3,4].map(
          (item) => (
            <div
              key={item}
              className="
                h-24
                rounded-xl
                bg-slate-700
              "
            />
          )
        )}
      </div>
    </div>
  );
};

export default LoadingSkeleton;