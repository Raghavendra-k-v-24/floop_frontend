// hooks
import axios from "axios";
import { api } from "@/api";
import { useState } from "react";

// components
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import CustomInput from "../../common/CustomInput";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";

const FloopYourWebsite = ({ formData, setFormData, setCurrentStep }) => {
  // states
  const [loading, setLoading] = useState(false);

  //functions
  const handleChange = (e) => {
    const { id, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validations = [
      [!formData.portfolio, "Portfolio link is mandatory"],
      [!formData.reviewerName, "Reviewer name is mandatory"],
    ];

    for (const [invalid, message] of validations) {
      if (invalid) {
        toast.error(message);
        return;
      }
    }
    setLoading(true);
    try {
      const createPortfolioResponse = await api.post("/api/portfolio", {
        portfolioLink: formData.portfolio,
        intent: "reviewee",
      });

      const portfolio = createPortfolioResponse.data.portfolio;
      const portfolioId = portfolio._id;

      const createReviewResponse = await api.post("/api/review", {
        portfolioId: portfolioId,
        reviewerEmail: formData.reviewerEmail,
        reviewerName: formData.reviewerName,
        intent: "reviewee",
      });

      const review = createReviewResponse.data.review;
      const reviewId = review._id;
      const accessToken = review.accessToken;

      setFormData((prev) => ({
        ...prev,
        reviewId: reviewId,
        reviewAccessToken: accessToken,
      }));

      setCurrentStep("floop_your_website_goals");
    } catch (err) {
      console.log("Portfolio or review creating failed", err);
      if (axios.isAxiosError(err)) {
        const message = err.response?.data?.message || "Signup failed";
        toast.error(message);
      } else {
        toast.error("Unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className="w-full flex-1 flex flex-col gap-4 pt-5 items-center min-h-full"
      onSubmit={handleSubmit}
    >
      <Button
        className="w-max bg-background text-black rounded-full py-5 cursor-pointer text-xs flex justify-between border border-border mr-auto hover:bg-foreground/50"
        type="button"
        onClick={() => setCurrentStep("role_selector")}
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
      <CustomInput
        label="Your portfolio link"
        type="url"
        id="portfolio"
        placeholder="https://"
        value={formData.portfolio}
        onChange={handleChange}
      />
      <CustomInput
        label="Reviewer's name"
        type="text"
        id="reviewerName"
        placeholder="Daisy"
        value={formData.reviewerName}
        onChange={handleChange}
      />
      <CustomInput
        label="Reviewer's email (optional)"
        type="text"
        id="reviewerEmail"
        placeholder="daisy@example.com"
        value={formData.reviewerEmail}
        onChange={handleChange}
      />
      <Button
        className="w-full bg-primary text-white rounded-2xl py-5 cursor-pointer mt-auto"
        type="submit"
      >
        Next - add goals{loading && <Spinner className="w-4 h-4" />}
      </Button>
    </form>
  );
};

export default FloopYourWebsite;
