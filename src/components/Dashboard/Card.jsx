// images or icons
import Link from "@/assets/link.svg";
import Comment from "@/assets/comment.svg";
import Copy from "@/assets/copy.svg";

// hooks
import { useNavigate } from "react-router";

// components
import { toast } from "sonner";

const Card = ({ review, navigateTo }) => {
  // hooks
  const navigate = useNavigate();

  // functions
  const handleCopyLink = async () => {
    if (navigateTo === "feedbackview") {
      await navigator.clipboard.writeText(`${review.reviewLink}`);
      toast.success("Link copied to Clipboard!");
    } else {
      const link = review.reviewLink.replace("review", "feedbackview");
      await navigator.clipboard.writeText(link);
      toast.success("Link copied to Clipboard!");
    }
  };

  const handleCardClick = () => {
    if (navigateTo === "feedbackview") {
      const feedbackViewLink = review.reviewLink.replace(
        "review",
        "dashboard/feedbackview",
      );
      navigate(feedbackViewLink);
    } else {
      const reviewLink = review.reviewLink.replace(
        "review",
        "dashboard/review",
      );
      navigate(reviewLink);
    }
  };

  return (
    <div
      className="w-80 h-100 bg-background hover:bg-background/30 rounded-2xl flex flex-col overflow-hidden border border-border cursor-pointer"
      onClick={handleCardClick}
    >
      <img
        src={review.portfolio.portfolioImage}
        alt="Preview"
        className="w-full h-3/5 object-cover"
      />
      <div className="w-full flex-1 p-5 flex flex-col gap-2">
        <h1 className="text-md text-black">{review.reviewerDisplayName}</h1>
        <span className="w-full flex gap-1 items-center">
          <img src={Link} alt="Link" className="w-4 h-4" />
          <h1 className="text-xs text-secondary">
            {review.portfolio.portfolioLink}
          </h1>
        </span>
        <span className="w-full flex gap-1 items-center">
          <img src={Comment} alt="Comment" className="w-4 h-4" />
          <h1 className="text-xs text-secondary">
            Feedbacks: {review.feedbackCount}
          </h1>
        </span>
        <span className="w-full flex gap-1 items-center justify-between mt-auto">
          {/* <span className="w-max h-6 flex items-center text-xxs bg-green-200 px-2 py-1 rounded-full border border-green-800 text-green-800">
            Link Opened
          </span> */}
          <span className="w-max h-6 flex items-center text-xxs bg-amber-100 px-2 py-1 rounded-full border border-amber-700 text-amber-700">
            Link not yet opened
          </span>
          <span
            className="w-max h-6 flex items-center gap-1 text-xxs bg-white px-2 py-1 rounded-full border border-border text-secondary hover:bg-white/10 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              handleCopyLink();
            }}
          >
            Copy Link
            <img src={Copy} alt="Copy" className="w-3 h-3" />
          </span>
        </span>
      </div>
    </div>
  );
};

export default Card;
