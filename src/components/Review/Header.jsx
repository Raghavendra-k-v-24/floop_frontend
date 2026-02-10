// images
import Logo from "@/assets/logo.svg";
import Cursor from "@/assets/cursor.svg";
import Plane from "@/assets/plane.svg";
import Cursor_Primary from "@/assets/cursor_primary.svg";

// components
import { Button } from "@/components/ui/button";

const Header = ({
  revieweeName,
  portfolioLink,
  commentEnabled,
  toggleComment,
}) => {
  return (
    <header className="w-full h-15 bg-background flex justify-between items-center px-5">
      <div className="w-max flex items-center gap-5">
        <img src={Logo} alt="Floop" className="w-20 h-20" />
        <span className="text-xs text-black">
          Giving feedback to{" "}
          <span className="text-primary font-semibold">{revieweeName}</span>
        </span>
      </div>
      <div className="w-max px-4 bg-white border border-border h-10 rounded-full flex items-center text-xs text-secondary">
        {portfolioLink?.length > 30
          ? portfolioLink?.substring(0, 30) + "..."
          : portfolioLink}
      </div>
      <div className="flex gap-2 items-center w-max">
        <Button
          className={`w-max px-4 bg-white border ${commentEnabled ? "border-primary" : "border-border"} h-10 rounded-full flex items-center text-xs ${commentEnabled ? "text-primary" : "text-secondary"} gap-2 cursor-pointer hover:bg-white`}
          onClick={toggleComment}
          type="button"
        >
          {commentEnabled ? "Exit Feedback" : "Add feedback"}
          <img
            src={commentEnabled ? Cursor_Primary : Cursor}
            alt="Cursor"
            className="w-3 h-3"
          />
        </Button>
        <Button
          className={`w-max px-4 bg-white border ${commentEnabled ? "border-primary" : "border-border"} h-10 rounded-full flex items-center text-xs ${commentEnabled ? "text-primary" : "text-secondary"} gap-2 cursor-pointer hover:bg-white`}
          onClick={toggleComment}
          disabled
          type="button"
        >
          Share Feedback
          <img src={Plane} alt="Cursor" className="w-3.5 h-3.5" />
        </Button>
      </div>
    </header>
  );
};

export default Header;
