// hooks
import { useNavigate } from "react-router";

// components
import Feedback from "./Feedback";
import Activity from "./Activity";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const Sidebar = () => {
  // hooks
  const navigate = useNavigate();

  return (
    <div className="w-80 shrink-0 flex flex-col p-5 py-10 gap-5">
      <Button
        className="w-max text-black px-4 bg-white border h-10 rounded-full flex items-center text-xs gap-2 cursor-pointer hover:bg-background"
        type="button"
        onClick={() => navigate("/dashboard")}
      >
        <span className="w-4 h-4 rounded-full bg-foreground flex items-center justify-center ">
          <ArrowLeft className="w-3! h-3!" strokeWidth={2} />
        </span>
        Go back
      </Button>
      <Activity />
      <Feedback />
    </div>
  );
};

export default Sidebar;
