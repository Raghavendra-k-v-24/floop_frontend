// images or icons
import Bell from "@/assets/bell.svg";

const Activity = () => {
  return (
    <div className="w-full h-max flex flex-col gap-3">
      <span className="w-full flex justify-between items-center">
        <h1 className="text-lg text-black font-semibold">Activity</h1>
        <img src={Bell} alt="Comment" className="w-5 h-5" />
      </span>
      <div className="w-full h-60 flex justify-center items-center">
        <h1 className="text-sm text-secondary font-semibold">Coming Soon</h1>
      </div>
    </div>
  );
};

export default Activity;
