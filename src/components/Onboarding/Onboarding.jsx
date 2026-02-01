//images
import Logo from "@/assets/logo.svg";

//hooks
import { useState } from "react";

//components
import Signup from "./Signup/Signup";
import Login from "./Login/Login";

const Onboarding = () => {
  // states
  const [authMode, setAuthMode] = useState("signup");

  return (
    <div className="w-full h-screen flex flex-col items-center p-10 bg-[url('./assets/background.svg')] bg-cover overflow-auto">
      <img src={Logo} alt="Floop" className="w-28 h-28" />
      <div className="w-100 h-150 flex flex-col bg-white rounded-2xl border border-border p-5 shadow-lg">
        <span className="w-full h-max flex justify-between">
          <h1
            className={`text-lg font-semibold cursor-pointer ${
              authMode === "signup" ? "text-black" : "text-secondary/50"
            }`}
            onClick={() => setAuthMode("signup")}
          >
            Sign up{authMode !== "signup" && "?"}
          </h1>
          <h1
            className={`text-lg font-semibold cursor-pointer ${
              authMode === "login" ? "text-black" : "text-secondary/50"
            }`}
            onClick={() => setAuthMode("login")}
          >
            Login{authMode !== "login" && "?"}
          </h1>
        </span>
        {authMode === "signup" ? <Signup /> : <Login />}
      </div>
    </div>
  );
};

export default Onboarding;
