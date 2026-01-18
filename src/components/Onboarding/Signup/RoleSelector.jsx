// hooks
import axios from "axios";
import { api } from "@/api";
import { useState } from "react";
import { useNavigate } from "react-router";

// components
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Upload from "@/assets/upload.svg";
import Globe from "@/assets/globe.svg";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";

const RoleSelector = ({ setFormData, setCurrentStep }) => {
  // hooks
  const navigate = useNavigate();

  // states
  const [loading, setLoading] = useState(false);

  // functions
  const handleSelect = async (step) => {
    const role =
      step === "floop_your_website"
        ? "reviewee"
        : step === "floop_other_website"
          ? "reviewer"
          : "";

    if (role === "") {
      navigate("/dashboard");
      return;
    }

    setLoading(true);
    try {
      await api.put("/api/user", { role });
      setFormData((prev) => ({
        ...prev,
        role: [...new Set([...prev.role, role])],
      }));
      setCurrentStep(step);
    } catch (err) {
      console.log("Updating role failed", err);
      if (axios.isAxiosError(err)) {
        const message = err.response?.data?.message || "Updating role failed";
        toast.error(message);
      } else {
        toast.error("Unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="w-full flex-1 flex flex-col gap-4 pt-5 items-center min-h-full">
      <Button
        className="w-max bg-background text-black rounded-full py-5 cursor-pointer text-xs flex justify-between border border-border mr-auto hover:bg-foreground/50"
        type="button"
        onClick={() => setCurrentStep("user_details")}
      >
        <span className="w-4 h-4 rounded-full bg-foreground flex items-center justify-center ">
          <ArrowLeft className="w-3! h-3!" strokeWidth={2} />
        </span>
        Go back
      </Button>
      <h1 className="text-lg mr-auto text-black font-semibold">
        What do you want to do?
      </h1>
      <div
        className="w-full h-40 bg-primary rounded-2xl flex flex-col p-6 text-white justify-between items-center gap-3 cursor-pointer hover:bg-primary/90"
        onClick={() => handleSelect("floop_your_website")}
        type="button"
      >
        <img src={Upload} alt="Upload" className="w-7 h-7" />
        <span className="w-full text-center flex flex-col gap-1">
          <h1 className="text-md">floop your portfolio</h1>
          <h2 className="text-xs text-border">
            Get feedback on your live website from your peers/mentors/reviewers
          </h2>
        </span>
      </div>
      <div
        className="w-full h-40 bg-[#FF8030] rounded-2xl flex flex-col p-6 text-white justify-between items-center gap-3 cursor-pointer hover:bg-[#FF8030]/90"
        onClick={() => handleSelect("floop_other_website")}
      >
        <img src={Globe} alt="Upload" className="w-7 h-7" />
        <span className="w-full text-center flex flex-col gap-1">
          <h1 className="text-md">floop someone else’s website</h1>
          <h2 className="text-xs text-border">
            Give feedback to your friend/peer/client’s live websites/portfolios
          </h2>
        </span>
      </div>
      {loading && <Spinner className="w-4 h-4 text-black" />}
      <h1
        className="text-xs text-foreground hover:text-black cursor-pointer mt-auto"
        onClick={() => handleSelect("")}
      >
        SKIP - I am just exploring
      </h1>
    </div>
  );
};

export default RoleSelector;
