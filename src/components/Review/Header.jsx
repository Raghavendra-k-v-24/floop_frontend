// images
import Logo from "@/assets/logo.svg";
import Cursor from "@/assets/cursor.svg";
import Cursor_Primary from "@/assets/cursor_primary.svg";

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
      <div
        className={`w-max px-4 bg-white border ${commentEnabled ? "border-primary" : "border-border"} h-10 rounded-full flex items-center text-xs ${commentEnabled ? "text-primary" : "text-secondary"} gap-2 cursor-pointer`}
        onClick={toggleComment}
      >
        {commentEnabled ? "Exit Feedback" : "Add feedback"}
        <img
          src={commentEnabled ? Cursor_Primary : Cursor}
          alt="Cursor"
          className="w-3 h-3"
        />
      </div>
    </header>
  );
};

export default Header;
