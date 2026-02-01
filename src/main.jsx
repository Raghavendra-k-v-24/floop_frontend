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
import Review from "./components/Review/Review.jsx";

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
    // children: [
    //   { path: "/", element: <Onboarding /> },
    //   { path: "/:id", element: <Review /> },
    //   {
    //     path: "/dashboard",
    //     element: (
    //       <ProtectedRoute>
    //         <Dashboard />
    //       </ProtectedRoute>
    //     ),
    //   },
    //   {
    //     path: "/feedback-view/:panel/:id",
    //     element: (
    //       <ProtectedRoute>
    //         <FeedbackView />
    //       </ProtectedRoute>
    //     ),
    //   },
    //   {
    //     path: "/share-website",
    //     element: (
    //       <ProtectedRoute>
    //         <ShareYourWebsite />
    //       </ProtectedRoute>
    //     ),
    //   },
    //   {
    //     path: "/give-feedback",
    //     element: (
    //       <ProtectedRoute>
    //         <GiveFeedback />
    //       </ProtectedRoute>
    //     ),
    //   },
    // ],
    children: [
      {
        path: "/",
        element: <Onboarding />,
      },
      {
        path: "/dashboard",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "review/:id",
        element: <Review />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
