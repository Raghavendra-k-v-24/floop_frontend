// hooks
import axios from "axios";
import { api } from "@/api";
import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

// components
import CustomInput from "../../common/CustomInput";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "sonner";
import CustomInputGroup from "../../common/CustomInputGroup";
import { Spinner } from "@/components/ui/spinner";

const UserDetails = () => {
  // hooks
  const navigate = useNavigate();
  const { formData, setFormData } = useOutletContext();
  // states
  const [loading, setLoading] = useState(false);

  //constants
  const PASSWORD_REGEX =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&^#()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;

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
      [!formData.name, "Name is mandatory"],
      [!formData.email, "Email is mandatory"],
      [!formData.password, "Password is mandatory"],
      [!formData.confirmPassword, "Confirm password is mandatory"],
      [!formData.terms, "You must accept the terms and conditions"],
    ];

    for (const [invalid, message] of validations) {
      if (invalid) {
        toast.error(message);
        return;
      }
    }

    if (!PASSWORD_REGEX.test(formData.password)) {
      toast.error(
        "Password must be at least 8 characters and include uppercase, lowercase, number, and special character",
      );
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const response = await api.post("/api/signup", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      const token = response.data.token;
      localStorage.setItem("auth_token", token);
      navigate("/setup/role-selector");
    } catch (err) {
      console.log("Signing up failed", err);
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
      className="w-full flex-1 flex flex-col gap-5 py-5 items-center"
      onSubmit={handleSubmit}
    >
      <CustomInput
        label="Your name"
        type="text"
        id="name"
        placeholder="John Doe"
        value={formData.name}
        onChange={handleChange}
      />
      <CustomInput
        label="Your email"
        type="email"
        id="email"
        placeholder="john@example.com"
        value={formData.email}
        onChange={handleChange}
      />
      <CustomInputGroup
        label="Create a password"
        type="password"
        id="password"
        placeholder="********"
        value={formData.password}
        onChange={handleChange}
      />
      <CustomInputGroup
        label="Confirm your password"
        type="password"
        id="confirmPassword"
        placeholder="********"
        value={formData.confirmPassword}
        onChange={handleChange}
      />

      <div className="flex items-start gap-3">
        <Checkbox
          id="terms"
          checked={formData.terms}
          onCheckedChange={(checked) =>
            handleChange({ target: { id: "terms", value: Boolean(checked) } })
          }
          className="cursor-pointer"
        />
        <span
          htmlFor="terms"
          className="text-secondary text-xs font-normal text-justify"
        >
          By creating an account, you understand and agree to floop{" "}
          <span className="text-primary font-semibold cursor-pointer hover:underline">
            Terms and Conditions
          </span>
          . You also acknowledge our Cookie and Privacy Policies.
        </span>
      </div>
      <Button
        className="w-full bg-primary text-white rounded-2xl py-5 cursor-pointer"
        type="submit"
      >
        Continue
        {loading && <Spinner className="w-4 h-4" />}
      </Button>
      <h1 className="text-secondary text-xs font-normal">OR</h1>
      <Tooltip>
        <TooltipTrigger asChild>
          <h1 className="text-secondary text-xs font-normal cursor-pointer">
            Sign up with google
          </h1>
        </TooltipTrigger>
        <TooltipContent className="bg-black w-full h-full">
          <p className="text-white">Coming soon</p>
        </TooltipContent>
      </Tooltip>
    </form>
  );
};

export default UserDetails;
