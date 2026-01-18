// images or icons
import Scene from "@/assets/scene.jpg";
import Ghost from "@/assets/ghost.svg";
import Link from "@/assets/link.svg";
import Comment from "@/assets/comment.svg";
import Copy from "@/assets/copy.svg";

const Card = () => {
  return (
    <div className="w-80 h-100 bg-background hover:bg-background/30 rounded-2xl flex flex-col overflow-hidden border border-border cursor-pointer">
      <img src={Scene} alt="Preview" className="w-full h-3/5" />
      <div className="w-full flex-1 p-5 flex flex-col gap-2">
        <h1 className="text-md text-black">Dharam</h1>
        <span className="w-full flex gap-1 items-center">
          <img src={Link} alt="Link" className="w-4 h-4" />
          <h1 className="text-xs text-secondary">https://example.com</h1>
        </span>
        <span className="w-full flex gap-1 items-center">
          <img src={Comment} alt="Comment" className="w-4 h-4" />
          <h1 className="text-xs text-secondary">Feedbacks: 1</h1>
        </span>
        <span className="w-full flex gap-1 items-center justify-between mt-auto">
          {/* <span className="w-max h-6 flex items-center text-xxs bg-green-200 px-2 py-1 rounded-full border border-green-800 text-green-800">
            Link Opened
          </span> */}
          <span className="w-max h-6 flex items-center text-xxs bg-amber-100 px-2 py-1 rounded-full border border-amber-700 text-amber-700">
            Link not yet opened
          </span>
          <span className="w-max h-6 flex items-center gap-1 text-xxs bg-white px-2 py-1 rounded-full border border-border text-secondary hover:bg-white/10 cursor-pointer">
            Copy Link
            <img src={Copy} alt="Copy" className="w-3 h-3" />
          </span>
        </span>
      </div>
    </div>
  );
};

export default Card;
