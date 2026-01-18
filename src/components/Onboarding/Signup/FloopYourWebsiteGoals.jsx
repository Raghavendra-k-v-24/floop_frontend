// hooks
import { useState } from "react";
import axios from "axios";
import { api } from "@/api";

// components
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import ShaingYourPortfolio from "./ShareYourPortfolio";
import { toast } from "sonner";
import { X } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";

const FloopYourWebsiteGoals = ({ formData, setFormData, setCurrentStep }) => {
  //states
  const [goals, setGoals] = useState();
  const [dialogOpen, setDialogOpen] = useState(true);
  const [loading, setLoading] = useState(false);

  //functions
  const handleChange = (e) => {
    const { value } = e.target;
    setGoals(value);
  };

  const handleAdd = () => {
    if (!goals) return;
    setFormData((prev) => ({
      ...prev,
      goals: [...formData.goals, goals],
    }));
    setGoals("");
  };

  const handleRemoveGoal = (goalToRemove) => {
    setFormData((prev) => ({
      ...prev,
      goals: prev.goals.filter((goal) => goal !== goalToRemove),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.goals.length === 0) {
      setDialogOpen(true);
      return;
    }
    setLoading(true);
    try {
      await api.put("/api/review", {
        reviewId: formData.reviewId,
        goals: formData.goals,
      });
      setDialogOpen(true);
    } catch (err) {
      console.log("Goals updating failed", err);
      if (axios.isAxiosError(err)) {
        const message = err.response?.data?.message || "Goals updating failed";
        toast.error(message);
      } else {
        toast.error("Unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form
        className="w-full flex-1 flex flex-col gap-4 pt-5 min-h-full"
        onSubmit={handleSubmit}
      >
        <Button
          className="w-max bg-background text-black rounded-full py-5 cursor-pointer text-xs flex justify-between border border-border mr-auto hover:bg-foreground/50"
          type="button"
          onClick={() => setCurrentStep("floop_your_website")}
        >
          <span className="w-4 h-4 rounded-full bg-foreground flex items-center justify-center ">
            <ArrowLeft className="w-3! h-3!" strokeWidth={2} />
          </span>
          Go back
        </Button>
        <span className="w-full flex gap-1 flex-col">
          <h1 className="text-lg mr-auto text-black font-semibold">
            flooping <span className="text-primary">your portfolio</span>
          </h1>
          <h1 className="text-xs text-foreground">
            Get feedback on your live website from your peers/mentors/reviewers
          </h1>
        </span>
        <div className="w-full flex flex-col gap-2">
          <Label
            htmlFor="goals"
            className="mr-auto text-xs font-normal text-black"
          >
            Goals for the portfolio review (max 3)
          </Label>
          <div className="flex w-full gap-2">
            <Input
              id="goals"
              type="text"
              placeholder="Goal is to improve visual design"
              className="text-black"
              value={goals}
              onChange={handleChange}
            />
            <Button
              className="bg-primary text-white cursor-pointer"
              type="button"
              onClick={handleAdd}
              disabled={formData.goals.length >= 3}
            >
              Add
            </Button>
          </div>
          <div className="flex flex-wrap gap-3">
            {formData.goals.length > 0 &&
              formData.goals.map((item, index) => (
                <Label
                  key={index}
                  className="w-max h-max px-2 py-1 rounded-sm bg-foreground text-secondary text-xs"
                >
                  {item}
                  <button
                    type="button"
                    onClick={() => handleRemoveGoal(item)}
                    className="ml-auto hover:text-red-500 cursor-pointer"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Label>
              ))}
          </div>
        </div>
        <Button
          className="w-full bg-primary text-white rounded-2xl py-5 cursor-pointer mt-auto"
          type="submit"
        >
          Generate a portfolio review link
          {loading && <Spinner className="w-4 h-4" />}
        </Button>
      </form>
      <ShaingYourPortfolio
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
        formData={formData}
        setFormData={setFormData}
      />
    </>
  );
};

export default FloopYourWebsiteGoals;
