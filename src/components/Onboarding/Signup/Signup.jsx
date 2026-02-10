//hooks
import { useState } from "react";
import { Outlet } from "react-router";

// components
import UserDetails from "./UserDetails";
import RoleSelector from "./RoleSelector";
import FloopYourWebsite from "./FloopYourWebsite";
import FloopYourWebsiteGoals from "./FloopYourWebsiteGoals";
import FloopOtherWebsite from "./FloopOtherWebsite";

//constants
const STEPS = {
  user_details: UserDetails,
  role_selector: RoleSelector,
  floop_your_website: FloopYourWebsite,
  floop_your_website_goals: FloopYourWebsiteGoals,
  floop_other_website: FloopOtherWebsite,
};

const Signup = () => {
  //states
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    terms: false,
    role: [],
    portfolio: "",
    goals: [],
    emailInvites: "",
    accessType: "view",
    reviewerName: "",
    reviewerEmail: "",
    revieweeName: "",
    revieweeEmail: "",
    portfolioLink: "",
    reviewId: null,
    reviewAccessToken: null,
  });

  const [currentStep, setCurrentStep] = useState("user_details");

  return (
    <div className="w-full flex-1">
      <Outlet context={{ formData, setFormData }} />
    </div>
  );
};

export default Signup;
