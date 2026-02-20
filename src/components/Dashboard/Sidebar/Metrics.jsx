// hooks
import { api } from "@/api";
import { useEffect } from "react";
import { useState } from "react";

// components
const Metrics = () => {
  // states
  const [allReviews, setallReviews] = useState({});
  const tab = localStorage.getItem("activeTab");

  // functions
  useEffect(() => {
    const getStats = async () => {
      const response = await api.get("/api/dashboard/stats");
      setallReviews(response.data);
    };
    getStats();
  }, []);

  return (
    <div className="w-full h-max flex flex-col gap-3">
      <h1 className="text-lg text-black font-semibold">Metrics</h1>
      <div className="w-full h-30 border border-border rounded-2xl flex">
        <div className="w-full flex-1 flex flex-col justify-center items-center gap-1 px-5">
          <span className="text-black text-xl">
            {tab === "received"
              ? allReviews.received?.reviewCount
              : allReviews.given?.reviewCount}
          </span>
          <span className="text-xs text-secondary font-semibold text-center">
            Total reviews {tab === "received" ? "received" : "given"}
          </span>
        </div>
        <div className="w-full flex-1 flex flex-col justify-center items-center gap-1 px-5">
          <span className="text-black text-xl">
            {tab === "received"
              ? allReviews.received?.commentCount
              : allReviews.given?.commentCount}
          </span>
          <span className="text-xs text-secondary font-semibold text-center">
            Total comments {tab === "received" ? "received" : "given"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Metrics;
