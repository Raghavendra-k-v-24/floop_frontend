// images or icons
import Cursor from "@/assets/cursor_round.svg";

const Feedback = () => {
  return (
    <div className="w-full h-full flex flex-col gap-3">
      <span className="w-full flex justify-between items-center">
        <h1 className="text-lg text-black font-semibold">Feedback</h1>
        <img src={Cursor} alt="Comment" className="w-5 h-5" />
      </span>
      <div className="w-full flex-1 flex justify-center items-center">
        <h1 className="text-sm text-secondary font-semibold">Coming Soon</h1>
      </div>
    </div>
  );
};

export default Feedback;
