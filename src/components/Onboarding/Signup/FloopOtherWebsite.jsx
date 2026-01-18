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
import { useNavigate } from "react-router";

const FloopOtherWebsite = ({ formData, setFormData, setCurrentStep }) => {
  // hooks
  const navigate = useNavigate();

  // states
  const [loading, setLoading] = useState(false);

  // functions
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
      [!formData.revieweeName, "Reviewee name is mandatory"],
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
        intent: "reviewer",
      });

      const portfolio = createPortfolioResponse.data.portfolio;
      const portfolioId = portfolio._id;

      const createReviewResponse = await api.post("/api/review", {
        portfolioId: portfolioId,
        revieweeEmail: formData.revieweeEmail,
        intent: "reviewer",
      });

      const review = createReviewResponse.data.review;
      const reviewId = review._id;
      const accessToken = review.accessToken;

      setFormData((prev) => ({
        ...prev,
        reviewId: reviewId,
      }));
      navigate("/dashboard");
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
          flooping <span className="text-primary">someone else’s website</span>
        </h1>
        <h1 className="text-xs text-foreground">
          Give feedback to others’ live websites/portfolios
        </h1>
      </span>
      <CustomInput
        label="Website Link"
        type="url"
        id="portfolio"
        placeholder="https://"
        value={formData.portfolio}
        onChange={handleChange}
      />
      <CustomInput
        label="Who are you sharing feedback to?"
        type="text"
        id="revieweeName"
        placeholder="Daisy"
        value={formData.revieweeName}
        onChange={handleChange}
      />
      <CustomInput
        label="Email of the person you are giving feedback (optional)"
        type="text"
        id="revieweeEmail"
        placeholder="daisy@example.com"
        value={formData.revieweeEmail}
        onChange={handleChange}
      />
      <Button
        className="w-full bg-primary text-white rounded-2xl py-5 cursor-pointer mt-auto"
        type="submit"
      >
        Start giving feedback
        {loading && <Spinner className="w-4 h-4" />}
      </Button>
    </form>
  );
};

export default FloopOtherWebsite;
