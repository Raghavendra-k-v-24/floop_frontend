// images
import Logo from "@/assets/logo.svg";

// hooks
import { useLocation, useNavigate } from "react-router";

// components
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const Header = ({
  revieweeName,
  reviewerName,
  portfolioLink,
  commentEnabled,
  toggleComment,
}) => {
  // hooks
  const navigate = useNavigate();
  const location = useLocation();

  // states
  const isDashboard = location.pathname.includes("/dashboard");

  return (
    <header className="w-full h-15 bg-background flex justify-between items-center px-5">
      <div className="w-max flex items-center gap-5">
        {isDashboard && (
          <Button
            className="w-max text-black px-4 bg-white border h-10 rounded-full flex items-center text-xs gap-2 cursor-pointer hover:bg-white"
            type="button"
            onClick={() => navigate("/dashboard")}
          >
            <span className="w-4 h-4 rounded-full bg-foreground flex items-center justify-center ">
              <ArrowLeft className="w-3! h-3!" strokeWidth={2} />
            </span>
            Go back
          </Button>
        )}
        <img src={Logo} alt="Floop" className="w-20 h-20" />
      </div>

      <div className="w-max px-4 bg-white border border-border h-10 rounded-full flex items-center text-xs text-secondary">
        {portfolioLink?.length > 30
          ? portfolioLink?.substring(0, 30) + "..."
          : portfolioLink}
      </div>
      <div className="w-max px-4 bg-white border border-border h-10 rounded-full flex items-center text-xs text-black">
        Feedback from: {reviewerName}
      </div>
    </header>
  );
};

export default Header;
