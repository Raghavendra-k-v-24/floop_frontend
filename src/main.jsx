// hooks
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

// components
import "./index.css";
import App from "./App.jsx";
import Onboarding from "@/components/Onboarding/Onboarding.jsx";
import Dashboard from "@/components/Dashboard/Dashboard.jsx";
import Review from "@/components/Review/Review.jsx";
import Signup from "@/components/Onboarding/Signup/Signup.jsx";
import Login from "@/components/Onboarding/Login/Login.jsx";
import UserDetails from "@/components/Onboarding/Signup/UserDetails.jsx";
import RoleSelector from "@/components/Onboarding/Signup/RoleSelector.jsx";
import FloopYourWebsite from "@/components/Onboarding/Signup/FloopYourWebsite.jsx";
import FloopYourWebsiteGoals from "@/components/Onboarding/Signup/FloopYourWebsiteGoals.jsx";
import FloopOtherWebsite from "@/components/Onboarding/Signup/FloopOtherWebsite.jsx";
import FeedbackView from "@/components/FeedbackView/FeedbackView.jsx";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("auth_token");

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return children;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Onboarding />,
        children: [
          {
            index: true,
            element: <Navigate to="setup/user-details" replace />,
          },
          {
            path: "login",
            element: <Login />,
          },
          {
            path: "setup",
            element: <Signup />,
            children: [
              { index: true, element: <Navigate to="user-details" replace /> },
              { path: "user-details", element: <UserDetails /> },
              { path: "role-selector", element: <RoleSelector /> },
              { path: "floop-your-website", element: <FloopYourWebsite /> },
              { path: "goals", element: <FloopYourWebsiteGoals /> },
              { path: "floop-other-website", element: <FloopOtherWebsite /> },
            ],
          },
        ],
      },

      {
        path: "dashboard",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "dashboard/review/:id",
        element: (
          <ProtectedRoute>
            <Review />
          </ProtectedRoute>
        ),
      },
      {
        path: "dashboard/feedbackview/:id",
        element: (
          <ProtectedRoute>
            <FeedbackView />
          </ProtectedRoute>
        ),
      },
      {
        path: "review/:id",
        element: <Review />,
      },
      {
        path: "feedbackview/:id",
        element: <FeedbackView />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
