//images
import Logo from "@/assets/logo.svg";

//hooks
import { Outlet, useNavigate, useLocation } from "react-router-dom";

const Onboarding = () => {
  // hooks
  const navigate = useNavigate();
  const location = useLocation();

  // states
  const isSignup = location.pathname.includes("setup");

  return (
    <div className="w-full h-screen flex flex-col items-center p-10 bg-[url('./assets/background.svg')] bg-cover overflow-auto">
      <img src={Logo} alt="Floop" className="w-28 h-28" />
      <div className="w-100 h-150 flex flex-col bg-white rounded-2xl border border-border p-5 shadow-lg">
        {!location.state?.from.includes("dashboard") && (
          <span className="w-full h-max flex justify-between">
            <h1
              className={`text-lg font-semibold cursor-pointer ${
                isSignup ? "text-black" : "text-secondary/50"
              }`}
              onClick={() => navigate("/setup/user-details")}
            >
              Sign up{!isSignup && "?"}
            </h1>
            <h1
              className={`text-lg font-semibold cursor-pointer ${
                !isSignup ? "text-black" : "text-secondary/50"
              }`}
              onClick={() => navigate("/login")}
            >
              Login{isSignup && "?"}
            </h1>
          </span>
        )}

        <Outlet />
      </div>
    </div>
  );
};

export default Onboarding;
