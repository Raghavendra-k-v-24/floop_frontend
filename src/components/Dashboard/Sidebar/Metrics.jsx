const Metrics = () => {
  return (
    <div className="w-full h-max flex flex-col gap-3">
      <h1 className="text-lg text-black font-semibold">Metrics</h1>
      <div className="w-full h-30 border border-border rounded-2xl flex">
        <div className="w-full flex-1 flex flex-col justify-center items-center gap-1 px-5">
          <span className="text-black text-xl">5</span>
          <span className="text-xs text-secondary font-semibold text-center">
            Total reviews received
          </span>
        </div>
        <div className="w-full flex-1 flex flex-col justify-center items-center gap-1 px-5">
          <span className="text-black text-xl">3</span>
          <span className="text-xs text-secondary font-semibold text-center">
            Total comments received
          </span>
        </div>
      </div>
    </div>
  );
};

export default Metrics;
