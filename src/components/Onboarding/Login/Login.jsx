// hooks
import { useState } from "react";
import { api } from "@/api";
import axios from "axios";
import { useNavigate } from "react-router";

// components
import CustomInput from "@/components/common/CustomInput";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";
import CustomInputGroup from "@/components/common/CustomInputGroup";

const Login = () => {
  // hooks
  const navigate = useNavigate();

  // states
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

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
      [!formData.email, "Email is mandatory"],
      [!formData.password, "Password is mandatory"],
    ];

    for (const [invalid, message] of validations) {
      if (invalid) {
        toast.error(message);
        return;
      }
    }

    setLoading(true);
    try {
      const response = await api.post("/api/login", {
        email: formData.email,
        password: formData.password,
      });

      const token = response.data.token;
      localStorage.setItem("auth_token", token);
      navigate("/dashboard");
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
        label="Your email"
        type="email"
        id="email"
        placeholder="john@example.com"
        value={formData.email}
        onChange={handleChange}
      />
      <CustomInputGroup
        label="Your password"
        type="password"
        id="password"
        placeholder="********"
        value={formData.password}
        onChange={handleChange}
      />
      <Button
        className="w-full mt-auto bg-primary text-white rounded-2xl py-5 cursor-pointer"
        type="submit"
      >
        Login{loading && <Spinner className="w-4 h-4" />}
      </Button>
    </form>
  );
};

export default Login;
